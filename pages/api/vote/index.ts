import type { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../../lib/prisma";
import { NotFoundError } from "@prisma/client/runtime";
import { LinkData } from "../feed";

export type VoteData = {
    link?: LinkData;
    message: string;
};

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<VoteData>
) {
    if (req.method == "POST" && req.body.link && req.body.user) {
        try {
            const link = await prisma.link.findUniqueOrThrow({
                where: { id: req.body.link },
            });
            const index = link.votersIDs.indexOf(req.body.user);
            if (index >= 0) {
                link.votersIDs.splice(index, 1);
            } else {
                link.votersIDs.push(req.body.user);
            }
            const updatedLink = await prisma.link.update({
                where: { id: link.id },
                data: { votersIDs: link.votersIDs },
                include: { postedBy: { select: { name: true } } },
            });
            res.status(200).send({
                link: updatedLink,
                message: "Link updated",
            });
        } catch (e) {
            if (e instanceof NotFoundError) {
                res.status(400).send({
                    message: "Link does not exist",
                });
            } else {
                res.status(500).send({
                    message: (e as Error).message,
                });
            }
        }
    } else {
        res.status(400).send({
            message: "Bad Request",
        });
    }
}
