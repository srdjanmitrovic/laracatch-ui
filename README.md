# Laracatch UI

[Laracatch](https://github.com/laracatch/client) is a customizable error page for applications running on Laravel 5.5 and higher. It allows you to catch both browser and console exceptions, and optionally share them on [Laracatch](https://laracatch.com), or a self-hosted version of the [Laracatch Server](https://github.com/laracatch/server).

This repository contains the code for the UI of both Laracatch [Client](https://github.com/laracatch/client) and [Server](https://github.com/laracatch/server) components, which is provided as a Git submodule.

## Documentation

The UI is powered by [Webpack](https://webpack.js.org/), [VueJS](https://vuejs.org/) and [TailwindCSS](https://tailwindcss.com/).

* Install dependencies

```
npm install
```

* Develop using a local instance of [webpack-dev-server](https://webpack.js.org/configuration/dev-server/) which provides the UI for Laracatch and Navigator, using a predefined Laracatch error (see https://github.com/laracatch/ui/compiled/data.json)

```
npm run start
```

* Compile for production

```
npm run prod
```