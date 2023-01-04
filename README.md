# Fastify Next.js Monorepo Starter

Turborepo setup for using:
- Fastify
- Next.js
- Supabase Auth
- ESLint
- Typescript

## What's inside?

This turborepo uses [pnpm](https://pnpm.io) as a package manager. It includes the following packages/apps:

### Apps and Packages

- `api`: a Fastify + tRPC app
- `web`: a [Next.js](https://nextjs.org/) + tRPC app
- `ui`: a stub React component library shared by the `web` application
- `eslint-config-custom`: `eslint` configurations (includes `eslint-config-next` and `eslint-config-prettier`)
- `eslint-config-custom-server`: `eslint` configuration base for server apps
- `tsconfig`: `tsconfig.json`s used throughout the monorepo


Each package/app is 100% [TypeScript](https://www.typescriptlang.org/).

### Utilities

This turborepo has some additional tools already setup for you:

- [TypeScript](https://www.typescriptlang.org/) for static type checking
- [ESLint](https://eslint.org/) for code linting
- [Prettier](https://prettier.io) for code formatting

### Build

To build all apps and packages, run the following command:

```
pnpm run build
```

### Develop

To develop all apps and packages, run the following command:

```
pnpm run dev
```
