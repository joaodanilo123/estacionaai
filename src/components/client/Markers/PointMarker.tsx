'use client';
import { Marker, Popup } from 'react-leaflet';
import { Point } from '@prisma/client';
import Link from 'next/link';
import { useEffect, useState } from 'react';

export function PointMarker({ point }: { point: Point }) {

  const [activeTickets, setActiveTickets] = useState(0);

  async function searchActiveTickets() {
    const response = await fetch(`http://localhost:3000/api/tickets/actives?point=${point.id}`);
    const resultado = Number(await response.json());
    setActiveTickets(resultado);
  }

  return (
    <Marker position={[parseFloat(point.Xpos), parseFloat(point.Ypos)]} eventHandlers={{ popupopen: searchActiveTickets}}>
      <Popup className='text-base' closeButton>
        <h1 className="text-center text-xl font-bold">{point.address}</h1>
        <p>
          Latitude = {point.Xpos} <br />
          Longitude = {point.Ypos}
        </p>
        <hr />
        <section className='w-full'>
          <Link href={`/Points/${point.id}/faturamento/`}>
            <button className="w-full m-1 text-white p-2 font-medium border-2 border-blue-600 bg-blue-600 rounded-lg hover:border-blue-700 hover:bg-blue-700">
              Dados de Faturamento
            </button>
          </Link>
        </section>
        <footer className='flex flex-row w-full mt-2'>
          <section className='flex-1 text-green-600'>
            <span className='text-base'>Caixa:</span>
            {/* <div className='text-left text-2xl'>R$ {point.cashier.toFixed(2).toString().replace(".", ",")}</div> */}
          </section>
          <section className=' flex-1 text-blue-600 text-center'>
            <span className='text-base'>Tickets Ativos</span>
            <div className='text-2xl'>{activeTickets}</div>
          </section>
        </footer>
      </Popup>
    </Marker>
  );
}


