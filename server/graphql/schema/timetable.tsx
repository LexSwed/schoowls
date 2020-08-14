import { extendType, objectType, arg, inputObjectType } from '@nexus/schema'
import type { Context } from '../context'

export const Period = objectType({
  name: 'Period',
  definition(t) {
    t.model.id()
    t.model.duration()
    t.model.startTime()
  },
})

export const Teacher = objectType({
  name: 'Teacher',
  definition(t) {
    t.model.user()
    t.model.timetables()
  },
})

export const Timetable = objectType({
  name: 'Timetable',
  definition(t) {
    t.model.id()
    t.model.periods()
    t.model.creator()
  },
})

export const periodInput = inputObjectType({
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

export const getTimetable = extendType({
  type: 'Query',
  definition(t) {
    t.connectionField('timetables', {
      type: Timetable,
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

export const createTimetable = extendType({
  type: 'Mutation',
  definition(t) {
    t.field('createTimetable', {
      type: Timetable,
      args: {
        periods: arg({
          type: periodInput,
          list: true,
          required: true,
        }),
      },
      resolve: async (root, { periods }, { db, session }: Context) => {
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
