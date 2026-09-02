import { Code, InlineCode, P, H2, H3, Ul, Note, Table, SourceLink } from "../../shared/ui/primitives.jsx";
import { VUE_ACCENT } from "../../shared/ui/tokens.js";

export default function VueDeploy() {
  return (
    <div>
      <H2 accent={VUE_ACCENT}>Vue.js — déployer sur GitHub Pages</H2>
      <P>
        La méthode est identique à celle utilisée pour React : le principe
        « build Vite + branche gh-pages » ne dépend pas du framework.
      </P>

      <H3>Chemin de base relatif</H3>
      <Code>{`export default defineConfig({
  base: "./",
  plugins: [vue(), tailwindcss()],
});`}</Code>

      <H3>Script de déploiement</H3>
      <Code>{`npm install gh-pages --save-dev`}</Code>
      <Code>{`"scripts": {
  "dev": "vite",
  "build": "vite build",
  "preview": "vite preview",
  "deploy": "npm run build && gh-pages -d dist"
}`}</Code>
      <Code>{`npm run deploy`}</Code>
      <P>
        Puis, comme pour React :{" "}
        <InlineCode>Settings → Pages → Deploy from a branch</InlineCode> sur
        la branche <InlineCode>gh-pages</InlineCode>, dossier{" "}
        <InlineCode>/(root)</InlineCode>.
      </P>
      <Note accent={VUE_ACCENT}>
        Retenir le principe plutôt que la syntaxe exacte : build → chemins
        relatifs → package de déploiement → branche dédiée → activation dans
        les réglages du dépôt. Ce schéma se retrouve avec n'importe quel outil basé sur Vite.
      </Note>

      <SourceLink href="https://docs.github.com/en/pages">docs.github.com/en/pages</SourceLink>
      {" · "}
      <SourceLink href="https://github.com/fchavonet/holbertonschool-concepts/blob/main/react/002-deployer_une_application_vite-react_sur_github_pages.md">
        Fiche Holberton — principe transposable à Vue
      </SourceLink>
    </div>
  );
}
