from fastapi import APIRouter, Depends
from pydantic import BaseModel
from sqlalchemy.ext.asyncio import AsyncSession
from app.core.db import get_session
from app.services.gemini import rag_service

router = APIRouter()


class ChatMessage(BaseModel):
    role: str  # 'user' or 'bot'
    content: str


class ChatRequest(BaseModel):
    message: str
    history: list[ChatMessage] = []


class ChatResponse(BaseModel):
    response: str


@router.post("/", response_model=ChatResponse)
async def chat(request: ChatRequest, session: AsyncSession = Depends(get_session)):
    """Send a message to the RAG chatbot."""
    response = await rag_service.chat(
        message=request.message,
        history=request.history,
        session=session
    )
    return ChatResponse(response=response)
