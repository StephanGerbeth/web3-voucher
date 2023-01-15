<template>
  <form @submit.prevent="onClick">
    <Suspense
      v-if="user"
      :key="Date.now()"
    >
      <UserProfile :user="user" />
      <template #fallback>
        <LoadingSpinner />
      </template>
    </Suspense>

    <v-btn
      v-else
      type="submit"
    >
      Login
    </v-btn>
  </form>
</template>

<script>
import * as webAuthn from '@/observables/webAuth';
import { createClient } from '@/classes/Client';
import UserProfile from '@/components/atom/UserProfile.vue';
import LoadingSpinner from '@/components/atom/placeholder/LoadingSpinner.vue';

export default {
  components: {
    UserProfile,
    LoadingSpinner
  },
  data() {
    return {
      user: null
    };
  },

  methods: {
    async onClick() {
      try {
        const mnemonic = await webAuthn.auth(this.$route.query.cred);
        console.log('LOGIN', mnemonic);
        const client = await createClient({ mnemonic });
        this.user = Promise.resolve(client.user);
      } catch(e) {
        console.log('AUTH ERROR',e);
      }
    }
  }
};
</script>
