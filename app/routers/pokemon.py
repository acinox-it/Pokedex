"""
API Routes - Pokémon data endpoints
"""
from fastapi import APIRouter, Query
from app.controllers.api import PokemonController
from app.schemas import PokemonCreate

router = APIRouter(prefix="/api", tags=["API"])


@router.get("/total_pokemons", summary="Get all Pokémons")
async def get_all_pokemons():
    """Get all Pokémons with their stats"""
    return await PokemonController.get_all_pokemons()


@router.get("/search", summary="Search Pokémons")
async def search_pokemons(q: str = Query(..., min_length=1, max_length=100)):
    """Search Pokémons by name or type
    
    Query Parameters:
    - q: search term (min 1, max 100 chars)
    """
    return await PokemonController.search_pokemons(q)


@router.post("/add_pokemon/", summary="Create new Pokémon")
async def create_pokemon(pokemon: PokemonCreate):
    """Create a new Pokémon
    
    Request Body:
    ```json
    {
        "id": 152,
        "name": "Chikorita",
        "types": "Grass",
        "hp": 45,
        "attack": 49,
        "defense": 65,
        "sp_attack": 49,
        "sp_defense": 65,
        "speed": 45
    }
    ```
    """
    return await PokemonController.create_pokemon(pokemon)


@router.get("/pokemon_stats", summary="Get Pokémon statistics")
async def get_pokemon_stats():
    """Get global Pokémon statistics
    
    Returns average and min/max stats for all Pokémons
    """
    return await PokemonController.get_pokemon_stats()
