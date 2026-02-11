from fastapi import APIRouter, Depends, HTTPException, UploadFile, File
from sqlalchemy.ext.asyncio import AsyncSession
from sqlmodel import select
from typing import List

from app.core.db import get_session
from app.models.project import Document, DocumentRead, DocumentChunk
from app.services.embedding import generate_embedding, chunk_text

router = APIRouter()


@router.get("/", response_model=List[DocumentRead])
async def list_documents(session: AsyncSession = Depends(get_session)):
    """List all uploaded documents."""
    result = await session.execute(select(Document).order_by(Document.id.desc()))
    documents = result.scalars().all()
    return documents


@router.post("/upload", response_model=DocumentRead)
async def upload_document(file: UploadFile = File(...), session: AsyncSession = Depends(get_session)):
    """Upload a document, chunk it, embed chunks, and store in pgvector.
    
    Supported formats: .txt, .md
    Pipeline:
    1. Read file content
    2. Chunk text (500 words, 100 overlap)
    3. Embed each chunk using gemini-embedding-001 (768 dims)
    4. Store chunks + embeddings in DocumentChunk table (pgvector)
    """
    # Validate file type
    if not file.filename.endswith(('.txt', '.md')):
        raise HTTPException(
            status_code=400,
            detail="Only .txt and .md files are supported for now."
        )

    # Read content
    content = await file.read()
    text_content = content.decode("utf-8")

    # Create document record
    doc = Document(filename=file.filename, content=text_content)
    session.add(doc)
    await session.commit()
    await session.refresh(doc)

    # Chunk the text
    chunks = chunk_text(text_content)

    # Embed and store each chunk
    for i, chunk in enumerate(chunks):
        embedding = await generate_embedding(chunk)
        db_chunk = DocumentChunk(
            document_id=doc.id,
            content=chunk,
            chunk_index=i,
            embedding=embedding
        )
        session.add(db_chunk)

    # Update chunk count
    doc.chunk_count = len(chunks)
    session.add(doc)
    await session.commit()
    await session.refresh(doc)

    return doc


@router.delete("/{document_id}")
async def delete_document(document_id: int, session: AsyncSession = Depends(get_session)):
    """Delete a document and all its chunks."""
    doc = await session.get(Document, document_id)
    if not doc:
        raise HTTPException(status_code=404, detail="Document not found")

    # Delete chunks first using a bulk delete
    from sqlmodel import delete
    await session.execute(delete(DocumentChunk).where(DocumentChunk.document_id == document_id))

    await session.delete(doc)
    await session.commit()
    return {"message": f"Document '{doc.filename}' deleted successfully."}
