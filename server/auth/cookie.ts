import jwt from 'jsonwebtoken'
import { serialize, parse, CookieSerializeOptions } from 'cookie'
import { NowResponse, NowRequest } from '@vercel/node'
import { IncomingMessage } from 'http'

export const encrypt = (data: Partial<AuthSession>, expiresIn = '5d'): Promise<string> =>
  new Promise<string>((resolve, reject) =>
    jwt.sign(data, process.env.JWT_SECRET, { expiresIn }, (err, token) => (err ? reject(err) : resolve(token)))
  )

export const decrypt = (token: string) => jwt.verify(token, process.env.JWT_SECRET, {}) as AuthSession

const TOKEN_NAME = 'schoowls_token'
const MAX_AGE = 60 * 60 * 24 * 3 // 3 days

function createCookie(name: string, data: string, options: CookieSerializeOptions = {}) {
  return serialize(name, data, {
    maxAge: MAX_AGE,
    expires: new Date(Date.now() + MAX_AGE * 1000),
    secure: process.env.NODE_ENV === 'production',
    path: '/',
    httpOnly: true,
    sameSite: 'lax',
    ...options,
  })
}

export function setTokenCookie(res: NowResponse, token: string) {
  res.setHeader('Set-Cookie', [createCookie(TOKEN_NAME, token), createCookie('authed', 'true', { httpOnly: false })])
}

export function removeTokenCookie(res: NowResponse) {
  res.setHeader('Set-Cookie', [
    createCookie(TOKEN_NAME, '', {
      maxAge: -1,
    }),
    createCookie('authed', '', {
      maxAge: -1,
    }),
  ])
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

export function decryptToken(req: IncomingMessage | NowRequest) {
  const token = getTokenCookie(req)
  const data = decrypt(token)

  return data
}

function isApiRequest(req: IncomingMessage | NowRequest): req is NowRequest {
  return Boolean((req as NowRequest).cookies)
}
