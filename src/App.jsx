import { useState } from "react";
import {
  Component,
  Boxes,
  Rocket,
  Wrench,
  UploadCloud,
  BookOpen,
  Leaf,
  Terminal,
  ShieldCheck,
  Sparkles,
  ChevronRight,
  Menu,
  X,
  ExternalLink,
  Flame,
  Container,
  GitBranch,
  PlayCircle,
  Lock,
  Network,
  HardDrive,
  Database,
  Layers,
  Workflow,
  Table2,
  KeyRound,
  Share2,
  FileJson,
  ListChecks,
  ClipboardCheck,
  ScrollText,
  Building2,
  GitPullRequest,
  FileCode,
} from "lucide-react";

/* ---------------------------------------------------------------------- */
/* Design tokens                                                          */
/* ---------------------------------------------------------------------- */
const INK = "#12141A";
const PANEL = "#1A1D25";
const LINE = "#2A2E38";
const TEXT = "#E8E6E1";
const MUTED = "#9098A8";
const REACT_ACCENT = "#4FD1E8";
const VUE_ACCENT = "#6EE7B7";
const SVELTE_ACCENT = "#FF6B4A";
const TOOL_ACCENT = "#F0B429";
const DOCKER_ACCENT = "#4C8BF5";
const DEVOPS_ACCENT = "#C4A2FF";
const CI_ACCENT = "#7EE0C3";
const MERISE_ACCENT = "#F0A6CA";
const ARCH_ACCENT = "#9DB4FF";
const UML_ACCENT = "#F2A65A";
const API_ACCENT = "#5EC8C8";
const SPEC_ACCENT = "#9BD17C";
const URBA_ACCENT = "#D9A5E8";

const FONT_DISPLAY = '"Iowan Old Style", Georgia, "Times New Roman", serif';
const FONT_BODY =
  '-apple-system, BlinkMacSystemFont, "Segoe UI", "IBM Plex Sans", sans-serif';
const FONT_MONO =
  'ui-monospace, SFMono-Regular, Menlo, Consolas, "Liberation Mono", monospace';

/* ---------------------------------------------------------------------- */
/* Small building blocks                                                  */
/* ---------------------------------------------------------------------- */

function Code({ children }) {
  return (
    <pre
      style={{
        background: "#0E1015",
        border: `1px solid ${LINE}`,
        borderRadius: 8,
        padding: "14px 16px",
        overflowX: "auto",
        fontFamily: FONT_MONO,
        fontSize: 13.5,
        lineHeight: 1.6,
        color: "#D8DEE9",
        margin: "14px 0",
      }}
    >
      <code>{children}</code>
    </pre>
  );
}

function InlineCode({ children }) {
  return (
    <code
      style={{
        fontFamily: FONT_MONO,
        fontSize: "0.88em",
        background: "#0E1015",
        border: `1px solid ${LINE}`,
        borderRadius: 4,
        padding: "1px 6px",
        color: "#D8DEE9",
      }}
    >
      {children}
    </code>
  );
}

function P({ children }) {
  return (
    <p style={{ color: TEXT, lineHeight: 1.7, fontSize: 15.5, margin: "10px 0" }}>
      {children}
    </p>
  );
}

function H2({ accent, children }) {
  return (
    <h2
      style={{
        fontFamily: FONT_DISPLAY,
        fontSize: 28,
        fontWeight: 600,
        color: TEXT,
        marginTop: 34,
        marginBottom: 10,
        paddingBottom: 10,
        borderBottom: `1px solid ${LINE}`,
        display: "flex",
        alignItems: "baseline",
        gap: 10,
      }}
    >
      <span style={{ width: 6, height: 6, borderRadius: 99, background: accent, display: "inline-block", transform: "translateY(-3px)" }} />
      {children}
    </h2>
  );
}

function H3({ children }) {
  return (
    <h3
      style={{
        fontFamily: FONT_BODY,
        fontSize: 17,
        fontWeight: 700,
        color: TEXT,
        marginTop: 26,
        marginBottom: 8,
      }}
    >
      {children}
    </h3>
  );
}

function Ul({ children }) {
  return (
    <ul style={{ color: TEXT, lineHeight: 1.7, fontSize: 15.5, paddingLeft: 20, margin: "10px 0" }}>
      {children}
    </ul>
  );
}

function Note({ accent, children }) {
  return (
    <div
      style={{
        borderLeft: `3px solid ${accent}`,
        background: "rgba(255,255,255,0.03)",
        padding: "10px 14px",
        borderRadius: "0 8px 8px 0",
        color: MUTED,
        fontSize: 14,
        margin: "14px 0",
        lineHeight: 1.6,
      }}
    >
      {children}
    </div>
  );
}

function Table({ head, rows }) {
  return (
    <div style={{ overflowX: "auto", margin: "14px 0" }}>
      <table style={{ borderCollapse: "collapse", width: "100%", fontSize: 14 }}>
        <thead>
          <tr>
            {head.map((h) => (
              <th
                key={h}
                style={{
                  textAlign: "left",
                  color: MUTED,
                  fontWeight: 600,
                  borderBottom: `1px solid ${LINE}`,
                  padding: "8px 10px",
                }}
              >
                {h}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((r, i) => (
            <tr key={i}>
              {r.map((c, j) => (
                <td
                  key={j}
                  style={{
                    borderBottom: `1px solid ${LINE}`,
                    padding: "8px 10px",
                    color: TEXT,
                    fontFamily: j === 0 ? FONT_MONO : FONT_BODY,
                  }}
                >
                  {c}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function SourceLink({ href, children }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer"
      style={{
        color: MUTED,
        fontSize: 13,
        display: "inline-flex",
        alignItems: "center",
        gap: 4,
        textDecoration: "none",
        borderBottom: `1px dotted ${LINE}`,
      }}
    >
      {children} <ExternalLink size={12} />
    </a>
  );
}

/* ---------------------------------------------------------------------- */
/* Content sections                                                        */
/* ---------------------------------------------------------------------- */

function Overview() {
  return (
    <div>
      <p style={{ fontFamily: FONT_DISPLAY, fontSize: 34, color: TEXT, marginBottom: 6 }}>
        Récap de la semaine
      </p>
      <p style={{ color: MUTED, fontSize: 16, marginBottom: 28, maxWidth: 640, lineHeight: 1.6 }}>
        Trois frameworks, un même outillage — puis un passage côté
        infrastructure, méthode, automatisation et conception de données.
        Cette semaine a couvert la mise en place d'un projet front moderne
        (React, Vue, Svelte) avec les mêmes briques (Vite, Tailwind, ESLint,
        Lucide, GitHub Pages), avant d'aborder Docker pour empaqueter une
        application, les pratiques DevOps / Git qui structurent le travail en
        équipe, GitHub Actions pour automatiser tests, builds et publication
        d'images, et enfin la méthode Merise pour concevoir une base de
        données avant d'écrire la moindre ligne de SQL.
      </p>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 16, marginBottom: 28 }}>
        <div style={{ border: `1px solid ${LINE}`, borderRadius: 12, padding: 20, background: PANEL }}>
          <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 8 }}>
            <Component size={18} color={REACT_ACCENT} />
            <span style={{ fontFamily: FONT_BODY, fontWeight: 700, color: TEXT }}>React</span>
          </div>
          <p style={{ color: MUTED, fontSize: 14, lineHeight: 1.6, margin: 0 }}>
            Composants, JSX, props/state, hooks. Puis mise en place propre d'un
            projet Vite + Tailwind + ESLint + Lucide, et déploiement sur GitHub Pages.
          </p>
        </div>
        <div style={{ border: `1px solid ${LINE}`, borderRadius: 12, padding: 20, background: PANEL }}>
          <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 8 }}>
            <Leaf size={18} color={VUE_ACCENT} />
            <span style={{ fontFamily: FONT_BODY, fontWeight: 700, color: TEXT }}>Vue.js</span>
          </div>
          <p style={{ color: MUTED, fontSize: 14, lineHeight: 1.6, margin: 0 }}>
            Instance d'application, composant racine, montage dans le DOM.
            Le même outillage (Vite, Tailwind, ESLint, Lucide) transposé côté Vue.
          </p>
        </div>
        <div style={{ border: `1px solid ${LINE}`, borderRadius: 12, padding: 20, background: PANEL }}>
          <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 8 }}>
            <Flame size={18} color={SVELTE_ACCENT} />
            <span style={{ fontFamily: FONT_BODY, fontWeight: 700, color: TEXT }}>Svelte</span>
          </div>
          <p style={{ color: MUTED, fontSize: 14, lineHeight: 1.6, margin: 0 }}>
            Un compilateur plutôt qu'une librairie à l'exécution : runes{" "}
            <InlineCode>{"$state"}</InlineCode>/<InlineCode>{"$props"}</InlineCode>,
            fichiers <InlineCode>.svelte</InlineCode>, même outillage Vite.
          </p>
        </div>
      </div>

      <H3>Le fil conducteur de la semaine</H3>
      <Ul>
        <li>Comprendre le modèle par composants (commun aux trois frameworks).</li>
        <li>Savoir démarrer un projet avec Vite, quel que soit le framework.</li>
        <li>Styliser avec Tailwind CSS via le plugin Vite officiel.</li>
        <li>Garder un code propre grâce à ESLint (guillemets, points-virgules, variables inutilisées).</li>
        <li>Ajouter des icônes cohérentes avec Lucide.</li>
        <li>Publier son travail sur GitHub Pages avec un chemin de base relatif.</li>
      </Ul>
      <Note accent={TOOL_ACCENT}>
        Astuce de révision : la partie « Outillage » est quasi identique entre
        React, Vue et Svelte. Une fois comprise d'un côté, elle se retranspose
        presque telle quelle ailleurs — seul le plugin Vite du framework change.
      </Note>
    </div>
  );
}

/* ----------------------------- REACT ----------------------------------- */

function ReactBasics() {
  return (
    <div>
      <H2 accent={REACT_ACCENT}>React — les bases</H2>
      <P>
        Une application React est construite à partir de <strong>composants</strong> :
        des fonctions JavaScript qui retournent du balisage (JSX). Un composant peut être
        aussi petit qu'un bouton, ou aussi grand qu'une page entière.
      </P>
      <Code>{`function MyButton() {
  return <button>Je suis un bouton</button>;
}

export default function MyApp() {
  return (
    <div>
      <h1>Bienvenue</h1>
      <MyButton />
    </div>
  );
}`}</Code>
      <Note accent={REACT_ACCENT}>
        Un composant React commence toujours par une majuscule — c'est ce qui le
        distingue d'une balise HTML classique.
      </Note>

      <H3>JSX</H3>
      <P>
        JSX est plus strict que le HTML : les balises doivent toutes être fermées
        (<InlineCode>{"<br />"}</InlineCode>), et un composant ne peut retourner
        qu'un seul élément racine (on utilise un <InlineCode>{"<div>"}</InlineCode> ou
        un fragment <InlineCode>{"<>...</>"}</InlineCode> pour regrouper plusieurs éléments).
      </P>

      <H3>Afficher des données</H3>
      <P>
        Les accolades <InlineCode>{"{ }"}</InlineCode> permettent d'« échapper » vers
        du JavaScript à l'intérieur du JSX.
      </P>
      <Code>{`const user = { name: "Ada", imageUrl: "ada.jpg" };

export default function Profile() {
  return (
    <>
      <h1>{user.name}</h1>
      <img src={user.imageUrl} alt={"Photo de " + user.name} />
    </>
  );
}`}</Code>

      <H3>Rendu conditionnel</H3>
      <P>Pas de syntaxe spéciale : on réutilise les outils JavaScript classiques.</P>
      <Code>{`<div>
  {isLoggedIn ? <AdminPanel /> : <LoginForm />}
</div>

// Version courte sans "else"
<div>
  {isLoggedIn && <AdminPanel />}
</div>`}</Code>

      <H3>Listes</H3>
      <P>
        On utilise <InlineCode>map()</InlineCode> pour transformer un tableau de
        données en tableau d'éléments JSX. Chaque élément a besoin d'une prop{" "}
        <InlineCode>key</InlineCode> unique.
      </P>
      <Code>{`const products = [
  { id: 1, title: "Chou" },
  { id: 2, title: "Ail" },
];

const items = products.map((p) => <li key={p.id}>{p.title}</li>);

return <ul>{items}</ul>;`}</Code>

      <H3>Événements et état (useState)</H3>
      <P>
        Un composant « se souvient » d'une information grâce à l'état, avec le
        Hook <InlineCode>useState</InlineCode>.
      </P>
      <Code>{`import { useState } from "react";

function MyButton() {
  const [count, setCount] = useState(0);

  function handleClick() {
    setCount(count + 1);
  }

  return <button onClick={handleClick}>Cliqué {count} fois</button>;
}`}</Code>
      <Note accent={REACT_ACCENT}>
        Les Hooks (fonctions commençant par <InlineCode>use</InlineCode>) ne
        s'appellent qu'au niveau supérieur d'un composant — jamais dans une
        condition ou une boucle.
      </Note>

      <H3>Partager des données entre composants (lifting state up)</H3>
      <P>
        Pour que plusieurs composants partagent et mettent à jour la même
        donnée, on remonte l'état vers leur parent commun, puis on le
        redescend via des <strong>props</strong>.
      </P>
      <Code>{`function MyApp() {
  const [count, setCount] = useState(0);
  const handleClick = () => setCount(count + 1);

  return (
    <div>
      <MyButton count={count} onClick={handleClick} />
      <MyButton count={count} onClick={handleClick} />
    </div>
  );
}

function MyButton({ count, onClick }) {
  return <button onClick={onClick}>Cliqué {count} fois</button>;
}`}</Code>

      <SourceLink href="https://react.dev/learn">react.dev/learn</SourceLink>
      {" · "}
      <SourceLink href="https://nextjs.org/learn/react-foundations">
        nextjs.org — React Foundations
      </SourceLink>
    </div>
  );
}

