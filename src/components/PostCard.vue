<template>
    <div class="card card-compact w-full bg-base-200 shadow-xl mb-5">
        <div class="card-body">
            <div class="flex">
                <div class="avatar">
                    <div class="w-12 rounded-full">
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
                    <h2 class="text-lg mb-0 font-semibold">{{ post.User.username }}</h2>
                    <p>{{ getETA(post.createdAt) }}</p>
                </div>
                <div class="dropdown dropdown-end ml-auto -z-0">
                    <label tabindex="0" class="btn btn-ghost hover:bg-black/5">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                            class="bi bi-three-dots text-primary" viewBox="0 0 16 16">
                            <path
                                d="M3 9.5a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3zm5 0a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3zm5 0a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3z" />
                        </svg>
                    </label>
                    <ul class="mt-3 p-2 shadow menu menu-compact dropdown-content bg-base-100 rounded-box">
                        <li>
                            <button @click.prevent="dp(post.id)">Delete</button>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
        <figure>
            <img :src="post.postImg" alt="Post" class="w-full" />
        </figure>
        <div class="card-body">
            <h2 class="card-title">{{ post.title }}</h2>
            <p>{{ post.body }}</p>
            <!--
          <div class="card-actions justify-end">
            <button class="btn btn-primary">Buy Now</button>
          </div>
        -->
        </div>
    </div>
</template>
  
<script>
export default {
    name: "PostCard",
    props: {
        post: {
            type: Object,
            required: true,
        },
    },
    methods: {
        dp(postId) {
            this.$emit("delete-post", postId);
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
        },
    },
};
</script>
  
<style>
/* Add any additional styles specific to the PostCard component */
</style>
  