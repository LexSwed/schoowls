import { encrypt, setTokenCookie } from '../server/auth/cookie'
import { NowRequest, NowResponse } from '@vercel/node'
import { authorize } from '../server/auth'
import { UserDetails } from '../server/db'

export default async function login(req: NowRequest, res: NowResponse) {
  if (req.method !== 'POST') return res.status(405).end()

  try {
    const didToken = req.headers.authorization.substr(7)
    const { timeZone, name } = req.body

    if (!didToken) {
      return res.status(401).end()
    }

    const { session, user, isNewUser } = await authorize(didToken, { timeZone, name })
    const token = await encrypt({ ...session, id: user.id })
    setTokenCookie(res, token)

    const response: AuthResponse = { user, isNewUser }

    res.status(200).send(response)
  } catch (error) {
    res.status(error.status || 500).end(error.message)
  }
}

export type AuthResponse = {
  user: UserDetails
  isNewUser: boolean
}
