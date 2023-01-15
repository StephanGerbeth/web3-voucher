import { fetchRequest } from '@/observables/tools/fetch';
import { lastValueFrom } from 'rxjs';

export const getCredentials = async (mnemonic) => {
  return lastValueFrom(resolveCredentials(mnemonic));
};

export const resolveCredentials = (mnemonic) => {
  const url = new URL('celo/wallet', getBaseUrl());
  if(mnemonic) {
    url.searchParams.append('mnemonic', mnemonic);
  }
  return fetchRequest(createRequest(url));
};

export const resolvePublicAddress = (xpub) => {
  const url = new URL(`celo/address/${xpub}/0`, getBaseUrl());
  return fetchRequest(createRequest(url));
};

export const resolvePrivateKey = (mnemonic) => {
  const url = new URL('celo/wallet/priv', getBaseUrl());
  return fetchRequest(createRequest(url, {
    method: 'POST',
    body: JSON.stringify({ index: 0, mnemonic })
  }));
};

const createRequest = (url, options = {}) => {
  return new Request(new URL(url, getBaseUrl()), createRequestOptions(options));
};

const createRequestOptions = ({ headers, ...options }) => ({
  method: 'GET',
  headers: {
    'Content-Type': 'application/json',
    ...headers,
    'x-api-key': getKey()
  },
  ...options
});

const getKey = () => {
  const runtimeConfig = useRuntimeConfig();
  return runtimeConfig.app.tatum.config[runtimeConfig.app.tatum.net].key;
};

const getBaseUrl = () => {
  const runtimeConfig = useRuntimeConfig();
  return new URL(runtimeConfig.app.tatum.config[runtimeConfig.app.tatum.net].baseUrl);
};
