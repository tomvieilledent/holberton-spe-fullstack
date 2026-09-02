import { Code, InlineCode, P, H2, H3, Ul, Note, Table, SourceLink } from "../../shared/ui/primitives.jsx";
import { URBA_ACCENT } from "../../shared/ui/tokens.js";

export default function UrbanInformation() {
  return (
    <div>
      <H2 accent={URBA_ACCENT}>L'urbanisation de l'information (aligner les silos)</H2>
      <P>
        Quand chaque couche optimise son propre modèle dans son coin — le
        DBA normalise ses tables, le back-end façonne ses objets métier, le
        front-end réclame une structure adaptée à l'affichage — il faut
        écrire, à chaque frontière, un code de <strong>mapping</strong> :
        coûteux, répétitif, source de bugs silencieux et de dette de
        maintenabilité.
      </P>

      <H3>La métaphore de l'urbanisme</H3>
      <P>
        On urbanise un système d'information comme une ville : des quartiers
        (domaines) aux responsabilités claires, des voies de circulation
        (échanges) normalisées, un plan d'ensemble qui empêche les
        constructions anarchiques. Trois modèles ne sont alors que{" "}
        <strong>trois vues d'une même réalité métier</strong> :
      </P>
      <Table
        head={["Vue", "Formalisme", "Répond à"]}
        rows={[
          ["Modèle de données", "Merise / SQL", "Comment l'information est stockée"],
          ["Modèle de traitement", "UML", "Comment l'information est transformée"],
          ["Modèle d'échange", "OpenAPI", "Comment l'information circule entre systèmes"],
        ]}
      />
      <Note accent={URBA_ACCENT}>
        Objectif : l'information doit transiter d'une couche à l'autre avec
        un <strong>minimum de transformations structurelles</strong>, en
        conservant son intégrité ontologique — un{" "}
        <InlineCode>Client</InlineCode> reste le même concept, avec les mêmes
        attributs et les mêmes règles, de la table à la réponse JSON.
      </Note>

      <H3>En pratique</H3>
      <Ul>
        <li>Un dictionnaire de données unique, partagé par les trois modèles.</li>
        <li>Des identifiants stables (mêmes clés, mêmes types) d'un bout à l'autre.</li>
        <li>Des frontières explicites : on sait où et pourquoi une transformation a lieu, elle n'est jamais subie.</li>
      </Ul>

      <SourceLink href="https://martinfowler.com/articles/microservices.html">
        martinfowler.com — Microservices & Componentization
      </SourceLink>
    </div>
  );
}
