import { Code, InlineCode, P, H2, H3, Ul, Note, Table, SourceLink } from "../../shared/ui/primitives.jsx";
import { MERISE_ACCENT } from "../../shared/ui/tokens.js";
import { Database } from "lucide-react";

export default function DataNormalizationStrict() {
  return (
    <div>
      <H2 accent={MERISE_ACCENT}>Normalisation approfondie — 1NF, 2NF, 3NF strict</H2>
      <P>
        Une table mal conçue souffre d'<strong>anomalies</strong> : de mise
        à jour (une même donnée dupliquée sur plusieurs lignes, corrigée à
        un seul endroit), de suppression (effacer une ligne fait disparaître
        une information sans rapport), et d'insertion (impossible d'ajouter
        une donnée tant qu'une autre, non liée, n'existe pas). Les{" "}
        <strong>formes normales</strong> éliminent ces anomalies une à une.
      </P>

      <H3>1NF — atomicité des attributs</H3>
      <P>
        Chaque attribut contient une seule valeur indivisible : pas de
        liste, pas de groupe répétitif dans une colonne.
      </P>
      <Code>{`-- Mauvaise table (viole la 1NF)
COMMANDE(id_commande, client, produits)
-- produits = "clavier;souris;écran"

-- Bonne table
COMMANDE(id_commande, client)
LIGNE_COMMANDE(id_commande, produit)`}</Code>

      <H3>2NF — dépendance à la totalité de la clé</H3>
      <P>
        La table est en 1NF <em>et</em> tout attribut non-clé dépend de la{" "}
        <strong>totalité</strong> de la clé primaire composée, pas d'une
        partie seulement.
      </P>
      <Code>{`-- Mauvaise table (clé primaire : id_commande + id_produit)
LIGNE_COMMANDE(id_commande, id_produit, quantite, libelle_produit)
-- libelle_produit ne dépend que de id_produit -> viole la 2NF

-- Bonne table
LIGNE_COMMANDE(id_commande, id_produit, quantite)
PRODUIT(id_produit, libelle_produit)`}</Code>

      <H3>3NF — aucune dépendance transitive</H3>
      <P>
        La table est en 2NF <em>et</em> aucun attribut non-clé ne dépend
        d'un autre attribut non-clé. Une donnée <strong>calculable</strong>{" "}
        (ex. <InlineCode>total_ligne</InlineCode>) ne se stocke jamais en
        base OLTP.
      </P>
      <Code>{`-- Mauvaise table
LIGNE_COMMANDE(id_commande, id_produit, quantite, prix_unitaire, total_ligne)
-- total_ligne = quantite * prix_unitaire -> dépendance transitive

-- Bonne table
LIGNE_COMMANDE(id_commande, id_produit, quantite, prix_unitaire)
-- total_ligne recalculé à la volée (vue SQL ou couche applicative)`}</Code>
      <Note accent={MERISE_ACCENT}>
        Mnémotechnique : chaque attribut non-clé dépend « de la clé, de
        toute la clé, et de rien d'autre que la clé » — 1NF, 2NF, 3NF.
      </Note>

      <SourceLink href="https://www.ibm.com/fr-fr/think/topics/database-normalization">
        ibm.com — Database Normalization Explained
      </SourceLink>
      {" · "}
      <SourceLink href="https://www.geeksforgeeks.org/dbms/normal-forms-in-dbms/">
        geeksforgeeks.org — Visualizing Normal Forms in DBMS
      </SourceLink>
      {" · "}
      <SourceLink href="https://www.guvi.in/hub/dbms-and-sql-tutorial/introduction-to-normalization/">
        guvi.in — Guide interactif sur les Formes Normales
      </SourceLink>
    </div>
  );
}
