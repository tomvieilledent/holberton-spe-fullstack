# Déploiement — VPS OVH, `https://vlldnt.fr`

Le site est un build statique (`dist/`) servi par **nginx** sur un **VPS OVH**.
Chaque `push` sur `main` reconstruit et publie automatiquement via
`.github/workflows/deploy.yml` (`rsync` over SSH).

```
push main ─► GitHub Actions ─► npm ci + npm run build ─► rsync dist/ ─► /var/www/vlldnt.fr ─► nginx ─► https://vlldnt.fr
```

## 1. Prérequis à me fournir / à préparer

| Élément | Détail |
| --- | --- |
| IP publique du VPS | IPv4 (et IPv6 si tu veux un AAAA) |
| OS installé | Debian 12 ou Ubuntu 22.04/24.04 |
| Accès SSH actuel | root + clé (ou mot de passe), port SSH (OVH : 22 par défaut) |
| Firewall OVH | dans le manager OVH : autoriser 22, 80, 443 (ou désactiver le "Network Firewall") |
| DNS de `vlldnt.fr` | géré chez OVH ou ailleurs — enregistrements à créer ci-dessous |
| Email | pour l'enregistrement Let's Encrypt |

> Le contenu actuellement sur le VPS pour ce domaine sera **remplacé**
> (`vps-setup.sh` supprime le vhost `default` de nginx).

## 2. DNS

Chez le gestionnaire DNS de `vlldnt.fr` :

```
A     vlldnt.fr        <IPv4 du VPS>
A     www.vlldnt.fr    <IPv4 du VPS>
; optionnel
AAAA  vlldnt.fr        <IPv6 du VPS>
AAAA  www.vlldnt.fr    <IPv6 du VPS>
```

Pas de proxy Cloudflare requis. Attendre la propagation (`dig +short vlldnt.fr`).

## 3. Générer la clé de déploiement (sur ta machine)

```bash
ssh-keygen -t ed25519 -f ~/.ssh/vlldnt_deploy -N "" -C "gha-deploy-vlldnt"
```

- `~/.ssh/vlldnt_deploy.pub` → passée au script du VPS (`CI_PUBKEY`)
- `~/.ssh/vlldnt_deploy` (privée) → secret GitHub `SSH_KEY`

## 4. Provisionner le VPS (une fois, en root)

Copier `scripts/vps-setup.sh` sur le VPS, puis :

```bash
export EMAIL="tomvieilledent@gmail.com"
export CI_PUBKEY="$(cat ~/.ssh/vlldnt_deploy.pub)"   # depuis ta machine, colle la valeur
bash vps-setup.sh
```

Le script : installe nginx + certbot, crée l'utilisateur `deploy`, la racine
`/var/www/vlldnt.fr`, le pare-feu UFW, obtient le certificat, pose le vhost
final (`deploy/nginx/vlldnt.fr.conf`) et le hook de reload post-renouvellement.

## 5. Secrets & variables GitHub

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
gh secret set SSH_HOST  --repo tomvieilledent/holberton-fullstack --body "<IP>"
gh secret set SSH_USER  --repo tomvieilledent/holberton-fullstack --body "deploy"
gh secret set SSH_KEY   --repo tomvieilledent/holberton-fullstack < ~/.ssh/vlldnt_deploy
```

## 6. Déployer

```bash
git push origin main
```

Le workflow *Deploy to VPS (vlldnt.fr)* build et `rsync` le `dist/`.
`workflow_dispatch` permet aussi un déclenchement manuel.

## 7. Vérifier

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
