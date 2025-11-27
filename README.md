# SafeVoice

A Secure Platform for Reporting and Support Against Gender-Based Violence

## Overview

SafeVoice is a comprehensive web application designed to empower survivors of gender-based violence to report incidents anonymously, share their stories, and connect with verified support professionals including counselors, lawyers, and local authorities.

## Features

### 🔒 Anonymous Reporting System
- Secure form for incident reporting with optional media uploads
- End-to-end encryption to protect user identity and data
- Anonymous report IDs for tracking without revealing identity

### 📖 Story Sharing Hub
- Survivors can share their experiences anonymously
- Content moderation and community guidelines
- Upvoting and engagement features

### 🤝 Support Network Integration
- Geo-location based directory of verified counselors, lawyers, and authorities
- Interactive map view showing nearby support providers
- Contact request system to initiate support

### 🚨 Emergency Assistance
- Panic button feature to alert trusted contacts and emergency services
- Real-time location sharing during distress
- Direct links to emergency hotlines

### 🌍 Multilingual Support
- Support for English, Spanish, French, Swahili, and Arabic
- RTL (Right-to-Left) support for Arabic
- Language detection and switching

### ♿ Accessibility Features
- Voice-to-text input for reports
- High contrast mode support
- Reduced motion support
- Keyboard navigation
- Screen reader friendly

### 🔐 Data Privacy and Consent
- Clear consent protocols for data sharing
- Option to delete or anonymize data at any time
- Consent logging and transparency

## Tech Stack

- **Frontend**: Next.js 14, React, TypeScript
- **Styling**: Tailwind CSS
- **Database**: SQLite (via Prisma ORM)
- **Encryption**: CryptoJS (AES-256)
- **Maps**: Leaflet
- **Internationalization**: i18next, react-i18next
- **Forms**: React Hook Form
- **Speech Recognition**: Web Speech API

## Getting Started

### Prerequisites

- Node.js 18+ and npm/yarn
- Git

### Installation

1. Clone the repository:
```bash
cd SAFEVOICE
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:
```bash
cp env.example .env
```

Edit `.env` and update the following:
```
DATABASE_URL="file:./dev.db"
JWT_SECRET="your-super-secret-jwt-key-change-in-production"
ENCRYPTION_KEY="your-32-character-encryption-key!!"
NEXT_PUBLIC_APP_URL="http://localhost:3000"
```

4. Set up the database:
```bash
npx prisma generate
npx prisma db push
```

5. Run the development server:
```bash
npm run dev
```

6. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Project Structure

```
SAFEVOICE/
├── app/                    # Next.js app directory
│   ├── api/               # API routes
│   ├── report/            # Report incident page
│   ├── stories/           # Story sharing pages
│   ├── support/           # Support network page
│   ├── emergency/         # Emergency assistance page
│   └── privacy/           # Privacy and consent page
├── components/            # React components
├── lib/                   # Utility functions
│   ├── encryption.ts     # Encryption utilities
│   ├── db.ts             # Database client
│   ├── auth.ts           # Authentication
│   ├── geolocation.ts    # Location utilities
│   └── i18n.ts           # Internationalization
├── hooks/                 # Custom React hooks
├── prisma/               # Database schema
└── public/              # Static assets
```

## Key Features Implementation

### Encryption
- Reports are encrypted with unique keys before storage
- Encryption keys are themselves encrypted
- Only authorized moderators can decrypt reports

### Anonymous Reporting
- Each report gets a unique anonymous ID (e.g., RPT-ABC123)
- No personal information required
- Optional account creation for tracking

### Story Moderation
- Stories are automatically anonymized
- Content moderation queue
- Community flagging system

### Geo-location
- Haversine formula for distance calculation
- Interactive map with Leaflet
- Filter support providers by distance

### Emergency Features
- Panic button with confirmation
- Automatic location sharing
- Emergency contact notification
- Direct emergency service links

## Security Considerations

- All data is encrypted at rest and in transit
- HTTPS required for production
- Input validation and sanitization
- SQL injection prevention via Prisma
- XSS protection
- CSRF protection
- Rate limiting (to be implemented)

## Production Deployment

Before deploying to production:

1. Update all environment variables with secure values
2. Use a production database (PostgreSQL recommended)
3. Set up proper file storage for media uploads (AWS S3, etc.)
4. Configure HTTPS
5. Set up monitoring and logging
6. Implement rate limiting
7. Set up backup and disaster recovery
8. Configure email/SMS services for emergency alerts
9. Set up content moderation tools
10. Implement proper authentication system

## Contributing

This is a sensitive project dealing with gender-based violence. Please:
- Maintain confidentiality
- Follow security best practices
- Test thoroughly before submitting changes
- Respect user privacy and anonymity

## License

This project is designed for use by organizations working to combat gender-based violence.

## Support

For support, email support@safevoice.org or call the 24/7 hotline: 1-800-SAFE

## Acknowledgments

Built with care for survivors and advocates working to end gender-based violence.


