import VueGoogleMaps from 'vue-google-maps-community-fork';

export default defineNuxtPlugin(nuxtApp => {
  nuxtApp.vueApp.use(VueGoogleMaps, {
    load: {
      key: nuxtApp.$config.app.google.maps.key,
      libraries: 'places',
      // language: 'de',
    },
  });
});
