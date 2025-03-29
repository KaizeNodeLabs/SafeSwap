# SafeSwap Frontend 🔄

A modern web marketplace built with Next.js, leveraging blockchain technology for secure escrow-based transactions.

## Tech Stack 🛠

- [Next.js](https://nextjs.org) - React framework
- [Radix UI](https://www.radix-ui.com) - Headless UI primitives
- [shadcn/ui](https://ui.shadcn.com) - Accessible components
- [TailwindCSS](https://tailwindcss.com) - Utility-first CSS
- [TypeScript](https://www.typescriptlang.org) - Type safety
- [Biome](https://biomejs.dev) - Fast formatter and linter
- [Stellar](https://stellar.org) - Blockchain network

## Project Structure 📁

```
frontend/
├── app/           # Next.js App Router and pages
├── components/    # Reusable React components
│   ├── home/        # Home page components
│   ├── marketplace/ # Marketplace-related components
│   ├── products/    # Product-related components
│   ├── providers/   # Context providers (e.g., ThemeProvider)
│   ├── shared/      # Common UI elements
│   └── ui/          # shadcn/ui components
├── context/       # Global state and providers
├── fonts/         # Custom and external fonts
├── hooks/         # Custom React hooks
├── lib/           # Core utilities and configurations
│   ├── mocks/       # Mock data for testing
│   ├── schemas/     # Zod validation schemas
│   ├── types/       # TypeScript types and interfaces
├── locales/       # i18n translation files
├── public/        # Static assets (images, icons, etc.)
├── utils/         # Pure utility functions (e.g., string formatting, helpers)
docs/instructions # Project documentation and guidelines
    └── instructions.md    # Project specifications
.cursorrules      # Development standards
```

## Development Guidelines 📋

### Instructions.md
The `instructions.md` file serves as a blueprint for Cursor AI, defining:
- Project overview and core functionalities
- Component specifications
- Feature requirements
- Implementation details

### .cursorrules
The `.cursorrules` file defines coding standards and development guidelines:
- TypeScript configurations and best practices
- Component structure and naming conventions
- Testing requirements
- Code formatting rules via Biome
- Project architecture patterns

## Getting Started 🚀

1. Install dependencies:
    ```bash
    npm install
    ```

2. Configure Environment Variables:
    Create a `.env` file based on `.env.example`:

    ```bash
    cp .env.example .env
    ```

3. Run development server:
    ```bash
    npm run dev
    ```

Open [http://localhost:3000](http://localhost:3000)

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Create production build
- `npm run start` - Start production server
- `npm run lint` - Run Biome linter

## Component Usage

```typescript
import { Button } from "@/components/ui/button"

// Use shadcn/ui components
<Button variant="outline">Click me</Button>
```

## Development Guidelines

- Use TypeScript for type safety
- Follow Biome linting rules
- Components should be accessible
- Use Tailwind CSS for styling
- Prefer server components unless client interactivity needed

## Learn More

- [Next.js Documentation](https://nextjs.org/docs)
- [Radix UI Documentation](https://www.radix-ui.com)
- [shadcn/ui Documentation](https://ui.shadcn.com)
- [Stellar Documentation](https://developers.stellar.org)

## License

MIT License
