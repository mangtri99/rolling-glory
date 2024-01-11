# How to setup

NodeJS version: 18.17.1
Package Manager: NPM

After clone this repository, simply run
```sh
cp .env.example .env
npm install
npm run dev
```

Access application local to http://localhost:5174
You can also access live version here https://rolling-glory-delta.vercel.app/


# Why VueJS
 Vue.js offers higher performance speed, and many programmers say it is easier to learn than React.js. Its multiple customization features are also a factor that draws developers to Vue.js.

 Community: For the community, yes react has biggest community but vue also has great community

 Syntax: Vue is easy to use, has clean code. Vue JS use template based on HTML and react use JSX as template engine

 Performance: Vue has better performance than react, by default vue only re-render element change not like react change entire element. So much faster than react
 You can check the benchmark comparison Javascript framework here
 https://krausest.github.io/js-framework-benchmark/2023/table_chrome_120.0.6099.62.html

 State Management: Vue has powerful state management and can be easyly to use. React state management depends on third party like redux, zustand. react builtin state management itself is hard to use for complex state


 Ecosystem: Both Vue and React has many plugin, and UI library to help fast and better development

# SEO
Use current product name, description, image for title, meta description and meta og:image


Note: 
Currently the API for wishlist not working, after hit endpoint to /https://recruitment.dev.rollingglory.com/api/v2/gifts/18/wishlist with POST method, key `isWishlist` on data product still has `0` value
So, currently I only use localStorage to store wishlish product

# rolling-glory

This template should help get you started developing with Vue 3 in Vite.

## Recommended IDE Setup

[VSCode](https://code.visualstudio.com/) + [Volar](https://marketplace.visualstudio.com/items?itemName=Vue.volar) (and disable Vetur) + [TypeScript Vue Plugin (Volar)](https://marketplace.visualstudio.com/items?itemName=Vue.vscode-typescript-vue-plugin).

## Type Support for `.vue` Imports in TS

TypeScript cannot handle type information for `.vue` imports by default, so we replace the `tsc` CLI with `vue-tsc` for type checking. In editors, we need [TypeScript Vue Plugin (Volar)](https://marketplace.visualstudio.com/items?itemName=Vue.vscode-typescript-vue-plugin) to make the TypeScript language service aware of `.vue` types.

If the standalone TypeScript plugin doesn't feel fast enough to you, Volar has also implemented a [Take Over Mode](https://github.com/johnsoncodehk/volar/discussions/471#discussioncomment-1361669) that is more performant. You can enable it by the following steps:

1. Disable the built-in TypeScript Extension
    1) Run `Extensions: Show Built-in Extensions` from VSCode's command palette
    2) Find `TypeScript and JavaScript Language Features`, right click and select `Disable (Workspace)`
2. Reload the VSCode window by running `Developer: Reload Window` from the command palette.

## Customize configuration

See [Vite Configuration Reference](https://vitejs.dev/config/).

## Project Setup

```sh
npm install
```

### Compile and Hot-Reload for Development

```sh
npm run dev
```

### Type-Check, Compile and Minify for Production

```sh
npm run build
```

### Run Unit Tests with [Vitest](https://vitest.dev/)

```sh
npm run test:unit
```

### Run End-to-End Tests with [Cypress](https://www.cypress.io/)

```sh
npm run test:e2e:dev
```

This runs the end-to-end tests against the Vite development server.
It is much faster than the production build.

But it's still recommended to test the production build with `test:e2e` before deploying (e.g. in CI environments):

```sh
npm run build
npm run test:e2e
```

### Lint with [ESLint](https://eslint.org/)

```sh
npm run lint
```
