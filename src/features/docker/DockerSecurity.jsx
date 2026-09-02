import { Code, InlineCode, P, H2, H3, Ul, Note, Table, SourceLink } from "../../shared/ui/primitives.jsx";
import { DOCKER_ACCENT } from "../../shared/ui/tokens.js";

export default function DockerSecurity() {
  return (
    <div>
      <H2 accent={DOCKER_ACCENT}>Volumes, réseaux & sécurité</H2>

      <H3>Persister des données avec les volumes</H3>
      <P>
        Le système de fichiers d'un conteneur disparaît avec lui. Pour
        conserver des données (base de données, uploads...), on utilise un{" "}
        <strong>volume</strong> : un espace de stockage géré par Docker,
        indépendant du cycle de vie du conteneur.
      </P>
      <Code>{`docker volume create my-vol
docker run -d --mount source=my-vol,target=/app nginx`}</Code>
      <Note accent={DOCKER_ACCENT}>
        Un volume survit à la suppression du conteneur qui l'utilise. Il
        faut le supprimer explicitement avec <InlineCode>docker volume rm</InlineCode>{" "}
        ou <InlineCode>docker volume prune</InlineCode> pour les volumes inutilisés.
      </Note>
      <P>
        Avec Compose, un volume nommé se déclare simplement au niveau racine
        du fichier :
      </P>
      <Code>{`services:
  db:
    image: mysql
    volumes:
      - db-data:/var/lib/mysql

volumes:
  db-data:`}</Code>

      <H3>Isoler avec les réseaux</H3>
      <P>
        Docker fournit plusieurs pilotes réseau selon le besoin :
      </P>
      <Table
        head={["Pilote", "Usage"]}
        rows={[
          ["bridge", "Réseau privé par défaut entre conteneurs sur une même machine"],
          ["host", "Le conteneur partage directement le réseau de la machine hôte"],
          ["overlay", "Relie des conteneurs sur plusieurs machines (Swarm)"],
          ["macvlan", "Attribue une adresse MAC propre à un conteneur sur le réseau physique"],
          ["none", "Désactive complètement la mise en réseau"],
        ]}
      />
      <P>
        Avec Compose, les services d'un même fichier partagent automatiquement
        un réseau et peuvent se joindre par leur nom de service — c'est ce qui
        permet à un service <InlineCode>app</InlineCode> de contacter un
        service <InlineCode>db</InlineCode> simplement via <InlineCode>db:5432</InlineCode>.
      </P>

      <H3>Le fichier .dockerignore</H3>
      <P>
        Comme un <InlineCode>.gitignore</InlineCode>, il exclut des fichiers
        du contexte de build sans toucher au dépôt : dépendances locales,
        fichiers de configuration sensibles, historique Git...
      </P>
      <Code>{`node_modules
.git
.env
*.md`}</Code>

      <H3>Bonnes pratiques de Dockerfile</H3>
      <Ul>
        <li>Utiliser des <strong>builds multi-stage</strong> pour ne garder dans l'image finale que ce qui est nécessaire à l'exécution.</li>
        <li>Choisir une image de base minimale et officielle (ex. <InlineCode>alpine</InlineCode>), et <strong>épingler sa version</strong> plutôt que d'utiliser <InlineCode>latest</InlineCode>.</li>
        <li>Regrouper <InlineCode>apt-get update</InlineCode> et <InlineCode>apt-get install</InlineCode> dans la même instruction <InlineCode>RUN</InlineCode> pour éviter les problèmes de cache.</li>
        <li>Ne pas installer de paquets superflus ; un conteneur = une responsabilité.</li>
        <li>Exécuter le processus en tant qu'utilisateur non-root via <InlineCode>USER</InlineCode> quand c'est possible.</li>
      </Ul>

      <H3>Scanner les vulnérabilités avec Trivy</H3>
      <P>
        Trivy est un scanner de sécurité open source qui détecte les
        vulnérabilités connues (CVE) dans les images de conteneurs, mais
        aussi les mauvaises configurations (IaC) et les secrets exposés.
      </P>
      <Code>{`trivy image my-image:latest`}</Code>
      <Note accent={DOCKER_ACCENT}>
        Scanner régulièrement ses images — et pas seulement au moment du
        build — permet de détecter les vulnérabilités découvertes après coup
        dans les dépendances déjà déployées.
      </Note>

      <SourceLink href="https://docs.docker.com/engine/storage/volumes/">
        docs.docker.com — Volumes
      </SourceLink>
      {" · "}
      <SourceLink href="https://docs.docker.com/engine/network/">
        docs.docker.com — Networking
      </SourceLink>
      {" · "}
      <SourceLink href="https://docs.docker.com/build/building/best-practices/">
        docs.docker.com — Building best practices
      </SourceLink>
      {" · "}
      <SourceLink href="https://docs.docker.com/reference/dockerfile/#dockerignore-file">
        docs.docker.com — .dockerignore
      </SourceLink>
      {" · "}
      <SourceLink href="https://trivy.dev/">trivy.dev</SourceLink>
    </div>
  );
}
