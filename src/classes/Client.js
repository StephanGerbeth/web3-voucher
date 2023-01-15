import { resolveCredentials, resolvePublicAddress, resolvePrivateKey } from '@/services/requests';
import { forkJoin, lastValueFrom, map, of, switchMap } from 'rxjs';
import { createUser } from '@/classes/User';

export default class Client {
  constructor(wallet, user) {
    this.wallet = wallet;
    this.user = user;
  }
}

export const createClient = async (credentials) => {
  const wallet = await getWallet(credentials.mnemonic);
  const user = await createUser(wallet.xpub);
  return new Client(wallet, user);
};

const getWallet = (mnemonic) => {
  return lastValueFrom(resolveCredentials(mnemonic).pipe(
    switchMap(({ xpub, mnemonic }) =>
      forkJoin([
        of({ xpub, mnemonic }),
        resolvePublicAddress(xpub),
        resolvePrivateKey(mnemonic)
      ]).pipe(
        map(([ wallet, publicAddress, privateKey ]) => ({
          ...wallet,
          ...publicAddress,
          ...privateKey
        }))
      )
    )
  ));
};
