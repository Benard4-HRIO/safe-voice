# Contributing to SafeVoice

Thank you for your interest in contributing to SafeVoice! This project is designed to help survivors of gender-based violence, so we take security, privacy, and sensitivity very seriously.

## Code of Conduct

- Be respectful and empathetic
- Maintain confidentiality and privacy
- Follow security best practices
- Test thoroughly before submitting changes
- Respect user anonymity and data protection

## Development Workflow

1. **Fork the repository** (if applicable)
2. **Create a feature branch**: `git checkout -b feature/your-feature-name`
3. **Make your changes** following the coding standards
4. **Test thoroughly** - especially security and privacy features
5. **Commit your changes**: `git commit -m 'Add feature: description'`
6. **Push to your branch**: `git push origin feature/your-feature-name`
7. **Create a Pull Request**

## Coding Standards

### TypeScript
- Use TypeScript for all new code
- Define proper types and interfaces
- Avoid `any` types when possible
- Use meaningful variable and function names

### Security
- Never log sensitive user data
- Always encrypt sensitive information
- Validate and sanitize all inputs
- Use parameterized queries (Prisma handles this)
- Follow OWASP security guidelines

### Privacy
- Respect user anonymity
- Don't store unnecessary personal information
- Implement proper consent management
- Allow users to delete their data

### Testing
- Test all user flows
- Test encryption/decryption
- Test error handling
- Test accessibility features
- Test on multiple browsers

## Areas That Need Contribution

### High Priority
- [ ] Authentication system implementation
- [ ] File upload to secure storage (S3, etc.)
- [ ] Email/SMS integration for emergency alerts
- [ ] Content moderation tools and workflow
- [ ] Rate limiting implementation
- [ ] Comprehensive test suite

### Medium Priority
- [ ] Additional language translations
- [ ] Enhanced accessibility features
- [ ] Mobile app version
- [ ] Analytics (privacy-preserving)
- [ ] Admin dashboard
- [ ] Reporting and analytics for moderators

### Low Priority
- [ ] Dark mode
- [ ] Additional themes
- [ ] More customization options
- [ ] Advanced search features

## Security Reporting

If you discover a security vulnerability, please:
1. **DO NOT** create a public issue
2. Email security@safevoice.org with details
3. Include steps to reproduce
4. Allow time for the fix before public disclosure

## Questions?

Feel free to open an issue for questions or discussions about features.

Thank you for helping make SafeVoice a safer platform for survivors!


