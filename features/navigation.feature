# language: fr
# Spécification exécutable de la navigation du site.
# Vérifiée en esprit par src/app/App.test.jsx (Vitest + Testing Library).

Fonctionnalité: Navigation entre les sections de cours
  Afin de réviser une notion précise
  En tant qu'étudiant
  Je veux retrouver et ouvrir une section depuis la barre latérale

  Contexte:
    Étant donné que le site est ouvert
    Et que la barre latérale liste les catégories Frontend, Backend, DevOps
      et "Documentation & méthode"

  Scénario: Section par défaut
    Alors le contenu principal affiche le titre "React — les bases"

  Scénario: Déplier une catégorie et ouvrir une section
    Quand je déplie la catégorie "DevOps"
    Et que je clique sur l'entrée "Le Dockerfile"
    Alors le contenu principal affiche un titre contenant "Dockerfile"
    Et l'URL se termine par "#docker-dockerfile"

  Plan du scénario: Chaque section s'ouvre sans erreur
    Quand je clique sur l'entrée "<section>"
    Alors le contenu principal affiche un titre de niveau 2
    Et aucune erreur JavaScript n'est levée

    Exemples: Sections d'analyse et conception
      | section                                     |
      | Repository & inversion des dépendances      |
      | Diagrammes de séquence & d'états            |
      | Règles de gestion & MCD                     |
      | Diagramme de classes                       |
      | Principes REST                             |
      | OpenAPI (Swagger)                          |
      | Validation JSON Schema                     |
      | PRD & User Stories (INVEST)                |
      | BDD & Gherkin                              |
      | Scénarios paramétrés                       |
      | Documentation as Code (SSOT)              |

  Scénario: La recherche pointe vers les sections concernées
    Quand je saisis "uml" dans le champ de recherche
    Alors la liste des résultats contient "Diagramme de classes"
    Et elle contient au moins deux sections

  Scénario: Un diagramme Mermaid est rendu comme bloc de code
    Quand je clique sur l'entrée "Diagramme de classes"
    Alors le contenu principal contient un bloc de code
    Et ce bloc commence par "classDiagram"
