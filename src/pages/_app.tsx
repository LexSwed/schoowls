import { AppPropsType } from 'next/dist/next-server/lib/utils'
import { ThemeProvider } from '@fxtrot/edge'

export default function App({ Component, pageProps }: AppPropsType) {
  return (
    <ThemeProvider>
      <Component {...pageProps} />
    </ThemeProvider>
  )
}
