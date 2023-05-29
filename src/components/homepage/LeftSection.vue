<template>
    <div v-if="user" class="py-6">
        <button
            class="w-full flex gap-2 items-center capitalize font-semibold text-left p-2 hover:bg-base-content/10 transition-all rounded-lg">
            <div v-if="user.user.avatar" class="w-9 rounded-full overflow-hidden shadow-xl">
                <img :src="user.user.avatar" :title="user.user.username" />
            </div>
            <div v-else class="bg-neutral-focus text-neutral-content rounded-full w-12">
                <span>{{ user.user.username[0] }}</span>
            </div>
            {{ user.user.username }}
        </button>
        <button
            class="w-full flex gap-2 items-center capitalize font-semibold text-left p-2 hover:bg-base-content/10 transition-all rounded-lg">
            <div class="h-9 w-9 rounded-full"
                :style="{ backgroundImage: `url(${sprite})`, backgroundPosition: `0 ${-296}px` }"></div>
            friends
        </button>
        <button
            class="w-full flex gap-2 items-center capitalize font-semibold text-left p-2 hover:bg-base-content/10 transition-all rounded-lg">
            <div class="h-9 w-9 rounded-full"
                :style="{ backgroundImage: `url(${sprite})`, backgroundPosition: `0 ${36}px` }"></div>
            Feeds (most recent)
        </button>
        <button
            class="w-full flex gap-2 items-center capitalize font-semibold text-left p-2 hover:bg-base-content/10 transition-all rounded-lg">
            <div class="h-9 w-9 rounded-full"
                :style="{ backgroundImage: `url(${sprite})`, backgroundPosition: `0 ${-74}px` }"></div>
            groups
        </button>
        <button
            class="w-full flex gap-2 items-center capitalize font-semibold text-left p-2 hover:bg-base-content/10 transition-all rounded-lg">
            <div class="h-9 w-9 rounded-full"
                :style="{ backgroundImage: `url(${sprite})`, backgroundPosition: `0 ${-407}px` }"></div>
            marketplace
        </button>
        <button
            class="w-full flex gap-2 items-center capitalize font-semibold text-left p-2 hover:bg-base-content/10 transition-all rounded-lg">
            <div class="h-9 w-9 rounded-full"
                :style="{ backgroundImage: `url(${sprite})`, backgroundPosition: `0 ${-518}px` }"></div>
            watch
        </button>
    </div>
</template>
<script>
import { mapState } from 'vuex';
import sprite from '../../../public/images/ELk7Nvr1G3K.png'
export default {
    name: "LeftSection",
    data() {
        return {
            sprite: sprite,
        }
    },
    computed: {
        ...mapState('user', ['user'])
    },
};
</script>
<style scoped>
.collapse-title,
:where(.collapse > input[type="checkbox"]) {
    min-height: unset;
}
</style>