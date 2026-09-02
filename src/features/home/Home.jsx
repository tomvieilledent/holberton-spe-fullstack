/* Page d'accueil : présentation courte du site + lien du dépôt. */
import { H2, P, SourceLink } from "../../shared/ui/primitives.jsx";
import { REACT_ACCENT } from "../../shared/ui/tokens.js";

export default function Home() {
  return (
    <div>
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
