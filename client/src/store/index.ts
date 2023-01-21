import { Commit, createStore } from 'vuex'


export default createStore({
  state: {
    authenticated: false,
    worker_id: 0,
  },
  getters: {
  },
  mutations: {
    SET_AUTH: (state: { authenticated: boolean }, auth: boolean) => state.authenticated = auth,
    SET_WORKER_ID: (state: { worker_id: number }, id: number) => state.worker_id = id,
  },
  actions: {
    setAuth: ({ commit }: { commit: Commit }, auth: boolean) => {
      commit('SET_AUTH', auth)
    },
    setWorkerId: ({ commit }: { commit: Commit }, id: number) => {
      commit('SET_WORKER_ID', id)
    }
  },
  modules: {
  }
})
