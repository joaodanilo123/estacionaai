import { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "../../../utils/db";

const handlers = {

    async post(req: NextApiRequest, res: NextApiResponse) {

        const faturamento = {
            pontoId: req.body.pontoId,
            dataInicio: new Date(req.body.dataInicio),
            dataFim: new Date(req.body.dataFim),
            total: 0
        }

        console.log(typeof(req.body));

        const valoresTickets = await prisma.ticket.findMany(
            {
                select: { valor: true },
                where: {
                    AND: [
                        {
                            pontoId: faturamento.pontoId,  
                        },
                        {
                            datahora: {
                                gte: faturamento.dataInicio
                            }
                        },
                        {
                            datahora: {
                                lte: faturamento.dataFim
                            }
                        }
                    ]
                }
            }
        );
        
        let total = 0;
        valoresTickets.forEach(t => { total += t.valor});
        
        faturamento.total = total;


        console.log(faturamento);
        console.log(valoresTickets);

        res.status(200).json(faturamento);
        res.end();
    }
}


export default async function handler(req: NextApiRequest, res: NextApiResponse) {

    if (req.method === "POST") {
        await handlers.post(req, res);
    } else {
        res.status(405);
        res.end();
    }
}