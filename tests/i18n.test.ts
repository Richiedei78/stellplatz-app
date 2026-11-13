import { readdirSync, readFileSync } from 'node:fs'
import { join } from 'node:path'
import { describe, expect, it } from 'vitest'

const LOCALES_DIR = join(import.meta.dirname, '..', 'i18n', 'locales')
const EXPECTED_LOCALES = ['da', 'de', 'en', 'es', 'it', 'nl']

type Messages = { [key: string]: string | Messages }

function flattenKeys(obj: Messages, prefix = ''): string[] {
  return Object.entries(obj).flatMap(([key, value]) => {
    const path = prefix ? `${prefix}.${key}` : key
    return typeof value === 'string' ? [path] : flattenKeys(value, path)
  })
}

function load(code: string): Messages {
  return JSON.parse(readFileSync(join(LOCALES_DIR, `${code}.json`), 'utf8')) as Messages
}

describe('Übersetzungen', () => {
  it('es gibt genau die 6 vorgesehenen Sprachdateien', () => {
    const files = readdirSync(LOCALES_DIR)
      .filter(f => f.endsWith('.json'))
      .map(f => f.replace('.json', ''))
      .sort()
    expect(files).toEqual(EXPECTED_LOCALES)
  })

  const reference = flattenKeys(load('de')).sort()

  it.each(EXPECTED_LOCALES)('%s hat dieselben Schlüssel wie de', (code) => {
    expect(flattenKeys(load(code)).sort()).toEqual(reference)
  })

  it.each(EXPECTED_LOCALES)('%s hat keine leeren Texte', (code) => {
    const empty = Object.entries(load(code)).length === 0
    expect(empty).toBe(false)
    const check = (obj: Messages): void => {
      for (const value of Object.values(obj)) {
        if (typeof value === 'string') expect(value.trim()).not.toBe('')
        else check(value)
      }
    }
    check(load(code))
  })
})
