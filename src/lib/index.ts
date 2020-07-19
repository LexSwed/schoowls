export function useIsAuth() {
  if (isServer) {
    return false
  }
  return document.cookie && !document.cookie.includes('authed')
}

const isServer = typeof window === 'undefined'

export async function api(...args: Parameters<typeof fetch>) {
  const res = await fetch(...args)

  if (res.status === 200) {
    return await res.json()
  } else {
    throw new Error(await res.text())
  }
}

import * as React from 'react'

type AddEventListener = Parameters<typeof document.addEventListener>

/**
 * React hook to manage browser event listeners
 *
 * @param event the event name
 * @param handler the event handler function to execute
 * @param doc the dom environment to execute against (defaults to `document`)
 * @param options the event listener options
 */
export function useEventListener(
  event: keyof WindowEventMap,
  handler: (event: any) => void,
  doc: Document | null = isServer ? null : document,
  options?: AddEventListener[2]
) {
  const savedHandler = useLatestRef(handler)

  React.useEffect(() => {
    if (!doc) return

    const listener = (event: any) => {
      savedHandler.current(event)
    }

    doc.addEventListener(event, listener, options)

    return () => {
      doc.removeEventListener(event, listener, options)
    }
  }, [event, doc, options, savedHandler])

  return () => {
    doc?.removeEventListener(event, savedHandler.current, options)
  }
}

/**
 * React hook to persist any value between renders,
 * but keeps it up-to-date if it changes.
 *
 * @param value the value or function to persist
 */
export function useLatestRef<T>(value: T) {
  const ref = React.useRef(value)

  React.useEffect(() => {
    ref.current = value
  }, [value])

  return ref
}
