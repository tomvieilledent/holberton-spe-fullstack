import { Code, InlineCode, P, H2, H3, Ul, Note, Table, SourceLink } from "../../shared/ui/primitives.jsx";
import { MERISE_ACCENT } from "../../shared/ui/tokens.js";

export default function DataBusinessRules() {
  return (
    <div>
      <H2 accent={MERISE_ACCENT}>Règles de gestion, entités, associations & cardinalités</H2>
      <P>
        Concevoir une base de données directement en SQL, sans modèle
        conceptuel préalable, mène presque toujours aux mêmes impasses :
        des tables « fourre-tout » qui accumulent des colonnes hétérogènes,
        et des requêtes cauchemardesques dès qu'il faut croiser plusieurs
        informations.
      </P>

      <H3>Partir des règles de gestion</H3>
      <P>
        Tout part de phrases métier en français, les{" "}
        <strong>règles de gestion</strong> : « un client passe zéro, une ou
        plusieurs commandes », « une commande appartient à un et un seul
        client », « une commande porte sur au moins un produit ». Chaque
        règle se traduit en éléments du{" "}
        <strong>Modèle Conceptuel de Données</strong> (MCD) selon la méthode
        Merise.
      </P>
      <Table
        head={["Concept Merise", "Définition"]}
        rows={[
          ["Entité", "Objet de gestion ayant une existence propre (Client, Produit)"],
          ["Propriété", "Donnée élémentaire qualifiant une entité (nom, prix)"],
          ["Association", "Lien sémantique entre entités (un client passe une commande)"],
          ["Cardinalité", "Nombre de participations min/max d'une entité à une association"],
          ["Association porteuse", "Association qui porte ses propres propriétés (la quantité d'une ligne)"],
        ]}
      />

      <H3>Les quatre cardinalités</H3>
      <Table
        head={["Cardinalité", "Lecture"]}
        rows={[
          ["0,1", "Participation facultative, au plus une fois"],
          ["1,1", "Participation obligatoire, exactement une fois"],
          ["0,n", "Participation facultative, plusieurs fois possibles"],
          ["1,n", "Participation obligatoire, plusieurs fois possibles"],
        ]}
      />

      <H3>L'association porteuse</H3>
      <P>
        La <strong>quantité</strong> d'une ligne de commande n'appartient ni
        au produit (sinon tous les clients commanderaient la même quantité),
        ni à la commande seule (sinon une seule quantité pour tous les
        produits). Elle appartient à la <em>rencontre</em> entre une
        commande précise et un produit précis : c'est une association
        porteuse, qui devient la table <InlineCode>LIGNE_COMMANDE</InlineCode>.
      </P>
      <Code>{`erDiagram
    CLIENT ||--o{ COMMANDE : "passe"
    COMMANDE ||--|{ LIGNE_COMMANDE : "contient"
    PRODUIT ||--o{ LIGNE_COMMANDE : "concerne"

    CLIENT {
        int id_client PK
        string nom
        string email
    }
    COMMANDE {
        int id_commande PK
        date date_commande
        int id_client FK
    }
    PRODUIT {
        int id_produit PK
        string libelle
        decimal prix_unitaire
    }
    LIGNE_COMMANDE {
        int id_commande PK
        int id_produit PK
        int quantite
    }`}</Code>
      <Note accent={MERISE_ACCENT}>
        Se lit : un <InlineCode>CLIENT</InlineCode> passe de 0 à n{" "}
        <InlineCode>COMMANDE</InlineCode>, une{" "}
        <InlineCode>COMMANDE</InlineCode> contient de 1 à n{" "}
        <InlineCode>LIGNE_COMMANDE</InlineCode>, et chaque{" "}
        <InlineCode>LIGNE_COMMANDE</InlineCode> concerne exactement un{" "}
        <InlineCode>PRODUIT</InlineCode>.
      </Note>

      <SourceLink href="https://www.mocodo.net/">mocodo.net — outil de MCD</SourceLink>
      {" · "}
      <SourceLink href="https://merise.developpez.com/cours/">
        developpez.com — Introduction à la méthode Merise
      </SourceLink>
      {" · "}
      <SourceLink href="https://www.ibm.com/docs/fr/rsas/7.5.0?topic=diagrams-association-classes">
        ibm.com — Les associations porteuses / classes d'association
      </SourceLink>
    </div>
  );
}
