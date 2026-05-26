from openai import AzureOpenAI
from src.config.settings import settings

azure_history = []

azure_client = AzureOpenAI(
    api_key=settings.AZURE_OPENAI_KEY,
    azure_endpoint=settings.AZURE_OPENAI_ENDPOINT,
    api_version=settings.AZURE_OPENAI_VERSION
)