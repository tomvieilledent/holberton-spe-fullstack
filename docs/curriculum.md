# Journal du cursus

Une ligne par semaine. Chaque semaine ajoute des sections au site
(`src/App.jsx` + `NAV`) et, si besoin, met à jour `docs/` (SSOT).

## User Story type (INVEST)

> **En tant qu'** étudiant Holberton
> **je veux** retrouver les notions de la semaine dans une section dédiée du site
> **afin de** réviser sans rouvrir tous les supports de cours.
>
> **Critères d'acceptation**
> - la section apparaît dans la navigation, à la bonne place (ordre du cours) ;
> - elle suit la trame Problème → Solution → exemples → ressources ;
> - `npm run ci` passe (lint + tests + build) ;
> - `docs/` est à jour si la semaine introduit un modèle de données / d'échange.

## Semaines

| Semaine | Thème | Sections ajoutées | Docs impactés |
| --- | --- | --- | --- |
| — | Socle | React / Vue / Svelte, Outillage, Docker, DevOps & Git, CI/CD, Merise | — |
| S+1 | Analyse & conception (approfondissement) | Architecture & Patterns, Modélisation des données, UML, API REST & Contrats, Spécifications & BDD, Urbanisation du SI | `architecture.md`, `data-model.sql`, `openapi.yaml` |
| S+2 | _à venir_ | | |

## Backlog d'idées d'évolution

- [ ] Mode clair / sombre (persistance `localStorage`).
- [ ] Recherche plein texte côté client (statique, index pré-build).
- [ ] Lien permanent par section (`#hash` + `history.pushState`).
- [ ] Génération de `NAV` depuis `docs/data-model.sql` (un seul modèle).
- [ ] Backend optionnel sur le VPS exposant `docs/openapi.yaml`.
