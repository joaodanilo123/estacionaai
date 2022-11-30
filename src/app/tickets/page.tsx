import { TicketDataFormatoBR } from "../../interfaces/TicketDataFormatoBR";

async function getTickets() {
    const res = await fetch('http://localhost:3000/api/tickets', { cache: 'no-store' });
    const data = await res.json();
    return data as TicketDataFormatoBR[];
}

export default async function TicketsPage() {

    try {
        const tickets: TicketDataFormatoBR[] = await getTickets();
        return (
            <main className="flex flex-col text-black text-xl m-2 p-2 ">
                <table className="bg-neutral-100 border-[1px] border-gray-500 rounded-xl border-separate p-0">
                    <thead>
                        <tr>
                            <th className="border-b-[1px] border-r-[1px]">ID</th>
                            <th className="border-b-[1px] border-r-[1px]">Gerado em</th>
                            <th className="border-b-[1px] border-r-[1px]">Data e Hora Limite</th>
                            <th className="border-b-[1px] border-r-[1px]">Valor</th>
                            <th className="border-b-[1px] border-r-[1px]">Tempo</th>
                            <th className="border-b-[1px]">Ponto</th>
                        </tr>
                    </thead>
                    <tbody className="text-center last:last:border-b-0">
                        {tickets.map((ticket) => (
                            <tr key={ticket.id} >

                                <td className="border-b-[1px] border-r-[1px]">{ticket.id}</td>
                                <td className="border-b-[1px] border-r-[1px]">{ticket.datahora}</td>
                                <td className="border-b-[1px] border-r-[1px]">{ticket.datahoralimite}</td>
                                <td className="border-b-[1px] border-r-[1px]">{ticket.valor}</td>
                                <td className="border-b-[1px] border-r-[1px]">{ticket.minutos}</td>
                                <td className="border-b-[1px]">{ticket.pontoId}</td>

                            </tr>
                        ))}
                    </tbody>
                </table>
            </main>

        );
    } catch (error) {
        console.log(error);
    }
}