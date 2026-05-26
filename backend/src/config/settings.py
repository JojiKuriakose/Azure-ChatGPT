from src.config.vault_client import vault_settings

class Settings:
    # Azure OpenAI
    AZURE_OPENAI_KEY = vault_settings.azure_openai_key
    AZURE_OPENAI_ENDPOINT = vault_settings.azure_openai_endpoint
    AZURE_OPENAI_DEPLOYMENT = vault_settings.azure_openai_deployment
    AZURE_OPENAI_VERSION = vault_settings.azure_openai_version

    # Azure Search(RAG)
    AZURE_SEARCH_ENDPOINT = vault_settings.azure_search_endpoint
    AZURE_SEARCH_KEY = vault_settings.azure_search_key
    AZURE_SEARCH_INDEX = vault_settings.azure_search_index
    AZURE_EMBEDDING_DEPLOYMENT = vault_settings.azure_embedding_deployment


settings = Settings()