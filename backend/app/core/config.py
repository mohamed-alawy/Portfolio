from pydantic_settings import BaseSettings

class Settings(BaseSettings):
    PROJECT_NAME: str = "Portfolio Backend"
    API_V1_STR: str = "/api/v1"
    ALLOWED_ORIGINS: list[str] = ["http://localhost:5173", "http://localhost:3000", "http://localhost:80"]
    
    # Database
    DATABASE_URL: str | None = None
    POSTGRES_USER: str | None = None
    POSTGRES_PASSWORD: str | None = None
    POSTGRES_SERVER: str | None = None
    POSTGRES_PORT: int = 5432
    POSTGRES_DB: str = "portfolio_db"
    
    # Gemini
    GEMINI_API_KEY: str | None = None
    GENERATION_MODEL: str = "gemini-2.5-flash"
    EMBEDDING_MODEL: str = "models/text-embedding-001"
    EMBEDDING_DIMENSIONS: int = 3072
    
    # Auth
    SECRET_KEY: str | None = None
    ADMIN_USERNAME: str | None = None
    ADMIN_PASSWORD: str | None = None
    
    def get_database_url(self) -> str:
        if self.DATABASE_URL:
            val = self.DATABASE_URL
            if val.startswith("postgresql://"):
                val = val.replace("postgresql://", "postgresql+asyncpg://", 1)
            
            # Remove incompatible params like sslmode=require from the URL string
            if "?" in val:
                base_url, query = val.split("?", 1)
                # asyncpg doesn't like sslmode, it uses 'ssl' parameter or nothing
                # For Neon, we can usually just strip the query params if we use the right driver
                return base_url
            return val
        return f"postgresql+asyncpg://{self.POSTGRES_USER}:{self.POSTGRES_PASSWORD}@{self.POSTGRES_SERVER}:{self.POSTGRES_PORT}/{self.POSTGRES_DB}"

    class Config:
        env_file = ".env"

settings = Settings()
