import { NowRequest, NowResponse } from '@vercel/node'
import nexus, { settings } from 'nexus'

const isDev = process.env.NODE_ENV !== 'production'

if (isDev) {
  require('nexus').default.reset()
}

require('./_lib/setup')
require('./_lib/schema')

settings.change({
  server: {
    path: '/api/gql',
  },
})

nexus.assemble()

const { graphql, playground } = nexus.server.handlers

export default (req: NowRequest, res: NowResponse) => {
  if (isDev && req.method === 'GET') {
    return playground(req, res)
  }
  return graphql(req, res)
}
