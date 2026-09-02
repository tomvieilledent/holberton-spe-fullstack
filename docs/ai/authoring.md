# Rédaction assistée par IA (AI-enhanced)

Le contenu du site est **rédigé avec l'aide d'une IA**, mais jamais publié tel
quel : toute information fournie est **vérifiée** et **complétée** avant d'entrer
dans `src/features/`.

## Principe

> Tu me donnes des infos à ajouter → je les ajoute, **mais** je les vérifie et je
> comble ce qui manque.

L'IA n'invente pas de contenu pédagogique : elle part de ce que tu fournis
(notes de cours, liens, captures) et le met en forme. Si une affirmation n'est
pas vérifiable, elle est retirée ou signalée, pas devinée.

## Entrée acceptée

N'importe lequel de ces formats :

- notes brutes / plan de la semaine ;
- un ou plusieurs liens (docs officielles, articles) ;
- un titre de section + 2-3 phrases d'intention.

## Pipeline

1. **Cadrage** — ranger l'info dans la trame maison :
   `Problème` → `Solution` → exemples (`Code`, `Table`) → `Note` → `SourceLink`.
2. **Vérification** — chaque fait est recoupé avec une source faisant autorité
   (doc officielle de préférence). Les liens fournis sont testés ; un lien mort
   ou hors sujet est remplacé par la référence canonique.
3. **Complétion** — ce qui manque est ajouté :
   - un `Problème` explicite si seule la solution était donnée ;
   - au moins un exemple concret (`Code`) et, si pertinent, un diagramme Mermaid ;
   - 2 à 4 `SourceLink` vers des sources primaires ;
   - le placement dans `NAV` (ordre = ordre du cours).
4. **Contrôle** — `npm run ci` (lint + spec:lint + tests + build) doit passer ; la section
   doit se rendre sans erreur (couvert par `src/app/App.test.jsx`).
5. **Traçabilité** — la PR liste les sources utilisées et ce qui a été **ajouté
   par l'IA** vs **fourni**.

## Règles de vérification

| Type d'info | Exigence |
| --- | --- |
| Version d'outil, nom d'option, drapeau CLI | confirmé dans la doc officielle courante |
| Chiffre / date / citation | source primaire liée, sinon reformulé sans le chiffre |
| Snippet de code | doit être cohérent et exécutable dans l'esprit (pas forcément lancé) |
| Diagramme Mermaid | syntaxe valide, rendu vérifié |
| Lien | HTTP 200, contenu réellement sur le sujet |

## Ce que l'IA ne fait pas

- publier une info non sourcée « parce qu'elle est probable » ;
- modifier une section existante sans demande explicite ;
- changer la trame, les composants partagés ou l'ordre de `NAV` sans raison.
