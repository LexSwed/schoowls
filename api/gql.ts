import { ApolloServer } from 'apollo-server-micro'
import { withUser } from '../server/auth'
import { schema } from '../server/graphql'

const apolloServer = new ApolloServer({
  context: ({ req }) => ({ user: req.user }),
  schema,
  introspection: !(process.env.NODE_ENV === 'production'),
  playground: !(process.env.NODE_ENV === 'production'),
})

export const config = {
  api: {
    bodyParser: false,
  },
}

const handler = apolloServer.createHandler({ path: '/api/gql' })

export default withUser(handler)
