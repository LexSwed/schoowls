import { Magic } from 'magic-sdk'

export async function magicLogin(email: string): Promise<UserAuth> | null {
  const magic = new Magic(process.env.NEXT_PUBLIC_MAGIC_PUBLIC_KEY)

  const body = {
    email,
    timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone,
  }
  const didToken = await magic.auth.loginWithMagicLink(body)
  const res = await fetch('/api/authorize', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + didToken,
    },
    body: JSON.stringify(body),
  })
  if (res.status === 200) {
    const { user } = await res.json()

    return user
  } else {
    throw new Error(await res.text())
  }
}
