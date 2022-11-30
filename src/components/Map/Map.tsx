'use-client';

import 'leaflet/dist/leaflet.css';
import 'leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.css'
import "leaflet-defaulticon-compatibility";
import { MapContainer, TileLayer } from 'react-leaflet';
import { useEffect, useState } from 'react';
import { Ponto } from '@prisma/client';
import MarcadorPosicaoAtual from './MarcadorPosicaoAtual';
import { ContextoGlobalMapa } from './ContextoGlobalMapa';
import { MarcadorPonto } from './MarcadorPonto';

export default function Map() {

  const [pontos, setPontos]: [Ponto[], Function] = useState([]);

  useEffect(() => {

    async function buscarPontos() {
      const response = await fetch("/api/pontos");
      const pontos: Ponto[] = await response.json();
      setPontos(pontos);
    }

    buscarPontos();
  }, [])

  function adicionarMarcadorPonto(ponto: Ponto) {
    setPontos([...pontos, ponto]);
  }

  return (
    <ContextoGlobalMapa.Provider value={{ onSalvarPonto: adicionarMarcadorPonto}}>
      <MapContainer center={[-25, -40]} zoom={5} style={{ height: '80vh', width: '100%' }}>
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        {pontos.map(ponto => (
          <div key={ponto.id}>
            <MarcadorPonto ponto={ponto} />
          </div>
          
        ))}
        <MarcadorPosicaoAtual />
      </MapContainer>
    </ContextoGlobalMapa.Provider>

  );
}


