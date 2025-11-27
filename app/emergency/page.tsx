'use client';

import { useTranslation } from 'react-i18next';
import { useState, useEffect } from 'react';
import { AlertTriangle, Phone, MapPin, CheckCircle } from 'lucide-react';

export default function EmergencyPage() {
  const { t } = useTranslation();
  const [location, setLocation] = useState<{ lat: number; lon: number } | null>(null);
  const [alertSent, setAlertSent] = useState(false);
  const [sending, setSending] = useState(false);

  useEffect(() => {
    // Get user's location
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setLocation({
            lat: position.coords.latitude,
            lon: position.coords.longitude,
          });
        },
        () => {
          console.log('Location access denied');
        }
      );
    }
  }, []);

  const handlePanicButton = async () => {
    if (!confirm('Are you sure you want to send an emergency alert? This will notify your emergency contacts and local authorities.')) {
      return;
    }

    setSending(true);

    try {
      // In a real application, you would need to be authenticated
      // For now, we'll use a placeholder userId
      const response = await fetch('/api/emergency', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          userId: 'anonymous', // In production, get from auth
          latitude: location?.lat,
          longitude: location?.lon,
          message: 'Emergency alert triggered via panic button',
        }),
      });

      const result = await response.json();

      if (result.success) {
        setAlertSent(true);
        
        // Also try to call emergency services (this would open phone dialer)
        // window.location.href = 'tel:911'; // or appropriate emergency number
      }
    } catch (err) {
      console.error('Failed to send emergency alert:', err);
      alert('Failed to send emergency alert. Please call emergency services directly.');
    } finally {
      setSending(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 to-orange-50 py-12 px-4">
      <div className="max-w-2xl mx-auto">
        <div className="text-center mb-8">
          <AlertTriangle className="w-20 h-20 text-red-600 mx-auto mb-4" />
          <h1 className="text-4xl font-bold text-gray-900 mb-2">
            {t('emergency.title')}
          </h1>
          <p className="text-lg text-gray-600">
            Get immediate help in an emergency situation
          </p>
        </div>

        {alertSent ? (
          <div className="bg-white rounded-lg shadow-lg p-8 text-center">
            <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              Alert Sent Successfully
            </h2>
            <p className="text-gray-600 mb-6">
              Your emergency alert has been sent to your trusted contacts and local authorities.
              Help is on the way.
            </p>
            <div className="space-y-4">
              <a
                href="tel:911"
                className="flex items-center justify-center space-x-2 bg-red-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-red-700"
              >
                <Phone className="w-5 h-5" />
                <span>Call Emergency Services (911)</span>
              </a>
              <button
                onClick={() => setAlertSent(false)}
                className="text-gray-600 hover:text-gray-800"
              >
                Send Another Alert
              </button>
            </div>
          </div>
        ) : (
          <div className="space-y-6">
            {/* Panic Button */}
            <div className="bg-white rounded-lg shadow-lg p-8 text-center">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                {t('emergency.panicButton')}
              </h2>
              <p className="text-gray-600 mb-6">
                Press this button to immediately alert your emergency contacts and local authorities.
                Your location will be shared if available.
              </p>
              <button
                onClick={handlePanicButton}
                disabled={sending}
                className="panic-button mx-auto"
                style={{
                  width: '120px',
                  height: '120px',
                }}
              >
                <AlertTriangle className="w-12 h-12 text-white" />
              </button>
              {sending && (
                <p className="text-gray-600 mt-4">Sending alert...</p>
              )}
            </div>

            {/* Emergency Services */}
            <div className="bg-white rounded-lg shadow-lg p-6">
              <h3 className="text-xl font-bold text-gray-900 mb-4">
                Emergency Services
              </h3>
              <div className="space-y-3">
                <a
                  href="tel:911"
                  className="flex items-center justify-between p-4 bg-red-50 rounded-lg hover:bg-red-100 transition-colors"
                >
                  <div className="flex items-center space-x-3">
                    <Phone className="w-5 h-5 text-red-600" />
                    <span className="font-semibold text-gray-900">Emergency Services</span>
                  </div>
                  <span className="text-red-600 font-mono">911</span>
                </a>
                <a
                  href="tel:1-800-799-7233"
                  className="flex items-center justify-between p-4 bg-blue-50 rounded-lg hover:bg-blue-100 transition-colors"
                >
                  <div className="flex items-center space-x-3">
                    <Phone className="w-5 h-5 text-blue-600" />
                    <span className="font-semibold text-gray-900">National Domestic Violence Hotline</span>
                  </div>
                  <span className="text-blue-600 font-mono">1-800-799-7233</span>
                </a>
              </div>
            </div>

            {/* Location Status */}
            {location && (
              <div className="bg-white rounded-lg shadow-lg p-6">
                <div className="flex items-center space-x-2 text-green-600 mb-2">
                  <MapPin className="w-5 h-5" />
                  <span className="font-semibold">{t('emergency.locationSharing')}</span>
                </div>
                <p className="text-sm text-gray-600">
                  Your location is available and will be shared with emergency contacts.
                </p>
              </div>
            )}

            {/* Safety Tips */}
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
              <h3 className="font-semibold text-blue-900 mb-3">Safety Tips</h3>
              <ul className="space-y-2 text-sm text-blue-800">
                <li>• If you're in immediate danger, call 911 first</li>
                <li>• Try to get to a safe location if possible</li>
                <li>• Keep your phone charged and accessible</li>
                <li>• Trust your instincts - if something feels wrong, it probably is</li>
                <li>• Have a safety plan ready</li>
              </ul>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}


