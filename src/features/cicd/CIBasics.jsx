import { Code, InlineCode, P, H2, H3, Ul, Note, Table, SourceLink } from "../../shared/ui/primitives.jsx";
import { CI_ACCENT } from "../../shared/ui/tokens.js";
import { Workflow } from "lucide-react";

export default function CIBasics() {
  return (
    <div>
      <H2 accent={CI_ACCENT}>GitHub Actions — les bases d'un workflow</H2>
      <P>
        Un workflow est un processus automatisé défini dans un fichier YAML,
        placé dans <InlineCode>.github/workflows/</InlineCode>. Il se compose
        d'un déclencheur (<InlineCode>on</InlineCode>), d'un ou plusieurs{" "}
        <InlineCode>jobs</InlineCode>, eux-mêmes composés d'étapes (
        <InlineCode>steps</InlineCode>).
      </P>

      <H3>Structure minimale</H3>
      <Code>{`name: CI

on:
  push:
    branches: [main]
  pull_request:

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v6
      - name: Install dependencies
        run: npm install
      - name: Run tests
        run: npm test`}</Code>

      <H3>Déclencheurs (on)</H3>
      <P>
        On peut restreindre un déclencheur à certaines branches, tags ou
        chemins de fichiers modifiés :
      </P>
      <Code>{`on:
  push:
    branches: [main]
    paths: ['src/**']
  pull_request:
    branches: [main]
  schedule:
    - cron: '30 5 * * 1-5'`}</Code>

      <H3>Étapes (steps)</H3>
      <P>
        Une étape exécute soit une commande (<InlineCode>run</InlineCode>),
        soit une action réutilisable (<InlineCode>uses</InlineCode>) — un
        bloc de code publié par la communauté ou par GitHub.
      </P>
      <Code>{`steps:
  - name: Checkout du code
    uses: actions/checkout@v6

  - name: Afficher un message
    run: echo "Build en cours"`}</Code>
      <Note accent={CI_ACCENT}>
        Il est recommandé d'épingler les actions tierces à un SHA de commit
        plutôt qu'à un tag mouvant, pour éviter qu'une mise à jour non
        maîtrisée ne casse le workflow.
      </Note>

      <H3>Permissions</H3>
      <P>
        Le jeton <InlineCode>GITHUB_TOKEN</InlineCode> généré automatiquement
        n'a par défaut que les permissions nécessaires. On peut les ajuster
        finement par workflow ou par job :
      </P>
      <Code>{`permissions:
  contents: read
  packages: write`}</Code>

      <SourceLink href="https://docs.github.com/en/actions">
        docs.github.com — GitHub Actions
      </SourceLink>
      {" · "}
      <SourceLink href="https://docs.github.com/en/actions/reference/workflows-and-actions/workflow-syntax">
        docs.github.com — Workflow syntax
      </SourceLink>
    </div>
  );
}
