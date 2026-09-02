import { Code, InlineCode, P, H2, H3, Ul, Note, Table, SourceLink } from "../../shared/ui/primitives.jsx";
import { VUE_ACCENT } from "../../shared/ui/tokens.js";

export default function VueSetup() {
  return (
    <div>
      <H2 accent={VUE_ACCENT}>Vue.js — le même outillage que React</H2>
      <P>
        Bonne nouvelle : Vite, Tailwind, ESLint et Lucide se configurent de
        façon quasi identique côté Vue, seul le plugin Vite change.
      </P>

      <H3>Vite pour Vue</H3>
      <Code>{`import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  plugins: [vue(), tailwindcss()],
  server: { host: "0.0.0.0", port: 3000 },
});`}</Code>

      <H3>Tailwind CSS</H3>
      <Code>{`npm install tailwindcss @tailwindcss/vite`}</Code>
      <Code>{`@import "tailwindcss";`}</Code>
      <P>
        Exactement la même démarche que pour React : installer le plugin,
        le déclarer dans <InlineCode>vite.config.js</InlineCode>, importer
        Tailwind dans la feuille de style globale.
      </P>

      <H3>ESLint</H3>
      <P>
        Même logique de configuration que côté React : un fichier{" "}
        <InlineCode>eslint.config.js</InlineCode> avec des règles explicites.
      </P>
      <Code>{`rules: {
  quotes: ["error", "double"],
  semi: ["error", "always"],
  "no-unused-vars": ["error", { varsIgnorePattern: "^[A-Z_]" }],
},`}</Code>

      <H3>Icônes avec Lucide Vue</H3>
      <Code>{`npm install @lucide/vue`}</Code>
      <Code>{`<script setup>
import { Camera } from "@lucide/vue";
</script>

<template>
  <Camera color="red" :size="48" />
</template>`}</Code>
      <Note accent={VUE_ACCENT}>
        Comme pour React, chaque icône est un composant importé
        individuellement : seules les icônes utilisées sont incluses dans le bundle.
      </Note>

      <SourceLink href="https://vite.dev/guide/">vite.dev/guide</SourceLink>
      {" · "}
      <SourceLink href="https://tailwindcss.com/docs/installation/using-vite">
        tailwindcss.com — Installation Vite
      </SourceLink>
      {" · "}
      <SourceLink href="https://lucide.dev/guide/vue/">lucide.dev — Vue</SourceLink>
      {" · "}
      <SourceLink href="https://eslint.org/docs/latest/use/getting-started">
        eslint.org — Getting Started
      </SourceLink>
    </div>
  );
}
