import React from 'react'
import { AppPropsType } from 'next/dist/next-server/lib/utils'
// import Head from 'next/head'
import { CSSReset } from '@chakra-ui/core'

import AppProviders from '../components/AppProviders'

function AppWrapper({ Component, pageProps }: AppPropsType) {
  return (
    <>
      {/* <Head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
if (!document.cookie.includes('authed') && !window.location.href.includes('/login')) {
  window.location.href = "/login"
}`,
          }}
        />
      </Head> */}
      <AppProviders>
        <CSSReset />
        <Component {...pageProps} />
      </AppProviders>
    </>
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
