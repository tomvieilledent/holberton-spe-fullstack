import { Code, InlineCode, P, H2, H3, Ul, Note, Table, SourceLink } from "../../shared/ui/primitives.jsx";
import { MERISE_ACCENT } from "../../shared/ui/tokens.js";

export default function DataPhysicalModel() {
  return (
    <div>
      <H2 accent={MERISE_ACCENT}>MLD & MPD — contraintes SQL de production</H2>
      <P>
        Faire confiance uniquement au code applicatif pour garantir la
        qualité des données est risqué : un bug, un script d'import, une
        console d'administration ouverte, et la base se retrouve avec des
        lignes incohérentes que plus aucune validation ne rattrapera. Le{" "}
        <strong>Modèle Physique de Données</strong> (MPD) blinde les règles
        directement au niveau du SGBD.
      </P>

      <H3>Du MLD au MPD</H3>
      <Ul>
        <li>
          Le <strong>MLD</strong> (Modèle Logique de Données) traduit le MCD
          en tables, clés primaires et clés étrangères, sans dépendre d'un
          SGBD précis.
        </li>
        <li>
          Le <strong>MPD</strong> ajoute les types exacts, les contraintes{" "}
          <InlineCode>CHECK</InlineCode>, les politiques{" "}
          <InlineCode>ON DELETE</InlineCode> et les index, pour un SGBD
          donné (ici PostgreSQL).
        </li>
      </Ul>

      <H3>Intégrité référentielle : les politiques ON DELETE</H3>
      <Table
        head={["Politique", "Effet à la suppression du parent"]}
        rows={[
          ["RESTRICT / NO ACTION", "Interdit la suppression tant qu'un enfant existe"],
          ["CASCADE", "Supprime automatiquement les lignes enfants"],
          ["SET NULL", "Met la clé étrangère de l'enfant à NULL"],
        ]}
      />

      <H3>Script PostgreSQL complet</H3>
      <Code>{`CREATE TABLE client (
    id_client uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    nom       text NOT NULL,
    email     text NOT NULL UNIQUE,
    CONSTRAINT email_format CHECK (email ~ '^[^@]+@[^@]+\\.[^@]+$')
);

CREATE TABLE produit (
    id_produit    uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    libelle       text NOT NULL,
    prix_unitaire numeric(10,2) NOT NULL,
    stock         integer NOT NULL DEFAULT 0,
    CONSTRAINT prix_positif CHECK (prix_unitaire > 0),
    CONSTRAINT stock_non_negatif CHECK (stock >= 0)
);

CREATE TABLE commande (
    id_commande   uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    id_client     uuid NOT NULL,
    date_commande timestamptz NOT NULL DEFAULT now(),
    statut        text NOT NULL DEFAULT 'DRAFT',
    CONSTRAINT statut_valide
        CHECK (statut IN ('DRAFT','PENDING_PAYMENT','PAID','SHIPPED','CANCELLED')),
    CONSTRAINT fk_commande_client
        FOREIGN KEY (id_client) REFERENCES client (id_client)
        ON DELETE RESTRICT
);

CREATE TABLE ligne_commande (
    id_commande   uuid NOT NULL,
    id_produit    uuid NOT NULL,
    quantite      integer NOT NULL,
    prix_applique numeric(10,2) NOT NULL,
    PRIMARY KEY (id_commande, id_produit),
    CONSTRAINT quantite_positive CHECK (quantite > 0),
    CONSTRAINT fk_ligne_commande
        FOREIGN KEY (id_commande) REFERENCES commande (id_commande)
        ON DELETE CASCADE,
    CONSTRAINT fk_ligne_produit
        FOREIGN KEY (id_produit) REFERENCES produit (id_produit)
        ON DELETE RESTRICT
);`}</Code>
      <Note accent={MERISE_ACCENT}>
        Choix des politiques ici : supprimer une{" "}
        <InlineCode>commande</InlineCode> efface ses lignes
        (<InlineCode>CASCADE</InlineCode>), mais on interdit de supprimer un{" "}
        <InlineCode>client</InlineCode> ou un{" "}
        <InlineCode>produit</InlineCode> encore référencés
        (<InlineCode>RESTRICT</InlineCode>) — l'historique commercial reste
        intègre.
      </Note>

      <SourceLink href="https://www.postgresql.org/docs/current/ddl-constraints.html">
        postgresql.org — DDL Constraints
      </SourceLink>
      {" · "}
      <SourceLink href="https://use-the-index-luke.com/">
        use-the-index-luke.com — SQL DDL Best Practices
      </SourceLink>
      {" · "}
      <SourceLink href="https://www.pgtutorial.com/postgresql-tutorial/postgresql-uuid/">
        pgtutorial.com — Gérer les UUID sous PostgreSQL
      </SourceLink>
    </div>
  );
}
