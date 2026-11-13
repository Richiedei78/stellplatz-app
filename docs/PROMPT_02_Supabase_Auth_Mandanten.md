# Prompt 2 – Supabase, Anmeldung, Mandanten & Onboarding

Lies zuerst `CLAUDE.md` und `docs/ENTSCHEIDUNGEN.md`. Alle Regeln dort gelten.

**Arbeitsweise: zwei Phasen.**
- **Phase A:** Nur Setup + Migrationsdatei schreiben. **Danach STOPPEN.** Dennis lässt die Migration von Cowork (Claude) prüfen.
- **Phase B:** Erst wenn Dennis „Migration freigegeben“ schreibt: einspielen, Typen erzeugen, Oberfläche bauen.

## Supabase-Projekt (existiert bereits, Free-Tarif, Frankfurt)
- Projekt-Ref: `gbwpbosxcgmxbvedgqjx`
- URL: `https://gbwpbosxcgmxbvedgqjx.supabase.co`
- Publishable Key (öffentlich, darf ins Frontend): `sb_publishable_hsn2zsF1n9Sxgtl55GgChg_7knoVfWx`
- Diese Werte in `.env` eintragen (`SUPABASE_URL`, `SUPABASE_KEY`), in `.env.example` nur die Namen.
- **Niemals** den secret/service_role Key im Frontend oder im Repo verwenden.

---

## Phase A – Setup + Migration

1. `@nuxtjs/supabase` installieren und konfigurieren.
   - Die eingebaute Weiterleitung des Moduls **ausschalten** (`redirect: false`). Wir bauen eine eigene, i18n-fähige Middleware (Phase B).
2. Supabase CLI als devDependency (`supabase`), `npx supabase init` (Ordner `supabase/`). Kein Docker/kein lokaler Stack.
3. **Eine** Migration `supabase/migrations/<timestamp>_core.sql` mit:

### Grundsätze
- Allgemeines Modell, nicht auf „Camping“ festgelegt (Organisation → Betrieb → später Einheiten).
- **RLS auf jeder Tabelle**, Mandantentrennung ausschließlich serverseitig.
- Hilfsfunktionen in eigenem Schema **`private`** (wird nicht über die API ausgeliefert), `security definer`, `set search_path = ''`, voll qualifizierte Namen. `execute` von `public`/`anon` entziehen, nur `authenticated` erlauben.
- Öffentlich aufrufbare RPCs nur dort, wo nötig; jede prüft selbst Berechtigung und Eingaben.
- `created_at`/`updated_at` (Trigger) auf allen Tabellen. UUIDs als Primärschlüssel.

### Typen
- `app_role` enum: `owner`, `admin`, `staff`
- `property_type` enum: `motorhome_site`, `campground` (später erweiterbar)

### Tabellen
- **`organizations`** (zahlender Kunde): `name`, `country` (ISO-2), `default_locale` (de/en/nl/it/es/da), `currency` (Standard `EUR`)
- **`properties`** (Betrieb/Standort): `organization_id`, `name`, `type property_type`, `country`, `timezone` (Standard `Europe/Berlin`), Adresse (`street`, `postal_code`, `city`), `email`, `phone`, `checkin_from time` (Std. 14:00), `checkout_until time` (Std. 11:00), `is_active`
- **`profiles`**: `id` = `auth.users.id`, `full_name`, `preferred_locale`. Automatisch per Trigger bei neuem Auth-User anlegen (Name/Sprache aus den Registrierungs-Metadaten).
- **`memberships`**: `organization_id`, `user_id`, `role app_role`, `is_active`; eindeutig je (organization_id, user_id). Genau ein `owner` pro Organisation.
- **`audit_log`**: `organization_id`, `user_id`, `action`, `entity`, `entity_id`, `data jsonb`, `created_at`. Nur lesbar für owner/admin der Organisation; Schreiben nur über Funktionen/Trigger, nicht direkt vom Client.

