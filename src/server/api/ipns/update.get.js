import { updateIPNSEntry } from '../../service/ipns';

export default defineEventHandler(async (event) => {
  const { key } = getQuery(event);
  const revision = await updateIPNSEntry(key, '/ipfs/bafybeiauyddeo2axgargy56kwxirquxaxso3nobtjtjvoqu552oqciudrm');
  return {
    name: revision.name.toString(),
    file: `ipns://${revision.name.toString()}`
  };
});
