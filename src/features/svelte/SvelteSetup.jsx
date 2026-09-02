import { Code, InlineCode, P, H2, H3, Ul, Note, Table, SourceLink } from "../../shared/ui/primitives.jsx";
import { SVELTE_ACCENT } from "../../shared/ui/tokens.js";

export default function SvelteSetup() {
  return (
    <div>
      <H2 accent={SVELTE_ACCENT}>Svelte — monter un projet</H2>
      <P>
        Svelte se démarre soit avec SvelteKit (le framework applicatif
        officiel, propulsé par Vite), soit directement avec Vite pour une
        simple application front.
      </P>

      <H3>Option recommandée : SvelteKit</H3>
      <Code>{`npx sv create myapp
cd myapp
npm install
npm run dev`}</Code>

      <H3>Option légère : Vite seul</H3>
      <P>
        Pour un projet plus simple (une SPA sans besoin de rendu serveur),
        on peut passer par la même commande que pour React ou Vue :
      </P>
      <Code>{`npm create vite@latest
# sélectionner l'option "svelte"

npm install
npm run dev
# npm run build → génère HTML/JS/CSS dans dist/`}</Code>
      <Note accent={SVELTE_ACCENT}>
        Avec Vite seul, il faudra choisir une librairie de routing à part si
        l'application a plusieurs pages — SvelteKit gère ça nativement.
      </Note>

      <H3>Tailwind CSS</H3>
      <Code>{`npm install tailwindcss @tailwindcss/vite`}</Code>
      <Code>{`import { defineConfig } from "vite";
import { sveltekit } from "@sveltejs/kit/vite"; // ou svelte() si Vite seul
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  plugins: [sveltekit(), tailwindcss()],
});`}</Code>
      <Code>{`@import "tailwindcss";`}</Code>

      <H3>ESLint</H3>
      <P>
        Même configuration de base que pour React ou Vue, dans{" "}
        <InlineCode>eslint.config.js</InlineCode> :
      </P>
      <Code>{`rules: {
  quotes: ["error", "double"],
  semi: ["error", "always"],
  "no-unused-vars": ["error", { varsIgnorePattern: "^[A-Z_]" }],
},`}</Code>

      <H3>Icônes avec Lucide Svelte</H3>
      <Code>{`npm install @lucide/svelte`}</Code>
      <Code>{`<script>
  import { Camera } from "@lucide/svelte";
</script>

<Camera color="red" size={48} />`}</Code>

      <SourceLink href="https://svelte.dev/docs/svelte/getting-started">
        svelte.dev — Getting started
      </SourceLink>
      {" · "}
      <SourceLink href="https://lucide.dev/guide/svelte/">lucide.dev — Svelte</SourceLink>
      {" · "}
      <SourceLink href="https://eslint.org/docs/latest/">eslint.org/docs/latest</SourceLink>
    </div>
  );
}
