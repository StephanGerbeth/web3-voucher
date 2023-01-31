<template>
  <div>
    <button @click="onRegister">
      Register
    </button>
    <button @click="onLogin">
      Login
    </button>
  </div>
</template>

<script>
import * as webAuthn from '@/observables/webAuth';
import { getRandomClientAvatar, getRandomClientName, getRandomColor } from '@/utils/random';
import Client from '@/classes/Client';

export default {
  props: {
    client: {
      type: Client,
      default() { return null; }
    },

    seed: {
      type: String,
      default() {
        return '';
      }
    }
  },

  computed: {
    image() {
      return getRandomClientAvatar(this.seed);
    },

    name() {
      return getRandomClientName(this.seed);
    },

    color() {
      return getRandomColor({ seed: this.seed, luminosity: 'dark' });
    }
  },

  methods: {
    async onRegister() {
      console.log('REGISTER', this.image, this.seed);
      const secret = 'choose lunar client oblige tribe lesson bamboo evoke shadow wheel domain panic survey armor history grow recall imitate begin plate dice carbon egg belt';
      try {
        const { id } = await webAuthn.register(secret, this.name, this.image);
        this.$router.replace({ query: { ...this.$route.query, cred: id } }, () => { /* empty */ });
      } catch(e) {
        console.log('REGISTER ERROR', e);
      }
    },

    async onLogin() {
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

<style>

</style>
