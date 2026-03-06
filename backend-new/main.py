"""FastAPI application entry point."""

import os
from contextlib import asynccontextmanager
from typing import AsyncGenerator

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse

from app.api.v1.router import api_router
from app.core.config import get_settings
from app.core.database import init_db
from app.middleware.error_handler import register_error_handlers
from app.utils.response import ApiResponse

settings = get_settings()

# Create required directories
os.makedirs(settings.data_dir, exist_ok=True)
os.makedirs(settings.upload_dir, exist_ok=True)


@asynccontextmanager
async def lifespan(app: FastAPI) -> AsyncGenerator[None, None]:
    """Application lifespan handler.

    Initializes database on startup and performs cleanup on shutdown.
    """
    # Startup
    if settings.debug:
        init_db()
    yield
    # Shutdown - cleanup if needed


# Create FastAPI application
app = FastAPI(
    title=settings.app_name,
    version=settings.app_version,
    description="API for predicting vocational school students' job placement outcomes using Naive Bayes Classifier",
    lifespan=lifespan,
    docs_url="/docs",
    redoc_url="/redoc",
)

# Configure CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=settings.cors_origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Register error handlers
register_error_handlers(app)

# Include API router
app.include_router(api_router, prefix="/api/v1")


@app.get("/")
async def root() -> JSONResponse:
    """Root endpoint with API information.

    Returns:
        API information response.
    """
    return JSONResponse(
        ApiResponse.success(
            data={
                "name": settings.app_name,
                "version": settings.app_version,
                "environment": settings.environment,
                "docs": "/docs",
            },
            message="Welcome to Naive Bayes Classifier API",
        )
    )


@app.get("/health")
async def health_check() -> JSONResponse:
    """Health check endpoint.

    Returns:
        Health status response.
    """
    return JSONResponse(
        ApiResponse.success(data={"status": "healthy"}, message="Service is running")
    )


if __name__ == "__main__":
    import uvicorn

    uvicorn.run(
        "main:app",
        host=settings.host,
        port=settings.port,
        reload=settings.debug,
    )
