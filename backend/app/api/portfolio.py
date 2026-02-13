from fastapi import APIRouter, Depends, HTTPException
from sqlmodel import select
from sqlalchemy.ext.asyncio import AsyncSession
from typing import List

from app.core.db import get_session
from app.models.portfolio import (
    Experience, ExperienceCreate, ExperienceRead,
    Certification, CertificationCreate, CertificationRead,
    About, AboutCreate, AboutRead,
    ChatbotSettings, ChatbotSettingsCreate, ChatbotSettingsRead,
    Skill, SkillCreate, SkillRead,
    Testimonial, TestimonialCreate, TestimonialRead,
    ContactInfo, ContactInfoCreate, ContactInfoRead,
    CV, CVCreate, CVRead
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


# --- Chatbot Settings ---

@router.get("/chatbot-settings", response_model=ChatbotSettingsRead)
async def read_chatbot_settings(session: AsyncSession = Depends(get_session)):
    result = await session.execute(select(ChatbotSettings))
    settings = result.scalars().first()
    if not settings:
        settings = ChatbotSettings(is_active=True, inactive_message="I am currently offline. Please contact me via email.")
        session.add(settings)
        await session.commit()
        await session.refresh(settings)
    return settings

@router.put("/chatbot-settings", response_model=ChatbotSettingsRead)
async def update_chatbot_settings(item: ChatbotSettingsCreate, session: AsyncSession = Depends(get_session)):
    result = await session.execute(select(ChatbotSettings))
    db_item = result.scalars().first()
    if not db_item:
        db_item = ChatbotSettings(is_active=item.is_active, inactive_message=item.inactive_message)
        session.add(db_item)
    else:
        db_item.is_active = item.is_active
        db_item.inactive_message = item.inactive_message
        session.add(db_item)
    
    await session.commit()
    await session.refresh(db_item)
    return db_item


# --- Skills ---

@router.get("/skills", response_model=List[SkillRead])
async def read_skills(session: AsyncSession = Depends(get_session)):
    result = await session.execute(select(Skill))
    return result.scalars().all()

@router.post("/skills", response_model=SkillRead)
async def create_skill(item: SkillCreate, session: AsyncSession = Depends(get_session)):
    db_item = Skill.model_validate(item)
    session.add(db_item)
    await session.commit()
    await session.refresh(db_item)
    return db_item

@router.put("/skills/{item_id}", response_model=SkillRead)
async def update_skill(item_id: int, item: SkillCreate, session: AsyncSession = Depends(get_session)):
    db_item = await session.get(Skill, item_id)
    if not db_item:
        raise HTTPException(status_code=404, detail="Skill not found")
    item_data = item.model_dump(exclude_unset=True)
    for key, value in item_data.items():
        setattr(db_item, key, value)
    session.add(db_item)
    await session.commit()
    await session.refresh(db_item)
    return db_item

@router.delete("/skills/{item_id}")
async def delete_skill(item_id: int, session: AsyncSession = Depends(get_session)):
    db_item = await session.get(Skill, item_id)
    if not db_item:
        raise HTTPException(status_code=404, detail="Skill not found")
    await session.delete(db_item)
    await session.commit()
    return {"ok": True}


# --- Testimonials ---

@router.get("/testimonials", response_model=List[TestimonialRead])
async def read_testimonials(session: AsyncSession = Depends(get_session)):
    result = await session.execute(select(Testimonial))
    return result.scalars().all()

@router.post("/testimonials", response_model=TestimonialRead)
async def create_testimonial(item: TestimonialCreate, session: AsyncSession = Depends(get_session)):
    db_item = Testimonial.model_validate(item)
    session.add(db_item)
    await session.commit()
    await session.refresh(db_item)
    return db_item

@router.put("/testimonials/{item_id}", response_model=TestimonialRead)
async def update_testimonial(item_id: int, item: TestimonialCreate, session: AsyncSession = Depends(get_session)):
    db_item = await session.get(Testimonial, item_id)
    if not db_item:
        raise HTTPException(status_code=404, detail="Testimonial not found")
    item_data = item.model_dump(exclude_unset=True)
    for key, value in item_data.items():
        setattr(db_item, key, value)
    session.add(db_item)
    await session.commit()
    await session.refresh(db_item)
    return db_item

@router.delete("/testimonials/{item_id}")
async def delete_testimonial(item_id: int, session: AsyncSession = Depends(get_session)):
    db_item = await session.get(Testimonial, item_id)
    if not db_item:
        raise HTTPException(status_code=404, detail="Testimonial not found")
    await session.delete(db_item)
    await session.commit()
    return {"ok": True}


# --- Contact Info ---

@router.get("/contact-info", response_model=ContactInfoRead)
async def read_contact_info(session: AsyncSession = Depends(get_session)):
    result = await session.execute(select(ContactInfo))
    info = result.scalars().first()
    if not info:
        info = ContactInfo(email="", phone="", github="", linkedin="", twitter="", location="")
        session.add(info)
        await session.commit()
        await session.refresh(info)
    return info

@router.put("/contact-info", response_model=ContactInfoRead)
async def update_contact_info(item: ContactInfoCreate, session: AsyncSession = Depends(get_session)):
    result = await session.execute(select(ContactInfo))
    db_item = result.scalars().first()
    if not db_item:
        db_item = ContactInfo(**item.model_dump())
        session.add(db_item)
    else:
        item_data = item.model_dump(exclude_unset=True)
        for key, value in item_data.items():
            setattr(db_item, key, value)
    
    await session.commit()
    await session.refresh(db_item)
    return db_item


# --- CV ---

@router.get("/cv", response_model=CVRead)
async def read_cv(session: AsyncSession = Depends(get_session)):
    result = await session.execute(select(CV))
    cv_item = result.scalars().first()
    if not cv_item:
        cv_item = CV(file_url="", updated_at="")
        session.add(cv_item)
        await session.commit()
        await session.refresh(cv_item)
    return cv_item

@router.put("/cv", response_model=CVRead)
async def update_cv(item: CVCreate, session: AsyncSession = Depends(get_session)):
    result = await session.execute(select(CV))
    db_item = result.scalars().first()
    if not db_item:
        db_item = CV(file_url=item.file_url, updated_at=item.updated_at)
        session.add(db_item)
    else:
        db_item.file_url = item.file_url
        db_item.updated_at = item.updated_at
    
    await session.commit()
    await session.refresh(db_item)
    return db_item

