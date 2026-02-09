# EchoGuard Backend – Setup Steps

## Step 1: Get a Gemini API key (free)

1. Open: **https://aistudio.google.com/apikey**
2. Sign in with your Google account.
3. Click **"Create API key"** (or use an existing one).
4. Copy the key (it looks like `AIzaSy...`).

---

## Step 2: Put the key in the .env file

1. Open the folder: `echoguard` (same folder as this file).
2. Open the file named **`.env`** in Notepad or any editor.
3. Find the line:  
   `GEMINI_API_KEY=your_key_from_google_ai_studio`
4. Replace `your_key_from_google_ai_studio` with your real key.  
   Example:  
   `GEMINI_API_KEY=AIzaSyB123abc...your_real_key`
5. Save the file.

---

## Step 3: Install Python dependencies (first time only)

In PowerShell:

```powershell
cd "c:\Users\harir\Desktop\echo_guard frontend\echoguard"
python -m venv .venv
.venv\Scripts\activate
pip install -r requirements.txt
```

---

## Step 4: Start the backend

In the same PowerShell (with the venv activated):

```powershell
python app.py
```

You should see something like: **Running on http://127.0.0.1:5000**

---

## Step 5: Use the frontend

1. In another terminal, start the frontend:  
   `cd "c:\Users\harir\Desktop\echo_guard frontend"` then `npm run dev`
2. Open **http://localhost:3000** in your browser.
3. The "Analyze" feature will send requests to the backend at http://localhost:5000.

**Important:** Keep the backend running (Step 4) while you use the Analyze feature on the frontend.
