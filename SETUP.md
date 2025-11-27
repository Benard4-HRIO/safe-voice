# SafeVoice Setup Guide

## Quick Start

Follow these steps to get SafeVoice running on your local machine:

### 1. Install Dependencies

```bash
npm install
```

### 2. Configure Environment Variables

Copy the example environment file and edit it:

```bash
cp env.example .env
```

Edit `.env` and set secure values for:
- `JWT_SECRET`: A random secret key for JWT tokens
- `ENCRYPTION_KEY`: A 32-character key for encryption (keep this secure!)
- `DATABASE_URL`: Database connection string (default: SQLite for development)

### 3. Initialize Database

```bash
# Generate Prisma client
npx prisma generate

# Create database and tables
npx prisma db push

# (Optional) Open Prisma Studio to view/edit data
npx prisma studio
```

### 4. Run Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Database Management

### View Database

```bash
npx prisma studio
```

This opens a web interface to view and edit your database.

### Reset Database

```bash
# Delete the database file (SQLite)
rm prisma/dev.db

# Recreate tables
npx prisma db push
```

### Create Migrations (for production databases)

```bash
npx prisma migrate dev --name your_migration_name
```

## Adding Sample Data

You can add sample support profiles through Prisma Studio or by creating a seed script.

### Example: Add a Support Profile

1. Open Prisma Studio: `npx prisma studio`
2. Navigate to `SupportProfile` table
3. Click "Add record"
4. Fill in the required fields:
   - `type`: COUNSELOR, LAWYER, AUTHORITY, NGO, or VOLUNTEER
   - `name`: Name of the support provider
   - `description`: Description of services
   - `isVerified`: true
   - `latitude` and `longitude`: Location coordinates
   - `userId`: Create a User first, then use its ID

## Production Deployment

### Recommended Stack

- **Database**: PostgreSQL (via Prisma)
- **Hosting**: Vercel, AWS, or similar
- **File Storage**: AWS S3 or similar for media uploads
- **Email/SMS**: Twilio, SendGrid, or similar for emergency alerts

### Environment Variables for Production

```env
DATABASE_URL="postgresql://user:password@host:5432/safevoice"
JWT_SECRET="your-production-secret-key-min-32-chars"
ENCRYPTION_KEY="your-production-encryption-key-32-chars!!"
NEXT_PUBLIC_APP_URL="https://your-domain.com"
NEXT_PUBLIC_MAP_API_KEY="your-map-api-key"
```

### Security Checklist

- [ ] Use strong, unique secrets for JWT and encryption
- [ ] Enable HTTPS only
- [ ] Set up rate limiting
- [ ] Configure CORS properly
- [ ] Set up monitoring and logging
- [ ] Regular security audits
- [ ] Backup database regularly
- [ ] Implement proper authentication
- [ ] Set up content moderation workflow
- [ ] Configure emergency alert services

## Troubleshooting

### Database Connection Issues

If you see database connection errors:
1. Check your `DATABASE_URL` in `.env`
2. Ensure the database file exists (for SQLite)
3. Run `npx prisma generate` again
4. Try `npx prisma db push` to recreate tables

### Build Errors

If you encounter build errors:
1. Delete `node_modules` and `.next` folders
2. Run `npm install` again
3. Run `npx prisma generate`
4. Try building again: `npm run build`

### i18n Not Working

If translations aren't showing:
1. Clear browser localStorage
2. Check browser console for errors
3. Ensure `I18nProvider` wraps your app in `layout.tsx`

## Next Steps

1. Customize the UI to match your organization's branding
2. Set up email/SMS services for emergency alerts
3. Configure file upload storage
4. Add authentication system
5. Set up content moderation tools
6. Configure analytics (privacy-preserving)
7. Add more language translations
8. Test all features thoroughly

## Support

For issues or questions, please contact the development team.


