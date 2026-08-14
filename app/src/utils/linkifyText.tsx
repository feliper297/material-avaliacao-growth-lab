import type { ReactNode } from 'react'

const URL_PATTERN = /https?:\/\/[^\s<>"']+/g

export function linkifyText(text: string, linkColor?: string): ReactNode[] {
  const nodes: ReactNode[] = []
  let lastIndex = 0

  for (const match of text.matchAll(URL_PATTERN)) {
    const url = match[0]
    const index = match.index ?? 0

    if (index > lastIndex) {
      nodes.push(text.slice(lastIndex, index))
    }

    nodes.push(
      <a
        key={`${index}-${url}`}
        href={url}
        target="_blank"
        rel="noreferrer"
        style={{ color: linkColor, wordBreak: 'break-all' }}
      >
        {url}
      </a>,
    )

    lastIndex = index + url.length
  }

  if (lastIndex < text.length) {
    nodes.push(text.slice(lastIndex))
  }

  return nodes.length > 0 ? nodes : [text]
}
