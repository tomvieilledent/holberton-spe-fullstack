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
- Déploiement automatique (GitHub Pages via Actions ; cible VPS en préparation).
- Docker : build multi-stage + nginx.
- Documentation as Code : `docs/` (architecture, ADR, MPD SQL, OpenAPI,
  `ai/authoring.md`), `features/` (Gherkin).

### Changed
- `src/App.jsx` monolithique éclaté ; `main.jsx` pointe vers `src/app/App.jsx`.

## [1.0.0] - 2026-09-02

### Added
- 15 nouvelles sections de cours (Architecture & Patterns, Modélisation des
  données, UML, API REST & Contrats, Spécifications & BDD, Urbanisation du SI).
