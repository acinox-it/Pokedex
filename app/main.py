"""
pokedex - FastAPI Pokédex Application
Clean MVC Architecture
"""
import os
import logging
import time
from fastapi import FastAPI, Request
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles
from app.config import STATIC_DIR
from app.routers import views, pokemon, health

# Configure logging
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s'
)
logger = logging.getLogger(__name__)


# ========================
# Application Setup
# ========================

app = FastAPI(
    title="pokedex",
    description="Pokédex API with web interface",
    version="1.0.0"
)

# CORS Configuration
allowed_origins = [
    "http://localhost",
    "http://localhost:8000",
    "http://127.0.0.1:8000",
    "http://pokedex.acinox.ovh",
    "https://pokedex.acinox.ovh",
]
app.add_middleware(
    CORSMiddleware,
    allow_origins=allowed_origins,
    allow_credentials=False,
    allow_methods=["GET", "POST", "OPTIONS"],
    allow_headers=["Content-Type"],
)

# Request logging middleware
@app.middleware("http")
async def log_requests(request: Request, call_next):
    start_time = time.time()
    try:
        response = await call_next(request)
        process_time = time.time() - start_time
        logger.info(
            f"{request.method} {request.url.path} - Status: {response.status_code} - Duration: {process_time:.3f}s"
        )
        response.headers["X-Process-Time"] = str(process_time)
        return response
    except Exception as err:
        process_time = time.time() - start_time
        logger.error(f"{request.method} {request.url.path} - Error: {str(err)} - Duration: {process_time:.3f}s")
        raise

# Mount static files
if os.path.exists(STATIC_DIR):
    app.mount("/static", StaticFiles(directory=STATIC_DIR), name="static")


# ========================
# Include Routers
# ========================

app.include_router(views.router)
app.include_router(pokemon.router)
app.include_router(health.router)


if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
