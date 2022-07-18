# consule.me

An app that brings all your apps in one dashboard.

## Pre-requisite

We used [PNPM](https://pnpm.io/), thank me later 😉

## Setup

Make sure to install the dependencies:

```bash

# pnpm
pnpm install --shamefully-hoist
```

## Development Server

Start the development server on http://localhost:3000

```bash
pnpm dev
```

## Run the Design System

```bash
pnpm run story:dev
```

## Test

We use [vitest](https://vitest.dev/) for running unit tests.

```bash
pnpm run test
```

### Run test in watch mode

```bash
pnpm run test:watch
```

## Production

Build the application for production:

```bash
pnpm run build
```

Locally preview production build:

```bash
npm run preview
```

## Tech Stack

- [Nuxt 3](https://v3.nuxtjs.org/)
- [UnoCSS](https://uno.antfu.me/play/)
- [histoire](https://histoire.dev/)
- [Stepzen](https://stepzen.com/)
- [Urql](https://formidable.com/open-source/urql/docs/)