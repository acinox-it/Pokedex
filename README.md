# 🎮 PokéDex v1.0.1

Un API Pokédex rapide et sécurisé avec interface web construit avec FastAPI et MySQL.

## 🌐 Démo en Ligne

**Voir l'app en action sur Railway:** https://pokedex.up.railway.app

> L'app est hébergée sur Railway avec base de données MySQL complètement fonctionnelle

## 🔄 CI/CD Pipeline

**Déploiement automatique avec tests:**
- GitHub Actions teste le code à chaque push
- Railway attend que les tests passent ✅
- Si tests OK → Déploiement automatique 🚀
- Si tests échouent → Déploiement bloqué 🛑

Voir [CI_CD_GUIDE.md](./CI_CD_GUIDE.md) pour plus de détails.

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

## 🌍 Déploiement

### Railway (Recommandé - 5 minutes)

**Prérequis:**
- Compte GitHub avec ce repository
- Compte Railway (gratuit)

**Étapes:**
1. Connecter Railway à GitHub (Settings → GitHub)
2. Créer un **New Project** → **Deploy from GitHub repo**
3. Sélectionner ce repository
4. Ajouter un service **MySQL**
5. Configurer les variables (voir [RAILWAY_QUICK_START.md](./RAILWAY_QUICK_START.md))

**Flux de Déploiement:**
- ✅ `git push` → GitHub Actions teste
- ✅ Tests réussissent → Railway déploie automatiquement
- ❌ Tests échouent → Déploiement bloqué

**Documentation:**
- [RAILWAY_QUICK_START.md](./RAILWAY_QUICK_START.md) - Guide rapide
- [RAILWAY_DEPLOYMENT.md](./RAILWAY_DEPLOYMENT.md) - Détails complets
- [CI_CD_GUIDE.md](./CI_CD_GUIDE.md) - Pipeline CI/CD

### Docker Local
```bash
docker-compose up
```

### Autres Options
Voir `DEPLOYMENT.md` pour Linux, Heroku, etc.

## 📜 Licence

MIT

Ce projet est open-source sous licence MIT. Voir le fichier LICENSE pour plus d'informations.

---

## 👨‍💻 Auteur

Développé par **Acinox** – Développeur full-stack et étudiant, passionné par les systèmes modulaires, sécurisés et maintenables.

---

**Version**: 1.0.1 | **Statut**: ✅ Production Ready
