from fastapi import APIRouter, Depends, HTTPException
from sqlmodel import select
from sqlalchemy.ext.asyncio import AsyncSession
from typing import List

from app.core.db import get_session
from app.models.portfolio import (
    Experience, ExperienceCreate, ExperienceRead,
    Certification, CertificationCreate, CertificationRead,
    About, AboutCreate, AboutRead
)

router = APIRouter()

# --- Experience ---

@router.get("/experience", response_model=List[ExperienceRead])
async def read_experiences(session: AsyncSession = Depends(get_session)):
    result = await session.execute(select(Experience))
    return result.scalars().all()

@router.post("/experience", response_model=ExperienceRead)
async def create_experience(item: ExperienceCreate, session: AsyncSession = Depends(get_session)):
    db_item = Experience.model_validate(item)
    session.add(db_item)
    await session.commit()
    await session.refresh(db_item)
    return db_item

@router.put("/experience/{item_id}", response_model=ExperienceRead)
async def update_experience(item_id: int, item: ExperienceCreate, session: AsyncSession = Depends(get_session)):
    db_item = await session.get(Experience, item_id)
    if not db_item:
        raise HTTPException(status_code=404, detail="Experience not found")
    item_data = item.model_dump(exclude_unset=True)
    for key, value in item_data.items():
        setattr(db_item, key, value)
    session.add(db_item)
    await session.commit()
    await session.refresh(db_item)
    return db_item

@router.delete("/experience/{item_id}")
async def delete_experience(item_id: int, session: AsyncSession = Depends(get_session)):
    db_item = await session.get(Experience, item_id)
    if not db_item:
        raise HTTPException(status_code=404, detail="Experience not found")
    await session.delete(db_item)
    await session.commit()
    return {"ok": True}

# --- Certification ---

@router.get("/certifications", response_model=List[CertificationRead])
async def read_certifications(session: AsyncSession = Depends(get_session)):
    result = await session.execute(select(Certification))
    return result.scalars().all()

@router.post("/certifications", response_model=CertificationRead)
async def create_certification(item: CertificationCreate, session: AsyncSession = Depends(get_session)):
    db_item = Certification.model_validate(item)
    session.add(db_item)
    await session.commit()
    await session.refresh(db_item)
    return db_item

@router.put("/certifications/{item_id}", response_model=CertificationRead)
async def update_certification(item_id: int, item: CertificationCreate, session: AsyncSession = Depends(get_session)):
    db_item = await session.get(Certification, item_id)
    if not db_item:
        raise HTTPException(status_code=404, detail="Certification not found")
    item_data = item.model_dump(exclude_unset=True)
    for key, value in item_data.items():
        setattr(db_item, key, value)
    session.add(db_item)
    await session.commit()
    await session.refresh(db_item)
    return db_item

@router.delete("/certifications/{item_id}")
async def delete_certification(item_id: int, session: AsyncSession = Depends(get_session)):
    db_item = await session.get(Certification, item_id)
    if not db_item:
        raise HTTPException(status_code=404, detail="Certification not found")
    await session.delete(db_item)
    await session.commit()
    return {"ok": True}


# --- About ---

@router.get("/about", response_model=AboutRead)
async def read_about(session: AsyncSession = Depends(get_session)):
    result = await session.execute(select(About))
    about_item = result.scalars().first()
    if not about_item:
        # Create default empty about if none exists
        about_item = About(content="Default about content.")
        session.add(about_item)
        await session.commit()
        await session.refresh(about_item)
    return about_item

@router.put("/about", response_model=AboutRead)
async def update_about(item: AboutCreate, session: AsyncSession = Depends(get_session)):
    result = await session.execute(select(About))
    db_item = result.scalars().first()
    if not db_item:
        db_item = About(content=item.content)
        session.add(db_item)
    else:
        db_item.content = item.content
        session.add(db_item)
    
    await session.commit()
    await session.refresh(db_item)
    return db_item
