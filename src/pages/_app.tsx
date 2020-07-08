import { AppPropsType } from 'next/dist/next-server/lib/utils'
import { ThemeProvider, CSSReset, ColorModeProvider } from '@chakra-ui/core'

export default function App({ Component, pageProps }: AppPropsType) {
  return (
    <ThemeProvider>
      <ColorModeProvider>
        <CSSReset />
        <Component {...pageProps} />
      </ColorModeProvider>
    </ThemeProvider>
  )
}
