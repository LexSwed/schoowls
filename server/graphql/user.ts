import { schema } from 'nexus'
import { User as DbUser } from '@prisma/client'

schema.objectType({
  name: 'UserAvatar',
  definition(t) {
    t.string('url', {
      nullable: true,
    })
  },
})
schema.objectType({
  name: 'UserPhone',
  definition(t) {
    t.string('number', {
      nullable: true,
    })
  },
})

schema.objectType({
  name: 'User',
  definition(t) {
    t.model.id()
    t.model.email()
    t.model.name()
    t.model.phoneNumber()
    t.model.timeZone()
    t.field('phone', {
      type: 'UserPhone',
      resolve: (parent: DbUser) => ({ number: parent.phoneNumber }),
    })
    t.field('avatar', {
      type: 'UserAvatar',
      resolve: (parent: DbUser) => ({ url: parent.avatarUrl }),
    })
    t.model.lastLoginAt()
    t.model.registeredAt()
  },
})

schema.extendType({
  type: 'Query',
  definition(t) {
    t.field('me', {
      type: 'User',
      resolve: (_root, args, ctx) => ctx.db.user.findOne({ where: { id: ctx.session.id } }),
    })
  },
})
