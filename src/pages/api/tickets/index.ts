import { Ticket } from "@prisma/client";
import { NextApiRequest, NextApiResponse } from "next";
import { TicketDataFormatoBR } from "../../../interfaces/TicketDataFormatoBR";
import { prisma } from "../../../global/db";
import errorMessage from "../../../global/globalErrorMessage";

const handlers = {

    async get(req: NextApiRequest, res: NextApiResponse) {

        const tickets = await prisma.ticket.findMany();

        const responseTicketArray: TicketDataFormatoBR[] = tickets.map(ticket => (
            {
                id: ticket.id,
                valor: ticket.valor,
                minutos: ticket.minutos,
                pontoId: ticket.pontoId,
                datahora: ticket.datahora.toLocaleString(
                    "pt-BR",
                    {
                        timeZone: "America/Sao_Paulo",
                    }
                ),
                datahoralimite: ticket.datahoralimite.toLocaleString(
                    "pt-BR",
                    {
                        timeZone: "America/Sao_Paulo",
                    }
                )
            }
        ));


        res.status(200).json(responseTicketArray);
        res.end();
    },

    async post(req: NextApiRequest, res: NextApiResponse) {

        const datahora = new Date();

        try {
            const dadosTicket = {
                pontoId: req.body.pontoId,
                valor: req.body.valor,
                datahora: datahora,
                datahoralimite: new Date(datahora.getTime() + ((req.body.valor * 30) * 60000)),
                minutos: req.body.valor * 30
            }
            
            console.log(dadosTicket);

            await prisma.ponto.update(
                {
                    where: { id: dadosTicket.pontoId },
                    data: { caixa: { increment: dadosTicket.valor } }
                }
            );
    
            const ticket = await prisma.ticket.create({ data: dadosTicket });
            res.status(201).json(ticket.id);
            res.end();
        } catch (error) {
            res.status(500).json({error});
            res.end();
        }
        
    }

}


export default async function handler(req: NextApiRequest, res: NextApiResponse) {

    if (req.method === "GET") {
        await handlers.get(req, res);
    }

    if (req.method === "POST") {
        await handlers.post(req, res);
    }

    if (req.method === "undefined" || req.method === null) {
        handlers.get(req, res);
    }

}