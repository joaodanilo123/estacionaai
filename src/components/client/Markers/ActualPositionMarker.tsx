'use-client';

import { Marker, useMapEvents, Popup } from 'react-leaflet';
import { useState } from 'react';
import { LatLng } from 'leaflet';
import PontoForm from '../PointForm';

export default function ActualPositionMarker() {

  const [actualPosition, setActualPosition] = useState(new LatLng(0, 0));
  const [show, setShow] = useState(false);

  const map = useMapEvents({
    click(e) {
      setShow(!show);
      setActualPosition(e.latlng);
    }
  });

  return show ? (
    <Marker position={actualPosition} eventHandlers={{ load: e => { console.log(e); } }}>
      <Popup closeButton>
        <PontoForm
          Xpos={actualPosition.lat.toString()}
          Ypos={actualPosition.lng.toString()} />
      </Popup>
    </Marker>
  ) : null;
}

