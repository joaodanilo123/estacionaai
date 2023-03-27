"use client"

import { Point } from "@prisma/client";
import { FormEvent, useState } from "react"
import { useGlobalMapContext } from "../hooks/useGlobalMapContext";
import { Button } from "../../ui/Button";
import { savePoint } from "./savePoint";

export default function PontoForm({ Xpos, Ypos }: { Xpos: string, Ypos: string }) {

    const [saved, setSaved] = useState(false);
    const [address, setAddress] = useState("");

    const contexto = useGlobalMapContext();

    async function handleSubmit(ev: FormEvent) {
        ev.preventDefault();

        try {
            const point = await savePoint({ Xpos, Ypos, address })
            setSaved(true);
            contexto.onSalvarPonto(point);
        } catch (error) {
            alert("erro ao salvar Ponto");
        }
    }

    return (
        <form method="post" onSubmit={handleSubmit} className="flex flex-col p-3 pt-2 justify-center">
            <fieldset className="m-1">
                <label htmlFor="address" className="font-bold">Endereço: </label>
                <input type="text" id="address" name="address" required onChange={e => setAddress(e.target.value)} className="border p-1" />
            </fieldset>
            <span className="m-1 font-bold">Latitude: {Xpos}</span>
            <span className="m-1 font-bold">Longitude: {Ypos}</span>

            {!saved ?
                (<Button title="Salvar Ponto" type="submit" />)
                : <Button title="Ponto Salvo" disabled />}
        </form>
    );
}