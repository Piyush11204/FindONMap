import React, { useEffect, useRef } from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import { Profile } from '../Types';

interface MapComponentProps {
  profiles: Profile[];
  onMapLoad?: (map: mapboxgl.Map) => void;
}

const MapComponent: React.FC<MapComponentProps> = ({ profiles, onMapLoad }) => {
  const mapContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!profiles.length || !mapContainerRef.current) return;

    // Ensure Mapbox token is set
    mapboxgl.accessToken = 'pk.eyJ1IjoicGl5dXNoMTEyMDQiLCJhIjoiY200a2I4aGNwMGt6NzJycTVrdHgzMTJmOSJ9.9MdQG3HEm3e3qEdcsK9TMw';

    const defaultCenter: [number, number] = profiles.some(p => p.latitude && p.longitude)
      ? [
          profiles.reduce((sum, p) => sum + (p.longitude || 0), 0) / profiles.filter(p => p.longitude).length || 0,
          profiles.reduce((sum, p) => sum + (p.latitude || 0), 0) / profiles.filter(p => p.latitude).length || 0
        ]
      : [0, 0];

    const mapInstance = new mapboxgl.Map({
      container: mapContainerRef.current,
      style: 'mapbox://styles/mapbox/streets-v11',
      center: defaultCenter,
      zoom: profiles.length > 0 ? 4 : 2,
    });

    mapInstance.on('load', () => {
      // Add source and layers for clustered markers
      mapInstance.addSource('profiles', {
        type: 'geojson',
        data: {
          type: 'FeatureCollection',
          features: profiles
            .filter(profile => profile.longitude && profile.latitude)
            .map((profile) => ({
              type: 'Feature',
              geometry: {
                type: 'Point',
                coordinates: [profile.longitude!, profile.latitude!],
              },
              properties: profile,
            })),
        },
        cluster: true,
        clusterMaxZoom: 14,
        clusterRadius: 50,
      });

      mapInstance.addLayer({
        id: 'clusters',
        type: 'circle',
        source: 'profiles',
        filter: ['has', 'point_count'],
        paint: {
          'circle-color': '#51bbd6',
          'circle-radius': [
            'step',
            ['get', 'point_count'],
            20,
            100, 30,
            750, 40
          ],
          'circle-opacity': 0.7,
        },
      });

      mapInstance.addLayer({
        id: 'cluster-count',
        type: 'symbol',
        source: 'profiles',
        filter: ['has', 'point_count'],
        layout: {
          'text-field': '{point_count_abbreviated}',
          'text-font': ['DIN Offc Pro Medium', 'Arial Unicode MS Regular'],
          'text-size': 12,
        },
        paint: {
          'text-color': '#ffffff',
        },
      });

      // Add individual markers with popups
      profiles
        .filter(profile => profile.longitude && profile.latitude)
        .forEach((profile) => {
          const popupContent = `
            <div class="profile-popup">
              ${profile.profileImageUrl 
                ? `<img src="${profile.profileImageUrl}" alt="${profile.name}" class="image" />`
                : ''}
              <div class="profile-popup-details">
                <h3>${profile.name}</h3>
                ${profile.email ? `<p><strong>Email:</strong> ${profile.email}</p>` : ''}
                ${profile.phoneNumber ? `<p><strong>Phone:</strong> ${profile.phoneNumber}</p>` : ''}
                ${profile.address ? `<p><strong>Address:</strong> ${profile.address}</p>` : ''}
              </div>
            </div>
          `;

          new mapboxgl.Marker({
            color: '#3B82F6',
            scale: 0.8,
          })
            .setLngLat([profile.longitude!, profile.latitude!])
            .setPopup(new mapboxgl.Popup({ offset: 25, className: 'custom-popup' }).setHTML(popupContent))
            .addTo(mapInstance);
        });

      if (onMapLoad) {
        onMapLoad(mapInstance);
      }
    });

    return () => {
      mapInstance.remove();
    };
  }, [profiles]);

  return (
    <div 
      ref={mapContainerRef} 
      className="w-full h-[500px] rounded-lg shadow-md border border-gray-200 mb-6"
    />
  );
};

export default MapComponent;
