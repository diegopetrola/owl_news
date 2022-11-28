import { Link } from "@prisma/client";
import type { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../../lib/prisma";

export type LinkData = Link & { postedBy: { name: string } | null };

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<LinkData[]>
) {
    if (req.method == "GET") {
        const links = await prisma.link.findMany({
            take: 10,
            include: { postedBy: { select: { name: true } } },
        });
        res.status(200).json(links);
    }
}
