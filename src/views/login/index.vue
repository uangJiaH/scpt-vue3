<template>
  <div class='login-container'>
    <div class='left'>
      欢迎光临
    </div>
    <div class='right'>
      <div class='come'>
        <h2>欢迎回来</h2>
        <div class='line'>
          ——— <span>账号密码登录</span>———
        </div>
        <div class='login'>
          <from :data='FormData' :loading='loading' btn-title='登录' @submit='login'></from>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import From from '../../components/Form'
import { useStore } from 'vuex'
// import { useRouter } from 'vue-router'

const loading = ref(false)
const store = useStore()
// const router = useRouter()
const login = async (data) => {
  try {
    loading.value = true
    await store.dispatch('user/login', data)
  } catch (error) {
  }
  loading.value = false
}
const FormData = {
  username: {
    label: '账户',
    clearable: false,
    type: 'text',
    maxlength: 10,
    minlength: 4,
    leftIcon: 'User',
    togglePwd: true,
    placeholder: '请输入用户名',
    showLabel: false
  },
  password: {
    label: '密码',
    clearable: false,
    type: 'password',
    maxlength: 10,
    minlength: 4,
    leftIcon: 'Unlock',
    togglePwd: true,
    placeholder: '请输入用户名',
    showLabel: false
  }
}
</script>

<style lang='scss' scoped>
.login-container {
  display: flex;
  justify-content: space-between;
  height: 100%;

  .left {
    width: 67%;
    background-color: #626aef;
    font-weight: 700;
    font-size: 2.8rem;
    color: #fff;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .right {
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: center;

    .come {
      height: 290px;
      width: 100%;
      //background-color: #0c4128;

      h2 {
        font-weight: 700;
        font-size: 1.675rem;
        color: rgba(31, 41, 55, var(--tw-text-opacity));
        text-align: center;
      }

      .line {
        width: 100%;
        height: 25px;
        text-align: center;
        line-height: 25px;
        color: #D1D5D8;
        margin: 15px 0;
      }

      .login {
        width: 250px;
        margin: auto;

        ::v-deep .el-button {
          width: 100%;
          background-color: #626aef;
          border: 0;
          border-radius: 20px;

        }
      }

    }

  }

}
</style>
