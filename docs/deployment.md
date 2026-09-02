# Déploiement — VPS OVH, `https://vlldnt.fr`

Le site est un build statique (`dist/`) servi par **nginx** sur un **VPS OVH**.
Chaque `push` sur `main` reconstruit et publie automatiquement via
`.github/workflows/deploy.yml` (`rsync` over SSH).

```
push main ─► GitHub Actions ─► npm ci + npm run build ─► rsync dist/ ─► /var/www/vlldnt.fr ─► nginx ─► https://vlldnt.fr
```

## 1. État constaté du VPS (2026-09-02)

| Point | Constat |
| --- | --- |
| IPv4 / IPv6 | `137.74.175.164` / `2001:41d0:305:2100::1:5750` |
| OS | **Ubuntu** (OpenSSH 10.2p1 → Ubuntu 25.x) |
| SSH | port **22**, joignable |
| nginx | **déjà installé** (`nginx/1.28.3 (Ubuntu)`), sert `:80` et `:443` |
| TLS | un certificat valide pour `vlldnt.fr` est **déjà en place** ; HTTP→HTTPS déjà actif |
| Site actuel | une app **« Avyro — Training & Room »** (React/Vite) est servie sur `https://vlldnt.fr` |
| Firewall OVH (edge) | 22 / 80 / 443 joignables → rien à ouvrir |
| DNS | `A vlldnt.fr` et `A www.vlldnt.fr` → `137.74.175.164` **déjà OK** ; pas de `AAAA` |

> ⚠️ **Le site « Avyro » sera remplacé.** `vps-setup.sh` sauvegarde
> `/etc/nginx` (`/etc/nginx.bak.<date>`), désactive tout vhost qui déclare
> `server_name vlldnt.fr` (renommé en `*.disabled`) puis installe le nôtre.
> Les fichiers de l'ancien site restent sur le disque, simplement plus servis.

## 2. Ce qu'il reste à faire / me fournir

| Élément | Détail |
| --- | --- |
| Dépôt GitHub | `gh repo create` (bloqué de mon côté, à lancer par toi) |
| Exécution de `scripts/vps-setup.sh` | en root sur le VPS (ou me donner un accès SSH) |
| Clé de déploiement | générée ci-dessous, ajoutée en secret GitHub |
| Email Let's Encrypt | `tomvieilledent@gmail.com` (modifiable) |
| `AAAA` (optionnel) | `AAAA vlldnt.fr` et `AAAA www.vlldnt.fr` → `2001:41d0:305:2100::1:5750` |

## 3. DNS

Zone gérée chez **OVH**. État actuel + ajout optionnel :

```
A     vlldnt.fr        137.74.175.164                    # déjà présent
A     www.vlldnt.fr    137.74.175.164                    # déjà présent
AAAA  vlldnt.fr        2001:41d0:305:2100::1:5750         # à ajouter (optionnel)
AAAA  www.vlldnt.fr    2001:41d0:305:2100::1:5750         # à ajouter (optionnel)
```

Les enregistrements `MX` / `SPF` / `TXT` de la messagerie OVH ne sont **pas**
touchés. `dig +short vlldnt.fr` pour vérifier.

## 4. Générer la clé de déploiement (sur ta machine)

```bash
ssh-keygen -t ed25519 -f ~/.ssh/vlldnt_deploy -N "" -C "gha-deploy-vlldnt"
```

- `~/.ssh/vlldnt_deploy.pub` → passée au script du VPS (`CI_PUBKEY`)
- `~/.ssh/vlldnt_deploy` (privée) → secret GitHub `SSH_KEY`

## 5. Provisionner le VPS (une fois, en root)

Copier `scripts/vps-setup.sh` sur le VPS, puis :

```bash
export EMAIL="tomvieilledent@gmail.com"
export CI_PUBKEY="$(cat ~/.ssh/vlldnt_deploy.pub)"   # depuis ta machine, colle la valeur
bash vps-setup.sh
```

Le script : installe nginx + certbot, crée l'utilisateur `deploy`, la racine
`/var/www/vlldnt.fr`, le pare-feu UFW, obtient le certificat, pose le vhost
final (`deploy/nginx/vlldnt.fr.conf`) et le hook de reload post-renouvellement.

## 6. Secrets & variables GitHub

Repo → *Settings → Secrets and variables → Actions* :

| Type | Nom | Valeur |
| --- | --- | --- |
| Secret | `SSH_HOST` | IP ou hostname du VPS |
| Secret | `SSH_USER` | `deploy` |
| Secret | `SSH_KEY` | contenu de `~/.ssh/vlldnt_deploy` (clé privée) |
| Variable | `SSH_PORT` | `22` (optionnel, défaut 22) |
| Variable | `DEPLOY_PATH` | `/var/www/vlldnt.fr` (optionnel, valeur par défaut) |

En CLI :

```bash
gh secret set SSH_HOST  --repo tomvieilledent/holberton-spe-fullstack --body "<IP>"
gh secret set SSH_USER  --repo tomvieilledent/holberton-spe-fullstack --body "deploy"
gh secret set SSH_KEY   --repo tomvieilledent/holberton-spe-fullstack < ~/.ssh/vlldnt_deploy
```

## 7. Déployer

```bash
git push origin main
```

Le workflow *Deploy to VPS (vlldnt.fr)* build et `rsync` le `dist/`.
`workflow_dispatch` permet aussi un déclenchement manuel.

## 8. Vérifier

```bash
curl -I https://vlldnt.fr            # 200, HSTS présent
curl -I http://vlldnt.fr             # 301 -> https
curl -I https://www.vlldnt.fr        # 301 -> https://vlldnt.fr
```

## Renouvellement TLS

`certbot` installe son timer systemd. Le hook
`/etc/letsencrypt/renewal-hooks/deploy/reload-nginx.sh` recharge nginx après
chaque renouvellement. Test : `certbot renew --dry-run`.

## Rollback

`dist/` est reconstruit à chaque déploiement ; pour revenir en arrière,
`git revert` le commit fautif et `push` (ou relancer le workflow sur un SHA
antérieur via `workflow_dispatch`).

## Backend (plus tard)

Prévu découplé : service Node (Fastify) en `systemd`, exposé par nginx sous
`/api`, base PostgreSQL locale (schéma : `docs/data-model.sql`, contrat :
`docs/openapi.yaml`). À cadrer quand le besoin est défini.
