<template>
  <NuxtPage />
</template>

<script>
export default {
  setup() {
    definePageMeta({
      auth: true,
      layout: 'admin'
    });
  }
};
</script>
