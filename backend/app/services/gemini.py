import google.generativeai as genai
from typing import List
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import text
from app.core.config import settings
from app.services.embedding import generate_query_embedding

# Configure Gemini
genai.configure(api_key=settings.GEMINI_API_KEY)

SYSTEM_PROMPT = """You are Mohamed Usama Alawy','محمد اسامة علوي's AI assistant on his portfolio website. 
You speak AS Mohamed — use "I", "my", "me" when referring to Mohamed.
You are friendly, professional, and confident.

Rules:
1. Speak in the EXACT SAME LANGUAGE the user uses. If the user asks in English, answer in English. If they ask in Arabic, answer in Arabic. NEVER switch languages unless the user does.
2. Be professional yet friendly and approachable.
3. Use the provided context to answer questions about your projects, experience, and skills.
4. IMPORTANT: Never mention "provided context", "documents", or "my resume doesn't state..." to the visitor. If you don't find a specific detail, just give a polite, personal response like:
   - English: "I'd love to tell you more about that! Feel free to reach out via the contact form below or my email (mohamed.alawy.21@gmail.com) and we can chat."
   - Arabic: "يسعدني جداً إني أكلمك أكتر عن النقطة دي! تقدر تتواصل معايا مباشرة من خلال فورم التواصل تحت أو الإيميل بتاعي وهرد عليك في أقرب وقت."
5. Keep responses concise (2-4 sentences) and focus on building a connection.
6. Your goal is to showcase your expertise and encourage visitors to collaborate with you."""

GENERATION_MODEL = settings.GENERATION_MODEL


async def retrieve_relevant_chunks(query: str, session: AsyncSession, top_k: int = 5) -> List[str]:
    """Search pgvector for the most relevant document chunks."""
    query_embedding = await generate_query_embedding(query)

    # pgvector cosine similarity search
    embedding_str = "[" + ",".join(str(x) for x in query_embedding) + "]"
    sql = text("""
        SELECT content, 1 - (embedding <=> CAST(:embedding AS vector)) as similarity
        FROM documentchunk
        ORDER BY embedding <=> CAST(:embedding AS vector)
        LIMIT :top_k
    """)

    result = await session.execute(sql, {
        "embedding": embedding_str,
        "top_k": top_k
    })

    rows = result.fetchall()
    return [row[0] for row in rows if row[1] > 0.3]  # Filter by minimum similarity


async def generate_rag_response(query: str, context_chunks: List[str], history: List = []) -> str:
    """Generate a response using Gemini 1.5 Flash with retrieved context and history."""
    context = "\n\n---\n\n".join(context_chunks) if context_chunks else "No relevant documents found."
    
    # Format history
    history_text = ""
    for msg in history:
        role = "Visitor" if msg.role == "user" else "Mohamed"
        history_text += f"{role}: {msg.content}\n"

    prompt = f"""CONTEXT FROM MY DOCUMENTS:
{context}

---
PREVIOUS CONVERSATION HISTORY:
{history_text}
---

USER QUESTION: {query}

Please answer based on the context and history above. Be concise and natural."""

    model = genai.GenerativeModel(
        model_name=GENERATION_MODEL,
        system_instruction=SYSTEM_PROMPT
    )

    response = model.generate_content(prompt)
    return response.text


class RAGService:
    """Full RAG pipeline: Retrieve + Generate."""

    async def chat(self, message: str, history: List, session: AsyncSession) -> str:
        try:
            # Step 1: Retrieve relevant chunks from pgvector
            chunks = await retrieve_relevant_chunks(message, session)

            # Step 2: Generate response with context and history
            response = await generate_rag_response(message, chunks, history)
            return response
        except Exception as e:
            return f"Sorry, I encountered an error: {str(e)}"


rag_service = RAGService()
