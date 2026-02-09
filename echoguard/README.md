# EchoGuard Backend

Student project: analyzes audio, text, and PDF for speaker type (AI/Human likelihood), language, scam detection, with explanation and safety advice.

## Stack

- **Python** only; **Gemini API** via Google AI Studio (no Vertex, gcloud, OAuth).
- **Whisper** (local) for audio transcription.
- **pypdf** for PDF text extraction.
- **Flask** for the `/analyze` endpoint.

## Setup

1. Create a virtual environment and install deps:
   ```bash
   cd echoguard
   python -m venv .venv
   .venv\Scripts\activate   # Windows
   pip install -r requirements.txt
   ```
2. Set your Gemini API key in `.env`:
   ```
   GEMINI_API_KEY=your_key_from_google_ai_studio
   ```

## Run

- **Flask (for frontend):** `python app.py` → http://localhost:5000
- **CLI:** `python main.py` → menu for Audio / Text / PDF

## Endpoints

- `POST /analyze` — body: either `file` (audio or PDF) or JSON `{ "text": "..." }`. Returns JSON with `speaker_type`, `language`, `scam_detected`, `explanation`, `how_to_avoid`, `risk_level`.
- `GET /health` — health check.

## Frontend

Next.js app calls `/api/analyze`, which proxies to this Flask app. Start Flask on port 5000 before using the frontend analyze feature.
