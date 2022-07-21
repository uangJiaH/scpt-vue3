const getters = {
  token: state => state.user.token,
  userInfo: state => state.user.userInfo,
  hasUserInfo(state) {
    return JSON.stringify(state.user.userInfo) === '{}'
  },
  loading: state => state.viewLoading.loading,
  collapse: state => state.common.collapse,
  menus: state => state.user.menus,
  tags: state => state.tag.tagsArray
}
export default getters
