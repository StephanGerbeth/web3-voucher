<template>
  <v-card width="400">
    <v-responsive :aspect-ratio="16 / 4">
      <v-container class="d-flex flex-column fill-height align-center justify-center">
        <UserAvatar
          :image="image"
          :color="color"
        />
        <slot name="reset"></slot>
      </v-container>
    </v-responsive>
    <v-card-item>
      <v-card-title>{{ name }} ({{ age }})</v-card-title>
      <v-card-subtitle>{{ jobTitle }}</v-card-subtitle>
    </v-card-item>
    <v-card-text>
      {{ catchPhrase }}
    </v-card-text>
  </v-card>
</template>

<script>
import UserAvatar from '@/components/atom/UserAvatar.vue';

export default {
  components: {
    UserAvatar
  },

  props: {
    user: {
      type: Promise,
      required: true
    }
  },

  async setup(props) {
    return (await props.user).info;
  },

  computed: {
    age() {
      var diff_ms = Date.now() - new Date(this.birthdate).getTime();
      return Math.abs((new Date(diff_ms)).getUTCFullYear() - 1970);
    }
  }
};
</script>
