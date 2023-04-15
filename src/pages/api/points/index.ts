import { Point } from "@prisma/client";
import { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "../../../util/db";

const handlers = {

    async get(req: NextApiRequest, res: NextApiResponse) {
        const points = await prisma.point.findMany();
        res.status(200).json(points as Point[]);
        res.end();
    },

    async post(req: NextApiRequest, res: NextApiResponse){
        try {
            const point = await prisma.point.create({ data: req.body });
            res.status(201).json(point.id);
            res.end();
        } catch (error) {
            res.status(500).json(error);
            res.end();
        }
        
    }
}

export default async function handler(req: NextApiRequest, res: NextApiResponse){
    
    if (req.method === "GET") {
        await handlers.get(req, res);
    }

    if (req.method === "POST") {
        await handlers.post(req, res);
    }

    if(req.method === "undefined" || req.method === null){
        handlers.get(req, res);
    }

}