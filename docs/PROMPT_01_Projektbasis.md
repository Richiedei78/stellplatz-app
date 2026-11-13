# Prompt 1 – Projektbasis (Nuxt)

Du richtest in diesem (leeren) Ordner ein neues Webprojekt ein. Arbeitsname: **stellplatz-app** (wird später umbenannt – der Produktname darf daher nur an EINER Stelle im Code stehen).

Ich (Dennis) bin kein Entwickler. Erkläre mir am Ende in einfachem Deutsch, was du gemacht hast und wie ich es teste. Frag nach, bevor du etwas tust, das Geld kostet oder Daten löscht.

## Produkt in Kürze
Mandantenfähige B2B-Web-App (SaaS) für Betreiber von Wohnmobilstellplätzen und kleinen Campingplätzen: Stellplätze, Belegung, Buchungen, Gäste. Später weitere Unterkunftsarten (Hostel, Ferienwohnung). Läuft primär im Browser auf PC, Tablet und Handy, installierbar als PWA.

## Technik
- **Nuxt** (aktuelle stabile Version, Verzeichnisstruktur mit `app/`), **Vue 3**, **TypeScript strict**
- Paketmanager: **npm**
- UI: **Nuxt UI** (aktuelle stabile Version), Hell-/Dunkelmodus
- Mehrsprachigkeit: **@nuxtjs/i18n**
  - Sprachen: `de` (Standard), `en`, `nl`, `it`, `es`, `da`
  - Strategie `prefix_except_default`, Browsersprache beim ersten Besuch erkennen, Auswahl im Cookie merken
  - Übersetzungen als JSON-Dateien je Sprache, lazy geladen
  - **Keine fest eingetippten Texte in Komponenten** – alles über i18n-Keys. Alle 6 Sprachdateien immer vollständig und synchron halten.
- PWA: **@vite-pwa/nuxt** mit Manifest und Platzhalter-Icons
- Qualität: **@nuxt/eslint**, **Vitest** (Grundsetup + 1 Beispieltest)
- **Noch KEIN Supabase/Backend** – kommt in Prompt 2.

## Umfang
1. Projekt anlegen, Git initialisieren, sinnvolle `.gitignore`, `.env.example` (leer vorbereitet).
2. Produktname zentral in `app.config.ts` (z. B. `appName`), überall von dort verwenden.
3. **App-Layout** (`default`):
   - Desktop: linke Seitenleiste mit Navigation, oben Kopfzeile mit Sprachwahl, Hell/Dunkel-Schalter, Platzhalter für Benutzermenü
   - Handy: Navigation als Drawer oder untere Leiste – muss mit dem Daumen bedienbar sein
   - Navigation: Dashboard, Belegung, Buchungen, Gäste, Stellplätze, Einstellungen
4. **Leeres Layout** `auth` für spätere Login-/Registrierungsseiten.
5. Platzhalterseiten für alle Navigationspunkte (Titel + kurzer Hinweis „kommt bald“, übersetzt).
6. Einfache, ruhige Optik: gut lesbar, große Klickflächen, keine Spielereien. Zielgruppe sind Betreiber ohne IT-Kenntnisse.
7. `README.md` (Deutsch): Start, Build, Test, Lint – jeweils mit dem genauen Befehl.
8. `CLAUDE.md` mit den Projektregeln für künftige Prompts:
   - alle Texte über i18n, 6 Sprachen synchron
   - TypeScript strict, keine `any`
   - Produktname nur aus `app.config.ts`
   - keine Geheimnisse/Schlüssel ins Repo
   - Datenbankänderungen nur als Migrationsdatei, nie direkt
   - Antworten an Dennis auf Deutsch, einfach erklärt
   - nach jedem Prompt: lint + test + build grün, dann committen
9. `docs/ENTSCHEIDUNGEN.md`: kurze Liste der Leitentscheidungen (Nuxt, Stellplatz zuerst, 6 Sprachen, Rechnungen extern via lexoffice/sevDesk, Zahlungen später via Stripe/Mollie, Hosting Vercel, Supabase EU/Frankfurt).

## Abnahme (erst dann fertig)
- `npm run dev` startet ohne Fehler, alle Seiten unter `http://localhost:3000` erreichbar
- Sprachwechsel funktioniert in allen 6 Sprachen
- In der Handy-Ansicht (Browser F12 → Geräteansicht) ist die Navigation nutzbar
- `npm run lint`, `npm run test` und `npm run build` laufen ohne Fehler
- Alles in einem Git-Commit „Projektbasis“ gesichert (noch NICHT zu GitHub pushen)

Danach stoppen und mir berichten.
