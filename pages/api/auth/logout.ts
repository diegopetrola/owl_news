import { withIronSessionApiRoute } from "iron-session/next";
import { NextApiRequest, NextApiResponse } from "next";
import { sessionOptions } from "../../../lib/session";
import { SessionUser } from "./login";

function logoutRoute(req: NextApiRequest, res: NextApiResponse<SessionUser>) {
    req.session.destroy();
    res.status(200).json({ isLoggedIn: false, name: "" });
}

export default withIronSessionApiRoute(logoutRoute, sessionOptions);
