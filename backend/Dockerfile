FROM ghcr.io/astral-sh/uv:0.9.28-python3.10-bookworm

WORKDIR /app

COPY requirements.txt .
RUN uv pip install -r requirements.txt --system

COPY . .

EXPOSE 7860

CMD ["uvicorn", "app.main:app", "--host", "0.0.0.0", "--port", "7860"]
