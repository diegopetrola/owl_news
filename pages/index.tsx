import Head from "next/head";
import Link from "../components/Link";
import useSWR from "swr";
import { LinkData } from "./api/feed";

const fetcher = (url: string) => fetch(url).then((res) => res.json());

export default function Home() {
    const { data, error } = useSWR<LinkData[]>("/api/feed", fetcher);
    if (error) return <div>Failed to Load</div>;
    if (!data) return <div className="flex center">Loading...</div>;

    return (
        <div>
            <Head>
                <title>News App</title>
                <meta name="description" content="News aggregator" />
            </Head>

            <main>
                <div className="pt-4">
                    {data.map((link) => (
                        <Link key={link.id} link={link} />
                    ))}
                </div>
            </main>
        </div>
    );
}
