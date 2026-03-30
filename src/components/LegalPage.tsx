import { useNavigate } from 'react-router-dom'
import { useLanguageStore } from '../stores/languageStore'
import { getLegalContent, REPORT_FORM_URL, type LegalDoc } from '../lib/legalContent'
import { Button } from './ui/Button'

type Props = {
  type: 'terms' | 'privacy'
}

export function LegalPage({ type }: Props) {
  const navigate = useNavigate()
  const { lang } = useLanguageStore()
  const c = getLegalContent(lang)
  const doc: LegalDoc = c[type]

  const handlePrint = () => {
    window.print()
  }

  return (
    <div className="min-h-screen bg-background p-4">
      <style>{`
        @media print {
          .no-print { display: none !important; }
          body { background: white; }
          .print-container { max-width: 100%; padding: 0; }
        }
      `}</style>

      <div className="max-w-2xl mx-auto print-container">
        <div className="flex justify-between items-center mb-6 no-print">
          <Button variant="secondary" size="sm" onClick={() => navigate(-1)}>
            {c.back}
          </Button>
          <Button variant="secondary" size="sm" onClick={handlePrint}>
            📄 {c.downloadPdf}
          </Button>
        </div>

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
                <p key={j} className="mb-2">{p}</p>
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

        <p className="text-center text-xs text-gray-400 mt-6 no-print">
          <a href={REPORT_FORM_URL} target="_blank" rel="noopener noreferrer" className="underline hover:text-gray-600">
            {c.reportLink}
          </a>
        </p>
      </div>
    </div>
  )
}
