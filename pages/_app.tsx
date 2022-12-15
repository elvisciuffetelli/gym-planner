import '../styles/globals.css'
import Layout from '../components/Layout'
import { SWRConfig } from 'swr'
import type { AppProps } from 'next/app'
import { fetcher } from '../api/request'

export default function App({ Component, pageProps }: AppProps) {
  return (
    <SWRConfig value={{
      revalidateOnFocus: true,
      fetcher
      }}>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </SWRConfig>
  )
}
