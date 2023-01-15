import { Ed25519Provider } from 'key-did-provider-ed25519';
import KeyResolver from 'key-did-resolver';
import Identities from 'orbit-db-identity-provider';
import { stringToBuffer } from './buffer';
console.log(Identities.DIDIdentityProvider);
Identities.DIDIdentityProvider.setDIDResolver(KeyResolver.getResolver());

export const getIdentity = async (seed) => {
  const didProvider = new Ed25519Provider(stringToBuffer(seed));
  return Identities.createIdentity({ type: 'DID', didProvider });

};
