import { Code, InlineCode, P, H2, H3, Ul, Note, Table, SourceLink } from "../../shared/ui/primitives.jsx";
import { DOCKER_ACCENT } from "../../shared/ui/tokens.js";

export default function DockerDockerfile() {
  return (
    <div>
      <H2 accent={DOCKER_ACCENT}>Le Dockerfile</H2>
      <P>
        Un <InlineCode>Dockerfile</InlineCode> est un fichier texte qui
        contient toutes les commandes nécessaires pour construire une image,
        exécutées dans l'ordre. Il doit toujours commencer par une instruction{" "}
        <InlineCode>FROM</InlineCode>.
      </P>

      <H3>Instructions principales</H3>
      <Table
        head={["Instruction", "Rôle"]}
        rows={[
          ["FROM", "Choisit l'image de base"],
          ["RUN", "Exécute une commande au moment du build (nouvelle couche)"],
          ["COPY", "Copie des fichiers depuis le contexte de build"],
          ["ADD", "Comme COPY, avec extraction d'archives et support d'URL"],
          ["ENV", "Définit une variable d'environnement"],
          ["EXPOSE", "Documente le port utilisé par l'application"],
          ["WORKDIR", "Définit le répertoire de travail"],
          ["CMD", "Commande par défaut au démarrage du conteneur"],
          ["ENTRYPOINT", "Exécutable principal du conteneur"],
          ["ARG", "Variable disponible uniquement pendant le build"],
        ]}
      />

      <H3>Exemple minimal</H3>
      <Code>{`FROM node:20-alpine

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .

EXPOSE 3000
CMD ["node", "server.js"]`}</Code>

      <H3>Forme shell vs forme exec</H3>
      <P>
        <InlineCode>RUN</InlineCode>, <InlineCode>CMD</InlineCode> et{" "}
        <InlineCode>ENTRYPOINT</InlineCode> acceptent deux syntaxes :
      </P>
      <Code>{`# Forme exec (tableau JSON, pas de shell invoqué)
CMD ["node", "server.js"]

# Forme shell (chaîne classique, un shell est invoqué)
CMD node server.js`}</Code>
      <Note accent={DOCKER_ACCENT}>
        La forme exec est recommandée pour <InlineCode>ENTRYPOINT</InlineCode> :
        elle évite les problèmes d'échappement du shell et permet de combiner
        <InlineCode> ENTRYPOINT</InlineCode> avec <InlineCode>CMD</InlineCode>{" "}
        pour définir des arguments par défaut surchargeables.
      </Note>

      <H3>Cache de build</H3>
      <P>
        Chaque instruction crée une couche. Docker réutilise les couches
        inchangées d'un build à l'autre : placer les instructions qui
        changent le moins souvent (installation des dépendances) avant celles
        qui changent souvent (copie du code source) accélère les builds.
      </P>

      <SourceLink href="https://docs.docker.com/reference/dockerfile/">
        docs.docker.com — Dockerfile reference
      </SourceLink>
    </div>
  );
}
