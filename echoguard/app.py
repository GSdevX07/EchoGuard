"""
EchoGuard - app.py
Flask backend: single POST /analyze endpoint.
Accepts: audio file, PDF file, or raw text (JSON).
Saves uploads to uploads/; runs Whisper or PDF extraction then Gemini analysis.
Returns structured JSON result.
"""

import os
import traceback
import uuid
from flask import Flask, request, jsonify
from werkzeug.utils import secure_filename

from transcribe_audio import transcribe_audio
from utils import read_pdf
from analyze_text import analyze_text, parse_analysis_response

app = Flask(__name__)
app.config["MAX_CONTENT_LENGTH"] = 50 * 1024 * 1024  # 50 MB
UPLOAD_FOLDER = os.path.join(os.path.dirname(os.path.abspath(__file__)), "uploads")
os.makedirs(UPLOAD_FOLDER, exist_ok=True)
app.config["UPLOAD_FOLDER"] = UPLOAD_FOLDER


@app.after_request
def add_cors(resp):
    """Allow frontend (e.g. Next.js on another port) to call this backend."""
    resp.headers["Access-Control-Allow-Origin"] = "*"
    resp.headers["Access-Control-Allow-Methods"] = "GET, POST, OPTIONS"
    resp.headers["Access-Control-Allow-Headers"] = "Content-Type"
    return resp

ALLOWED_AUDIO = {"audio/mpeg", "audio/wav", "audio/mp3", "audio/x-wav"}
ALLOWED_PDF = {"application/pdf"}


def get_text_from_request():
    """
    Determine input type and return extracted text.
    Returns (text, error_message). error_message is None on success.
    """
    # 1) Raw text in JSON body
    if request.is_json:
        data = request.get_json() or {}
        text = data.get("text") or data.get("content") or ""
        if isinstance(text, str) and text.strip():
            return text.strip(), None
        return "", "No text or content in JSON body"

    # 2) File upload: audio or PDF
    file = request.files.get("file") or request.files.get("audio") or request.files.get("pdf")
    if not file or not file.filename:
        return "", "No file or text provided. Send either JSON { \"text\": \"...\" } or file (audio/PDF)."

    ext = (os.path.splitext(file.filename)[1] or "").lower()
    content_type = (file.content_type or "").lower()

    # PDF
    if ext == ".pdf" or "pdf" in content_type:
        safe_name = secure_filename(file.filename) or f"{uuid.uuid4().hex}.pdf"
        path = os.path.join(app.config["UPLOAD_FOLDER"], safe_name)
        file.save(path)
        try:
            text = read_pdf(path)
            return text or "(No text extracted from PDF)", None
        finally:
            try:
                os.remove(path)
            except OSError:
                pass

    # Audio (mp3, wav, etc.)
    if ext in (".mp3", ".wav", ".m4a", ".ogg") or any(
        t in content_type for t in ("audio/", "mpeg", "wav")
    ):
        safe_name = secure_filename(file.filename) or f"{uuid.uuid4().hex}.mp3"
        path = os.path.join(app.config["UPLOAD_FOLDER"], safe_name)
        file.save(path)
        try:
            text = transcribe_audio(path)
            return text or "(No speech detected in audio)", None
        finally:
            try:
                os.remove(path)
            except OSError:
                pass

    return "", "Unsupported file type. Use audio (mp3/wav) or PDF, or send JSON with text."


@app.route("/analyze", methods=["OPTIONS"])
def analyze_options():
    return "", 204


@app.route("/analyze", methods=["POST"])
def analyze():
    """Single analysis endpoint: audio, PDF, or text -> Gemini analysis -> JSON."""
    import traceback
    text, err = get_text_from_request()
    if err:
        return jsonify({"ok": False, "error": err}), 400

    try:
        raw_analysis = analyze_text(text)
        parsed = parse_analysis_response(raw_analysis or "")
    except Exception as e:
        traceback.print_exc()
        msg = str(e) if str(e) else type(e).__name__
        return jsonify({"ok": False, "error": f"Analysis failed: {msg}"}), 500

    return jsonify({
        "ok": True,
        "extracted_text": text[:5000],
        "speaker_type": parsed["speaker_type"],
        "language": parsed["language"],
        "scam_detected": parsed["scam_detected"],
        "explanation": parsed["explanation"],
        "how_to_avoid": parsed["how_to_avoid"],
        "risk_level": parsed["risk_level"],
        "raw_analysis": raw_analysis,
    })


@app.route("/health", methods=["GET"])
def health():
    return jsonify({"status": "ok"})
# if __name__ == "__main__":
#     app.run(host="0.0.0.0", port=5000, debug=True)
if __name__ == "__main__":
    port = int(os.environ.get("PORT", 5000))
    app.run(host="0.0.0.0", port=port, debug=True)

