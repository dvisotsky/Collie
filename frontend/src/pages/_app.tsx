import { AppProps } from 'next/app'
import '../../styles/global.css'
import '@mantine/core/styles.css'

function MyApp({ Component, pageProps }: AppProps) {
  // Add any global styles or providers here

  return <Component {...pageProps} />
}

export default MyApp
