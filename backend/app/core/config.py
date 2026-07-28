import os
from pydantic_settings import BaseSettings

BASE_DIR = os.path.dirname(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
DEFAULT_SOURCE_DIR = os.path.join(BASE_DIR, "source_files")

def get_default_db_url():
    env_url = os.getenv("DATABASE_URL")
    if env_url:
        return env_url
    # In Vercel or read-only cloud environments, use /tmp for SQLite database
    if os.environ.get("VERCEL") or os.environ.get("AWS_EXECUTION_ENV"):
        return "sqlite:////tmp/tdl_gpt.db"
    try:
        test_file = os.path.join(BASE_DIR, ".write_test")
        with open(test_file, "w") as f:
            f.write("1")
        os.remove(test_file)
        return f"sqlite:///{os.path.join(BASE_DIR, 'tdl_gpt.db')}"
    except Exception:
        return "sqlite:////tmp/tdl_gpt.db"

class Settings(BaseSettings):
    PROJECT_NAME: str = "TDL Enterprise Assistant API"
    VERSION: str = "2.0.0"
    API_V1_STR: str = "/api"

    # Database URL dynamically resolved for serverless compatibility
    DATABASE_URL: str = get_default_db_url()

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
