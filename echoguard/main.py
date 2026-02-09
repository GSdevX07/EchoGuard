"""
EchoGuard - main.py
CLI entry point: menu for Audio / Text / PDF, runs full pipeline locally,
prints extracted text and Gemini analysis.
"""

import os
import sys
from dotenv import load_dotenv

load_dotenv()

from transcribe_audio import transcribe_audio
from utils import read_pdf
from analyze_text import analyze_text, parse_analysis_response


def main():
    print("EchoGuard – Local analysis (Whisper + Gemini)\n")
    print("1) Audio file")
    print("2) Text input")
    print("3) PDF file")
    print("4) Quit")
    choice = input("\nChoice (1–4): ").strip()

    text = ""
    if choice == "1":
        path = input("Path to audio file (.mp3/.wav): ").strip()
        if not path or not os.path.isfile(path):
            print("File not found.")
            return
        print("Transcribing with Whisper (base)...")
        text = transcribe_audio(path)
    elif choice == "2":
        print("Paste text (end with empty line or Ctrl+Z Enter):")
        lines = []
        try:
            while True:
                line = input()
                lines.append(line)
        except EOFError:
            pass
        text = "\n".join(lines).strip()
        if not text:
            print("No text entered.")
            return
    elif choice == "3":
        path = input("Path to PDF file: ").strip()
        if not path or not os.path.isfile(path):
            print("File not found.")
            return
        text = read_pdf(path)
        if not text:
            print("No text extracted from PDF.")
            return
    elif choice == "4":
        return
    else:
        print("Invalid choice.")
        return

    print("\n--- Extracted text (first 1500 chars) ---\n")
    print((text[:1500] + ("..." if len(text) > 1500 else "")))
    print("\n--- Gemini analysis ---\n")
    raw = analyze_text(text)
    print(raw)
    parsed = parse_analysis_response(raw)
    print("\n--- Parsed ---")
    print("Speaker:", parsed["speaker_type"])
    print("Language:", parsed["language"])
    print("Scam:", parsed["scam_detected"])
    print("Risk:", parsed["risk_level"])


if __name__ == "__main__":
    main()
    sys.exit(0)
