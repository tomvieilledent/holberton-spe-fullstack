import { Code, InlineCode, P, H2, H3, Ul, Note, Table, SourceLink } from "../../shared/ui/primitives.jsx";
import { URBA_ACCENT } from "../../shared/ui/tokens.js";

export default function InterModelConsistency() {
  return (
    <div>
      <H2 accent={URBA_ACCENT}>La cohérence inter-modèles (la chasse à la friction sémantique)</H2>
      <P>
        Un même concept métier finit souvent nommé différemment selon la
        couche : <InlineCode>sku_code</InlineCode> en SQL,{" "}
        <InlineCode>ProductIdentifier</InlineCode> en UML,{" "}
        <InlineCode>article_id</InlineCode> dans l'API, « Référence
        Catalogue » dans les scénarios Gherkin. Cette <strong>dette
        sémantique invisible</strong> oblige à des conversions DTO / ORM
        coûteuses et rend le débogage difficile : suivre une donnée revient
        à traduire son nom à chaque étape.
      </P>

      <H3>Viser l'isomorphisme via un dictionnaire de données unifié</H3>
      <Table
        head={["Dimension", "Règle", "Contre-exemple"]}
        rows={[
          ["Type Matching", "Le même concept porte le même type partout (UUID en base, UUID en UML, format uuid en API)", "id en BIGINT côté SQL mais string côté API"],
          ["Naming Matching", "Le même mot désigne le concept dans toutes les couches, validé par la gouvernance", "customer / client / user / account pour la même entité"],
        ]}
      />
      <Code>{`# Dictionnaire de données — entrée unique
Concept       : Référence produit
Nom canonique : product_reference
Type          : string, pattern ^SKU-[0-9]{8}$
SQL           : product.product_reference   (text, UNIQUE)
UML           : Product.productReference : String
OpenAPI       : Product.productReference   (type: string)
Gherkin       : "la référence produit <product_reference>"`}</Code>
      <Note accent={URBA_ACCENT}>
        C'est le <em>ubiquitous language</em> du Domain-Driven Design : un
        vocabulaire unique, partagé par le métier et toutes les couches
        techniques, qui supprime la traduction plutôt que de l'outiller.
      </Note>

      <SourceLink href="https://martinfowler.com/bliki/UbiquitousLanguage.html">
        martinfowler.com — Ubiquitous Language
      </SourceLink>
      {" · "}
      <SourceLink href="https://www.domainlanguage.com/ddd/reference/">
        domainlanguage.com — DDD Reference (Eric Evans)
      </SourceLink>
    </div>
  );
}
