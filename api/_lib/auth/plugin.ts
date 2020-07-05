import { RuntimePlugin } from 'nexus/plugin'
import { MagicUser } from 'passport-magic'

export const plugin: RuntimePlugin = () => () => {
  return {
    context: {
      create: (req) => {
        return {
          user: req.isAuthenticated() ? (req.user as MagicUser) : null,
        }
      },
      typeGen: {
        fields: {
          user: 'import("passport-magic").MagicUser | null',
        },
      },
    },
  }
}
