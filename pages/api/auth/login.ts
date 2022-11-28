import { withIronSessionApiRoute } from "iron-session/next";
import { sessionOptions } from "../../../lib/session";
import { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../../lib/prisma";
import * as bcrypt from "bcryptjs";

export type SessionUser = {
    id: string;
    name: string;
    isLoggedIn: boolean;
};

async function loginRoute(
    req: NextApiRequest,
    res: NextApiResponse<SessionUser | { message: string }>
) {
    const { name, password } = await req.body;
    try {
        let user = await prisma.user.findUnique({
            where: { name },
            select: { id: true, name: true, password: true },
        });

        if (!user) {
            res.status(400).json({ message: "Invalid credentials" });
        } else {
            if (await bcrypt.compare(password, user.password)) {
                req.session.user = {
                    id: user.id,
                    name: user.name,
                    isLoggedIn: true,
                } as SessionUser;
                await req.session.save();
                res.json(req.session.user);
            } else {
                res.status(400).json({ message: "Invalid credentials" });
            }
        }
    } catch (error) {
        res.status(500).json({ message: (error as Error).message });
    }
}

export default withIronSessionApiRoute(loginRoute, sessionOptions);
