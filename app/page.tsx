'use client';

import { useTranslation } from 'react-i18next';
import Link from 'next/link';
import { Shield, FileText, Users, AlertCircle, Heart, Lock } from 'lucide-react';

export default function Home() {
  const { t } = useTranslation();

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-safe-light to-blue-50 py-20 px-4 overflow-hidden">
        {/* Background decoration */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-blue-100/50 to-transparent"></div>
        
        <div className="max-w-6xl mx-auto text-center relative z-10">
          <div className="flex justify-center mb-6">
            <div className="relative">
              <div className="absolute inset-0 bg-safe-dark/10 rounded-full blur-lg"></div>
              <Shield className="w-20 h-20 text-safe-dark relative z-10" />
            </div>
          </div>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-6 leading-tight">
            {t('home.title')}
          </h1>
          <p className="text-lg md:text-xl text-gray-700 mb-6 max-w-2xl mx-auto leading-relaxed">
            {t('home.subtitle')}
          </p>
          <p className="text-base md:text-lg text-gray-600 mb-12 max-w-3xl mx-auto leading-relaxed">
            {t('home.description')}
          </p>

          <div className="flex flex-col sm:flex-row flex-wrap justify-center gap-4 md:gap-6">
            <Link
              href="/report"
              className="bg-safe-dark text-white px-6 md:px-8 py-4 rounded-lg font-semibold hover:bg-safe-dark/90 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1 flex items-center justify-center gap-2"
            >
              <FileText className="w-5 h-5" />
              {t('home.reportButton')}
            </Link>
            <Link
              href="/stories"
              className="bg-white text-safe-dark px-6 md:px-8 py-4 rounded-lg font-semibold hover:bg-gray-50 transition-all duration-300 shadow-lg hover:shadow-xl border-2 border-safe-dark transform hover:-translate-y-1 flex items-center justify-center gap-2"
            >
              <Heart className="w-5 h-5" />
              {t('home.storiesButton')}
            </Link>
            <Link
              href="/support"
              className="bg-white text-safe-dark px-6 md:px-8 py-4 rounded-lg font-semibold hover:bg-gray-50 transition-all duration-300 shadow-lg hover:shadow-xl border-2 border-safe-dark transform hover:-translate-y-1 flex items-center justify-center gap-2"
            >
              <Users className="w-5 h-5" />
              {t('home.supportButton')}
            </Link>
            <Link
              href="/emergency"
              className="bg-red-600 text-white px-6 md:px-8 py-4 rounded-lg font-semibold hover:bg-red-700 transition-all duration-300 shadow-lg hover:shadow-red-600/25 transform hover:-translate-y-1 flex items-center justify-center gap-2"
            >
              <AlertCircle className="w-5 h-5" />
              {t('home.emergencyButton')}
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              How SafeVoice Protects You
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Comprehensive safety features designed to protect your identity and provide support
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {[
              {
                icon: Lock,
                title: "End-to-End Encryption",
                description: "All your data is encrypted before it leaves your device. Your identity remains completely anonymous."
              },
              {
                icon: FileText,
                title: "Anonymous Reporting",
                description: "Report incidents without revealing your identity. Your safety is our priority."
              },
              {
                icon: Users,
                title: "Verified Support Network",
                description: "Connect with verified counselors, lawyers, and authorities in your area."
              },
              {
                icon: Heart,
                title: "Story Sharing",
                description: "Share your experience anonymously and find strength in community."
              },
              {
                icon: AlertCircle,
                title: "Emergency Assistance",
                description: "Panic button feature to alert trusted contacts and emergency services instantly."
              },
              {
                icon: Shield,
                title: "Data Privacy",
                description: "Full control over your data. Delete or anonymize your information at any time."
              }
            ].map((feature, index) => (
              <div 
                key={index}
                className="group p-6 lg:p-8 rounded-xl bg-white border border-gray-200 hover:border-safe-dark/30 transition-all duration-300 shadow-sm hover:shadow-lg"
              >
                <div className="flex flex-col items-center text-center">
                  <div className="w-14 h-14 bg-safe-light rounded-full flex items-center justify-center mb-4 group-hover:bg-safe-dark group-hover:scale-110 transition-all duration-300">
                    <feature.icon className="w-7 h-7 text-safe-dark group-hover:text-white" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-3">
                    {feature.title}
                  </h3>
                  <p className="text-gray-600 leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 px-4 bg-gradient-to-br from-safe-light to-blue-100">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Our Impact
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Making a difference in communities worldwide
            </p>
          </div>
          
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { number: "1,000+", label: "Reports Filed" },
              { number: "500+", label: "Stories Shared" },
              { number: "200+", label: "Support Providers" },
              { number: "50+", label: "Communities Served" }
            ].map((stat, index) => (
              <div 
                key={index}
                className="text-center p-6 bg-white/50 backdrop-blur-sm rounded-xl shadow-sm border border-white/50"
              >
                <div className="text-3xl md:text-4xl lg:text-5xl font-bold text-safe-dark mb-2">
                  {stat.number}
                </div>
                <div className="text-gray-700 font-medium">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-4 bg-safe-dark">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">
            Ready to Make a Difference?
          </h2>
          <p className="text-blue-100 mb-8 text-lg">
            Join thousands of survivors and supporters in creating a safer world
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/report"
              className="bg-white text-safe-dark px-8 py-4 rounded-lg font-semibold hover:bg-gray-100 transition-all duration-300 shadow-lg"
            >
              Start Your Report
            </Link>
            <Link
              href="/support"
              className="bg-transparent text-white px-8 py-4 rounded-lg font-semibold hover:bg-white/10 transition-all duration-300 border-2 border-white"
            >
              Find Support
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}