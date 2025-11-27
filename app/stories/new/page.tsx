'use client';

import { useTranslation } from 'react-i18next';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useRouter } from 'next/navigation';
import { FileText, AlertCircle, CheckCircle } from 'lucide-react';

interface StoryForm {
  title: string;
  content: string;
}

export default function NewStoryPage() {
  const { t } = useTranslation();
  const router = useRouter();
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<StoryForm>();

  const onSubmit = async (data: StoryForm) => {
    setSubmitting(true);
    setError(null);

    try {
      const response = await fetch('/api/stories', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (result.success) {
        setSuccess(true);
        setTimeout(() => {
          router.push('/stories');
        }, 3000);
      } else {
        setError(result.error || 'Failed to submit story');
      }
    } catch (err) {
      setError('An error occurred while submitting your story');
    } finally {
      setSubmitting(false);
    }
  };

  if (success) {
    return (
      <div className="min-h-screen bg-gray-50 py-12 px-4">
        <div className="max-w-2xl mx-auto">
          <div className="bg-white rounded-lg shadow-lg p-8 text-center">
            <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              Story Submitted
            </h2>
            <p className="text-gray-600 mb-6">
              Your story has been submitted and will be reviewed before publication.
              This helps ensure a safe and supportive environment for everyone.
            </p>
            <p className="text-sm text-gray-500">
              Redirecting to stories page...
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-8">
          <FileText className="w-16 h-16 text-safe-dark mx-auto mb-4" />
          <h1 className="text-4xl font-bold text-gray-900 mb-2">
            Share Your Story
          </h1>
          <p className="text-lg text-gray-600">
            Your story will be anonymized and reviewed before publication
          </p>
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
                Title (Optional)
              </label>
              <input
                type="text"
                {...register('title')}
                placeholder="Give your story a title..."
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-safe-dark focus:border-transparent"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Your Story
              </label>
              <textarea
                {...register('content', {
                  required: 'Story content is required',
                  minLength: {
                    value: 50,
                    message: 'Story must be at least 50 characters',
                  },
                })}
                rows={12}
                placeholder="Share your experience... (Your story will be automatically anonymized)"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-safe-dark focus:border-transparent"
              />
              {errors.content && (
                <p className="text-red-500 text-sm mt-1">{errors.content.message}</p>
              )}
              <p className="text-sm text-gray-500 mt-2">
                Note: Personal information like names, emails, and phone numbers will be automatically removed.
              </p>
            </div>

            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <p className="text-sm text-blue-800">
                <strong>Community Guidelines:</strong> Please ensure your story is respectful and follows our community guidelines. Stories that contain hate speech, threats, or false information will be rejected.
              </p>
            </div>

            <button
              type="submit"
              disabled={submitting}
              className="w-full bg-safe-dark text-white py-3 rounded-lg font-semibold hover:bg-safe-dark/90 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              {submitting ? 'Submitting...' : 'Submit Story'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}


