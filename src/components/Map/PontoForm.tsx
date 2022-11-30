import { Ponto } from "@prisma/client";
import { FormEvent, useState } from "react"
import { useContextoGlobalMapa } from "./ContextoGlobalMapa";

export default function PontoForm({ coordenadaX, coordenadaY }: { coordenadaX: string, coordenadaY: string }) {

    const [salvo, setSalvo] = useState(false);
    const [endereco, setEndereco] = useState("")

    const contexto = useContextoGlobalMapa();

    const handleSubmit = async (ev: FormEvent) => {
        ev.preventDefault();

        const formData = {
            coordenadaX,
            coordenadaY,
            endereco,
            caixa: 0
        }

        const response = await fetch("http://localhost:3000/api/pontos/", {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            }, 
            body: JSON.stringify(formData)
        });
        
        if(response.status == 201) {
            setSalvo(true);

            const ponto: Ponto = {
                id: Number(response.body),
                coordenadaX: formData.coordenadaX,
                coordenadaY: formData.coordenadaY,
                endereco: formData.endereco,
                caixa: formData.caixa
            }

            contexto.onSalvarPonto(ponto);
        }

    }

    return (
        <form method="post" onSubmit={handleSubmit} className="flex flex-col p-3 pt-2 justify-center">
            <fieldset className="m-1">
                <label htmlFor="endereco" className="font-bold">Endereço: </label>
                <input type="text" id="endereco" name="endereco" required onChange={e => setEndereco(e.target.value)} className="border p-1" />
            </fieldset>
            <span className="m-1 font-bold">Latitude: {coordenadaX}</span>
            <span className="m-1 font-bold">Longitude: {coordenadaY}</span>

            {!salvo ? 
            (<button type="submit" className="m-1 text-white p-2 font-medium border-2 border-blue-600 bg-blue-600 rounded-lg hover:border-blue-700 hover:bg-blue-700">Salvar Ponto</button>)
            : <button className="m-1 text-gray-800 p-2 font-medium border-2 bg-gray-600 border-gray-600 rounded-l" disabled>Ponto Salvo</button>}

            
        </form>
    )
}