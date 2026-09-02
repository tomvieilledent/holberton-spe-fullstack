import { Code, InlineCode, P, H2, H3, Ul, Note, Table, SourceLink } from "../../shared/ui/primitives.jsx";
import { MERISE_ACCENT } from "../../shared/ui/tokens.js";

export default function MeriseAssociationPorteuse() {
  return (
    <div>
      <H2 accent={MERISE_ACCENT}>L'association porteuse</H2>
      <P>
        C'est le concept le plus mal compris des juniors. Prenons
        l'association entre <InlineCode>COMMANDE</InlineCode> et{" "}
        <InlineCode>PRODUIT</InlineCode> :
      </P>
      <Ul>
        <li>Une commande contient <InlineCode>(1,n)</InlineCode> produits.</li>
        <li>Un produit peut figurer dans <InlineCode>(0,n)</InlineCode> commandes.</li>
      </Ul>
      <P>Où stocker la « quantité commandée » ?</P>
      <Ul>
        <li>
          Dans <InlineCode>PRODUIT</InlineCode> ? Faux — tous les clients
          commandant ce produit auraient alors la même quantité.
        </li>
        <li>
          Dans <InlineCode>COMMANDE</InlineCode> ? Faux également — la
          commande ne pourrait avoir qu'une seule quantité, tous produits
          confondus.
        </li>
      </Ul>
      <P>
        La quantité dépend de la <strong>rencontre</strong> entre un produit
        précis et une commande précise. Elle appartient donc à l'association
        elle-même — une association <InlineCode>(n,m)</InlineCode> porteuse
        de données. En SQL, cela se traduit par une table de liaison.
      </P>

      <Code>{`erDiagram
    CLIENT ||--o{ COMMANDE : "passe"
    COMMANDE ||--|{ LIGNE_COMMANDE : "contient"
    PRODUIT ||--o{ LIGNE_COMMANDE : "figure_dans"

    CLIENT {
        string id_client PK
        string nom
        string email
    }
    COMMANDE {
        string id_cmd PK
        date date_achat
        string statut
    }
    PRODUIT {
        string code_prod PK
        string designation
        decimal prix_unitaire
    }
    LIGNE_COMMANDE {
        string id_cmd FK
        string code_prod FK
        int quantite
    }`}</Code>
      <Note accent={MERISE_ACCENT}>
        Note de syntaxe : l'association porteuse <InlineCode>(n,m)</InlineCode>{" "}
        du MCD est ici représentée directement par l'entité faible de liaison{" "}
        <InlineCode>LIGNE_COMMANDE</InlineCode>, pour rester compatible avec
        la syntaxe Mermaid — ce qui préfigure déjà le passage au MLD (Modèle
        Logique de Données).
      </Note>

      <H3>Ce qu'il faut retenir</H3>
      <Ul>
        <li>Une association <InlineCode>(n,n)</InlineCode> porteuse de données se traduit toujours par une table à part entière.</li>
        <li>Cette table de liaison contient les clés étrangères des deux entités reliées, plus les attributs propres à la rencontre.</li>
        <li>C'est exactement ce mécanisme qui règle, en base de données relationnelle, les relations « plusieurs-à-plusieurs ».</li>
      </Ul>

      <SourceLink href="https://merise.developpez.com/cours/">
        merise.developpez.com — Cours Merise
      </SourceLink>
      {" · "}
      <SourceLink href="https://www.mocodo.net/">mocodo.net</SourceLink>
      {" · "}
      <SourceLink href="https://www.ibm.com/docs/fr/rsas/7.5.0?topic=diagrams-association-classes">
        IBM Docs — Classes d'association (UML)
      </SourceLink>
    </div>
  );
}
