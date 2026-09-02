import { Code, InlineCode, P, H2, H3, Ul, Note, Table, SourceLink } from "../../shared/ui/primitives.jsx";
import { MERISE_ACCENT } from "../../shared/ui/tokens.js";

export default function MeriseNormalization() {
  return (
    <div>
      <H2 accent={MERISE_ACCENT}>Normalisation approfondie — 1NF, 2NF, 3NF</H2>
      <P>
        Une fois le MCD posé, encore faut-il vérifier que les tables qui en
        découlent ne souffrent pas d'<strong>anomalies de modification</strong>{" "}
        — le signe qu'une table cache en réalité plusieurs entités mal
        séparées.
      </P>

      <H3>Le problème : trois anomalies classiques</H3>
      <Ul>
        <li>
          <strong>Anomalie de mise à jour</strong> — si une donnée dupliquée
          (ex. l'adresse d'un client) apparaît sur plusieurs lignes, un
          déménagement oublié sur une seule ligne crée une incohérence.
        </li>
        <li>
          <strong>Anomalie de suppression</strong> — supprimer une commande
          peut effacer, avec elle, le fait qu'un produit existe au
          catalogue, s'il n'était référencé que par cette commande.
        </li>
        <li>
          <strong>Anomalie d'insertion</strong> — impossible d'ajouter un
          nouveau produit tant qu'il n'a pas de commande, si la table exige
          un identifiant de commande pour chaque ligne.
        </li>
      </Ul>
      <Note accent={MERISE_ACCENT}>
        La normalisation est un processus mathématique appliqué à la
        conception d'une base relationnelle pour réduire la redondance et
        garantir l'intégrité des dépendances entre attributs.
      </Note>

      <H3>1NF — l'atomicité</H3>
      <P>
        Chaque attribut doit contenir une valeur <strong>atomique</strong>{" "}
        (indivisible), sans groupe répétitif.
      </P>
      <Code>{`-- Mauvaise table
Client(id, nom, contacts)
-- contacts = "jean@acme.com, paul@acme.com"

-- Bonne table : séparer en deux
Client(id, nom)
Contact(id, id_client FK, email)`}</Code>

      <H3>2NF — dépendance totale à la clé</H3>
      <P>
        En plus de respecter la 1NF, tout attribut non clé doit dépendre de
        la <strong>totalité</strong> de la clé primaire — cela concerne
        surtout les tables à clé composée.
      </P>
      <Code>{`-- Mauvaise table
Ligne_Commande(id_cmd, code_prod, quantite, designation_produit)
-- clé primaire : (id_cmd, code_prod)
-- quantite dépend bien des DEUX -> OK
-- designation_produit ne dépend QUE de code_prod -> violation 2NF

-- Bonne table : on déplace designation_produit
Ligne_Commande(id_cmd, code_prod, quantite)
Produit(code_prod, designation_produit)`}</Code>

      <H3>3NF — pas de dépendance transitive</H3>
      <P>
        En plus de respecter la 2NF, tout attribut non clé doit dépendre{" "}
        <strong>directement</strong> de la clé primaire, et non d'un autre
        attribut non clé.
      </P>
      <Code>{`-- Mauvaise table
Commande(id_cmd, date, qte, prix_unitaire, total_ligne)
-- total_ligne dépend de qte ET prix_unitaire (deux attributs non clés)
-- si qte change sans recalculer total_ligne, la base devient incohérente

-- Bonne table : on supprime total_ligne
Commande(id_cmd, date, qte, prix_unitaire)
-- total_ligne se calcule à la volée (vue SQL, ou côté applicatif)`}</Code>
      <Note accent={MERISE_ACCENT}>
        Une donnée calculable ne se stocke jamais dans une base relationnelle
        transactionnelle (OLTP) — elle se recalcule à la demande, pour
        garantir qu'elle reste toujours exacte.
      </Note>

      <H3>Au-delà de la 3NF</H3>
      <P>
        La <strong>forme normale de Boyce-Codd (BCNF)</strong> est une
        version plus stricte de la 3NF, basée sur les super-clés. La 4NF
        élimine les dépendances à valeurs multiples (ex. séparer les
        compétences et les langues parlées d'un employé dans deux tables
        distinctes). La 5NF, rarement recherchée en pratique, garantit qu'une
        décomposition en tables plus petites permet toujours de reconstituer
        exactement la table d'origine.
      </P>

      <H3>Le compromis</H3>
      <P>
        Normaliser réduit la redondance et les anomalies, mais multiplie
        aussi le nombre de tables à croiser pour une même requête — d'où,
        dans certains contextes (reporting, lecture intensive), le choix
        assumé de <em>dénormaliser</em> partiellement une base une fois les
        règles bien comprises.
      </P>

      <SourceLink href="https://www.ibm.com/fr-fr/think/topics/database-normalization">
        ibm.com — Normalisation des bases de données
      </SourceLink>
      {" · "}
      <SourceLink href="https://www.geeksforgeeks.org/dbms/normal-forms-in-dbms/">
        geeksforgeeks.org — Normal Forms in DBMS
      </SourceLink>
      {" · "}
      <SourceLink href="https://www.guvi.in/hub/dbms-and-sql-tutorial/introduction-to-normalization/">
        guvi.in — Introduction to Normalization
      </SourceLink>
    </div>
  );
}
