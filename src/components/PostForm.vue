<template>
  <div class="w-full p-6 m-auto bg-base-200 rounded-md shadow-md mt-6 mb-6">
    <form class="space-y-4">
      <div>
        <input type="text" v-model="formData.title" placeholder="Post title"
          class="w-full input input-bordered input-primary" />
      </div>
      <div>
        <textarea class="textarea textarea-primary w-full text-base" placeholder="Post Text"
          v-model="formData.body"></textarea>
      </div>
      <!-- <pre>{{ JSON.stringify(formData, null, 2) }}</pre> -->
      <div v-if="formData.postImg">
        
        <img v-if="getPostImgURL()" :src="getPostImgURL()" alt="img" class="w-full" />
      </div>
      <div class="flex">
        <input type="file" class="file-input file-input-bordered file-input-primary w-full" @change="handleFileChange" />
        <button class="btn btn-primary ml-3" @click.prevent="createPost">
          Post
        </button>
      </div>
    </form>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';

export default {
  computed: {
    ...mapGetters('posts', ['isLoading']),
  },
  data() {
    return {
      formData: {
        title: '',
        body: '',
        postImg: null,
      },
    };
  },
  methods: {
    ...mapActions('posts', ['createPostAction']),
    handleFileChange(event) {
      this.formData.postImg = event.target.files[0];
    },
    getPostImgURL() {
      if (this.formData.postImg instanceof Blob) {
        return URL.createObjectURL(this.formData.postImg);
      }
      return '';
    },

    async createPost() {

      const response = await this.createPostAction(this.formData);
      console.log(response);
      this.formData.title = '';
      this.formData.body = '';
      this.formData.postImg = null;
    },
  },
};
</script>
