from contextlib import asynccontextmanager
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.orm import sessionmaker
from app.core.db import init_db, engine
from app.core.seed import seed_projects
from app.core.config import settings
from app.api import projects, contact, chat, documents, auth, uploads, portfolio


@asynccontextmanager
async def lifespan(app: FastAPI):
    # Startup: Create tables + seed data
    await init_db()
    
    # Seed projects into DB if empty
    async_session = sessionmaker(engine, class_=AsyncSession, expire_on_commit=False)
    async with async_session() as session:
        await seed_projects(session)
    
    yield


app = FastAPI(
    title="Portfolio Backend",
    version="1.0.0",
    lifespan=lifespan
)

# CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=settings.ALLOWED_ORIGINS,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Public routes
app.include_router(auth.router, prefix="/api/v1/auth", tags=["Auth"])
app.include_router(chat.router, prefix="/api/v1/chat", tags=["Chat (RAG)"])

# Admin routes
app.include_router(projects.router, prefix="/api/v1/projects", tags=["Projects"])
app.include_router(contact.router, prefix="/api/v1/contact", tags=["Contact"])
app.include_router(documents.router, prefix="/api/v1/documents", tags=["Documents (RAG)"])
app.include_router(uploads.router, prefix="/api/v1/uploads", tags=["Uploads"])
app.include_router(portfolio.router, prefix="/api/v1", tags=["Portfolio"])


@app.get("/")
def read_root():
    return {"message": "Welcome to the Portfolio Backend API"}


@app.get("/health")
def health_check():
    return {"status": "healthy"}
