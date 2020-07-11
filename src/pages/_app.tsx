import { AppPropsType } from 'next/dist/next-server/lib/utils'
import { ThemeProvider, CSSReset } from '@chakra-ui/core'
import { ApolloProvider } from '@apollo/client'
import { useApollo } from '../lib/apollo'

export default function App({ Component, pageProps }: AppPropsType) {
  const apolloClient = useApollo(pageProps.initialApolloState)

  return (
    <ThemeProvider>
      <CSSReset />
      <ApolloProvider client={apolloClient}>
        <Component {...pageProps} />
      </ApolloProvider>
    </ThemeProvider>
  )
}
