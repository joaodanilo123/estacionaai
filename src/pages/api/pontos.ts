import { Ponto } from "@prisma/client";
import { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "../../utils/db";

const handlers = {

    async get(req: NextApiRequest, res: NextApiResponse) {
        const pontos = await prisma.ponto.findMany();
        res.status(200).json(pontos as Ponto[]);
        res.end();
    },

    async post(req: NextApiRequest, res: NextApiResponse){
        const ponto = await prisma.ponto.create({ data: req.body });
        res.status(201).json(ponto.id);
        res.end();
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