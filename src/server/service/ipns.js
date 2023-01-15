import * as Name from 'w3name';
import { getDB } from './orbitdb';
import { base64BufferToString, stringToBase64Buffer } from '@/utils/buffer';

export const publishIPNSEntry = async (value) => {
  const name = await Name.create();
  await writeIdentityToDB(name);
  const revision = await Name.v0(name, value);
  await Name.publish(revision, name.key);
  return revision;
};

export const updateIPNSEntry = async (key, value) => {
  const name = await Name.from(await readIdentityFromDB(key));
  const revision = await Name.resolve(name);
  const updateRevision = await Name.increment(revision, value);
  await Name.publish(updateRevision, name.key);
  return updateRevision;
};

export const resolveIPNSEntry = async (name) => {
  return Name.resolve(Name.parse(name));
};

const writeIdentityToDB = async (name) => {
  const db = await getDB('ipns');
  return db.put(name.toString(), base64BufferToString(name.key.bytes), { pin: true });
};

const readIdentityFromDB = async (key) => {
  const db = await getDB('ipns');
  const identityString = await db.get(key);
  return stringToBase64Buffer(identityString);
};

