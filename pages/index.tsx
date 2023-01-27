import Head from "next/head";
import Link from "../components/Link";
import { useEffect, useState } from "react";
import { LinkData } from "./api/feed";

const getLinks = async (page: number) => {
    const res = await fetch(`/api/feed`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ page }),
    });
    return res;
};

export default function Home() {
    const [counter, setCounter] = useState(1);
    const [links, setLinks] = useState<LinkData[] | undefined>();

    useEffect(() => {
        const res = getLinks(counter)
            .then((res) => res.json())
            .then((data) => setLinks(data));
    }, [counter]);

    return (
        <div>
            <Head>
                <title>News App</title>
                <meta name="description" content="News aggregator" />
            </Head>

            <main>
                <div className="pt-4">
                    {links
                        ? links.map((link) => (
                              <Link key={link.id} link={link} />
                          ))
                        : "Loading"}
                </div>
                <button
                    className="mt-6 mb-4 flex justify-center m-auto rounded-md border border-transparent bg-gray-700 py-2 px-4 text-sm font-medium text-white hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
                    onClick={async (e) => {
                        e.preventDefault();
                        setCounter(counter + 1);
                    }}
                >
                    More...
                </button>
            </main>
        </div>
    );
}
