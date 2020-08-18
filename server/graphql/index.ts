import { settings, use } from 'nexus'
import { prisma } from 'nexus-plugin-prisma'
import path from 'path'

import { prisma as instance } from '../db'

import './context'
import './user'
import './timetable'

use(prisma({ migrations: true, features: { crud: true }, client: { instance } }))

// Nexus Settings
// see: https://nexusjs.org/api/nexus/settings
settings.change({
  schema: {
    generateGraphQLSDLFile: path.resolve('./generated'),
  },
  server: {
    playground: process.env.NODE_ENV !== 'production',
    path: '/api/gql',
    cors: false,
  },
})
