<template>
  <NuxtPage />
  <v-btn
    :icon="$vuetify.icons.aliases.add"
    color="success"
    size="x-large"
    class="mt-12 sticky"
    @click="overlay = !overlay"
  />
  <v-overlay
    v-model="overlay"
    contained
    class="align-center justify-center"
  >
    <v-card class="card mx-auto">
      <v-card-text>
        <p class="text-h4 text--primary">
          Your Flight
        </p>
        <div class="text--primary">
          relating to or dependent on charity; charitable.<br>
          "an eleemosynary educational institution."
        </div>
      </v-card-text>
      <FormCreateFlight />
      <v-btn
        :icon="$vuetify.icons.aliases.close"
        class="sticky"
        color="success"
        @click="overlay = false"
      />
    </v-card>
  </v-overlay>
</template>

<script>
import FormCreateFlight from '@/components/molecule/form/CreateFlight.vue';

export default {
  components: {
    FormCreateFlight
  },

  setup() {
    definePageMeta({
      auth: true,
      layout: 'admin'
    });
  },

  data() {
    return {
      overlay: false
    };
  }
};
</script>

<style scoped>
.sticky {
  position: fixed;
  bottom: 2em;
  right: 2em;
}

.card :deep(.sticky) {
    top: -1em;
    right: -1em;
    bottom: unset;
  }

</style>
