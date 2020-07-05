import { RuntimePlugin } from 'nexus/plugin'

export const plugin: RuntimePlugin = () => () => {
  return {
    context: {
      create: (req) => {
        return {
          user: req.user,
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
