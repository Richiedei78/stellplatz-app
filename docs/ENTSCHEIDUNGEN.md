# Leitentscheidungen

Kurze Liste der grundlegenden Entscheidungen. Neue Entscheidungen unten anhängen (mit Datum).

| # | Entscheidung | Kurz begründet |
| --- | --- | --- |
| 1 | **Nuxt** (Vue 3, TypeScript strict) als Grundlage | Eine Codebasis für Web und PWA, gute i18n- und UI-Bausteine |
| 2 | **Stellplatz zuerst** – Wohnmobilstellplätze und kleine Campingplätze | Klare Zielgruppe; Hostel/Ferienwohnung folgen später |
| 3 | **6 Sprachen**: de (Standard), en, nl, it, es, da | Hauptherkunftsländer der Gäste/Betreiber |
| 4 | **Rechnungen extern** über lexoffice / sevDesk | Keine eigene Buchhaltung bauen; rechtssicher |
| 5 | **Zahlungen später** über Stripe / Mollie | Nicht im ersten Schritt |
| 6 | **Hosting: Vercel** | Einfaches Deployment für Nuxt |
| 7 | **Datenbank/Backend: Supabase**, Region EU (Frankfurt) | DSGVO, Daten in der EU (ab Prompt 2) |
| 8 | Mehrsprachige Adressen mit `prefix_except_default` | Deutsch ohne Vorsilbe, andere Sprachen mit (`/en/…`) |

_Stand: 13.11.2026 (Prompt 1 – Projektbasis)_
