from pydantic import BaseModel
from typing import List, Optional

class ChatRequest(BaseModel):
    question: str
    use_history: Optional[bool] = True
    mode: Optional[str]= "global"
    conversation_id: Optional[str] = None

class ChatResponse(BaseModel):
    answer: str
    conversation_id: Optional[str]= None
    