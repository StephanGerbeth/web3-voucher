import * as IPFS from 'ipfs';
import { publishFile } from './ipfs/storage';

// export const ipfs = IPFS.create();
export const ipfs = IPFS.create({ repo: 'ipfs_repos/ok' + Math.random() });

export const publishIPFSFile = async (file) => {
  const { originalFilename, size } = file;
  const cid = await publishFile(file);
  return {
    url: {
      default: `https://dweb.link/ipfs/${cid}`,
      origin: `https://ipfs.io/ipfs/${cid}`
    },
    cid,
    originalFilename,
    size
  };
};

