<div align="center">
  <a href="https://lp.memot.app" target="_blank" rel="noopener noreferrer">
    <img src="./src/assets/memot-logo-full-color.svg" alt="memot logo" width="320" />
  </a>
</div>
<div align="center">
  <a href="https://lp.memot.app" target="_blank" rel="noopener noreferrer">
    Memot
  </a>
</div>

<div align="right">
  <a href="./README.ja.md">日本語</a>
</div>

## Description

This repository contains the source code for the landing page of the Memot application.

## Tech Stack

| Category               | Technology                                            |
| ---------------------- | ----------------------------------------------------- |
| **Framework**          | [Astro](https://astro.build/)                         |
| **Styling**            | [Tailwind CSS](https://tailwindcss.com/)              |
| **Hosting**            | [Vercel](https://vercel.com/)                         |
| **Linting/Formatting** | [Biome](https://biomejs.dev/)                         |
| **Testing**            | [Vitest](https://vitest.dev/)                         |
| **CI/CD**              | [GitHub Actions](https://github.com/features/actions) |
| **Package Manager**    | [pnpm](https://pnpm.io/)                              |

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (v22 or higher)
- [pnpm](https://pnpm.io/) (v10 or higher)

### Installation

1. Clone the repository:
   ```bash
   git clone git@github.com:memot-app/memot.git
   ```
2. Navigate to the project directory:
   ```bash
   cd memot
   ```
3. Install dependencies:
   ```bash
   pnpm install
   ```

### Development

To start the development server, run:

```bash
pnpm dev
```

Open [http://localhost:4321](http://localhost:4321) in your browser to see the result.

## Available Commands

| Command        | Description                                                                                           |
| -------------- | ----------------------------------------------------------------------------------------------------- |
| `pnpm dev`     | Starts the development server.                                                                        |
| `pnpm build`   | Builds the application for production.                                                                |
| `pnpm preview` | Previews the production build locally.                                                                |
| `pnpm test`    | Runs tests using Vitest.                                                                              |
| `pnpm check`   | Runs all checks (Astro and Biome).                                                                    |
| `pnpm fix`     | Automatically fixes linting and formatting issues with Biome. Note that Astro files are not included. |

## Contributing

Contributions are welcome! Please see the [contributing guidelines](./CONTRIBUTING.md) for more information.

## License

This project is licensed under the [GNU AGPLv3 License](LICENSE).
