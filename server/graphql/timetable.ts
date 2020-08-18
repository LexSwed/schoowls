import { schema } from 'nexus'

schema.objectType({
  name: 'Period',
  definition(t) {
    t.model.id()
    t.model.duration()
    t.model.startTime()
  },
})

schema.objectType({
  name: 'Teacher',
  definition(t) {
    t.model.user()
    t.model.timetables()
  },
})

schema.objectType({
  name: 'Timetable',
  definition(t) {
    t.model.id()
    t.model.periods()
    t.model.creator()
  },
})

schema.extendType({
  type: 'Query',
  definition(t) {
    t.connection('timetables', {
      type: 'Timetable',
      nodes(root, args, { db, session }) {
        return db.timetable.findMany({
          where: {
            teacherId: session.id,
          },
        })
      },
    })
  },
})

schema.inputObjectType({
  name: 'PeriodInput',
  definition(t) {
    t.int('duration', {
      required: true,
      description: 'Duration of the period in minutes',
    })
    t.string('startTime', {
      required: true,
      description: 'Start time of the period in HH:mm format',
    })
  },
})

schema.extendType({
  type: 'Mutation',
  definition(t) {
    t.field('createTimetable', {
      type: 'Timetable',
      args: {
        periods: schema.arg({
          type: 'PeriodInput',
          list: true,
          required: true,
        }),
      },
      resolve: async (root, { periods }, { db, session }) => {
        const res = await db.timetable.create({
          data: {
            creator: {
              connect: {
                userId: session.id,
              },
            },
            periods: {
              create: periods,
            },
          },
          select: {
            id: true,
            creator: true,
            periods: {
              select: {
                id: true,
                startTime: true,
                duration: true,
              },
            },
          },
        })

        return res
      },
    })
  },
})
