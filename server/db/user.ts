import { UserWhereUniqueInput } from '@prisma/client'
import { prisma } from './'

export function getUserDetails(where: UserWhereUniqueInput) {
  return prisma.user.findOne({
    where,
    select: {
      id: true,
      email: true,
      name: true,
      avatarUrl: true,
      phoneNumber: true,
      timeZone: true,
    },
  })
}

export type UserDetails = ReturnType<typeof getUserDetails> extends PromiseLike<infer U> ? U : never
