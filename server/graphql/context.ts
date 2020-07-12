import { PrismaClient } from '@prisma/client'
import type { ContextFunction } from 'apollo-server-core'
import { prisma } from '../db'

export interface Context {
  session: AuthSession
  db: PrismaClient
}

export const context: ContextFunction = ({ req }): Context => {
  return { session: req.session as AuthSession, db: prisma }
}
