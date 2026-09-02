import { Code, InlineCode, P, H2, H3, Ul, Note, Table, SourceLink } from "../../shared/ui/primitives.jsx";
import { SPEC_ACCENT } from "../../shared/ui/tokens.js";

export default function SpecPrdUserStory() {
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
