import { createStore } from 'vuex'
import getters from '@/store/getters'
import user from './modules/user'
import viewLoading from '@/store/modules/viewLoading'
import common from '@/store/modules/common'
import tag from './modules/tags'

export default createStore({
  getters,
  modules: {
    user,
    viewLoading,
    common,
    tag
  }

})
