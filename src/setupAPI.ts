import buildApiClient, { buildClientConfig, authorizeHandler, requestTokenHandler } from 'mural-integrations-mural-client'

// --- Configuration ---

const AUTH_SERVER = process.env.REACT_APP_AUTH_SERVER;

export const tokenHandlerConfig = {
  authorizeUri: AUTH_SERVER+'/auth',
  requestTokenUri: AUTH_SERVER+'/auth/token',
  refreshTokenUri: AUTH_SERVER+'/auth/refresh',
}

export const authorize = authorizeHandler(tokenHandlerConfig)
export const requestToken = requestTokenHandler(tokenHandlerConfig)
export const clientConfig = buildClientConfig(
    process.env.REACT_APP_API_URL || 'https://app.mural.co',
    tokenHandlerConfig
)

// --- MURAL API client ---
export const apiClient = buildApiClient(clientConfig)


export default async function startAuth(){
  const params = new URLSearchParams(window.location.search)

  if (params.has("code")) {
    const code = params.get("code") || "";
    const state = params.get("state") || "";
    await requestToken(
        code, state, {store: true}
    );

    // once we have authenticated, go ahead and clear the URL.
    window.history.pushState(null, '', '/');

    return true;

  } else {
    const authorizeUrl = await authorize(undefined, {store: true})
    window.location.replace(authorizeUrl)
    return false;
  }
}
