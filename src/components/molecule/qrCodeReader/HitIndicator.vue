<template>
  <canvas
    :width="dimension.x"
    :height="dimension.y"
  />
</template>

<script>
import { getAnimationFramesObservable } from '@/observables/tools/animationFrame';

export default {
  props: {
    dimension: {
      type: Object,
      required: true
    },

    hits: {
      type: Array,
      default() {
        return [];
      }
    }
  },

  mounted() {
    this.update();
  },

  methods: {
    update() {
      const ctx = this.$el.getContext('2d');
      getAnimationFramesObservable().pipe().subscribe(() => {
        ctx.clearRect(0, 0, this.dimension.x, this.dimension.y);
        ctx.lineWidth = 3;

        this.hits.forEach((hit) => {
          const start = hit.cornerPoints[hit.cornerPoints.length-1];
          ctx.beginPath();
          ctx.moveTo(start.x, start.y);
          hit.cornerPoints.forEach((point) => ctx.lineTo(point.x, point.y));
          ctx.strokeStyle = 'lime';
          ctx.stroke();
        });
      });
    }
  }
};
</script>

<style>

</style>
