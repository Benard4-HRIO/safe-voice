'use client';

import { useTranslation } from 'react-i18next';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Heart, Flag, Plus, Clock } from 'lucide-react';

interface Story {
  id: string;
  storyId: string;
  title: string | null;
  content: string;
  upvotes: number;
  createdAt: string;
  tags: string | null;
}

export default function StoriesPage() {
  const { t } = useTranslation();
  const [stories, setStories] = useState<Story[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchStories();
  }, []);

  const fetchStories = async () => {
    try {
      const response = await fetch('/api/stories?status=APPROVED');
      const result = await response.json();
      
      if (result.success) {
        setStories(result.stories);
      } else {
        setError(result.error);
      }
    } catch (err) {
      setError('Failed to load stories');
    } finally {
      setLoading(false);
    }
  };

  const handleUpvote = async (storyId: string) => {
    try {
      const response = await fetch(`/api/stories/${storyId}/upvote`, {
        method: 'POST',
      });
      const result = await response.json();
      
      if (result.success) {
        setStories(stories.map(story =>
          story.storyId === storyId
            ? { ...story, upvotes: result.upvotes }
            : story
        ));
      }
    } catch (err) {
      console.error('Failed to upvote:', err);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 py-12 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <p className="text-gray-600">{t('common.loading')}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-4xl font-bold text-gray-900 mb-2">
              {t('stories.title')}
            </h1>
            <p className="text-lg text-gray-600">
              {t('stories.subtitle')}
            </p>
          </div>
          <Link
            href="/stories/new"
            className="flex items-center space-x-2 bg-safe-dark text-white px-6 py-3 rounded-lg font-semibold hover:bg-safe-dark/90"
          >
            <Plus className="w-5 h-5" />
            <span>{t('stories.writeStory')}</span>
          </Link>
        </div>

        {error && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
            <p className="text-red-700">{error}</p>
          </div>
        )}

        {stories.length === 0 ? (
          <div className="bg-white rounded-lg shadow-lg p-12 text-center">
            <p className="text-gray-600 text-lg">{t('stories.noStories')}</p>
            <Link
              href="/stories/new"
              className="inline-block mt-4 text-safe-dark hover:text-safe-dark/80 font-semibold"
            >
              {t('stories.writeStory')}
            </Link>
          </div>
        ) : (
          <div className="space-y-6">
            {stories.map((story) => (
              <article
                key={story.id}
                className="bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transition-shadow"
              >
                {story.title && (
                  <h2 className="text-2xl font-bold text-gray-900 mb-3">
                    {story.title}
                  </h2>
                )}
                <p className="text-gray-700 mb-4 whitespace-pre-wrap">
                  {story.content}
                </p>
                <div className="flex items-center justify-between pt-4 border-t border-gray-200">
                  <div className="flex items-center space-x-4">
                    <button
                      onClick={() => handleUpvote(story.storyId)}
                      className="flex items-center space-x-1 text-gray-600 hover:text-red-500 transition-colors"
                    >
                      <Heart className="w-5 h-5" />
                      <span>{story.upvotes}</span>
                    </button>
                    <div className="flex items-center space-x-1 text-gray-500 text-sm">
                      <Clock className="w-4 h-4" />
                      <span>{new Date(story.createdAt).toLocaleDateString()}</span>
                    </div>
                  </div>
                  <button className="flex items-center space-x-1 text-gray-600 hover:text-gray-800 text-sm">
                    <Flag className="w-4 h-4" />
                    <span>Flag</span>
                  </button>
                </div>
              </article>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}


