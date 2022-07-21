<template>
  <div class='container'>
    <div class='left'>
      <div class='logo'>
        <span>
        <el-icon>
          <ElemeFilled />
        </el-icon>
        </span>

        <h2>垃圾站点</h2>
      </div>
      <div class='text'>
        <el-icon>
          <Fold />
        </el-icon>
        <!--        刷新-->
        <el-icon @click='refresh'>
          <Refresh />
        </el-icon>
      </div>
    </div>
    <div class='right'>
      <!--      全屏-->
      <div class='screen' @click='toggleScreen'>
        <el-tooltip :content="isScreenFull?'退出全屏':'全屏'" placement='bottom'>
          <el-icon v-if='!isScreenFull'>
            <FullScreen />
          </el-icon>
          <el-icon v-else>
            <Aim />
          </el-icon>
        </el-tooltip>
      </div>
      <div class='user'>
        <el-avatar :size='30' src='https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png' />

        <el-dropdown class='dropdown'>
          <span class='el-dropdown-link'>
            {{ $store.getters.userInfo.username }}
            <el-icon class='el-icon--right'><arrow-down /></el-icon>
          </span>
          <template #dropdown>
            <el-dropdown-menu>
              <el-dropdown-item command='a'>修改密码</el-dropdown-item>
              <el-dropdown-item command='b' @click='logout()'>退出登录</el-dropdown-item>
            </el-dropdown-menu>
          </template>
        </el-dropdown>

      </div>
    </div>
  </div>
</template>

<script setup>
import { ElMessageBox } from 'element-plus'
import { useStore } from 'vuex'
import { ref } from 'vue'
import screenfull from 'screenfull'

const isScreenFull = ref(false)
const store = useStore()
const logout = () => {
  ElMessageBox.confirm('您确定退出登录吗?')
    .then(() => {
      store.dispatch('user/logout')
    })
    .catch(() => {
      // catch error
    })
}
// 刷新
const refresh = () => {
  window.location.reload()
}
// 全屏
const toggleScreen = () => {
  isScreenFull.value = !isScreenFull.value
  screenfull.toggle()
}
</script>

<style lang='scss' scoped>
.container {
  display: flex;
  width: 1396px;
  justify-content: space-between;
  align-items: center;
  color: #fff;
  margin: 0;

  .left {
    height: 60px;
    display: flex;
    justify-content: space-around;
    //background-color: #20c997;
    align-items: center;

    .logo {

      height: 100%;
      line-height: 60px;
      display: flex;
      justify-content: space-around;

      span {
        margin-top: 3px;
        margin-right: 5px;
      }

      h2 {
        color: #fff;
      }
    }

    .text {
      margin-left: 60px;
      //background-color: #d63384;

      .el-icon {
        margin-left: 20px;
        margin-top: 3px;
      }
    }
  }

  .right {
    display: flex;
    justify-content: space-around;
    height: 60px;
    align-items: center;
    width: 250px;
    position: fixed;
    right: 20px;

    .screen {
      margin-top: 3px;
    }

    .user {
      line-height: 100%;

      .el-avatar {
        vertical-align: middle;
        margin-right: 10px;
      }

      .dropdown {
        vertical-align: middle;
        color: #fff;
      }
    }
  }
}
</style>
