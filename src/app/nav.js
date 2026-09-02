/* Configuration de navigation — assemblée à partir des features. */
import { lazy } from "react";
import { BookOpen, Boxes, Building2, ClipboardCheck, Component, Container, Database, FileCode, FileJson, Flame, GitBranch, GitPullRequest, KeyRound, Layers, Leaf, ListChecks, Lock, Network, PlayCircle, Rocket, ScrollText, Share2, ShieldCheck, Sparkles, Table2, Terminal, UploadCloud, Workflow, Wrench } from "lucide-react";
import { API_ACCENT, ARCH_ACCENT, CI_ACCENT, DEVOPS_ACCENT, DOCKER_ACCENT, MERISE_ACCENT, REACT_ACCENT, SPEC_ACCENT, SVELTE_ACCENT, TOOL_ACCENT, UML_ACCENT, URBA_ACCENT, VUE_ACCENT } from "../shared/ui/tokens.js";

export const NAV = [
  {
    id: "overview",
    label: "Vue d'ensemble",
    icon: Sparkles,
    accent: TOOL_ACCENT,
    Component: lazy(() => import("../features/overview/Overview.jsx")),
  },
  {
    group: "React",
    accent: REACT_ACCENT,
    icon: Component,
    items: [
      { id: "react-basics", label: "Les bases", icon: BookOpen, Component: lazy(() => import("../features/react/ReactBasics.jsx")) },
      { id: "react-setup", label: "Monter un projet", icon: Wrench, Component: lazy(() => import("../features/react/ReactSetup.jsx")) },
      { id: "react-deploy", label: "Déployer", icon: UploadCloud, Component: lazy(() => import("../features/react/ReactDeploy.jsx")) },
    ],
  },
  {
    group: "Vue.js",
    accent: VUE_ACCENT,
    icon: Leaf,
    items: [
      { id: "vue-basics", label: "Les bases", icon: BookOpen, Component: lazy(() => import("../features/vue/VueBasics.jsx")) },
      { id: "vue-setup", label: "Monter un projet", icon: Wrench, Component: lazy(() => import("../features/vue/VueSetup.jsx")) },
      { id: "vue-deploy", label: "Déployer", icon: UploadCloud, Component: lazy(() => import("../features/vue/VueDeploy.jsx")) },
    ],
  },
  {
    group: "Svelte",
    accent: SVELTE_ACCENT,
    icon: Flame,
    items: [
      { id: "svelte-basics", label: "Les bases", icon: BookOpen, Component: lazy(() => import("../features/svelte/SvelteBasics.jsx")) },
      { id: "svelte-setup", label: "Monter un projet", icon: Wrench, Component: lazy(() => import("../features/svelte/SvelteSetup.jsx")) },
      { id: "svelte-deploy", label: "Déployer", icon: UploadCloud, Component: lazy(() => import("../features/svelte/SvelteDeploy.jsx")) },
    ],
  },
  {
    group: "Docker",
    accent: DOCKER_ACCENT,
    icon: Container,
    items: [
      { id: "docker-basics", label: "Les bases", icon: BookOpen, Component: lazy(() => import("../features/docker/DockerBasics.jsx")) },
      { id: "docker-dockerfile", label: "Le Dockerfile", icon: Wrench, Component: lazy(() => import("../features/docker/DockerDockerfile.jsx")) },
      { id: "docker-compose", label: "Docker Compose", icon: Boxes, Component: lazy(() => import("../features/docker/DockerCompose.jsx")) },
      { id: "docker-security", label: "Volumes, réseaux & sécurité", icon: Lock, Component: lazy(() => import("../features/docker/DockerSecurity.jsx")) },
    ],
  },
  {
    group: "DevOps & Git",
    accent: DEVOPS_ACCENT,
    icon: GitBranch,
    items: [
      { id: "devops-culture", label: "Culture (CALMS)", icon: ShieldCheck, Component: lazy(() => import("../features/devops/DevOpsCulture.jsx")) },
      { id: "devops-metrics", label: "Métriques DORA", icon: Rocket, Component: lazy(() => import("../features/devops/DevOpsMetrics.jsx")) },
      { id: "git-workflows", label: "Workflows Git", icon: GitBranch, Component: lazy(() => import("../features/devops/GitWorkflows.jsx")) },
    ],
  },
  {
    group: "CI/CD",
    accent: CI_ACCENT,
    icon: PlayCircle,
    items: [
      { id: "ci-basics", label: "Les bases d'un workflow", icon: BookOpen, Component: lazy(() => import("../features/cicd/CIBasics.jsx")) },
      { id: "ci-secrets-matrix", label: "Secrets, cache & matrices", icon: Lock, Component: lazy(() => import("../features/cicd/CISecretsMatrix.jsx")) },
      { id: "ci-publish-docker", label: "Publier une image Docker", icon: UploadCloud, Component: lazy(() => import("../features/cicd/CIPublishDocker.jsx")) },
    ],
  },
  {
    group: "Analyse & Conception",
    accent: MERISE_ACCENT,
    icon: Database,
    items: [
      { id: "merise-entities", label: "Entités & propriétés", icon: BookOpen, Component: lazy(() => import("../features/merise/MeriseEntities.jsx")) },
      { id: "merise-cardinalities", label: "Associations & cardinalités", icon: GitBranch, Component: lazy(() => import("../features/merise/MeriseCardinalities.jsx")) },
      { id: "merise-porteuse", label: "L'association porteuse", icon: Boxes, Component: lazy(() => import("../features/merise/MeriseAssociationPorteuse.jsx")) },
      { id: "merise-normalization", label: "Normalisation (1NF-3NF)", icon: ShieldCheck, Component: lazy(() => import("../features/merise/MeriseNormalization.jsx")) },
    ],
  },
  {
    group: "Architecture & Patterns",
    accent: ARCH_ACCENT,
    icon: Layers,
    items: [
      { id: "arch-repository", label: "Repository & inversion des dépendances", icon: Boxes, Component: lazy(() => import("../features/architecture/ArchRepository.jsx")) },
      { id: "arch-dynamic-diagrams", label: "Séquence & états-transitions", icon: Workflow, Component: lazy(() => import("../features/architecture/ArchDynamicDiagrams.jsx")) },
    ],
  },
  {
    group: "Modélisation des données",
    accent: MERISE_ACCENT,
    icon: Database,
    items: [
      { id: "data-business-rules", label: "Règles de gestion & cardinalités", icon: Table2, Component: lazy(() => import("../features/data-modeling/DataBusinessRules.jsx")) },
      { id: "data-normalization-strict", label: "Normalisation stricte (1NF-3NF)", icon: ShieldCheck, Component: lazy(() => import("../features/data-modeling/DataNormalizationStrict.jsx")) },
      { id: "data-physical-model", label: "MLD & MPD — contraintes SQL", icon: KeyRound, Component: lazy(() => import("../features/data-modeling/DataPhysicalModel.jsx")) },
    ],
  },
  {
    group: "UML",
    accent: UML_ACCENT,
    icon: Component,
    items: [
      { id: "uml-class-diagram", label: "Diagramme de classes & UML avancé", icon: Share2, Component: lazy(() => import("../features/uml/UmlClassDiagram.jsx")) },
    ],
  },
  {
    group: "API REST & Contrats",
    accent: API_ACCENT,
    icon: Network,
    items: [
      { id: "rest-principles", label: "Architecture RESTful", icon: Network, Component: lazy(() => import("../features/api-rest/RestPrinciples.jsx")) },
      { id: "openapi-spec", label: "Spécification OpenAPI 3.0", icon: FileJson, Component: lazy(() => import("../features/api-rest/OpenApiSpec.jsx")) },
      { id: "json-schema-validation", label: "Validation via JSON Schema", icon: ListChecks, Component: lazy(() => import("../features/api-rest/JsonSchemaValidation.jsx")) },
    ],
  },
  {
    group: "Spécifications & BDD",
    accent: SPEC_ACCENT,
    icon: BookOpen,
    items: [
      { id: "spec-prd-user-story", label: "PRD, User Story & INVEST", icon: ClipboardCheck, Component: lazy(() => import("../features/specs-bdd/SpecPrdUserStory.jsx")) },
      { id: "bdd-gherkin", label: "BDD & Gherkin", icon: ScrollText, Component: lazy(() => import("../features/specs-bdd/BddGherkin.jsx")) },
      { id: "bdd-scenario-outline", label: "Scenario Outline & Examples", icon: Table2, Component: lazy(() => import("../features/specs-bdd/BddScenarioOutline.jsx")) },
    ],
  },
  {
    group: "Urbanisation du SI",
    accent: URBA_ACCENT,
    icon: Building2,
    items: [
      { id: "urban-information", label: "Urbanisation de l'information", icon: Building2, Component: lazy(() => import("../features/urbanization/UrbanInformation.jsx")) },
      { id: "inter-model-consistency", label: "Cohérence inter-modèles", icon: GitPullRequest, Component: lazy(() => import("../features/urbanization/InterModelConsistency.jsx")) },
      { id: "docs-as-code-ssot", label: "Documentation as Code & SSOT", icon: FileCode, Component: lazy(() => import("../features/urbanization/DocsAsCodeSsot.jsx")) },
    ],
  },
  {
    id: "tooling",
    label: "Outillage commun",
    icon: Terminal,
    accent: TOOL_ACCENT,
    Component: lazy(() => import("../features/tooling/CommonTooling.jsx")),
  },
];

export function findComponent(id) {
  for (const entry of NAV) {
    if (entry.id === id) return entry.Component;
    if (entry.items) {
      const found = entry.items.find((i) => i.id === id);
      if (found) return found.Component;
    }
  }
  return NAV[0].Component;
}

export function findEntry(id) {
  for (const entry of NAV) {
    if (entry.id === id) return entry;
    if (entry.items) {
      const hit = entry.items.find((i) => i.id === id);
      if (hit) return { ...hit, accent: entry.accent, group: entry.group };
    }
  }
  return NAV[0];
}
