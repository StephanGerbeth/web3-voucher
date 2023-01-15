
import { joinURL } from 'ufo';
import {
  resolveAccountBalance as resolveAccountBalanceDefault,
  deployNFTContract as deployNFTContractDefault,
  addNFTMinterToContract as addNFTMinterToContractDefault,
  mintNFT as mintNFTDefault,
  transferNFT as transferNFTDefault,
  transferNFTByGasPump as transferNFTByGasPumpDefault,
  resolveAccountNFTBalance as resolveAccountNFTBalanceDefault,
  precalculateGasPumpAdresses as precalculateGasPumpAdressesDefault,
  activateGasPumpAdresses,
  fetchRequest
} from '../tatum';

const chain = 'celo';
const index = 0;

export const generateWallet = async (mnemonic) => {
  const wallet = await resolveWallet(mnemonic);
  const [ address, key ] = await Promise.all([
    getAddress(wallet),
    getPrivateKey(wallet)
  ]);
  return { ...wallet, ...address, ...key };
};

export const resolveAccountBalance = (wallet) => {
  return resolveAccountBalanceDefault(chain, wallet.address);
};

export const resolveAccountNFTBalance = (from) => {
  return resolveAccountNFTBalanceDefault(chain.toUpperCase(), from.address);
};

export const precalculateGasPumpAdresses = async (contract, from, indexFrom = 35, indexTo = indexFrom) => {
  const addresses = await precalculateGasPumpAdressesDefault({
    chain: chain.toUpperCase(),
    owner: from.address,
    from: indexFrom,
    to: indexTo
  });

  return (await Promise.all(addresses.map(async (address, index) => {
    const { activated } = await fetchRequest(joinURL('/gas-pump/activated', chain.toUpperCase(), from.address, String(indexFrom + index)));
    if(activated) {
      return { address, index: indexFrom + index };
    } else {
      console.log(from);
      const { txId } = await activateGasPumpAdresses({
        chain: chain.toUpperCase(),
        owner: from.address,
        from: indexFrom + index,
        to: indexFrom + index,
        // feesCovered: true,
        fromPrivateKey: from.key,
        feeCurrency: chain.toUpperCase()
      });

      return new Promise((resolve) => {
        setTimeout(async () => {
          const { valid } = await fetchRequest(joinURL('/gas-pump/address', chain.toUpperCase(), txId));
          resolve(valid);
        }, 5000);
      });
    }
  }))).flat();
};

export const deployNFTContract = (wallet, name) => {
  return deployNFTContractDefault({
    chain: 'CELO',
    name,
    symbol: 'ERC_SYMBOL',
    fromPrivateKey: wallet.key,
    feeCurrency: 'CELO',
    publicMint: true,
    provenance: true,
  });
};

export const getNFTContractAddress = (txId) => {
  return fetchRequest(joinURL('/blockchain/sc/address', chain.toUpperCase(), txId));
};

export const addNFTMinterToContract = (contractAddress, from) => {
  return addNFTMinterToContractDefault({
    chain: 'CELO',
    contractAddress,
    minter: contractAddress,
    fromPrivateKey: from.key,
    feeCurrency: 'CELO'
  });
};

export const mintNFT = (contract, from, to, tokenId, url) => {
  return mintNFTDefault({
    chain: 'CELO',
    tokenId,
    to: to.address,
    // erc20: to.address,
    contractAddress: contract,
    url,
    authorAddresses: [ from.address ],
    provenance: true,
    cashbackValues: [ '0' ],
    fixedValues: [ '0' ],
    fromPrivateKey: from.key,
    // nonce: 0,
    feeCurrency: 'CELO'
  });
};

export const transferNFT = async (contract, from, to, tokenId) => {
  return transferNFTDefault({
    chain: 'CELO',
    tokenId,
    to: to.address,
    contractAddress: contract,
    fromPrivateKey: from.key,
    provenance: true,
    provenanceData: 'Test',
    tokenPrice: '0',
    feeCurrency: 'CELO'
  });
};

export const redeemNFT = (contract, from, to, tokenId, gasPump) => {
  console.log('AHA',contract);
  return transferNFTByGasPumpDefault({
    chain: chain.toUpperCase(),
    custodialAddress: gasPump.address,
    recipient: to.address,
    contractType: 1,
    tokenAddress: contract, //'0xfcba4454532a7131b331819b1e2061378fd2bd91',
    tokenId: tokenId, //'1672492446499',
    fromPrivateKey: to.key,
    feeCurrency: 'CELO'
  });
};

const resolveWallet = async (mnemonic) => {
  if(mnemonic) {
    console.log('TEST', mnemonic);
    return fetchRequest(joinURL(chain, 'wallet', `?mnemonic=${mnemonic}`));
  } else {
    return fetchRequest(joinURL(chain, 'wallet'));
  }
};

const getAddress = (wallet) => {
  return fetchRequest(joinURL(chain, 'address', wallet.xpub, String(index)));
};

const getPrivateKey = async ({ mnemonic }) => {
  return fetchRequest(joinURL(chain, '/wallet/priv'), {
    method: 'POST',
    body: JSON.stringify({
      index: index,
      mnemonic
    })
  });
};
