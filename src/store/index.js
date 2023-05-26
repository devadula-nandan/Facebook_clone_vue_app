import { createStore } from 'vuex'
import user from './modules/user'
import posts from './modules/posts'

const store = createStore({
  modules: {
    user,
    posts
  }
})

export default store
