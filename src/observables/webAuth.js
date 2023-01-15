import { from, lastValueFrom, map } from 'rxjs';
import * as bip39 from '@scure/bip39';
import { wordlist } from '@scure/bip39/wordlists/english';
import { validateWebAuth } from '@/operators/webAuthValidator';
import { stringToBase64Buffer } from '@/utils/buffer';

export const register = (mnemonic, name, icon) => {
  const options = createCredentialCreationOptions({ id: resolveSeed(mnemonic), name, displayName: name, icon });
  return lastValueFrom(from(navigator.credentials.create({ publicKey: options })).pipe(
    validateWebAuth('webauthn.create', options)
  ));
};

export const auth = (id) => {
  const options = createCredentialRequestOptions(id);
  console.log('OPTIONS', options);
  return lastValueFrom(from(navigator.credentials.get({ publicKey: options })).pipe(
    validateWebAuth('webauthn.get', options),
    map((credentials) => {
      return bip39.entropyToMnemonic(new Uint8Array(credentials.response.userHandle), wordlist);
    })
  ));
};

const resolveSeed = (mnemonic) => {
  return bip39.mnemonicToEntropy(mnemonic, wordlist);
};

const createCredentialCreationOptions = (user) => {
  return {
    challenge: generateChallenge(),
    rp: { name: 'Example Company Toll', id: window.location.hostname },
    user,
    pubKeyCredParams: [ { alg: -7, type: 'public-key' }, { alg: -257, type: 'public-key' } ],
    authenticatorSelection: { authenticatorAttachment: 'platform', userVerification: 'preferred' },
    timeout: 60000,
    attestation: 'none'
  };
};

const createCredentialRequestOptions = (id) => {
  return {
    challenge: generateChallenge(),
    allowCredentials: [ { id: stringToBase64Buffer(id), type: 'public-key' } ],
    userVerification: 'preferred',
    timeout: 60000
  };
};

const generateChallenge = () => {
  return window.crypto.getRandomValues(new Uint8Array(256));
};
