import type { MagicUserMetadata } from '@magic-sdk/admin'
import type { User } from '@prisma/client'

import { magic } from './magic'
import { prisma } from '../db'
import { getUserDetails } from '../db/user'

export const authorize = async (didToken: string, userDetails: UserDetailsFromFE) => {
  const metadata = await magic.users.getMetadataByToken(didToken)

  const existingUser = await prisma.user.findOne({
    where: {
      email: metadata.email,
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

  const user = await getUserDetails({ email: metadata.email })

  return { session: metadata, user, isNewUser: !existingUser }
}

const signup = async (metadata: MagicUserMetadata, { timeZone, name }: UserDetailsFromFE) => {
  const signUpDate = new Date().toISOString()

  return await prisma.teacher.create({
    data: {
      user: {
        create: {
          name,
          email: metadata.email,
          registeredAt: signUpDate,
          lastLoginAt: signUpDate,
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

type UserDetailsFromFE = { timeZone: string; name?: string }
