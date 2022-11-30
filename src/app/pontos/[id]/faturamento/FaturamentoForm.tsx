"use client"

import { FormEvent, useState } from "react";

export function FaturamentoForm({ retornarFaturamento, pontoId }: { retornarFaturamento: Function, pontoId: string }) {

    const [dataInicio, setDataInicio] = useState(new Date().toISOString());
    const [dataFim, setDataFim] = useState(new Date().toISOString());

    async function handleSubmit(e: FormEvent) {
        e.preventDefault();

        const formData = { dataInicio, dataFim, pontoId: Number(pontoId) }

        try {
            const response = await fetch("http://localhost:3000/api/faturamentos/",
            {   
                method: "POST",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData)
            }
        );
        
        const faturamento = await response.json();
        retornarFaturamento(faturamento);

        } catch (error) {
            console.log(error);
        }
            
    }

    return (
        <form onSubmit={handleSubmit} className="flex flex-col p-4 py-8 bg-white rounded-lg shadow-xl border-gray-100 border-4">
            <div id="inputs" className="w-full flex flex-row content-between m-2">
                <fieldset className="flex-1 text-center">
                    <label htmlFor="dataInicio">Ínicio: </label>
                    <input required type="datetime-local" id="dataInicio" onChange={handleDataInicioChange} className="border-2 border-black"/>
                </fieldset>
                <fieldset className="flex-1 text-center">
                    <label htmlFor="dataFim">Fim: </label>
                    <input required type="datetime-local" id="dataFim" onChange={handleDataFimChange} className="border-2 border-black"/>
                </fieldset>
            </div>
            <button type="submit" className="text-white p-2 font-medium border-2 border-blue-600 bg-blue-600 rounded-lg hover:border-blue-700 hover:bg-blue-700">Gerar Relatório</button>
        </form>
    );
    
    function handleDataInicioChange(ev: any) {
        setDataInicio(new Date(ev.target.value).toISOString());
    }

    function handleDataFimChange(ev: any) {
        setDataFim(new Date(ev.target.value).toISOString());
    }

}
