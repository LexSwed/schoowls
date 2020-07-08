import { UserWhereUniqueInput } from '@prisma/client'
import { prisma } from './'

export function getUserDetails(where: UserWhereUniqueInput): Promise<UserAuth> {
  return prisma.user.findOne({
    where,
    select: {
      id: true,
      email: true,
      details: {
        select: {
          name: true,
          alias: true,
          avatarUrl: true,
          phoneNumber: true,
          timeZone: true,
        },
      },
    },
  })
}
