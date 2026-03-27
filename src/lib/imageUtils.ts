import { supabase } from './supabase'
import { v4 as uuidv4 } from 'uuid'

const MAX_WIDTH = 1280
const MAX_HEIGHT = 1280
const JPEG_QUALITY = 0.78

export async function compressImage(file: File): Promise<{
  blob: Blob
  dataUrl: string
  origKB: number
  compKB: number
}> {
  const origKB = Math.round(file.size / 1024)

  return new Promise((resolve, reject) => {
    const img = new Image()
    const objectUrl = URL.createObjectURL(file)

    img.onload = () => {
      URL.revokeObjectURL(objectUrl)

      let { width, height } = img

      if (width > MAX_WIDTH || height > MAX_HEIGHT) {
        const ratio = Math.min(MAX_WIDTH / width, MAX_HEIGHT / height)
        width = Math.round(width * ratio)
        height = Math.round(height * ratio)
      }

      const canvas = document.createElement('canvas')
      canvas.width = width
      canvas.height = height
      const ctx = canvas.getContext('2d')!

      // PNG/GIF: fill white background
      ctx.fillStyle = '#FFFFFF'
      ctx.fillRect(0, 0, width, height)
      ctx.drawImage(img, 0, 0, width, height)

      canvas.toBlob(
        (blob) => {
          if (!blob) {
            reject(new Error('画像の圧縮に失敗しました'))
            return
          }
          const compKB = Math.round(blob.size / 1024)
          const reader = new FileReader()
          reader.onload = () => {
            resolve({ blob, dataUrl: reader.result as string, origKB, compKB })
          }
          reader.onerror = reject
          reader.readAsDataURL(blob)
        },
        'image/jpeg',
        JPEG_QUALITY
      )
    }

    img.onerror = () => {
      URL.revokeObjectURL(objectUrl)
      reject(new Error('画像の読み込みに失敗しました'))
    }

    img.src = objectUrl
  })
}

export async function uploadImage(blob: Blob, tenantId: string): Promise<string> {
  const uuid = uuidv4()
  const path = `${tenantId}/${uuid}.jpg`

  const { error } = await supabase.storage
    .from('training-images')
    .upload(path, blob, { contentType: 'image/jpeg', upsert: false })

  if (error) throw new Error(`画像のアップロードに失敗しました: ${error.message}`)

  return path
}

export async function getSignedUrl(path: string): Promise<string> {
  const { data, error } = await supabase.storage
    .from('training-images')
    .createSignedUrl(path, 3600)

  if (error || !data?.signedUrl) {
    throw new Error('署名付きURLの取得に失敗しました')
  }

  return data.signedUrl
}
