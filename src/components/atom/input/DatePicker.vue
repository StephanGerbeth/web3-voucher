<template>
  <DatePicker
    class="date-picker"
    :value="modelValue"
    :lang="langObject"
    :append-to-body="false"
    @update:value="onUpdate"
  >
    <template #input>
      <v-text-field
        v-model="value"
        label="Date"
        :prepend-inner-icon="$vuetify.icons.aliases.airplaneTakeoff"
      />
    </template>
  </DatePicker>
</template>

<script>
import DatePicker from 'vue-datepicker-next';
import 'vue-datepicker-next/index.css';

export default {
  components: {
    DatePicker
  },

  props: {
    modelValue: {
      type: Date,
      required: true
    }
  },

  emits: [ 'update:modelValue' ],

  data() {
    return {
      value: this.getFormattedDate(this.modelValue),
      langObject: {
        formatLocale: {
          weekStartsOn: 1,
          // https://en.wikipedia.org/wiki/ISO_week_date#First_week
          firstWeekContainsDate: 4
        },
        monthBeforeYear: false,
      },
    };
  },

  methods: {
    onUpdate(e) {
      this.value = this.getFormattedDate(e);
      this.$emit('update:modelValue', e);
    },

    getFormattedDate(date) {
      return new Intl.DateTimeFormat().format(date);
    }
  }
};
</script>

<style scoped>
.date-picker {
  width: 100%;
}
</style>
