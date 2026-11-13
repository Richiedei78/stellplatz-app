export interface NavItem {
  /** i18n-Key für die Beschriftung */
  labelKey: string
  /** Iconify-Icon-Name */
  icon: string
  /** Pfad ohne Sprachpräfix */
  path: string
  /** In der unteren Handy-Leiste direkt anzeigen */
  mobilePrimary: boolean
}

const items: NavItem[] = [
  { labelKey: 'nav.dashboard', icon: 'i-lucide-layout-dashboard', path: '/', mobilePrimary: true },
  { labelKey: 'nav.occupancy', icon: 'i-lucide-calendar-range', path: '/belegung', mobilePrimary: true },
  { labelKey: 'nav.bookings', icon: 'i-lucide-book-open-check', path: '/buchungen', mobilePrimary: true },
  { labelKey: 'nav.guests', icon: 'i-lucide-users', path: '/gaeste', mobilePrimary: true },
  { labelKey: 'nav.pitches', icon: 'i-lucide-map-pin', path: '/stellplaetze', mobilePrimary: false },
  { labelKey: 'nav.settings', icon: 'i-lucide-settings', path: '/einstellungen', mobilePrimary: false },
]

export function useNavigation() {
  return { items }
}
