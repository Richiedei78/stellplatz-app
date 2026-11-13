# Projektregeln (für alle künftigen Prompts)

Projekt: Mandantenfähige B2B-Web-App (SaaS) für Wohnmobilstellplätze und kleine
Campingplätze. Nuxt 4 (`app/`-Struktur), Vue 3, TypeScript strict, Nuxt UI,
@nuxtjs/i18n, PWA. Paketmanager: npm. Leitentscheidungen: `docs/ENTSCHEIDUNGEN.md`.

## Regeln

1. **Alle Texte über i18n.** Keine fest eingetippten Texte in Komponenten, Seiten
   oder Layouts – auch nicht in `aria-label`, `title` oder Platzhaltern.
   Alle 6 Sprachdateien in `i18n/locales/` (`de`, `en`, `nl`, `it`, `es`, `da`)
   immer vollständig und synchron halten. Der Test `tests/i18n.test.ts` prüft das.
2. **TypeScript strict, kein `any`.** (ESLint meldet `any` als Fehler.)
3. **Produktname nur aus `app/app.config.ts`** (`appName`) lesen – über
   `useAppConfig()` bzw. im `nuxt.config.ts` per Import. Nirgends sonst eintippen.
4. **Keine Geheimnisse/Schlüssel ins Repo.** Nur in `.env` (ist in `.gitignore`).
   Neue Variablen leer in `.env.example` dokumentieren.
5. **Datenbankänderungen nur als Migrationsdatei**, nie direkt in der Datenbank.
6. **Antworten an Dennis auf Deutsch**, einfach erklärt (Dennis ist kein Entwickler).
   Vor allem, was Geld kostet oder Daten löscht, erst nachfragen.
7. **Nach jedem Prompt:** `npm run lint`, `npm run test` und `npm run build` müssen
   fehlerfrei laufen – erst dann committen.

## Hinweise

- Neue Menüpunkte in `app/composables/useNavigation.ts` eintragen.
- Seiten-Adressen sind deutsch (`/belegung`); andere Sprachen erhalten eine Vorsilbe (`/en/belegung`).
- Optik: ruhig, gut lesbar, große Klickflächen; Zielgruppe ohne IT-Kenntnisse.
  Handy-Navigation muss mit dem Daumen bedienbar sein.
- `npm run test` läuft über `scripts/vitest.mjs` (behebt ein Windows-Problem mit
  klein geschriebenem Laufwerksbuchstaben).
