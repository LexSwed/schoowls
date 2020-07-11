import type { MagicUserMetadata } from '@magic-sdk/admin'
import type { User } from '@prisma/client'
import { IncomingMessage } from 'http'

import { magic } from './magic'
import { prisma } from '../db'
import { encryptToken } from './cookie'
import { getUserDetails } from '../db'
import { NowRequest, NowResponse } from '@vercel/node'

export const authorize = async (didToken: string, userDetails: UserDetailsFromFE) => {
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

  const user = await getUserDetails({ issuer: metadata.issuer })

  return { session: metadata, user }
}

const signup = async (metadata: MagicUserMetadata, { timeZone }: UserDetailsFromFE) => {
  const signUpDate = new Date().toISOString()

  return await prisma.user.create({
    data: {
      issuer: metadata.issuer,
      email: metadata.email,
      registeredAt: signUpDate,
      lastLoginAt: signUpDate,
      timeZone,
    },
  })
}

const login = async (existingUser: { id: User['id'] }) => {
  return await prisma.user.update({
    where: { id: existingUser.id },
    data: { lastLoginAt: new Date().toISOString() },
  })
}

export function isLoggedIn(req: IncomingMessage) {
  try {
    return Boolean(encryptToken(req))
  } finally {
    return false
  }
}

export async function getUserFromRequest(req: IncomingMessage | NowRequest): Promise<ContextUser> {
  const data = encryptToken(req)

  const user = await getUserDetails({ email: data.email })

  return user
}

export const withUser = (handler: (req: NowRequest, res: NowResponse) => Promise<any>) => async (
  req: NowRequest,
  res: NowResponse
) => {
  try {
    const data = encryptToken(req)

    const user = await getUserDetails({ email: data.email })

    Object.defineProperty(req, 'user', {
      get() {
        return user
      },
    })

    return handler(req, res)
  } catch (error) {
    res.writeHead(301, { Location: '/login' })
    res.end()
  }
}

type UserDetailsFromFE = { timeZone: string }
