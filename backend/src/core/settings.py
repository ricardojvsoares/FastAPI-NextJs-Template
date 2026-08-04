from functools import lru_cache

from pydantic_settings import BaseSettings, SettingsConfigDict


class Settings(BaseSettings):
    model_config = SettingsConfigDict(
        env_file=(".env", ".env.local"),
        env_file_encoding="utf-8",
        extra="ignore",
    )

    postgres_user: str = "app"
    postgres_password: str = "app"
    postgres_db: str = "app"
    postgres_port: int = 5432
    postgres_host: str = "localhost"

    secret_key: str = "CHANGE_ME_TO_A_LONG_RANDOM_SECRET"
    access_token_lifetime_seconds: int = 3600
    cors_origins: list[str] = ["http://localhost:3000"]

    @property
    def database_url(self) -> str:
        return (
            f"postgresql+asyncpg://{self.postgres_user}:{self.postgres_password}"
            f"@{self.postgres_host}:{self.postgres_port}/{self.postgres_db}"
        )


@lru_cache
def get_settings() -> Settings:
    return Settings()
