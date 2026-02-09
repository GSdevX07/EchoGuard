"""
EchoGuard - analyze_text.py
Text analysis via Google Gemini API (Google AI Studio).
Uses the new google.genai SDK. Detects: speaker type (AI vs Human), language, scam, etc.
"""

import os
import re
from dotenv import load_dotenv

load_dotenv()

# New SDK: https://googleapis.github.io/python-genai/
from google import genai
from google.genai import types

api_key = os.getenv("GEMINI_API_KEY")
client = genai.Client(api_key=api_key) if api_key else None

# Current model (new google.genai SDK)
MODEL_NAME = "gemini-2.5-flash"

ANALYSIS_PROMPT = """You are a safety analyst. Analyze the following text (from audio, document, or direct input) and respond using EXACTLY this format. Do not output JSON or any other format.

Speaker Type: AI or Human
Language: <detected language name>
Scam Detected: YES or NO

Explanation:
<Short, clear explanation. Treat AI vs Human as likelihood, not certainty. Do not make up or hallucinate claims.>

How to Avoid:
- <first bullet point>
- <second bullet point>
- <more if needed>

Rules:
- Use only "AI" or "Human" for Speaker Type (likelihood-based, not absolute).
- Use only "YES" or "NO" for Scam Detected.
- Keep explanation brief and honest.
- How to Avoid must be bullet points only.
- Output plain text only, no code blocks or JSON."""


def analyze_text(text: str) -> str:
    """
    Run Gemini analysis on the given text.
    :param text: Raw content to analyze (transcribed or extracted).
    :return: Plain-text analysis in the required format.
    """
    if not text or not text.strip():
        return (
            "Speaker Type: Human\n"
            "Language: Unknown\n"
            "Scam Detected: NO\n\n"
            "Explanation:\nNo content provided to analyze.\n\n"
            "How to Avoid:\n- Always provide content for analysis."
        )

    if not client:
        return (
            "Speaker Type: Human\n"
            "Language: Unknown\n"
            "Scam Detected: NO\n\n"
            "Explanation:\nAPI key not configured. Set GEMINI_API_KEY in .env.\n\n"
            "How to Avoid:\n- Configure GEMINI_API_KEY from Google AI Studio."
        )

    try:
        prompt = f"{ANALYSIS_PROMPT}\n\n---\nText to analyze:\n\n{text[:30000]}"
        response = client.models.generate_content(
            model=MODEL_NAME,
            contents=prompt,
            config=types.GenerateContentConfig(temperature=0.3),
        )
        raw = (response.text or "").strip()
        return raw
    except Exception as e:
        err_msg = str(e).lower()
        if "api_key" in err_msg or "invalid" in err_msg or "403" in err_msg:
            raise ValueError("Invalid or missing Gemini API key. Check GEMINI_API_KEY in .env and restart the backend.")
        if "404" in err_msg or "not found" in err_msg:
            raise ValueError("Gemini model not available. The API may have changed; try updating MODEL_NAME in analyze_text.py.")
        if "blocked" in err_msg or "safety" in err_msg or "not supported" in err_msg:
            raise ValueError("Gemini blocked this content. Try different text or check Google AI Studio settings.")
        raise


def parse_analysis_response(raw: str) -> dict:
    """
    Parse Gemini plain-text response into structured fields for API/CLI.
    """
    out = {
        "speaker_type": "Human",
        "language": "Unknown",
        "scam_detected": False,
        "explanation": "",
        "how_to_avoid": "",
        "risk_level": "Low",
    }

    raw_lower = raw.lower()
    if "speaker type:" in raw_lower:
        idx = raw_lower.find("speaker type:")
        line = raw[idx : idx + 80].split("\n")[0]
        after_colon = (line.split(":", 1)[-1] or "").strip().upper()
        if after_colon == "AI":
            out["speaker_type"] = "AI"
        else:
            out["speaker_type"] = "Human"

    lang_match = re.search(r"language:\s*([^\n]+)", raw, re.IGNORECASE)
    if lang_match:
        out["language"] = lang_match.group(1).strip()

    if "scam detected: yes" in raw_lower or "scam detected:yes" in raw_lower:
        out["scam_detected"] = True

    expl_match = re.search(
        r"explanation:\s*\n(.*?)(?=how to avoid:|\Z)",
        raw,
        re.IGNORECASE | re.DOTALL,
    )
    if expl_match:
        out["explanation"] = expl_match.group(1).strip()

    avoid_match = re.search(
        r"how to avoid:\s*\n(.*)",
        raw,
        re.IGNORECASE | re.DOTALL,
    )
    if avoid_match:
        out["how_to_avoid"] = avoid_match.group(1).strip()

    if out["scam_detected"] and out["speaker_type"] == "AI":
        out["risk_level"] = "High"
    elif out["scam_detected"]:
        out["risk_level"] = "Medium"
    else:
        out["risk_level"] = "Low"

    return out
