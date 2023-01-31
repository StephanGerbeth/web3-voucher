import { createVuetify } from 'vuetify';
import { mdi } from 'vuetify/iconsets/mdi-svg';
import { mdiAutorenew, mdiCheck, mdiMultimedia, mdiCamera } from '@mdi/js';

export default defineNuxtPlugin(nuxtApp => {
  const vuetify = createVuetify({
    theme: {
      defaultTheme: 'light',
    },
    icons: {
      defaultSet: 'mdi',
      aliases: {
        renew: mdiAutorenew,
        check: mdiCheck,
        assets: mdiMultimedia,
        camera: mdiCamera
      },
      sets: {
        mdi,
      },
    }
  });

  nuxtApp.vueApp.use(vuetify);
});
