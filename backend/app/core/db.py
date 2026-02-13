from sqlmodel import SQLModel
from sqlalchemy.ext.asyncio import AsyncSession, create_async_engine
from sqlalchemy.orm import sessionmaker
from sqlalchemy import text
from app.core.config import settings

# Import all models so SQLModel.metadata picks them up
from app.models.project import (  # noqa: F401
    Project, ContactMessage, Document, DocumentChunk
)
from app.models.portfolio import (  # noqa: F401
    Experience, Certification, About, Skill,
    Testimonial, ContactInfo, CV
)

# Create Async Engine
engine = create_async_engine(settings.get_database_url(), echo=False, future=True)


async def init_db():
    async with engine.begin() as conn:
        # Enable pgvector extension
        await conn.execute(text("CREATE EXTENSION IF NOT EXISTS vector"))
        
        # -----------------------------------------------------------------------
        # AUTO-MIGRATION FIX:
        # Since we added 'link' to Testimonial after the table was created, 
        # we manually ensure the column exists. 'IF NOT EXISTS' prevents errors.
        # -----------------------------------------------------------------------
        try:
            await conn.execute(text("ALTER TABLE testimonial ADD COLUMN IF NOT EXISTS link TEXT"))
            await conn.execute(text("ALTER TABLE testimonial ADD COLUMN IF NOT EXISTS role TEXT"))
        except Exception as e:
            pass

        try:
            # SQLModel uses lowercase class name by default: 'contactinfo'
            await conn.execute(text("ALTER TABLE contactinfo ADD COLUMN IF NOT EXISTS whatsapp TEXT"))
        except Exception as e:
            pass

        # Create all tables
        await conn.run_sync(SQLModel.metadata.create_all)


async def get_session() -> AsyncSession:
    async_session = sessionmaker(
        engine, class_=AsyncSession, expire_on_commit=False
    )
    async with async_session() as session:
        yield session
