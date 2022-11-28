// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { Link } from "@prisma/client";
import type { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../../lib/prisma";

type Data = {
    link: Link | null;
};

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<Data>
) {
    if (req.method == "GET") {
        let link: Link | null;
        if (req.query.id) {
            link = await prisma.link.findUnique({
                where: { id: req.query.id as string },
            });
        } else {
            link = await prisma.link.findFirst();
        }
        res.status(200).json({ link });
    }
}
