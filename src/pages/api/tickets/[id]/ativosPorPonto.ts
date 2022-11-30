import { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "../../../../utils/db";

const handlers = {

    async get(req: NextApiRequest, res: NextApiResponse) {

        const count = await prisma.ticket.count({
            where: {
                AND: [
                    {
                        datahoralimite: {
                            gt: new Date()
                        }
                    },
                    {
                        pontoId: Number(req.query.id)
                    }
                ]
                
            }
        })

        res.status(200).json(count);
        res.end();
    }
}


export default async function handler(req: NextApiRequest, res: NextApiResponse) {

    if (req.method === "GET" || req.method === "undefined" || req.method === null) {
        handlers.get(req, res);
    } else {
        res.status(405).end()
    }

}