### Hilfsfunktionen (`private`)
- `private.is_member(org_id uuid) returns boolean` (aktive Mitgliedschaft)
- `private.has_role(org_id uuid, min_role app_role) returns boolean` (Rangfolge owner > admin > staff)

### RLS-Regeln
- `organizations`: lesen = Mitglied; ändern = owner/admin; kein direktes Anlegen/Löschen vom Client.
- `properties`: lesen = Mitglied; anlegen/ändern = owner/admin; löschen = owner.
- `profiles`: eigenes Profil lesen/ändern; Profile von Mitgliedern derselben Organisation lesen.
- `memberships`: lesen = Mitglied derselben Organisation; ändern nur owner/admin (Einladungen kommen in einem späteren Prompt). Owner-Rolle kann nicht per normalem Update vergeben/entzogen werden.
- `audit_log`: siehe oben.

### RPC
- `public.create_organization_with_property(p_org_name, p_country, p_locale, p_property_name, p_property_type)` – `security definer`, nur für `authenticated`:
  - legt Organisation + ersten Betrieb + Mitgliedschaft (`owner`) **in einer Transaktion** an
  - Eingaben prüfen (Länge, erlaubte Werte), Audit-Eintrag schreiben
  - gibt die neue `organization_id` zurück

4. `supabase/tests/RLS_CHECKLISTE.md`: kurze Liste, welche Zugriffe erlaubt/verboten sein müssen (zwei Nutzer, zwei Organisationen).

**→ STOPP. Berichte Dennis den Dateinamen der Migration und fasse in 5 Sätzen zusammen, was sie tut. Nichts einspielen.**

---

## Phase B – nach Freigabe

1. Einspielen: `npx supabase login`, `npx supabase link --project-ref gbwpbosxcgmxbvedgqjx` (Dennis gibt das Datenbank-Passwort selbst ein), dann `npx supabase db push`.
2. Typen erzeugen nach `shared/types/database.types.ts` und als npm-Script `db:types` hinterlegen.
3. **Auth-Seiten** (Layout `auth`, alle Texte in 6 Sprachen):
   - Registrieren (Name, E-Mail, Passwort mit Mindestlänge 10, Sprache) → Hinweis „Bitte E-Mail bestätigen“
   - Anmelden (E-Mail + Passwort), Link „Passwort vergessen“
   - Passwort vergessen → Mail; Seite „Neues Passwort setzen“
   - Rückkehr-Seite für Bestätigungs-/Reset-Links (`/auth/callback` o. ä.)
   - Verständliche Fehlermeldungen (falsches Passwort, E-Mail nicht bestätigt, Rate-Limit)
4. **Middleware** (global, i18n-fähig):
   - nicht angemeldet → Anmeldeseite (Sprache bleibt erhalten)
   - angemeldet, aber ohne Organisation → Onboarding
   - angemeldet mit Organisation → App
5. **Onboarding** (einfacher Assistent, 2 Schritte): Betrieb/Firma (Name, Land, Sprache) → erster Platz (Name, Typ Wohnmobilstellplatz/Campingplatz). Ruft die RPC auf, danach weiter zum Dashboard.
6. **Kontext**: Composable für aktuelle Organisation + aktuellen Betrieb (vorbereitet für mehrere). Name des Betriebs in der Kopfzeile, Benutzermenü mit Profil-Platzhalter und **Abmelden**.
7. Dashboard zeigt „Willkommen, <Name>“ und den Betriebsnamen.
8. Tests: Validierung der Formulare (Vitest). Lint, Test, Build grün → Commit „Supabase, Anmeldung, Onboarding“.
9. Bericht an Dennis + Test-Anleitung (Schritt für Schritt): registrieren, Mail bestätigen, Onboarding, abmelden, Passwort zurücksetzen – in mindestens 2 Sprachen.

**Hinweis E-Mails:** Vorerst der eingebaute Supabase-Mailversand (nur wenige Mails pro Stunde, nur an Adressen des Supabase-Teams). Eigenes SMTP (Brevo) kommt später.
