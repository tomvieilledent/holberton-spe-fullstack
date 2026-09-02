/* Page d'accueil : présentation courte du site + lien du dépôt. */
import { H2, P, SourceLink } from "../../shared/ui/primitives.jsx";
import { REACT_ACCENT, LINE } from "../../shared/ui/tokens.js";

/* Illustration décorative de la page de garde.
   Image servie en local (public/) — respecte la CSP `img-src 'self'`.
   Sans rapport avec Holberton : simple habillage. */
function HeroImage() {
  return (
    <img
      src="/home-hero.jpg"
      alt="Poste de travail : un ordinateur portable affichant du code"
      width="1600"
      height="1068"
      loading="eager"
      decoding="async"
      style={{
        display: "block",
        width: "100%",
        height: "auto",
        border: `1px solid ${LINE}`,
        borderRadius: 12,
        margin: "6px 0 22px",
      }}
    />
  );
}

export default function Home() {
  return (
    <div>
      <HeroImage />

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
