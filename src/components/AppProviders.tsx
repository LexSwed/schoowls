import React from 'react'
import { ThemeProvider } from '@chakra-ui/core'
import { ApolloProvider } from '@apollo/client'
import { createApolloClient } from '../lib/apollo'

const defaultApolloClient = createApolloClient()

const AppProviders: React.FC = ({ children }) => {
  return (
    <ThemeProvider>
      <ApolloProvider client={defaultApolloClient}>{children}</ApolloProvider>
    </ThemeProvider>
  )
}

export default AppProviders
