<template>
  <v-layout>
    <NavigationBar />
    <v-main>
      <slot />
    </v-main>
  </v-layout>
</template>

<script>
import NavigationBar from '@/components/NavigationBar.vue';

export default {
  components: {
    NavigationBar
  }
};
</script>
