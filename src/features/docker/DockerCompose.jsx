import { Code, InlineCode, P, H2, H3, Ul, Note, Table, SourceLink } from "../../shared/ui/primitives.jsx";
import { DOCKER_ACCENT } from "../../shared/ui/tokens.js";

export default function DockerCompose() {
  return (
    <div>
      <H2 accent={DOCKER_ACCENT}>Docker Compose</H2>
      <P>
        Compose permet de définir et de faire tourner des applications à
        plusieurs conteneurs à partir d'un seul fichier YAML. Plutôt que
        d'enchaîner des commandes <InlineCode>docker run</InlineCode> et de
        gérer soi-même les réseaux, on décrit tout dans{" "}
        <InlineCode>compose.yaml</InlineCode>.
      </P>
      <Note accent={DOCKER_ACCENT}>
        Compose est un outil déclaratif : on décrit l'état voulu, puis{" "}
        <InlineCode>docker compose up</InlineCode> se charge de le réconcilier
        avec l'état actuel — pas besoin de tout recréer à chaque changement.
      </Note>

      <H3>Exemple de compose.yaml</H3>
      <Code>{`services:
  app:
    build: .
    ports:
      - "3000:3000"
    environment:
      - DEBUG=true
    depends_on:
      - db

  db:
    image: mysql
    volumes:
      - db-data:/var/lib/mysql

volumes:
  db-data:`}</Code>

      <H3>Commandes essentielles</H3>
      <Table
        head={["Commande", "Effet"]}
        rows={[
          ["docker compose up -d", "Démarre tous les services en arrière-plan"],
          ["docker compose down", "Arrête et supprime conteneurs et réseaux"],
          ["docker compose down --volumes", "Supprime aussi les volumes"],
          ["docker compose ps", "Liste les services en cours"],
          ["docker compose logs", "Affiche les logs des services"],
        ]}
      />

      <H3>Variables d'environnement</H3>
      <P>
        Deux façons principales d'injecter des variables dans un service :
      </P>
      <Code>{`services:
  webapp:
    environment:
      DEBUG: "true"
      # équivalent à la syntaxe liste :
      # - DEBUG=true`}</Code>
      <Code>{`services:
  webapp:
    env_file: "webapp.env"`}</Code>
      <Note accent={DOCKER_ACCENT}>
        Ne jamais faire passer des informations sensibles (mots de passe,
        clés d'API) par des variables d'environnement en clair — Docker
        propose un mécanisme dédié : les <InlineCode>secrets</InlineCode>.
      </Note>

      <H3>Profils de services</H3>
      <P>
        Les <InlineCode>profiles</InlineCode> permettent de n'activer
        certains services que dans certains contextes (débogage,
        outils ponctuels…), sans les faire tourner par défaut.
      </P>
      <Code>{`services:
  backend:
    image: backend
    # pas de profil -> toujours actif

  phpmyadmin:
    image: phpmyadmin
    depends_on: [db]
    profiles: [debug]`}</Code>
      <Code>{`docker compose --profile debug up`}</Code>
      <P>
        Sans l'option <InlineCode>--profile debug</InlineCode>, le service{" "}
        <InlineCode>phpmyadmin</InlineCode> ne démarre pas.
      </P>

      <SourceLink href="https://docs.docker.com/compose/">
        docs.docker.com — Docker Compose
      </SourceLink>
      {" · "}
      <SourceLink href="https://docs.docker.com/reference/compose-file/services/">
        docs.docker.com — Services reference
      </SourceLink>
      {" · "}
      <SourceLink href="https://docs.docker.com/compose/how-tos/environment-variables/">
        docs.docker.com — Environment variables
      </SourceLink>
      {" · "}
      <SourceLink href="https://docs.docker.com/compose/how-tos/profiles/">
        docs.docker.com — Profiles
      </SourceLink>
      {" · "}
      <SourceLink href="https://www.youtube.com/watch?v=MfxKDC3RR-U">
        Grafikart — Docker Compose, c'est quoi ?
      </SourceLink>
    </div>
  );
}
