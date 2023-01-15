import { publishIPNSEntry } from '../../service/ipns';

export default defineEventHandler(async (event) => {
  const revision = await publishIPNSEntry('/ipfs/bafkreiem4twkqzsq2aj4shbycd4yvoj2cx72vezicletlhi7dijjciqpui');
  return {
    name: revision.name.toString(),
    file: `ipns://${revision.name.toString()}`
  };
});
