# EchoGuard
Detect the threat behind the words

## Overview
EchoGuard is an AI-assisted communication analysis system designed to help identify potential scams, detect language usage, and assess whether content is likely human-written or AI-assisted. The system supports audio, text, and document inputs and focuses on probabilistic analysis with clear explanations rather than absolute predictions.

## What It Does
- Analyzes text, audio, and PDF inputs
- Converts audio to text using local speech-to-text processing
- Estimates scam likelihood using linguistic and behavioral patterns
- Detects multilingual and code-mixed content
- Highlights suspicious phrases and provides explanations
- Offers safety recommendations

## Key Features
- Explainable scam detection
- Confidence-based risk assessment
- Language and code-mix detection
- Scam category classification
- Local audio transcription without cloud dependency

## Tech Stack
Python  
Gemini API (Google AI Studio)  
Whisper  
Flask  
Next.js  
Tailwind CSS  

## Project Structure
echo_guard frontend/
- app/
- components/
- echoguard/
- public/
- styles/
- package.json
- README.md

## How to Run

Backend:
- Navigate to the echoguard folder
- Install dependencies using requirements.txt
- Create a .env file and add GEMINI_API_KEY
- Run app.py

Frontend:
- Install dependencies
- Start the development server
- Open the application in the browser

## Responsible AI Note
EchoGuard provides probabilistic analysis and does not claim absolute accuracy. The results are intended to assist user decision-making and should not be treated as definitive judgments.

## License
This project is intended for educational and hackathon use.
