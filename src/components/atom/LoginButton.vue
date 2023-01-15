<template>
  <v-btn @click="onClick">
    Login
  </v-btn>
</template>

<script>
import * as webAuthn from '@/observables/webAuth';

export default {
  methods: {
    async onClick() {
      try {
        const result = await webAuthn.auth(this.$route.query.cred);
        console.log('LOGIN', result);
      } catch(e) {
        console.log('AUTH ERROR',e);
      }
    }
  }
};
</script>
