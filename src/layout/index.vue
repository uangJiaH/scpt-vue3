<template>
  <el-container class='w-100 h-100'>
    <el-header class='header'>
      <app-header></app-header>
    </el-header>
    <el-container>
      <el-aside width='200px'>
        <app-aside></app-aside>
      </el-aside>
      <el-main>
        <app-main></app-main>
      </el-main>
    </el-container>
  </el-container>
</template>

<script setup>
import AppAside from './Aside'
import AppMain from './Main'
import AppHeader from './Header'</script>
<style lang='scss' scoped>
.header {
  background-color: #4338CA;
}
</style>
