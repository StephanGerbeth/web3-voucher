<template>
  hello
  <NuxtLink to="/">
    Index
  </NuxtLink>
  <QrCodeReader />
  <WebAuthn
    :client="client"
    :seed="String(93293829)"
  />
  <ClientOnly>
    <AvatarGenerator v-model="client" />
  </ClientOnly>
</template>

<script>

import QrCodeReader from '@/components/molecule/QrCodeReader.vue';
import WebAuthn from '@/components/molecule/WebAuthn.vue';
import AvatarGenerator from '@/components/molecule/WalletGenerator.vue';

export default {
  components: {
    QrCodeReader,
    WebAuthn,
    AvatarGenerator
  },

  setup() {
    console.log('SETUP PAGE TEST');
  },

  data() {
    return {
      client: null
    };
  },

  watch: {
    client: {
      handler(e) {
        console.log('UIUIUI', e);
      }
    }
  },

  async mounted() {
    // const name = await Name.create();
    // console.log('ipns://' + name.toString());
    // const value = '/ipfs/bafkreiem4twkqzsq2aj4shbycd4yvoj2cx72vezicletlhi7dijjciqpui';
    // const revision = await Name.v0(name, value);
    // await Name.publish(revision, name.key);
    // console.log('REVISION', revision);
    // console.log('OHA', name.key.bytes);

    // const name2 = Name.parse('k51qzi5uqu5djp3b0qvm015e0fogm9w4c8ytsa9mq22cr3t86dlw7pwccyyh8k');
    // console.log(name2);
    // const revision2 = await Name.resolve(name);
    // console.log(revision2);
    // const nextValue = '/ipfs/bafybeiauyddeo2axgargy56kwxirquxaxso3nobtjtjvoqu552oqciudrm';
    // const nextRevision = await Name.increment(revision2, nextValue);
    // await Name.publish(nextRevision, name.key);
    // console.log('NEXT REVISION', nextRevision);

    // console.log('Resolved value:', revision.value);

    // const data = Buffer.from(name.key.bytes).toString('base64');
    // // const string = Buffer.from(name.key.bytes).toString('utf-8')
    // // const string = new TextDecoder().decode(name.key.bytes);
    // console.log(data);
    // let uint8array = new Uint8Array(Buffer.from(data,'base64'));
    // console.log(uint8array, name.key.bytes);

    // const client = await createClient(await createUser('try wine reopen town dad skill lounge shoe address burger enjoy anchor leg raccoon twice eyebrow point flag snow time corn expand champion profit'));
    // const result = client.wallet;
    // console.log('HUCH', result);
    // result.subscribe((e) => {
    //   console.log(e);
    // });

  }
};
</script>
