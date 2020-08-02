import { extendType, objectType } from '@nexus/schema'
import { User } from '@prisma/client'

const userAvatar = objectType({
  name: 'UserAvatar',
  definition(t) {
    t.string('url', {
      nullable: true,
    })
  },
})

const userPhone = objectType({
  name: 'UserPhone',
  definition(t) {
    t.string('number', {
      nullable: true,
    })
  },
})

const me = objectType({
  name: 'User',
  definition(t) {
    t.model.id()
    t.model.email()
    t.model.name()
    t.model.phoneNumber()
    t.model.timeZone()
    t.field('phone', {
      type: userPhone,
      resolve: (parent: User) => ({ number: parent.phoneNumber }),
    })
    t.field('avatar', {
      type: userAvatar,
      resolve: (parent: User) => ({ url: parent.avatarUrl }),
    })
    t.model.lastLoginAt()
    t.model.registeredAt()
  },
})

export const userQuery = extendType({
  type: 'Query',
  definition(t) {
    t.field('me', {
      type: me,
      resolve: (_root, args, ctx) => ctx.db.user.findOne({ where: { id: ctx.session.id } }),
    })
  },
})
