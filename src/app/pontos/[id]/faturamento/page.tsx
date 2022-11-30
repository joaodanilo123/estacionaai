"use client"

import { FormEvent, useEffect, useState } from "react";
import { FaturamentoForm } from "./FaturamentoForm";

export default function FaturamentoPage({ params } : {params: { id: string }}) {

    const pontoId = params.id;

    const [faturamento, setFaturamento]: any = useState(null);

    function handleSubmit(e: FormEvent) {
        e.preventDefault();
    }

    function retornarFaturamento(faturamento: any) {
        setFaturamento(faturamento);
        console.log(faturamento);
    }

    return (
        <main className="text-black flex flex-col justify-center">
            <FaturamentoForm pontoId={pontoId} retornarFaturamento={retornarFaturamento}/>
            {faturamento ? (
                <>
                    <p></p>
                </>
            ) : null}
        </main>
    );

}