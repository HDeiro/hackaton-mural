# HTTI

Welcome to the translation app for MURAL sticky notes!



## Setup

> You **need** to have an account on Google Cloud Platform (GCP) in order to have things working in what regards translation. Please, see [this video](https://www.youtube.com/watch?v=Sjl9ilOpHG8), it will help you to define what we need in order to get your GCP Credentials.

#### Setup your environment:

1. Create a `.env.local` file as a copy of `.env`;
2. Set your GCP Credentials over the attribute `REACT_APP_GCP_CREDENTIALS`
3. Install dependencies executing:

    ```shell
    npm install
    ```

After that you're good to go!

## Applications

This application is split into 2 parts:

 - an OAuth Server for authenticating
 - a `create-react-app` application

### OAuth Server

the OAuth server can be started by running the following command:

```shell
npm run start:server
```

This will kick off the oauth server on port `5000` and allow you to do authentication calls.

The default scopes requested by the application are:

 - murals:read
 - murals:write
 - rooms:read
 - workspaces:read
 - identity:read

However, all scopes can be used by this sample app:

The settings for this server are stored in the [config/defaults.json](./config/defaults.json) file, and can be
overridden by creating a `config/local.json` file that follows the same structure.

The oauth application itself runs from the [server.ts](./server.ts) file.

### React App

The React app was made using [create-react-app](https://create-react-app.dev/docs/documentation-intro) and can be
started by running the following command:

```shell
npm run start:client
```

This will begin running the client application on port `4000` which is set in the [.env](./.env) file.

Remember, these settings can be overridden with a  `.env.local` file.

The [entry point](https://webpack.js.org/concepts/#entry) for this application is [src/index.tsx](./src/index.tsx) and
the main App is in [src/App.tsx](./src/App.tsx)


### `clientConfig.fetchFn()`

By default, this app's functionality is running tests to ensure workspaces and rooms are able to fetch murals.

If you want to change or add to this behavior by making your own calls to the API, you can use the app's built-in
implementation of [fetch](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API), which automatically takes care
of OAuth (by appending your token to each request for you).

To get this working, you must call the following method before you attempt to call any APIs:

```javascript
import startAuth from "./setupAPI.js";

startAuth().then((isAuthorized) => {
  if(isAuthorized){
    ReactDom.render(
        // your <App /> here
    )
  }
})
```

Setting this up will enable you to use the following method to hit MURAL endpoints from anywhere within your app:

```javascript
import {clientConfig} from "./setupAPI.js";

// Very cool app code

clientConfig.fetchFn('https://app.mural.co/api/public/v1')  // endpoint URI goes here
    .then(response=>{
      // Cool code that creatively processes data returned from MURAL API 😎
    })
```

`clientConfig.fetchFn` replicates the interface for the [`fetch` API](https://developer.mozilla.org/en-US/docs/Web/API/WindowOrWorkerGlobalScope/fetch)
The signature for `clientConfig.fetchFn` is identical to that of [`fetch` API](https://developer.mozilla.org/en-US/docs/Web/API/WindowOrWorkerGlobalScope/fetch),
with the additional feature of automatically refreshing the token for you, which means you don't have to implement this
on your own.
