import apiClient from "@/api/api"

const state = {
    user: JSON.parse(localStorage.getItem('user')) || null,
    isLoading: false,
    error: null
}

const mutations = {
    SET_USER(state, user) {
        state.user = user
    },
    SET_LOADING(state, isLoading) {
        state.isLoading = isLoading
    },
    SET_ERROR(state, error) {
        state.error = error
    }
}

const actions = {
    async login({ commit }, credentials) {
        console.log(credentials);
        commit('SET_LOADING', true)
        try {
            const response = await apiClient.post('/users/login', credentials);
            console.log(response);
            commit('SET_USER', response.data);
            localStorage.setItem('user', JSON.stringify(response.data));
            return { success: true }; // Return success flag in the response
        } catch (error) {
            console.log(error);
            commit('SET_ERROR', error.response.data.message);
            return { success: false, message: error.response.data }; // Return error message in the response
        } finally {
            commit('SET_LOADING', false)
        }
    },
    async signup({ commit }, userData) {
        commit('SET_LOADING', true)
        try {
            if (userData.avatar) {
                const uploadData = new FormData();
                uploadData.append("destination", "images/users");
                uploadData.append("file", userData.avatar);
                userData.avatar = (await apiClient.post("/upload", uploadData)).data.url
            }
            const response = await apiClient.post('/users', userData);
            commit('SET_USER', response.data);
            localStorage.setItem('user', JSON.stringify(response.data));
            return { success: true }; // Return success flag in the response
        } catch (error) {
            commit('SET_ERROR', error.response.data.message);
            return { success: false, message: error.response.data.message }; // Return error message in the response
        } finally {
            commit('SET_LOADING', false)
        }
    },
    async logout({ commit }) {
        commit('SET_LOADING', true)
        commit('SET_USER', null);
        localStorage.removeItem('user');
        commit('SET_LOADING', false)
        return { success: true };
    }
}

const getters = {
    isAuthenticated: state => {
        return state.user !== null && state.user.token !== null;
    },
};

export default {
    namespaced: true, // Set namespaced to true
    state,
    mutations,
    actions,
    getters
}
