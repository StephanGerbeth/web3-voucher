<template>
  <input
    type="file"
    @change="handleFileChange"
  >
</template>

<script>
export default {
  props: {
    maxSize: {
      type: Number,
      default: 5,
    },
    accept: {
      type: String,
      default: 'image/*',
    },
  },

  emits: [ 'update:modelValue' ],

  methods: {
    handleFileChange(e) {
      // TODO: Proof correct file specs (size, type, ...)
      if (e.target.files) {
        this.$emit('update:modelValue', e.target.files);
      }
    },
  },
};
</script>
