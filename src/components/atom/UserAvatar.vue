<template>
  <v-avatar
    :style="{'--color': color}"
    :image="image"
    :size="100"
    class="overflow-visible avatar"
  />
</template>

<script>

export default {
  props: {
    image: {
      type: String,
      required: true
    },
    color: {
      type: String,
      default: undefined
    }
  }
};
</script>

<style scoped>
.avatar {
  --color: red;

  border: 3px solid var(--color);

  @nest & :deep() .v-img {
    transform: translateY(-8.3%) scale(1.17);
  }
}
</style>
