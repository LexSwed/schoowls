import { UserWhereUniqueInput } from '@prisma/client'
import { prisma } from './'

export function getUserDetails(where: UserWhereUniqueInput) {
  return prisma.user.findOne({
    where,
    select: {
      id: true,
      email: true,
      issuer: true,
      name: true,
      alias: true,
      avatarUrl: true,
      phoneNumber: true,
      timeZone: true,
    },
  })
}
