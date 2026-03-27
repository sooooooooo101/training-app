import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import type { LangCode } from '../lib/i18n'

type LanguageStore = {
  lang: LangCode
  setLang: (lang: LangCode) => void
}

export const useLanguageStore = create<LanguageStore>()(
  persist(
    (set) => ({
      lang: 'ja',
      setLang: (lang) => set({ lang }),
    }),
    { name: 'training-lang' },
  ),
)
