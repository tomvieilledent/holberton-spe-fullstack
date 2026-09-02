# 1. Consigner les décisions d'architecture dans des ADR

- Statut : accepté
- Date : 2026-09-02

## Contexte

Le projet évolue chaque semaine. Sans trace des décisions, les choix
structurants (build, déploiement, tests) se re-discutent en boucle.

## Décision

Chaque décision structurante fait l'objet d'un **Architecture Decision
Record** court, versionné dans `docs/adr/`, numéroté séquentiellement,
immuable une fois accepté (on ajoute un nouvel ADR qui le remplace).

Format : Contexte → Décision → Conséquences.

## Conséquences

- Historique lisible dans le dépôt, revu en même temps que le code (une PR).
- Format inspiré de Michael Nygard / <https://adr.github.io/>.
