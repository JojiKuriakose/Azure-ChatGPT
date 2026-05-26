import os
from dotenv import load_dotenv
from azure.identity import ClientSecretCredential
from azure.keyvault.secrets import SecretClient

load_dotenv()

key_vault_uri = os.getenv("KEY_VAULT_URI")
client_id = os.getenv("APP_CLIENT_ID")
tenant_id = os.getenv("APP_TENANT_ID")
client_secret = os.getenv("APP_CLIENT_SECRET")

credential = ClientSecretCredential(
    tenant_id=tenant_id,
    client_id=client_id,
    client_secret=client_secret
)

key_vault_client = SecretClient(vault_url=key_vault_uri, credential=credential)

class VaultSettings:
    azure_openai_endpoint = key_vault_client.get_secret("AZURE-OPENAI-ENDPOINT").value
    azure_openai_key = key_vault_client.get_secret("AZURE-OPENAI-KEY").value
    azure_openai_deployment = key_vault_client.get_secret("AZURE-OPENAI-DEPLOYMENT").value
    azure_openai_version = key_vault_client.get_secret("AZURE-OPENAI-VERSION").value
    azure_search_endpoint = key_vault_client.get_secret("AZURE-SEARCH-ENDPOINT").value
    azure_search_key = key_vault_client.get_secret("AZURE-SEARCH-KEY").value
    azure_search_index = key_vault_client.get_secret("AZURE-SEARCH-INDEX").value
    azure_embedding_deployment = key_vault_client.get_secret("AZURE-EMBEDDING-DEPLOYMENT").value

vault_settings = VaultSettings()


   
