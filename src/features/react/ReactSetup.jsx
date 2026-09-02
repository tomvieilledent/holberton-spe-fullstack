import { Code, InlineCode, P, H2, H3, Ul, Note, Table, SourceLink } from "../../shared/ui/primitives.jsx";
import { REACT_ACCENT } from "../../shared/ui/tokens.js";

export default function ReactSetup() {
  return (
    <div>
      <H2 accent={REACT_ACCENT}>React — monter un projet proprement</H2>
      <P>
        Objectif : une base de projet React moderne avec Vite, Tailwind CSS,
        Lucide React, et une configuration ESLint minimale.
      </P>

      <H3>1. Créer le dépôt et cloner en local</H3>
      <Code>{`git clone https://{token}@github.com/{pseudo}/mon_projet_react.git
cd mon_projet_react`}</Code>

      <H3>2. Créer le projet Vite</H3>
      <Code>{`npm create vite@latest ./
# Framework : React
# Variant : JavaScript
# Install with npm and start now ? Non

npm install`}</Code>

      <H3>3. Configurer ESLint</H3>
      <P>
        Dans <InlineCode>eslint.config.js</InlineCode>, juste après le bloc{" "}
        <InlineCode>languageOptions</InlineCode> :
      </P>
      <Code>{`rules: {
  quotes: ["error", "double"],
  semi: ["error", "always"],
  "no-unused-vars": [
    "error",
    { varsIgnorePattern: "^[A-Z_]" },
  ],
},`}</Code>
      <Ul>
        <li><InlineCode>quotes</InlineCode> — impose les guillemets doubles.</li>
        <li><InlineCode>semi</InlineCode> — impose les points-virgules en fin d'instruction.</li>
        <li><InlineCode>no-unused-vars</InlineCode> — signale les variables inutilisées.</li>
      </Ul>
      <P>Puis dans <InlineCode>package.json</InlineCode> :</P>
      <Code>{`"scripts": {
  "dev": "vite",
  "lint": "eslint .",
  "fix": "eslint . --fix",
  "build": "vite build",
  "preview": "vite preview"
},`}</Code>
      <Table
        head={["Script", "Commande", "Description"]}
        rows={[
          ["dev", "npm run dev", "Lancer le serveur de développement"],
          ["lint", "npm run lint", "Analyser le code"],
          ["fix", "npm run fix", "Corriger automatiquement les erreurs"],
          ["build", "npm run build", "Construire le projet"],
          ["preview", "npm run preview", "Tester le build final"],
        ]}
      />

      <H3>4. Installer et configurer Tailwind CSS</H3>
      <Code>{`npm install tailwindcss @tailwindcss/vite`}</Code>
      <P>Dans <InlineCode>vite.config.js</InlineCode> :</P>
      <Code>{`import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: { host: "0.0.0.0", port: 3000 },
});`}</Code>
      <P>
        Puis remplacer le contenu de <InlineCode>src/index.css</InlineCode>{" "}
        (renommé par convention en <InlineCode>global.css</InlineCode>) par :
      </P>
      <Code>{`@import "tailwindcss";`}</Code>

      <H3>5. Nettoyer le projet de base</H3>
      <P>
        Supprimer les fichiers de démo (favicon, images d'exemple), renommer{" "}
        <InlineCode>index.css</InlineCode> en <InlineCode>global.css</InlineCode>,
        et repartir d'un <InlineCode>App.jsx</InlineCode> minimal :
      </P>
      <Code>{`function App() {
  return (
    <>
      <h1 className="text-4xl text-red-500">Mon super projet React !!!</h1>
    </>
  );
}

export default App;`}</Code>

      <H3>6. Installer Lucide React</H3>
      <Code>{`npm install lucide-react`}</Code>
      <Code>{`import { Camera } from "lucide-react";

<Camera color="red" size={48} />`}</Code>
      <Note accent={REACT_ACCENT}>
        Chaque icône est un composant à part : seules celles réellement
        importées se retrouvent dans le bundle final (tree-shaking).
      </Note>

      <SourceLink href="https://github.com/fchavonet/holbertonschool-concepts/blob/main/react/001-monter_un_projet_react_proprement_et_rapidement.md">
        Fiche Holberton — Monter un projet React
      </SourceLink>
      {" · "}
      <SourceLink href="https://vite.dev/guide/">vite.dev/guide</SourceLink>
      {" · "}
      <SourceLink href="https://tailwindcss.com/docs/installation/using-vite">
        tailwindcss.com — Installation Vite
      </SourceLink>
      {" · "}
      <SourceLink href="https://lucide.dev/guide/react/">lucide.dev — React</SourceLink>
    </div>
  );
}
