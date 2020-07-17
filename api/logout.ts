import { magic } from '../server/auth/magic'
import { removeTokenCookie, decrypt } from '../server/auth/cookie'

export default async function logout(req, res) {
  if (req.method !== 'POST') return res.status(405).end()

  const session = decrypt(req)

  await magic.users.logoutByIssuer(session.issuer)

  removeTokenCookie(res)

  res.writeHead(302, { Location: '/' })
  res.end()
}
