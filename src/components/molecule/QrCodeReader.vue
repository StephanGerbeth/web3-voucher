<template>
  <div>
    <div class="video-container">
      <video
        :srcObject.prop="stream"
        autoplay
        @playing="onPlaying"
      />
      <HitIndicator
        class="detection-indicator"
        :dimension="dimension"
        :hits="hits"
      />
    </div>

    <button @click="requestCameraAccess">
      Camera
    </button>
  </div>
</template>

<script>
import { interval, Subscription } from 'rxjs';
import { takeWhile, concatMap } from 'rxjs/operators';
import { getCameraStreamObservable } from '@/utils/camera';
import { idle } from '@/observables/tools/requestIdleCallback';
import { loadQrCodeDetector } from '@/operators/qrCodeDetector';
import HitIndicator from './qrCodeReader/HitIndicator.vue';

export default {
  components: {
    HitIndicator
  },

  data() {
    return {
      subscriptions: new Subscription(),
      stream: null,
      dimension: { x: 0, y: 0 },
      hits: [],
    };
  },

  unmounted() {
    this.subscriptions.unsubscribe();
  },

  methods: {
    async requestCameraAccess() {
      const observable = await getCameraStreamObservable();
      this.subscriptions.add(observable.subscribe(async ({ stream }) => {
        this.stream = stream;
      }));
    },

    async onPlaying({ currentTarget }) {
      this.dimension = { x: currentTarget.videoWidth, y: currentTarget.videoHeight };
      const detect = await loadQrCodeDetector();
      this.subscriptions.add(interval(1000/10).pipe(
        // TODO: resize cam image

        concatMap(() => idle().pipe(detect(currentTarget))),
        takeWhile(() => this.stream),
      ).subscribe((hits) => {
        this.hits = hits;
      }));
    }
  }
};
</script>

<style scoped>
.video-container {
  position: relative;
  display: flex;
  width: max-content;
}

.detection-indicator {
  position: absolute;
  top: 0;
  width: 100%;
  height: 100%;
}
</style>
