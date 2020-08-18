// eslint-disable-next-line
if (process.env.NODE_ENV === 'development') require('nexus').default.reset()

// eslint-disable-next-line
const app = require('nexus').default
// Require your nexus modules here.
// Do not write them inline, since the Nexus API is typed `any` because of `require` import.
require('../server/graphql')
// eslint-disable-next-line
const { withSession } = require('../server/auth')

app.assemble()

export default withSession(app.server.handlers.graphql)
