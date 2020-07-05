import { use, settings } from 'nexus'
import { prisma } from 'nexus-plugin-prisma'

import { authPlugin } from './auth'

use(prisma())
use(authPlugin())

settings.change({
  server: {
    path: '/graphql',
  },
})
