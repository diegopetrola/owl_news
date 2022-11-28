import { withIronSessionApiRoute } from "iron-session/next";
import { sessionOptions } from "../../../lib/session";
import { NextApiRequest, NextApiResponse } from "next";
import { SessionUser } from "./login";

async function userRoute(
    req: NextApiRequest,
    res: NextApiResponse<SessionUser>
) {
    if (req.session.user) {
        res.json({
            ...req.session.user,
        });
    } else {
        res.json({
            id: "",
            name: "",
            isLoggedIn: false,
        });
    }
}

export default withIronSessionApiRoute(userRoute, sessionOptions);
