<template>
  <div class='tagsView'>
    <el-button v-show='list.length>=11' @click='moveLeft'>
      <el-icon>
        <ArrowLeftBold />
      </el-icon>
    </el-button>
    <div ref='title' class='title'>
      <div ref='titleItemIndex' :class="$route.path==='/'?'active':''" class='titleItem' @click="$router.push('/')">
        <span style='right: 0'>后台首页</span>
      </div>
      <div v-for='(item,index) in list' :key='item'
           ref='titleItem'
           :class="$route.path===item.path?'active':''"
           class='titleItem'
           @click='$router.push(item.path)'>
        <span
          :style="{right:$route.path===item.path?'0':'-5px'}"
        >{{ item.title }}</span>
        <el-icon
          :style='{opacity:$route.path===item.path?1:0}'
          @click.stop='handleDelTag(index)'>
          <Close />
        </el-icon>
      </div>
    </div>
    <el-button v-show='list.length>=11' @click='moveRight'>
      <el-icon>
        <ArrowRightBold />
      </el-icon>
    </el-button>

    <el-dropdown style='margin-left: 5px;' @command='handleCommand'>
      <el-button>
        <el-icon class='el-icon--right'>
          <ArrowDownBold />
        </el-icon>
      </el-button>
      <template #dropdown>
        <el-dropdown-menu>
          <el-dropdown-item command='other'>关闭其他</el-dropdown-item>
          <el-dropdown-item command='all'>关闭所有</el-dropdown-item>

        </el-dropdown-menu>
      </template>
    </el-dropdown>
  </div>

</template>

<script setup>
import { computed, ref, watch } from 'vue'
import { useStore } from 'vuex'
import { useRoute, useRouter } from 'vue-router'

const router = useRouter()
const store = useStore()
const route = useRoute()
const list = computed(() => store.getters.tags)
const title = ref(null)
const titleItem = ref(null)
const titleItemIndex = ref(null)
const handleDelTag = i => {
  if (i === 0) {
    router.push('/')
    store.commit('tag/delTag', 0)
    return
  }
  if (route.path === list.value[i].path) {
    const nextPath = list.value[i - 1].path
    router.push(nextPath)
    store.commit('tag/delTag', i)
    return
  }
  store.commit('tag/delTag', i)
}
const moveRight = () => {
  const itemWidth = titleItem.value[0].offsetWidth + 19
  const x = (list.value.length * itemWidth) - title.value.offsetWidth
  for (let i = 0; i < titleItem.value.length; i++) {
    titleItem.value[i].style.transform = `translateX(-${x}px)`
    titleItemIndex.value.style.transform = `translateX(-${x}px)`
  }
}
const moveLeft = () => {
  for (let i = 0; i < titleItem.value.length; i++) {
    titleItem.value[i].style.transform = 'translateX(0px)'
    titleItemIndex.value.style.transform = `translateX(-${0}px)`
  }
}
watch(() => router.currentRoute.value.path, (newValue, oldValue) => {
  if (list.value) {
    const index = list.value.findIndex(item => item.path === newValue)
    index >= 9 ? moveRight() : moveLeft()
  }
})
const handleCommand = (name) => {
  if (name === 'all') {
    store.commit('tag/delAllTag')
  }
  if (name === 'other') {
    const index = list.value.findIndex(item => item.path === route.path)
    store.commit('tag/delOtherTag', index)
  }
}
</script>
<style lang='scss' scoped>
.el-button {
  transition: all .3s;
}

.tagsView {
  display: flex;
  justify-content: space-between;
}

.title {
  display: flex;
  overflow: auto;
  margin: 0 5px;
  width: 90%;
  transition: all .3s;
}

.titleItem {
  transition: all .3s;
  transform: translateX(0px);
  padding: 5px 10px;
  flex-shrink: 0;
  height: 32px;
  font-size: 13px;
  border: 1px solid #fff;
  text-align: center;
  background-color: #fff;
  border-radius: 3px;
  margin: 0 5px;

  span {
    position: relative;
    right: -5px;
    transition: all .3s;
  }

  &:hover {
    .el-icon {
      opacity: 1 !important;
    }

    span {
      right: 0 !important;
    }
  }

  .el-icon {
    position: relative;
    top: 2px;
    border-radius: 10px;
    padding: 1px;
    transition: all .3s;

    &:hover {
      background-color: #ddd;
    }
  }
}

/* 谷歌浏览器 */
::-webkit-scrollbar {
  overflow: hidden;
}

.active {
  color: rgb(64, 158, 255);
}
</style>
