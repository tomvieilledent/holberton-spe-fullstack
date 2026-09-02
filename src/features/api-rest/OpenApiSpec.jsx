import { Code, InlineCode, P, H2, H3, Ul, Note, Table, SourceLink } from "../../shared/ui/primitives.jsx";
import { API_ACCENT } from "../../shared/ui/tokens.js";

export default function OpenApiSpec() {
  return (
    <div>
      <H2 accent={API_ACCENT}>La spécification OpenAPI 3.0 (OAS)</H2>
      <P>
        Une documentation d'API tenue à la main dans un wiki ou un PDF se
        désynchronise du code réel en quelques semaines. L'<strong>OpenAPI
        Specification</strong> (ex-Swagger) est un contrat{" "}
        <InlineCode>YAML</InlineCode> / <InlineCode>JSON</InlineCode>, lisible
        par des humains comme par des machines (génération de clients, de
        serveurs, de tests, d'interface de documentation).
      </P>

      <H3>Structure d'un document OAS</H3>
      <Table
        head={["Section", "Rôle"]}
        rows={[
          ["openapi", "Version de la spécification (ex. 3.0.3)"],
          ["info", "Titre, version, description de l'API"],
          ["servers", "URL de base des environnements"],
          ["paths", "Les routes, leurs verbes, paramètres et réponses"],
          ["components/schemas", "Définitions de données réutilisables"],
        ]}
      />

      <H3>Exemple : GET /users</H3>
      <Code>{`openapi: 3.0.3
info:
  title: API Utilisateurs
  version: 1.0.0
servers:
  - url: https://api.exemple.com/v1
paths:
  /users:
    get:
      summary: Liste les utilisateurs
      responses:
        "200":
          description: Collection d'utilisateurs
          content:
            application/json:
              schema:
                type: array
                items:
                  $ref: "#/components/schemas/User"
components:
  schemas:
    User:
      type: object
      required: [id, email]
      properties:
        id:
          type: string
          format: uuid
        email:
          type: string
          format: email
        displayName:
          type: string`}</Code>
      <Note accent={API_ACCENT}>
        Le mot-clé <InlineCode>$ref</InlineCode> pointe vers une définition
        unique (<InlineCode>#/components/schemas/User</InlineCode>) : le
        schéma <InlineCode>User</InlineCode> est décrit une seule fois puis
        référencé partout — principe DRY appliqué au contrat d'API.
      </Note>

      <SourceLink href="https://swagger.io/specification/">
        swagger.io — OpenAPI 3.0 Specification
      </SourceLink>
      {" · "}
      <SourceLink href="https://openapi-map.apihandyman.io/">
        openapi-map.apihandyman.io — OpenAPI Map
      </SourceLink>
    </div>
  );
}
