from pydantic_settings import BaseSettings

class Settings(BaseSettings):
    BOT_TOKEN: str
    DEMO_LIMIT: int = 1

    class Config:
        env_file = ".env"

settings = Settings()