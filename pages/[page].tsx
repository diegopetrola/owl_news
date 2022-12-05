import Head from "next/head";
import Link from "../components/Link";
import { LinkData } from "./api/feed";
import { GetStaticProps, GetStaticPaths, InferGetStaticPropsType } from "next";
import prisma from "../lib/prisma";

export const getStaticPaths: GetStaticPaths = async () => {
    const pages = (await prisma.link.count()) / 5;
    const paths = [];
    for (let i = 0; i < pages; i++) {
        paths.push({ params: { page: `${i}` } });
    }
    return { paths, fallback: "blocking" };
};

export const getStaticProps: GetStaticProps<{ links: string }> = async (
    context
) => {
    const page = Number(context?.params?.page) || 0;

    let links = JSON.stringify(
        await prisma.link.findMany({
            orderBy: [{ createdAt: "desc" }],
            take: 5,
            skip: page * 5,
            include: { postedBy: { select: { name: true } } },
        })
    );
    return { props: { links }, revalidate: 30 };
};

export default function Home({
    links,
}: InferGetStaticPropsType<typeof getStaticProps>) {
    const data = JSON.parse(links) as LinkData[];
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
