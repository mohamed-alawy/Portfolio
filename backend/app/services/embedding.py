import google.generativeai as genai
from typing import List
from app.core.config import settings

# Configure Gemini
genai.configure(api_key=settings.GEMINI_API_KEY)

EMBEDDING_MODEL = settings.EMBEDDING_MODEL
EMBEDDING_DIMENSIONS = settings.EMBEDDING_DIMENSIONS


async def generate_embedding(text: str) -> List[float]:
    """Generate an embedding for a single text using Gemini Embedding API."""
    result = genai.embed_content(
        model=EMBEDDING_MODEL,
        content=text,
        task_type="RETRIEVAL_DOCUMENT"
    )
    return result["embedding"]


async def generate_query_embedding(query: str) -> List[float]:
    """Generate an embedding for a search query (uses RETRIEVAL_QUERY task type)."""
    result = genai.embed_content(
        model=EMBEDDING_MODEL,
        content=query,
        task_type="RETRIEVAL_QUERY"
    )
    return result["embedding"]


def chunk_text(text: str, chunk_size: int = 200, overlap: int = 50) -> List[str]:
    """Split text into overlapping chunks."""
    chunks = []
    words = text.split()
    if not words:
        return []

    if len(words) <= chunk_size:
        return [text]

    start = 0
    while start < len(words):
        end = start + chunk_size
        chunk = " ".join(words[start:end])
        chunks.append(chunk)
        start = end - overlap  # overlap

    return chunks
