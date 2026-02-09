"""
EchoGuard - transcribe_audio.py
Local audio transcription using OpenAI Whisper (base model).
Fully local execution; no external API calls for transcription.
"""

import whisper


def transcribe_audio(audio_path: str) -> str:
    """
    Transcribe audio file to text using Whisper base model (local).
    :param audio_path: Path to audio file (e.g. .mp3, .wav).
    :return: Extracted text from the audio.
    """
    model = whisper.load_model("base")
    result = model.transcribe(audio_path)
    return (result.get("text") or "").strip()
