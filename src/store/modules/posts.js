import apiClient from "@/api/api"

const state = {
    posts: [],
    isLoading: false,
    error: null
}
const getters = {
    posts(state) {
        return state.posts
    }
}
const mutations = {
    SET_LOADING(state, isLoading) {
        state.isLoading = isLoading
    },
    SET_ERROR(state, error) {
        state.error = error
    },
    SET_POSTS(state, posts) {
        state.posts = posts
    },
    ADD_POST(state, post) {
        state.posts.push(post)
    },
    DELETE_POST(state, postId) {
        state.posts = state.posts.filter(post => post.id !== postId)
    }
}

const actions = {
    async fetchPosts({ commit }) {
        commit('SET_LOADING', true)
        console.log("fetching posts");
        try {
            const response = await apiClient.get("/posts/all");
            commit('SET_POSTS', response.data);
            return { success: true };
        } catch (error) {
            commit('SET_ERROR', error.response.data.message);
            return { success: false, message: error.response.data.message };
        } finally {
            commit('SET_LOADING', false)
        }

    },
    async createPostAction({ commit }, postData) {
        console.log(postData);
        commit('SET_LOADING', true)
        try {
            if(postData.postImg){
                const uploadData = new FormData();
                uploadData.append("destination", "images/posts");
                uploadData.append("file", postData.postImg);
                postData.postImg = (await apiClient.post("/upload", uploadData)).data.url
            }
            const response = await apiClient.post("/posts", postData);
            console.log(response.data);
            commit('ADD_POST', {...response.data, User: JSON.parse(localStorage.getItem("user")).user });
            return { success: true };
        }
        catch (error) {
            commit('SET_ERROR', error.response.data.message);
            return { success: false, message: error.response.data.message };
        } finally {
            commit('SET_LOADING', false)
        }
    },
    deletePostAction({ commit }, postId) {
        console.log("deleting post");
        try {
            apiClient.delete(`/posts/${postId}`);
            commit('DELETE_POST', postId);
            return { success: true };
        } catch (error) {
            commit('SET_ERROR', error.response.data.message);
            return { success: false, message: error.response.data.message };
        }
    }
}

export default {
    namespaced: true, // Set namespaced to true
    getters,
    state,
    mutations,
    actions
}
