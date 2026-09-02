import { Code, InlineCode, P, H2, H3, Ul, Note, Table, SourceLink } from "../../shared/ui/primitives.jsx";
import { CI_ACCENT } from "../../shared/ui/tokens.js";

export default function CISecretsMatrix() {
  return (
    <div>
      <H2 accent={CI_ACCENT}>Secrets, cache & matrices de jobs</H2>

      <H3>Secrets</H3>
      <P>
        Un secret (mot de passe, jeton d'API...) se configure dans{" "}
        <InlineCode>Settings → Secrets and variables → Actions</InlineCode> du
        dépôt, puis se référence via le contexte <InlineCode>secrets</InlineCode> :
      </P>
      <Code>{`steps:
  - name: Déploiement
    env:
      API_TOKEN: \${{ secrets.API_TOKEN }}
    run: ./deploy.sh`}</Code>
      <Note accent={CI_ACCENT}>
        Un secret n'est jamais transmis aux workflows déclenchés depuis un
        fork, et sa valeur est automatiquement masquée dans les logs si elle
        y apparaît.
      </Note>

      <H3>Mettre en cache les dépendances</H3>
      <P>
        Le cache évite de retélécharger les mêmes dépendances à chaque
        exécution. La clé inclut généralement un hash du fichier de lock,
        pour qu'un changement de dépendances invalide automatiquement le cache.
      </P>
      <Code>{`- name: Cache node modules
  uses: actions/cache@v4
  with:
    path: ~/.npm
    key: \${{ runner.os }}-npm-\${{ hashFiles('**/package-lock.json') }}
    restore-keys: |
      \${{ runner.os }}-npm-`}</Code>
      <Note accent={CI_ACCENT}>
        Pour les gestionnaires de paquets courants (npm, pip, Maven...), les
        actions <InlineCode>setup-*</InlineCode> officielles (ex.{" "}
        <InlineCode>actions/setup-node</InlineCode>) savent gérer ce cache
        avec une simple option, sans configurer <InlineCode>actions/cache</InlineCode>{" "}
        à la main.
      </Note>

      <H3>Exécuter des variations avec une matrice</H3>
      <P>
        Une stratégie matricielle génère automatiquement plusieurs
        exécutions d'un même job à partir de combinaisons de variables —
        utile pour tester sur plusieurs versions ou systèmes.
      </P>
      <Code>{`jobs:
  test:
    strategy:
      matrix:
        os: [ubuntu-latest, windows-latest]
        node: [18, 20, 22]
    runs-on: \${{ matrix.os }}
    steps:
      - uses: actions/setup-node@v7
        with:
          node-version: \${{ matrix.node }}`}</Code>
      <P>
        Cet exemple lance <strong>6 jobs</strong> (2 systèmes × 3 versions de
        Node.js), chacun avec la combinaison qui lui correspond via{" "}
        <InlineCode>matrix.os</InlineCode> et <InlineCode>matrix.node</InlineCode>.
      </P>

      <SourceLink href="https://docs.github.com/en/actions/how-tos/write-workflows/choose-what-workflows-do/use-secrets">
        docs.github.com — Using secrets
      </SourceLink>
      {" · "}
      <SourceLink href="https://docs.github.com/en/actions/reference/workflows-and-actions/dependency-caching">
        docs.github.com — Dependency caching
      </SourceLink>
      {" · "}
      <SourceLink href="https://docs.github.com/en/actions/how-tos/write-workflows/choose-what-workflows-do/run-job-variations">
        docs.github.com — Run job variations
      </SourceLink>
    </div>
  );
}
