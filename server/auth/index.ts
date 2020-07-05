import type { MagicUserMetadata } from '@magic-sdk/admin'
import type { User } from '@prisma/client'

import { magic } from './magic'
import { prisma } from '../db'

export const authorize = async (didToken: string) => {
  const metadata = await magic.users.getMetadataByToken(didToken)

  const existingUser = await prisma.user.findOne({
    where: {
      issuer: metadata.issuer,
    },
  })

  if (!existingUser) {
    await signup(metadata)
  } else {
    await login(existingUser)
  }

  return metadata
}

const signup = async (metadata: MagicUserMetadata) => {
  const signUpDate = new Date().toISOString()

  await prisma.user.create({
    data: {
      issuer: metadata.issuer,
      email: metadata.email,
      registeredAt: signUpDate,
      lastLoginAt: signUpDate,
    },
  })
}

const login = async (existingUser: User) => {
  await prisma.user.update({
    where: { id: existingUser.id },
    data: { lastLoginAt: new Date().toISOString() },
  })
}
