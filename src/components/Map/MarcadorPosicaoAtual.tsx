'use-client';

import { Marker, useMapEvents, Popup } from 'react-leaflet';
import { useState } from 'react';
import { LatLng } from 'leaflet';
import PontoForm from './PontoForm';

export default function MarcadorPosicaoAtual() {
  
  const [posicaoAtual, setPosicaoAtual] = useState(new LatLng(0, 0));
  const [mostrar, setMostrar] = useState(false);

  const map = useMapEvents({
    click(e) {
      setMostrar(!mostrar);
      setPosicaoAtual(e.latlng);
    }
  });

  return mostrar ? (
    <Marker position={posicaoAtual} eventHandlers={{ load: e => { console.log(e); } }}>
      <Popup closeButton>
        <PontoForm
          coordenadaX={posicaoAtual.lat.toString()}
          coordenadaY={posicaoAtual.lng.toString()} />
      </Popup>
    </Marker>
  ) : null;
}

