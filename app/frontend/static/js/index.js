const API_URL = window.location.origin + '/api';
let allPokemon = [];

async function loadPokemon() {
    try {
        const response = await fetch(API_URL + '/total_pokemons');
        if (!response.ok) throw new Error('Server error');
        
        const result = await response.json();
        allPokemon = result.data || [];
        displayPokemon(allPokemon);
    } catch (error) {
        console.error(error);
        document.getElementById('pokemonContainer').innerHTML = 
            '<div class="col-12"><div class="alert alert-danger">Error: ' + error.message + '</div></div>';
    }
}

function displayPokemon(pokemonList) {
    const container = document.getElementById('pokemonContainer');
    
    if (!pokemonList || pokemonList.length === 0) {
        container.innerHTML = '<div class="col-12 text-center text-white">No Pokemon found</div>';
        return;
    }

    container.innerHTML = pokemonList.map(pokemon => {
        const typeArray = pokemon.types.split('/').map(t => t.trim());
        const typeBadges = typeArray.map(t => {
            const typeClass = `type-${sanitizeClass(t.toLowerCase())}`;
            return `<span class="badge type-badge ${typeClass}">${escapeHtml(t)}</span>`;
        }).join('');
        
        return `
            <div class="col">
                <div class="card pokemon-card shadow" onclick="navigateToPokemon('${escapeHtml(pokemon.name)}')">
                    <div class="card-body" style="display: flex; flex-direction: column; align-items: center; text-align: center;">
                        <img src="/static/img/pokemons/${sanitizeFilename(pokemon.name)}.svg" 
                             alt="${escapeHtml(pokemon.name)}" 
                             style="width: 60px; height: 60px; object-fit: contain; margin-bottom: 10px;">
                        <h5 class="card-title text-capitalize" style="margin: 0;">${escapeHtml(pokemon.name)}</h5>
                        <div class="d-flex gap-2 flex-wrap" style="justify-content: center; margin-top: 8px;">${typeBadges}</div>
                    </div>
                </div>
            </div>
        `;
    }).join('');
}

function escapeHtml(text) {
    const map = { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#039;' };
    return text.replace(/[&<>"']/g, m => map[m]);
}

function sanitizeClass(str) {
    return str.replace(/[^a-z0-9-]/g, '');
}

function sanitizeFilename(str) {
    return str.replace(/[^a-zA-Z0-9_-]/g, '');
}

function navigateToPokemon(name) {
    window.location.href = `/pokemon/${encodeURIComponent(name)}`;
}

function filterPokemon() {
    const searchTerm = document.getElementById('searchInput').value.toLowerCase();
    
    if (!searchTerm) {
        displayPokemon(allPokemon);
        return;
    }

    const filtered = allPokemon.filter(pokemon => 
        pokemon.name.toLowerCase().includes(searchTerm) || 
        pokemon.types.toLowerCase().includes(searchTerm)
    );
    
    displayPokemon(filtered);
}
