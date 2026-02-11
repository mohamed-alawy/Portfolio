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


from sqlmodel import select
from app.models.portfolio import ChatbotSettings

@router.post("/", response_model=ChatResponse)
async def chat(request: ChatRequest, session: AsyncSession = Depends(get_session)):
    """Send a message to the RAG chatbot."""
    # Check chatbot status
    result = await session.execute(select(ChatbotSettings))
    settings = result.scalars().first()
    
    if settings and not settings.is_active:
        return ChatResponse(response=settings.inactive_message)

    response = await rag_service.chat(
        message=request.message,
        history=request.history,
        session=session
    )
    return ChatResponse(response=response)
