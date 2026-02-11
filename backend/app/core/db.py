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
    Experience, Certification, About
)

# Create Async Engine
engine = create_async_engine(settings.get_database_url(), echo=False, future=True)


async def init_db():
    async with engine.begin() as conn:
        # Enable pgvector extension
        await conn.execute(text("CREATE EXTENSION IF NOT EXISTS vector"))
        # Create all tables
        await conn.run_sync(SQLModel.metadata.create_all)


async def get_session() -> AsyncSession:
    async_session = sessionmaker(
        engine, class_=AsyncSession, expire_on_commit=False
    )
    async with async_session() as session:
        yield session
