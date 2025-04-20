# Fangbuilt Plate

> **[Bun](https://bun.sh/) is required to be installed locally in your device**

Recommended IDE: [Visual Studio Code](https://code.visualstudio.com/) <br>
Recommended IDE extensions:
 - [Tailwind CSS Intellisense](https://marketplace.visualstudio.com/items?itemName=bradlc.vscode-tailwindcss)
 - [HTML CSS Support](https://marketplace.visualstudio.com/items?itemName=ecmel.vscode-html-css)
 - [Auto Rename Tag](https://marketplace.visualstudio.com/items?itemName=formulahendry.auto-rename-tag)


This **web front-end boilerplate** provides a minimal setup to get React working with:
 - React 19
 - [Tanstack Router](https://tanstack.com/router/latest)
 - [Tanstack Query](https://tanstack.com/query/latest)
 - [TailwindCSS](https://tailwindcss.com/) v4
 - [Bun](https://bun.sh/) (runtime and package manager)

> Please change your default formatter to [Prettier](https://prettier.io/), usually by `ctrl + shift + p: Format Document` in [Visual Studio Code](https://code.visualstudio.com/)

> Don't forget to execute `bun run install` after forking or cloning

> Execute `bun run dev` to generate the `routeTree.gen.ts` file inside the `/src` directory

# Plans
- Will use the [React Compiler](https://react.dev/learn/react-compiler) once it supports [SWC](https://swc.rs/docs/benchmarks#es2020-1). Ain't no way in hell I'm using [Babel](https://babeljs.io/), thank you.

- Will use [Husky](https://typicode.github.io/husky/) with [Commitlint](https://commitlint.js.org/) when Bun fixes this [issue](https://github.com/conventional-changelog/commitlint/issues/3873). Tried to migrate back to [Node.js](https://nodejs.org/en) and ain't no way in hell I'm complying with the speed of [npm](https://www.npmjs.com/), sorry.

- Will use [Tanstack Form](https://tanstack.com/form/latest), but for now I will stick with manual setup while you can add [React Hook Form](https://react-hook-form.com/) if that's what you prefer.
