/* Page d'accueil : présentation courte du site + lien du dépôt. */
import { H2, P, SourceLink } from "../../shared/ui/primitives.jsx";
import { REACT_ACCENT, LINE } from "../../shared/ui/tokens.js";

/* Illustration décorative : développeur à son bureau (style plat).
   SVG inline — aucune requête réseau, compatible avec la CSP du site.
   Sans rapport avec Holberton : simple habillage de la page de garde. */
function DeveloperScene() {
  return (
    <svg
      viewBox="0 0 640 300"
      role="img"
      aria-label="Illustration : un développeur travaille sur son ordinateur portable"
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
      {/* mur + sol */}
      <rect x="0" y="0" width="640" height="228" fill="#14161c" />
      <rect x="0" y="228" width="640" height="72" fill="#1a1d25" />
      <line x1="0" y1="228" x2="640" y2="228" stroke={LINE} />

      {/* cadre au mur */}
      <rect x="70" y="42" width="92" height="66" rx="4" fill="#1a1d25" stroke={LINE} />
      <path d="M78 96 L104 66 L124 88 L140 74 L154 96 Z" fill="#4FD1E8" opacity="0.5" />
      <circle cx="132" cy="60" r="7" fill="#F0B429" opacity="0.7" />

      {/* plante */}
      <rect x="520" y="150" width="34" height="40" rx="3" fill="#1f232d" stroke={LINE} />
      <path d="M537 150 C537 120 522 112 520 100 C534 108 540 124 540 138" fill="#6EE7B7" opacity="0.8" />
      <path d="M537 150 C537 124 552 114 558 102 C552 122 546 136 542 150" fill="#6EE7B7" opacity="0.6" />

      {/* bureau */}
      <rect x="90" y="196" width="460" height="10" rx="3" fill="#2a2e38" />
      <rect x="120" y="206" width="8" height="34" fill="#2a2e38" />
      <rect x="512" y="206" width="8" height="34" fill="#2a2e38" />

      {/* chaise */}
      <rect x="150" y="182" width="46" height="8" rx="4" fill="#2a2e38" />
      <rect x="168" y="190" width="8" height="30" fill="#2a2e38" />

      {/* personnage */}
      <circle cx="196" cy="120" r="18" fill="#e8e6e1" opacity="0.92" />
      <path d="M180 116 C182 100 210 100 212 116 C212 108 206 100 196 100 C186 100 180 108 180 116 Z" fill="#12141a" />
      <path d="M170 196 C170 150 222 150 222 196 Z" fill="#C4A2FF" opacity="0.9" />
      <path d="M172 168 C160 176 150 186 146 196 L158 196 C164 186 174 178 182 174 Z" fill="#C4A2FF" opacity="0.9" />
      <circle cx="146" cy="196" r="5" fill="#e8e6e1" opacity="0.92" />

      {/* ordinateur portable */}
      <path d="M226 196 L300 196 L292 160 L234 160 Z" fill="#1f232d" stroke={LINE} />
      <rect x="236" y="163" width="52" height="30" rx="2" fill="#0E1015" />
      <rect x="242" y="169" width="30" height="4" rx="2" fill="#8fb8ff" />
      <rect x="242" y="177" width="40" height="4" rx="2" fill="#7ee0c3" />
      <rect x="242" y="185" width="22" height="4" rx="2" fill="#c4a2ff" />
      <path d="M222 196 L304 196 L308 202 L218 202 Z" fill="#2a2e38" />

      {/* mug */}
      <rect x="330" y="178" width="20" height="18" rx="2" fill="#1f232d" stroke={LINE} />
      <path d="M350 182 C360 182 360 192 350 192" fill="none" stroke={LINE} strokeWidth="2" />
      <path d="M335 174 C335 168 337 168 337 162 M342 174 C342 168 344 168 344 162" stroke="#9098a8" strokeWidth="1.5" fill="none" opacity="0.6" />

      {/* écran externe */}
      <rect x="400" y="150" width="86" height="52" rx="4" fill="#0E1015" stroke={LINE} />
      <rect x="408" y="158" width="40" height="5" rx="2.5" fill="#c4a2ff" />
      <rect x="408" y="168" width="62" height="5" rx="2.5" fill="#8fb8ff" />
      <rect x="408" y="178" width="30" height="5" rx="2.5" fill="#7ee0c3" />
      <rect x="408" y="188" width="52" height="5" rx="2.5" fill="#9098a8" />
      <rect x="438" y="202" width="10" height="8" fill="#1f232d" />
      <rect x="424" y="210" width="38" height="5" rx="2.5" fill="#2a2e38" />
    </svg>
  );
}

export default function Home() {
  return (
    <div>
      <DeveloperScene />

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
