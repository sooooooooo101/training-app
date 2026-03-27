import { useCallback } from 'react'
import { useLanguageStore } from '../stores/languageStore'
import { translate, type TranslationKey } from '../lib/i18n'

export function useT() {
  const { lang } = useLanguageStore()
  return useCallback(
    (key: TranslationKey, params?: Record<string, string | number>) =>
      translate(lang, key, params),
    [lang],
  )
}
