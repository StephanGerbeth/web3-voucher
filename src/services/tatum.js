import { joinURL } from 'ufo';

export const generateWallet = (chain) => {
  return fetchRequest(joinURL(chain, 'wallet'));
};

export const resolveWallet = (chain, key) => {
  return fetchRequest(joinURL(chain, 'address', key));
};

export const resolveAccountBalance = (chain, address) => {
  return fetchRequest(joinURL(chain, 'account/balance', address));
};

export const resolveAccountNFTBalance = (chain, address) => {
  return fetchRequest(joinURL('/nft/address/balance', chain, address));
};

export const precalculateGasPumpAdresses = (data) => {
  return fetchRequest('/gas-pump', {
    method: 'POST',
    body: JSON.stringify(data)
  });
};

export const activateGasPumpAdresses = (data) => {
  return fetchRequest('/gas-pump/activate', {
    method: 'POST',
    body: JSON.stringify(data)
  });
};

export const mintNFT = (data) => {
  return fetchRequest('/nft/mint', {
    method: 'POST',
    body: JSON.stringify(data)
  });
};

export const transferNFT = (data) => {
  return fetchRequest('/nft/transaction', {
    method: 'POST',
    body: JSON.stringify(data)
  });
};

export const transferNFTByGasPump = (data) => {
  return fetchRequest('/blockchain/sc/custodial/transfer', {
    method: 'POST',
    body: JSON.stringify(data)
  });
};

export const deployNFTContract = (data) => {
  return fetchRequest('/nft/deploy', {
    method: 'POST',
    body: JSON.stringify(data)
  });
};

export const addNFTMinterToContract = (data) => {
  return fetchRequest('/nft/mint/add', {
    method: 'POST',
    body: JSON.stringify(data)
  });
};

export const fetchRequest = async (url, options) => {
  const response = await fetch(createRequest(joinURL(getBaseUrl(), url), options));
  return response.json();
};

export const fetchNFTRequest = async (url, options) => {
  const response = await fetch(createRequest(joinURL(getBaseUrl(), url), options));
  return response.json();
};

export const storeFile = async () => {
  // https://forum.openzeppelin.com/t/cannot-estimate-gas-transaction-may-fail-or-may-require-manual-gas-limit/9541/5
  var data = new FormData();
  data.append('file', new Blob([ JSON.stringify({ name: 'ABC123', description: 'hello world voila', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/ec/Blume_mit_Schmetterling_und_Biene_1uf.JPG/1024px-Blume_mit_Schmetterling_und_Biene_1uf.JPG?test1' }) ], { type: 'application/json' }));
  return fetch(createRequest(joinURL(getBaseUrl(), '/ipfs'), {
    method: 'POST',
    body: data
  }, {}));
};

const createRequest = (url, options, header) => {
  return new Request(url, createRequestOptions(options, header));
};

const createRequestOptions = (options = {}, header = { 'Content-Type': 'application/json' }) => {
  return Object.assign({
    headers: {
      ...header,
      'x-api-key': getKey()
    },
    method: 'GET'
  }, options);
};

const getKey = () => {
  const runtimeConfig = useRuntimeConfig();
  return runtimeConfig.app.tatum.config[runtimeConfig.app.tatum.net].key;
};

const getBaseUrl = () => {
  const runtimeConfig = useRuntimeConfig();
  return runtimeConfig.app.tatum.config[runtimeConfig.app.tatum.net].baseUrl;
};
