import Head from "next/head";
import Login from "../components/Login";

export default function login() {
    return (
        <div>
            <Head>
                <title>News App - Log In</title>
                <meta name="description" content="News aggregator" />
                <link rel="icon" href="/bird-svgrepo-com.svg" />
            </Head>
            <main>
                <Login />
            </main>
        </div>
    );
}
