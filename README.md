# 🎮 PokéDex v1.0.1

Un API Pokédex rapide et sécurisé avec interface web construit avec FastAPI et MySQL.

## 🚀 Démarrage Rapide

### 1. Installation
```bash
pip install -r requirements.txt
mysql -u root -p < db.sql
```

### 2. Configuration
Créez `.env`:
```env
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=
DB_NAME=pokemons_db
```

### 3. Exécution
```bash
python run.py
# Visitez http://localhost:8000
```

## 📡 Endpoints API

- `GET /api/total_pokemons` - Liste tous les Pokémon
- `GET /api/search?q=fire` - Rechercher des Pokémon
- `POST /api/add_pokemon/` - Ajouter un nouveau Pokémon
- `GET /api/pokemon_stats` - Obtenir les statistiques
- `GET /health` - Vérification de santé

## 📄 Pages

- `/` - Liste des Pokémon
- `/pokemon/{name}` - Détails du Pokémon
- `/add` - Ajouter un Pokémon

## ✨ Caractéristiques

✅ Opérations de base de données asynchrones rapides (10x plus rapide)  
✅ Protection XSS et CORS sécurisé  
✅ Logging complet des requêtes  
✅ Validation de formulaire améliorée  
✅ API entièrement documentée  

## 🛠️ Stack Technologique

- **Backend**: FastAPI, Uvicorn, MySQL
- **Frontend**: Bootstrap 5, Vanilla JS
- **Asynchrone**: run_in_threadpool pour les opérations DB non-bloquantes

## 📁 Structure du Projet

```
PokéDex/
├── app/
│   ├── main.py                 # App FastAPI
│   ├── config.py               # Configuration
│   ├── database.py             # Opérations DB asynchrones
│   ├── schemas.py              # Modèles Pydantic
│   ├── controllers/
│   │   ├── api.py              # Contrôleurs API
│   │   └── views.py            # Contrôleurs Pages
│   ├── routers/
│   │   ├── pokemon.py          # Routes Pokémon
│   │   ├── views.py            # Routes Pages
│   │   └── health.py           # Vérification santé
│   └── frontend/
│       ├── templates/          # Templates HTML
│       │   ├── base.html
│       │   ├── index.html
│       │   ├── detail.html
│       │   └── add.html
│       └── static/
│           ├── css/            # Feuilles de style
│           ├── js/             # JavaScript
│           │   ├── index.js
│           │   └── add.js
│           └── img/            # Images
├── run.py                      # Point d'entrée
├── requirements.txt            # Dépendances
├── db.sql                      # Schéma base de données
├── Dockerfile                  # Configuration Docker
└── docker-compose.yml          # Docker Compose
```

## 🌍 Déploiement

Voir `DEPLOYMENT` pour:
- Installation Docker
- Linux (Nginx + Supervisor)
- Déploiement Heroku
- Configurations de production

## 📜 Licence

MIT

Ce projet est open-source sous licence MIT. Voir le fichier LICENSE pour plus d'informations.

---

## 👨‍💻 Auteur

Développé par **Acinox** – Développeur full-stack et étudiant, passionné par les systèmes modulaires, sécurisés et maintenables.

---

**Version**: 1.0.1 | **Statut**: ✅ Production Ready
