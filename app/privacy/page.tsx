'use client';

import { Shield, Lock, Eye, Trash2, CheckCircle } from 'lucide-react';
import { useState } from 'react';

export default function PrivacyPage() {
  const [consentGiven, setConsentGiven] = useState(false);

  const handleConsent = async (action: string) => {
    try {
      // In production, get userId from authentication
      const response = await fetch('/api/consent', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          userId: 'anonymous', // Replace with actual userId
          action,
          details: { timestamp: new Date().toISOString() },
        }),
      });

      const result = await response.json();
      if (result.success) {
        if (action === 'GIVEN') {
          setConsentGiven(true);
        } else if (action === 'REVOKED') {
          setConsentGiven(false);
        }
        alert(`Consent ${action.toLowerCase()} successfully`);
      }
    } catch (err) {
      console.error('Failed to update consent:', err);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <Shield className="w-16 h-16 text-safe-dark mx-auto mb-4" />
          <h1 className="text-4xl font-bold text-gray-900 mb-2">
            Privacy & Data Protection
          </h1>
          <p className="text-lg text-gray-600">
            Your privacy and safety are our top priorities
          </p>
        </div>

        <div className="space-y-6">
          {/* Data Encryption */}
          <div className="bg-white rounded-lg shadow-lg p-6">
            <div className="flex items-center space-x-3 mb-4">
              <Lock className="w-8 h-8 text-safe-dark" />
              <h2 className="text-2xl font-bold text-gray-900">End-to-End Encryption</h2>
            </div>
            <p className="text-gray-700 mb-4">
              All data submitted through SafeVoice is encrypted using industry-standard AES-256 encryption.
              Your reports and stories are encrypted before they leave your device, ensuring that only you
              and authorized moderators can access the content.
            </p>
            <ul className="space-y-2 text-gray-600">
              <li>• Reports are encrypted with unique keys</li>
              <li>• Your identity remains anonymous</li>
              <li>• Only verified moderators can decrypt reports</li>
              <li>• All data transmission uses HTTPS</li>
            </ul>
          </div>

          {/* Anonymous Reporting */}
          <div className="bg-white rounded-lg shadow-lg p-6">
            <div className="flex items-center space-x-3 mb-4">
              <Eye className="w-8 h-8 text-safe-dark" />
              <h2 className="text-2xl font-bold text-gray-900">Anonymous Reporting</h2>
            </div>
            <p className="text-gray-700 mb-4">
              You can report incidents without revealing your identity. Each report is assigned a unique
              anonymous ID that you can use to track your report&apos;s status.
            </p>
            <ul className="space-y-2 text-gray-600">
              <li>• No personal information required for reporting</li>
              <li>• Unique anonymous report IDs</li>
              <li>• Optional account creation for tracking</li>
              <li>• IP addresses are not stored</li>
            </ul>
          </div>

          {/* Data Control */}
          <div className="bg-white rounded-lg shadow-lg p-6">
            <div className="flex items-center space-x-3 mb-4">
              <Trash2 className="w-8 h-8 text-safe-dark" />
              <h2 className="text-2xl font-bold text-gray-900">Your Data, Your Control</h2>
            </div>
            <p className="text-gray-700 mb-4">
              You have full control over your data. You can view, modify, or delete your information at any time.
            </p>
            <div className="space-y-4">
              <button
                onClick={() => handleConsent('DATA_DELETED')}
                className="w-full bg-red-600 text-white py-3 rounded-lg font-semibold hover:bg-red-700 transition-colors"
              >
                Delete All My Data
              </button>
              <button
                onClick={() => handleConsent('DATA_ANONYMIZED')}
                className="w-full bg-orange-600 text-white py-3 rounded-lg font-semibold hover:bg-orange-700 transition-colors"
              >
                Anonymize My Data
              </button>
            </div>
          </div>

          {/* Consent Management */}
          <div className="bg-white rounded-lg shadow-lg p-6">
            <div className="flex items-center space-x-3 mb-4">
              <CheckCircle className="w-8 h-8 text-safe-dark" />
              <h2 className="text-2xl font-bold text-gray-900">Consent Management</h2>
            </div>
            <p className="text-gray-700 mb-4">
              You can give or revoke consent for data sharing at any time. All consent actions are logged
              for transparency.
            </p>
            <div className="space-y-4">
              {!consentGiven ? (
                <button
                  onClick={() => handleConsent('GIVEN')}
                  className="w-full bg-safe-dark text-white py-3 rounded-lg font-semibold hover:bg-safe-dark/90 transition-colors"
                >
                  Give Consent for Data Processing
                </button>
              ) : (
                <div className="space-y-2">
                  <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                    <p className="text-green-800 font-semibold">
                      ✓ Consent has been given
                    </p>
                  </div>
                  <button
                    onClick={() => handleConsent('REVOKED')}
                    className="w-full bg-gray-600 text-white py-3 rounded-lg font-semibold hover:bg-gray-700 transition-colors"
                  >
                    Revoke Consent
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* Privacy Policy */}
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
            <h3 className="font-semibold text-blue-900 mb-3">Privacy Policy Summary</h3>
            <ul className="space-y-2 text-sm text-blue-800">
              <li>• We never sell your data to third parties</li>
              <li>• Data is stored securely and encrypted</li>
              <li>• You can request data deletion at any time</li>
              <li>• We comply with GDPR and data protection regulations</li>
              <li>• Regular security audits and updates</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}


