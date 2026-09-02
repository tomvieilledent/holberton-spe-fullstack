import { Code, InlineCode, P, H2, H3, Ul, Note, Table, SourceLink } from "../../shared/ui/primitives.jsx";
import { REACT_ACCENT } from "../../shared/ui/tokens.js";

export default function ReactDeploy() {
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
