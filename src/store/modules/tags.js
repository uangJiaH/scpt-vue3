import { getItem, setItem } from '@/utils/storage'
import { DeepCopy } from '@/utils/deepCopy'

export default {
  namespaced: true,
  state: () => ({
    tagsArray: getItem('tags') || []
  }),
  mutations: {
    addTag(state, tag) {
      const data = state.tagsArray.find(item => item.path === tag.path)
      if (!data) {
        state.tagsArray.push(tag)
        setItem('tags', state.tagsArray)
      }
    },
    delTag(state, index) {
      state.tagsArray.splice(index, 1)
      setItem('tags', state.tagsArray)
    },
    delAllTag(state) {
      state.tagsArray = []
      setItem('tags', state.tagsArray)
    },
    delOtherTag(state, index) {
      const nowTag = DeepCopy(state.tagsArray[index])
      state.tagsArray = [nowTag]
    }
  }
}
