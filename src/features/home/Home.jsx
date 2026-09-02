/* Page d'accueil : présentation courte du site + lien du dépôt. */
import { H2, P, SourceLink } from "../../shared/ui/primitives.jsx";
import { REACT_ACCENT, LINE } from "../../shared/ui/tokens.js";

/* Illustration décorative : fenêtre d'éditeur de code stylisée.
   SVG inline (aucune requête réseau, compatible avec la CSP du site). */
function CodeWindow() {
  const bar = (x, y, w, fill) => (
    <rect x={x} y={y} width={w} height="8" rx="4" fill={fill} />
  );
  return (
    <svg
      viewBox="0 0 640 300"
      role="img"
      aria-label="Illustration : fenêtre d'éditeur de code"
      style={{
        display: "block",
        width: "100%",
        height: "auto",
        border: `1px solid ${LINE}`,
        borderRadius: 12,
        margin: "6px 0 22px",
        background: "#14161c",
      }}
    >
      <rect x="0" y="0" width="640" height="44" fill="#1a1d25" />
      <line x1="0" y1="44" x2="640" y2="44" stroke={LINE} />
      <circle cx="26" cy="22" r="6" fill="#ef6f6f" />
      <circle cx="48" cy="22" r="6" fill="#f0b429" />
      <circle cx="70" cy="22" r="6" fill="#7ee0c3" />
      {bar(150, 18, 180, "#2a2e38")}

      {/* gouttière : numéros de ligne */}
      {[0, 1, 2, 3, 4, 5, 6].map((i) => (
        <rect key={i} x="24" y={74 + i * 30} width="14" height="8" rx="4" fill="#3a3f4c" />
      ))}

      {/* lignes de code stylisées */}
      {bar(60, 74, 70, "#c4a2ff")}
      {bar(140, 74, 110, "#8fb8ff")}
      {bar(260, 74, 40, "#9098a8")}

      {bar(80, 104, 60, "#7ee0c3")}
      {bar(150, 104, 150, "#e8e6e1")}

      {bar(80, 134, 90, "#8fb8ff")}
      {bar(180, 134, 60, "#f0b429")}
      {bar(250, 134, 120, "#7ee0c3")}

      {bar(100, 164, 130, "#e8e6e1")}
      {bar(240, 164, 50, "#c4a2ff")}

      {bar(80, 194, 40, "#4fd1e8")}
      {bar(130, 194, 180, "#7ee0c3")}

      {bar(60, 224, 90, "#c4a2ff")}
      {bar(160, 224, 70, "#8fb8ff")}

      {bar(60, 254, 50, "#9098a8")}
      {/* curseur */}
      <rect x="118" y="250" width="3" height="16" fill="#c4a2ff" />
    </svg>
  );
}

export default function Home() {
  return (
    <div>
      <CodeWindow />

      <H2 accent={REACT_ACCENT}>Holberton — spé Full Stack</H2>

      <P>
        Ce site rassemble les notions vues depuis le début de l&apos;année dans la
        spécialisation. Il est complété au fil des semaines, à chaque nouvelle
        notion abordée en cours.
      </P>
      <P>
        La barre latérale regroupe les sections par domaine (Frontend, Backend,
        DevOps, Documentation &amp; méthode) ; la recherche permet de retrouver
        une notion par mot-clé.
      </P>

      <P>
        <SourceLink href="https://github.com/tomvieilledent/holberton-spe-fullstack">
          github.com/tomvieilledent/holberton-spe-fullstack
        </SourceLink>
      </P>
    </div>
  );
}
