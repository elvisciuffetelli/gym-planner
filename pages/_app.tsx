import '../styles/globals.css'
import Layout from '../components/Layout'
import { SWRConfig } from 'swr'
import type { AppProps } from 'next/app'
import { fetcher } from '../api/request'
import Header from '../components/Header'
import { Toaster } from 'react-hot-toast'

export default function App({ Component, pageProps }: AppProps) {
  return (
    <SWRConfig
      value={{
        revalidateOnFocus: true,
        fetcher,
      }}
    >
      <Header />
      <Layout>
        <Component {...pageProps} />
      </Layout>
      <Toaster
        toastOptions={{ duration: 5000, position: 'bottom-center' }}
        containerStyle={{ bottom: 32, right: 32 }}
      />
    </SWRConfig>
  )
}
