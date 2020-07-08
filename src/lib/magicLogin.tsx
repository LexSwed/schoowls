import { Magic } from 'magic-sdk'
import { User } from '@prisma/client'

export async function magicLogin(email: string): Promise<User> | null {
  const magic = new Magic(process.env.NEXT_PUBLIC_MAGIC_PUBLIC_KEY)

  const body = {
    email,
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
