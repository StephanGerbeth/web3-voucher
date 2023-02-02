<template>
  <v-form @submit.prevent>
    <InputGoogleMapsAutocomplete v-model="place" />
    <InputDatePicker v-model="date" />

    <v-text-field
      v-model="aircraft"
      label="Aircraft"
      :prepend-inner-icon="$vuetify.icons.aliases.airplaneSearch"
    />

    <v-btn
      block
      type="submit"
      color="green"
      :prepend-icon="$vuetify.icons.aliases.check"
    >
      Checkin Teammates
    </v-btn>
  </v-form>
</template>

<script>

import InputGoogleMapsAutocomplete from '@/components/atom/input/GoogleMapsAutocomplete.vue';
import InputDatePicker from '@/components/atom/input/DatePicker.vue';

export default {
  components: {
    InputGoogleMapsAutocomplete,
    InputDatePicker
  },

  data() {
    return {
      place: {},
      date: new Date(),
      aircraft: ''
    };
  },

  watch: {
    place: {
      handler(e) {
        console.log(e);
      }
    },

    date: {
      handler(e) {
        console.log(e);
      }
    }
  }
};
</script>
