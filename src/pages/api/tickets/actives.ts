import { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "../../../global/db"
import errorMessage from "../../../global/globalErrorMessage";

const handlers = {

    async get(req: NextApiRequest, res: NextApiResponse) {

        const id = Number(req.query.point)

        if(isNaN(id)) {
            res.status(400).json(errorMessage("param 'point' must be integer"))
            res.end();
        }



        const count = await prisma.ticket.count({
            where: {
                AND: [
                    {
                        expiration: {
                            gt: new Date()
                        }
                    },
                    {
                        pointId: Number(id)
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