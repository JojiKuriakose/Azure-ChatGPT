from fastapi import APIRouter, HTTPException
from src.models.chat_models import ChatRequest, ChatResponse
from src.utils.azure_util import azure_client, azure_history
from src.config.settings import settings

router = APIRouter(
        prefix="/api/azure",
        tags=["Global GPT"]
    )

@router.post("/global", response_model=ChatResponse)
async def global_search(request: ChatRequest):
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
        stream=False
    )

    if not response:
        raise HTTPException(status_code=404, detail="No results found")
    
    answer=response.choices[0].message.content.strip()
    azure_history.append({"role": "assistant", "content": answer})
    return ChatResponse(answer=answer, conversation_id=request.conversation_id)

    

    