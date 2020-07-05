import jwt from 'jsonwebtoken'
import { serialize, parse } from 'cookie'
import { NowResponse } from '@vercel/node'

export const encrypt = (data: string | object | Buffer, expiresIn = '1d') =>
  new Promise<string>((resolve, reject) =>
    jwt.sign(data, process.env.JWT_SECRET, { expiresIn }, (err, token) => (err ? reject(err) : resolve(token)))
  )

export const decrypt = (token: string) =>
  new Promise<any>((resolve, reject) =>
    jwt.verify(token, process.env.JWT_SECRET, {}, (err, data) => (err ? reject(err) : resolve(data)))
  )

const TOKEN_NAME = 'token'
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

export function parseCookies(req) {
  // For API Routes we don't need to parse the cookies.
  if (req.cookies) return req.cookies

  // For pages we do need to parse the cookies.
  const cookie = req.headers?.cookie
  return parse(cookie || '')
}

export function getTokenCookie(req) {
  const cookies = parseCookies(req)
  return cookies[TOKEN_NAME]
}
