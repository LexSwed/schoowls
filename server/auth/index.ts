import type { IncomingMessage } from 'http'
import type { NowRequest, NowResponse } from '@vercel/node'

import { encryptToken } from './cookie'
import { getUserDetails } from '../db'

export { authorize } from './authorize'

export function isLoggedIn(req: IncomingMessage) {
  try {
    return Boolean(encryptToken(req))
  } finally {
    return false
  }
}

export function getSession(req: IncomingMessage) {
  try {
    return encryptToken(req)
  } catch (error) {
    console.error(error)
    return null
  }
}

export async function getUserFromRequest(req: IncomingMessage | NowRequest) {
  const data = encryptToken(req)

  const user = await getUserDetails({ email: data.email })

  return user
}

export const withSession = (handler: (req: NowRequest, res: NowResponse) => Promise<any>) => async (
  req: NowRequest,
  res: NowResponse
) => {
  try {
    Object.defineProperty(req, 'session', {
      get() {
        return encryptToken(req)
      },
    })

    return handler(req, res)
  } catch (error) {
    res.writeHead(301, { Location: '/login' })
    res.end()
  }
}

type UserDetailsFromFE = { timeZone: string }
