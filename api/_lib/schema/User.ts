import { schema } from 'nexus'

schema.objectType({
  name: 'User',
  definition(t) {
    t.model.id()
    t.model.email()
    t.model.alias()
    t.model.phoneNumber()
    t.model.lastLoginAt()
  },
})

schema.extendType({
  type: 'Query',
  definition(t) {
    t.field('me', {
      type: 'User',
      resolve(_root, _args, ctx) {
        return ctx.db.user.findOne({ where: { issuer: ctx.user.issuer } })
      },
    })
  },
})

// schema.extendType({
//   type: 'Mutation',
//   definition(t) {
//     t.field('updateMyDetails', {
//       type: 'User',
//       args: {
//         email: schema.stringArg(),
//         name: schema.stringArg(),
//         alias: schema.stringArg(),
//         phoneNumber: schema.stringArg(),
//       },
//       resolve: (_root, { email, name, alias, phoneNumber }, ctx) => {
//         return ctx.db.user
//       },
//     })
//   },
// })
