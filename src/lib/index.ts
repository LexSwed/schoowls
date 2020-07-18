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
