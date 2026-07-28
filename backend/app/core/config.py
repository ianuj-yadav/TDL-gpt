import os
from pydantic_settings import BaseSettings

BASE_DIR = os.path.dirname(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
DEFAULT_SOURCE_DIR = os.path.join(BASE_DIR, "source_files")

class Settings(BaseSettings):
    PROJECT_NAME: str = "TDL Enterprise Assistant API"
    VERSION: str = "2.0.0"
    API_V1_STR: str = "/api"

    # Database
    DATABASE_URL: str = os.getenv(
        "DATABASE_URL",
        f"sqlite:///{os.path.join(BASE_DIR, 'tdl_gpt.db')}"  # Fallback to local SQLite if PostgreSQL URL is not set
    )

    # NVIDIA NIM LLM Configuration
    NVIDIA_API_KEY: str = os.getenv(
        "NVIDIA_API_KEY",
        "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"
    )
    DEFAULT_MODEL: str = os.getenv("TDL_MODEL_NAME", "z-ai/glm-5.2")

    # Knowledge Base Path
    SOURCE_FILES_DIR: str = os.getenv("SOURCE_FILES_DIR", DEFAULT_SOURCE_DIR)

    class Config:
        case_sensitive = True

settings = Settings()
