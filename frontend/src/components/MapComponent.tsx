import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import L from 'leaflet';
import { useEffect } from 'react';

// --- Custom Marker Setup ---
import markerIcon2x from 'leaflet/dist/images/marker-icon-2x.png';
import markerIcon from 'leaflet/dist/images/marker-icon.png';
import markerShadow from 'leaflet/dist/images/marker-shadow.png';

// Standard Leaflet fix for missing icons
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconUrl: markerIcon,
  iconRetinaUrl: markerIcon2x,
  shadowUrl: markerShadow,
});

export const customMarkerIcon = new L.Icon({
  iconUrl: markerIcon,
  iconRetinaUrl: markerIcon2x,
  shadowUrl: markerShadow,
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41]
});

// Helper component to handle dynamic map centering
function ChangeView({ center, zoom }: { center: [number, number], zoom: number }) {
  const map = useMap();
  useEffect(() => {
    if (center && center[0] != null && center[1] != null) {
      map.setView(center, zoom);
    }
  }, [center, zoom, map]);
  return null;
}

interface MapComponentProps {
  center?: [number, number];
  zoom?: number;
  markers?: Array<{
    id: string | number;
    position: [number, number];
    title: string;
    description?: string;
  }>;
}

export default function MapComponent({ 
  center = [51.505, -0.09], 
  zoom = 13, 
  markers = [] 
}: MapComponentProps) {
  
  // Ensure center is valid before rendering MapContainer or its components
  const validCenter: [number, number] = (center && center[0] != null && center[1] != null) 
    ? center 
    : [51.505, -0.09];

  return (
    <div className="w-full h-full z-0 relative">
      <MapContainer 
        center={validCenter} 
        zoom={zoom} 
        scrollWheelZoom={true} 
        className="w-full h-full rounded-lg shadow-md"
        attributionControl={false}
        zoomControl={false}
        
      >
        
        <ChangeView center={validCenter} zoom={zoom} />
        
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        {markers && markers.map((marker) => {
          // Additional safety check for marker position
          if (!marker || !marker.position || marker.position[0] == null || marker.position[1] == null) {
            return null;
          }
          return (
            <Marker 
              key={marker.id} 
              position={marker.position} 
              icon={customMarkerIcon}
            >
              <Popup>
                <div className="p-1">
                  <h3 className="font-semibold text-lg text-slate-800">{marker.title}</h3>
                  {marker.description && <p className="text-sm text-gray-600 mt-1">{marker.description}</p>}
                </div>
              </Popup>
            </Marker>
          );
        })}
      </MapContainer>
    </div>
  );
}
