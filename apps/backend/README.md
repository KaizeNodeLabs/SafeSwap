# SafeSwap Backend 🚀

A robust backend service built with NestJS, supporting the SafeSwap marketplace's API, business logic, and blockchain integration.

## **Tech Stack** 🛠

- [**NestJS**](https://nestjs.com/) - Progressive Node.js framework
- [**TypeScript**](https://www.typescriptlang.org/) - Type safety
- [**GraphQL**](https://graphql.org/) - API query language
- [**Apollo GraphQL**](https://www.apollographql.com/) - GraphQL server implementation
- [**Prisma**](https://www.prisma.io/) - ORM for database management
- [**PostgreSQL**](https://www.postgresql.org/) - Relational database
- [**Docker**](https://www.docker.com/) - Containerization for database and services
- [**ESLint**](https://eslint.org/) - Linting tool
- [**Prettier**](https://prettier.io/) - Code formatter
- [**Jest**](https://jestjs.io/) - Testing framework

## **Prerequisites** 🔧

Before starting, ensure you have the following installed:

✅ **[Docker Desktop](https://www.docker.com/get-started/) (*Required*)**

☑️ **NestJS CLI (*Optional, for easier development*)**

To install **NestJS CLI**, run:

```bash
npm install -g @nestjs/cli
```

## Project Structure 📁

```bash
backend/
├── prisma/             # Prisma schema and migrations
│   ├── schema.prisma   # Database schema
├── src/
│   ├── core/           # Global configuration (Prisma, GraphQL, security)
│   ├── modules/        # Feature-based modules
│   │   ├── categories/ # Categories module
│   ├── shared/         # Utilities, decorators, pipes, filters
│   ├── main.ts         # Application entry point
├── test/               # Unit and integration tests
├── dist/               # Compiled output (build)
├── package.json        # Project configuration
├── tsconfig.json       # TypeScript configuration
└── .env.example        # Environment variables template
```

## **Getting Started** 🚀

1. **Install dependencies**:
    
    ```bash
    npm install
    ```
    
2. **Start the Database with Docker**:

    Ensure Docker Desktop is running, then execute:
    
    ```bash
    docker-compose up -d
    ```
    
    This will start a **PostgreSQL** database container in the background.
    
    You can check running containers with:
    
    ```bash
    docker ps
    ```

    For detailed database setup, visit:
    📖 **[PostgreSQL Database Setup](postgres-setup.md)**
    
3. **Configure Environment Variables**:
    
    Create a `.env` file based on `.env.example`:
    
    ```bash
    cp .env.example .env
    ```
    
    You can **configure the variables as you prefer or leave the default values**.
    
4. **Set Up Database (Prisma & PostgreSQL)**:
    
    Run database migrations:
    
    ```bash
    npm run db:migrate
    ```
    
    Check database records using **Prisma Studio**:
    
    ```bash
    npm run db:studio
    ```
    
5. **Run development server**:
    
    ```bash
    npm run dev
    ```
    
6. **Access the API**:
    
    Open [http://localhost:4000/graphql](http://localhost:4000/graphql) in your browser or API client.

## Available Scripts 📜

- `npm run build` - Compile the application
- `npm run dev` - Start the development server
- `npm run start` - Start the application in production
- `npm run start:debug` - Start the application with debugging
- `npm run test` - Run unit tests
- `npm run test:watch` - Run tests in watch mode
- `npm run lint` - Run ESLint with autofix
- `npm run format` - Format the codebase with Prettier
- `npm run db:migrate` - Apply database migrations
- `npm run db:push` - Update the database schema without migrations
- `npm run db:studio` - Open Prisma Studio for database inspection

## Development Guidelines 📋

1. **Code Formatting**:
    - Use Prettier to ensure consistent code formatting.
    - Run `npm run format` before committing changes.
2. **Linting**:
    - Follow ESLint rules to maintain code quality.
    - Run `npm run lint` to check for and fix linting issues.
3. **Testing**:
    - Write unit tests for all modules and services.
    - Run tests using `npm run test`.
4. **TypeScript**:
    - Use TypeScript features for strong typing and code clarity.
    - Type safety is mandatory across all modules.

## Learn More 📚

- 📖 [NestJS Documentation](https://docs.nestjs.com/)
- 📖 [Prisma Documentation](https://www.prisma.io/docs)
- 📖 [GraphQL Documentation](https://graphql.org/learn/)
- 📖 [Apollo GraphQL Documentation](https://www.apollographql.com/docs/)
- 📖 [PostgreSQL Documentation](https://www.postgresql.org/docs/)
- 📖 [Docker Documentation](https://docs.docker.com/)
- 📖 [ESLint Documentation](https://eslint.org/docs/latest/)
- 📖 [Jest Documentation](https://jestjs.io/docs/getting-started)

## License

MIT License
