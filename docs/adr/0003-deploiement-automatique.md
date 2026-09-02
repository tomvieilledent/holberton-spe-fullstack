# 3. Déploiement automatique via GitHub Actions

- Statut : accepté (cible d'hébergement en cours de bascule)
- Date : 2026-09-02

## Contexte

Le site doit se mettre à jour tout seul à chaque merge sur `main`, sans étape
manuelle. Deux cibles possibles : GitHub Pages ou le VPS de l'auteur
(`www.vlldnt.fr`).

## Décision

- La **CI** (`.github/workflows/ci.yml`) valide chaque push/PR : lint + tests +
  build, sur Node 20 et 22 (matrice), avec cache npm.
- Le **déploiement** (`.github/workflows/deploy.yml`) ne se déclenche que sur
  `main`, après build.
- Cible initiale : **GitHub Pages** (source : GitHub Actions, sans branche
  `gh-pages`).
- Cible retenue à terme : **VPS + nginx** derrière `www.vlldnt.fr`
  (déclenché depuis Actions via SSH/rsync ou image Docker). Voir ADR 0004
  quand les accès seront disponibles.

## Conséquences

- Rien n'est publié si la CI est rouge.
- Le passage Pages → VPS ne touche que `deploy.yml` (le build est identique).
- `concurrency: pages` empêche deux déploiements simultanés.
