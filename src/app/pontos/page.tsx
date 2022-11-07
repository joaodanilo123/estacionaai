import { Ponto, PrismaClient } from "@prisma/client";

const prisma = new PrismaClient

async function getPontos() {
    const res = await fetch('http://localhost:3000/api/pontos', {cache: 'no-store'});
    const data = await res.json();
    return data as Ponto[];
}

export default async function PontosPage() {

    try {
        const pontos: Ponto[] = await getPontos();
        return (
            <>
                <div className="flex flex-col text-white m-2 p-2">
                    {pontos.map((ponto) => (
                        <article key={ponto.id} className="my-2 p-4 bg-gray-700 rounded-lg shadow-xl border-gray-600 border-4 w-1/2">
                            <h2 className="text-xl">{ponto.endereco}</h2>
                            <p>Coordenada X: {ponto.coordenadaX}</p>
                            <p>Coordenada Y: {ponto.coordenadaY}</p>
                        </article>
                    ))}
                </div>
            </>
        );
    } catch (error) {
        console.log(error);
    }
}