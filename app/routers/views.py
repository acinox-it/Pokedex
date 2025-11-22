"""
View Routes - HTML pages
"""
from fastapi import APIRouter, Request
from fastapi.responses import HTMLResponse
from app.controllers.views import ViewController

router = APIRouter(tags=["Pages"])


@router.get("/", response_class=HTMLResponse)
async def home(request: Request):
    """Home page - list of all Pokémons"""
    return await ViewController.home(request)


@router.get("/pokemon/{name}", response_class=HTMLResponse)
async def pokemon_detail(request: Request, name: str):
    """Pokémon detail page"""
    return await ViewController.pokemon_detail(request, name)


@router.get("/add", response_class=HTMLResponse)
async def add_page(request: Request):
    """Page to add a new Pokémon"""
    return await ViewController.add_page(request)
