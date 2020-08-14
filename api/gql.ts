import { ApolloServer } from 'apollo-server-micro'
import { withSession } from '../server/auth'
import { schema, context } from '../server/graphql'

const isProd = process.env.NODE_ENV === 'production'

const apolloServer = new ApolloServer({
  context,
  schema,
  tracing: !isProd,
  introspection: !isProd,
  playground: !isProd,
})

export const config = {
  api: {
    bodyParser: false,
  },
}

const handler = apolloServer.createHandler({ path: '/api/gql' })

export default withSession(handler)
