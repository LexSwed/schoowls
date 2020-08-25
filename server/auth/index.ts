import type { IncomingMessage } from 'http'
import type { NowRequest, NowResponse } from '@vercel/node'

import { decryptToken } from './cookie'
import { getUserDetails } from '../db/user'

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

  return await getUserDetails({ email: data.email })
}

export const withSession = (handler: (req: NowRequest, res: NowResponse) => Promise<any>) => async (
  req: NowRequest,
  res: NowResponse
) => {
  try {
    ;(req as any).session = getSession(req)

    return handler(req, res)
  } catch (error) {
    console.log(error)
    res.writeHead(301, { Location: `/login?source=${req.url}` })
    res.end()
  }
}
