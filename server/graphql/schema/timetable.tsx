import { extendType, objectType, intArg, arg, inputObjectType } from '@nexus/schema'

export const period = objectType({
  name: 'Period',
  definition(t) {
    t.model.id()
    t.model.duration()
    t.model.startTime()
  },
})

export const timetable = objectType({
  name: 'Timetable',
  definition(t) {
    t.model.id()
    t.model.periods()
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

export const createTimetable = extendType({
  type: 'Mutation',
  definition(t) {
    t.field('createTimetable', {
      type: timetable,
      args: {
        periods: arg({
          type: periodInput,
          list: true,
          required: true,
        }),
      },
      resolve: async (root, { periods }, ctx) => {
        try {
          const res = await ctx.db.timetable.create({
            data: {
              periods: {
                create: periods,
              },
            },
            select: {
              id: true,
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
        } catch (error) {
          return new Error('Failed to create a timetable')
        }
      },
    })
  },
})
