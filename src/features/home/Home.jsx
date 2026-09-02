/* Page d'accueil : but du site, organisation, lien du dépôt. */
import { H2, H3, P, Ul, Note, SourceLink, InlineCode } from "../../shared/ui/primitives.jsx";
import { REACT_ACCENT, TOOL_ACCENT, DEVOPS_ACCENT } from "../../shared/ui/tokens.js";

export default function Home() {
  return (
    <div>
      <H2 accent={REACT_ACCENT}>À propos de ce site</H2>

      <P>
        Ce site répertorie <strong>toutes les notions vues depuis le début de
        l&apos;année</strong> dans la spécialisation Holberton Full Stack. Il sert
        d&apos;aide-mémoire unique et sera <strong>mis à jour à chaque nouvelle
        notion</strong> abordée en cours, semaine après semaine.
      </P>
      <P>
        Chaque semaine <em>ajoute</em> des sections ; rien n&apos;est retiré. On
        peut donc y revenir à tout moment pour réviser un point précis sans
        rouvrir l&apos;ensemble des supports.
      </P>

      <H3>Comment c&apos;est organisé</H3>
      <Ul>
        <li>
          Quatre domaines dans la barre latérale, repliables :{" "}
          <strong>Frontend</strong>, <strong>Backend</strong>,{" "}
          <strong>DevOps</strong> et{" "}
          <strong>Documentation &amp; méthode</strong>.
        </li>
        <li>
          Une <strong>recherche plein texte</strong> : taper un mot-clé
          (ex. <InlineCode>uml</InlineCode>, <InlineCode>docker</InlineCode>,{" "}
          <InlineCode>rest</InlineCode>) liste toutes les sections qui en parlent.
        </li>
        <li>
          Chaque section suit la même trame —{" "}
          <strong>Problème → Solution → exemples → ressources</strong> — avec des
          blocs de code colorés et, quand c&apos;est utile, un diagramme Mermaid.
        </li>
        <li>
          Chaque section a un lien permanent via son <InlineCode>#hash</InlineCode>{" "}
          (partageable, réutilisé par le bouton précédent/suivant du navigateur).
        </li>
      </Ul>

      <H3>Fait « selon les règles »</H3>
      <P>
        Le site cherche à <strong>appliquer</strong> — ou à s&apos;en approcher au
        maximum — les bonnes pratiques décrites dans les documentations
        actuelles, en restant 100 % statique :
      </P>
      <Ul>
        <li>Performance, accessibilité, bonnes pratiques et SEO au vert (audit Lighthouse).</li>
        <li>
          Responsive <strong>mobile-first</strong>, chargement des sections à la
          demande (<InlineCode>React.lazy</InlineCode> / <InlineCode>Suspense</InlineCode>).
        </li>
        <li>
          <strong>Documentation as Code</strong> : diagrammes, modèle SQL et
          contrat d&apos;API (OpenAPI) versionnés avec le code, source unique de
          vérité.
        </li>
        <li>
          <strong>Conventional Commits</strong>, CI (lint + tests + build sur
          plusieurs versions de Node) et déploiement continu à chaque{" "}
          <InlineCode>push</InlineCode>.
        </li>
        <li>
          En-têtes de sécurité (HTTPS/HSTS, CSP, <InlineCode>X-Frame-Options</InlineCode>,
          COOP), <InlineCode>robots.txt</InlineCode> et <InlineCode>llms.txt</InlineCode> valides.
        </li>
      </Ul>

      <Note accent={DEVOPS_ACCENT}>
        Le dépôt est <strong>public</strong> : sa structure fait elle-même partie
        de la révision (React/Vite, ESLint, Docker, GitHub Actions, nginx, Merise,
        UML…). Aucune information sensible n&apos;y figure — les secrets de
        déploiement (clé SSH, hôte du VPS) vivent uniquement dans les réglages
        <em> Actions</em> de GitHub, jamais dans le code.
      </Note>

      <H3>Code source</H3>
      <P>
        <SourceLink href="https://github.com/tomvieilledent/holberton-spe-fullstack">
          github.com/tomvieilledent/holberton-spe-fullstack
        </SourceLink>
      </P>
      <Note accent={TOOL_ACCENT}>
        Pour contribuer à l&apos;évolution hebdomadaire : voir{" "}
        <InlineCode>CONTRIBUTING.md</InlineCode> (une section = un fichier dans{" "}
        <InlineCode>src/features/</InlineCode>, déclarée dans{" "}
        <InlineCode>src/app/nav.js</InlineCode>) et <InlineCode>docs/curriculum.md</InlineCode>{" "}
        pour le suivi des semaines.
      </Note>
    </div>
  );
}
