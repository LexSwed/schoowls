import type { IncomingMessage } from 'http'
import type { NowRequest, NowResponse } from '@vercel/node'

import { decryptToken } from './cookie'
import { getUserDetails } from '../db'

export { authorize } from './authorize'

export function isLoggedIn(req: IncomingMessage) {
  try {
    return Boolean(decryptToken(req))
  } finally {
    return false
  }
}

export function getSession(req: IncomingMessage) {
  try {
    return decryptToken(req)
  } catch (error) {
    console.error(error)
    return null
  }
}

export async function getUserFromRequest(req: IncomingMessage | NowRequest) {
  const data = decryptToken(req)

  const user = await getUserDetails({ email: data.email })

  return user
}

export const withSession = (handler: (req: NowRequest, res: NowResponse) => Promise<any>) => async (
  req: NowRequest,
  res: NowResponse
) => {
  try {
    const token = decryptToken(req)

    ;(req as any).session = token

    return handler(req, res)
  } catch (error) {
    res.writeHead(301, { Location: `/login?source=${req.url}` })
    res.end()
  }
}
