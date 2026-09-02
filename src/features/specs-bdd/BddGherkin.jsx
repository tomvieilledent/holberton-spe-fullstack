import { Code, InlineCode, P, H2, H3, Ul, Note, Table, SourceLink } from "../../shared/ui/primitives.jsx";
import { SPEC_ACCENT } from "../../shared/ui/tokens.js";

export default function BddGherkin() {
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
