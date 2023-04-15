import jwt from 'jsonwebtoken';
import UserService from "../../../services/User/UserService";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {

    if (req.method !== 'POST') {
        return res.status(405).end();
    }

    try {

        const login = req.body;
        const secret = process.env.JWT_SECRET;

        if (!secret) throw 500;

        const user: any = await UserService.login({
            email: login.email,
            password: login.password
        })

        if (!user) throw 401;

        const token = jwt.sign({ userId: user.id }, secret, { expiresIn: '1h' });
        res.status(200).json({ token });

    } catch (error: any) {
        console.log(error);
        res.status(error).end();
    }
}
