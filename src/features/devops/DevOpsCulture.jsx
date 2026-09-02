import { Code, InlineCode, P, H2, H3, Ul, Note, Table, SourceLink } from "../../shared/ui/primitives.jsx";
import { DEVOPS_ACCENT } from "../../shared/ui/tokens.js";

export default function DevOpsCulture() {
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
