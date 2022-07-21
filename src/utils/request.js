import axios from 'axios'
// import loading from '@/utils/loading'
import { ElMessage } from 'element-plus'
import store from '@/store'

const instance = axios.create({
  baseURL: process.env.VUE_APP_BASE_API,
  timeout: 6000
})
// 添加请求拦截器
instance.interceptors.request.use(
  function(config) {
    // TODO 添加token
    // loading.nprogress.start()
    // config.headers.Authorization = `Bearer ${store.getters.token}`
    const token = store.getters.token
    // console.log(token, 'token')
    if (token) config.headers.token = token
    return config
  },
  function(error) {
    // 对请求错误做些什么
    return Promise.reject(error)
  }
)
// 添加响应拦截器
instance.interceptors.response.use(
  function(response) {
    // 对响应数据做点什么
    // loading.elLoading.done()
    // loading.nprogress.done()
    store.commit('viewLoading/closeLoading')
    const { status, data: { data, msg } } = response
    if (status === 200 || msg === 'ok') {
      return data
    }

    // return response
  },
  function(error) {
    // 对响应错误做点什么
    const msg = error.toString()
    if (msg.includes('NetWork')) {
      ElMessage.error('网络错误，请检查您的网络！')
    }
    if (msg.includes('Timeout')) {
      ElMessage.error('请求超时，请检查您的网络！')
    }
    const { status } = error.response
    switch (status) {
      case 401:
        ElMessage.error('Token超时,请重新登录！')
        // TODO token过期处理
        /* store.commit('user/loginOut')
         router.push({name: 'login'}) */
        break
      case 404:
        ElMessage.error('访问接口地址不正确！')
        break
      case 500:
        ElMessage.error('服务器发生错误！')
        break
      case 503:
        ElMessage.error('服务暂时不可用！')
        break
      case 408:
        ElMessage.error('客户端请求超时!')
        break
    }
    return Promise.reject(error)
  }
)
// 统一传参方式
const request = (options) => {
  if (options.method.toLowerCase() === 'get') {
    options.params = options.data || {}
  }
  return instance(options)
}
export default request
