import { makeSchema, connectionPlugin } from '@nexus/schema'
import { nexusSchemaPrisma } from 'nexus-plugin-prisma/schema'
import { DateTime } from 'graphql-iso-date'

import path from 'path'
import { userQuery } from './user'
import { prisma } from '../db'

export const schema = makeSchema({
  types: [userQuery],
  outputs: {
    schema: path.resolve('./server/graphql/generated/schema.graphql'),
    typegen: path.resolve('./server/graphql/generated/typings.d.ts'),
  },
  plugins: [
    nexusSchemaPrisma({
      prismaClient: () => prisma,
      experimentalCRUD: true,
      scalars: {
        DateTime: DateTime,
      },
    }),
    connectionPlugin(),
  ],
  typegenAutoConfig: {
    contextType: 'Context.Context',
    sources: [
      {
        source: '@prisma/client',
        alias: 'prisma',
      },
      {
        source: require.resolve('./context'),
        alias: 'Context',
      },
    ],
  },
})
