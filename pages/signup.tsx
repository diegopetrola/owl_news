import Head from "next/head";
import Signup from "../components/Signup";

export default function signup() {
    return (
        <div>
            <Head>
                <title>News App - Sign up</title>
                <meta name="description" content="News aggregator" />
                <link rel="icon" href="/bird-svgrepo-com.svg" />
            </Head>
            <main>
                <Signup />
            </main>
        </div>
    );
}
