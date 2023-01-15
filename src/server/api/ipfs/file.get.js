import { getDB } from '../../service/orbitdb';

export default defineEventHandler(async (event) => {
  const { cid } = getQuery(event);
  const db = await getDB('assets.voucher', { type: 'docstore', indexBy: 'cid' });
  return db.get(cid);
});
