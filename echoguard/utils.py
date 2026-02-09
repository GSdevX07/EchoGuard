"""
EchoGuard - utils.py
Helper functions: PDF text extraction.
Uses pypdf for local, dependency-only PDF reading (no cloud).
"""

from pypdf import PdfReader


def read_pdf(pdf_path: str) -> str:
    """
    Extract full text from a PDF file.
    :param pdf_path: Path to the PDF file.
    :return: Extracted text as a single string, or empty string on error.
    """
    try:
        reader = PdfReader(pdf_path)
        parts = []
        for page in reader.pages:
            text = page.extract_text()
            if text:
                parts.append(text)
        return "\n".join(parts).strip() if parts else ""
    except Exception:
        return ""
