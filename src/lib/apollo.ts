import { useMemo } from 'react'
import { ApolloClient, HttpLink, InMemoryCache } from '@apollo/client'
import Router from 'next/router'

let apolloClient

function createIsomorphLink() {
  if (typeof window === 'undefined') {
    const { SchemaLink } = require('apollo-link-schema')
    const { schema } = require('../../server/graphql')

    return new SchemaLink({ schema })
  } else {
    return new HttpLink({
      uri: '/api/gql',
      fetch: (...args) =>
        fetch(...args).then((res) => {
          if (res.status === 401) {
            Router.push(`/login?from=${Router.route}`)
          }

          return res
        }),
    })
  }
}

function createApolloClient() {
  return new ApolloClient({
    ssrMode: typeof window === 'undefined',
    link: createIsomorphLink(),
    cache: new InMemoryCache(),
  })
}

export function initializeApollo(initialState = null) {
  const _apolloClient = apolloClient ?? createApolloClient()

  // If your page has Next.js data fetching methods that use Apollo Client, the initial state
  // get hydrated here
  if (initialState) {
    _apolloClient.cache.restore(initialState)
  }
  // For SSG and SSR always create a new Apollo Client
  if (typeof window === 'undefined') return _apolloClient
  // Create the Apollo Client once in the client
  if (!apolloClient) apolloClient = _apolloClient

  return _apolloClient
}

export function useApollo(initialState) {
  const store = useMemo(() => initializeApollo(initialState), [initialState])
  return store
}
