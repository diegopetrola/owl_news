import { Link } from "@prisma/client";
import { withIronSessionApiRoute } from "iron-session/next";
import type { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../../lib/prisma";
import { sessionOptions } from "../../../lib/session";

type Data = { link?: Link; message: string };

async function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
    if (req.method == "POST") {
        const { title, url }: { title: string; url: string } = req.body;
        try {
            if (!title || !url) {
                // 406 = Not Acceptable
                res.status(406).json({
                    message: "Title and URL required.",
                });
            } else if (
                // Check if URL is valid
                !url.match(
                    /((([A-Za-z]{3,9}:(?:\/\/)?)(?:[\-;:&=\+\$,\w]+@)?[A-Za-z0-9\.\-]+|(?:www\.|[\-;:&=\+\$,\w]+@)[A-Za-z0-9\.\-]+)((?:\/[\+~%\/\.\w\-_]*)?\??(?:[\-\+=&;%@\.\w_]*)#?(?:[\.\!\/\\\w]*))?)/
                )
            ) {
                res.status(406).json({
                    message: "URL must be a valid URL.",
                });
            } else {
                if (!req.session.user?.id) {
                    res.status(403).json({
                        message: "User must be logged in",
                    });
                } else {
                    const link = await prisma.link.create({
                        data: { title, url, postedById: req.session.user.id },
                    });
                    res.status(200).json({
                        link,
                        message: "Link posted succesfully!",
                    });
                }
            }
        } catch (e) {
            res.status(500).json({ message: (e as Error).message });
        }
    }
}

export default withIronSessionApiRoute(handler, sessionOptions);
