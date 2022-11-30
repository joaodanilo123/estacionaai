'use-client';
import { Marker, Popup } from 'react-leaflet';
import { Ponto } from '@prisma/client';
import Link from 'next/link';
import { useEffect, useState } from 'react';




export function MarcadorPonto({ ponto }: { ponto: Ponto }) {


  const [ticketsAtivos, setTicketsAtivos] = useState(0);

  useEffect(() => {
    
    async function buscaTicketsAtivos(){
      const response = await fetch(`http://localhost:3000/api/tickets/${ponto.id}/ativosPorPonto`);
      const resultado = Number(await response.json());
      return resultado;
    }

    buscaTicketsAtivos()
      .then(ticketsAtivos => { setTicketsAtivos(ticketsAtivos) })
      .catch(reason => { console.log(reason); });

  });

  return (
    <Marker position={[parseFloat(ponto.coordenadaX), parseFloat(ponto.coordenadaY)]}>
      <Popup className='text-base'>
        <h1 className="text-center text-xl font-bold">{ponto.endereco}</h1>
        <p>
          Latitude = {ponto.coordenadaX} <br />
          Longitude = {ponto.coordenadaY}
        </p>
        <hr />
        <section className='w-full'>
          <Link href={`/pontos/${ponto.id}/faturamento/`}>
            <button className="w-full m-1 text-white p-2 font-medium border-2 border-blue-600 bg-blue-600 rounded-lg hover:border-blue-700 hover:bg-blue-700">
              Dados de Faturamento
            </button>
          </Link>
        </section>
        <footer className='flex flex-row w-full mt-2'>
          <section className='flex-1 text-green-600'>
            <span className='text-base'>Caixa:</span>
            <div className='text-left text-2xl'>R$ {ponto.caixa.toFixed(2).toString().replace(".", ",")}</div>
          </section>
          <section className=' flex-1 text-blue-600 text-center'>
            <span className='text-base'>Tickets Ativos</span>
            <div className='text-2xl'>{ticketsAtivos}</div>
          </section>
        </footer>
      </Popup>
    </Marker>
  );
}


