# 2. Site statique en React + Vite

- Statut : accepté
- Date : 2026-09-02

## Contexte

Le site est un support de révision. Il doit rester simple à héberger, rapide,
et servir lui-même d'exercice des notions du cursus (React, Vite, outillage).

## Décision

- **React 18** pour le modèle par composants déjà enseigné.
- **Vite 5** pour le dev server (HMR) et un build statique optimisé (`dist/`).
- Aucune donnée dynamique au runtime : tout le contenu est dans `src/App.jsx`.
- `base: "./"` pour des chemins relatifs (Pages, `preview`, nginx, sous-dossier).

## Conséquences

- Hébergement trivial : n'importe quel serveur de fichiers statiques.
- Pas de SSR, pas de base de données requise.
- Un futur backend (VPS) reste **optionnel** et découplé (voir ADR 0004).
