<template>
  <div>
    <div class="container mx-auto px-1 md:px-3">
      <div class="grid grid-cols-4 gap-4 relative">
        <div class="col-span-1">
          <div class="sticky top-16">
            <LeftSection />
          </div>
        </div>
        <div class="col-span-4 lg:col-span-2">
          <!-- <pre> {{ JSON.stringify(posts, null, 2) }}</pre> -->
          <PostForm />
          <PostCard v-for="post in posts" :key="post.id" :post="post" />
          <SkeletonCard1 v-if="isLoading" />
        </div>
        <div class="col-span-1">
          <div class="sticky top-16">
            <RightSection />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

  
<script>
import { mapActions, mapGetters, mapState } from 'vuex'
import PostForm from '@/components/PostForm.vue'
import SkeletonCard1 from '@/components/SkeletonCard1.vue'
import PostCard from '@/components/PostCard.vue'
import LeftSection from '@/components/homepage/LeftSection.vue'
import RightSection from '@/components/homepage/RightSection.vue'
export default {
  name: 'HomePage',
  components: {
    PostForm,
    SkeletonCard1,
    PostCard,
    LeftSection,
    RightSection
  },
  data() {
    return {
      title: '',
      text: '',
      postImg: null
    }
  },
  computed: {
    ...mapGetters('posts', ['posts']),
    ...mapState('posts', ['isLoading', 'error'])
  },
  methods: {
    ...mapActions('posts', ['fetchPosts', 'createPost']),
    onFileChange(event) {
      this.postImg = event.target.files[0]
    },
    getETA(createdAt) {
      const createdAtDate = new Date(createdAt);
      const elapsedTimeMs = Date.now() - createdAtDate.getTime();
      const seconds = Math.floor(elapsedTimeMs / 1000);
      const minutes = Math.floor(seconds / 60);
      const hours = Math.floor(minutes / 60);
      const days = Math.floor(hours / 24);

      if (days > 0) {
        return `${days}d`;
      }
      if (hours > 0) {
        return `${hours % 24}h`;
      }
      if (minutes > 0) {
        return `${minutes % 60}m`;
      }
      return `${seconds % 60}s`;
    }
  },
  mounted() {
    this.fetchPosts()
  }
}
</script>
  