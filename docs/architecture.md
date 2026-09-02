# Architecture

Documentation vivante du projet. Les diagrammes sont en **Mermaid**, rendus
nativement par GitHub — mêmes conventions que les diagrammes du site.

## 1. Vue d'ensemble (statique)

```mermaid
flowchart LR
    Dev[Développeur] -->|push / PR| GH[(GitHub repo)]
    GH -->|Actions: lint + tests + build| CI{CI verte ?}
    CI -->|oui, sur main| Deploy[Build de production]
    Deploy --> Pages[GitHub Pages]
    Deploy -. cible en préparation .-> VPS[VPS - nginx - www.vlldnt.fr]
    Pages --> User[Navigateur]
    VPS --> User
```

## 2. Modèle de composants (React)

Le site est une seule application React. Une donnée (`NAV`) décrit la
navigation ; `App` garde l'état de la section active et rend le composant
correspondant.

```mermaid
classDiagram
    class App {
        -active: string
        -mobileOpen: boolean
        +go(id) void
        +render() JSX
    }
    class NAV {
        <<data>>
        +entries: NavEntry[]
    }
    class NavEntry {
        +id: string
        +label: string
        +icon: Component
        +Component: Function
        +items: NavEntry[]
    }
    class NavButton {
        +item: NavEntry
        +active: boolean
        +onClick() void
    }
    class Section {
        <<function component>>
        +render() JSX
    }

    App --> NAV : lit
    App *-- NavButton : compose
    App ..> Section : rend la section active
    NAV o-- NavEntry : contient
    NavEntry o-- NavEntry : sous-sections
```

## 3. Inversion des dépendances (cible backend)

Si un backend est ajouté (VPS), le domaine ne dépend pas de l'infrastructure :
il définit une interface, l'infra l'implémente.

```mermaid
classDiagram
    namespace DomainLayer {
        class CurriculumService
        class ICurriculumRepository {
            <<interface>>
            +listWeeks() Week[]
            +getSection(id) Section
        }
    }
    namespace InfrastructureLayer {
        class PostgresCurriculumRepository
        class HttpApi
    }
    CurriculumService --> ICurriculumRepository : dépend de
    PostgresCurriculumRepository ..|> ICurriculumRepository : implémente
    HttpApi --> CurriculumService : appelle
```

## 4. Séquence — déploiement automatique

```mermaid
sequenceDiagram
    participant D as Dev
    participant G as GitHub
    participant A as Actions
    participant P as Pages / VPS

    D->>G: git push origin main
    G-x A: déclenche le workflow deploy
    A->>A: npm ci
    A->>A: npm run build
    alt build OK
        A->>P: publie dist/
        P-->>D: site à jour
    else build KO
        A-->>D: échec CI, rien n'est publié
    end
```

## 5. États d'une contribution hebdomadaire

```mermaid
stateDiagram-v2
    [*] --> BRANCHE : git switch -c week-XX
    BRANCHE --> PR_OUVERTE : push + open PR
    PR_OUVERTE --> CI_ROUGE : lint/tests/build KO
    CI_ROUGE --> PR_OUVERTE : corrections
    PR_OUVERTE --> RELUE : CI verte + review
    RELUE --> MERGED : squash & merge
    MERGED --> DEPLOYE : Actions publie
    DEPLOYE --> [*]
```

## 6. Dictionnaire de données (cohérence inter-modèles)

Un concept = un nom canonique = un type, dans **toutes** les couches.

| Concept | Nom canonique | Type | SQL (`docs/data-model.sql`) | OpenAPI (`docs/openapi.yaml`) | UI (`src/App.jsx`) |
| --- | --- | --- | --- | --- | --- |
| Identifiant de section | `section_id` | `slug` (`^[a-z0-9-]+$`) | `section.section_id` | `Section.sectionId` | `NAV[].items[].id` |
| Titre de section | `section_title` | `string` | `section.title` | `Section.title` | `H2` de la section |
| Numéro de semaine | `week_number` | `integer >= 1` | `week.week_number` | `Week.number` | `docs/curriculum.md` |
| URL de ressource | `resource_url` | `uri` | `resource.url` | `Resource.url` | `SourceLink href` |
