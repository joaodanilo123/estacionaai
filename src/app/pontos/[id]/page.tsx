import { Ponto } from "@prisma/client";

async function getPontos() {
    const res = await fetch('http://localhost:3000/api/pontos', { cache: 'no-store' });
    const data = await res.json();
    return data as Ponto[];
}

export default async function PontosPage() {

    try {
        const pontos: Ponto[] = await getPontos();
        return (
            <>
                <div className="flex flex-col text-black m-2 p-2">
                    {pontos.map((ponto) => (
                        <article key={ponto.id} className="flex flex-row my-4 ml-10 p-4 py-8 bg-white rounded-lg shadow-xl border-gray-100 border-4 max-w-[70%]">
                            <main className="grow pl-6">
                                <h2 className="text-2xl">{ponto.endereco}</h2>
                                <p>Coordenada X: {ponto.coordenadaX}</p>
                                <p>Coordenada Y: {ponto.coordenadaY}</p>
                            </main>
                        </article>
                    ))}
                </div>
            </>
        );
    } catch (error) {
        console.log(error);
    }
}