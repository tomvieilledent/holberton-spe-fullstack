import { Code, InlineCode, P, H2, H3, Ul, Note, Table, SourceLink } from "../../shared/ui/primitives.jsx";
import { DOCKER_ACCENT } from "../../shared/ui/tokens.js";

export default function DockerBasics() {
  return (
    <div>
      <H2 accent={DOCKER_ACCENT}>Docker — les bases</H2>
      <P>
        Docker est une plateforme qui permet d'empaqueter et d'exécuter une
        application dans un environnement isolé appelé <strong>conteneur</strong>.
        L'isolation permet de faire tourner plusieurs conteneurs sur une même
        machine, chacun avec tout ce dont il a besoin pour fonctionner — sans
        dépendre de ce qui est installé sur la machine hôte.
      </P>

      <H3>Architecture client/serveur</H3>
      <P>
        Docker fonctionne en client/serveur : le <strong>client Docker</strong>{" "}
        (la commande <InlineCode>docker</InlineCode>) parle au{" "}
        <strong>démon Docker</strong> (<InlineCode>dockerd</InlineCode>), qui
        s'occupe de construire, faire tourner et distribuer les conteneurs.
      </P>
      <Ul>
        <li><strong>Image</strong> — un modèle en lecture seule contenant les instructions pour créer un conteneur.</li>
        <li><strong>Conteneur</strong> — une instance exécutable d'une image.</li>
        <li><strong>Registre</strong> (ex. Docker Hub) — l'endroit où sont stockées et partagées les images.</li>
      </Ul>

      <H3>Premier conteneur</H3>
      <Code>{`docker run -i -t ubuntu /bin/bash`}</Code>
      <P>Cette commande, dans l'ordre :</P>
      <Ul>
        <li>Télécharge l'image <InlineCode>ubuntu</InlineCode> si elle n'est pas déjà en local (comme <InlineCode>docker pull</InlineCode>).</li>
        <li>Crée un nouveau conteneur à partir de cette image.</li>
        <li>Alloue un système de fichiers en lecture-écriture au conteneur.</li>
        <li>Crée une interface réseau et démarre le conteneur en exécutant <InlineCode>/bin/bash</InlineCode>.</li>
      </Ul>
      <Note accent={DOCKER_ACCENT}>
        Bonne pratique : un conteneur ne devrait faire qu'une seule chose et
        bien la faire, plutôt que de tout empaqueter dans un seul conteneur
        monolithique.
      </Note>

      <SourceLink href="https://docs.docker.com/get-started/docker-overview/">
        docs.docker.com — What is Docker?
      </SourceLink>
      {" · "}
      <SourceLink href="https://docs.docker.com/get-started/">
        docs.docker.com — Get started
      </SourceLink>
      {" · "}
      <SourceLink href="https://docs.docker.com/reference/cli/docker/">
        docs.docker.com — CLI reference
      </SourceLink>
    </div>
  );
}
