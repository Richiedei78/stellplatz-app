// Startet Vitest mit korrekt geschriebenem Projektpfad.
// Hintergrund: Unter Windows kommt der Laufwerksbuchstabe manchmal klein an
// ("c:\..."). Vitest lädt sich dann doppelt und meldet
// "Vitest failed to find the current suite". Mit "C:\..." klappt es.
import { spawnSync } from 'node:child_process'
import { createRequire } from 'node:module'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'

const fixDrive = path => path.replace(/^[a-z]:/, drive => drive.toUpperCase())

const projectRoot = fixDrive(join(dirname(fileURLToPath(import.meta.url)), '..'))

const require = createRequire(import.meta.url)
const vitestBin = fixDrive(join(dirname(require.resolve('vitest/package.json')), 'vitest.mjs'))

const result = spawnSync(process.execPath, [vitestBin, ...process.argv.slice(2)], {
  cwd: projectRoot,
  stdio: 'inherit',
})

process.exit(result.status ?? 1)
