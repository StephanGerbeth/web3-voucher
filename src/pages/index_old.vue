<template>
  hello
</template>

<script>
// import {generateWallet, resolveWallet, resolveAccountBalance, mintNFT} from '@/services/tatum/algorand';
import User from '~~/src/classes/_User';
import { getNFTContractAddress, mintNFT, transferNFT, redeemNFT, addNFTMinterToContract } from '@/services/tatum/celo';
import {storeFile} from '@/services/tatum'

export default {
  async mounted() {
    // 'deputy twist eye buzz essence sibling laundry clog toilet until main ozone category ethics tent spawn pelican great occur ball timber safe vehicle coast'
    // const userA = new User('such main tip basic sample shift face innocent buzz roast there garlic wall winter hen morning door record scene slice always right hurdle loud');
    const userA = new User('fuel dwarf together later stone unique craft promote also simple topic chicken damage jewel obtain reunion way exact beauty tired label gas orange enable');
    const userB = new User();
    console.log('USER A', await userA.wallet)
    console.log('USER B', await userB.wallet)
    console.log('USER A BALANCE', await userA.getAccountBalance());
    console.log('USER B BALANCE', await userB.getAccountBalance());
    console.log('USER A NFT BALANCE', await userA.getNFTBalance());
    console.log('USER B NFT BALANCE', await userB.getNFTBalance());

    const {ipfsHash} = await (await storeFile()).json();
    console.log(ipfsHash);

    // const contract = await userA.deployContract();
    // console.log(contract);

    // // const contractTxId = '0x3d5df7e646d7d0d547d1cb5e0e045141c8cfb0c1135dcbc28d5dede63fdc1c50';
    // const contractTxId = contract.txId;

    // setTimeout(async () => {
    //   const {contractAddress} = await getNFTContractAddress(contractTxId)
    //   console.log(contractAddress);

    //   const gaspumpAddresses = await new Promise((resolve) => {
    //     setTimeout(async () => {
    //       resolve(userA.getPrecalculateGasPumpAdresses(contractAddress))
    //     }, 5000)
    //   });
    //   console.log('USER A GAS PUMP', gaspumpAddresses);

    //   // const result = await addNFTMinterToContract(contractAddress, await userA.wallet);
    //   // console.log(result);

    //   const tokenId = Date.now().toString();
    //   const nftTxId = await mintNFT(contractAddress, await userA.wallet, await userA.wallet, tokenId, `ipfs://${ipfsHash}`)
    //   console.log(nftTxId);

    //   setTimeout(async () => {
    //     const transfer = await transferNFT(contractAddress, await userA.wallet, await userB.wallet, tokenId, gaspumpAddresses[0])
    //     console.log(transfer);

    //     setTimeout(async () => {
    //       console.log('USER B NFT BALANCE', await userB.getNFTBalance());
    //       console.log(contractAddress);
    //       const redeem = await redeemNFT(contractAddress, await userB.wallet, await userA.wallet, tokenId, gaspumpAddresses[0]);
    //       console.log(redeem);
    //     }, 10000)

    //   }, 10000)
    // }, 5000)
  }
}
</script>
