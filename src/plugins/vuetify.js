import { createVuetify } from 'vuetify';
import { mdi } from 'vuetify/iconsets/mdi-svg';
import {
  mdiAutorenew,
  mdiCheck,
  mdiMultimedia,
  mdiCamera,
  mdiShapeSquarePlus,
  mdiViewSplitVertical,
  mdiClose,
  mdiMapMarker,
  mdiAirplaneTakeoff,
  mdiAirplaneMarker,
  mdiAirplaneSearch,
  mdiCrosshairsGps
} from '@mdi/js';

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
        camera: mdiCamera,
        add: mdiShapeSquarePlus,
        overview: mdiViewSplitVertical,
        close: mdiClose,
        mapMarker: mdiMapMarker,
        airplaneMarker: mdiAirplaneMarker,
        airplaneTakeoff: mdiAirplaneTakeoff,
        airplaneSearch: mdiAirplaneSearch,
        gps: mdiCrosshairsGps
      },
      sets: {
        mdi,
      },
    }
  });

  nuxtApp.vueApp.use(vuetify);
});
