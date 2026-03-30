import { Link } from 'react-router-dom'
import { useLanguageStore } from '../stores/languageStore'
import { getLegalContent, getReportFormUrl } from '../lib/legalContent'

type Props = {
  className?: string
}

export function LegalFooter({ className = '' }: Props) {
  const { lang } = useLanguageStore()
  const lc = getLegalContent(lang)

  return (
    <p className={`text-center text-xs text-gray-400 ${className}`.trim()}>
      <Link to="/terms" className="underline hover:text-gray-600">
        {lc.termsLink}
      </Link>
      　・
      <Link to="/privacy" className="underline hover:text-gray-600">
        {lc.privacyLink}
      </Link>
      　・
      <a
        href={getReportFormUrl()}
        target="_blank"
        rel="noopener noreferrer"
        className="underline hover:text-gray-600"
      >
        {lc.reportLink}
      </a>
    </p>
  )
}
