import { useCallback, useState } from 'react'
import { compressImage } from '../lib/imageUtils'
import { showToast } from './ui/Toast'
import { Button } from './ui/Button'
import { useT } from '../hooks/useT'

type Props = {
  onUpload: (blob: Blob, previewUrl: string) => void
  currentUrl?: string | null
}

export function ImageUploader({ onUpload, currentUrl }: Props) {
  const [dragging, setDragging] = useState(false)
  const [preview, setPreview] = useState<string | null>(currentUrl ?? null)
  const [processing, setProcessing] = useState(false)
  const t = useT()

  const processFile = useCallback(async (file: File) => {
    if (!file.type.startsWith('image/')) {
      showToast(t('imageFileRequired'), 'error')
      return
    }
    setProcessing(true)
    try {
      const { blob, dataUrl, origKB, compKB } = await compressImage(file)
      setPreview(dataUrl)
      onUpload(blob, dataUrl)
      showToast(t('imageCompressed', { origKB, compKB }), 'success')
    } catch (e: unknown) {
      showToast(e instanceof Error ? e.message : t('imageProcessFailed'), 'error')
    } finally {
      setProcessing(false)
    }
  }, [onUpload, t])

  const onDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    setDragging(false)
    const file = e.dataTransfer.files[0]
    if (file) processFile(file)
  }, [processFile])

  const onFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) processFile(file)
    e.target.value = ''
  }

  return (
    <div className="flex flex-col gap-2">
      <div
        onDrop={onDrop}
        onDragOver={(e) => { e.preventDefault(); setDragging(true) }}
        onDragLeave={() => setDragging(false)}
        className={`border-2 border-dashed rounded-card p-6 text-center cursor-pointer transition-colors ${
          dragging ? 'border-primary bg-primary-light' : 'border-border bg-gray-50'
        }`}
      >
        {preview ? (
          <img src={preview} alt="preview" className="max-h-48 mx-auto rounded object-contain" />
        ) : (
          <p className="text-sm text-gray-500">{t('imageDropHint')}</p>
        )}
      </div>
      <label>
        <Button type="button" variant="secondary" size="sm" loading={processing} className="cursor-pointer">
          {processing ? t('processing') : t('imageSelect')}
        </Button>
        <input type="file" accept="image/*" onChange={onFileChange} className="hidden" />
      </label>
    </div>
  )
}
