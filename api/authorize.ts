import { encrypt, setTokenCookie } from '../server/auth/cookie'
import { NowRequest, NowResponse } from '@vercel/node'
import { authorize } from '../server/auth'

export default async function login(req: NowRequest, res: NowResponse) {
  try {
    const didToken = req.headers.authorization.substr(7)

    if (!didToken) {
      return res.status(401).end()
    }

    const { session, user } = await authorize(didToken)
    const token = await encrypt(session)
    setTokenCookie(res, token)

    res.status(200).send({ user })
  } catch (error) {
    res.status(error.status || 500).end(error.message)
  }
}
