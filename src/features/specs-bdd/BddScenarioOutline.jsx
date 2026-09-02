import { Code, InlineCode, P, H2, H3, Ul, Note, Table, SourceLink } from "../../shared/ui/primitives.jsx";
import { SPEC_ACCENT } from "../../shared/ui/tokens.js";

export default function BddScenarioOutline() {
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
