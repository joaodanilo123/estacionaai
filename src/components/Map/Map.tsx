'use-client';

import 'leaflet/dist/leaflet.css';
import 'leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.css'
import "leaflet-defaulticon-compatibility";
import { MapContainer, TileLayer, Marker, useMapEvents, Popup, useMapEvent } from 'react-leaflet';
import { useEffect, useState } from 'react';
import { Ponto } from '@prisma/client';
import MarcadorPosicaoAtual from './MarcadorPosicaoAtual';
import { ContextoGlobalMapa } from './ContextoGlobalMapa';

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
    <ContextoGlobalMapa.Provider value={{ onSalvarPonto: adicionarMarcadorPonto }}>
      <MapContainer center={[-25, -40]} zoom={5} style={{ height: '80vh', width: '100%' }}>
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        {pontos.map(ponto => (
          <Marker key={ponto.id} position={[parseFloat(ponto.coordenadaX), parseFloat(ponto.coordenadaY)]}>
            <Popup>
              <h2>{ponto.endereco}</h2>
              <span>Latitude={ponto.coordenadaX} Longitude={parseFloat(ponto.coordenadaY)} </span>
            </Popup>
          </Marker>
        ))}
        <MarcadorPosicaoAtual />
      </MapContainer>
    </ContextoGlobalMapa.Provider>

  );
}