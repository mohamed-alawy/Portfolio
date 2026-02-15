from fastapi import APIRouter, Depends, HTTPException, Query
from pydantic import BaseModel
from sqlalchemy.ext.asyncio import AsyncSession
from app.core.db import get_session
from app.services.gemini import rag_service
from datetime import datetime
from sqlmodel import select, delete

from app.models.portfolio import ChatbotSettings, UserQuestion, UserQuestionCreate, UserQuestionRead

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
    """Send a message to the RAG chatbot and store it."""
    # Check chatbot status
    result = await session.execute(select(ChatbotSettings))
    settings = result.scalars().first()
    
    response_text = ""
    
    if settings and not settings.is_active:
        response_text = settings.inactive_message
        # Store the question and the inactive response
        question = UserQuestion(
            content=request.message,
            response=response_text,
            timestamp=datetime.utcnow().isoformat()
        )
        session.add(question)
        await session.commit()
        return ChatResponse(response=response_text)

    # Bot is active, get RAG response
    response_text = await rag_service.chat(
        message=request.message,
        history=request.history,
        session=session
    )
    
    # Store the question and response
    question = UserQuestion(
        content=request.message,
        response=response_text,
        timestamp=datetime.utcnow().isoformat()
    )
    session.add(question)
    await session.commit()
    
    return ChatResponse(response=response_text)


@router.get("/history", response_model=list[UserQuestionRead])
async def get_chat_history(session: AsyncSession = Depends(get_session)):
    """Get all stored user questions (for admin)."""
    result = await session.execute(select(UserQuestion).order_by(UserQuestion.id.desc()))
    return result.scalars().all()


@router.delete("/history/{question_id}")
async def delete_chat_question(question_id: int, session: AsyncSession = Depends(get_session)):
    """Delete a specific chat question."""
    question = await session.get(UserQuestion, question_id)
    if not question:
        raise HTTPException(status_code=404, detail="Question not found")
    
    await session.delete(question)
    await session.commit()
    return {"message": "Question deleted"}


@router.delete("/history")
async def delete_all_chat_history(session: AsyncSession = Depends(get_session)):
    """Delete all chat history."""
    await session.execute(delete(UserQuestion))
    await session.commit()
    return {"message": "All chat history deleted"}
