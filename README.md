# stellplatz-app

Web-App (SaaS) für Betreiber von Wohnmobilstellplätzen und kleinen Campingplätzen:
Stellplätze, Belegung, Buchungen, Gäste. Läuft im Browser auf PC, Tablet und Handy
und lässt sich als App installieren (PWA).

> Der Name „stellplatz-app“ ist ein Arbeitsname. Der angezeigte Produktname steht
> nur in [`app/app.config.ts`](app/app.config.ts) (`appName`).

## Voraussetzungen

- [Node.js](https://nodejs.org/) (aktuelle LTS-Version oder neuer)
- npm (wird mit Node.js installiert)

## Einmalig: Abhängigkeiten installieren

```bash
npm install
```

Optional: `.env.example` nach `.env` kopieren und Werte eintragen (wird ab Prompt 2 gebraucht).

## Starten (Entwicklung)

```bash
npm run dev
```

Dann im Browser öffnen: <http://localhost:3000>

Beenden mit `Strg + C` im Terminal.

## Bauen (Produktionsversion)

```bash
npm run build
```

Fertige Version lokal ansehen:

```bash
npm run preview
```

## Testen

```bash
npm run test
```

## Code prüfen (Lint)

```bash
npm run lint
```

Automatisch korrigierbare Fehler beheben:

```bash
npm run lint:fix
```

Typen prüfen (TypeScript):

```bash
npm run typecheck
```

## Sprachen

Deutsch (Standard), Englisch, Niederländisch, Italienisch, Spanisch, Dänisch.
Die Texte liegen in [`i18n/locales/`](i18n/locales/) – eine JSON-Datei je Sprache.
Deutsch hat keine Vorsilbe in der Adresse (`/belegung`), die anderen schon (`/en/belegung`).

## Ordnerstruktur (Auszug)

| Ordner / Datei | Inhalt |
| --- | --- |
| `app/app.config.ts` | Produktname und Farben |
| `app/layouts/` | Seitenrahmen (`default` mit Navigation, `auth` für Login) |
| `app/pages/` | Seiten (eine Datei = eine Adresse) |
| `app/components/` | Wiederverwendbare Bausteine |
| `app/composables/useNavigation.ts` | Menüpunkte |
| `i18n/locales/` | Übersetzungen |
| `public/` | Icons und statische Dateien |
| `tests/` | Automatische Tests |
| `docs/` | Prompts und Entscheidungen |
