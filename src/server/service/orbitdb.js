import OrbitDB from 'orbit-db';
import { ipfs } from './ipfs';
import Identities from 'orbit-db-identity-provider';

const dbList = new Map();

export const orbitDB = new Promise(async (resolve) => {
  // TODO: proof - is static identity needed
  const options = { id: 'local-id' };
  const identity = await Identities.createIdentity(options);
  resolve(OrbitDB.createInstance(await ipfs, { identity: identity }));
});

export const resolveDB = async (name, options = { type: 'keyvalue' }) => {
  const db = await (await orbitDB).open(name, {
    localOnly: true,
    create: true,
    overwrite: false,
    replicate: true,
    accessController: {
      write: [ (await orbitDB).identity.id ],
    },
    ...options
  });
  await db.load();
  return db;
};

export const getDB = async (name, options) => {
  if(!dbList.has(name)) {
    dbList.set(name, resolveDB(name, options));
  }
  return dbList.get(name);
};
