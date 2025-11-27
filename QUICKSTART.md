# SafeVoice Quick Start Guide

## 🚀 Get Started in 5 Minutes

### Step 1: Install Dependencies
```bash
npm install
```

### Step 2: Set Up Environment
```bash
# Copy the example environment file
cp env.example .env

# Edit .env and set your secrets (use strong random values)
# DATABASE_URL="file:./dev.db"
# JWT_SECRET="your-random-secret-here"
# ENCRYPTION_KEY="your-32-char-encryption-key!!"
```

### Step 3: Initialize Database
```bash
# Generate Prisma client
npx prisma generate

# Create database tables
npx prisma db push
```

### Step 4: Start Development Server
```bash
npm run dev
```

### Step 5: Open in Browser
Visit [http://localhost:3000](http://localhost:3000)

## ✅ What You'll See

- **Home Page**: Welcome page with feature overview
- **Report Page**: Anonymous incident reporting form
- **Stories Page**: Story sharing hub
- **Support Page**: Directory of support providers
- **Emergency Page**: Panic button and emergency assistance
- **Privacy Page**: Data privacy and consent management

## 🎯 Key Features to Test

1. **Anonymous Reporting**
   - Go to `/report`
   - Fill out the form (try voice input!)
   - Submit and save your report ID

2. **Story Sharing**
   - Go to `/stories`
   - Click "Share Your Story"
   - Submit a story (it will be anonymized)

3. **Support Network**
   - Go to `/support`
   - Allow location access to see nearby providers
   - Filter by type (Counselor, Lawyer, etc.)

4. **Emergency Features**
   - Go to `/emergency`
   - Test the panic button (with confirmation)
   - Check emergency service links

5. **Multilingual Support**
   - Click the language switcher in the navigation
   - Try different languages (English, Spanish, French, Swahili, Arabic)

6. **Privacy Controls**
   - Go to `/privacy`
   - Test consent management
   - Try data deletion/anonymization

## 📝 Adding Sample Data

### Add a Support Provider

1. Open Prisma Studio:
```bash
npx prisma studio
```

2. Create a User first:
   - Go to `User` table
   - Click "Add record"
   - Set `role` to `COUNSELOR`, `LAWYER`, etc.
   - Save and copy the `id`

3. Create a SupportProfile:
   - Go to `SupportProfile` table
   - Click "Add record"
   - Fill in:
     - `type`: COUNSELOR, LAWYER, AUTHORITY, NGO, or VOLUNTEER
     - `name`: Provider name
     - `description`: Services description
     - `isVerified`: true
     - `latitude` and `longitude`: Location coordinates
     - `userId`: The user ID from step 2
   - Save

## 🔧 Common Commands

```bash
# Development
npm run dev          # Start dev server
npm run build        # Build for production
npm run start        # Start production server
npm run lint         # Run linter

# Database
npx prisma studio    # Open database GUI
npx prisma generate  # Regenerate Prisma client
npx prisma db push   # Push schema changes
```

## 🐛 Troubleshooting

### "Module not found" errors
```bash
rm -rf node_modules .next
npm install
npx prisma generate
```

### Database errors
```bash
# Reset database
rm prisma/dev.db
npx prisma db push
```

### Build errors
```bash
# Clear cache and rebuild
rm -rf .next
npm run build
```

## 📚 Next Steps

1. **Customize Branding**: Update colors, logos, and text in components
2. **Add Support Providers**: Use Prisma Studio to add real support profiles
3. **Configure Emergency Alerts**: Set up email/SMS services
4. **Set Up File Storage**: Configure S3 or similar for media uploads
5. **Add Authentication**: Implement user authentication system
6. **Deploy**: Follow production deployment guide in SETUP.md

## 🆘 Need Help?

- Check `README.md` for detailed documentation
- See `SETUP.md` for advanced configuration
- Review `CONTRIBUTING.md` for development guidelines

---

**Remember**: This is a sensitive application dealing with gender-based violence. Always prioritize user privacy and security.


