import { Code, InlineCode, P, H2, H3, Ul, Note, Table, SourceLink } from "../../shared/ui/primitives.jsx";
import { CI_ACCENT } from "../../shared/ui/tokens.js";
import { Container, Workflow } from "lucide-react";

export default function CIPublishDocker() {
  return (
    <div>
      <H2 accent={CI_ACCENT}>Publier une image Docker depuis un workflow</H2>
      <P>
        L'idée : construire une image à partir du <InlineCode>Dockerfile</InlineCode>{" "}
        du dépôt, puis la publier sur un registre — ici le{" "}
        <strong>GitHub Container Registry</strong> (<InlineCode>ghcr.io</InlineCode>),
        intégré à GitHub Packages.
      </P>

      <H3>Les trois actions clés</H3>
      <Ul>
        <li><InlineCode>docker/login-action</InlineCode> — authentifie le workflow auprès du registre.</li>
        <li><InlineCode>docker/metadata-action</InlineCode> — génère automatiquement les tags et labels de l'image (branche, PR, version...).</li>
        <li><InlineCode>docker/build-push-action</InlineCode> — construit l'image et la pousse si le build réussit.</li>
      </Ul>

      <H3>Workflow complet vers GHCR</H3>
      <Code>{`name: Create and publish a Docker image

on:
  push:
    branches: ['release']

env:
  REGISTRY: ghcr.io
  IMAGE_NAME: \${{ github.repository }}

jobs:
  build-and-push-image:
    runs-on: ubuntu-latest
    permissions:
      contents: read
      packages: write

    steps:
      - name: Checkout repository
        uses: actions/checkout@v6

      - name: Log in to the Container registry
        uses: docker/login-action@v3
        with:
          registry: \${{ env.REGISTRY }}
          username: \${{ github.actor }}
          password: \${{ secrets.GITHUB_TOKEN }}

      - name: Extract metadata (tags, labels) for Docker
        id: meta
        uses: docker/metadata-action@v5
        with:
          images: \${{ env.REGISTRY }}/\${{ env.IMAGE_NAME }}

      - name: Build and push Docker image
        uses: docker/build-push-action@v6
        with:
          context: .
          push: true
          tags: \${{ steps.meta.outputs.tags }}
          labels: \${{ steps.meta.outputs.labels }}`}</Code>
      <Note accent={CI_ACCENT}>
        Pour <InlineCode>ghcr.io</InlineCode>, le mot de passe est simplement
        le <InlineCode>GITHUB_TOKEN</InlineCode> généré automatiquement — pas
        besoin de créer un identifiant séparé, contrairement à Docker Hub qui
        demande des secrets dédiés.
      </Note>

      <H3>Ce que fait chaque étape</H3>
      <Ul>
        <li><InlineCode>checkout</InlineCode> récupère le code du dépôt sur le runner.</li>
        <li><InlineCode>login-action</InlineCode> authentifie le futur push sur <InlineCode>ghcr.io</InlineCode>.</li>
        <li><InlineCode>metadata-action</InlineCode> calcule les tags (ex. <InlineCode>latest</InlineCode>, nom de branche) à partir du contexte du déclencheur.</li>
        <li><InlineCode>build-push-action</InlineCode> construit l'image depuis le <InlineCode>Dockerfile</InlineCode> à la racine et la pousse avec les tags calculés.</li>
      </Ul>

      <P>
        Le même principe fonctionne vers Docker Hub, en remplaçant l'étape de
        connexion et les identifiants — ou vers les deux registres à la fois
        en dupliquant les étapes <InlineCode>login-action</InlineCode> et en
        listant plusieurs images dans <InlineCode>metadata-action</InlineCode>.
      </P>

      <SourceLink href="https://docs.github.com/en/actions/tutorials/publish-packages/publish-docker-images">
        docs.github.com — Publishing Docker images
      </SourceLink>
      {" · "}
      <SourceLink href="https://docs.github.com/en/packages/working-with-a-github-packages-registry/working-with-the-container-registry">
        docs.github.com — Container registry
      </SourceLink>
      {" · "}
      <SourceLink href="https://github.com/docker/build-push-action">
        github.com — docker/build-push-action
      </SourceLink>
      {" · "}
      <SourceLink href="https://github.com/docker/metadata-action">
        github.com — docker/metadata-action
      </SourceLink>
    </div>
  );
}
