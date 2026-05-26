from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from src.routes.global_search_route import router as global_search_route
from src.routes.custom_search_route import router as custom_search_route
from src.routes.image_generator_route import router as image_generator_route

app=FastAPI(
    title="Azure ChatGPT API",
    version="1.0.0",
    description="API for Azure ChatGPT with Azure Search Integration",
    docs_url="/swagger",
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Register routes
app.include_router(global_search_route)
app.include_router(custom_search_route)
app.include_router(image_generator_route)