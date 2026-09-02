import { Code, InlineCode, P, H2, H3, Ul, Note, Table, SourceLink } from "../../shared/ui/primitives.jsx";
import { API_ACCENT } from "../../shared/ui/tokens.js";

export default function JsonSchemaValidation() {
  return (
    <div>
      <H2 accent={API_ACCENT}>Validation stricte via JSON Schema</H2>

      <H3>Le problème : faire confiance à l'entrée</H3>
      <P>
        Des données mal typées ou non validées à l'entrée d'une API peuvent
        faire planter le serveur (accès à un champ absent), corrompre la base
        (chaîne de 10 000 caractères dans une colonne{" "}
        <InlineCode>VARCHAR(80)</InlineCode>), ou ouvrir la porte à des
        injections et à l'<em>escalade de privilèges</em>. La logique métier ne
        doit jamais être la première à voir des données brutes.
      </P>

      <H3>La solution : un schéma déclaratif</H3>
      <P>
        <strong>JSON Schema</strong> décrit la forme attendue d'un document
        JSON. Un validateur (Ajv, <InlineCode>python-jsonschema</InlineCode>…)
        confronte la requête au schéma <strong>avant</strong> la logique métier
        et renvoie un <InlineCode>400</InlineCode> / <InlineCode>422</InlineCode>{" "}
        avec la liste des écarts. C'est le même vocabulaire que{" "}
        <InlineCode>components/schemas</InlineCode> d'OpenAPI : un seul schéma
        sert au contrat, à la doc et à la validation runtime.
      </P>

      <H3>Les mots-clés qui verrouillent</H3>
      <Table
        head={["Mot-clé", "Effet"]}
        rows={[
          ["type", "Type primitif attendu (object, array, string, integer, boolean, null)"],
          ["required", "Liste des propriétés obligatoires"],
          ["additionalProperties: false", "Rejette toute propriété non déclarée"],
          ["format", "Sémantique nommée (uuid, date-time, email, uri…)"],
          ["pattern", "Expression régulière que la chaîne doit vérifier"],
          ["enum / const", "Liste finie de valeurs légales / valeur unique imposée"],
          ["minimum / maximum, exclusiveMinimum", "Bornes numériques"],
          ["minLength / maxLength", "Longueur d'une chaîne"],
          ["minItems / maxItems / uniqueItems", "Contraintes de tableau"],
          ["multipleOf", "Valeur multiple de (ex. pas de 0.01 pour un montant)"],
        ]}
      />

      <H3>Exemple : payload de commande</H3>
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
      maxItems: 200
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
            minimum: 1
            maximum: 999`}</Code>
      <Note accent={API_ACCENT}>
        <InlineCode>additionalProperties: false</InlineCode> est
        l'interrupteur le plus important : sans lui, un client peut injecter{" "}
        <InlineCode>isAdmin: true</InlineCode>, <InlineCode>price: 0</InlineCode>{" "}
        ou <InlineCode>role: "owner"</InlineCode> dans le payload sans
        déclencher d'erreur (<em>mass assignment</em>). Le serveur doit aussi
        n'affecter que les champs explicitement autorisés (allow-list), jamais{" "}
        <InlineCode>Object.assign(entity, body)</InlineCode>.
      </Note>

      <H3>Composition : allOf, oneOf, anyOf, not</H3>
      <P>
        On combine des sous-schémas pour exprimer des règles conditionnelles.{" "}
        <InlineCode>oneOf</InlineCode> = exactement un des schémas valide,
        utile pour un champ polymorphe :
      </P>
      <Code>{`Payment:
  type: object
  required: [method]
  properties:
    method: { type: string, enum: [card, iban] }
  oneOf:
    - properties:
        method: { const: card }
        pan: { type: string, pattern: "^[0-9]{16}$" }
      required: [pan]
    - properties:
        method: { const: iban }
        iban: { type: string, pattern: "^[A-Z]{2}[0-9A-Z]{13,32}$" }
      required: [iban]`}</Code>
      <Table
        head={["Mot-clé", "Signification"]}
        rows={[
          ["allOf", "Tous les sous-schémas doivent valider (héritage / fusion)"],
          ["anyOf", "Au moins un sous-schéma valide"],
          ["oneOf", "Exactement un sous-schéma valide"],
          ["not", "Le sous-schéma ne doit pas valider"],
          ["if / then / else", "Validation conditionnelle sur la valeur d'un champ"],
        ]}
      />

      <H3>Sortie d'erreur exploitable</H3>
      <Code>{`// Ajv (Node) — erreurs structurées
const validate = ajv.compile(orderSchema);
if (!validate(body)) {
  return res.status(422).json({
    title: "Validation échouée",
    status: 422,
    errors: validate.errors.map(e => ({
      field: e.instancePath || e.params.missingProperty,
      rule: e.keyword,
      message: e.message,
    })),
  });
}`}</Code>

      <H3>Où brancher la validation</H3>
      <Ul>
        <li>
          <strong>Bordure de l'API</strong> : middleware qui valide{" "}
          <InlineCode>body</InlineCode>, <InlineCode>query</InlineCode> et{" "}
          <InlineCode>params</InlineCode> contre le schéma de la route.
        </li>
        <li>
          <strong>Réponses aussi</strong>, en environnement de test : garantit
          que le serveur ne renvoie jamais un document hors contrat.
        </li>
        <li>
          <strong>Messages de file</strong> (events, webhooks) : valider le
          message avant traitement, sinon un producteur fautif empoisonne le
          consommateur.
        </li>
        <li>
          <strong>Config au démarrage</strong> : un schéma sur le fichier de
          config fait échouer le boot plutôt que la 1<sup>re</sup> requête.
        </li>
      </Ul>

      <Note accent={API_ACCENT}>
        <strong>Versions du standard</strong> : les brouillons récents
        (Draft 2020-12, adopté par OpenAPI 3.1) uniformisent les mots-clés.
        Draft-07 reste très répandu. Choisir le dialecte supporté par son
        validateur et le déclarer via <InlineCode>$schema</InlineCode>.
      </Note>

      <SourceLink href="https://json-schema.org/understanding-json-schema/reference">
        json-schema.org — Understanding JSON Schema
      </SourceLink>
      {" · "}
      <SourceLink href="https://json-schema.org/draft/2020-12/release-notes">
        json-schema.org — Draft 2020-12
      </SourceLink>
      {" · "}
      <SourceLink href="https://ajv.js.org/guide/getting-started.html">
        ajv.js.org — Ajv, validateur JSON Schema
      </SourceLink>
      {" · "}
      <SourceLink href="https://owasp.org/www-project-api-security/">
        owasp.org — API Security Top 10
      </SourceLink>
    </div>
  );
}
