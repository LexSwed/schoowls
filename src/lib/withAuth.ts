import { GetServerSideProps } from 'next'
import { isLoggedIn } from '../../server/auth'

export function withAuth(cb: GetServerSideProps): GetServerSideProps {
  return async (ctx) => {
    if (!isLoggedIn(ctx.req)) {
      ctx.res.writeHead(302, { Location: '/login' })
      ctx.res.end()

      return {
        props: {},
      }
    }

    return cb(ctx)
  }
}
