import { Code, InlineCode, P, H2, H3, Ul, Note, Table, SourceLink } from "../../shared/ui/primitives.jsx";
import { API_ACCENT } from "../../shared/ui/tokens.js";

export default function RestPrinciples() {
  return (
    <div>
      <H2 accent={API_ACCENT}>Principes fondamentaux de l'architecture RESTful</H2>

      <H3>Le problème : des API ad hoc</H3>
      <P>
        Les API de style RPC non standardisées —{" "}
        <InlineCode>POST /getUserData</InlineCode>,{" "}
        <InlineCode>GET /deleteUser?id=5</InlineCode>,{" "}
        <InlineCode>POST /user_update_v2</InlineCode> — exposent la logique
        interne du serveur dans l'URL. Conséquences concrètes :
      </P>
      <Ul>
        <li>
          <strong>Cache HTTP inopérant</strong> : un <InlineCode>GET</InlineCode>{" "}
          qui supprime une ressource ne peut être mis en cache ni rejoué par un
          proxy sans effet de bord.
        </li>
        <li>
          <strong>Vocabulaire à réapprendre</strong> pour chaque service : le
          client ne peut rien déduire, il doit lire une doc maison.
        </li>
        <li>
          <strong>Sécurité fragile</strong> : les actions destructrices passent
          en <InlineCode>GET</InlineCode>, donc déclenchables par un simple lien
          ou un préchargement de navigateur.
        </li>
      </Ul>

      <H3>La solution : REST (Roy Fielding, 2000)</H3>
      <P>
        REST est un <strong>style d'architecture</strong>, pas un protocole. Il
        s'appuie sur les mécanismes natifs de HTTP. Deux idées structurantes :
      </P>
      <Ul>
        <li>
          Les <strong>URL sont des noms</strong> qui identifient des{" "}
          <strong>ressources</strong> (<InlineCode>/users/42</InlineCode>,{" "}
          <InlineCode>/users/42/orders</InlineCode>) — jamais des actions.
        </li>
        <li>
          Ce sont les <strong>verbes HTTP</strong> qui portent l'intention, et
          leur sémantique est standard (RFC 9110).
        </li>
      </Ul>

      <H3>Les contraintes REST</H3>
      <Table
        head={["Contrainte", "Ce qu'elle impose"]}
        rows={[
          ["Client–serveur", "Séparation des responsabilités : l'UI évolue indépendamment du stockage"],
          ["Sans état (stateless)", "Chaque requête porte tout son contexte (jeton, paramètres) ; le serveur ne garde pas de session"],
          ["Cache", "Les réponses indiquent si elles sont cacheables (Cache-Control, ETag)"],
          ["Interface uniforme", "Mêmes règles pour toutes les ressources : identification par URL, manipulation via représentations, messages auto-descriptifs, HATEOAS"],
          ["Système en couches", "Un proxy, un cache ou une passerelle peut s'intercaler sans que le client le sache"],
        ]}
      />
      <Note accent={API_ACCENT}>
        Le <strong>stateless</strong> est ce qui permet de mettre plusieurs
        instances du serveur derrière un load balancer : n'importe quelle
        instance peut traiter n'importe quelle requête. Une session en mémoire
        casserait cette propriété.
      </Note>

      <H3>Verbes et sémantique</H3>
      <Table
        head={["Verbe", "Intention", "Idempotent", "Sûr (safe)"]}
        rows={[
          ["GET", "Lire une ressource ou une collection", "oui", "oui"],
          ["POST", "Créer une ressource subordonnée / déclencher un traitement", "non", "non"],
          ["PUT", "Créer ou remplacer intégralement une ressource à une URL connue", "oui", "non"],
          ["PATCH", "Modifier partiellement une ressource", "non", "non"],
          ["DELETE", "Supprimer une ressource", "oui", "non"],
        ]}
      />
      <P>
        <strong>Sûr</strong> = ne modifie pas l'état du serveur (lecture seule).{" "}
        <strong>Idempotent</strong> = rejouer la requête à l'identique laisse le
        serveur dans le même état final.{" "}
        <InlineCode>DELETE /articles/99</InlineCode> deux fois : la ressource est
        absente dans les deux cas. C'est ce qui rend les <em>retries</em>{" "}
        réseau sûrs pour <InlineCode>GET</InlineCode>, <InlineCode>PUT</InlineCode>{" "}
        et <InlineCode>DELETE</InlineCode>, mais pas pour{" "}
        <InlineCode>POST</InlineCode> (d'où les clés d'idempotence).
      </P>

      <H3>Sémantique des codes de statut</H3>
      <Table
        head={["Code", "Sens", "Quand l'employer"]}
        rows={[
          ["200 OK", "Succès avec corps", "GET, PUT/PATCH renvoyant la représentation"],
          ["201 Created", "Ressource créée", "POST réussi ; ajouter l'en-tête Location"],
          ["204 No Content", "Succès sans corps", "DELETE, ou PUT sans renvoi de corps"],
          ["400 Bad Request", "Requête malformée", "JSON invalide, schéma non respecté"],
          ["401 Unauthorized", "Non authentifié", "Jeton absent ou invalide"],
          ["403 Forbidden", "Authentifié mais non autorisé", "Droits insuffisants sur la ressource"],
          ["404 Not Found", "Ressource inexistante", "ID inconnu (ou masquage volontaire d'un 403)"],
          ["409 Conflict", "Conflit d'état", "Doublon, edition concurrente (voir ETag)"],
          ["422 Unprocessable Entity", "Syntaxe OK, sémantique invalide", "Règle métier violée"],
          ["429 Too Many Requests", "Quota dépassé", "Rate limiting ; ajouter Retry-After"],
          ["500 / 502 / 503", "Erreur serveur", "Bug, dépendance indisponible ; la requête peut être valide"],
        ]}
      />
      <Code>{`GET    /articles           -> 200 + collection
POST   /articles           -> 201 + Location: /articles/99
GET    /articles/99        -> 200 + représentation
PUT    /articles/99        -> 200 (corps) ou 204 (sans corps)
PATCH  /articles/99        -> 200
DELETE /articles/99        -> 204
GET    /articles/inconnu   -> 404
POST   /articles (doublon) -> 409 Conflict`}</Code>

      <H3>Concevoir les URL</H3>
      <Ul>
        <li>
          <strong>Noms au pluriel</strong> pour les collections :{" "}
          <InlineCode>/articles</InlineCode>, pas{" "}
          <InlineCode>/article</InlineCode> ni <InlineCode>/getArticles</InlineCode>.
        </li>
        <li>
          <strong>Hiérarchie</strong> pour les relations d'appartenance :{" "}
          <InlineCode>/articles/99/comments</InlineCode>. Au-delà de deux
          niveaux, préférer un filtre :{" "}
          <InlineCode>/comments?articleId=99</InlineCode>.
        </li>
        <li>
          <strong>Query string</strong> pour filtre, tri et pagination :{" "}
          <InlineCode>/articles?status=published&amp;sort=-createdAt&amp;page=2</InlineCode>.
        </li>
        <li>
          Pas de verbe dans l'URL. Une action qui n'est pas un CRUD (ex.
          « publier ») devient une sous-ressource d'état :{" "}
          <InlineCode>PUT /articles/99/publication</InlineCode>.
        </li>
      </Ul>

      <H3>Pagination, filtrage, tri</H3>
      <Code>{`GET /articles?page=3&pageSize=20&sort=-publishedAt&author=42

200 OK
{
  "data": [ /* 20 articles */ ],
  "page": 3,
  "pageSize": 20,
  "total": 137,
  "links": {
    "next": "/articles?page=4&pageSize=20",
    "prev": "/articles?page=2&pageSize=20"
  }
}`}</Code>
      <P>
        Sur de gros volumes, la pagination <strong>par curseur</strong>{" "}
        (<InlineCode>?after=eyJpZCI6...</InlineCode>) est préférable à la
        pagination par offset : elle reste stable même si des éléments sont
        insérés pendant la navigation.
      </P>

      <H3>Versionnage et évolution</H3>
      <Ul>
        <li>
          <strong>Changements rétrocompatibles</strong> (ajouter un champ
          optionnel, un endpoint) : pas de nouvelle version.
        </li>
        <li>
          <strong>Changements cassants</strong> (retirer un champ, changer un
          type) : nouvelle version, via préfixe d'URL{" "}
          <InlineCode>/v2/articles</InlineCode> ou en-tête{" "}
          <InlineCode>Accept: application/vnd.exemple.v2+json</InlineCode>.
        </li>
        <li>Documenter les dépréciations et donner une fenêtre de migration.</li>
      </Ul>

      <H3>Concurrence : ETag et requêtes conditionnelles</H3>
      <Code>{`GET /articles/99
200 OK
ETag: "a1b2c3"

PUT /articles/99
If-Match: "a1b2c3"
-> 200 si l'ETag correspond encore
-> 412 Precondition Failed si la ressource a changé entre-temps`}</Code>
      <P>
        Ce mécanisme évite le <em>lost update</em> : deux éditeurs qui
        enregistrent presque en même temps ne s'écrasent plus silencieusement.
      </P>

      <H3>Erreurs lisibles (RFC 9457)</H3>
      <Code>{`HTTP/1.1 422 Unprocessable Entity
Content-Type: application/problem+json

{
  "type": "https://api.exemple.com/errors/validation",
  "title": "Validation échouée",
  "status": 422,
  "detail": "Le champ 'currency' doit valoir EUR, USD ou GBP.",
  "instance": "/orders",
  "errors": [
    { "field": "currency", "message": "valeur non autorisée" }
  ]
}`}</Code>

      <Note accent={API_ACCENT}>
        <strong>HATEOAS</strong> (le « niveau 3 » du modèle de maturité de
        Richardson) : la réponse embarque les liens vers les actions possibles
        (<InlineCode>links.next</InlineCode>,{" "}
        <InlineCode>links.publish</InlineCode>). En pratique, beaucoup d'API
        s'arrêtent au niveau 2 (ressources + verbes + codes de statut), qui
        couvre déjà l'essentiel des bénéfices.
      </Note>

      <SourceLink href="https://datatracker.ietf.org/doc/html/rfc9110">
        ietf.org — RFC 9110 (HTTP Semantics)
      </SourceLink>
      {" · "}
      <SourceLink href="https://datatracker.ietf.org/doc/html/rfc9457">
        ietf.org — RFC 9457 (Problem Details for HTTP APIs)
      </SourceLink>
      {" · "}
      <SourceLink href="https://learn.microsoft.com/en-us/azure/architecture/best-practices/api-design">
        microsoft.com — API Design Best Practices
      </SourceLink>
      {" · "}
      <SourceLink href="https://martinfowler.com/articles/richardsonMaturityModel.html">
        martinfowler.com — Richardson Maturity Model
      </SourceLink>
    </div>
  );
}
