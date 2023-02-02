<template>
  <GMapMap
    ref="myMapRef"
    :center="center"
    :zoom="7"
    class="google-maps"
    map-type-id="terrain"
  >
    <GMapMarker
      v-for="(m, index) in markers"
      :key="index"
      :position="m.position"
    />
  </GMapMap>
  <div class="d-flex">
    <GMapAutocomplete
      :options="options"
      @place_changed="updatePlaceByAutocomplete"
    >
      <template #input="slotProps">
        <v-text-field
          v-bind="slotProps"
          ref="input"
          v-model="place"
          label="Place"
          :prepend-inner-icon="$vuetify.icons.aliases.airplaneMarker"
          @keypress.enter.prevent
        >
          <template #append-inner>
            <GeolocationLocator v-model="position" />
          </template>
        </v-text-field>
      </template>
    </GMapAutocomplete>
  </div>
</template>

<script>
import GeolocationLocator from '@/components/atom/button/GeolocationLocator.vue';

export default {
  components: {
    GeolocationLocator
  },

  props: {
    modelValue: {
      type: Object,
      required: true
    }
  },

  emits: [ 'update:modelValue' ],

  data() {
    return {
      place: '',
      center: { lat: 51.093048, lng: 6.84212 },
      position: null,
      options: {
        types: [ 'airport' ]
      }
    };
  },

  computed: {
    markers() {
      return [
        {
          position: this.center
        }
      ];
    }
  },

  watch: {
    position: {
      async handler({ coords: { latitude, longitude } }) {
        const places = await getPlacesByGeolocation(this.$refs.myMapRef, {
          location: { lat: latitude, lng: longitude },
          radius: '250',
          type: [ 'airport' ]
        });
        this.updatePlaceByGeolocation(places[0]);
      }
    }
  },

  methods: {
    updatePlaceByAutocomplete(e) {
      this.place = this.$refs.input.value;
      this.updatePlace(e);
    },

    updatePlaceByGeolocation(e) {
      this.place = e.name;
      this.updatePlace(e);
    },

    updatePlace(e) {
      this.center = e.geometry.location;
      this.$emit('update:modelValue', e);
    }
  }
};

const getPlacesByGeolocation = async (googleMaps, options) => {
  const map = await googleMaps.$mapPromise;
  const service = new (await googleMaps.$gmapApiPromiseLazy()).maps.places.PlacesService(map);
  return new Promise((resolve) => service.nearbySearch(options, resolve));
};
</script>

<style scoped>
.google-maps {
  width: 100%;
  aspect-ratio: 16/9;
}
</style>

<style>
.pac-container {
  z-index: 999999999;
}
</style>
