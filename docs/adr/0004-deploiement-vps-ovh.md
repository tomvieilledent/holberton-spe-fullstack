# 4. Hébergement sur un VPS OVH derrière `vlldnt.fr`

- Statut : accepté
- Date : 2026-09-02
- Remplace : la cible « GitHub Pages » de l'ADR 0003

## Contexte

Le site doit être servi sur le domaine `vlldnt.fr` (HTTPS), déjà rattaché à un
VPS OVH que l'auteur administre. Un backend éventuel devra cohabiter.

## Décision

- **Hébergement** : build statique `dist/` servi par **nginx** sur le VPS OVH,
  racine `/var/www/vlldnt.fr`.
- **TLS** : Let's Encrypt via `certbot` (webroot), renouvellement automatique
  (timer systemd + hook de reload nginx).
- **Canonique** : apex `vlldnt.fr` ; `www.vlldnt.fr` redirige en 301 vers l'apex ;
  HTTP redirige en 301 vers HTTPS.
- **Déploiement** : GitHub Actions (`deploy.yml`) sur `push main` →
  `npm ci && npm run build` → `rsync -az --delete dist/` vers le VPS via SSH,
  compte dédié `deploy` sans privilèges, clé dédiée en secret.
- **Provisionnement** : `scripts/vps-setup.sh`, idempotent, exécuté une fois en
  root. Le vhost de référence est versionné (`deploy/nginx/vlldnt.fr.conf`).
- `vite.config.js` : `base: "/"` (service à la racine du domaine).

## Conséquences

- Plus de dépendance à GitHub Pages ; le site vit sur l'infra de l'auteur.
- Le contenu préexistant du VPS pour ce domaine est remplacé (vhost `default`
  supprimé).
- Un backend futur s'ajoute sans changer ce schéma : service `systemd` +
  `location /api` dans nginx.
- Secret de déploiement à faire tourner si compromission (`ssh-keygen` + MAJ du
  `authorized_keys` et du secret `SSH_KEY`).
