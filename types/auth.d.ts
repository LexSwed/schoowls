declare const User: import('@prisma/client').User

interface ContextUser {
  id: User['id']
  email: User['email']
  name: User['name']
  alias: User['alias']
  avatarUrl: User['avatarUrl']
  phoneNumber: User['phoneNumber']
  timeZone: User['timeZone']
}

interface Session {
  issuer: string
  publicAddress: string
  id: User['id']
  email: User['email']
  iat: number
  exp: number
}

interface GraphqlContext {
  user?: ContextUser
}
