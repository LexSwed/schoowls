import type { MagicUserMetadata } from '@magic-sdk/admin'
import type { User } from '@prisma/client'
import { IncomingMessage } from 'http'

import { magic } from './magic'
import { prisma } from '../db'
import { getCurrentUser } from './cookie'

export const authorize = async (didToken: string) => {
  const metadata = await magic.users.getMetadataByToken(didToken)

  let existingUser = await prisma.user.findOne({
    where: {
      issuer: metadata.issuer,
    },
  })

  if (!existingUser) {
    existingUser = await signup(metadata)
  } else {
    existingUser = await login(existingUser)
  }

  return { session: metadata, user: existingUser }
}

const signup = async (metadata: MagicUserMetadata) => {
  const signUpDate = new Date().toISOString()

  return await prisma.user.create({
    data: {
      issuer: metadata.issuer,
      email: metadata.email,
      registeredAt: signUpDate,
      lastLoginAt: signUpDate,
    },
  })
}

const login = async (existingUser: User) => {
  return await prisma.user.update({
    where: { id: existingUser.id },
    data: { lastLoginAt: new Date().toISOString() },
  })
}

export async function isLoggedIn(req: IncomingMessage) {
  try {
    return Boolean(await getCurrentUser(req))
  } finally {
    return false
  }
}

export async function getUserFromRequest(req: IncomingMessage) {
  const data = await getCurrentUser(req)

  const user = await prisma.user.findOne({ where: { email: data.email } })

  return JSON.parse(JSON.stringify(user)) // next.js requires Date to be String
}
