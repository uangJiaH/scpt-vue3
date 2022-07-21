<template>
  <div>
    <el-form
      ref='ruleFormRef'
      :model='ruleForm'
      :rules='rules'
      class='demo-ruleForm'
      status-icon
    >
      <el-form-item v-for='(item,key,index) in data' :key='index' :label="item.showLabel?item.label:''" :prop='key'>
        <!--        输入框-->
        <el-input
          v-if='inputType.indexOf(item.type)>=0'
          v-model='ruleForm[key]'
          :clearable='item.clearable'
          :disabled='item.disabled'
          :placeholder='item.placeholder'
          :prefix-icon='item.leftIcon'
          :show-password="item.type==='password'?item.togglePwd:false"
          :style="{width:item.width+'px'}"
          :suffix-icon='item.rightIcon'
          :type='item.type'
        />
        <!--        选择器-->
        <el-select
          v-if="item.type==='select'"
          v-model='ruleForm[key]'
          :disabled='item.disabled' :placeholder="'请选择'+item.label"
          class='m-2'>
          <el-option
            v-for='(option,i) in item.options'
            :key='i'
            :label='option.label'
            :value='option.value'
          />
        </el-select>
        <!--        级联选择器-->
        <el-cascader
          v-if="item.type==='cascader'"
          v-model='ruleForm[key]'
          :options='item.options'
          :props='item.props'
        />
        <!--        取色器-->
        <el-color-picker v-if="item.type==='color'" v-model='ruleForm[key]' />
        <!--        日期-->
        <el-date-picker
          v-if="item.type==='data'"
          v-model='ruleForm[key]'
          :placeholder="'请选择'+item.label"
          type='date'

        />
        <!--   数字     -->
        <el-input-number
          v-if="item.type==='number'"
          v-model='ruleForm[key]'
          :max='item.maxlength'
          :min='item.minlength' />
        <!--        单选-->
        <el-radio-group v-if="item.type==='radio'" v-model='ruleForm[key]' class='ml-4'>
          <el-radio
            v-for='(radio,i) in item.options'
            :key='i'
            :label='radio'
          ></el-radio>
        </el-radio-group>
        <!--        多选-->
        <el-checkbox-group v-if="item.type==='checkbox'" v-model='ruleForm[key]'>
          <el-checkbox
            v-for='(cbox,i) in item.options'
            :key='i'
            :label='cbox' />

        </el-checkbox-group>
      </el-form-item>
      <el-form-item>
        <el-button :loading='props.loading' type='primary'
                   @click='submitForm()'
        >{{ btnTitle }}
        </el-button
        >
        <el-button v-if='props.reset' @click='resetForm()'>重置</el-button>
      </el-form-item>
    </el-form>

  </div>
</template>

<script setup>
// <Form :data="FormData" @submit="login" :reset="true" :loading="loading"></Form>
import { defineEmits, defineProps, reactive, ref } from 'vue'

const emit = defineEmits(['submit'])
// input显示类型
const inputType = reactive(['text', 'password'])
const ruleForm = reactive({})
const rules = reactive({})
const props = defineProps({
  data: {
    type: Object,
    default: () => ({
      input: {
        label: 'label',
        disabled: false,
        clearable: true,
        type: 'text',
        maxlength: 20,
        minlength: 5,
        rightIcon: '',
        leftIcon: '',
        togglePwd: true,
        showLabel: true
      }
    })
  },
  reset: {
    type: Boolean,
    default: false
  },
  loading: {
    type: Boolean,
    default: false
  },
  btnTitle: {
    type: String,
    default: '提交'
  },
  labelWidth: {
    type: Number,
    default: 100
  }
})
// 动态绑定v-model生成表单验证
for (const propsKey in props.data) {
  // eslint-disable-next-line vue/no-setup-props-destructure
  const item = props.data[propsKey]
  ruleForm[propsKey] = item.value
  if (inputType.indexOf(item.type) >= 0) {
    rules[propsKey] = [{
      required: true,
      message: '请输入' + item.label,
      trigger: 'blur'
    },
    {
      min: item.minlength || 1,
      max: item.maxlength || 10,
      message: `${item.label}在${item.minlength || 1}到${item.maxlength || 10}个字符`,
      trigger: 'blur'
    }]
  } else {
    rules[propsKey] = [
      {
        required: true,
        message: '请选择' + item.label,
        trigger: 'blur'
      }
    ]
  }
}
const ruleFormRef = ref(null)
const submitForm = async (formEl) => {
  if (!ruleFormRef.value) return
  await ruleFormRef.value.validate((valid, fields) => {
    if (valid) {
      emit('submit', ruleForm)
    } else {
      console.log('error submit!', fields)
    }
  })
}

const resetForm = () => {
  if (!ruleFormRef.value) return
  ruleFormRef.value.resetFields()
}
</script>
<style lang='scss' scoped>

</style>
