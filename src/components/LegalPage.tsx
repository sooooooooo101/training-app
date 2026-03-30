import { useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useLanguageStore } from '../stores/languageStore'
import { getLegalContent, getReportFormUrl, type LegalDoc } from '../lib/legalContent'
import { downloadElementAsPdf } from '../lib/downloadLegalPdf'
import { Button } from './ui/Button'
import { LanguageSelector } from './ui/LanguageSelector'
import { showToast } from './ui/Toast'

type Props = {
  type: 'terms' | 'privacy'
}

export function LegalPage({ type }: Props) {
  const navigate = useNavigate()
  const { lang } = useLanguageStore()
  const c = getLegalContent(lang)
  const doc: LegalDoc = c[type]
  const pdfRef = useRef<HTMLDivElement>(null)
  const [pdfLoading, setPdfLoading] = useState(false)

  const safeFilename = (name: string) =>
    name.replace(/[/\\?%*:|"<>]/g, '-').replace(/\s+/g, '_').slice(0, 80)

  const handleDownloadPdf = async () => {
    const el = pdfRef.current
    if (!el) return
    setPdfLoading(true)
    try {
      const base = type === 'terms' ? 'terms' : 'privacy'
      await downloadElementAsPdf(el, `${safeFilename(base)}_${lang}.pdf`)
    } catch {
      showToast(c.downloadPdfError, 'error')
    } finally {
      setPdfLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-background p-4">
      <div className="max-w-2xl mx-auto print-container">
        <div className="flex flex-wrap justify-between items-center gap-2 mb-6">
          <Button variant="secondary" size="sm" onClick={() => navigate(-1)}>
            {c.back}
          </Button>
          <div className="flex items-center gap-2">
            <LanguageSelector />
            <Button variant="secondary" size="sm" onClick={handleDownloadPdf} loading={pdfLoading}>
              📄 {c.downloadPdf}
            </Button>
          </div>
        </div>

        <div ref={pdfRef} className="pdf-capture-root bg-background">
          <h1 className="text-2xl font-bold mb-2">{doc.title}</h1>
          <p className="text-sm text-gray-500 mb-8">{doc.updatedAt}</p>

          <div className="bg-card border border-border rounded-card p-6 flex flex-col gap-8 text-sm text-gray-700 leading-relaxed">
            {doc.sections.map((section, i) => (
              <section key={i}>
                <h2 className="text-base font-bold text-gray-900 mb-3">{section.title}</h2>

                {section.warning && (
                  <div className="bg-yellow-50 border border-yellow-200 rounded p-4 mb-3">
                    <p className="font-semibold text-yellow-800 mb-1">⚠ {section.warning}</p>
                  </div>
                )}

                {section.paragraphs?.map((p, j) => (
                  <p key={j} className="mb-2">
                    {p}
                  </p>
                ))}

                {section.items && (
                  <ul className="list-disc pl-5 mt-2 space-y-1">
                    {section.items.map((item, j) => (
                      <li key={j}>{item}</li>
                    ))}
                  </ul>
                )}

                {section.subsections?.map((sub, j) => (
                  <div key={j} className="mt-3">
                    <p className="font-semibold mb-1">【{sub.title}】</p>
                    <ul className="list-disc pl-5 space-y-1">
                      {sub.items.map((item, k) => (
                        <li key={k}>{item}</li>
                      ))}
                    </ul>
                  </div>
                ))}

                {section.table && (
                  <table className="mt-2 w-full text-sm border-collapse">
                    <tbody>
                      {section.table.map((row, j) => (
                        <tr key={j} className="border-b border-border">
                          <td className="py-2 pr-4 font-medium whitespace-nowrap">{row.label}</td>
                          <td className="py-2">{row.value}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                )}

                {section.note && (
                  <p className="mt-3 text-gray-500 text-xs">{section.note}</p>
                )}
              </section>
            ))}
          </div>
        </div>

        <p className="text-center text-xs text-gray-400 mt-6">
          <a
            href={getReportFormUrl()}
            target="_blank"
            rel="noopener noreferrer"
            className="underline hover:text-gray-600"
          >
            {c.reportLink}
          </a>
        </p>
      </div>
    </div>
  )
}
