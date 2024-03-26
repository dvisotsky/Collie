import { AppProps } from "next/app"

function MyApp({ Component, pageProps }: AppProps) {
  // Add any global styles or providers here

  return <Component {...pageProps} />
}

export default MyApp
