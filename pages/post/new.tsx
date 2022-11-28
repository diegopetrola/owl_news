import Head from "next/head";
import CreateLink from "../../components/CreateLink";
import Header from "../../components/Header";

export default function New() {
    return (
        <div>
            <Head>
                <title>News App - Post News</title>
                <meta name="description" content="News aggregator" />
                <link rel="icon" href="/bird-svgrepo-com.svg" />
            </Head>
            <main>
                <CreateLink />
            </main>
        </div>
    );
}
