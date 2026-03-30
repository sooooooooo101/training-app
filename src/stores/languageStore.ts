import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { LANGUAGES, type LangCode } from '../lib/i18n'

type LanguageStore = {
  lang: LangCode
  setLang: (lang: LangCode) => void
}

function readPersistedLang(): LangCode {
  if (typeof window === 'undefined') return 'ja'
  try {
    const raw = localStorage.getItem('training-lang')
    if (!raw) return 'ja'
    const p = JSON.parse(raw) as { state?: { lang?: string } }
    const code = p.state?.lang
    if (code && LANGUAGES.some((l) => l.code === code)) return code as LangCode
  } catch {
    /* ignore */
  }
  return 'ja'
}

export const useLanguageStore = create<LanguageStore>()(
  persist(
    (set) => ({
      lang: readPersistedLang(),
      setLang: (lang) => set({ lang }),
    }),
    { name: 'training-lang' },
  ),
)
