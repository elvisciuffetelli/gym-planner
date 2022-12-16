import "../styles/globals.css";
import Layout from "../components/Layout";
import { SWRConfig } from "swr";
import type { AppProps } from "next/app";
import { fetcher } from "../api/request";
import Header from "../components/Header";

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
    </SWRConfig>
  );
}
