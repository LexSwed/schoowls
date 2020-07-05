import { NowRequest, NowResponse } from '@vercel/node'
import nexus, { use, schema, settings } from 'nexus'
import { prisma } from 'nexus-plugin-prisma'
import { authPlugin } from '../server/auth/'

const isDev = process.env.NODE_ENV !== 'production'

if (isDev) {
  nexus.reset()
}

use(prisma())
use(authPlugin())

require('../server/graphql')

settings.change({
  server: {
    path: '/api/gql',
  },
})

nexus.assemble()

const { graphql, playground } = require('nexus').default.server.handlers

export default (req: NowRequest, res: NowResponse) => {
  if (isDev && req.method === 'GET') {
    return playground(req, res)
  }
  return graphql(req, res)
}
