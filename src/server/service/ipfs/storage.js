import { Web3Storage, getFilesFromPath } from 'web3.storage';

let storage = null;

export const publishFile = async (file) => {
  return getStorage().put(await getFilesFromPath(file.filepath));
};

const getStorage = () => {
  if(!storage) {
    const runtimeConfig = useRuntimeConfig();
    storage = new Web3Storage({ token: runtimeConfig.web3.storage.token });
  }
  return storage;
};
