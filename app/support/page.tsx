'use client';

import { useTranslation } from 'react-i18next';
import { useState, useEffect } from 'react';
import { MapPin, Phone, Mail, Globe, CheckCircle, Filter } from 'lucide-react';
import dynamic from 'next/dynamic';

// Dynamically import map component to avoid SSR issues
const MapComponent = dynamic(() => import('@/components/MapComponent'), {
  ssr: false,
});

interface SupportProfile {
  id: string;
  type: string;
  name: string;
  organization: string | null;
  description: string;
  email: string | null;
  phone: string | null;
  website: string | null;
  address: string | null;
  city: string | null;
  country: string | null;
  latitude: number | null;
  longitude: number | null;
  isVerified: boolean;
  distance?: number;
}

export default function SupportPage() {
  const { t } = useTranslation();
  const [profiles, setProfiles] = useState<SupportProfile[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedType, setSelectedType] = useState<string>('');
  const [userLocation, setUserLocation] = useState<{ lat: number; lon: number } | null>(null);
  const [showMap, setShowMap] = useState(false);
  const [locationFetched, setLocationFetched] = useState(false);

  // Fetch user location only once on mount
  useEffect(() => {
    if (!locationFetched && navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setUserLocation({
            lat: position.coords.latitude,
            lon: position.coords.longitude,
          });
          setLocationFetched(true);
        },
        () => {
          console.log('Location access denied');
          setLocationFetched(true); // Mark as fetched even if denied
        }
      );
    }
  }, [locationFetched]);

  // Fetch profiles when filters or location change
  useEffect(() => {
    const fetchProfiles = async () => {
      setLoading(true);
      try {
        let url = '/api/support';
        const params = new URLSearchParams();
        
        if (selectedType) {
          params.append('type', selectedType);
        }
        
        if (userLocation) {
          params.append('lat', userLocation.lat.toString());
          params.append('lon', userLocation.lon.toString());
          params.append('radius', '50');
        }
        
        if (params.toString()) {
          url += '?' + params.toString();
        }

        const response = await fetch(url);
        const result = await response.json();
        
        if (result.success) {
          setProfiles(result.profiles);
        } else {
          setError(result.error);
        }
      } catch (err) {
        setError('Failed to load support profiles');
      } finally {
        setLoading(false);
      }
    };

    // Only fetch if location has been attempted (fetched or denied)
    if (locationFetched) {
      fetchProfiles();
    }
  }, [selectedType, userLocation, locationFetched]);

  const supportTypes = [
    { value: '', label: 'All Types' },
    { value: 'COUNSELOR', label: t('support.types.counselor') },
    { value: 'LAWYER', label: t('support.types.lawyer') },
    { value: 'AUTHORITY', label: t('support.types.authority') },
    { value: 'NGO', label: t('support.types.ngo') },
    { value: 'VOLUNTEER', label: t('support.types.volunteer') },
  ];

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 py-12 px-4">
        <div className="max-w-6xl mx-auto text-center">
          <p className="text-gray-600">{t('common.loading')}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">
            {t('support.title')}
          </h1>
          <p className="text-lg text-gray-600">
            {t('support.subtitle')}
          </p>
        </div>

        {/* Filters */}
        <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
          <div className="flex flex-wrap items-center gap-4">
            <div className="flex items-center space-x-2">
              <Filter className="w-5 h-5 text-gray-600" />
              <span className="font-medium text-gray-700">Filter:</span>
            </div>
            {supportTypes.map((type) => (
              <button
                key={type.value}
                onClick={() => setSelectedType(type.value)}
                className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                  selectedType === type.value
                    ? 'bg-safe-dark text-white'
                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                }`}
              >
                {type.label}
              </button>
            ))}
            <button
              onClick={() => setShowMap(!showMap)}
              className="ml-auto px-4 py-2 bg-gray-200 text-gray-700 rounded-lg font-medium hover:bg-gray-300"
            >
              {showMap ? 'Hide Map' : 'Show Map'}
            </button>
          </div>
        </div>

        {error && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
            <p className="text-red-700">{error}</p>
          </div>
        )}

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Map View */}
          {showMap && userLocation && (
            <div className="lg:col-span-3 mb-6">
              <div className="bg-white rounded-lg shadow-lg p-4">
                <h2 className="text-xl font-bold mb-4">Map View</h2>
                <div className="h-96 rounded-lg overflow-hidden">
                  <MapComponent
                    profiles={profiles}
                    userLocation={userLocation}
                  />
                </div>
              </div>
            </div>
          )}

          {/* Support Profiles List */}
          {profiles.length === 0 ? (
            <div className="lg:col-span-3 bg-white rounded-lg shadow-lg p-12 text-center">
              <p className="text-gray-600 text-lg">
                No support providers found. Try adjusting your filters.
              </p>
            </div>
          ) : (
            profiles.map((profile) => (
              <div
                key={profile.id}
                className="bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transition-shadow"
              >
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h3 className="text-xl font-bold text-gray-900 mb-1">
                      {profile.name}
                    </h3>
                    {profile.organization && (
                      <p className="text-sm text-gray-600">{profile.organization}</p>
                    )}
                  </div>
                  {profile.isVerified && (
                    <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0" />
                  )}
                </div>

                <div className="mb-4">
                  <span className="inline-block px-3 py-1 bg-safe-light text-safe-dark rounded-full text-sm font-medium">
                    {supportTypes.find(t => t.value === profile.type)?.label || profile.type}
                  </span>
                </div>

                <p className="text-gray-700 mb-4 line-clamp-3">
                  {profile.description}
                </p>

                {profile.distance !== undefined && (
                  <p className="text-sm text-gray-600 mb-4">
                    {t('support.distance', { distance: profile.distance })}
                  </p>
                )}

                <div className="space-y-2 mb-4">
                  {profile.address && (
                    <div className="flex items-start space-x-2 text-sm text-gray-600">
                      <MapPin className="w-4 h-4 mt-0.5 flex-shrink-0" />
                      <span>
                        {profile.address}
                        {profile.city && `, ${profile.city}`}
                        {profile.country && `, ${profile.country}`}
                      </span>
                    </div>
                  )}
                  {profile.phone && (
                    <div className="flex items-center space-x-2 text-sm text-gray-600">
                      <Phone className="w-4 h-4 flex-shrink-0" />
                      <a href={`tel:${profile.phone}`} className="hover:text-safe-dark">
                        {profile.phone}
                      </a>
                    </div>
                  )}
                  {profile.email && (
                    <div className="flex items-center space-x-2 text-sm text-gray-600">
                      <Mail className="w-4 h-4 flex-shrink-0" />
                      <a href={`mailto:${profile.email}`} className="hover:text-safe-dark">
                        {profile.email}
                      </a>
                    </div>
                  )}
                  {profile.website && (
                    <div className="flex items-center space-x-2 text-sm text-gray-600">
                      <Globe className="w-4 h-4 flex-shrink-0" />
                      <a
                        href={profile.website}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="hover:text-safe-dark"
                      >
                        Website
                      </a>
                    </div>
                  )}
                </div>

                <button className="w-full bg-safe-dark text-white py-2 rounded-lg font-semibold hover:bg-safe-dark/90 transition-colors">
                  {t('support.contact')}
                </button>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}

