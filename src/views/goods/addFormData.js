/**
 * @author MaZiXiao
 * @date 2022-07-18 14:03
 */
/*
* category_id: 5
cover: "http://tangzhe123-com.oss-cn-shenzhen.aliyuncs.com/public/62d3c585ad19a.jpg"
desc: "111"
min_oprice: "6"
min_price: "16"
min_stock: 10
status: 1
stock: 100
stock_display: 1
title: "测试测试测试"
unit: "件" */
export const addFormData = {
  title: {
    label: '商品名称',
    clearable: true,
    type: 'text',
    maxlength: 60,
    placeholder: '请输入商品名称，不能超过60个字符',
    showLabel: true
  },
  cover: {
    label: '封面',
    type: 'slot',
    showLabel: true
  },
  category_id: {
    label: '商品分类',
    clearable: true,
    type: 'select',
    placeholder: '请选择商品分类',
    showLabel: true,
    options: []
  },
  desc: {
    label: '商品描述',
    type: 'textarea',
    maxlength: 60,
    placeholder: '选填，商品卖点',
    showLabel: true
  },
  unit: {
    label: '单位',
    type: 'text',
    maxlength: 10,
    placeholder: '件',
    showLabel: true,
    slotName: 'append',
    slot_cnt: '件'
  },
  stock: {
    label: '总库存',
    type: 'text',
    maxlength: 10,
    placeholder: '件',
    showLabel: true,
    slotName: 'append',
    slot_cnt: '件'
  },
  min_stock: {
    label: '库存预警',
    type: 'text',
    maxlength: 10,
    placeholder: '件',
    showLabel: true,
    slotName: 'append',
    slot_cnt: '件'
  },
  min_oprice: {
    label: '最低销售',
    type: 'text',
    maxlength: 10,
    placeholder: '件',
    showLabel: true,
    slotName: 'append',
    slot_cnt: '元'
  },
  min_price: {
    label: '最低原价',
    type: 'text',
    maxlength: 10,
    placeholder: '件',
    showLabel: true,
    slotName: 'append',
    slot_cnt: '元'
  },
  status: {
    label: '是否上架',
    type: 'radio',
    showLabel: true,
    options: [
      {
        label: '隐藏',
        value: 0
      },
      {
        label: '显示',
        value: 1
      }
    ]
  },
  stock_display: {
    label: '是否上架',
    type: 'radio',
    showLabel: true,
    options: [
      {
        label: '放入仓库',
        value: 0
      },
      {
        label: '立即上架',
        value: 1
      }
    ]
  }
}
/* cprice: "12"
oprice: "12"
pprice: "123"
volume: "12"
weight: "12" */
export const skuFormData = {
  cprice: {
    label: '市场价格',
    type: 'text',
    maxlength: 10,
    placeholder: '件',
    showLabel: true,
    slotName: 'append',
    slot_cnt: '元'
  },
  oprice: {
    label: '销售价格',
    type: 'text',
    maxlength: 10,
    placeholder: '件',
    showLabel: true,
    slotName: 'append',
    slot_cnt: '元'
  },
  pprice: {
    label: '成本价格',
    type: 'text',
    maxlength: 10,
    placeholder: '件',
    showLabel: true,
    slotName: 'append',
    slot_cnt: '元'
  },
  volume: {
    label: '商品重量',
    type: 'text',
    maxlength: 10,
    placeholder: '件',
    showLabel: true,
    slotName: 'append',
    slot_cnt: '公斤'
  },
  weight: {
    label: '商品体积',
    type: 'text',
    maxlength: 10,
    placeholder: '件',
    showLabel: true,
    slotName: 'append',
    slot_cnt: '立方米'
  }
}
