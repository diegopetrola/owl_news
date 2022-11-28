import type { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../../lib/prisma";
import * as bcrypt from "bcryptjs";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime";

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    if (req.method == "POST" && req.body.password && req.body.name) {
        const password = await bcrypt.hash(req.body.password, 10);
        const name = req.body.name;

        try {
            const user = await prisma.user.create({
                data: { name, password },
                include: { _count: true },
            });
            console.log(user);
            res.status(200).json({ user });
        } catch (e) {
            if (e instanceof PrismaClientKnownRequestError) {
                res.status(409).send({
                    error: `User '${req.body.name}' already exists.`,
                });
            } else {
                res.status(400).send({ error: "Bad Request" });
            }
        }
    } else {
        res.status(400).send({ error: "Bad Request" });
    }
}
