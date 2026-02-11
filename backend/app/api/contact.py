from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.ext.asyncio import AsyncSession
from sqlmodel import select
from typing import List

from app.core.db import get_session
from app.models.project import ContactMessage, ContactMessageCreate, ContactMessageRead

router = APIRouter()


@router.get("/", response_model=List[ContactMessageRead])
async def get_messages(session: AsyncSession = Depends(get_session)):
    """Get all contact messages (for admin dashboard)."""
    result = await session.execute(select(ContactMessage).order_by(ContactMessage.id.desc()))
    messages = result.scalars().all()
    return messages


@router.post("/", response_model=ContactMessageRead, status_code=201)
async def create_message(message: ContactMessageCreate, session: AsyncSession = Depends(get_session)):
    """Submit a contact message (public endpoint)."""
    db_message = ContactMessage.model_validate(message)
    session.add(db_message)
    await session.commit()
    await session.refresh(db_message)
    return db_message


@router.patch("/{message_id}/read")
async def mark_as_read(message_id: int, session: AsyncSession = Depends(get_session)):
    """Mark a message as read."""
    message = await session.get(ContactMessage, message_id)
    if not message:
        raise HTTPException(status_code=404, detail="Message not found")
    
    message.read = True
    session.add(message)
    await session.commit()
    return {"message": "Marked as read"}


@router.delete("/{message_id}")
async def delete_message(message_id: int, session: AsyncSession = Depends(get_session)):
    """Delete a contact message."""
    message = await session.get(ContactMessage, message_id)
    if not message:
        raise HTTPException(status_code=404, detail="Message not found")
    
    await session.delete(message)
    await session.commit()
    return {"message": "Message deleted successfully"}
