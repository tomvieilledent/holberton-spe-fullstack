/* Page d'accueil : présentation courte du site + lien du dépôt. */
import { H2, SourceLink } from "../../shared/ui/primitives.jsx";
import { REACT_ACCENT, LINE } from "../../shared/ui/tokens.js";

/* Débord symétrique : +1/3 de largeur par rapport à la colonne de texte,
   borné à la fenêtre pour éviter un scroll horizontal sur mobile.
   Partagé par le titre et le bandeau pour qu'ils s'alignent à gauche. */
const BLEED = {
  width: "min(133.333%, calc(100vw - 24px))",
  marginLeft: "calc((100% - min(133.333%, calc(100vw - 24px))) / 2)",
};

/* Bandeau de garde : photo large, texte posé par-dessus.
   Image servie en local (public/) — respecte la CSP `img-src 'self'`.
   Un dégradé sombre garantit le contraste du texte (WCAG AA). */
function Hero() {
  return (
    <section
      role="img"
      aria-label="Poste de travail : un ordinateur portable affichant du code"
      style={{
        ...BLEED,
        position: "relative",
        overflow: "hidden",
        border: `1px solid ${LINE}`,
        borderRadius: 12,
        marginTop: 6,
        marginBottom: 22,
        aspectRatio: "1600 / 600",
        display: "flex",
        alignItems: "flex-end",
        backgroundImage: "url(/home-hero.jpg)",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      {/* voile dégradé : transparent en haut, opaque là où se pose le texte */}
      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          inset: 0,
          background:
            "linear-gradient(180deg, rgba(18,20,26,0.1) 0%, rgba(18,20,26,0.5) 40%, rgba(18,20,26,0.9) 80%, rgba(18,20,26,0.97) 100%)",
        }}
      />

      <div
        style={{
          position: "relative",
          padding: "clamp(16px, 4vw, 30px)",
          maxWidth: 880,
        }}
      >
        <p
          style={{
            color: "rgba(255,255,255,0.94)",
            lineHeight: 1.6,
            fontSize: 14.5,
            margin: 0,
            textShadow: "0 1px 10px rgba(0,0,0,0.8)",
          }}
        >
          Ce site rassemble les notions vues depuis le début de l&apos;année dans
          la spécialisation, complété au fil des semaines. La barre latérale
          regroupe les sections par domaine ; la recherche retrouve une notion
          par mot-clé.
        </p>
      </div>
    </section>
  );
}

export default function Home() {
  return (
    <div>
      <div style={BLEED}>
        <H2 accent={REACT_ACCENT} rule={false}>
          Holberton — spécialisation Full Stack
        </H2>
      </div>

      <Hero />

      <p style={{ ...BLEED, margin: "10px 0" }}>
        <SourceLink href="https://github.com/tomvieilledent/holberton-spe-fullstack">
          github.com/tomvieilledent/holberton-spe-fullstack
        </SourceLink>
      </p>
    </div>
  );
}
