<template>
  <form
    @reset.prevent="refresh"
    @submit.prevent="register"
  >
    <Suspense :key="Date.now()">
      <UserProfile :user="user">
        <template #reset>
          <v-btn
            :icon="$vuetify.icons.aliases.renew"
            type="reset"
          />
        </template>
      </UserProfile>
      <template #fallback>
        <LoadingSpinner />
      </template>
    </Suspense>

    <v-btn
      :icon="$vuetify.icons.aliases.check"
      type="submit"
    />
  </form>
</template>

<script>
import { reactive } from 'vue';
import Client, { createClient } from '@/classes/Client';
import { createUser } from '@/classes/User';

import UserProfile from '@/components/atom/UserProfile.vue';
import LoadingSpinner from '@/components/atom/placeholder/LoadingSpinner.vue';
import { getCredentials } from '@/services/requests';

export default {
  components: {
    UserProfile,
    LoadingSpinner
  },

  props: {
    modelValue: {
      type: Client,
      default() { return null; }
    }
  },

  emits: [ 'update:modelValue' ],

  async setup() {
    const credentials = await getCredentials();
    return reactive({
      credentials,
      user: new Promise(async (resolve) => {
        setTimeout(async () => {
          resolve(createUser(credentials.xpub));
        }, 2000);
      })
    });
  },

  mounted() {
    createUser();
  },

  methods: {
    async refresh() {
      this.user = new Promise(async (resolve) => {
        // setTimeout(async () => {
        this.credentials = await getCredentials();
        resolve(createUser(this.credentials.xpub));
        // }, 2000);
      });
    },

    async register() {
      const client = await createClient(this.credentials);
      try {
        console.log(client.user);
        await this.$register(client);
      } catch(e) {
        console.log('REGISTER ERROR', e);
      }
      // this.$emit('update:modelValue', client);
    }
  }
};
</script>

<style scoped>

</style>
