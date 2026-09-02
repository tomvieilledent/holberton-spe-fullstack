-- =====================================================================
--  MPD PostgreSQL — domaine "cursus / site de révision"
--  Applique : Merise (MCD -> MLD -> MPD), normalisation 1NF/2NF/3NF,
--  intégrité référentielle (FK, ON DELETE), contraintes CHECK.
--  Source unique de vérité du schéma si un backend est ajouté sur le VPS.
-- =====================================================================

-- 3NF : aucune donnée calculable stockée ; aucun attribut non-clé
-- dépendant d'un autre attribut non-clé.

CREATE TABLE week (
    week_number  integer PRIMARY KEY,
    title        text NOT NULL,
    started_on   date NOT NULL,
    CONSTRAINT week_number_positif CHECK (week_number >= 1)
);

CREATE TABLE track (
    track_id   text PRIMARY KEY,             -- ex: 'react', 'docker', 'merise'
    label      text NOT NULL,
    accent     text NOT NULL,                -- couleur hex de l'accent UI
    CONSTRAINT track_id_slug CHECK (track_id ~ '^[a-z0-9-]+$'),
    CONSTRAINT accent_hex   CHECK (accent ~ '^#[0-9A-Fa-f]{6}$')
);

CREATE TABLE section (
    section_id   text PRIMARY KEY,           -- 1NF : slug atomique
    title        text NOT NULL,
    track_id     text NOT NULL,
    week_number  integer NOT NULL,
    position     integer NOT NULL,           -- ordre d'affichage dans NAV
    CONSTRAINT section_id_slug CHECK (section_id ~ '^[a-z0-9-]+$'),
    CONSTRAINT position_positif CHECK (position >= 0),
    CONSTRAINT fk_section_track
        FOREIGN KEY (track_id) REFERENCES track (track_id)
        ON DELETE RESTRICT,
    CONSTRAINT fk_section_week
        FOREIGN KEY (week_number) REFERENCES week (week_number)
        ON DELETE RESTRICT,
    CONSTRAINT uq_section_order UNIQUE (track_id, position)
);

-- Association porteuse : une ressource appartient à la rencontre
-- (section, url). 2NF : 'label' dépend du couple complet.
CREATE TABLE resource (
    section_id  text NOT NULL,
    url         text NOT NULL,
    label       text NOT NULL,
    PRIMARY KEY (section_id, url),
    CONSTRAINT url_absolue CHECK (url ~ '^https?://'),
    CONSTRAINT fk_resource_section
        FOREIGN KEY (section_id) REFERENCES section (section_id)
        ON DELETE CASCADE          -- supprimer la section supprime ses liens
);

CREATE INDEX idx_section_week ON section (week_number);
CREATE INDEX idx_resource_section ON resource (section_id);

-- Vue : le "total" (nombre de ressources par section) est CALCULÉ,
-- jamais stocké (3NF).
CREATE VIEW section_resource_count AS
SELECT s.section_id,
       s.title,
       count(r.url) AS resource_count
FROM section s
LEFT JOIN resource r ON r.section_id = s.section_id
GROUP BY s.section_id, s.title;
