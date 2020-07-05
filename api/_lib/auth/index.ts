import { server } from 'nexus'
import * as passport from 'passport'
import { MagicUser } from 'passport-magic'
import { magic } from './magic'
import { PluginEntrypoint } from 'nexus/plugin'

/* Attach middleware to login endpoint */
server.express.post('/login', (req, res) => {
  return passport.authenticate('magic', (error, user, info) => {
    if (info?.message === 'signup') {
      res.redirect('/create')
    }
  })(req, res)
})

server.express.post('/logout', async (req, res) => {
  if (req.isAuthenticated()) {
    await magic.users.logoutByIssuer((req.user as MagicUser).issuer)
    req.logout()
    return res.status(200).end()
  } else {
    return res.status(401).end(`User is not logged in.`)
  }
})

export const authPlugin: PluginEntrypoint = () => ({
  packageJsonPath: require.resolve('../../../package.json'),
  runtime: {
    module: require.resolve('./plugin'),
    export: 'plugin',
  },
})
