import { magic } from './magic'
import * as passport from 'passport'
import { isBefore } from 'date-fns'
import { Strategy as MagicStrategy, MagicUser, DoneFunc } from 'passport-magic'
import { User } from '@prisma/client'

import { prisma } from '../db'

const strategy = new MagicStrategy(async function (user, done) {
  const userMetadata = await magic.users.getMetadataByIssuer(user.issuer)
  const existingUser = await prisma.user.findOne({
    where: {
      issuer: userMetadata.issuer,
    },
  })
  if (!existingUser) {
    await signup(user, userMetadata, done)
  } else {
    await login(user, existingUser, done)
  }
})

passport.use(strategy)

const signup = async (user: MagicUser, userMetadata: MagicUserMetadata, done: DoneFunc) => {
  const signUpDate = new Date(user.claim.iat).toISOString()
  await prisma.user.create({
    data: {
      issuer: user.issuer,
      email: userMetadata.email,
      registeredAt: signUpDate,
      lastLoginAt: signUpDate,
    },
  })
  done(null, user, { message: 'signup' })
}

const login = async (user: MagicUser, existingUser: User, done: DoneFunc) => {
  /* Replay attack protection (https://go.magic.link/replay-attack) */
  if (isBefore(user.claim.iat, existingUser.lastLoginAt)) {
    return null
  }

  await prisma.user.update({
    where: { id: existingUser.id },
    data: { lastLoginAt: new Date(user.claim.iat).toISOString() },
  })

  done(null, user)
}

passport.serializeUser((user: MagicUser, done) => {
  done(null, user.issuer)
})

type MagicUserMetadata = ReturnType<typeof magic.users.getMetadataByIssuer> extends PromiseLike<infer U> ? U : never
