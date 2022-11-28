import "../styles/globals.css";
import type { AppProps } from "next/app";
import Layout from "../components/Layout";
import { Inter } from "@next/font/google";
import Head from "next/head";

const inter = Inter({ subsets: ["latin"] });

export default function App({ Component, pageProps }: AppProps) {
    return (
        <Layout className={inter.className}>
            <Head>
                <link rel="icon" href="/bird-svgrepo-com.svg" />
            </Head>
            <Component {...pageProps} />
        </Layout>
    );
}
