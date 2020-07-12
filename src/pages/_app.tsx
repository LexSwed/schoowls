import { AppPropsType } from 'next/dist/next-server/lib/utils'

import { ThemeProvider, CSSReset } from '@chakra-ui/core'
import { ApolloProvider } from '@apollo/client'
import { useApollo } from '../lib/apollo'

function AppWrapper({ Component, pageProps }: AppPropsType) {
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

// AppWrapper.getInitialProps = async (appContext: Parameters<typeof App.getInitialProps>[0]) => {
//   const appProps = await App.getInitialProps(appContext)

//   try {
//     const session = encryptToken(appContext.ctx.req)

//     return { ...appProps, session }
//   } catch (error) {
//     const {
//       ctx: { res },
//       router,
//     } = appContext
//     if (error instanceof TokenExpiredError && !router.pathname.includes('/login')) {
//       res.writeHead(302, { Location: '/login' })

//       return res.end()
//     }
//   }

//   return appProps
// }

export default AppWrapper
