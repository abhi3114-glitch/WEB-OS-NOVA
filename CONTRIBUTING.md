# Contributing to WebOS Nova

Thank you for your interest in contributing to WebOS Nova! This document provides guidelines and instructions for contributing.

## Code of Conduct

By participating in this project, you agree to maintain a respectful and inclusive environment for all contributors.

## How to Contribute

### Reporting Bugs

1. Check if the bug has already been reported in [Issues](https://github.com/abhi3114-glitch/WEB-OS-NOVA/issues)
2. If not, create a new issue with:
   - Clear title and description
   - Steps to reproduce
   - Expected vs actual behavior
   - Screenshots if applicable
   - Browser and OS information

### Suggesting Features

1. Check existing feature requests in [Issues](https://github.com/abhi3114-glitch/WEB-OS-NOVA/issues)
2. Create a new issue with:
   - Clear description of the feature
   - Use cases and benefits
   - Possible implementation approach

### Pull Requests

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/your-feature-name`
3. Make your changes following our coding standards
4. Write or update tests as needed
5. Ensure all tests pass: `pnpm run test`
6. Ensure linting passes: `pnpm run lint`
7. Commit with clear messages: `git commit -m "Add feature: description"`
8. Push to your fork: `git push origin feature/your-feature-name`
9. Create a Pull Request with:
   - Clear title and description
   - Reference to related issues
   - Screenshots/GIFs for UI changes

## Development Setup

```bash
# Clone your fork
git clone https://github.com/YOUR_USERNAME/WEB-OS-NOVA.git
cd WEB-OS-NOVA

# Install dependencies
pnpm install

# Start development server
pnpm run dev
```

## Coding Standards

### TypeScript
- Use TypeScript for all new files
- Define proper types and interfaces
- Avoid `any` type when possible
- Use meaningful variable and function names

### React
- Use functional components with hooks
- Follow React best practices
- Keep components small and focused
- Use proper prop types

### Styling
- Use Tailwind CSS utility classes
- Follow the existing design system
- Maintain consistent spacing and colors
- Ensure responsive design

### Git Commits
- Use clear, descriptive commit messages
- Follow conventional commits format:
  - `feat:` for new features
  - `fix:` for bug fixes
  - `docs:` for documentation
  - `style:` for formatting changes
  - `refactor:` for code refactoring
  - `test:` for adding tests
  - `chore:` for maintenance tasks

## Project Structure

```
src/
├── apps/          # Application components
├── components/    # Reusable UI components
├── stores/        # Zustand state stores
├── utils/         # Utility functions
├── pages/         # Page components
└── lib/           # Third-party library configs
```

## Testing

- Write unit tests for utility functions
- Write component tests for UI components
- Write E2E tests for critical user flows
- Maintain test coverage above 80%

## Documentation

- Update README.md for significant changes
- Add JSDoc comments for complex functions
- Update API documentation as needed
- Include examples in documentation

## Review Process

1. All PRs require at least one review
2. Address review comments promptly
3. Keep PRs focused and reasonably sized
4. Ensure CI/CD pipeline passes

## Questions?

Feel free to ask questions by:
- Opening an issue
- Starting a discussion
- Reaching out to maintainers

Thank you for contributing to WebOS Nova! 🚀