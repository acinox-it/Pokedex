"""
Health Check Routes
"""
from fastapi import APIRouter
from app.controllers.api import HealthController

router = APIRouter(tags=["Health"])


@router.get("/health")
async def health_check():
    """Application health check"""
    return await HealthController.health_check()
