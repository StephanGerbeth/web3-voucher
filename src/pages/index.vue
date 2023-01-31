<template>
  hello
  <NuxtLink to="/test">
    Test
  </NuxtLink>
  <ClientOnly>
    <WalletGenerator
      v-if="!cred"
      v-model="client"
    />
    <WalletLoader v-else />
  </ClientOnly>
</template>

<script>
import WalletGenerator from '@/components/molecule/WalletGenerator.vue';
import WalletLoader from '@/components/molecule/WalletLoader.vue';

// import { publishIPNSEntry, updateIPNSEntry, resolveIPNSEntry } from '~~/src/server/service/ipns';

export default {
  components: {
    WalletGenerator,
    WalletLoader
  },

  async setup() {
    definePageMeta({ auth: false });
    // const { data, status, getCsrfToken, getProviders } = useSession();

    // const providers = await getProviders();
    // const csrfToken = await getCsrfToken();
    console.log('SETUP PAGE INDEX');
    onBeforeRouteUpdate((to, from) => {
      console.log(to, from);
      const answer = window.confirm(
        'Do you really want to leave? you have unsaved changes!'
      );
      // cancel the navigation and stay on the same page
      if (!answer) return false;
    });
  },

  data() {
    return {
      client: null,
      cred: this.$route.query.cred
    };
  },

  async mounted() {

    // const created = await publishIPNSEntry('/ipfs/bafkreiem4twkqzsq2aj4shbycd4yvoj2cx72vezicletlhi7dijjciqpui');
    // console.log('1', created, created.name.toString());

    // const resultA = await resolveIPNSEntry(created.name.toString());
    // console.log(resultA);

    // const updated = await updateIPNSEntry(created.name.toString(), '/ipfs/bafybeiauyddeo2axgargy56kwxirquxaxso3nobtjtjvoqu552oqciudrm');
    // console.log(2, updated, updated.name.toString());

    // const resultB = await resolveIPNSEntry(updated.name.toString());
    // console.log(resultB);
  }
};
</script>

<style>

</style>
