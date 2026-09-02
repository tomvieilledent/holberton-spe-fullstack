import { Code, InlineCode, P, H2, H3, Ul, Note, Table, SourceLink } from "../../shared/ui/primitives.jsx";
import { TOOL_ACCENT } from "../../shared/ui/tokens.js";

export default function CommonTooling() {
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
