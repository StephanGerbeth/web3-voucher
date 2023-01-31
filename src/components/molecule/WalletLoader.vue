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
        await this.$authorize(this.$route.query.cred);
        // this.user = Promise.resolve(client.user);
      } catch(e) {
        console.log('AUTH ERROR',e);
      }
    }
  }
};
</script>
