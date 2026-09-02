import { Code, InlineCode, P, H2, H3, Ul, Note, Table, SourceLink } from "../../shared/ui/primitives.jsx";
import { MERISE_ACCENT } from "../../shared/ui/tokens.js";

export default function MeriseCardinalities() {
  return (
    <div>
      <H2 accent={MERISE_ACCENT}>Associations et cardinalités</H2>
      <P>
        Une <strong>association</strong> est un lien sémantique entre
        plusieurs entités. Les <strong>cardinalités</strong> expriment le
        nombre de participations minimales et maximales d'une entité à cette
        association.
      </P>

      <Table
        head={["Cardinalité", "Signification"]}
        rows={[
          ["0,1", "Au minimum 0, au maximum 1 — optionnel exclusif"],
          ["1,1", "Au minimum 1, au maximum 1 — obligatoire exclusif"],
          ["0,n", "Au minimum 0, au maximum plusieurs — optionnel multiple"],
          ["1,n", "Au minimum 1, au maximum plusieurs — obligatoire multiple"],
        ]}
      />

      <H3>Lire une cardinalité</H3>
      <P>
        Une cardinalité se lit toujours du côté de l'entité vers
        l'association : elle répond à la question « à combien
        d'occurrences de l'association cette entité peut-elle participer,
        au minimum et au maximum ? ». Par exemple, pour l'association{" "}
        <em>« un client passe des commandes »</em> :
      </P>
      <Ul>
        <li>Un client peut passer <InlineCode>0,n</InlineCode> commandes (aucune obligation, plusieurs possibles).</li>
        <li>Une commande est passée par exactement <InlineCode>1,1</InlineCode> client (toujours un, un seul).</li>
      </Ul>
      <Note accent={MERISE_ACCENT}>
        Le minimum (0 ou 1) traduit une contrainte d'obligation ; le maximum
        (1 ou n) traduit une contrainte de multiplicité. Les deux sont
        indépendantes l'une de l'autre.
      </Note>

      <SourceLink href="https://merise.developpez.com/cours/">
        merise.developpez.com — Cours Merise
      </SourceLink>
      {" · "}
      <SourceLink href="https://www.mocodo.net/">mocodo.net</SourceLink>
    </div>
  );
}
