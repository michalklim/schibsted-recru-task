# Shibsted Recru App

Simple app that serves images from
[giphy](https://giphy.com/) and [pixabay](https://pixabay.com/) through
proxy node server that unifies their api response and serves it
to the client app. You can see current version o the app [here](https://suspicious-colden-0f383d.netlify.com/)

## Main stack

- [Typescript](https://www.typescriptlang.org/)

### Client

- React
- styled-components
- react-spring
- Reach router

### Server

- Express.js

### Configuration

- Babel
- Webpack
- Eslint
- Prettier
- Commitlint

## Server

It is fairly standard express server with one exception. Express app is
additionally wrapped and exported with serverless hoc so it can be hosted
using lambda functions

## Client

## Contributing

To run project in development mode you have to start both server and client app.

Note that you will need `.env` file in the root of the project. Please use `.env.example` for reference

Install all dependencies

```shell script
yarn
```

To start server app run:

```shell script
yarn dev:server
```

App should now be available on [http://localhost:3000](http://localhost:3000)

To start client run:

```shell script
yarn dev:client
```

App should now be available on [http://localhost:8080](http://localhost:8080)

To create server bundle run

```shell script
yarn build:server
```

To create client bundle:

```shell script
yarn build:client
```

Those commands will create `client` and `server` directory in `dist` directory.
Both of those are used by `prepare-deploy` which runs during CD after successful merge to `master` branch

Please note that both `build` commands run eslint and typescript check before actual bundling and
will fail if any of those checks produces and error

## Additional configurations

- All packages will be installed with fixed version either using `npm` or `yarn`
- All commits are linted using [conventional commits spec](https://www.conventionalcommits.org/en/v1.0.0/). See `commitlint.config.js`
  for the configuration
- A lot of webpack configurations are shared across project. See `webpack.base.js` for base configuration.
  All others configuration are extending this one by using [webpack-merge](https://www.npmjs.com/package/webpack-merge)
- [Prettier](https://prettier.io/) will run on every commit to ensure that properly formatted code ends up in repo on every stage.
- If you don't have proper `.env` file you will get an error during webpack compilation. See `.env.example` for reference

## What could be done better (given bit more time 😉)

- Tests (my biggest pain here 🤕😭). I would use [Jest](https://jestjs.io/) for server and client app and
  [@testing-library](https://testing-library.com/) for client
- Absolute imports in server app. Right now [ts-node-dev](https://www.npmjs.com/package/ts-node-dev) is used
  to watch and recompile server app on change. I run into some issues when trying
  to make it work together with [tsconfig-paths](https://www.npmjs.com/package/tsconfig-paths)
- Splitting app into smaller chunks. Right now it is one big bundle. I planned to use
  `Suspense` together with `React.lazy` to optimize perf and user experience
- Optimizing images loading. Only one size of the images is used now. I would use smaller
  versions of images on mobile breakpoints and use `webp` format with fallback. Also it would be nice to load static versions at the beginning
  and then asynchronously load gifs
- Some tweaks to the animations, especially search introduction one
  (second run gets you to search section but it doesn't animate)
- Unfortunately I left couple of `eslint-disable` comments. All of those are
  due `plugin:react-hooks/recommended` configuration which I find useful in a lot of cases but on the other
  hand I have bit trouble to achieve same logic in without much boilerplate other way around.
  I have to give it more thought especially reading [this](https://github.com/facebook/react/issues/14920#issuecomment-471070149)
- A lot of smaller tweaks in the UI 😉
