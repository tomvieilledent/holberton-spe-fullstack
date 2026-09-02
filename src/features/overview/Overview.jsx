import { Code, InlineCode, P, H2, H3, Ul, Note, Table, SourceLink } from "../../shared/ui/primitives.jsx";
import { FONT_BODY, FONT_DISPLAY, LINE, MUTED, PANEL, REACT_ACCENT, SVELTE_ACCENT, TEXT, TOOL_ACCENT, VUE_ACCENT } from "../../shared/ui/tokens.js";
import { Component, Flame, Leaf } from "lucide-react";

export default function Overview() {
  return (
    <div>
      <p style={{ fontFamily: FONT_DISPLAY, fontSize: 34, color: TEXT, marginBottom: 6 }}>
        Récap de la semaine
      </p>
      <p style={{ color: MUTED, fontSize: 16, marginBottom: 28, maxWidth: 640, lineHeight: 1.6 }}>
        Trois frameworks, un même outillage — puis un passage côté
        infrastructure, méthode, automatisation et conception de données.
        Cette semaine a couvert la mise en place d'un projet front moderne
        (React, Vue, Svelte) avec les mêmes briques (Vite, Tailwind, ESLint,
        Lucide, GitHub Pages), avant d'aborder Docker pour empaqueter une
        application, les pratiques DevOps / Git qui structurent le travail en
        équipe, GitHub Actions pour automatiser tests, builds et publication
        d'images, et enfin la méthode Merise pour concevoir une base de
        données avant d'écrire la moindre ligne de SQL.
      </p>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 16, marginBottom: 28 }}>
        <div style={{ border: `1px solid ${LINE}`, borderRadius: 12, padding: 20, background: PANEL }}>
          <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 8 }}>
            <Component size={18} color={REACT_ACCENT} />
            <span style={{ fontFamily: FONT_BODY, fontWeight: 700, color: TEXT }}>React</span>
          </div>
          <p style={{ color: MUTED, fontSize: 14, lineHeight: 1.6, margin: 0 }}>
            Composants, JSX, props/state, hooks. Puis mise en place propre d'un
            projet Vite + Tailwind + ESLint + Lucide, et déploiement sur GitHub Pages.
          </p>
        </div>
        <div style={{ border: `1px solid ${LINE}`, borderRadius: 12, padding: 20, background: PANEL }}>
          <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 8 }}>
            <Leaf size={18} color={VUE_ACCENT} />
            <span style={{ fontFamily: FONT_BODY, fontWeight: 700, color: TEXT }}>Vue.js</span>
          </div>
          <p style={{ color: MUTED, fontSize: 14, lineHeight: 1.6, margin: 0 }}>
            Instance d'application, composant racine, montage dans le DOM.
            Le même outillage (Vite, Tailwind, ESLint, Lucide) transposé côté Vue.
          </p>
        </div>
        <div style={{ border: `1px solid ${LINE}`, borderRadius: 12, padding: 20, background: PANEL }}>
          <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 8 }}>
            <Flame size={18} color={SVELTE_ACCENT} />
            <span style={{ fontFamily: FONT_BODY, fontWeight: 700, color: TEXT }}>Svelte</span>
          </div>
          <p style={{ color: MUTED, fontSize: 14, lineHeight: 1.6, margin: 0 }}>
            Un compilateur plutôt qu'une librairie à l'exécution : runes{" "}
            <InlineCode>{"$state"}</InlineCode>/<InlineCode>{"$props"}</InlineCode>,
            fichiers <InlineCode>.svelte</InlineCode>, même outillage Vite.
          </p>
        </div>
      </div>

      <H3>Le fil conducteur de la semaine</H3>
      <Ul>
        <li>Comprendre le modèle par composants (commun aux trois frameworks).</li>
        <li>Savoir démarrer un projet avec Vite, quel que soit le framework.</li>
        <li>Styliser avec Tailwind CSS via le plugin Vite officiel.</li>
        <li>Garder un code propre grâce à ESLint (guillemets, points-virgules, variables inutilisées).</li>
        <li>Ajouter des icônes cohérentes avec Lucide.</li>
        <li>Publier son travail sur GitHub Pages avec un chemin de base relatif.</li>
      </Ul>
      <Note accent={TOOL_ACCENT}>
        Astuce de révision : la partie « Outillage » est quasi identique entre
        React, Vue et Svelte. Une fois comprise d'un côté, elle se retranspose
        presque telle quelle ailleurs — seul le plugin Vite du framework change.
      </Note>
    </div>
  );
}
