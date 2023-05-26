<template>
    <div class="card card-compact w-full bg-base-200 shadow-xl mb-5">
        <div class="card-body animate-pulse">
            <div class="flex">
                <div class="avatar">
                    <div class="w-12 rounded-full">
                        <div class="w-12 bg-base-300 h-12 rounded-full "></div>
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
                    <div class="w-24 bg-base-300 h-5 rounded-md mb-2"></div>
                    <div class="w-36 bg-base-300 h-5 rounded-md "></div>
                </div>
                <div class="dropdown dropdown-end ml-auto -z-0">
                    <label tabindex="0" class="btn btn-ghost hover:bg-black/5">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                            class="bi bi-three-dots text-primary" viewBox="0 0 16 16">
                            <path
                                d="M3 9.5a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3zm5 0a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3zm5 0a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3z" />
                        </svg>
                    </label>
                </div>
            </div>
        </div>
        <figure>
            <div class="bg-base-300 w-full h-64 animate-pulse"></div>
        </figure>
        <div class="card-body animate-pulse">
            <div class="bg-base-300 h-5 rounded-md mb-2"></div>
            <div class="bg-base-300 h-5 rounded-md mb-2"></div>
            <div class="bg-base-300 h-5 rounded-md mb-2"></div>
        </div>
    </div>
</template>

<script>
export default {
    name: "SkeletonCard1",
};
</script>