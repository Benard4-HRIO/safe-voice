/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  i18n: {
    locales: ['en', 'es', 'fr', 'sw', 'ar'],
    defaultLocale: 'en',
  },
  images: {
    domains: ['localhost'],
  },
}

module.exports = nextConfig


