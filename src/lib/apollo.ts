import { ApolloClient, HttpLink, InMemoryCache } from '@apollo/client'
import Router from 'next/router'
import fetch from 'cross-fetch'

export function createApolloClient(ctx?: Record<string, any>) {
  // Apollo needs an absolute URL when in SSR, so determine host
  let host, protocol
  let hostUrl = process.env.API_URL

  if (ctx) {
    host = ctx?.req.headers['x-forwarded-host']
    protocol = ctx?.req.headers['x-forwarded-proto'] || 'http'
    hostUrl = `${protocol}://${host}`
  } else if (typeof location !== 'undefined') {
    host = location.host
    protocol = location.protocol
    hostUrl = `${protocol}//${host}`
  }

  const httpLink = new HttpLink({
    uri: `${hostUrl}/api/gql`,
    fetch: (...args) =>
      fetch(...args).then((res) => {
        if (res.status === 401) {
          Router.push(`/login?from=${Router.route}`)
        }

        return res
      }),
  })

  const client = new ApolloClient({
    link: httpLink,
    cache: new InMemoryCache(),
  })

  return client
}
