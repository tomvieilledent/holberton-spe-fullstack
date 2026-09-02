import { Code, InlineCode, P, H2, H3, Ul, Note, Table, SourceLink } from "../../shared/ui/primitives.jsx";
import { API_ACCENT } from "../../shared/ui/tokens.js";

export default function JsonSchemaValidation() {
  return (
    <div>
      <H2 accent={API_ACCENT}>Validation stricte via JSON Schema</H2>
      <P>
        Des données mal typées ou non validées à l'entrée d'une API peuvent
        faire planter le serveur, corrompre la base ou ouvrir la porte à des
        injections. <strong>JSON Schema</strong> est la première ligne de
        défense : un schéma déclaratif que la requête doit respecter avant
        même d'atteindre la logique métier.
      </P>

      <H3>Les mots-clés qui verrouillent</H3>
      <Table
        head={["Mot-clé", "Effet"]}
        rows={[
          ["required", "Liste des propriétés obligatoires"],
          ["additionalProperties: false", "Rejette toute propriété non déclarée"],
          ["format", "Valide une sémantique (uuid, date, email...)"],
          ["pattern", "Impose une expression régulière"],
          ["enum", "Restreint à une liste finie de valeurs légales"],
          ["minimum", "Borne numérique inférieure"],
        ]}
      />
      <Code>{`OrderPayload:
  type: object
  additionalProperties: false
  required: [customerId, currency, lines]
  properties:
    customerId:
      type: string
      format: uuid
    currency:
      type: string
      enum: [EUR, USD, GBP]
    couponCode:
      type: string
      pattern: "^[A-Z0-9]{6,12}$"
    lines:
      type: array
      minItems: 1
      items:
        type: object
        additionalProperties: false
        required: [sku, quantity]
        properties:
          sku:
            type: string
            pattern: "^SKU-[0-9]{8}$"
          quantity:
            type: integer
            minimum: 1`}</Code>
      <Note accent={API_ACCENT}>
        <InlineCode>additionalProperties: false</InlineCode> est
        l'interrupteur le plus important : sans lui, un client peut injecter{" "}
        <InlineCode>isAdmin: true</InlineCode> ou{" "}
        <InlineCode>price: 0</InlineCode> dans le payload sans déclencher
        d'erreur de validation (mass assignment).
      </Note>

      <SourceLink href="https://json-schema.org/understanding-json-schema/reference">
        json-schema.org — Understanding JSON Schema
      </SourceLink>
      {" · "}
      <SourceLink href="https://owasp.org/www-project-api-security/">
        owasp.org — API Security Top 10
      </SourceLink>
    </div>
  );
}
