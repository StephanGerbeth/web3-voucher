import { readFiles } from 'h3-formidable';
import { publishIPFSFile } from '../../../service/ipfs';
import { getDB } from '../../../service/orbitdb';

export default defineEventHandler(async (event) => {
  const files = await readFiles(event);
  // TODO: Proof file specs (type, size, ...)

  return Promise.all(files.attachement.map(async (file) => {
    const data = await publishIPFSFile(file);
    const db = await getDB('assets.voucher', { type: 'docstore', indexBy: 'cid' });
    await db.put(data);
    return data;
  }));
});
