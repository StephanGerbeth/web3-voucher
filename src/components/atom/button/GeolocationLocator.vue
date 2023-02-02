<template>
  <v-btn
    :icon="$vuetify.icons.aliases.gps"
    :disabled="disabled"
    :loading="loading"
    size="x-small"
    @click="onClick"
  />
</template>

<script>
import { getCurrentGeolocation } from '@/utils/geolocation';
export default {
  emits: [ 'update:modelValue' ],

  data() {
    return {
      disabled: !navigator.geolocation,
      loading: false
    };
  },

  methods: {
    async onClick() {
      this.loading = true;
      const { position, state } = await getCurrentGeolocation();
      if(state === 'granted') {
        this.loading = false;
        this.$emit('update:modelValue', position);
      } else {
        throw new Error('no access to geolocation sensor');
      }
    }
  }
};
</script>
