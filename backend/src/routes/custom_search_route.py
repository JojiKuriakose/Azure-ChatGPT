from fastapi import APIRouter, HTTPException
from src.models.chat_models import ChatRequest, ChatResponse
from src.utils.azure_util import azure_client, azure_history
from src.config.settings import settings

router = APIRouter(
    prefix="/api/azure",
    tags=["Custom Search"])

@router.post("/custom", response_model=ChatResponse)
async def custom_search(request: ChatRequest):
    if not settings:
        raise HTTPException(status_code=401, detail="Authentication is required and has failed or not been provided.")
    
    question=request.question.strip()
    if not question:
        raise HTTPException(status_code=400, detail="Question cannot be empty")
    
    azure_history.append({"role": "user", "content": question})
    messages=[{"role": "system", "content": "You are a helpful AI assistant."}, *azure_history]

    response = azure_client.chat.completions.create(
        model=settings.AZURE_OPENAI_DEPLOYMENT,
        messages=messages,
        max_tokens=2048,
        temperature=0.7,#mode behaviour:creative(0.8-1.0),balanced(0.4-0.7),precise(0.0-0.3)
        top_p=0.95,#nucleus sampling: 0.8-1.0: more diverse, 0.5-0.8: more focused
        stream=False,
        extra_body={
                "data_sources": [{
                    "type": "azure_search",
                    "parameters": {
                        "endpoint": settings.AZURE_SEARCH_ENDPOINT,
                        "index_name": settings.AZURE_SEARCH_INDEX,
                        "semantic_configuration": f"{settings.AZURE_SEARCH_INDEX}-semantic-configuration",
                        "query_type": "vector_semantic_hybrid",
                        "fields_mapping": {}, #default mapping
                        "in_scope": True, #consider retrieved documents
                        "strictness": 3, #relevance strictness 1-4
                        "top_n_documents": 5, #number of documents to retrieve
                        "authentication": {
                            "type": "api_key",
                            "key": settings.AZURE_SEARCH_KEY
                        },
                        "embedding_dependency": {
                            "type": "deployment_name",
                            "deployment_name": settings.AZURE_EMBEDDING_DEPLOYMENT
                        }
                    }
                }]
            }
    )

    if not response:
        raise HTTPException(status_code=404, detail="No results found")
    
    answer=response.choices[0].message.content.strip()
    azure_history.append({"role": "assistant", "content": answer})
    return ChatResponse(answer=answer, conversation_id=request.conversation_id)