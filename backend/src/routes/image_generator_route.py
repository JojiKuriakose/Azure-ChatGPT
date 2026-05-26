from fastapi import APIRouter, HTTPException
from src.models.chat_models import ChatRequest, ChatResponse

router = APIRouter(
    prefix="/api/azure",
    tags=["Image Generator"])

@router.post("/image", response_model=ChatResponse)
async def generate_image(request: ChatRequest):
    """
    Perform an image generation task.

    - **query**: The image description string.
    """
    # Placeholder for the actual image generation implementation
    # You would typically call your image generation service or API here
    results = []  # Replace with actual image generation results
    return ChatResponse(answer="My Image", conversation_id=request.conversation_id)

    if not results:
        raise HTTPException(status_code=404, detail="No results found")

    return {"results": results}