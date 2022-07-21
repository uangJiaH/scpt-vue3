export default {
  namespaced: true,
  state: {
    loading: false
  },
  mutations: {
    startLoading(state) {
      state.loading = true
    },
    closeLoading(state) {
      state.loading = false
    }
  }
}
