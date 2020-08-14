import { prisma } from '../db'

export const context = ({ req }) => {
  return { session: req.session as AuthSession, db: prisma }
}

export type Context = ReturnType<typeof context>
