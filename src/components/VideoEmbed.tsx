import { useT } from '../hooks/useT'

type Props = { url: string }

function getYoutubeId(url: string): string | null {
  const match = url.match(/(?:youtube\.com\/(?:watch\?v=|embed\/)|youtu\.be\/)([^&\n?#]+)/)
  return match?.[1] ?? null
}

export function VideoEmbed({ url }: Props) {
  const t = useT()
  const ytId = getYoutubeId(url)

  if (ytId) {
    return (
      <div className="relative w-full aspect-video rounded-card overflow-hidden">
        <iframe
          className="absolute inset-0 w-full h-full"
          src={`https://www.youtube.com/embed/${ytId}`}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          title={t('videoTitle')}
        />
      </div>
    )
  }

  return (
    <div className="w-full rounded-card overflow-hidden">
      <video src={url} controls className="w-full" />
    </div>
  )
}
