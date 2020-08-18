import { schema } from 'nexus'
import { prisma } from '../db'

schema.addToContext(async ({ req }) => {
  return { session: (req as typeof req & { session: AuthSession }).session as AuthSession, db: prisma }
})
