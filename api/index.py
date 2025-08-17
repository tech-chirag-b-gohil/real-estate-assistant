from dotenv import load_dotenv
from fastapi import FastAPI
from fastapi.responses import StreamingResponse
from api.services.chat_service import handle_chat
from api.types.openai_chat import OpenAIChatRequest

load_dotenv(".env.local")

app = FastAPI()

@app.post("/api/chat")
async def chat_endpoint(request: OpenAIChatRequest) -> StreamingResponse:
    return await handle_chat(request)

@app.get("/api/health")
async def health_check():
    return { "status": "ok" }
