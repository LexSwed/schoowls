import { extendType, objectType } from '@nexus/schema'
import { User as DbUser } from '@prisma/client'

export const userAvatar = objectType({
  name: 'UserAvatar',
  definition(t) {
    t.string('url', {
      nullable: true,
    })
  },
})

export const userPhone = objectType({
  name: 'UserPhone',
  definition(t) {
    t.string('number', {
      nullable: true,
    })
  },
})

export const User = objectType({
  name: 'User',
  definition(t) {
    t.model.id()
    t.model.email()
    t.model.name()
    t.model.phoneNumber()
    t.model.timeZone()
    t.field('phone', {
      type: userPhone,
      resolve: (parent: DbUser) => ({ number: parent.phoneNumber }),
    })
    t.field('avatar', {
      type: userAvatar,
      resolve: (parent: DbUser) => ({ url: parent.avatarUrl }),
    })
    t.model.lastLoginAt()
    t.model.registeredAt()
  },
})

export const userQuery = extendType({
  type: 'Query',
  definition(t) {
    t.field('me', {
      type: User,
      resolve: (_root, args, ctx) => ctx.db.user.findOne({ where: { id: ctx.session.id } }),
    })
  },
})
