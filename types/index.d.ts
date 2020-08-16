declare module '*.gql' {
  const documents: Record<string, import('graphql').DocumentNode>

  export = documents
}

declare const User: import('@prisma/client').User

interface ContextUser {
  id: User['id']
  email: User['email']
  name: User['name']
  avatarUrl: User['avatarUrl']
  phoneNumber: User['phoneNumber']
  timeZone: User['timeZone']
}

interface AuthSession {
  issuer: string
  publicAddress: string
  id: User['id']
  email: User['email']
  iat: number
  exp: number
}
