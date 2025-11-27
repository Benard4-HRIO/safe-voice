'use client';

import { useEffect, useRef } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

interface Profile {
  id: string;
  name: string;
  latitude: number | null;
  longitude: number | null;
  type: string;
}

interface MapComponentProps {
  profiles: Profile[];
  userLocation: { lat: number; lon: number };
}

export default function MapComponent({ profiles, userLocation }: MapComponentProps) {
  const mapRef = useRef<L.Map | null>(null);
  const mapContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!mapContainerRef.current || mapRef.current) return;

    // Initialize map only once
    const map = L.map(mapContainerRef.current).setView([userLocation.lat, userLocation.lon], 10);

    // Add tile layer
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '© OpenStreetMap contributors',
    }).addTo(map);

    // Add user location marker
    const userIcon = L.divIcon({
      className: 'user-location-marker',
      html: '<div style="width: 20px; height: 20px; background: #0ea5e9; border-radius: 50%; border: 3px solid white; box-shadow: 0 2px 8px rgba(0,0,0,0.3);"></div>',
      iconSize: [20, 20],
    });

    L.marker([userLocation.lat, userLocation.lon], { icon: userIcon })
      .addTo(map)
      .bindPopup('Your Location');

    mapRef.current = map;

    return () => {
      if (mapRef.current) {
        mapRef.current.remove();
        mapRef.current = null;
      }
    };
  }, [userLocation]);

  // Update markers when profiles change
  useEffect(() => {
    if (!mapRef.current) return;

    // Remove existing support markers
    mapRef.current.eachLayer((layer) => {
      if (layer instanceof L.Marker) {
        const popup = layer.getPopup();
        if (popup) {
          const content = popup.getContent();
          // Fix: Check if content is a string before calling includes
          if (content && typeof content === 'string' && !content.includes('Your Location')) {
            mapRef.current?.removeLayer(layer);
          }
        }
      }
    });

    // Add support profile markers
    profiles.forEach((profile) => {
      if (profile.latitude && profile.longitude && mapRef.current) {
        const supportIcon = L.divIcon({
          className: 'support-marker',
          html: '<div style="width: 16px; height: 16px; background: #10b981; border-radius: 50%; border: 2px solid white; box-shadow: 0 2px 6px rgba(0,0,0,0.3);"></div>',
          iconSize: [16, 16],
        });

        L.marker([profile.latitude, profile.longitude], { icon: supportIcon })
          .addTo(mapRef.current)
          .bindPopup(`<strong>${profile.name}</strong><br/>${profile.type}`);
      }
    });
  }, [profiles]);

  return <div ref={mapContainerRef} className="w-full h-full" />;
}