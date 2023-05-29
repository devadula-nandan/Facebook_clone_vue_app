<template>
  <div class="card card-compact w-full bg-base-content/10 shadow-xl mb-5">
    <div class="card-body">
      <div class="flex items-center">
        <div class="avatar items-center">
          <div class="w-10 h-10 rounded-full">
            <img :src="post.User.avatar" alt="" />
          </div>
        </div>
        <!--
            <div class="avatar placeholder">
              <div class="bg-neutral-focus text-neutral-content rounded-full w-12">
                <span>MX</span>
              </div>
            </div>
          -->
        <div class="ml-4 inline-block">
          <h2 class="text-lg mb-0 font-semibold leading-none">{{ post.User.username }}</h2>
          <p>{{ eta }}</p>
        </div>
        <div class="dropdown dropdown-end ml-auto -z-0">
          <label tabindex="0" class="btn btn-ghost hover:bg-black/5 h-[34px] px-2 min-h-0">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
              class="bi bi-three-dots text-primary" viewBox="0 0 16 16">
              <path
                d="M3 9.5a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3zm5 0a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3zm5 0a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3z" />
            </svg>
          </label>
          <ul class="mt-3 p-2 shadow menu menu-compact dropdown-content bg-base-100 rounded-box">
            <li>
              <div class="p-0 w-max"><button class="btn btn-accent" :class="btn_loading ? 'loading' : ''"
                  @click="deletePostAction(post.id)">Delete</button></div>
            </li>
          </ul>
        </div>
      </div>
      <h2 class="card-title">{{ post.title }}</h2>
      <p>{{ post.body }}</p>
    </div>
    <figure>
      <img :src="post.postImg" alt="Post" class="w-full" />
    </figure>
    <div class="card-body !pt-3 !pb-1 !px-2 md:!px-4">
      <div class="card-actions flex-col gap-1">
        <div class=" border-b border-base-content/20 pb-3 w-full">
          <div class="flex gap-2 w-full justify-between">
            <p class=" text-xs sm:text-sm md:text-base mr-auto cursor-pointer hover:underline" :class="yourLike ? 'text-primary' : 'text-base-content'">{{
              likeStr }}</p>
            <div class="flex gap-2">
              <p class=" text-xs sm:text-sm md:text-base text-base-content cursor-pointer hover:underline">500 comments
              </p>
              <p class=" text-xs sm:text-sm md:text-base text-base-content cursor-pointer hover:underline">500 shares</p>
            </div>
          </div>
        </div>
        <!-- <pre>{{ JSON.stringify(user, null, 2) }}</pre> -->

        <div class="flex w-full">
          <button class="btn w-1/3 bg-transparent border-0 capitalize text-sm md:text-base h-10 hover:bg-base-300 min-h-0"
            :class="yourLike ? 'text-primary' : 'text-base-content'" @click="toggleLike">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
              class="bi bi-hand-thumbs-up-fill mr-1" viewBox="0 0 16 16">
              <path
                d="M6.956 1.745C7.021.81 7.908.087 8.864.325l.261.066c.463.116.874.456 1.012.965.22.816.533 2.511.062 4.51a9.84 9.84 0 0 1 .443-.051c.713-.065 1.669-.072 2.516.21.518.173.994.681 1.2 1.273.184.532.16 1.162-.234 1.733.058.119.103.242.138.363.077.27.113.567.113.856 0 .289-.036.586-.113.856-.039.135-.09.273-.16.404.169.387.107.819-.003 1.148a3.163 3.163 0 0 1-.488.901c.054.152.076.312.076.465 0 .305-.089.625-.253.912C13.1 15.522 12.437 16 11.5 16H8c-.605 0-1.07-.081-1.466-.218a4.82 4.82 0 0 1-.97-.484l-.048-.03c-.504-.307-.999-.609-2.068-.722C2.682 14.464 2 13.846 2 13V9c0-.85.685-1.432 1.357-1.615.849-.232 1.574-.787 2.132-1.41.56-.627.914-1.28 1.039-1.639.199-.575.356-1.539.428-2.59z" />
            </svg>
            Like
          </button>
          <button
            class="btn w-1/3 bg-transparent border-0 capitalize text-sm md:text-base text-base-content h-10 hover:bg-base-300 min-h-0">Comment</button>
          <button
            class="btn w-1/3 bg-transparent border-0 capitalize text-sm md:text-base text-base-content h-10 hover:bg-base-300 min-h-0">Share</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapState } from 'vuex';

export default {
  name: 'PostCard',
  data() {
    return {
      btn_loading: false,
      yourLike: false,
      otherLikes: 0,
      likeStr: '',
    };
  },
  props: {
    post: {
      type: Object,
      required: true,
    },
  },
  computed: {
    ...mapState('user', ['user']),
    eta() {
      const createdAtDate = new Date(this.post.createdAt);
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
    },
    buildLikeStr() {
      let str = ""
      if (this.yourLike && this.otherLikes > 0) {
        str = `You and ${this.otherLikes} others`
      }
      if (!this.yourLike && this.otherLikes > 0) {
        str = `${this.otherLikes} others`
      }
      if (!this.yourLike && !this.otherLikes) {
        str = ""
      }
      if (this.yourLike && !this.otherLikes) {
        str = "You"
      }
      return str;
    },
  },
  methods: {
    ...mapActions('posts', ['deletePostAction', 'toggleLikeAction']),
    async toggleLike() {
      this.btn_loading = true;
      const res = await this.toggleLikeAction(this.post.id);
      if (res.success) {
        this.yourLike = !this.yourLike;
      }
      this.btn_loading = false;
    },
  },
  mounted() {
    this.yourLike = this.post.Likes.some((like) => like.User.id === this.user.user.id);
    this.yourLike ? this.otherLikes = this.post.Likes.length - 1 : this.otherLikes = this.post.Likes.length;
    // this.likeStr = this.buildLikeStr;
    console.log(this.yourLike, this.otherLikes);
  },
  watch: {
    yourLike() {
      this.likeStr = this.buildLikeStr;
    },
    otherLikes() {
      this.likeStr = this.buildLikeStr;
    }
  },

};
</script>

<style>/* Add any additional styles specific to the PostCard component */</style>