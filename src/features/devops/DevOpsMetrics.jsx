import { Code, InlineCode, P, H2, H3, Ul, Note, Table, SourceLink } from "../../shared/ui/primitives.jsx";
import { DEVOPS_ACCENT } from "../../shared/ui/tokens.js";

export default function DevOpsMetrics() {
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
