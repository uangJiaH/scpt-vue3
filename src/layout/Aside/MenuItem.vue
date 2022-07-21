<template>
  <template v-if='!props.tree.child || props.tree.child.length<=0'>
    <el-menu-item :index='props.tree.frontpath'>
      <el-icon>
        <!--        <svg-icon :icon='props.tree.icon'></svg-icon>-->
        <component :is='props.tree.icon'></component>
      </el-icon>
      <span>{{ props.tree.name }}</span>
    </el-menu-item>
  </template>
  <template v-else>
    <el-sub-menu :index="props.tree.id+''">
      <template #title>
        <el-icon>
          <component :is='props.tree.icon'></component>
        </el-icon>
        <span>{{ props.tree.name }}</span>
      </template>
      <MenuItem v-for='(item,i) in props.tree.child' :key='i' :tree='item'></MenuItem>
    </el-sub-menu>
  </template>
</template>

<script setup>
import { defineProps } from 'vue'

const props = defineProps({
  tree: {
    type: Object,
    default: () => {
    }
  }
})
</script>
<style lang='scss' scoped>
</style>
