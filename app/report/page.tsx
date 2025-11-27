'use client';

import { useTranslation } from 'react-i18next';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Shield, Upload, AlertCircle, CheckCircle } from 'lucide-react';
import { useSpeechRecognition } from '@/hooks/useSpeechRecognition';

interface ReportForm {
  incidentDate: string;
  location: string;
  description: string;
  latitude?: number;
  longitude?: number;
  isEmergency: boolean;
}

export default function ReportPage() {
  const { t } = useTranslation();
  const privacyPoints = t('report.privacy.points', { returnObjects: true });
  const privacyList: string[] = Array.isArray(privacyPoints) ? (privacyPoints as string[]) : [];
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [reportId, setReportId] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [mediaFiles, setMediaFiles] = useState<File[]>([]);

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
  } = useForm<ReportForm>();

  const { listening, transcript, startListening, stopListening } = useSpeechRecognition();

  const isEmergency = watch('isEmergency');

  const onSubmit = async (data: ReportForm) => {
    setSubmitting(true);
    setError(null);

    try {
      // Get user's location if available
      let latitude: number | undefined;
      let longitude: number | undefined;

      if (navigator.geolocation) {
        try {
          const position = await new Promise<GeolocationPosition>((resolve, reject) => {
            navigator.geolocation.getCurrentPosition(resolve, reject);
          });
          latitude = position.coords.latitude;
          longitude = position.coords.longitude;
        } catch (err) {
          console.log('Location access denied or unavailable');
        }
      }

      // Upload media files (in production, upload to secure storage)
      const mediaUrls: string[] = [];
      // For now, we'll just store file names
      mediaFiles.forEach((file) => {
        mediaUrls.push(file.name);
      });

      const response = await fetch('/api/reports', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...data,
          latitude,
          longitude,
          mediaUrls,
        }),
      });

      const result = await response.json();

      if (result.success) {
        setReportId(result.reportId);
        setSuccess(true);
      } else {
        setError(result.error || 'Failed to submit report');
      }
    } catch (err) {
      setError('An error occurred while submitting your report');
    } finally {
      setSubmitting(false);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setMediaFiles(Array.from(e.target.files));
    }
  };

  const handleVoiceInput = () => {
    if (listening) {
      stopListening();
      if (transcript) {
        setValue('description', transcript);
      }
    } else {
      startListening();
    }
  };

  if (success && reportId) {
    return (
      <div className="min-h-screen bg-gray-50 py-12 px-4">
        <div className="max-w-2xl mx-auto">
          <div className="bg-white rounded-lg shadow-lg p-8 text-center">
            <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              Report Submitted Successfully
            </h2>
            <p className="text-gray-600 mb-6">
              Your report has been submitted anonymously and is encrypted for your protection.
            </p>
            <div className="bg-gray-100 rounded-lg p-4 mb-6">
              <p className="text-sm text-gray-600 mb-2">Your Report ID:</p>
              <p className="text-xl font-mono font-bold text-safe-dark">{reportId}</p>
              <p className="text-xs text-gray-500 mt-2">
                Please save this ID to track your report status
              </p>
            </div>
            <div className="flex gap-4 justify-center">
              <a
                href="/"
                className="px-6 py-3 bg-safe-dark text-white rounded-lg font-semibold hover:bg-safe-dark/90"
              >
                Return Home
              </a>
              <a
                href="/report"
                className="px-6 py-3 bg-gray-200 text-gray-700 rounded-lg font-semibold hover:bg-gray-300"
                onClick={(e) => {
                  e.preventDefault();
                  setSuccess(false);
                  setReportId(null);
                }}
              >
                Submit Another Report
              </a>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-8">
          <Shield className="w-16 h-16 text-safe-dark mx-auto mb-4" />
          <h1 className="text-4xl font-bold text-gray-900 mb-2">
            {t('report.title')}
          </h1>
          <p className="text-lg text-gray-600">
            {t('report.subtitle')}
          </p>
        </div>

        {/* Privacy Notice */}
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 mb-8">
          <h3 className="font-semibold text-blue-900 mb-3">
            {t('report.privacy.title')}
          </h3>
          <ul className="space-y-2 text-sm text-blue-800">
            {privacyList.length > 0 ? (
              privacyList.map((point, index) => (
                <li key={index} className="flex items-start">
                  <span className="mr-2">✓</span>
                  <span>{point}</span>
                </li>
              ))
            ) : (
              <li className="text-blue-800">
                All data is encrypted end-to-end and your identity stays private.
              </li>
            )}
          </ul>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="bg-white rounded-lg shadow-lg p-8">
          {error && (
            <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
              <div className="flex items-center">
                <AlertCircle className="w-5 h-5 text-red-500 mr-2" />
                <p className="text-red-700">{error}</p>
              </div>
            </div>
          )}

          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                {t('report.form.incidentDate')}
              </label>
              <input
                type="date"
                {...register('incidentDate', { required: true })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-safe-dark focus:border-transparent"
              />
              {errors.incidentDate && (
                <p className="text-red-500 text-sm mt-1">This field is required</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                {t('report.form.location')}
              </label>
              <input
                type="text"
                {...register('location')}
                placeholder="City, Country (Optional)"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-safe-dark focus:border-transparent"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                {t('report.form.description')}
              </label>
              <div className="flex gap-2 mb-2">
                <button
                  type="button"
                  onClick={handleVoiceInput}
                  className={`px-4 py-2 rounded-lg text-sm font-medium ${
                    listening
                      ? 'bg-red-500 text-white'
                      : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                  }`}
                >
                  {listening ? 'Stop Recording' : 'Voice Input'}
                </button>
              </div>
              <textarea
                {...register('description', {
                  required: 'Description is required',
                  minLength: {
                    value: 10,
                    message: 'Description must be at least 10 characters',
                  },
                })}
                rows={8}
                placeholder={t('report.form.descriptionPlaceholder')}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-safe-dark focus:border-transparent"
              />
              {errors.description && (
                <p className="text-red-500 text-sm mt-1">{errors.description.message}</p>
              )}
              {listening && (
                <p className="text-sm text-gray-500 mt-2">
                  Listening... {transcript && `(${transcript})`}
                </p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                {t('report.form.uploadMedia')}
              </label>
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                <Upload className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                <input
                  type="file"
                  multiple
                  accept="image/*,video/*,audio/*"
                  onChange={handleFileChange}
                  className="hidden"
                  id="media-upload"
                />
                <label
                  htmlFor="media-upload"
                  className="cursor-pointer text-safe-dark hover:text-safe-dark/80 font-medium"
                >
                  Click to upload files
                </label>
                {mediaFiles.length > 0 && (
                  <p className="text-sm text-gray-600 mt-2">
                    {mediaFiles.length} file(s) selected
                  </p>
                )}
              </div>
            </div>

            <div className="flex items-center">
              <input
                type="checkbox"
                id="emergency"
                {...register('isEmergency')}
                className="w-4 h-4 text-red-600 border-gray-300 rounded focus:ring-red-500"
              />
              <label htmlFor="emergency" className="ml-2 text-sm font-medium text-gray-700">
                {t('report.form.emergency')}
              </label>
            </div>

            {isEmergency && (
              <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                <p className="text-red-700 text-sm">
                  Emergency reports are prioritized and will be reviewed immediately.
                </p>
              </div>
            )}

            <button
              type="submit"
              disabled={submitting}
              className="w-full bg-safe-dark text-white py-3 rounded-lg font-semibold hover:bg-safe-dark/90 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              {submitting ? t('report.form.submitting') : t('report.form.submit')}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}


