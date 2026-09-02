import { Code, InlineCode, P, H2, H3, Ul, Note, Table, SourceLink } from "../../shared/ui/primitives.jsx";
import { API_ACCENT } from "../../shared/ui/tokens.js";

export default function OpenApiSpec() {
  return (
    <div>
      <H2 accent={API_ACCENT}>La spécification OpenAPI 3.0 (OAS)</H2>

      <H3>Le problème : la doc qui ment</H3>
      <P>
        Une documentation d'API tenue à la main dans un wiki ou un PDF se
        désynchronise du code réel en quelques semaines. Les clients codent
        contre une réalité qui n'existe plus, les tests d'intégration cassent
        sans raison apparente, et personne ne sait quelle version fait foi.
      </P>

      <H3>La solution : un contrat exécutable</H3>
      <P>
        L'<strong>OpenAPI Specification</strong> (ex-Swagger) est un contrat{" "}
        <InlineCode>YAML</InlineCode> / <InlineCode>JSON</InlineCode>, lisible
        par des humains comme par des machines. Un seul fichier alimente :
      </P>
      <Ul>
        <li>une <strong>documentation</strong> navigable (Swagger UI, Redoc, Stoplight) ;</li>
        <li>
          la <strong>génération de clients</strong> (TypeScript, Python, Go…) et
          de <em>stubs</em> serveur ;
        </li>
        <li>
          la <strong>validation des requêtes/réponses</strong> à l'exécution
          (middleware) ou en test de contrat ;
        </li>
        <li>des <strong>mocks</strong> instantanés pour développer le front sans back ;</li>
        <li>l'import dans Postman / Insomnia et les passerelles d'API.</li>
      </Ul>

      <H3>Structure d'un document OAS</H3>
      <Table
        head={["Section", "Rôle"]}
        rows={[
          ["openapi", "Version de la spécification (ex. 3.0.3, 3.1.0)"],
          ["info", "Titre, version de l'API, description, contact, licence"],
          ["servers", "URL de base des environnements (prod, staging)"],
          ["paths", "Les routes, leurs verbes, paramètres, corps et réponses"],
          ["components/schemas", "Définitions de données réutilisables"],
          ["components/parameters, responses", "Fragments réutilisables (pagination, erreurs)"],
          ["components/securitySchemes", "Modes d'authentification (bearer, OAuth2, apiKey)"],
          ["security", "Exigence d'authentification globale ou par opération"],
          ["tags", "Regroupement des opérations dans la doc"],
        ]}
      />

      <H3>Exemple complet : lecture et création</H3>
      <Code>{`openapi: 3.0.3
info:
  title: API Utilisateurs
  version: 1.2.0
  description: Gestion des comptes utilisateurs.
servers:
  - url: https://api.exemple.com/v1
tags:
  - name: users
security:
  - bearerAuth: []
paths:
  /users:
    get:
      tags: [users]
      summary: Liste les utilisateurs
      parameters:
        - $ref: "#/components/parameters/Page"
        - name: q
          in: query
          description: Filtre plein texte sur le nom
          schema: { type: string }
      responses:
        "200":
          description: Collection paginée
          content:
            application/json:
              schema:
                type: object
                properties:
                  data:
                    type: array
                    items: { $ref: "#/components/schemas/User" }
                  total: { type: integer }
        "401":
          $ref: "#/components/responses/Unauthorized"
    post:
      tags: [users]
      summary: Crée un utilisateur
      requestBody:
        required: true
        content:
          application/json:
            schema: { $ref: "#/components/schemas/NewUser" }
      responses:
        "201":
          description: Créé
          headers:
            Location:
              schema: { type: string }
          content:
            application/json:
              schema: { $ref: "#/components/schemas/User" }
        "422":
          $ref: "#/components/responses/ValidationError"
  /users/{id}:
    get:
      tags: [users]
      summary: Détail d'un utilisateur
      parameters:
        - name: id
          in: path
          required: true
          schema: { type: string, format: uuid }
      responses:
        "200":
          description: OK
          content:
            application/json:
              schema: { $ref: "#/components/schemas/User" }
        "404":
          $ref: "#/components/responses/NotFound"
components:
  securitySchemes:
    bearerAuth:
      type: http
      scheme: bearer
      bearerFormat: JWT
  parameters:
    Page:
      name: page
      in: query
      schema: { type: integer, minimum: 1, default: 1 }
  responses:
    Unauthorized:
      description: Jeton absent ou invalide
    NotFound:
      description: Ressource introuvable
    ValidationError:
      description: Données invalides
      content:
        application/problem+json:
          schema: { $ref: "#/components/schemas/Problem" }
  schemas:
    User:
      type: object
      required: [id, email, createdAt]
      properties:
        id: { type: string, format: uuid }
        email: { type: string, format: email }
        displayName: { type: string }
        createdAt: { type: string, format: date-time }
    NewUser:
      type: object
      required: [email]
      properties:
        email: { type: string, format: email }
        displayName: { type: string, maxLength: 80 }
    Problem:
      type: object
      properties:
        title: { type: string }
        status: { type: integer }
        detail: { type: string }`}</Code>

      <H3>Réutilisation : $ref et DRY</H3>
      <P>
        Le mot-clé <InlineCode>$ref</InlineCode> pointe vers une définition
        unique (<InlineCode>#/components/schemas/User</InlineCode>). Le schéma
        est décrit une fois puis référencé partout. On factorise ainsi les
        paramètres de pagination, les réponses d'erreur, les modèles — le
        contrat reste cohérent et court. Les <InlineCode>$ref</InlineCode>{" "}
        peuvent aussi pointer vers un autre fichier (<InlineCode>./schemas/user.yaml</InlineCode>).
      </P>

      <H3>OpenAPI 3.0 vs 3.1</H3>
      <Table
        head={["Point", "3.0", "3.1"]}
        rows={[
          ["Alignement JSON Schema", "Dialecte partiel", "JSON Schema 2020-12 complet"],
          ["nullable", "type: string + nullable: true", "type: [string, 'null']"],
          ["exemples", "example (singulier)", "examples (au pluriel, standardisé)"],
          ["Webhooks", "non", "objet webhooks natif"],
        ]}
      />

      <H3>Deux approches de travail</H3>
      <Ul>
        <li>
          <strong>Design-first</strong> : on écrit le contrat, on le revoit
          avec les consommateurs, puis on implémente. La spec est la source de
          vérité.
        </li>
        <li>
          <strong>Code-first</strong> : la spec est générée depuis des
          annotations/décorateurs dans le code. Plus rapide au début, mais la
          spec suit le code au lieu de le cadrer.
        </li>
      </Ul>

      <H3>Linter le contrat avec Spectral</H3>
      <P>
        <strong>Spectral</strong> (Stoplight) analyse le contrat contre un jeu
        de règles et échoue si une règle de sévérité <InlineCode>error</InlineCode>{" "}
        est violée : c'est un <strong>test</strong> à part entière, exécuté en
        CI au même titre que les tests unitaires. Le ruleset vit dans{" "}
        <InlineCode>.spectral.yaml</InlineCode> à la racine et étend les règles
        OpenAPI officielles.
      </P>
      <Code>{`# .spectral.yaml
extends: ["spectral:oas"]
rules:
  info-contact: off
  operation-operationId: error
  operation-description: error
  operation-tags: error
  operation-success-response: error`}</Code>
      <P>
        Ce dépôt câble Spectral dans le script <InlineCode>ci</InlineCode> de{" "}
        <InlineCode>package.json</InlineCode> et dans le workflow GitHub Actions :
      </P>
      <Code>{`# package.json
"spec:lint": "spectral lint docs/openapi.yaml",
"ci": "npm run lint && npm run spec:lint && npm run test:run && npm run build"`}</Code>

      <H3>Dans une CI</H3>
      <Code>{`# lint du contrat (échoue la CI sur erreur)
npx spectral lint docs/openapi.yaml

# la spec ne doit pas diverger du code (test de contrat)
npx portman --cliOptionsFile portman.json

# doc statique publiée avec le site
npx @redocly/cli build-docs openapi.yaml -o dist/api.html`}</Code>

      <Note accent={API_ACCENT}>
        Garder <InlineCode>openapi.yaml</InlineCode> à la racine de{" "}
        <InlineCode>docs/</InlineCode>, versionné avec le code : toute PR qui
        touche une route touche aussi le contrat, et la revue porte sur les
        deux. C'est le principe <em>Docs as Code / SSOT</em> appliqué à l'API.
      </Note>

      <SourceLink href="https://spec.openapis.org/oas/latest.html">
        spec.openapis.org — OpenAPI Specification (dernière version)
      </SourceLink>
      {" · "}
      <SourceLink href="https://swagger.io/specification/">
        swagger.io — OpenAPI 3.0 Specification
      </SourceLink>
      {" · "}
      <SourceLink href="https://learn.openapis.org/">
        learn.openapis.org — Guide officiel
      </SourceLink>
      {" · "}
      <SourceLink href="https://redocly.com/docs/cli/">
        redocly.com — Redocly CLI (lint &amp; docs)
      </SourceLink>
      {" · "}
      <SourceLink href="https://docs.stoplight.io/docs/spectral/">
        docs.stoplight.io — Spectral (lint de contrats)
      </SourceLink>
    </div>
  );
}
