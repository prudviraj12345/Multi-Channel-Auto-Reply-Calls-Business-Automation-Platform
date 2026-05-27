from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from dotenv import load_dotenv
import google.generativeai as genai
import os

# Load environment variables
load_dotenv()

# Configure Gemini API
genai.configure(
    api_key=os.getenv("GEMINI_API_KEY")
)

# Gemini Model
model = genai.GenerativeModel("gemini-flash-latest")

# FastAPI App
app = FastAPI()

# Enable CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Request Model
class ChatRequest(BaseModel):
    message: str

# Home Route
@app.get("/")
def home():
    return {
        "message": "Gemini AI Backend Running Successfully"
    }

# Chat Route
@app.post("/chat")
async def chat(request: ChatRequest):

    try:

        prompt = f"""
        You are a professional AI business assistant.

        Customer Message:
        {request.message}

        Reply professionally and clearly.
        """

        response = model.generate_content(prompt)

        ai_reply = response.text

        return {
            "reply": ai_reply
        }

    except Exception as e:

        print("ERROR:", str(e))

        return {
            "reply": f"Gemini request failed: {str(e)}"
        }