import { Ponto } from "@prisma/client";
import { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "../../../utils/db";

const handlers = {

    async get(res: NextApiResponse, id: number) {
        const ponto = await prisma.ponto.findUnique({where: {id}});
        res.status(200).json(ponto as Ponto);
        res.end();
    },

    async delete(res: NextApiResponse, id: number) {
        const ponto = await prisma.ponto.delete({where: {id}});
        res.status(200);
        res.end();
    }
}


export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    
    const id = Number(req.query.id);

    if (isNaN(id)) {
        res.status(400).json({ "message": "id must be a integer" });
    }

    if (req.method === "GET") {
        await handlers.get(res, id);
    }

    if (req.method === "DELETE") {
        await handlers.delete(res, id);
    }

    if(req.method === "undefined" || req.method === null){
        res.status(400).json({ "message": "method not defined"});
    }

}