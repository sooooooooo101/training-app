import { LANGUAGES, type LangCode } from '../../lib/i18n'
import { useLanguageStore } from '../../stores/languageStore'

export function LanguageSelector() {
  const { lang, setLang } = useLanguageStore()

  return (
    <select
      value={lang}
      onChange={(e) => setLang(e.target.value as LangCode)}
      className="text-sm border border-border rounded-input px-2 py-1 bg-card text-gray-700 focus:outline-none focus:ring-2 focus:ring-primary/30 cursor-pointer"
      aria-label="Language / 言語"
    >
      {LANGUAGES.map((l) => (
        <option key={l.code} value={l.code}>
          {l.flag} {l.label}
        </option>
      ))}
    </select>
  )
}
