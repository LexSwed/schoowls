import { PrismaClient } from '@prisma/client'

export let prisma: PrismaClient

if (process.env.NODE_ENV !== 'development') {
  prisma = new PrismaClient()
} else {
  if (!global['prisma']) {
    global['prisma'] = new PrismaClient()
  }

  prisma = global['prisma']
}

export async function disconnect(): Promise<boolean> {
  await prisma.disconnect()

  return true
}

export async function connect(): Promise<boolean> {
  await prisma.connect()

  return true
}
