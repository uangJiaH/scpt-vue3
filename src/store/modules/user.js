import UserApi from '../../api/user'
import { getItem, setItem } from '../../utils/storage'
import router from '@/router'
import { ElNotification } from 'element-plus'

export default {
  namespaced: true,
  state: {
    token: getItem('token') || '',
    userInfo: {},
    menus: getItem('menus') || []
  },
  mutations: {
    setToken(state, token) {
      state.token = token
      setItem('token', token)
    },
    setUserInfo(state, payload) {
      state.userInfo = payload
    },
    setMenus(state, payload) {
      state.menus = payload
    }
  },

  actions: {
    async login({ commit }, data) {
      try {
        const response = await UserApi.login(data)
        console.log(response, 'res')
        if (response.token) {
          commit('setToken', response.token)
          await router.push('/index')
          ElNotification.success('登录成功')
        }
        return response
      } catch (e) {
        console.log(e)
      }
    },

    async getUserInfo({ commit }) {
      try {
        const res = await UserApi.getUserInfo()
        console.log(res, 'getUser')
        await commit('setMenus', res.menus)

        await commit('setUserInfo', {
          avatar: res.avatar,
          id: res.id,
          role: res.role,
          super: res.ruper,
          username: res.username
        })
        return res
      } catch (e) {
        console.log(e)
      }
    },
    async logout({ commit }) {
      await UserApi.logout()
      setItem('token', '')
      await commit('setMenus', [])
      // await commit('setRuleNames', [])
      await commit('setUserInfo', {})
      await window.location.reload()
      ElNotification.success('退出成功！')
    }
  }
}
