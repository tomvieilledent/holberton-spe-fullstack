import { Code, InlineCode, P, H2, H3, Ul, Note, Table, SourceLink } from "../../shared/ui/primitives.jsx";
import { DEVOPS_ACCENT } from "../../shared/ui/tokens.js";

export default function GitWorkflows() {
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
