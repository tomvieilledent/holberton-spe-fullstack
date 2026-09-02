import { Code, InlineCode, P, H2, H3, Ul, Note, Table, SourceLink } from "../../shared/ui/primitives.jsx";
import { API_ACCENT } from "../../shared/ui/tokens.js";

export default function RestPrinciples() {
  return (
    <div>
      <H2 accent={API_ACCENT}>Principes fondamentaux de l'architecture RESTful</H2>
      <P>
        Les API de style RPC non standardisées —{" "}
        <InlineCode>POST /getUserData</InlineCode>,{" "}
        <InlineCode>GET /deleteUser?id=5</InlineCode> — exposent la logique
        interne du serveur dans l'URL, rendent le cache HTTP inopérant et
        obligent chaque client à apprendre un vocabulaire ad hoc.
      </P>

      <H3>L'idée de REST (Roy Fielding, 2000)</H3>
      <P>
        Les <strong>URL sont des noms</strong> qui identifient des{" "}
        <strong>ressources</strong> (<InlineCode>/users/42</InlineCode>,{" "}
        <InlineCode>/users/42/orders</InlineCode>) ; ce sont les{" "}
        <strong>verbes HTTP</strong> qui portent l'action.
      </P>
      <Table
        head={["Verbe", "Intention", "Idempotent"]}
        rows={[
          ["GET", "Lire une ressource", "oui"],
          ["POST", "Créer une ressource subordonnée", "non"],
          ["PUT", "Remplacer intégralement une ressource", "oui"],
          ["PATCH", "Modifier partiellement une ressource", "non"],
          ["DELETE", "Supprimer une ressource", "oui"],
        ]}
      />

      <H3>Sémantique des codes de statut</H3>
      <Table
        head={["Classe", "Codes courants", "Sens"]}
        rows={[
          ["2xx succès", "200, 201, 204", "La requête a abouti"],
          ["4xx erreur client", "400, 401, 403, 404, 409", "La requête est fautive, inutile de la rejouer telle quelle"],
          ["5xx erreur serveur", "500, 502, 503", "Le serveur a échoué ; la requête peut être valide"],
        ]}
      />
      <Code>{`GET    /articles           -> 200 + collection
POST   /articles           -> 201 + Location: /articles/99
GET    /articles/99        -> 200 + représentation
PUT    /articles/99        -> 200 (ou 204)
PATCH  /articles/99        -> 200
DELETE /articles/99        -> 204
GET    /articles/inconnu   -> 404
POST   /articles (doublon) -> 409 Conflict`}</Code>
      <Note accent={API_ACCENT}>
        <strong>Idempotent</strong> = rejouer la requête à l'identique
        laisse le serveur dans le même état.{" "}
        <InlineCode>DELETE</InlineCode> deux fois de suite : la ressource
        est absente dans les deux cas, l'état final est identique.
      </Note>

      <SourceLink href="https://datatracker.ietf.org/doc/html/rfc7231">
        ietf.org — RFC 7231 (HTTP/1.1 Semantics and Content)
      </SourceLink>
      {" · "}
      <SourceLink href="https://learn.microsoft.com/en-us/azure/architecture/best-practices/api-design">
        microsoft.com — API Design Best Practices
      </SourceLink>
    </div>
  );
}
