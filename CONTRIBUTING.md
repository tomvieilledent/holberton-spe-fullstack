# Contribuer

Ce dépôt suit **GitHub flow** et la spécification **Conventional Commits**.
Il évolue chaque semaine avec les notions vues en cours.

## Rythme hebdomadaire

À chaque nouvelle semaine de cours :

1. **Brancher** depuis `main` :
   ```bash
   git switch -c week-XX-sujet
   ```
2. **Ajouter** les nouvelles sections (architecture feature-sliced)
   - un fichier par section : `src/features/<feature>/<NomSection>.jsx`,
     `export default function`, réutilisant les primitives partagées
     (`import { H2, H3, P, Ul, Code, InlineCode, Note, Table, SourceLink }
     from "../../shared/ui/primitives.jsx"`) et les accents
     (`import { X_ACCENT } from "../../shared/ui/tokens.js"`) ;
   - déclarer la section dans `src/app/nav.js` : une entrée `{ id, label, icon,
     file }` dans le bon groupe d'une catégorie (`file` = chemin relatif à
     `src/features/`, le composant est résolu via `import.meta.glob`) ;
   - la rédaction suit `docs/ai/authoring.md` (assistée par IA, vérifiée) ;
   - **ne jamais modifier** une section existante sans raison explicite.
3. **Documenter** en parallèle (Documentation as Code / SSOT) :
   - mettre à jour `docs/curriculum.md` (semaine, notions, liens) ;
   - si la semaine introduit un modèle : `docs/data-model.sql`,
     `docs/architecture.md` ou `docs/openapi.yaml` ;
   - une décision structurante ⇒ un ADR dans `docs/adr/`.
4. **Vérifier** localement :
   ```bash
   npm run ci        # lint + tests + build
   ```
5. **Ouvrir une PR** — titre au format Conventional Commits, CI verte requise.
6. **Merger** dans `main` ⇒ déploiement GitHub Pages automatique.
7. **Supprimer** la branche.

## Conventional Commits

Format : `<type>[scope optionnel][!]: <description>`

Types utilisés : `feat`, `fix`, `docs`, `refactor`, `test`, `chore`, `ci`,
`style`, `build`, `perf`, `revert`.

- `feat` — nouvelle section, nouvelle fonctionnalité du site.
- `docs` — `docs/`, `README`, commentaires.
- `test` — ajout / correction de tests.
- `ci` — workflows GitHub Actions, Dependabot.
- `chore` — dépendances, configuration.

Un commit = un seul type de changement. Pas de trailer `Co-Authored-By`.

Exemples :

```
feat(nav): ajoute la section "Diagrammes de séquence et d'états-transitions"
docs(curriculum): consigne la semaine 8 (analyse & conception)
test(app): couvre le rendu des 15 nouvelles sections
ci: ajoute Node 22 à la matrice
```

## Critères d'acceptation d'une section (INVEST appliqué)

- **I**ndependent — la section se lit seule, sans dépendre d'une autre.
- **N**egotiable — le contenu peut être reformulé sans changer l'intention.
- **V**aluable — elle apporte une notion révisable réellement utile.
- **E**stimable — le périmètre tient en une PR.
- **S**mall — une section = un concept.
- **T**estable — elle apparaît dans `NAV` et se rend sans erreur
  (couvert par `src/app/App.test.jsx`).

## Style de code

- ESLint fait foi : `npm run lint` doit passer.
- Guillemets doubles, points-virgules obligatoires.
- Les identifiants de code et noms techniques restent en langue d'origine ;
  le texte pédagogique est en français, accents inclus.
