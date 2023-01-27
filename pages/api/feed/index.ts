import { Link } from "@prisma/client";
import type { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../../lib/prisma";

export type LinkData = Link & { postedBy: { name: string } | null };

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<LinkData[]>
) {
    if (req.method == "POST") {
        const page = Number(req.body.page) || 1;
        const links = await prisma.link.findMany({
            orderBy: [{ createdAt: "desc" }],
            take: 5 * page,
            include: { postedBy: { select: { name: true } } },
        });
        res.status(200).json(links);
    }
}
