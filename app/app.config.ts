/**
 * Zentrale App-Konfiguration.
 *
 * WICHTIG: Der Produktname steht NUR hier (`appName`).
 * Überall sonst (Layout, Seitentitel, PWA-Manifest) wird er von hier gelesen.
 *
 * Bewusst als einfaches Objekt (ohne `defineAppConfig`), damit auch
 * `nuxt.config.ts` diese Datei importieren kann (für das PWA-Manifest).
 */
const appConfig = {
  appName: 'stellplatz-app',
  ui: {
    colors: {
      primary: 'green',
      neutral: 'slate',
    },
  },
}

export default appConfig
