import { Code, InlineCode, P, H2, H3, Ul, Note, Table, SourceLink } from "../../shared/ui/primitives.jsx";
import { VUE_ACCENT } from "../../shared/ui/tokens.js";

export default function VueBasics() {
  return (
    <div>
      <H2 accent={VUE_ACCENT}>Vue.js — les bases</H2>
      <P>
        Toute application Vue démarre par la création d'une{" "}
        <strong>instance d'application</strong> avec <InlineCode>createApp</InlineCode>.
      </P>
      <Code>{`import { createApp } from "vue";
import App from "./App.vue";

const app = createApp(App);`}</Code>
      <P>
        L'objet passé à <InlineCode>createApp</InlineCode> est en réalité un
        composant : le <strong>composant racine</strong>, qui peut contenir
        d'autres composants comme enfants.
      </P>
      <Code>{`App (composant racine)
├─ TodoList
│  └─ TodoItem
└─ TodoFooter`}</Code>

      <H3>Monter l'application</H3>
      <P>
        Une instance ne rend rien tant que <InlineCode>.mount()</InlineCode>{" "}
        n'a pas été appelée, avec un sélecteur ciblant un conteneur du DOM.
      </P>
      <Code>{`<div id="app"></div>`}</Code>
      <Code>{`app.mount("#app");`}</Code>
      <Note accent={VUE_ACCENT}>
        <InlineCode>.mount()</InlineCode> doit toujours être appelée après
        toutes les configurations de l'application.
      </Note>

      <H3>Créer un projet Vue avec Vite</H3>
      <Code>{`npm create vue@latest
cd <nom-du-projet>
npm install
npm run dev`}</Code>
      <P>
        L'outil <InlineCode>create-vue</InlineCode> propose des options
        (TypeScript, Vue Router, Pinia, ESLint, Prettier...). En cas de
        doute, répondre « No » suffit pour démarrer simple.
      </P>
      <Note accent={VUE_ACCENT}>
        Les composants générés utilisent par défaut la Composition API avec{" "}
        <InlineCode>{"<script setup>"}</InlineCode>, plutôt que l'Options API.
      </Note>

      <H3>Plusieurs instances sur une même page</H3>
      <P>
        Rien n'empêche de faire coexister plusieurs applications Vue sur la
        même page, chacune avec sa propre configuration :
      </P>
      <Code>{`const app1 = createApp({ /* ... */ });
app1.mount("#container-1");

const app2 = createApp({ /* ... */ });
app2.mount("#container-2");`}</Code>

      <SourceLink href="https://vuejs.org/guide/quick-start.html">
        vuejs.org — Quick Start
      </SourceLink>
      {" · "}
      <SourceLink href="https://vuejs.org/guide/essentials/application.html">
        vuejs.org — Creating an Application
      </SourceLink>
      {" · "}
      <SourceLink href="https://grafikart.fr/formations/vuejs">
        Grafikart — Formation Vue.js
      </SourceLink>
    </div>
  );
}
