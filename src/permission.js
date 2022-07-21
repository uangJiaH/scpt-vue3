import router from './router'
import store from './store'
import { filterMenuData } from '@/utils/menu'
import { dynamicRouting } from '@/utils/dynamicRouting'

router.beforeEach(async (to, from, next) => {
  const token = store.getters.token
  const hasUserInfo = store.getters.hasUserInfo
  console.log(hasUserInfo, 'hasUserInfo')
  if (to.path !== '/login' && to.path !== '/') {
    if (to.meta.title) {
      const obj = {
        title: to.meta.title,
        path: to.path
      }
      console.log(obj, 'obj')
      store.commit('tag/addTag', obj)
    }
  }
  if (to.path === '/login' && token) {
    if (from.path) {
      return next(from.path)
    } else {
      return next('/')
    }
  }
  if (to.path !== '/login' && !token) {
    return next('/login')
  }
  if (to.path !== '/login' && token) {
    if (hasUserInfo) {
      const res = await store.dispatch('user/getUserInfo')
      console.log(res, 'has')
      const menuData = filterMenuData(res.menus)
      if (res && menuData) {
        const data = dynamicRouting(menuData)
        await data.forEach(item => {
          router.addRoute('layout', item)
        })
        return next(to.path)
      } else {
        return next('/login')
      }
    }
    // TODO判a断用户信息
  }
  next()
}
)