function ReactSetup() {
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

function ReactDeploy() {
  return (
    <div>
      <H2 accent={REACT_ACCENT}>React — déployer sur GitHub Pages</H2>
      <P>Suite directe de la mise en place du projet. Prérequis : le build doit fonctionner sans erreur.</P>
      <Code>{`npm run build`}</Code>

      <H3>Configurer le chemin de base</H3>
      <P>
        Par défaut, Vite génère des chemins absolus en supposant que le site
        est à la racine d'un domaine. GitHub Pages publie dans un
        sous-dossier : il faut donc des chemins relatifs.
      </P>
      <Code>{`export default defineConfig({
  base: "./",
  plugins: [react(), tailwindcss()],
  server: { host: "0.0.0.0", port: 3000 },
});`}</Code>
      <Note accent={REACT_ACCENT}>
        Redémarrer le serveur de développement après toute modification de{" "}
        <InlineCode>vite.config.js</InlineCode>.
      </Note>

      <H3>Installer et scripter gh-pages</H3>
      <Code>{`npm install gh-pages --save-dev`}</Code>
      <Code>{`"scripts": {
  "dev": "vite",
  "lint": "eslint .",
  "fix": "eslint . --fix",
  "build": "vite build",
  "preview": "vite preview",
  "deploy": "npm run build && gh-pages -d dist"
}`}</Code>
      <Code>{`npm run deploy`}</Code>
      <P>
        Cette commande enchaîne trois choses : le build de production dans{" "}
        <InlineCode>dist/</InlineCode>, la création/mise à jour de la branche{" "}
        <InlineCode>gh-pages</InlineCode>, et sa publication.
      </P>

      <H3>Activer GitHub Pages</H3>
      <P>
        Sur le dépôt GitHub : <InlineCode>Settings → Pages → Deploy from a branch</InlineCode>,
        branche <InlineCode>gh-pages</InlineCode>, dossier <InlineCode>/(root)</InlineCode>.
      </P>
      <P>
        Le site sera accessible sous la forme{" "}
        <InlineCode>https://pseudo.github.io/nom-du-repo/</InlineCode>.
      </P>

      <H3>Mettre à jour le site</H3>
      <Code>{`git add .
git commit -m "Update project."
git push
npm run deploy`}</Code>

      <H3>Problèmes fréquents</H3>
      <Ul>
        <li><strong>Page blanche</strong> → vérifier <InlineCode>base: "./"</InlineCode> puis redéployer.</li>
        <li><strong>Images absentes</strong> → les fichiers dans <InlineCode>public/</InlineCode> se réfèrent avec un chemin depuis la racine, ex. <InlineCode>{"<img src=\"/image.png\" />"}</InlineCode>.</li>
        <li><strong>Ancienne version affichée</strong> → vider le cache navigateur (<InlineCode>Ctrl/Cmd + Shift + R</InlineCode>) ou patienter le temps de la propagation.</li>
        <li><strong>Commande deploy introuvable</strong> → vérifier le script dans <InlineCode>package.json</InlineCode> puis relancer <InlineCode>npm install</InlineCode>.</li>
      </Ul>

      <SourceLink href="https://github.com/fchavonet/holbertonschool-concepts/blob/main/react/002-deployer_une_application_vite-react_sur_github_pages.md">
        Fiche Holberton — Déployer sur GitHub Pages
      </SourceLink>
      {" · "}
      <SourceLink href="https://docs.github.com/en/pages">docs.github.com/en/pages</SourceLink>
    </div>
  );
}

/* ------------------------------- VUE ------------------------------------ */

function VueBasics() {
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

function VueSetup() {
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

function VueDeploy() {
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

/* ------------------------------ SVELTE ---------------------------------- */

function SvelteBasics() {
  return (
    <div>
      <H2 accent={SVELTE_ACCENT}>Svelte — les bases</H2>
      <P>
        Svelte est un <strong>compilateur</strong>, pas une librairie
        exécutée dans le navigateur. Les composants, écrits en HTML, CSS et
        JavaScript, sont transformés à la compilation en JavaScript optimisé
        — il n'y a pas de « virtual DOM » à faire tourner en production.
      </P>
      <Code>{`<script>
  function greet() {
    alert("Bienvenue sur Svelte !");
  }
</script>

<button onclick={greet}>clique-moi</button>

<style>
  button {
    font-size: 2em;
  }
</style>`}</Code>
      <Note accent={SVELTE_ACCENT}>
        Un fichier <InlineCode>.svelte</InlineCode> regroupe balisage, style
        et logique au même endroit — un peu comme un composant Vue en Single
        File Component.
      </Note>

      <H3>Les runes</H3>
      <P>
        Depuis Svelte 5, la réactivité passe par des <strong>runes</strong> :
        des symboles préfixés par <InlineCode>$</InlineCode> qui font partie
        du langage (pas besoin de les importer). Elles ne sont valables qu'à
        certains endroits précis du code, comme des mots-clés.
      </P>

      <H3>$state — déclarer de l'état réactif</H3>
      <Code>{`<script>
  let count = $state(0);
</script>

<button onclick={() => count++}>
  clics : {count}
</button>`}</Code>
      <P>
        Contrairement à d'autres frameworks, il n'y a pas d'API spéciale
        pour manipuler l'état : <InlineCode>count</InlineCode> reste un
        simple nombre, qu'on met à jour comme n'importe quelle variable.
      </P>
      <Note accent={SVELTE_ACCENT}>
        Utilisé sur un tableau ou un objet, <InlineCode>$state</InlineCode>{" "}
        crée un proxy profondément réactif : modifier une propriété interne
        (ex. <InlineCode>todos[0].done = true</InlineCode>) suffit à
        déclencher la mise à jour de l'interface.
      </Note>

      <H3>$props — recevoir les props d'un composant</H3>
      <Code>{`<!-- MyComponent.svelte -->
<script>
  let { adjective } = $props();
</script>

<p>ce composant est {adjective}</p>`}</Code>
      <P>
        On déstructure généralement <InlineCode>$props()</InlineCode>{" "}
        directement, avec des valeurs par défaut si besoin :
      </P>
      <Code>{`let { adjective = "sympa" } = $props();`}</Code>
      <Note accent={SVELTE_ACCENT}>
        Ne pas muter un objet reçu en prop directement (sauf s'il est
        déclaré <InlineCode>$bindable</InlineCode>) : ce n'est pas le rôle du
        composant enfant de modifier une donnée qui ne lui appartient pas.
      </Note>

      <SourceLink href="https://svelte.dev/docs/svelte/overview">
        svelte.dev — Overview
      </SourceLink>
      {" · "}
      <SourceLink href="https://svelte.dev/docs/svelte/what-are-runes">
        svelte.dev — What are runes?
      </SourceLink>
      {" · "}
      <SourceLink href="https://svelte.dev/tutorial/svelte/welcome-to-svelte">
        svelte.dev — Tutoriel interactif
      </SourceLink>
    </div>
  );
}

function SvelteSetup() {
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

function SvelteDeploy() {
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

/* ------------------------------ DOCKER ----------------------------------- */

function DockerBasics() {
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

function DockerDockerfile() {
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

function DockerCompose() {
  return (
    <div>
      <H2 accent={DOCKER_ACCENT}>Docker Compose</H2>
      <P>
        Compose permet de définir et de faire tourner des applications à
        plusieurs conteneurs à partir d'un seul fichier YAML. Plutôt que
        d'enchaîner des commandes <InlineCode>docker run</InlineCode> et de
        gérer soi-même les réseaux, on décrit tout dans{" "}
        <InlineCode>compose.yaml</InlineCode>.
      </P>
      <Note accent={DOCKER_ACCENT}>
        Compose est un outil déclaratif : on décrit l'état voulu, puis{" "}
        <InlineCode>docker compose up</InlineCode> se charge de le réconcilier
        avec l'état actuel — pas besoin de tout recréer à chaque changement.
      </Note>

      <H3>Exemple de compose.yaml</H3>
      <Code>{`services:
  app:
    build: .
    ports:
      - "3000:3000"
    environment:
      - DEBUG=true
    depends_on:
      - db

  db:
    image: mysql
    volumes:
      - db-data:/var/lib/mysql

volumes:
  db-data:`}</Code>

      <H3>Commandes essentielles</H3>
      <Table
        head={["Commande", "Effet"]}
        rows={[
          ["docker compose up -d", "Démarre tous les services en arrière-plan"],
          ["docker compose down", "Arrête et supprime conteneurs et réseaux"],
          ["docker compose down --volumes", "Supprime aussi les volumes"],
          ["docker compose ps", "Liste les services en cours"],
          ["docker compose logs", "Affiche les logs des services"],
        ]}
      />

      <H3>Variables d'environnement</H3>
      <P>
        Deux façons principales d'injecter des variables dans un service :
      </P>
      <Code>{`services:
  webapp:
    environment:
      DEBUG: "true"
      # équivalent à la syntaxe liste :
      # - DEBUG=true`}</Code>
      <Code>{`services:
  webapp:
    env_file: "webapp.env"`}</Code>
      <Note accent={DOCKER_ACCENT}>
        Ne jamais faire passer des informations sensibles (mots de passe,
        clés d'API) par des variables d'environnement en clair — Docker
        propose un mécanisme dédié : les <InlineCode>secrets</InlineCode>.
      </Note>

      <H3>Profils de services</H3>
      <P>
        Les <InlineCode>profiles</InlineCode> permettent de n'activer
        certains services que dans certains contextes (débogage,
        outils ponctuels…), sans les faire tourner par défaut.
      </P>
      <Code>{`services:
  backend:
    image: backend
    # pas de profil -> toujours actif

  phpmyadmin:
    image: phpmyadmin
    depends_on: [db]
    profiles: [debug]`}</Code>
      <Code>{`docker compose --profile debug up`}</Code>
      <P>
        Sans l'option <InlineCode>--profile debug</InlineCode>, le service{" "}
        <InlineCode>phpmyadmin</InlineCode> ne démarre pas.
      </P>

      <SourceLink href="https://docs.docker.com/compose/">
        docs.docker.com — Docker Compose
      </SourceLink>
      {" · "}
      <SourceLink href="https://docs.docker.com/reference/compose-file/services/">
        docs.docker.com — Services reference
      </SourceLink>
      {" · "}
      <SourceLink href="https://docs.docker.com/compose/how-tos/environment-variables/">
        docs.docker.com — Environment variables
      </SourceLink>
      {" · "}
      <SourceLink href="https://docs.docker.com/compose/how-tos/profiles/">
        docs.docker.com — Profiles
      </SourceLink>
      {" · "}
      <SourceLink href="https://www.youtube.com/watch?v=MfxKDC3RR-U">
        Grafikart — Docker Compose, c'est quoi ?
      </SourceLink>
    </div>
  );
}

/* ---------------------------- DEVOPS & GIT -------------------------------- */

function DevOpsCulture() {
  return (
    <div>
      <H2 accent={DEVOPS_ACCENT}>Culture DevOps — CALMS</H2>
      <P>
        CALMS est une grille de lecture pour évaluer la maturité DevOps d'une
        équipe. L'acronyme (Jez Humble) tient en cinq piliers :{" "}
        <strong>C</strong>ulture, <strong>A</strong>utomation,{" "}
        <strong>L</strong>ean, <strong>M</strong>easurement, <strong>S</strong>haring.
      </P>

      <H3>Culture</H3>
      <P>
        DevOps est avant tout un changement culturel, pas un simple
        changement d'outillage : développement et exploitation travaillent
        ensemble plutôt qu'en silos, autour d'équipes orientées produit.
      </P>

      <H3>Automation</H3>
      <P>
        Automatiser l'intégration, les tests, le déploiement et le
        provisionnement élimine le travail manuel répétitif et rend les
        processus reproductibles — c'est la porte d'entrée classique vers
        la <strong>livraison continue</strong>.
      </P>

      <H3>Lean</H3>
      <P>
        Amélioration continue et acceptation de l'échec comme source
        d'apprentissage : mieux vaut un produit simple entre les mains des
        utilisateurs aujourd'hui qu'un produit parfait dans six mois.
      </P>

      <H3>Measurement</H3>
      <P>
        On ne peut pas prouver une amélioration sans données. Commencer
        simple : temps entre développement et déploiement, fréquence des
        bugs récurrents, temps de récupération après incident.
      </P>

      <H3>Sharing</H3>
      <P>
        Partager la responsabilité et la réussite réduit la friction
        historique entre développement et exploitation — d'où l'idée{" "}
        <em>« you built it, you run it »</em> : ceux qui construisent une
        application participent aussi à son exploitation.
      </P>

      <SourceLink href="https://www.atlassian.com/devops/frameworks/calms-framework">
        atlassian.com — CALMS Framework
      </SourceLink>
    </div>
  );
}

function DevOpsMetrics() {
  return (
    <div>
      <H2 accent={DEVOPS_ACCENT}>Mesurer la performance — les métriques DORA</H2>
      <P>
        DORA (DevOps Research and Assessment) a identifié quatre métriques
        clés qui distinguent les équipes les plus performantes. Les deux
        premières mesurent la <strong>vélocité</strong>, les deux suivantes
        la <strong>stabilité</strong>.
      </P>

      <Table
        head={["Métrique", "Ce qu'elle mesure"]}
        rows={[
          ["Deployment Frequency", "À quelle fréquence l'équipe déploie en production"],
          ["Lead Time for Changes", "Le temps entre un commit et sa mise en production"],
          ["Change Failure Rate", "Le pourcentage de déploiements qui provoquent un incident"],
          ["Time to Restore Service", "Le temps nécessaire pour se rétablir après un incident"],
        ]}
      />
      <Note accent={DEVOPS_ACCENT}>
        Les quatre métriques se lisent ensemble : une fréquence de
        déploiement élevée ne veut rien dire de bon si le taux d'échec des
        changements l'est aussi.
      </Note>
      <P>
        L'objectif n'est pas d'atteindre un score parfait immédiatement,
        mais de s'en servir comme repère pour l'amélioration continue —
        dans l'esprit du pilier <em>Measurement</em> de CALMS.
      </P>

      <SourceLink href="https://dora.dev/">dora.dev</SourceLink>
    </div>
  );
}

function GitWorkflows() {
  return (
    <div>
      <H2 accent={DEVOPS_ACCENT}>Workflows Git</H2>

      <H3>GitHub flow</H3>
      <P>
        Un modèle de branches léger, pensé pour être suivi en continu :
      </P>
      <Ul>
        <li>Créer une branche descriptive à partir de la branche par défaut.</li>
        <li>Faire des commits isolés et complets sur cette branche.</li>
        <li>Ouvrir une pull request pour demander une relecture.</li>
        <li>Répondre aux commentaires de revue, jusqu'à approbation.</li>
        <li>Fusionner la pull request dans la branche par défaut.</li>
        <li>Supprimer la branche, désormais inutile.</li>
      </Ul>
      <Note accent={DEVOPS_ACCENT}>
        Un commit qui contient un changement isolé et complet est plus facile
        à annuler individuellement si besoin, sans emporter d'autres
        changements avec lui.
      </Note>

      <H3>Conventional Commits</H3>
      <P>
        Une convention pour structurer les messages de commit de façon lisible
        par des humains <em>et</em> par des outils (génération de changelog,
        calcul automatique de version selon SemVer).
      </P>
      <Code>{`<type>[scope optionnel]: <description>

[corps optionnel]

[footer(s) optionnel(s)]`}</Code>
      <Ul>
        <li><InlineCode>fix</InlineCode> — corrige un bug (→ version PATCH).</li>
        <li><InlineCode>feat</InlineCode> — ajoute une fonctionnalité (→ version MINOR).</li>
        <li><InlineCode>feat!</InlineCode> ou un footer <InlineCode>BREAKING CHANGE:</InlineCode> — changement cassant (→ version MAJOR).</li>
        <li>Autres types courants : <InlineCode>docs</InlineCode>, <InlineCode>style</InlineCode>, <InlineCode>refactor</InlineCode>, <InlineCode>test</InlineCode>, <InlineCode>chore</InlineCode>.</li>
      </Ul>
      <Code>{`feat(auth): add password reset flow

fix: prevent racing of requests

docs: correct spelling of CHANGELOG`}</Code>

      <H3>Trunk-based development</H3>
      <P>
        Un modèle où l'on collabore sur une branche unique (<InlineCode>main</InlineCode>{" "}
        / le « tronc ») en évitant les branches longue durée, plutôt que sur
        de multiples branches qui divergent longtemps (comme dans Git Flow).
      </P>
      <Ul>
        <li>Les branches de fonctionnalité, quand elles existent, restent très courtes (quelques heures à quelques jours).</li>
        <li>Chaque intégration sur le tronc doit se faire sans casser le build — d'où l'importance de l'intégration continue.</li>
        <li>Les feature flags permettent de merger du code inachevé sans l'activer en production.</li>
      </Ul>
      <Note accent={DEVOPS_ACCENT}>
        Le trunk-based development est un prérequis courant à l'intégration
        continue : pour qu'un tronc reste « toujours déployable », tout le
        monde doit y intégrer son travail au moins une fois par jour.
      </Note>

      <H3>Résoudre un conflit de fusion</H3>
      <P>
        Un conflit survient quand deux branches modifient la même ligne d'un
        fichier, ou quand l'une modifie un fichier que l'autre supprime. Git
        marque alors le conflit directement dans le fichier :
      </P>
      <Code>{`Si vous avez des questions,
<<<<<<< HEAD
ouvrez une issue.
=======
posez votre question sur IRC.
>>>>>>> branche-a`}</Code>
      <P>
        Il faut choisir quel contenu garder (ou combiner les deux), supprimer
        les marqueurs <InlineCode>{"<<<<<<<"}</InlineCode>,{" "}
        <InlineCode>{"======="}</InlineCode> et <InlineCode>{">>>>>>>"}</InlineCode>,
        puis valider la résolution :
      </P>
      <Code>{`git add .
git commit -m "Résolution du conflit de fusion"`}</Code>

      <SourceLink href="https://docs.github.com/en/get-started/using-github/github-flow">
        docs.github.com — GitHub flow
      </SourceLink>
      {" · "}
      <SourceLink href="https://www.conventionalcommits.org/en/v1.0.0/">
        conventionalcommits.org
      </SourceLink>
      {" · "}
      <SourceLink href="https://trunkbaseddevelopment.com/">
        trunkbaseddevelopment.com
      </SourceLink>
      {" · "}
      <SourceLink href="https://docs.github.com/en/pull-requests/reference/merge-conflicts">
        docs.github.com — Merge conflicts
      </SourceLink>
    </div>
  );
}

function DockerSecurity() {
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

/* --------------------------------- CI/CD ---------------------------------- */

function CIBasics() {
  return (
    <div>
      <H2 accent={CI_ACCENT}>GitHub Actions — les bases d'un workflow</H2>
      <P>
        Un workflow est un processus automatisé défini dans un fichier YAML,
        placé dans <InlineCode>.github/workflows/</InlineCode>. Il se compose
        d'un déclencheur (<InlineCode>on</InlineCode>), d'un ou plusieurs{" "}
        <InlineCode>jobs</InlineCode>, eux-mêmes composés d'étapes (
        <InlineCode>steps</InlineCode>).
      </P>

      <H3>Structure minimale</H3>
      <Code>{`name: CI

on:
  push:
    branches: [main]
  pull_request:

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v6
      - name: Install dependencies
        run: npm install
      - name: Run tests
        run: npm test`}</Code>

      <H3>Déclencheurs (on)</H3>
      <P>
        On peut restreindre un déclencheur à certaines branches, tags ou
        chemins de fichiers modifiés :
      </P>
      <Code>{`on:
  push:
    branches: [main]
    paths: ['src/**']
  pull_request:
    branches: [main]
  schedule:
    - cron: '30 5 * * 1-5'`}</Code>

      <H3>Étapes (steps)</H3>
      <P>
        Une étape exécute soit une commande (<InlineCode>run</InlineCode>),
        soit une action réutilisable (<InlineCode>uses</InlineCode>) — un
        bloc de code publié par la communauté ou par GitHub.
      </P>
      <Code>{`steps:
  - name: Checkout du code
    uses: actions/checkout@v6

  - name: Afficher un message
    run: echo "Build en cours"`}</Code>
      <Note accent={CI_ACCENT}>
        Il est recommandé d'épingler les actions tierces à un SHA de commit
        plutôt qu'à un tag mouvant, pour éviter qu'une mise à jour non
        maîtrisée ne casse le workflow.
      </Note>

      <H3>Permissions</H3>
      <P>
        Le jeton <InlineCode>GITHUB_TOKEN</InlineCode> généré automatiquement
        n'a par défaut que les permissions nécessaires. On peut les ajuster
        finement par workflow ou par job :
      </P>
      <Code>{`permissions:
  contents: read
  packages: write`}</Code>

      <SourceLink href="https://docs.github.com/en/actions">
        docs.github.com — GitHub Actions
      </SourceLink>
      {" · "}
      <SourceLink href="https://docs.github.com/en/actions/reference/workflows-and-actions/workflow-syntax">
        docs.github.com — Workflow syntax
      </SourceLink>
    </div>
  );
}

function CISecretsMatrix() {
  return (
    <div>
      <H2 accent={CI_ACCENT}>Secrets, cache & matrices de jobs</H2>

      <H3>Secrets</H3>
      <P>
        Un secret (mot de passe, jeton d'API...) se configure dans{" "}
        <InlineCode>Settings → Secrets and variables → Actions</InlineCode> du
        dépôt, puis se référence via le contexte <InlineCode>secrets</InlineCode> :
      </P>
      <Code>{`steps:
  - name: Déploiement
    env:
      API_TOKEN: \${{ secrets.API_TOKEN }}
    run: ./deploy.sh`}</Code>
      <Note accent={CI_ACCENT}>
        Un secret n'est jamais transmis aux workflows déclenchés depuis un
        fork, et sa valeur est automatiquement masquée dans les logs si elle
        y apparaît.
      </Note>

      <H3>Mettre en cache les dépendances</H3>
      <P>
        Le cache évite de retélécharger les mêmes dépendances à chaque
        exécution. La clé inclut généralement un hash du fichier de lock,
        pour qu'un changement de dépendances invalide automatiquement le cache.
      </P>
      <Code>{`- name: Cache node modules
  uses: actions/cache@v4
  with:
    path: ~/.npm
    key: \${{ runner.os }}-npm-\${{ hashFiles('**/package-lock.json') }}
    restore-keys: |
      \${{ runner.os }}-npm-`}</Code>
      <Note accent={CI_ACCENT}>
        Pour les gestionnaires de paquets courants (npm, pip, Maven...), les
        actions <InlineCode>setup-*</InlineCode> officielles (ex.{" "}
        <InlineCode>actions/setup-node</InlineCode>) savent gérer ce cache
        avec une simple option, sans configurer <InlineCode>actions/cache</InlineCode>{" "}
        à la main.
      </Note>

      <H3>Exécuter des variations avec une matrice</H3>
      <P>
        Une stratégie matricielle génère automatiquement plusieurs
        exécutions d'un même job à partir de combinaisons de variables —
        utile pour tester sur plusieurs versions ou systèmes.
      </P>
      <Code>{`jobs:
  test:
    strategy:
      matrix:
        os: [ubuntu-latest, windows-latest]
        node: [18, 20, 22]
    runs-on: \${{ matrix.os }}
    steps:
      - uses: actions/setup-node@v7
        with:
          node-version: \${{ matrix.node }}`}</Code>
      <P>
        Cet exemple lance <strong>6 jobs</strong> (2 systèmes × 3 versions de
        Node.js), chacun avec la combinaison qui lui correspond via{" "}
        <InlineCode>matrix.os</InlineCode> et <InlineCode>matrix.node</InlineCode>.
      </P>

      <SourceLink href="https://docs.github.com/en/actions/how-tos/write-workflows/choose-what-workflows-do/use-secrets">
        docs.github.com — Using secrets
      </SourceLink>
      {" · "}
      <SourceLink href="https://docs.github.com/en/actions/reference/workflows-and-actions/dependency-caching">
        docs.github.com — Dependency caching
      </SourceLink>
      {" · "}
      <SourceLink href="https://docs.github.com/en/actions/how-tos/write-workflows/choose-what-workflows-do/run-job-variations">
        docs.github.com — Run job variations
      </SourceLink>
    </div>
  );
}

function CIPublishDocker() {
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

/* ---------------------------- ANALYSE & CONCEPTION ------------------------- */

function MeriseEntities() {
  return (
    <div>
      <H2 accent={MERISE_ACCENT}>Le problème, et la méthode Merise</H2>
      <P>
        Concevoir une base de données directement en écrivant du SQL revient
        à construire une maison sans plan d'architecte : on se retrouve
        souvent avec des tables « fourre-tout », qui rendent les requêtes
        nécessaires pour croiser les informations d'une complexité
        cauchemardesque.
      </P>
      <P>
        La méthode <strong>Merise</strong>, bien qu'ancienne, reste le
        formalisme le plus solide pour la modélisation conceptuelle. Elle
        sépare radicalement la réflexion métier — le{" "}
        <strong>Modèle Conceptuel de Données</strong> (MCD) — de
        l'implémentation technique — le Modèle Physique de Données (MPD).
      </P>

      <H3>Entités et propriétés</H3>
      <P>
        Une <strong>entité</strong> est un objet de gestion du système
        d'information ayant une existence propre (ex. un{" "}
        <InlineCode>Client</InlineCode>, un <InlineCode>Produit</InlineCode>).
        Une <strong>propriété</strong> (ou attribut) est une donnée
        élémentaire qui qualifie cette entité.
      </P>
      <Note accent={MERISE_ACCENT}>
        Règle d'or : toute entité DOIT posséder un identifiant unique
        discriminant — c'est lui qui deviendra la future clé primaire.
      </Note>

      <H3>Outillage</H3>
      <P>
        <strong>Mocodo</strong> est un outil qui transforme une description
        textuelle simple d'un MCD en diagramme entité-association (SVG) et en
        schéma relationnel (SQL, LaTeX, Markdown...).
      </P>
      <Code>{`# Définir une entité
client: id_client, nom, email

# Définir une association
passe, 0N client, 1N commande`}</Code>
      <P>
        Le premier attribut listé après les deux-points est, par convention,
        l'identifiant de l'entité. Une association se définit par son nom,
        suivi de ses « pattes » — chacune un couple de cardinalités
        (<InlineCode>01</InlineCode>, <InlineCode>11</InlineCode>,{" "}
        <InlineCode>0N</InlineCode>, <InlineCode>1N</InlineCode>) suivi du nom
        d'une entité.
      </P>

      <SourceLink href="https://www.mocodo.net/">mocodo.net</SourceLink>
      {" · "}
      <SourceLink href="https://merise.developpez.com/cours/">
        merise.developpez.com — Cours Merise
      </SourceLink>
    </div>
  );
}

function MeriseCardinalities() {
  return (
    <div>
      <H2 accent={MERISE_ACCENT}>Associations et cardinalités</H2>
      <P>
        Une <strong>association</strong> est un lien sémantique entre
        plusieurs entités. Les <strong>cardinalités</strong> expriment le
        nombre de participations minimales et maximales d'une entité à cette
        association.
      </P>

      <Table
        head={["Cardinalité", "Signification"]}
        rows={[
          ["0,1", "Au minimum 0, au maximum 1 — optionnel exclusif"],
          ["1,1", "Au minimum 1, au maximum 1 — obligatoire exclusif"],
          ["0,n", "Au minimum 0, au maximum plusieurs — optionnel multiple"],
          ["1,n", "Au minimum 1, au maximum plusieurs — obligatoire multiple"],
        ]}
      />

      <H3>Lire une cardinalité</H3>
      <P>
        Une cardinalité se lit toujours du côté de l'entité vers
        l'association : elle répond à la question « à combien
        d'occurrences de l'association cette entité peut-elle participer,
        au minimum et au maximum ? ». Par exemple, pour l'association{" "}
        <em>« un client passe des commandes »</em> :
      </P>
      <Ul>
        <li>Un client peut passer <InlineCode>0,n</InlineCode> commandes (aucune obligation, plusieurs possibles).</li>
        <li>Une commande est passée par exactement <InlineCode>1,1</InlineCode> client (toujours un, un seul).</li>
      </Ul>
      <Note accent={MERISE_ACCENT}>
        Le minimum (0 ou 1) traduit une contrainte d'obligation ; le maximum
        (1 ou n) traduit une contrainte de multiplicité. Les deux sont
        indépendantes l'une de l'autre.
      </Note>

      <SourceLink href="https://merise.developpez.com/cours/">
        merise.developpez.com — Cours Merise
      </SourceLink>
      {" · "}
      <SourceLink href="https://www.mocodo.net/">mocodo.net</SourceLink>
    </div>
  );
}

function MeriseAssociationPorteuse() {
  return (
    <div>
      <H2 accent={MERISE_ACCENT}>L'association porteuse</H2>
      <P>
        C'est le concept le plus mal compris des juniors. Prenons
        l'association entre <InlineCode>COMMANDE</InlineCode> et{" "}
        <InlineCode>PRODUIT</InlineCode> :
      </P>
      <Ul>
        <li>Une commande contient <InlineCode>(1,n)</InlineCode> produits.</li>
        <li>Un produit peut figurer dans <InlineCode>(0,n)</InlineCode> commandes.</li>
      </Ul>
      <P>Où stocker la « quantité commandée » ?</P>
      <Ul>
        <li>
          Dans <InlineCode>PRODUIT</InlineCode> ? Faux — tous les clients
          commandant ce produit auraient alors la même quantité.
        </li>
        <li>
          Dans <InlineCode>COMMANDE</InlineCode> ? Faux également — la
          commande ne pourrait avoir qu'une seule quantité, tous produits
          confondus.
        </li>
      </Ul>
      <P>
        La quantité dépend de la <strong>rencontre</strong> entre un produit
        précis et une commande précise. Elle appartient donc à l'association
        elle-même — une association <InlineCode>(n,m)</InlineCode> porteuse
        de données. En SQL, cela se traduit par une table de liaison.
      </P>

      <Code>{`erDiagram
    CLIENT ||--o{ COMMANDE : "passe"
    COMMANDE ||--|{ LIGNE_COMMANDE : "contient"
    PRODUIT ||--o{ LIGNE_COMMANDE : "figure_dans"

    CLIENT {
        string id_client PK
        string nom
        string email
    }
    COMMANDE {
        string id_cmd PK
        date date_achat
        string statut
    }
    PRODUIT {
        string code_prod PK
        string designation
        decimal prix_unitaire
    }
    LIGNE_COMMANDE {
        string id_cmd FK
        string code_prod FK
        int quantite
    }`}</Code>
      <Note accent={MERISE_ACCENT}>
        Note de syntaxe : l'association porteuse <InlineCode>(n,m)</InlineCode>{" "}
        du MCD est ici représentée directement par l'entité faible de liaison{" "}
        <InlineCode>LIGNE_COMMANDE</InlineCode>, pour rester compatible avec
        la syntaxe Mermaid — ce qui préfigure déjà le passage au MLD (Modèle
        Logique de Données).
      </Note>

      <H3>Ce qu'il faut retenir</H3>
      <Ul>
        <li>Une association <InlineCode>(n,n)</InlineCode> porteuse de données se traduit toujours par une table à part entière.</li>
        <li>Cette table de liaison contient les clés étrangères des deux entités reliées, plus les attributs propres à la rencontre.</li>
        <li>C'est exactement ce mécanisme qui règle, en base de données relationnelle, les relations « plusieurs-à-plusieurs ».</li>
      </Ul>

      <SourceLink href="https://merise.developpez.com/cours/">
        merise.developpez.com — Cours Merise
      </SourceLink>
      {" · "}
      <SourceLink href="https://www.mocodo.net/">mocodo.net</SourceLink>
      {" · "}
      <SourceLink href="https://www.ibm.com/docs/fr/rsas/7.5.0?topic=diagrams-association-classes">
        IBM Docs — Classes d'association (UML)
      </SourceLink>
    </div>
  );
}

function MeriseNormalization() {
  return (
    <div>
      <H2 accent={MERISE_ACCENT}>Normalisation approfondie — 1NF, 2NF, 3NF</H2>
      <P>
        Une fois le MCD posé, encore faut-il vérifier que les tables qui en
        découlent ne souffrent pas d'<strong>anomalies de modification</strong>{" "}
        — le signe qu'une table cache en réalité plusieurs entités mal
        séparées.
      </P>

      <H3>Le problème : trois anomalies classiques</H3>
      <Ul>
        <li>
          <strong>Anomalie de mise à jour</strong> — si une donnée dupliquée
          (ex. l'adresse d'un client) apparaît sur plusieurs lignes, un
          déménagement oublié sur une seule ligne crée une incohérence.
        </li>
        <li>
          <strong>Anomalie de suppression</strong> — supprimer une commande
          peut effacer, avec elle, le fait qu'un produit existe au
          catalogue, s'il n'était référencé que par cette commande.
        </li>
        <li>
          <strong>Anomalie d'insertion</strong> — impossible d'ajouter un
          nouveau produit tant qu'il n'a pas de commande, si la table exige
          un identifiant de commande pour chaque ligne.
        </li>
      </Ul>
      <Note accent={MERISE_ACCENT}>
        La normalisation est un processus mathématique appliqué à la
        conception d'une base relationnelle pour réduire la redondance et
        garantir l'intégrité des dépendances entre attributs.
      </Note>

      <H3>1NF — l'atomicité</H3>
      <P>
        Chaque attribut doit contenir une valeur <strong>atomique</strong>{" "}
        (indivisible), sans groupe répétitif.
      </P>
      <Code>{`-- Mauvaise table
Client(id, nom, contacts)
-- contacts = "jean@acme.com, paul@acme.com"

-- Bonne table : séparer en deux
Client(id, nom)
Contact(id, id_client FK, email)`}</Code>

      <H3>2NF — dépendance totale à la clé</H3>
      <P>
        En plus de respecter la 1NF, tout attribut non clé doit dépendre de
        la <strong>totalité</strong> de la clé primaire — cela concerne
        surtout les tables à clé composée.
      </P>
      <Code>{`-- Mauvaise table
Ligne_Commande(id_cmd, code_prod, quantite, designation_produit)
-- clé primaire : (id_cmd, code_prod)
-- quantite dépend bien des DEUX -> OK
-- designation_produit ne dépend QUE de code_prod -> violation 2NF

-- Bonne table : on déplace designation_produit
Ligne_Commande(id_cmd, code_prod, quantite)
Produit(code_prod, designation_produit)`}</Code>

      <H3>3NF — pas de dépendance transitive</H3>
      <P>
        En plus de respecter la 2NF, tout attribut non clé doit dépendre{" "}
        <strong>directement</strong> de la clé primaire, et non d'un autre
        attribut non clé.
      </P>
      <Code>{`-- Mauvaise table
Commande(id_cmd, date, qte, prix_unitaire, total_ligne)
-- total_ligne dépend de qte ET prix_unitaire (deux attributs non clés)
-- si qte change sans recalculer total_ligne, la base devient incohérente

-- Bonne table : on supprime total_ligne
Commande(id_cmd, date, qte, prix_unitaire)
-- total_ligne se calcule à la volée (vue SQL, ou côté applicatif)`}</Code>
      <Note accent={MERISE_ACCENT}>
        Une donnée calculable ne se stocke jamais dans une base relationnelle
        transactionnelle (OLTP) — elle se recalcule à la demande, pour
        garantir qu'elle reste toujours exacte.
      </Note>

      <H3>Au-delà de la 3NF</H3>
      <P>
        La <strong>forme normale de Boyce-Codd (BCNF)</strong> est une
        version plus stricte de la 3NF, basée sur les super-clés. La 4NF
        élimine les dépendances à valeurs multiples (ex. séparer les
        compétences et les langues parlées d'un employé dans deux tables
        distinctes). La 5NF, rarement recherchée en pratique, garantit qu'une
        décomposition en tables plus petites permet toujours de reconstituer
        exactement la table d'origine.
      </P>

      <H3>Le compromis</H3>
      <P>
        Normaliser réduit la redondance et les anomalies, mais multiplie
        aussi le nombre de tables à croiser pour une même requête — d'où,
        dans certains contextes (reporting, lecture intensive), le choix
        assumé de <em>dénormaliser</em> partiellement une base une fois les
        règles bien comprises.
      </P>

      <SourceLink href="https://www.ibm.com/fr-fr/think/topics/database-normalization">
        ibm.com — Normalisation des bases de données
      </SourceLink>
      {" · "}
      <SourceLink href="https://www.geeksforgeeks.org/dbms/normal-forms-in-dbms/">
        geeksforgeeks.org — Normal Forms in DBMS
      </SourceLink>
      {" · "}
      <SourceLink href="https://www.guvi.in/hub/dbms-and-sql-tutorial/introduction-to-normalization/">
        guvi.in — Introduction to Normalization
      </SourceLink>
    </div>
  );
}

function CommonTooling() {
  return (
    <div>
      <H2 accent={TOOL_ACCENT}>Outillage commun — vue d'ensemble</H2>
      <P>
        Ces quatre outils reviennent à l'identique, que le projet soit en
        React ou en Vue. Comprendre leur rôle une fois permet de les
        réutiliser partout.
      </P>

      <H3>Vite</H3>
      <P>
        Un outil de build pensé pour la rapidité : un serveur de
        développement avec rechargement à chaud quasi instantané (HMR), et
        une commande de build qui produit des fichiers statiques optimisés
        pour la production.
      </P>
      <Code>{`npm create vite@latest
npm run dev      # serveur de développement
npm run build    # build de production dans dist/
npm run preview  # tester le build en local`}</Code>

      <H3>Tailwind CSS</H3>
      <P>
        Un framework CSS « utility-first » : on stylise directement dans le
        balisage avec des classes courtes (<InlineCode>text-4xl</InlineCode>,{" "}
        <InlineCode>text-red-500</InlineCode>...), plutôt que d'écrire des
        feuilles de style séparées.
      </P>

      <H3>ESLint</H3>
      <P>
        Un outil d'analyse statique qui repère les erreurs et incohérences
        de style dans le code JavaScript. Chaque règle a un niveau :
      </P>
      <Table
        head={["Niveau", "Effet"]}
        rows={[
          ['"off" / 0', "Règle désactivée"],
          ['"warn" / 1', "Avertissement (n'affecte pas le code de sortie)"],
          ['"error" / 2', "Erreur (le code de sortie devient 1)"],
        ]}
      />
      <Code>{`npx eslint yourfile.js   # analyser un fichier
npx eslint . --fix        # corriger automatiquement`}</Code>

      <H3>Lucide</H3>
      <P>
        Une bibliothèque d'icônes SVG, disponible comme composants pour les
        trois frameworks (<InlineCode>lucide-react</InlineCode>,{" "}
        <InlineCode>@lucide/vue</InlineCode>,{" "}
        <InlineCode>@lucide/svelte</InlineCode>). Personnalisables via des props :
      </P>
      <Table
        head={["Prop", "Type", "Valeur par défaut"]}
        rows={[
          ["size", "number", "24"],
          ["color", "string", "currentColor"],
          ["strokeWidth", "number", "2"],
        ]}
      />

      <H3>GitHub Pages</H3>
      <P>
        Un service d'hébergement statique gratuit intégré à GitHub : il
        transforme le contenu d'une branche (souvent{" "}
        <InlineCode>gh-pages</InlineCode>) en site public, sans configuration
        serveur à gérer.
      </P>
    </div>
  );
}

/* ------------------------ ARCHITECTURE & PATTERNS ----------------------- */

function ArchRepository() {
  return (
    <div>
      <H2 accent={ARCH_ACCENT}>Patterns architecturaux — Repository & inversion des dépendances</H2>
      <P>
        Le code métier historique est souvent directement couplé à
        l'infrastructure technique : une classe métier qui instancie
        elle-même sa connexion MySQL, écrit ses requêtes SQL et gère son
        pool de connexions. Résultat : le domaine est impossible à tester
        sans base de données, changer de SGBD impose de réécrire la logique
        métier, et la classe viole le principe de responsabilité unique en
        mélangeant règles de gestion et détails de persistance.
      </P>

      <H3>La solution : dépendre d'abstractions, pas d'implémentations</H3>
      <P>
        L'<strong>inversion des dépendances</strong> (le « D » de SOLID)
        énonce que les modules de haut niveau ne doivent pas dépendre des
        modules de bas niveau : les deux dépendent d'abstractions. Le{" "}
        <strong>pattern Repository</strong> applique ce principe à la
        persistance : la classe métier dépend d'une interface abstraite
        (ex. <InlineCode>IOrderRepository</InlineCode>), et c'est
        l'infrastructure qui implémente cette interface — jamais l'inverse.
        Le domaine métier, lui, ne dépend de rien.
      </P>
      <Code>{`// DomainLayer — ne dépend que de lui-même
interface IOrderRepository {
  findById(id: string): Order | null;
  save(order: Order): void;
}

class OrderService {
  constructor(private readonly orders: IOrderRepository) {}

  confirm(id: string): void {
    const order = this.orders.findById(id);
    if (!order) throw new Error("Commande introuvable");
    order.confirm();            // règle métier pure
    this.orders.save(order);
  }
}`}</Code>
      <Code>{`// InfrastructureLayer — dépend du domaine ET de la techno
class PostgresOrderRepository implements IOrderRepository {
  constructor(private readonly db: PgClient) {}

  findById(id: string): Order | null {
    const row = this.db.query("SELECT * FROM orders WHERE id = $1", [id]);
    return row ? OrderMapper.toDomain(row) : null;
  }

  save(order: Order): void {
    this.db.query("INSERT INTO orders ... ON CONFLICT ... DO UPDATE ...");
  }
}`}</Code>
      <P>
        Le sens de la flèche de dépendance est <em>inversé</em> par rapport
        à un design naïf : la couche technique pointe vers le domaine, et le
        domaine ne connaît que son interface.
      </P>
      <Code>{`classDiagram
    namespace DomainLayer {
        class OrderService
        class IOrderRepository {
            <<interface>>
            +findById(id) Order
            +save(order) void
        }
    }
    namespace InfrastructureLayer {
        class PostgresOrderRepository {
            +findById(id) Order
            +save(order) void
        }
    }
    OrderService --> IOrderRepository : dépend de
    PostgresOrderRepository ..|> IOrderRepository : implémente`}</Code>
      <Note accent={ARCH_ACCENT}>
        Test unitaire immédiat : on injecte un{" "}
        <InlineCode>InMemoryOrderRepository</InlineCode> (un simple tableau)
        dans <InlineCode>OrderService</InlineCode>, et toute la logique
        métier se teste sans base de données, en millisecondes.
      </Note>

      <SourceLink href="https://blog.cleancoder.com/uncle-bob/2012/08/13/the-clean-architecture.html">
        blog.cleancoder.com — The Clean Architecture
      </SourceLink>
      {" · "}
      <SourceLink href="https://martinfowler.com/articles/dipInTheWild.html">
        martinfowler.com — Dependency Injection / IoC
      </SourceLink>
      {" · "}
      <SourceLink href="https://www.domainlanguage.com/ddd/reference/">
        domainlanguage.com — DDD Reference (Eric Evans)
      </SourceLink>
    </div>
  );
}

function ArchDynamicDiagrams() {
  return (
    <div>
      <H2 accent={ARCH_ACCENT}>Diagrammes de séquence & d'états-transitions</H2>
      <P>
        Le code asynchrone et les systèmes distribués rendent les flux
        invisibles à la simple lecture du code : un service publie un
        événement dans un broker de messages, et rien dans son code
        n'indique qui va réagir, ni quand, ni dans quel ordre. Le
        comportement dynamique n'existe nulle part sous forme lisible.
      </P>

      <H3>Le diagramme de séquence — les échanges dans le temps</H3>
      <P>
        Un <strong>diagramme de séquence UML</strong> ordonne verticalement
        les messages échangés entre participants. Il distingue les appels{" "}
        <strong>synchrones</strong> (<InlineCode>{"->>"}</InlineCode>,
        l'appelant attend), les envois <strong>asynchrones</strong>{" "}
        (<InlineCode>-x</InlineCode>, « fire and forget ») et les{" "}
        <strong>retours</strong> (<InlineCode>{"-->>"}</InlineCode>). Les
        fragments combinés <InlineCode>alt</InlineCode> (alternative),{" "}
        <InlineCode>opt</InlineCode> (optionnel) et{" "}
        <InlineCode>loop</InlineCode> (répétition) portent la logique de
        contrôle.
      </P>
      <Code>{`sequenceDiagram
    participant C as Client
    participant API as API REST
    participant MQ as RabbitMQ
    participant W as Worker paiement
    participant B as Banque

    C->>API: POST /orders/42/pay
    API->>API: validation du payload
    API-x MQ: publish "payment.requested" (async)
    API-->>C: 202 Accepted

    MQ-x W: consume "payment.requested"
    loop 3 tentatives maximum
        W->>B: authorize(amount)
        alt autorisation acceptée
            B-->>W: 200 { authId }
            W-x MQ: publish "payment.succeeded"
        else fonds insuffisants
            B-->>W: 402 Payment Required
            W-x MQ: publish "payment.failed"
        end
    end
    opt notification activée
        MQ-x C: webhook "payment.succeeded"
    end`}</Code>

      <H3>Le diagramme d'états-transitions — le cycle de vie d'une entité</H3>
      <P>
        Une <strong>machine à états finis</strong> énumère les statuts
        légaux d'une entité et les seules transitions autorisées. Chaque
        transition peut porter une <strong>garde</strong> (condition entre
        crochets) qui doit être vraie pour que le passage soit permis. Un{" "}
        <strong>sous-état</strong> (état composite) détaille un traitement
        interne sans alourdir le diagramme principal.
      </P>
      <Code>{`stateDiagram-v2
    [*] --> DRAFT
    DRAFT --> PENDING_PAYMENT : submit [panier non vide]
    PENDING_PAYMENT --> PAID : payment.succeeded
    PENDING_PAYMENT --> CANCELLED : timeout [délai > 30 min]
    PAID --> SHIPPED : dispatch [stock réservé]
    SHIPPED --> [*]
    CANCELLED --> [*]

    state PENDING_PAYMENT {
        [*] --> payment_transaction_process
        state payment_transaction_process {
            [*] --> authorizing
            authorizing --> captured : authId reçu
            authorizing --> declined : refus banque
            captured --> [*]
            declined --> [*]
        }
    }`}</Code>
      <Note accent={ARCH_ACCENT}>
        Règle : toute transition absente du diagramme est <em>interdite</em>.
        Une commande <InlineCode>SHIPPED</InlineCode> ne peut jamais
        repasser à <InlineCode>PENDING_PAYMENT</InlineCode> — la machine à
        états devient une spécification exécutable des règles métier.
      </Note>

      <SourceLink href="https://mermaid.js.org/syntax/sequenceDiagram.html">
        mermaid.js — Sequence Diagrams
      </SourceLink>
      {" · "}
      <SourceLink href="https://mermaid.js.org/syntax/stateDiagram.html">
        mermaid.js — State Diagrams
      </SourceLink>
      {" · "}
      <SourceLink href="https://martinfowler.com/dslCatalog/stateMachine.html">
        martinfowler.com — Pattern State Machine
      </SourceLink>
    </div>
  );
}

/* ---------------------- MODÉLISATION DES DONNÉES ---------------------- */

function DataBusinessRules() {
  return (
    <div>
      <H2 accent={MERISE_ACCENT}>Règles de gestion, entités, associations & cardinalités</H2>
      <P>
        Concevoir une base de données directement en SQL, sans modèle
        conceptuel préalable, mène presque toujours aux mêmes impasses :
        des tables « fourre-tout » qui accumulent des colonnes hétérogènes,
        et des requêtes cauchemardesques dès qu'il faut croiser plusieurs
        informations.
      </P>

      <H3>Partir des règles de gestion</H3>
      <P>
        Tout part de phrases métier en français, les{" "}
        <strong>règles de gestion</strong> : « un client passe zéro, une ou
        plusieurs commandes », « une commande appartient à un et un seul
        client », « une commande porte sur au moins un produit ». Chaque
        règle se traduit en éléments du{" "}
        <strong>Modèle Conceptuel de Données</strong> (MCD) selon la méthode
        Merise.
      </P>
      <Table
        head={["Concept Merise", "Définition"]}
        rows={[
          ["Entité", "Objet de gestion ayant une existence propre (Client, Produit)"],
          ["Propriété", "Donnée élémentaire qualifiant une entité (nom, prix)"],
          ["Association", "Lien sémantique entre entités (un client passe une commande)"],
          ["Cardinalité", "Nombre de participations min/max d'une entité à une association"],
          ["Association porteuse", "Association qui porte ses propres propriétés (la quantité d'une ligne)"],
        ]}
      />

      <H3>Les quatre cardinalités</H3>
      <Table
        head={["Cardinalité", "Lecture"]}
        rows={[
          ["0,1", "Participation facultative, au plus une fois"],
          ["1,1", "Participation obligatoire, exactement une fois"],
          ["0,n", "Participation facultative, plusieurs fois possibles"],
          ["1,n", "Participation obligatoire, plusieurs fois possibles"],
        ]}
      />

      <H3>L'association porteuse</H3>
      <P>
        La <strong>quantité</strong> d'une ligne de commande n'appartient ni
        au produit (sinon tous les clients commanderaient la même quantité),
        ni à la commande seule (sinon une seule quantité pour tous les
        produits). Elle appartient à la <em>rencontre</em> entre une
        commande précise et un produit précis : c'est une association
        porteuse, qui devient la table <InlineCode>LIGNE_COMMANDE</InlineCode>.
      </P>
      <Code>{`erDiagram
    CLIENT ||--o{ COMMANDE : "passe"
    COMMANDE ||--|{ LIGNE_COMMANDE : "contient"
    PRODUIT ||--o{ LIGNE_COMMANDE : "concerne"

    CLIENT {
        int id_client PK
        string nom
        string email
    }
    COMMANDE {
        int id_commande PK
        date date_commande
        int id_client FK
    }
    PRODUIT {
        int id_produit PK
        string libelle
        decimal prix_unitaire
    }
    LIGNE_COMMANDE {
        int id_commande PK
        int id_produit PK
        int quantite
    }`}</Code>
      <Note accent={MERISE_ACCENT}>
        Se lit : un <InlineCode>CLIENT</InlineCode> passe de 0 à n{" "}
        <InlineCode>COMMANDE</InlineCode>, une{" "}
        <InlineCode>COMMANDE</InlineCode> contient de 1 à n{" "}
        <InlineCode>LIGNE_COMMANDE</InlineCode>, et chaque{" "}
        <InlineCode>LIGNE_COMMANDE</InlineCode> concerne exactement un{" "}
        <InlineCode>PRODUIT</InlineCode>.
      </Note>

      <SourceLink href="https://www.mocodo.net/">mocodo.net — outil de MCD</SourceLink>
      {" · "}
      <SourceLink href="https://merise.developpez.com/cours/">
        developpez.com — Introduction à la méthode Merise
      </SourceLink>
      {" · "}
      <SourceLink href="https://www.ibm.com/docs/fr/rsas/7.5.0?topic=diagrams-association-classes">
        ibm.com — Les associations porteuses / classes d'association
      </SourceLink>
    </div>
  );
}

function DataNormalizationStrict() {
  return (
    <div>
      <H2 accent={MERISE_ACCENT}>Normalisation approfondie — 1NF, 2NF, 3NF strict</H2>
      <P>
        Une table mal conçue souffre d'<strong>anomalies</strong> : de mise
        à jour (une même donnée dupliquée sur plusieurs lignes, corrigée à
        un seul endroit), de suppression (effacer une ligne fait disparaître
        une information sans rapport), et d'insertion (impossible d'ajouter
        une donnée tant qu'une autre, non liée, n'existe pas). Les{" "}
        <strong>formes normales</strong> éliminent ces anomalies une à une.
      </P>

      <H3>1NF — atomicité des attributs</H3>
      <P>
        Chaque attribut contient une seule valeur indivisible : pas de
        liste, pas de groupe répétitif dans une colonne.
      </P>
      <Code>{`-- Mauvaise table (viole la 1NF)
COMMANDE(id_commande, client, produits)
-- produits = "clavier;souris;écran"

-- Bonne table
COMMANDE(id_commande, client)
LIGNE_COMMANDE(id_commande, produit)`}</Code>

      <H3>2NF — dépendance à la totalité de la clé</H3>
      <P>
        La table est en 1NF <em>et</em> tout attribut non-clé dépend de la{" "}
        <strong>totalité</strong> de la clé primaire composée, pas d'une
        partie seulement.
      </P>
      <Code>{`-- Mauvaise table (clé primaire : id_commande + id_produit)
LIGNE_COMMANDE(id_commande, id_produit, quantite, libelle_produit)
-- libelle_produit ne dépend que de id_produit -> viole la 2NF

-- Bonne table
LIGNE_COMMANDE(id_commande, id_produit, quantite)
PRODUIT(id_produit, libelle_produit)`}</Code>

      <H3>3NF — aucune dépendance transitive</H3>
      <P>
        La table est en 2NF <em>et</em> aucun attribut non-clé ne dépend
        d'un autre attribut non-clé. Une donnée <strong>calculable</strong>{" "}
        (ex. <InlineCode>total_ligne</InlineCode>) ne se stocke jamais en
        base OLTP.
      </P>
      <Code>{`-- Mauvaise table
LIGNE_COMMANDE(id_commande, id_produit, quantite, prix_unitaire, total_ligne)
-- total_ligne = quantite * prix_unitaire -> dépendance transitive

-- Bonne table
LIGNE_COMMANDE(id_commande, id_produit, quantite, prix_unitaire)
-- total_ligne recalculé à la volée (vue SQL ou couche applicative)`}</Code>
      <Note accent={MERISE_ACCENT}>
        Mnémotechnique : chaque attribut non-clé dépend « de la clé, de
        toute la clé, et de rien d'autre que la clé » — 1NF, 2NF, 3NF.
      </Note>

      <SourceLink href="https://www.ibm.com/fr-fr/think/topics/database-normalization">
        ibm.com — Database Normalization Explained
      </SourceLink>
      {" · "}
      <SourceLink href="https://www.geeksforgeeks.org/dbms/normal-forms-in-dbms/">
        geeksforgeeks.org — Visualizing Normal Forms in DBMS
      </SourceLink>
      {" · "}
      <SourceLink href="https://www.guvi.in/hub/dbms-and-sql-tutorial/introduction-to-normalization/">
        guvi.in — Guide interactif sur les Formes Normales
      </SourceLink>
    </div>
  );
}

function DataPhysicalModel() {
  return (
    <div>
      <H2 accent={MERISE_ACCENT}>MLD & MPD — contraintes SQL de production</H2>
      <P>
        Faire confiance uniquement au code applicatif pour garantir la
        qualité des données est risqué : un bug, un script d'import, une
        console d'administration ouverte, et la base se retrouve avec des
        lignes incohérentes que plus aucune validation ne rattrapera. Le{" "}
        <strong>Modèle Physique de Données</strong> (MPD) blinde les règles
        directement au niveau du SGBD.
      </P>

      <H3>Du MLD au MPD</H3>
      <Ul>
        <li>
          Le <strong>MLD</strong> (Modèle Logique de Données) traduit le MCD
          en tables, clés primaires et clés étrangères, sans dépendre d'un
          SGBD précis.
        </li>
        <li>
          Le <strong>MPD</strong> ajoute les types exacts, les contraintes{" "}
          <InlineCode>CHECK</InlineCode>, les politiques{" "}
          <InlineCode>ON DELETE</InlineCode> et les index, pour un SGBD
          donné (ici PostgreSQL).
        </li>
      </Ul>

      <H3>Intégrité référentielle : les politiques ON DELETE</H3>
      <Table
        head={["Politique", "Effet à la suppression du parent"]}
        rows={[
          ["RESTRICT / NO ACTION", "Interdit la suppression tant qu'un enfant existe"],
          ["CASCADE", "Supprime automatiquement les lignes enfants"],
          ["SET NULL", "Met la clé étrangère de l'enfant à NULL"],
        ]}
      />

      <H3>Script PostgreSQL complet</H3>
      <Code>{`CREATE TABLE client (
    id_client uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    nom       text NOT NULL,
    email     text NOT NULL UNIQUE,
    CONSTRAINT email_format CHECK (email ~ '^[^@]+@[^@]+\\.[^@]+$')
);

CREATE TABLE produit (
    id_produit    uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    libelle       text NOT NULL,
    prix_unitaire numeric(10,2) NOT NULL,
    stock         integer NOT NULL DEFAULT 0,
    CONSTRAINT prix_positif CHECK (prix_unitaire > 0),
    CONSTRAINT stock_non_negatif CHECK (stock >= 0)
);

CREATE TABLE commande (
    id_commande   uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    id_client     uuid NOT NULL,
    date_commande timestamptz NOT NULL DEFAULT now(),
    statut        text NOT NULL DEFAULT 'DRAFT',
    CONSTRAINT statut_valide
        CHECK (statut IN ('DRAFT','PENDING_PAYMENT','PAID','SHIPPED','CANCELLED')),
    CONSTRAINT fk_commande_client
        FOREIGN KEY (id_client) REFERENCES client (id_client)
        ON DELETE RESTRICT
);

CREATE TABLE ligne_commande (
    id_commande   uuid NOT NULL,
    id_produit    uuid NOT NULL,
    quantite      integer NOT NULL,
    prix_applique numeric(10,2) NOT NULL,
    PRIMARY KEY (id_commande, id_produit),
    CONSTRAINT quantite_positive CHECK (quantite > 0),
    CONSTRAINT fk_ligne_commande
        FOREIGN KEY (id_commande) REFERENCES commande (id_commande)
        ON DELETE CASCADE,
    CONSTRAINT fk_ligne_produit
        FOREIGN KEY (id_produit) REFERENCES produit (id_produit)
        ON DELETE RESTRICT
);`}</Code>
      <Note accent={MERISE_ACCENT}>
        Choix des politiques ici : supprimer une{" "}
        <InlineCode>commande</InlineCode> efface ses lignes
        (<InlineCode>CASCADE</InlineCode>), mais on interdit de supprimer un{" "}
        <InlineCode>client</InlineCode> ou un{" "}
        <InlineCode>produit</InlineCode> encore référencés
        (<InlineCode>RESTRICT</InlineCode>) — l'historique commercial reste
        intègre.
      </Note>

      <SourceLink href="https://www.postgresql.org/docs/current/ddl-constraints.html">
        postgresql.org — DDL Constraints
      </SourceLink>
      {" · "}
      <SourceLink href="https://use-the-index-luke.com/">
        use-the-index-luke.com — SQL DDL Best Practices
      </SourceLink>
      {" · "}
      <SourceLink href="https://www.pgtutorial.com/postgresql-tutorial/postgresql-uuid/">
        pgtutorial.com — Gérer les UUID sous PostgreSQL
      </SourceLink>
    </div>
  );
}

/* ------------------------------- UML -------------------------------- */

function UmlClassDiagram() {
  return (
    <div>
      <H2 accent={UML_ACCENT}>Diagramme de classes & UML avancé</H2>
      <P>
        Sans formalisme partagé, plusieurs développeurs qui travaillent sur
        le même domaine métier produisent du code spaghetti fortement
        couplé : chacun ajoute ses champs et ses méthodes là où c'est
        pratique sur le moment. Le <strong>diagramme de classes UML</strong>{" "}
        fixe une vue commune des structures et de leurs relations.
      </P>

      <H3>Visibilité</H3>
      <Table
        head={["Symbole", "Portée"]}
        rows={[
          ["+", "public — accessible depuis n'importe où"],
          ["-", "private — accessible uniquement dans la classe"],
          ["#", "protected — accessible dans la classe et ses sous-classes"],
          ["~", "package — accessible dans le même paquet"],
        ]}
      />

      <H3>Héritage vs composition vs agrégation</H3>
      <Table
        head={["Relation", "Sémantique", "Notation"]}
        rows={[
          ["Héritage", "« Est un » — spécialisation", "--|>"],
          ["Composition", "« A un » à mort partagée (le tout détruit ses parties)", "*--"],
          ["Agrégation", "« A un » à cycles de vie indépendants", "o--"],
        ]}
      />
      <Code>{`classDiagram
    class User {
        +UUID id
        -string passwordHash
        #string email
        +placeOrder(cart) Order
    }
    class Order {
        +UUID id
        -OrderLine[] lines
        +total() Money
    }
    class OrderLine {
        +UUID productId
        +int quantity
        +Money unitPrice
    }

    User o-- Order : passe
    Order *-- OrderLine : contient`}</Code>
      <P>
        Une <InlineCode>OrderLine</InlineCode> n'a aucun sens hors de sa{" "}
        <InlineCode>Order</InlineCode> : si la commande disparaît, ses
        lignes aussi — c'est une <strong>composition</strong>{" "}
        (<InlineCode>*--</InlineCode>). À l'inverse, une{" "}
        <InlineCode>Order</InlineCode> continue d'exister même si le compte{" "}
        <InlineCode>User</InlineCode> est supprimé (historique) : c'est une{" "}
        <strong>agrégation</strong> (<InlineCode>o--</InlineCode>).
      </P>
      <Note accent={UML_ACCENT}>
        Principe directeur : <em>« composition over inheritance »</em>.
        L'héritage fige une hiérarchie dès la compilation et fait fuiter les
        détails de la classe parente ; composer de petits objets
        collaborants reste plus souple à faire évoluer.
      </Note>

      <SourceLink href="https://mermaid.js.org/syntax/classDiagram.html">
        mermaid.js — Class Diagrams
      </SourceLink>
      {" · "}
      <SourceLink href="https://martinfowler.com/books/uml.html">
        martinfowler.com — UML Distilled (chapitre 3)
      </SourceLink>
      {" · "}
      <SourceLink href="https://en.wikipedia.org/wiki/Composition_over_inheritance">
        wikipedia.org — Composition over Inheritance
      </SourceLink>
    </div>
  );
}

/* ---------------------- API REST & CONTRATS ------------------------- */

function RestPrinciples() {
  return (
    <div>
      <H2 accent={API_ACCENT}>Principes fondamentaux de l'architecture RESTful</H2>
      <P>
        Les API de style RPC non standardisées —{" "}
        <InlineCode>POST /getUserData</InlineCode>,{" "}
        <InlineCode>GET /deleteUser?id=5</InlineCode> — exposent la logique
        interne du serveur dans l'URL, rendent le cache HTTP inopérant et
        obligent chaque client à apprendre un vocabulaire ad hoc.
      </P>

      <H3>L'idée de REST (Roy Fielding, 2000)</H3>
      <P>
        Les <strong>URL sont des noms</strong> qui identifient des{" "}
        <strong>ressources</strong> (<InlineCode>/users/42</InlineCode>,{" "}
        <InlineCode>/users/42/orders</InlineCode>) ; ce sont les{" "}
        <strong>verbes HTTP</strong> qui portent l'action.
      </P>
      <Table
        head={["Verbe", "Intention", "Idempotent"]}
        rows={[
          ["GET", "Lire une ressource", "oui"],
          ["POST", "Créer une ressource subordonnée", "non"],
          ["PUT", "Remplacer intégralement une ressource", "oui"],
          ["PATCH", "Modifier partiellement une ressource", "non"],
          ["DELETE", "Supprimer une ressource", "oui"],
        ]}
      />

      <H3>Sémantique des codes de statut</H3>
      <Table
        head={["Classe", "Codes courants", "Sens"]}
        rows={[
          ["2xx succès", "200, 201, 204", "La requête a abouti"],
          ["4xx erreur client", "400, 401, 403, 404, 409", "La requête est fautive, inutile de la rejouer telle quelle"],
          ["5xx erreur serveur", "500, 502, 503", "Le serveur a échoué ; la requête peut être valide"],
        ]}
      />
      <Code>{`GET    /articles           -> 200 + collection
POST   /articles           -> 201 + Location: /articles/99
GET    /articles/99        -> 200 + représentation
PUT    /articles/99        -> 200 (ou 204)
PATCH  /articles/99        -> 200
DELETE /articles/99        -> 204
GET    /articles/inconnu   -> 404
POST   /articles (doublon) -> 409 Conflict`}</Code>
      <Note accent={API_ACCENT}>
        <strong>Idempotent</strong> = rejouer la requête à l'identique
        laisse le serveur dans le même état.{" "}
        <InlineCode>DELETE</InlineCode> deux fois de suite : la ressource
        est absente dans les deux cas, l'état final est identique.
      </Note>

      <SourceLink href="https://datatracker.ietf.org/doc/html/rfc7231">
        ietf.org — RFC 7231 (HTTP/1.1 Semantics and Content)
      </SourceLink>
      {" · "}
      <SourceLink href="https://learn.microsoft.com/en-us/azure/architecture/best-practices/api-design">
        microsoft.com — API Design Best Practices
      </SourceLink>
    </div>
  );
}

function OpenApiSpec() {
  return (
    <div>
      <H2 accent={API_ACCENT}>La spécification OpenAPI 3.0 (OAS)</H2>
      <P>
        Une documentation d'API tenue à la main dans un wiki ou un PDF se
        désynchronise du code réel en quelques semaines. L'<strong>OpenAPI
        Specification</strong> (ex-Swagger) est un contrat{" "}
        <InlineCode>YAML</InlineCode> / <InlineCode>JSON</InlineCode>, lisible
        par des humains comme par des machines (génération de clients, de
        serveurs, de tests, d'interface de documentation).
      </P>

      <H3>Structure d'un document OAS</H3>
      <Table
        head={["Section", "Rôle"]}
        rows={[
          ["openapi", "Version de la spécification (ex. 3.0.3)"],
          ["info", "Titre, version, description de l'API"],
          ["servers", "URL de base des environnements"],
          ["paths", "Les routes, leurs verbes, paramètres et réponses"],
          ["components/schemas", "Définitions de données réutilisables"],
        ]}
      />

      <H3>Exemple : GET /users</H3>
      <Code>{`openapi: 3.0.3
info:
  title: API Utilisateurs
  version: 1.0.0
servers:
  - url: https://api.exemple.com/v1
paths:
  /users:
    get:
      summary: Liste les utilisateurs
      responses:
        "200":
          description: Collection d'utilisateurs
          content:
            application/json:
              schema:
                type: array
                items:
                  $ref: "#/components/schemas/User"
components:
  schemas:
    User:
      type: object
      required: [id, email]
      properties:
        id:
          type: string
          format: uuid
        email:
          type: string
          format: email
        displayName:
          type: string`}</Code>
      <Note accent={API_ACCENT}>
        Le mot-clé <InlineCode>$ref</InlineCode> pointe vers une définition
        unique (<InlineCode>#/components/schemas/User</InlineCode>) : le
        schéma <InlineCode>User</InlineCode> est décrit une seule fois puis
        référencé partout — principe DRY appliqué au contrat d'API.
      </Note>

      <SourceLink href="https://swagger.io/specification/">
        swagger.io — OpenAPI 3.0 Specification
      </SourceLink>
      {" · "}
      <SourceLink href="https://openapi-map.apihandyman.io/">
        openapi-map.apihandyman.io — OpenAPI Map
      </SourceLink>
    </div>
  );
}

function JsonSchemaValidation() {
  return (
    <div>
      <H2 accent={API_ACCENT}>Validation stricte via JSON Schema</H2>
      <P>
        Des données mal typées ou non validées à l'entrée d'une API peuvent
        faire planter le serveur, corrompre la base ou ouvrir la porte à des
        injections. <strong>JSON Schema</strong> est la première ligne de
        défense : un schéma déclaratif que la requête doit respecter avant
        même d'atteindre la logique métier.
      </P>

      <H3>Les mots-clés qui verrouillent</H3>
      <Table
        head={["Mot-clé", "Effet"]}
        rows={[
          ["required", "Liste des propriétés obligatoires"],
          ["additionalProperties: false", "Rejette toute propriété non déclarée"],
          ["format", "Valide une sémantique (uuid, date, email...)"],
          ["pattern", "Impose une expression régulière"],
          ["enum", "Restreint à une liste finie de valeurs légales"],
          ["minimum", "Borne numérique inférieure"],
        ]}
      />
      <Code>{`OrderPayload:
  type: object
  additionalProperties: false
  required: [customerId, currency, lines]
  properties:
    customerId:
      type: string
      format: uuid
    currency:
      type: string
      enum: [EUR, USD, GBP]
    couponCode:
      type: string
      pattern: "^[A-Z0-9]{6,12}$"
    lines:
      type: array
      minItems: 1
      items:
        type: object
        additionalProperties: false
        required: [sku, quantity]
        properties:
          sku:
            type: string
            pattern: "^SKU-[0-9]{8}$"
          quantity:
            type: integer
            minimum: 1`}</Code>
      <Note accent={API_ACCENT}>
        <InlineCode>additionalProperties: false</InlineCode> est
        l'interrupteur le plus important : sans lui, un client peut injecter{" "}
        <InlineCode>isAdmin: true</InlineCode> ou{" "}
        <InlineCode>price: 0</InlineCode> dans le payload sans déclencher
        d'erreur de validation (mass assignment).
      </Note>

      <SourceLink href="https://json-schema.org/understanding-json-schema/reference">
        json-schema.org — Understanding JSON Schema
      </SourceLink>
      {" · "}
      <SourceLink href="https://owasp.org/www-project-api-security/">
        owasp.org — API Security Top 10
      </SourceLink>
    </div>
  );
}

/* --------------------- SPÉCIFICATIONS & BDD ------------------------ */

function SpecPrdUserStory() {
  return (
    <div>
      <H2 accent={SPEC_ACCENT}>Le PRD, la User Story et les critères INVEST</H2>
      <P>
        Trop de spécification — le dossier de conception détaillé du cycle
        en V — noie la compréhension et vieillit mal. Pas assez — le simple
        post-it « Agile » — produit des fonctionnalités incomplètes, dont
        personne ne sait dire quand elles sont finies. Le{" "}
        <strong>Product Requirement Document</strong> (PRD) découpé en{" "}
        <strong>User Stories</strong> vise le juste milieu.
      </P>

      <H3>Anatomie d'une User Story</H3>
      <Ul>
        <li><strong>Titre</strong> — court, orienté valeur.</li>
        <li><strong>Description</strong> — « En tant que… / Je veux… / Afin de… ».</li>
        <li><strong>Critères d'acceptation</strong> — conditions vérifiables qui définissent « terminé ».</li>
      </Ul>
      <Code>{`Titre : Réserver un livre disponible

En tant qu'adhérent de la bibliothèque
Je veux réserver un livre actuellement disponible
Afin qu'il me soit mis de côté jusqu'à mon prochain passage

Critères d'acceptation
- Étant donné un livre au statut "disponible", quand je le réserve,
  alors son statut passe à "réservé" et une date limite de retrait
  à J+3 est affichée.
- Étant donné un livre déjà "réservé" ou "emprunté", quand j'essaie
  de le réserver, alors la réservation est refusée avec un message clair.
- Étant donné une réservation non retirée après J+3, quand le délai
  expire, alors le livre redevient "disponible".`}</Code>

      <H3>Les critères INVEST (Bill Wake)</H3>
      <Table
        head={["Lettre", "Critère", "Question de contrôle"]}
        rows={[
          ["I", "Independent", "Livrable sans dépendre d'une autre story ?"],
          ["N", "Negotiable", "Décrit un besoin, pas une solution figée ?"],
          ["V", "Valuable", "Apporte une valeur perceptible à l'utilisateur ?"],
          ["E", "Estimable", "L'équipe sait en estimer l'effort ?"],
          ["S", "Small", "Tient dans une itération ?"],
          ["T", "Testable", "On peut écrire un test qui prouve qu'elle est faite ?"],
        ]}
      />
      <Note accent={SPEC_ACCENT}>
        Une story qui échoue à « Testable » n'a pas de critères
        d'acceptation assez précis ; une story qui échoue à « Small » doit
        être découpée avant d'entrer en sprint.
      </Note>

      <SourceLink href="https://agilealliance.org/glossary/invest/">
        agilealliance.org — Bill Wake on INVEST
      </SourceLink>
      {" · "}
      <SourceLink href="https://www.mountaingoatsoftware.com/agile/user-stories">
        mountaingoatsoftware.com — User Stories (Mike Cohn)
      </SourceLink>
    </div>
  );
}

function BddGherkin() {
  return (
    <div>
      <H2 accent={SPEC_ACCENT}>Le Behavior-Driven Development (BDD) et Gherkin</H2>
      <P>
        Les tests unitaires classiques sont illisibles pour le métier ; les
        cahiers des charges Word deviennent obsolètes dès la première
        évolution du code. Le <strong>BDD</strong> (Dan North) répond aux
        deux : une seule description, en langage <strong>Gherkin</strong>,
        sert à la fois de spécification lisible et de test automatisé exécuté
        par Cucumber.
      </P>

      <H3>Grammaire Gherkin</H3>
      <Table
        head={["Mot-clé", "Rôle", "Phase de test"]}
        rows={[
          ["Feature", "Décrit la fonctionnalité et sa valeur", "—"],
          ["Background", "Étapes communes à tous les scénarios du fichier", "Arrange"],
          ["Given", "Contexte initial, état de départ", "Arrange"],
          ["When", "L'action déclenchante, unique", "Act"],
          ["Then", "Le résultat observable attendu", "Assert"],
          ["And / But", "Prolonge l'étape précédente", "idem"],
        ]}
      />
      <Code>{`Feature: Retrait d'espèces au distributeur
  Afin de disposer de liquide
  En tant que porteur de carte
  Je veux retirer de l'argent à un distributeur

  Background:
    Given un compte approvisionné de 500 EUR
    And une carte valide associée à ce compte

  Scenario: Retrait autorisé
    When je demande un retrait de 100 EUR
    Then le distributeur délivre 100 EUR
    And le solde du compte est de 400 EUR

  Scenario: Retrait refusé pour solde insuffisant
    When je demande un retrait de 600 EUR
    Then le distributeur refuse la transaction
    And le solde du compte reste de 500 EUR`}</Code>
      <Note accent={SPEC_ACCENT}>
        Le Gherkin décrit un <strong>comportement métier observable</strong>,
        jamais l'implémentation : on écrit « le solde est de 400 EUR », pas
        « la méthode <InlineCode>debit()</InlineCode> est appelée avec 100 ».
      </Note>

      <SourceLink href="https://dannorth.net/blog/introducing-bdd/">
        dannorth.net — Introducing BDD
      </SourceLink>
      {" · "}
      <SourceLink href="https://cucumber.io/docs/gherkin/reference/">
        cucumber.io — Gherkin Syntax
      </SourceLink>
    </div>
  );
}

function BddScenarioOutline() {
  return (
    <div>
      <H2 accent={SPEC_ACCENT}>La gestion de la complexité (Scenario Outline & Examples)</H2>
      <P>
        Écrire un <InlineCode>Scenario</InlineCode> distinct pour chaque
        combinaison (5 pays × 3 devises = 15 scénarios quasi identiques)
        produit des fichiers Gherkin monstrueux et illisibles. Le{" "}
        <strong>Scenario Outline</strong> factorise : un gabarit avec des
        variables <InlineCode>{"<placeholder>"}</InlineCode> et un bloc{" "}
        <InlineCode>Examples:</InlineCode> qui fournit les jeux de données.
      </P>
      <P>
        Cucumber exécute <strong>une ligne du tableau = un test
        indépendant</strong> : c'est le principe DRY appliqué aux
        spécifications.
      </P>
      <Code>{`Feature: Calcul du taux marginal d'imposition

  Scenario Outline: Tranche applicable selon le revenu
    Given un contribuable "<pays>" avec un revenu annuel de <revenu>
    When je calcule le taux marginal
    Then le taux appliqué est <taux>

    Examples: France (barème simplifié)
      | pays   | revenu | taux |
      | France | 10000  | 0%   |
      | France | 30000  | 11%  |
      | France | 90000  | 41%  |

    Examples: Suisse (barème fédéral simplifié)
      | pays   | revenu | taux  |
      | Suisse | 20000  | 0.77% |
      | Suisse | 80000  | 5.94% |
      | Suisse | 200000 | 11.5% |

    Examples: Cas d'erreur
      | pays   | revenu | taux                   |
      | France | -1     | erreur:revenu_invalide |
      | Utopie | 30000  | erreur:pays_inconnu    |`}</Code>
      <Note accent={SPEC_ACCENT}>
        Plusieurs blocs <InlineCode>Examples:</InlineCode> peuvent suivre le
        même <InlineCode>Scenario Outline</InlineCode> : on les nomme pour
        regrouper les cas par intention (nominal France, nominal Suisse, cas
        d'erreur) tout en gardant un seul gabarit d'étapes.
      </Note>

      <SourceLink href="https://cucumber.io/docs/gherkin/reference/#scenario-outline">
        cucumber.io — Scenario Outlines and Data Tables
      </SourceLink>
    </div>
  );
}

/* --------------------- URBANISATION DU SI ------------------------- */

function UrbanInformation() {
  return (
    <div>
      <H2 accent={URBA_ACCENT}>L'urbanisation de l'information (aligner les silos)</H2>
      <P>
        Quand chaque couche optimise son propre modèle dans son coin — le
        DBA normalise ses tables, le back-end façonne ses objets métier, le
        front-end réclame une structure adaptée à l'affichage — il faut
        écrire, à chaque frontière, un code de <strong>mapping</strong> :
        coûteux, répétitif, source de bugs silencieux et de dette de
        maintenabilité.
      </P>

      <H3>La métaphore de l'urbanisme</H3>
      <P>
        On urbanise un système d'information comme une ville : des quartiers
        (domaines) aux responsabilités claires, des voies de circulation
        (échanges) normalisées, un plan d'ensemble qui empêche les
        constructions anarchiques. Trois modèles ne sont alors que{" "}
        <strong>trois vues d'une même réalité métier</strong> :
      </P>
      <Table
        head={["Vue", "Formalisme", "Répond à"]}
        rows={[
          ["Modèle de données", "Merise / SQL", "Comment l'information est stockée"],
          ["Modèle de traitement", "UML", "Comment l'information est transformée"],
          ["Modèle d'échange", "OpenAPI", "Comment l'information circule entre systèmes"],
        ]}
      />
      <Note accent={URBA_ACCENT}>
        Objectif : l'information doit transiter d'une couche à l'autre avec
        un <strong>minimum de transformations structurelles</strong>, en
        conservant son intégrité ontologique — un{" "}
        <InlineCode>Client</InlineCode> reste le même concept, avec les mêmes
        attributs et les mêmes règles, de la table à la réponse JSON.
      </Note>

      <H3>En pratique</H3>
      <Ul>
        <li>Un dictionnaire de données unique, partagé par les trois modèles.</li>
        <li>Des identifiants stables (mêmes clés, mêmes types) d'un bout à l'autre.</li>
        <li>Des frontières explicites : on sait où et pourquoi une transformation a lieu, elle n'est jamais subie.</li>
      </Ul>

      <SourceLink href="https://martinfowler.com/articles/microservices.html">
        martinfowler.com — Microservices & Componentization
      </SourceLink>
    </div>
  );
}

function InterModelConsistency() {
  return (
    <div>
      <H2 accent={URBA_ACCENT}>La cohérence inter-modèles (la chasse à la friction sémantique)</H2>
      <P>
        Un même concept métier finit souvent nommé différemment selon la
        couche : <InlineCode>sku_code</InlineCode> en SQL,{" "}
        <InlineCode>ProductIdentifier</InlineCode> en UML,{" "}
        <InlineCode>article_id</InlineCode> dans l'API, « Référence
        Catalogue » dans les scénarios Gherkin. Cette <strong>dette
        sémantique invisible</strong> oblige à des conversions DTO / ORM
        coûteuses et rend le débogage difficile : suivre une donnée revient
        à traduire son nom à chaque étape.
      </P>

      <H3>Viser l'isomorphisme via un dictionnaire de données unifié</H3>
      <Table
        head={["Dimension", "Règle", "Contre-exemple"]}
        rows={[
          ["Type Matching", "Le même concept porte le même type partout (UUID en base, UUID en UML, format uuid en API)", "id en BIGINT côté SQL mais string côté API"],
          ["Naming Matching", "Le même mot désigne le concept dans toutes les couches, validé par la gouvernance", "customer / client / user / account pour la même entité"],
        ]}
      />
      <Code>{`# Dictionnaire de données — entrée unique
Concept       : Référence produit
Nom canonique : product_reference
Type          : string, pattern ^SKU-[0-9]{8}$
SQL           : product.product_reference   (text, UNIQUE)
UML           : Product.productReference : String
OpenAPI       : Product.productReference   (type: string)
Gherkin       : "la référence produit <product_reference>"`}</Code>
      <Note accent={URBA_ACCENT}>
        C'est le <em>ubiquitous language</em> du Domain-Driven Design : un
        vocabulaire unique, partagé par le métier et toutes les couches
        techniques, qui supprime la traduction plutôt que de l'outiller.
      </Note>

      <SourceLink href="https://martinfowler.com/bliki/UbiquitousLanguage.html">
        martinfowler.com — Ubiquitous Language
      </SourceLink>
      {" · "}
      <SourceLink href="https://www.domainlanguage.com/ddd/reference/">
        domainlanguage.com — DDD Reference (Eric Evans)
      </SourceLink>
    </div>
  );
}

function DocsAsCodeSsot() {
  return (
    <div>
      <H2 accent={URBA_ACCENT}>Le blueprint de production (Documentation as Code & SSOT)</H2>
      <P>
        Wikis, documents Word et schémas Visio partagent le même défaut :
        leur mise à jour est manuelle, donc elle n'est jamais faite. Six
        mois plus tard, la documentation décrit un système qui n'existe
        plus.
      </P>

      <H3>La Source Unique de Vérité (SSOT)</H3>
      <P>
        La <strong>Documentation as Code</strong> ne conserve que des
        fichiers texte brut, versionnés nativement sous Git, dans le même
        dépôt que le code source :
      </P>
      <Table
        head={["Artefact", "Format", "Décrit"]}
        rows={[
          [".sql", "DDL PostgreSQL", "Le modèle physique de données"],
          [".md + Mermaid", "Markdown", "Les diagrammes UML et d'architecture"],
          [".yaml", "OpenAPI", "Le contrat d'API"],
          [".feature", "Gherkin", "Le comportement métier attendu"],
          ["ADR (.md)", "Markdown", "Les décisions d'architecture et leur justification"],
        ]}
      />
      <Code>{`repo/
├── src/                      # code applicatif
├── db/schema.sql             # MPD — source de vérité du schéma
├── docs/
│   ├── architecture.md       # diagrammes Mermaid
│   └── adr/
│       └── 0007-repository-pattern.md
├── api/openapi.yaml          # contrat d'API
└── features/
    └── retrait_atm.feature   # spécification exécutable`}</Code>
      <Note accent={URBA_ACCENT}>
        Conséquence directe : une <strong>Pull Request modifie le code ET
        sa documentation ensemble</strong>, en une seule étape atomique de
        revue. Un schéma qui diverge du code devient un diff visible — donc
        un point de blocage en revue, plus une dérive silencieuse.
      </Note>

      <SourceLink href="https://www.writethedocs.org/guide/docs-as-code/">
        writethedocs.org — Docs as Code Methodology
      </SourceLink>
      {" · "}
      <SourceLink href="https://adr.github.io/">
        adr.github.io — Architecture Decision Records (ADR)
      </SourceLink>
    </div>
  );
}

/* ---------------------------------------------------------------------- */
/* Navigation config                                                       */
/* ---------------------------------------------------------------------- */

const NAV = [
  {
    id: "overview",
    label: "Vue d'ensemble",
    icon: Sparkles,
    accent: TOOL_ACCENT,
    Component: Overview,
  },
  {
    group: "React",
    accent: REACT_ACCENT,
    icon: Component,
    items: [
      { id: "react-basics", label: "Les bases", icon: BookOpen, Component: ReactBasics },
      { id: "react-setup", label: "Monter un projet", icon: Wrench, Component: ReactSetup },
      { id: "react-deploy", label: "Déployer", icon: UploadCloud, Component: ReactDeploy },
    ],
  },
  {
    group: "Vue.js",
    accent: VUE_ACCENT,
    icon: Leaf,
    items: [
      { id: "vue-basics", label: "Les bases", icon: BookOpen, Component: VueBasics },
      { id: "vue-setup", label: "Monter un projet", icon: Wrench, Component: VueSetup },
      { id: "vue-deploy", label: "Déployer", icon: UploadCloud, Component: VueDeploy },
    ],
  },
  {
    group: "Svelte",
    accent: SVELTE_ACCENT,
    icon: Flame,
    items: [
      { id: "svelte-basics", label: "Les bases", icon: BookOpen, Component: SvelteBasics },
      { id: "svelte-setup", label: "Monter un projet", icon: Wrench, Component: SvelteSetup },
      { id: "svelte-deploy", label: "Déployer", icon: UploadCloud, Component: SvelteDeploy },
    ],
  },
  {
    group: "Docker",
    accent: DOCKER_ACCENT,
    icon: Container,
    items: [
      { id: "docker-basics", label: "Les bases", icon: BookOpen, Component: DockerBasics },
      { id: "docker-dockerfile", label: "Le Dockerfile", icon: Wrench, Component: DockerDockerfile },
      { id: "docker-compose", label: "Docker Compose", icon: Boxes, Component: DockerCompose },
      { id: "docker-security", label: "Volumes, réseaux & sécurité", icon: Lock, Component: DockerSecurity },
    ],
  },
  {
    group: "DevOps & Git",
    accent: DEVOPS_ACCENT,
    icon: GitBranch,
    items: [
      { id: "devops-culture", label: "Culture (CALMS)", icon: ShieldCheck, Component: DevOpsCulture },
      { id: "devops-metrics", label: "Métriques DORA", icon: Rocket, Component: DevOpsMetrics },
      { id: "git-workflows", label: "Workflows Git", icon: GitBranch, Component: GitWorkflows },
    ],
  },
  {
    group: "CI/CD",
    accent: CI_ACCENT,
    icon: PlayCircle,
    items: [
      { id: "ci-basics", label: "Les bases d'un workflow", icon: BookOpen, Component: CIBasics },
      { id: "ci-secrets-matrix", label: "Secrets, cache & matrices", icon: Lock, Component: CISecretsMatrix },
      { id: "ci-publish-docker", label: "Publier une image Docker", icon: UploadCloud, Component: CIPublishDocker },
    ],
  },
  {
    group: "Analyse & Conception",
    accent: MERISE_ACCENT,
    icon: Database,
    items: [
      { id: "merise-entities", label: "Entités & propriétés", icon: BookOpen, Component: MeriseEntities },
      { id: "merise-cardinalities", label: "Associations & cardinalités", icon: GitBranch, Component: MeriseCardinalities },
      { id: "merise-porteuse", label: "L'association porteuse", icon: Boxes, Component: MeriseAssociationPorteuse },
      { id: "merise-normalization", label: "Normalisation (1NF-3NF)", icon: ShieldCheck, Component: MeriseNormalization },
    ],
  },
  {
    group: "Architecture & Patterns",
    accent: ARCH_ACCENT,
    icon: Layers,
    items: [
      { id: "arch-repository", label: "Repository & inversion des dépendances", icon: Boxes, Component: ArchRepository },
      { id: "arch-dynamic-diagrams", label: "Séquence & états-transitions", icon: Workflow, Component: ArchDynamicDiagrams },
    ],
  },
  {
    group: "Modélisation des données",
    accent: MERISE_ACCENT,
    icon: Database,
    items: [
      { id: "data-business-rules", label: "Règles de gestion & cardinalités", icon: Table2, Component: DataBusinessRules },
      { id: "data-normalization-strict", label: "Normalisation stricte (1NF-3NF)", icon: ShieldCheck, Component: DataNormalizationStrict },
      { id: "data-physical-model", label: "MLD & MPD — contraintes SQL", icon: KeyRound, Component: DataPhysicalModel },
    ],
  },
  {
    group: "UML",
    accent: UML_ACCENT,
    icon: Component,
    items: [
      { id: "uml-class-diagram", label: "Diagramme de classes & UML avancé", icon: Share2, Component: UmlClassDiagram },
    ],
  },
  {
    group: "API REST & Contrats",
    accent: API_ACCENT,
    icon: Network,
    items: [
      { id: "rest-principles", label: "Architecture RESTful", icon: Network, Component: RestPrinciples },
      { id: "openapi-spec", label: "Spécification OpenAPI 3.0", icon: FileJson, Component: OpenApiSpec },
      { id: "json-schema-validation", label: "Validation via JSON Schema", icon: ListChecks, Component: JsonSchemaValidation },
    ],
  },
  {
    group: "Spécifications & BDD",
    accent: SPEC_ACCENT,
    icon: BookOpen,
    items: [
      { id: "spec-prd-user-story", label: "PRD, User Story & INVEST", icon: ClipboardCheck, Component: SpecPrdUserStory },
      { id: "bdd-gherkin", label: "BDD & Gherkin", icon: ScrollText, Component: BddGherkin },
      { id: "bdd-scenario-outline", label: "Scenario Outline & Examples", icon: Table2, Component: BddScenarioOutline },
    ],
  },
  {
    group: "Urbanisation du SI",
    accent: URBA_ACCENT,
    icon: Building2,
    items: [
      { id: "urban-information", label: "Urbanisation de l'information", icon: Building2, Component: UrbanInformation },
      { id: "inter-model-consistency", label: "Cohérence inter-modèles", icon: GitPullRequest, Component: InterModelConsistency },
      { id: "docs-as-code-ssot", label: "Documentation as Code & SSOT", icon: FileCode, Component: DocsAsCodeSsot },
    ],
  },
  {
    id: "tooling",
    label: "Outillage commun",
    icon: Terminal,
    accent: TOOL_ACCENT,
    Component: CommonTooling,
  },
];

function findComponent(id) {
  for (const entry of NAV) {
    if (entry.id === id) return entry.Component;
    if (entry.items) {
      const found = entry.items.find((i) => i.id === id);
      if (found) return found.Component;
    }
  }
  return Overview;
}

/* ---------------------------------------------------------------------- */
/* App                                                                     */
/* ---------------------------------------------------------------------- */

export default function App() {
  const [active, setActive] = useState("overview");
  const [mobileOpen, setMobileOpen] = useState(false);
  const ActiveComponent = findComponent(active);

  function go(id) {
    setActive(id);
    setMobileOpen(false);
  }

  return (
    <div
      style={{
        display: "flex",
        minHeight: "100vh",
        background: INK,
        fontFamily: FONT_BODY,
      }}
    >
      {/* Mobile top bar */}
      <div
        style={{
          display: "none",
        }}
        className="mobile-topbar"
      />

      {/* Sidebar */}
      <aside
        style={{
          width: 268,
          flexShrink: 0,
          borderRight: `1px solid ${LINE}`,
          background: PANEL,
          padding: "22px 16px",
          position: "sticky",
          top: 0,
          height: "100vh",
          overflowY: "auto",
        }}
        className={`sidebar ${mobileOpen ? "sidebar-open" : ""}`}
      >
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 22 }}>
          <div>
            <div style={{ fontFamily: FONT_DISPLAY, fontSize: 19, color: TEXT, lineHeight: 1.2 }}>
              Holberton
            </div>
            <div style={{ color: MUTED, fontSize: 12.5, letterSpacing: 0.2 }}>
              spé Full Stack
            </div>
          </div>
          <button
            onClick={() => setMobileOpen(false)}
            className="close-btn"
            style={{
              display: "none",
              background: "transparent",
              border: "none",
              color: MUTED,
              cursor: "pointer",
            }}
          >
            <X size={20} />
          </button>
        </div>

        <nav style={{ display: "flex", flexDirection: "column", gap: 2 }}>
          {NAV.map((entry, idx) =>
            entry.items ? (
              <div key={entry.group} style={{ marginTop: idx === 0 ? 0 : 18 }}>
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 7,
                    color: entry.accent,
                    fontSize: 12.5,
                    fontWeight: 700,
                    textTransform: "none",
                    padding: "4px 10px",
                    marginBottom: 4,
                  }}
                >
                  <entry.icon size={14} />
                  {entry.group}
                </div>
                {entry.items.map((item) => (
                  <NavButton
                    key={item.id}
                    item={item}
                    active={active === item.id}
                    accent={entry.accent}
                    onClick={() => go(item.id)}
                  />
                ))}
              </div>
            ) : (
              <NavButton
                key={entry.id}
                item={entry}
                active={active === entry.id}
                accent={entry.accent}
                onClick={() => go(entry.id)}
                topLevel
              />
            )
          )}
        </nav>
      </aside>

      {mobileOpen && (
        <div
          onClick={() => setMobileOpen(false)}
          className="overlay"
          style={{
            display: "none",
            position: "fixed",
            inset: 0,
            background: "rgba(0,0,0,0.5)",
            zIndex: 5,
          }}
        />
      )}

      {/* Main content */}
      <main style={{ flex: 1, minWidth: 0 }}>
        <div
          className="topbar-mobile"
          style={{
            display: "none",
            alignItems: "center",
            gap: 12,
            padding: "14px 20px",
            borderBottom: `1px solid ${LINE}`,
            position: "sticky",
            top: 0,
            background: INK,
            zIndex: 4,
          }}
        >
          <button
            onClick={() => setMobileOpen(true)}
            style={{ background: "transparent", border: "none", color: TEXT, cursor: "pointer" }}
          >
            <Menu size={22} />
          </button>
          <span style={{ fontFamily: FONT_DISPLAY, fontSize: 17, color: TEXT }}>
            Holberton spé Full Stack
          </span>
        </div>

        <div style={{ maxWidth: 760, margin: "0 auto", padding: "44px 32px 90px" }}>
          {ActiveComponent && <ActiveComponent />}
        </div>
      </main>

      <style>{`
        a:hover { color: ${TEXT} !important; }
        @media (max-width: 860px) {
          .sidebar {
            position: fixed !important;
            left: -280px;
            top: 0;
            z-index: 10;
            transition: left 0.2s ease;
            box-shadow: 0 0 40px rgba(0,0,0,0.5);
          }
          .sidebar-open { left: 0 !important; }
          .close-btn { display: inline-flex !important; }
          .overlay { display: block !important; }
          .topbar-mobile { display: flex !important; }
        }
      `}</style>
    </div>
  );
}

function NavButton({ item, active, accent, onClick, topLevel }) {
  const Icon = item.icon;
  return (
    <button
      onClick={onClick}
      style={{
        display: "flex",
        alignItems: "center",
        gap: 9,
        width: "100%",
        textAlign: "left",
        padding: topLevel ? "9px 10px" : "8px 10px 8px 22px",
        borderRadius: 7,
        border: "none",
        cursor: "pointer",
        background: active ? "rgba(255,255,255,0.06)" : "transparent",
        color: active ? TEXT : MUTED,
        fontSize: 14,
        fontFamily: FONT_BODY,
        fontWeight: topLevel ? 600 : 500,
        marginBottom: 1,
      }}
    >
      {topLevel && <Icon size={15} color={active ? accent : MUTED} />}
      <span style={{ flex: 1 }}>{item.label}</span>
      {active && <ChevronRight size={14} color={accent} />}
    </button>
  );
}
