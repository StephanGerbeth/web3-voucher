import { resolveIPNSEntry } from '../service/ipns';

export default defineEventHandler(async (event) => {
  const { key } = getQuery(event);
  const { value } = await resolveIPNSEntry(key);
  return { value };
});
