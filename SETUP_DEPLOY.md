# 🚀 Guide Complet: Déployer PokéDex avec Railway + GitHub Actions

## ÉTAPE 1: Configuration Railway (5 min)

### 1.1 Créer un projet Railway
- Allez sur **railway.app**
- Cliquez **New Project**
- Sélectionnez **Deploy from GitHub repo**
- Cherchez votre repo **PokéDex** et connectez-le
- Railway lance un build automatique

### 1.2 Ajouter une base de données MySQL
- Dans le dashboard du projet
- Cliquez **Add → Database → MySQL**
- Railway crée la DB automatiquement

### 1.3 Récupérer les credentials
- Cliquez sur le service MySQL
- Allez dans **Variables** (onglet)
- Vous verrez:
```
MYSQLHOST=...
MYSQLPORT=3306
MYSQLUSER=...
MYSQLPASSWORD=...
MYSQLDATABASE=...
```

### 1.4 Configurer l'app
- Cliquez sur le service app (app-XXXXX)
- Allez dans **Variables**
- Ajoutez:
```
PORT=8000
ENVIRONMENT=production
```

### 1.5 Importer le schéma de base de données
Depuis votre terminal local (assurez-vous d'avoir mysql client installé):

```bash
# Récupérez les credentials du dashboard Railway
# Remplacez les valeurs:

mysql -h MYSQLHOST \
  -u MYSQLUSER \
  -p MYSQLPASSWORD \
  MYSQLDATABASE < db.sql
```

Ou plus simple, utilisez Railway CLI:
```bash
railway run mysql -u $MYSQLUSER -p$MYSQLPASSWORD -h $MYSQLHOST $MYSQLDATABASE < db.sql
```

**Note**: Si vous voyez une erreur "Access denied", vérifiez les credentials dans le dashboard.

---

## ÉTAPE 2: Configuration GitHub (5 min)

### 2.1 Obtenir le token Railway
- Allez sur **railway.app/account**
- Cliquez l'avatar → **Account**
- Allez dans **Tokens** (onglet)
- Cliquez **Create Token**
- Nommez-le "GitHub Actions"
- Copiez le token généré

### 2.2 Ajouter le secret sur GitHub
- Allez sur votre repo GitHub: **Settings**
- Allez dans **Secrets and variables → Actions**
- Cliquez **New repository secret**
- **Name**: `RAILWAY_TOKEN`
- **Value**: Collez le token copié
- Cliquez **Add secret**

### 2.3 Vérifier la branche par défaut
- Settings → **General**
- Assurez-vous que la branche par défaut est **main**
- (Important: le workflow se déclenche seulement sur main)

---

## ÉTAPE 3: Déployer (1 min)

### 3.1 Push vers GitHub
```bash
git add .
git commit -m "setup: deploy with Railway + GitHub Actions"
git push origin main
```

### 3.2 Voir le déploiement en direct
- Allez sur votre repo GitHub → **Actions**
- Cliquez sur le workflow "Deploy PokéDex to Railway"
- Vous verrez:
  1. ✅ **test** - Tests et lint
  2. ✅ **deploy** - Déploiement sur Railway

### 3.3 Vérifier sur Railway
- Allez sur **railway.app/dashboard**
- Cliquez sur votre projet
- Allez dans **Deployments** (onglet)
- Vous verrez le déploiement en cours

---

## ÉTAPE 4: Accéder à votre app (1 min)

Une fois le déploiement terminé:
- Railway → Dashboard → Service app
- Cliquez sur **View Logs** ou le lien en haut
- Vous verrez l'URL: `https://pokedex-xxxxx.up.railway.app`

Visitez cette URL dans votre navigateur! 🎉

---

## ✨ À partir de maintenant

Chaque fois que vous faites un push sur `main`:
```
git push origin main 
    ↓
GitHub Actions se déclenche 
    ↓
Tests et lint
    ↓
Railway reçoit le déploiement
    ↓
Votre app est à jour!
```

---

## 🔧 Troubleshooting

### L'app ne démarre pas?
1. **Railway Dashboard → Logs**
2. Cherchez les erreurs (port, DB, imports)
3. Vérifiez que `DB_CONFIG` récupère les bonnes variables

### Connexion DB impossible?
```bash
# Testez la connexion:
railway run mysql -h $MYSQLHOST -u $MYSQLUSER -p$MYSQLPASSWORD -e "SELECT 1"
```

### GitHub Actions échoue?
- **Actions → Workflow** → Cliquez sur le job qui échoue
- Regardez l'erreur exacte
- Les logs Railway sont dans **Deployments**

### Rien ne s'est déployé?
- Vérifiez que `RAILWAY_TOKEN` est bien dans GitHub Secrets
- Assurez-vous que vous pushez sur la branche **main**

---

## 📚 Fichiers de configuration créés

```
.github/workflows/deploy.yml    ← Workflow GitHub Actions
Procfile                        ← Point d'entrée Railway
railway.json                    ← Config Railway
RAILWAY_SETUP.md               ← Ce guide
```

**C'est bon, vous êtes prêt! 🚀**
