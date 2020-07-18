import { Magic } from 'magic-sdk'
import { UserDetails } from '../../server/db'

import { api } from '.'

export async function magicLogin({
  email,
  name,
}: {
  email: string
  name?: string
}): Promise<{ user: UserDetails; isNewUser: boolean }> | null {
  const magic = new Magic(process.env.NEXT_PUBLIC_MAGIC_PUBLIC_KEY)

  const body = {
    name,
    email,
    timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone,
  }
  const didToken = await magic.auth.loginWithMagicLink(body)
  return await api('/api/authorize', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + didToken,
    },
    body: JSON.stringify(body),
  })
}

const cache = new Map<string, boolean>()
export async function checkExistingUser(email: string): Promise<boolean> {
  if (cache.has(email)) return cache.get(email)

  return await api('/api/check-email', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ email }),
  }).then((isExists) => {
    cache.set(email, isExists)

    return isExists
  })
}
