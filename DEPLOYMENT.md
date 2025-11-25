# Deployment Guide - PokéDex avec Nginx Proxy Manager

## Architecture

```
Internet
    ↓
Nginx Proxy Manager (port 80/443)
    ↓
Docker Network (pokedex_network)
    ├─→ FastAPI App (127.0.0.1:8000)
    └─→ MySQL (127.0.0.1:3306)
```

## Prerequisites

- Docker & Docker Compose installés
- Nginx Proxy Manager configuré et actif
- Domaine pokedex.acinox.ovh pointant vers le serveur

## Configuration Nginx Proxy Manager

### 1. Ajouter un Proxy Host

**Détails du Proxy:**
- **Domain Names:** `pokedex.acinox.ovh`
- **Scheme:** `http`
- **Forward Hostname/IP:** `127.0.0.1`
- **Forward Port:** `8000`
- **Cache Assets:** ✓
- **Block Common Exploits:** ✓

**SSL Certificate:**
- Utiliser Letsencrypt avec auto-renewal
- Ou certificat auto-signé pour test

**Advanced (Onglet):**
```
proxy_set_header X-Forwarded-Proto $scheme;
proxy_set_header X-Forwarded-Host $host;
proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
proxy_buffering off;
```

## Déploiement

### 1. Cloner/accéder au projet

```bash
cd /path/to/pokedex
```

### 2. Configurer l'environnement

```bash
cp .env.example .env
# Éditer .env si besoin (les valeurs par défaut suffisent généralement)
```

### 3. Lancer le stack

```bash
docker-compose up -d
```

Vérifier le statut:
```bash
docker-compose ps
docker logs pokemons_api
docker logs pokemons_mysql
```

### 4. Accéder l'application

- Via Nginx Proxy Manager: `https://pokedex.acinox.ovh`
- Direct (local): `http://127.0.0.1:8000`

## Services

- **API:** http://127.0.0.1:8000
- **Frontend:** http://127.0.0.1:8000 (vue web)
- **Health Check:** http://127.0.0.1:8000/health
- **Docs API:** http://127.0.0.1:8000/docs

## Maintenance

### Logs
```bash
docker-compose logs -f pokedex
docker-compose logs -f mysql_db
```

### Restart
```bash
docker-compose restart
```

### Stop/Remove
```bash
docker-compose down
docker-compose down -v  # avec suppression des volumes
```

### Mise à jour
```bash
git pull
docker-compose build --no-cache
docker-compose up -d
```

## Sécurité

- MySQL écoute uniquement en local (127.0.0.1:3306)
- FastAPI écoute uniquement en local (127.0.0.1:8000)
- CORS configuré pour accepter le domaine `pokedex.acinox.ovh`
- Communication sécurisée via SSL via NPM

## Troubleshooting

**Application inaccessible via Nginx:**
- Vérifier que le port 8000 écoute sur localhost: `netstat -tuln | grep 8000`
- Vérifier les logs: `docker-compose logs pokedex`
- Tester directement: `curl http://127.0.0.1:8000`

**Erreur de connexion MySQL:**
- Vérifier que le service MySQL est prêt: `docker-compose ps`
- Vérifier les logs MySQL: `docker-compose logs mysql_db`

**Problème CORS:**
- Vérifier que le domaine est dans les `allow_origins` dans `app/main.py`
- Redémarrer l'application: `docker-compose restart pokedex`

**Performance lente:**
- Vérifier les ressources: `docker stats`
- Vérifier les logs d'erreurs: `docker-compose logs`
