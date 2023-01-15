<template>
  <form @submit.prevent="onSubmit">
    <FileUpload
      v-model="files"
      multiple
    />
    <v-btn type="submit">
      Upload
    </v-btn>
  </form>
</template>

<script>
import FileUpload from '@/components/atom/FileUpload.vue';
import { fetchRequest } from '~~/src/observables/tools/fetch';

export default {
  components: {
    FileUpload
  },

  data() {
    return {
      files: []
    };
  },

  methods: {
    // TODO: create Upload Preview
    async onSubmit() {
      let formData = new FormData();
      Array.from(this.files).forEach((file) => formData.append('attachement', file));

      const result = await fetchRequest(new Request('/api/ipfs/file/upload', {
        method: 'POST',
        body: formData

      }));
      console.log(result);
    }
  }
};
</script>
