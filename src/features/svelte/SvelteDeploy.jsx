import { Code, InlineCode, P, H2, H3, Ul, Note, Table, SourceLink } from "../../shared/ui/primitives.jsx";
import { SVELTE_ACCENT } from "../../shared/ui/tokens.js";

export default function SvelteDeploy() {
  return (
    <div>
      <H2 accent={SVELTE_ACCENT}>Svelte — déployer sur GitHub Pages</H2>
      <P>
        Le principe reste le même que pour React et Vue : générer un build
        statique puis le publier sur une branche dédiée. Deux cas de figure
        selon la façon dont le projet a été monté.
      </P>

      <H3>Projet Vite seul (sans SvelteKit)</H3>
      <P>
        C'est le cas le plus proche de React/Vue : un chemin de base
        relatif, puis <InlineCode>gh-pages</InlineCode>.
      </P>
      <Code>{`export default defineConfig({
  base: "./",
  plugins: [svelte(), tailwindcss()],
});`}</Code>
      <Code>{`npm install gh-pages --save-dev`}</Code>
      <Code>{`"scripts": {
  "build": "vite build",
  "deploy": "npm run build && gh-pages -d dist"
}`}</Code>
      <Code>{`npm run deploy`}</Code>

      <H3>Projet SvelteKit</H3>
      <P>
        SvelteKit ayant besoin d'un adaptateur pour générer un site
        statique, on utilise <InlineCode>@sveltejs/adapter-static</InlineCode>{" "}
        plutôt que l'adaptateur par défaut, puis on publie le dossier de
        sortie avec le même principe de branche <InlineCode>gh-pages</InlineCode>.
      </P>
      <Note accent={SVELTE_ACCENT}>
        Retenir le schéma général plutôt que la commande exacte : build →
        chemins relatifs → dossier statique → branche dédiée → activation
        dans <InlineCode>Settings → Pages</InlineCode> du dépôt. C'est le même
        schéma quel que soit l'outil basé sur Vite.
      </Note>

      <SourceLink href="https://docs.github.com/en/pages">docs.github.com/en/pages</SourceLink>
      {" · "}
      <SourceLink href="https://vite.dev/guide/">vite.dev/guide</SourceLink>
    </div>
  );
}
