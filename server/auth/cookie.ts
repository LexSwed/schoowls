import jwt from 'jsonwebtoken'
import { serialize, parse } from 'cookie'
import { NowResponse, NowRequest } from '@vercel/node'
import { IncomingMessage } from 'http'

export const encrypt = (data: Partial<Session>, expiresIn = '1d'): Promise<string> =>
  new Promise<string>((resolve, reject) =>
    jwt.sign(data, process.env.JWT_SECRET, { expiresIn }, (err, token) => (err ? reject(err) : resolve(token)))
  )

export const decrypt = (token: string) => jwt.verify(token, process.env.JWT_SECRET, {}) as Session

const TOKEN_NAME = 'schoowls_token'
const MAX_AGE = 60 * 60 * 24 * 3 // 3 days

export function setTokenCookie(res: NowResponse, token: string) {
  const cookie = serialize(TOKEN_NAME, token, {
    maxAge: MAX_AGE,
    expires: new Date(Date.now() + MAX_AGE * 1000),
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    path: '/',
    sameSite: 'lax',
  })
  res.setHeader('Set-Cookie', cookie)
}

export function removeTokenCookie(res: NowResponse) {
  const cookie = serialize(TOKEN_NAME, '', {
    maxAge: -1,
    path: '/',
  })

  res.setHeader('Set-Cookie', cookie)
}

export function parseCookies(req: IncomingMessage | NowRequest) {
  if (isApiRequest(req)) return req.cookies

  const cookie = req.headers?.cookie
  return parse(cookie || '')
}

export function getTokenCookie(req: IncomingMessage | NowRequest) {
  const cookies = parseCookies(req)
  return cookies[TOKEN_NAME]
}

export function encryptToken(req: IncomingMessage | NowRequest) {
  const token = getTokenCookie(req)
  const data = decrypt(token)

  return data
}

function isApiRequest(req: IncomingMessage | NowRequest): req is NowRequest {
  return Boolean((req as NowRequest).cookies)
}
