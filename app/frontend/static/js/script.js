// PokéDex API Client
class PokeAPI {
    constructor(baseURL = '/api') {
        this.baseURL = baseURL;
    }

    async fetchJSON(endpoint) {
        try {
            const response = await fetch(`${this.baseURL}${endpoint}`);
            if (!response.ok) {
                throw new Error(`HTTP Error: ${response.status}`);
            }
            return await response.json();
        } catch (error) {
            console.error('API Error:', error);
            throw error;
        }
    }

    async getPokemons() {
        return this.fetchJSON('/pokemons');
    }

    async searchPokemons(query) {
        return this.fetchJSON(`/pokemons/search?q=${encodeURIComponent(query)}`);
    }

    async getStats() {
        return this.fetchJSON('/pokemons/stats');
    }
}

// Initialize API
const api = new PokeAPI();

// DOM Elements
const pokemonGrid = document.getElementById('pokemon-grid');
const searchInput = document.getElementById('search-input');
const searchBtn = document.getElementById('search-btn');
const loadingDiv = document.getElementById('loading');
const statsContainer = document.getElementById('stats-container');

// Utility Functions
function showLoading(show = true) {
    if (loadingDiv) {
        loadingDiv.style.display = show ? 'block' : 'none';
    }
}

function showAlert(message, type = 'info') {
    const alertDiv = document.createElement('div');
    alertDiv.className = `alert alert-${type}`;
    alertDiv.textContent = message;
    
    const container = document.querySelector('.container');
    if (container) {
        container.insertBefore(alertDiv, container.firstChild);
        setTimeout(() => alertDiv.remove(), 5000);
    }
}

function getTypeClass(type) {
    return `type-badge ${type.toLowerCase()}`;
}

function createPokemonCard(pokemon) {
    const card = document.createElement('div');
    card.className = 'card';
    
    const types = pokemon.types ? pokemon.types.split(',').map(t => t.trim()) : [];
    const typeBadges = types.map(t => `<span class="${getTypeClass(t)}">${t}</span>`).join('');
    
    card.innerHTML = `
        <div class="card-image">
            <img src="/static/img/pokemon.png" alt="${pokemon.name}" onerror="this.src='/static/img/pokemon.png'">
        </div>
        <div class="card-body">
            <div class="card-title">${pokemon.name}</div>
            <div class="card-type">${typeBadges}</div>
            <div class="card-stats">
                <div class="stat">
                    <div class="stat-value">${pokemon.hp || '-'}</div>
                    <div class="stat-label">HP</div>
                </div>
                <div class="stat">
                    <div class="stat-value">${pokemon.attack || '-'}</div>
                    <div class="stat-label">ATK</div>
                </div>
                <div class="stat">
                    <div class="stat-value">${pokemon.defense || '-'}</div>
                    <div class="stat-label">DEF</div>
                </div>
            </div>
        </div>
    `;
    
    card.addEventListener('click', () => {
        // Vous pouvez ajouter une action au clic (détails, etc.)
        console.log('Pokemon clicked:', pokemon);
    });
    
    return card;
}

async function loadPokemons() {
    try {
        showLoading(true);
        const data = await api.getPokemons();
        
        if (pokemonGrid) {
            pokemonGrid.innerHTML = '';
            if (data.data && data.data.length > 0) {
                data.data.forEach(pokemon => {
                    pokemonGrid.appendChild(createPokemonCard(pokemon));
                });
            } else {
                pokemonGrid.innerHTML = '<p style="grid-column: 1/-1; text-align: center; color: white;">Aucun Pokémon trouvé</p>';
            }
        }
        
        showLoading(false);
    } catch (error) {
        showLoading(false);
        showAlert(`Erreur: ${error.message}`, 'danger');
    }
}

async function searchPokemons(query) {
    if (!query.trim()) {
        showAlert('Veuillez entrer un terme de recherche', 'info');
        return;
    }
    
    try {
        showLoading(true);
        const data = await api.searchPokemons(query);
        
        if (pokemonGrid) {
            pokemonGrid.innerHTML = '';
            if (data.data && data.data.length > 0) {
                data.data.forEach(pokemon => {
                    pokemonGrid.appendChild(createPokemonCard(pokemon));
                });
            } else {
                pokemonGrid.innerHTML = `<p style="grid-column: 1/-1; text-align: center; color: white;">Aucun résultat pour "${query}"</p>`;
            }
        }
        
        showLoading(false);
    } catch (error) {
        showLoading(false);
        showAlert(`Erreur de recherche: ${error.message}`, 'danger');
    }
}

async function loadStats() {
    try {
        const data = await api.getStats();
        
        if (statsContainer && data) {
            statsContainer.innerHTML = `
                <div class="stat-card">
                    <div class="stat-card-value">${data.count || 0}</div>
                    <div class="stat-card-label">Pokémons Total</div>
                </div>
                <div class="stat-card">
                    <div class="stat-card-value">${Math.round(data.avg_hp || 0)}</div>
                    <div class="stat-card-label">Moyenne HP</div>
                </div>
                <div class="stat-card">
                    <div class="stat-card-value">${Math.round(data.avg_attack || 0)}</div>
                    <div class="stat-card-label">Moyenne Attaque</div>
                </div>
                <div class="stat-card">
                    <div class="stat-card-value">${Math.round(data.avg_defense || 0)}</div>
                    <div class="stat-card-label">Moyenne Défense</div>
                </div>
                <div class="stat-card">
                    <div class="stat-card-value">${Math.round(data.avg_speed || 0)}</div>
                    <div class="stat-card-label">Moyenne Vitesse</div>
                </div>
            `;
        }
    } catch (error) {
        console.error('Error loading stats:', error);
    }
}

// Event Listeners
document.addEventListener('DOMContentLoaded', () => {
    // Load initial data
    loadPokemons();
    loadStats();
    
    // Search functionality
    if (searchBtn) {
        searchBtn.addEventListener('click', () => {
            const query = searchInput ? searchInput.value : '';
            if (query.trim()) {
                searchPokemons(query);
            }
        });
    }
    
    if (searchInput) {
        searchInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                const query = searchInput.value;
                if (query.trim()) {
                    searchPokemons(query);
                }
            }
        });
    }
});

// Export for use in other scripts
window.PokeAPI = PokeAPI;
window.api = api;
window.loadPokemons = loadPokemons;
window.searchPokemons = searchPokemons;
window.loadStats = loadStats;
