import type { MagicUserMetadata } from '@magic-sdk/admin'
import type { User, UserDetails } from '@prisma/client'
import { IncomingMessage } from 'http'

import { magic } from './magic'
import { prisma } from '../db'
import { encryptToken } from './cookie'
import { getUserDetails } from '../db'

export const authorize = async (didToken: string, userDetails: Partial<UserDetails>) => {
  const metadata = await magic.users.getMetadataByToken(didToken)

  let existingUser = await prisma.user.findOne({
    where: {
      issuer: metadata.issuer,
    },
    select: {
      id: true,
    },
  })

  if (!existingUser) {
    await signup(metadata, userDetails)
  } else {
    await login(existingUser)
  }

  const user: UserAuth = await getUserDetails({ issuer: metadata.issuer })

  return { session: metadata, user }
}

const signup = async (metadata: MagicUserMetadata, { timeZone }: Partial<UserDetails>) => {
  const signUpDate = new Date().toISOString()

  return await prisma.user.create({
    data: {
      issuer: metadata.issuer,
      email: metadata.email,
      registeredAt: signUpDate,
      lastLoginAt: signUpDate,
      details: {
        create: {
          timeZone,
        },
      },
    },
  })
}

const login = async (existingUser: { id: User['id'] }) => {
  return await prisma.user.update({
    where: { id: existingUser.id },
    data: { lastLoginAt: new Date().toISOString() },
  })
}

export async function isLoggedIn(req: IncomingMessage) {
  try {
    return Boolean(await encryptToken(req))
  } finally {
    return false
  }
}

export async function getUserFromRequest(req: IncomingMessage): Promise<UserAuth> {
  const data = await encryptToken(req)

  const user = await getUserDetails({ email: data.email })

  return JSON.parse(JSON.stringify(user)) // next.js requires Date to be String
}
