# Frontend Template

A Next.js starter with code generators for pages, layouts, components, stores and utils.

The template provides a Next.js 14 App Router project configured with TypeScript, Tailwind CSS, Zustand and Zod, plus a set of `ts-node` scripts that create files following a fixed folder convention. It is meant for developers who want to start a frontend project with that structure already in place.

## Table of contents

- [Frontend Template](#frontend-template)
	- [Table of contents](#table-of-contents)
	- [How it works](#how-it-works)
	- [Tech stack](#tech-stack)
	- [Repository structure](#repository-structure)
	- [Prerequisites](#prerequisites)
	- [Installation](#installation)
	- [Running locally](#running-locally)
	- [Useful scripts](#useful-scripts)
	- [Tests and quality](#tests-and-quality)
	- [License](#license)

## How it works

1. **Layout and page**: `create:layout <route>` and `create:page <route>` create a `layout.tsx` or a `page.tsx` in `src/app/<route>`. Missing parent folders are created.
2. **Component**: `create:component <name> [type]` creates a folder with the component file, a props type file and an `index.ts`. The type is `atom`, `molecule` or `organism` and selects the subfolder of `src/lib/components` (`atoms`, `molecules`, `organisms`). Without a type, the folder is created directly in `src/lib/components`.
3. **Store**: `create:store <name>` creates a Zustand store, its state type and an `index.ts` in `src/lib/stores/<name>`.
4. **Util**: `create:util <name>` creates empty `<name>.util.ts` and `<name>.type.ts` files and an `index.ts` that re-exports them, in `src/lib/utils/<name>`.
5. **Existing files**: the generators create a file only if it does not exist yet.

## Tech stack

| Layer | Technologies |
| --- | --- |
| Framework | Next.js 14 (App Router), React 18 |
| Language | TypeScript |
| Styling | Tailwind CSS 3, PostCSS, Autoprefixer, `clsx` |
| State and validation | Zustand, Zod |
| Icons | Lucide React |
| Tooling | pnpm, ESLint (`@maxencebonamy/eslint-config`, `eslint-config-next`), `ts-node`, `yargs` |

## Repository structure

```
.
├── public/                 Static assets
├── scripts/                Code generators
│   ├── create-component/   Component generator and templates
│   ├── create-layout/      Layout generator and template
│   ├── create-page/        Page generator and template
│   ├── create-store/       Store generator and templates
│   ├── create-util/        Util generator and template
│   └── utils/              Path and string helpers shared by the generators
└── src/
    ├── app/                Next.js routes, root layout and home page
    └── lib/
        ├── actions/        Server actions
        ├── components/     atoms, molecules and organisms
        ├── hooks/          React hooks
        ├── providers/      React providers
        ├── stores/         Zustand stores
        ├── styles/         Global CSS (Tailwind directives)
        └── utils/          Utility modules
```

Each component, store and util lives in its own folder with an `index.ts` that exports its public API, and a separate `.type.ts` file for its types. The `@/*` import alias maps to `src/*`. Code is indented with tabs.

## Prerequisites

- [Node.js](https://nodejs.org/) 18 or later
- [pnpm](https://pnpm.io/) 8 or later (`npm install -g pnpm`)
- [Git](https://git-scm.com/)

## Installation

```bash
git clone git@github.com:maxencebonamy/Frontend-Template-Old.git
cd Frontend-Template-Old
pnpm install
```

## Running locally

```bash
pnpm dev
```

The development server listens on <http://localhost:3000>. The template has no environment variables.

## Useful scripts

| Command | Effect |
| --- | --- |
| `pnpm dev` | Start the Next.js development server |
| `pnpm build` | Build the application for production |
| `pnpm start` | Start the production server |
| `pnpm lint` | Lint the repository |
| `pnpm lint:fix` | Lint the repository and apply fixes |
| `pnpm create:page <route>` | Create a page in `src/app/<route>` |
| `pnpm create:layout <route>` | Create a layout in `src/app/<route>` |
| `pnpm create:component <name> [type]` | Create a component (`atom`, `molecule` or `organism`) |
| `pnpm create:store <name>` | Create a Zustand store |
| `pnpm create:util <name>` | Create a util module |

## Tests and quality

```bash
pnpm lint
```

The project has no test suite. TypeScript runs in `strict` mode, and the ESLint configuration is inherited from `@maxencebonamy/eslint-config`.

## License

This project is licensed under the [MIT License](LICENSE).
