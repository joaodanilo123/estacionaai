'use client';

import { Ponto } from "@prisma/client";
import { useRouter } from "next/navigation";

export function AsideButtons({ ponto }: { ponto: Ponto; }) {

    const router = useRouter();

    async function handleClickFaturamento(ev: any, id: number) {
        ev.preventDefault();
        ev.stopPropagation();
        
        router.push(`/pontos/${id}/faturamento/`);
    }

    async function handleClickDelete(ev: any, id: number) {
        ev.preventDefault();
        ev.stopPropagation();

        const res = await fetch(`http://localhost:3000/api/pontos/${id}`, {method: 'DELETE'});
        router.refresh();
    }

    return (
        <aside className="min-w-[33%] flex flex-col">
            <button onClick={e => handleClickFaturamento(e, ponto.id)}  className="m-1 text-white p-2 font-medium border-2 border-blue-600 bg-blue-600 rounded-lg hover:border-blue-700 hover:bg-blue-700">
                Dados de Faturamento
            </button>
            <button onClick={e => handleClickDelete(e, ponto.id)} className="m-1 text-white p-2 font-medium border-2 border-red-600 bg-red-600 rounded-lg hover:border-red-700 hover:bg-red-700">
                Excluir Ponto
            </button>
        </aside>
    );
}
