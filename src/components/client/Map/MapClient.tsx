'use client';

import 'leaflet/dist/leaflet.css';
import 'leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.css'
import "leaflet-defaulticon-compatibility";
import { MapContainer, TileLayer } from 'react-leaflet';
import { useEffect, useState } from 'react';
import { Point } from '@prisma/client';
import { globalMapContext } from '../hooks/useGlobalMapContext';
import ActualPositionMarker from '../Markers/ActualPositionMarker';
import { PointMarker } from '../Markers/PointMarker';

export default function MapClient() {

  const [pontos, setPontos]: [Point[], Function] = useState([]);

  useEffect(() => {

    async function searchPoints() {
      const response = await fetch("/api/points");
      const points: Point[] = await response.json();
      setPontos(points);
      
    }

    searchPoints();
  
  }, [])

  function addPointMarker(ponto: Point) {
    setPontos([...pontos, ponto]);
  }

  return (
    <globalMapContext.Provider value={{ onSalvarPonto: addPointMarker}}>
      <MapContainer center={[-25, -40]} zoom={5} style={{ height: '80vh', width: '100%' }}>
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
  	    
        {pontos.map(point => (
          <div key={point.id}>
            <PointMarker point={point} />
          </div>
          
        ))}
        
        <ActualPositionMarker />
      </MapContainer>
    </globalMapContext.Provider>

  );
}


