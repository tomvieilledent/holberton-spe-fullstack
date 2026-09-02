import { Code, InlineCode, P, H2, H3, Ul, Note, Table, SourceLink } from "../../shared/ui/primitives.jsx";
import { URBA_ACCENT } from "../../shared/ui/tokens.js";

export default function DocsAsCodeSsot() {
  return (
    <div>
      <H2 accent={URBA_ACCENT}>Le blueprint de production (Documentation as Code & SSOT)</H2>
      <P>
        Wikis, documents Word et schémas Visio partagent le même défaut :
        leur mise à jour est manuelle, donc elle n'est jamais faite. Six
        mois plus tard, la documentation décrit un système qui n'existe
        plus.
      </P>

      <H3>La Source Unique de Vérité (SSOT)</H3>
      <P>
        La <strong>Documentation as Code</strong> ne conserve que des
        fichiers texte brut, versionnés nativement sous Git, dans le même
        dépôt que le code source :
      </P>
      <Table
        head={["Artefact", "Format", "Décrit"]}
        rows={[
          [".sql", "DDL PostgreSQL", "Le modèle physique de données"],
          [".md + Mermaid", "Markdown", "Les diagrammes UML et d'architecture"],
          [".yaml", "OpenAPI", "Le contrat d'API"],
          [".feature", "Gherkin", "Le comportement métier attendu"],
          ["ADR (.md)", "Markdown", "Les décisions d'architecture et leur justification"],
        ]}
      />
      <Code>{`repo/
├── src/                      # code applicatif
├── db/schema.sql             # MPD — source de vérité du schéma
├── docs/
│   ├── architecture.md       # diagrammes Mermaid
│   └── adr/
│       └── 0007-repository-pattern.md
├── api/openapi.yaml          # contrat d'API
└── features/
    └── retrait_atm.feature   # spécification exécutable`}</Code>
      <Note accent={URBA_ACCENT}>
        Conséquence directe : une <strong>Pull Request modifie le code ET
        sa documentation ensemble</strong>, en une seule étape atomique de
        revue. Un schéma qui diverge du code devient un diff visible — donc
        un point de blocage en revue, plus une dérive silencieuse.
      </Note>

      <SourceLink href="https://www.writethedocs.org/guide/docs-as-code/">
        writethedocs.org — Docs as Code Methodology
      </SourceLink>
      {" · "}
      <SourceLink href="https://adr.github.io/">
        adr.github.io — Architecture Decision Records (ADR)
      </SourceLink>
    </div>
  );
}
