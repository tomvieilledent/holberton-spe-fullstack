# language: fr
# Spécification exécutable de la navigation du site.
# Vérifiée en esprit par src/App.test.jsx (Vitest + Testing Library).

Fonctionnalité: Navigation entre les sections de cours
  Afin de réviser une notion précise
  En tant qu'étudiant
  Je veux passer d'une section à l'autre depuis la barre latérale

  Contexte:
    Étant donné que le site est ouvert
    Et que la barre latérale liste toutes les sections

  Scénario: Vue d'ensemble par défaut
    Alors le contenu principal affiche "Récap de la semaine"

  Scénario: Ouvrir une section existante
    Quand je clique sur l'entrée "Les bases" du groupe "React"
    Alors le contenu principal affiche le titre "React — les bases"

  Plan du scénario: Chaque nouvelle section s'ouvre sans erreur
    Quand je clique sur l'entrée "<section>"
    Alors le contenu principal affiche un titre de niveau 2
    Et aucune erreur JavaScript n'est levée

    Exemples: Sections ajoutées cette semaine
      | section                                  |
      | Repository & inversion des dépendances   |
      | Séquence & états-transitions             |
      | Règles de gestion & cardinalités         |
      | Diagramme de classes & UML avancé        |
      | Architecture RESTful                     |
      | Spécification OpenAPI 3.0                |
      | Validation via JSON Schema              |
      | PRD, User Story & INVEST               |
      | BDD & Gherkin                           |
      | Scenario Outline & Examples             |
      | Documentation as Code & SSOT            |

  Scénario: Un diagramme Mermaid est rendu comme bloc de code
    Quand je clique sur l'entrée "Diagramme de classes & UML avancé"
    Alors le contenu principal contient un bloc de code
    Et ce bloc commence par "classDiagram"
