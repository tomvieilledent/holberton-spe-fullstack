# Changelog

Toutes les évolutions notables de ce projet sont consignées ici.
Format inspiré de [Keep a Changelog](https://keepachangelog.com/fr/1.1.0/) ;
versionnage sémantique + Conventional Commits.

## [Unreleased]

### Added
- Portage du site sur une structure Vite + React (rebuild statique).
- Architecture **feature-sliced** : `src/features/<feature>/`, `src/shared/ui/`,
  `src/app/` ; chaque section est un chunk chargé via `React.lazy` / `Suspense`.
- SPA **mobile-first** : tiroir de navigation, deep links par `#hash`,
  gestion du focus et de `Échap`, `prefers-reduced-motion`.
- Tests Vitest + Testing Library : navigation, deep link, rendu des 15 nouvelles
  sections, smoke test sur toutes les entrées de `NAV`.
- CI GitHub Actions : lint + tests + build sur Node 20 et 22 (matrice, cache npm).
- Déploiement continu vers un **VPS OVH** (`rsync` over SSH) : `deploy.yml`
  réécrit, `scripts/vps-setup.sh` (nginx + certbot + user `deploy`),
  `deploy/nginx/vlldnt.fr.conf`, `docs/deployment.md`, ADR 0004.
- `vite.config.js` : `base` passe de `"./"` à `"/"` (service à la racine du domaine).
- Docker : build multi-stage + nginx.
- Documentation as Code : `docs/` (architecture, ADR, MPD SQL, OpenAPI,
  `ai/authoring.md`), `features/` (Gherkin).

### Changed
- `src/App.jsx` monolithique éclaté ; `main.jsx` pointe vers `src/app/App.jsx`.
- **Navigation refondue** en 2 niveaux : 4 catégories (Frontend, Backend, DevOps,
  Documentation & méthode) → groupes → sections, catégories repliables.
  Libellés de groupes clarifiés (« Urbanisation du SI » → « Cohérence &
  documentation », etc.).
- Suppression de la section « Vue d'ensemble » ; section par défaut = React — les bases.
- `nav.js` : résolution des sections via `import.meta.glob` (champ `file`).

### Added
- **Recherche plein texte** dans la barre latérale (`src/app/search.js`) : index
  bâti depuis le source des sections, chunk chargé à la demande (~35 kB gzip).

## [1.0.0] - 2026-09-02

### Added
- 15 nouvelles sections de cours (Architecture & Patterns, Modélisation des
  données, UML, API REST & Contrats, Spécifications & BDD, Urbanisation du SI).
