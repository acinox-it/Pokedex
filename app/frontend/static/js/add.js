const API_URL = window.location.origin + '/api';

const VALID_TYPES = [
    'Normal', 'Fire', 'Water', 'Electric', 'Grass', 'Ice',
    'Fighting', 'Poison', 'Ground', 'Flying', 'Psychic', 'Bug',
    'Rock', 'Ghost', 'Dragon', 'Dark', 'Steel', 'Fairy'
];

document.getElementById('pokemonForm').addEventListener('submit', async (e) => {
    e.preventDefault();

    const errors = [];
    
    const name = document.getElementById('name').value.trim();
    const types = document.getElementById('types').value.trim();
    const hp = parseInt(document.getElementById('hp').value);
    const attack = parseInt(document.getElementById('attack').value);
    const defense = parseInt(document.getElementById('defense').value);
    const sp_attack = parseInt(document.getElementById('sp_attack').value);
    const sp_defense = parseInt(document.getElementById('sp_defense').value);
    const speed = parseInt(document.getElementById('speed').value);

    // Validation name
    if (!name || name.length === 0) {
        errors.push('Name is required');
    } else if (name.length > 100) {
        errors.push('Name must not exceed 100 characters');
    }

    // Validation types
    if (!types || types.length === 0) {
        errors.push('At least one type is required');
    } else {
        const typeArray = types.split('/').map(t => t.trim());
        for (let t of typeArray) {
            if (!VALID_TYPES.includes(t)) {
                errors.push(`Invalid type: "${t}". Valid types: ${VALID_TYPES.join(', ')}`);
                break;
            }
        }
    }

    // Validation stats
    if (isNaN(hp) || hp < 1 || hp > 300) errors.push('HP must be between 1 and 300');
    if (isNaN(attack) || attack < 1 || attack > 300) errors.push('Attack must be between 1 and 300');
    if (isNaN(defense) || defense < 1 || defense > 300) errors.push('Defense must be between 1 and 300');
    if (isNaN(sp_attack) || sp_attack < 1 || sp_attack > 300) errors.push('Sp. Attack must be between 1 and 300');
    if (isNaN(sp_defense) || sp_defense < 1 || sp_defense > 300) errors.push('Sp. Defense must be between 1 and 300');
    if (isNaN(speed) || speed < 1 || speed > 300) errors.push('Speed must be between 1 and 300');

    if (errors.length > 0) {
        showMessage(errors.join('<br>'), 'danger');
        return;
    }

    const pokemon = {
        name: name,
        types: types,
        hp: hp,
        attack: attack,
        defense: defense,
        sp_attack: sp_attack,
        sp_defense: sp_defense,
        speed: speed
    };

    try {
        const response = await fetch(API_URL + '/add_pokemon/', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(pokemon)
        });

        const data = await response.json();

        if (response.ok) {
            showMessage('Pokémon created successfully!', 'success');
            setTimeout(() => window.location.href = '/', 2000);
        } else {
            showMessage('Error: ' + escapeHtml(data.detail || 'Server error'), 'danger');
        }
    } catch (error) {
        console.error(error);
        showMessage('Error: ' + escapeHtml(error.message), 'danger');
    }
});

function showMessage(msg, type) {
    const container = document.getElementById('messageContainer');
    container.innerHTML =
        `<div class="alert alert-${type} alert-dismissible fade show" role="alert">
            ${msg}
            <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
        </div>`;
}

function escapeHtml(text) {
    const map = { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#039;' };
    return text.replace(/[&<>"']/g, m => map[m]);
}
