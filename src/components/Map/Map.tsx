'use-client';

import 'leaflet/dist/leaflet.css';
import 'leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.css'
import "leaflet-defaulticon-compatibility";
import { MapContainer, TileLayer, Marker, useMapEvents, Popup, useMapEvent} from 'react-leaflet';
import { useEffect, useState } from 'react';
import { LatLng } from 'leaflet';
import PontoForm from '../PontoForm';
import { Ponto } from '@prisma/client';

function MarcadorPosicaoAtual() {
  const [currentPosition, setCurrentPosition] = useState(new LatLng(0, 0));
  const map = useMapEvents({
    click(e) {
      setCurrentPosition(e.latlng);
    }
  });
  
  return (
    <Marker position={currentPosition} eventHandlers={{ load: e => {console.log(e)} }}>
      <Popup closeButton >
        <PontoForm
          coordenadaX={currentPosition.lat.toString()} 
          coordenadaY={currentPosition.lng.toString()} 
        />
      </Popup>
    </Marker>
  )

}

function BuscarPosicaoAtual() {
  
  const map = useMapEvents({
    locationfound(e){
      map.flyTo(e.latlng);
    }
  })

  useEffect(() => {
    map.locate();
  }, [])
  
  return null
}

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

  return (
    <MapContainer center={[0, 0]} zoom={12} style={{ height: '80vh', width: '100%'}}>
      <TileLayer
         attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
         url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
       />
      <BuscarPosicaoAtual />
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
  );
}