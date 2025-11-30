# 🚀 CI/CD avec GitHub Actions et Railway

Configuration complète du pipeline de déploiement automatique.

## 🔄 Process de CI/CD

```
Push vers GitHub
        ↓
GitHub Actions déclenche
        ↓
Job 1: Tests & Linting
        ↓
Job 2: Build Check (Docker)
        ↓
✅ CI Réussi → Railway déploie automatiquement
❌ CI Échoué → Railway bloque le déploiement
```

## 📋 Ce que fait le CI

### 1. **Tests & Linting** (`test` job)
- Configure Python 3.11
- Installe les dépendances
- Exécute `flake8` (linting)
- Exécute les tests pytest (s'ils existent)
- Continue même si les tests échouent

### 2. **Build Check** (`build-check` job)
- Dépend du succès du job `test`
- Build l'image Docker avec le Dockerfile
- Vérifie que le build réussit

### 3. **Succès Notification** (`success` job)
- Dépend de `test` ET `build-check`
- Envoie un statut "success" à GitHub
- Commente sur les PRs: "✅ All CI checks passed!"
- **Railway voit ce succès et déploie**

### 4. **Failure Notification** (`failure` job)
- Dépend de `test` ET `build-check`
- Envoie un statut "failure" à GitHub
- Commente sur les PRs: "❌ CI checks failed"
- **Railway voit cet échec et BLOQUE le déploiement**

## ⚙️ Configuration Railway

Dans `railway.toml`:
```toml
[deploy.github]
requireCIPass = true
```

Cela dit à Railway:
> "Attends que les GitHub Actions soient complétées avec succès avant de déployer"

## 🚀 Flux de Déploiement

### Scenario 1: ✅ Tout Réussit
```
1. git push origin main
2. GitHub Actions déclenche le CI
3. Tests passent ✅
4. Build Docker réussit ✅
5. Statut GitHub: SUCCESS
6. Railway voit SUCCESS → Déploie automatiquement 🚀
```

### Scenario 2: ❌ Tests échouent
```
1. git push origin main
2. GitHub Actions déclenche le CI
3. Tests échouent ❌
4. Statut GitHub: FAILURE
5. Railway voit FAILURE → Bloque le déploiement 🛑
6. Notification sur la PR: "❌ CI checks failed"
```

## 📝 Fichiers

- `.github/workflows/ci.yml` - Workflow du pipeline CI/CD
- `railway.toml` - Configuration Railway avec CI check
- `requirements.txt` - Dépendances Python

## 🔧 Avant le Premier Déploiement

1. **Push le code vers GitHub:**
```bash
git add .
git commit -m "Add CI/CD pipeline with GitHub Actions"
git push origin main
```

2. **Connecter Railway à GitHub:**
   - Dans le projet Railway
   - Settings → GitHub
   - Autoriser Railway à accéder au repository

3. **Activer CI Check dans Railway:**
   - Deploy → GitHub CI Check (généralement auto-activé)

## 📊 Voir les Actions

1. Allez sur le repository GitHub
2. Onglet **Actions**
3. Voir les workflows en cours ou passés
4. Cliquer sur un run pour voir les détails

## 🚫 Troubleshooting

**Railway ne déploie pas après le CI:**
- Vérifiez que Railway est connecté à GitHub
- Vérifiez que `requireCIPass = true` est dans `railway.toml`
- Vérifiez les settings de Railway pour les GitHub Checks

**Tests échouent:**
- Consultez les logs du job `test` dans Actions
- Fixez les erreurs et push à nouveau

**Build Docker échoue:**
- Consultez les logs du job `build-check`
- Testez localement: `docker build -t pokedex .`

## 📚 Ressources

- [GitHub Actions Docs](https://docs.github.com/en/actions)
- [Railway CI Integration](https://docs.railway.app/deploy/integrations/github)
- [Docker Build Best Practices](https://docs.docker.com/develop/dev-best-practices/)

---

**Version**: 1.0 | **Dernière mise à jour**: 2025-11-30
