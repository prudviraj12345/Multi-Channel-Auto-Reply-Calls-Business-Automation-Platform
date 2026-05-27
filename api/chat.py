from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import google.generativeai as genai
import os

# Configure Gemini API using environment variable set in Vercel
genai.configure(api_key=os.environ.get("GEMINI_API_KEY"))

model = genai.GenerativeModel("gemini-flash-latest")

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class ChatRequest(BaseModel):
    message: str

@app.get("/")
def home():
    return {"message": "Gemini AI Backend Running Successfully"}

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
        return {"reply": ai_reply}

    except Exception as e:
        return {"reply": f"Gemini request failed: {str(e)}"}
