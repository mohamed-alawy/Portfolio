from typing import List, Optional
from sqlmodel import Field, SQLModel, Column
from sqlalchemy import ARRAY, String, Text, DateTime, Integer, Float
from pgvector.sqlalchemy import Vector
from datetime import datetime


# --- Project ---

class ProjectBase(SQLModel):
    title: str
    description: str
    category: str
    full_description: Optional[str] = None
    tags: List[str] = Field(default=[], sa_column=Column(ARRAY(String), server_default="{}"))
    github_link: Optional[str] = None
    demo_link: Optional[str] = None
    demo_label: Optional[str] = None
    image_urls: List[str] = Field(default=[], sa_column=Column(ARRAY(String), server_default="{}"))


class Project(ProjectBase, table=True):
    id: Optional[int] = Field(default=None, primary_key=True)


class ProjectCreate(ProjectBase):
    pass


class ProjectRead(ProjectBase):
    id: int


# --- Contact Message ---

class ContactMessageBase(SQLModel):
    name: str
    email: str
    message: str


class ContactMessage(ContactMessageBase, table=True):
    id: Optional[int] = Field(default=None, primary_key=True)
    read: bool = Field(default=False)


class ContactMessageCreate(ContactMessageBase):
    pass


class ContactMessageRead(ContactMessageBase):
    id: int
    read: bool


# --- RAG Documents ---

class Document(SQLModel, table=True):
    id: Optional[int] = Field(default=None, primary_key=True)
    filename: str
    content: str = Field(sa_column=Column(Text))
    chunk_count: int = Field(default=0)
    created_at: str = Field(default_factory=lambda: datetime.utcnow().isoformat())


class DocumentRead(SQLModel):
    id: int
    filename: str
    chunk_count: int
    created_at: str


class DocumentChunk(SQLModel, table=True):
    id: Optional[int] = Field(default=None, primary_key=True)
    document_id: int = Field(foreign_key="document.id")
    content: str = Field(sa_column=Column(Text))
    chunk_index: int
    embedding: List[float] = Field(sa_column=Column(Vector(3072)))  # gemini-embedding-001 @ 3072 dims
