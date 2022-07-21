<template>
  <div>
    <el-menu
      :collapse='$store.getters.collapse'
      :collapse-transition='true'
      :default-active='$route.path'
      class='el-menu-vertical-demo'
      router
    >
      <menu-item v-for='item in MenuList' :key='item.id' :tree='item'></menu-item>
    </el-menu>
  </div>
</template>

<script setup>
import MenuItem from '@/layout/Aside/MenuItem'
import { filterMenuData } from '@/utils/menu'
import { useStore } from 'vuex'

const store = useStore()
const MenuList = filterMenuData(store.getters.menus)
</script>

<style lang='scss' scoped>
.el-menu {
  position: inherit !important;
}
</style>
