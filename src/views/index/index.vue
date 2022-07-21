<template>
  <div>
    <el-row :gutter='20'>
      <el-col v-for='(item,index) in listone' :key='index' :span='6'>
        <el-card class='box-card' shadow='hover'>
          <div class='card_header'>
            <span>{{ item.title }}</span>
            <el-tag :type='item.unitColor'>{{ item.unit }}</el-tag>
          </div>
          <h1>{{ item.value }}</h1>
          <div class='card_btm'>
            <span>{{ item.subTitle }}</span>
            <span>{{ item.subValue }}</span>
          </div>
        </el-card>
      </el-col>
    </el-row>

    <!--    第二部分-->
    <el-row :gutter='20' style='margin-top: 20px'>
      <el-col v-for='(item,index) in cardData' :key='index' :span='3'>
        <el-card class='smallCard' shadow='hover' @click='$router.push(item.path)'>
          <div class='grid-content ep-bg-purple' />
          <p>
            <el-icon style='margin-bottom:5px '>
              <component :is='item.icon' :style='{color:colorList[index]}'></component>
            </el-icon>
          </p>
          <p><span>{{ item.title }}</span></p>
        </el-card>
      </el-col>
    </el-row>
    <!--    第三部分 左侧echarts图-->
    <el-row :gutter='20' style='margin-top: 20px'>
      <el-col :span='12'>
        <el-card shadow='hover'>
          <div class='card_header'>
            <span>订单统计</span>
            <!--            右侧的文字-->
            <span>
                <el-check-tag :checked='chartType==="month"' style='margin-right: 8px'
                              @click='changeChartType("month")'>近一个月</el-check-tag>
              <el-check-tag :checked='chartType==="week"' style='margin-right: 8px'
                            @click='changeChartType("week")'>近一周</el-check-tag>
              <el-check-tag :checked="chartType==='hour'" style='margin-right: 8px' @click='changeChartType("hour")'>近24小时</el-check-tag>
            </span>
          </div>
          <div id='chartMain' style='width: 569px;height: 300px'></div>
        </el-card>
      </el-col>
      <!--      第三部分右侧的交易统计-->
      <!--      subTitle: "总支付订单"-->
      <!--      subUnit: ""-->
      <!--      subValue: 51-->
      <!--      title: "支付订单"-->
      <!--      unit: "年"-->
      <!--      unitColor: "success"-->
      <!--      value: 51-->
      <el-col :span='12'>
        <el-card v-for='(val,key) in listTwo' :key='key' class='btmCard' shadow='hover' style='margin-bottom: 10px'>
          <div class='card_header'>
            <span>{{ key === 'goods' ? '店铺及商品提示' : '交易提示' }}</span>
            <el-tag effect='plain' type='danger'>{{ key === 'goods' ? '店铺及商品提示' : '交易提示' }}</el-tag>
          </div>
          <span v-for='item in val' :key='item' class='spanbox'>
            <h2>{{ item.value }}</h2>
            <div>{{ item.label }}</div>
          </span>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script setup>
import HOMEAPI from '@/api/home'
import { ref } from 'vue'
import { cardData } from '@/views/index/cardData'
import * as echarts from 'echarts'

const colorList = ['#6f599c', '#d71345', '#53261f', '#df9464', '#bed742', '#007d65', '#90d7ec', '#7d5886']
const listone = ref([])
// 第三部分右侧
const listTwo = ref([])
// echarts图
const chartType = ref('week')
const getListOne = async () => {
  const res = await HOMEAPI.getStatisticsOne()
  console.log(res, 'one')
  listone.value = res.panels
}
getListOne()
// 第三部分
// echarts柱状图
const getChartData = async () => {
  const res = await HOMEAPI.getChart(chartType.value)
  console.log(res, 'chart')
  const myChart = echarts.init(document.getElementById('chartMain'))
  myChart.setOption({
    tooltip: {},
    xAxis: {
      data: res.x
    },
    yAxis: {
      data: res.y
    },
    series: [
      {
        name: '销量',
        type: 'bar',
        data: res.y
      }
    ]

  })
}
getChartData()
const changeChartType = type => {
  chartType.value = type
  getChartData()
}
// 第三部分右侧
const getListTwo = async () => {
  const res = await HOMEAPI.getStatisticsTwo()
  listTwo.value = res
  console.log(res, 'two')
}
getListTwo()
</script>

<style lang='scss' scoped>

.card_header {
  height: 41px;
  background-color: rgb(249, 250, 251);
  border-bottom: 1px solid #ddd;
  display: flex;
  justify-content: space-between;
  padding: 0 5px;
  align-items: center;

}

.card_btm {
  height: 55px;
  display: flex;
  justify-content: space-between;
  padding: 10px;
  align-items: center;
  border-top: 1px solid #ddd;
  color: rgb(107, 114, 128);
  font-size: 14px;
}

h1 {
  font-size: 30px;
  font-weight: 700;
  color: rgb(107, 114, 128);
  margin: 15px;
}

//第二部分
.smallCard {
  padding-top: 10px;
  box-sizing: border-box;
  text-align: center;
  font-size: 14px;
}

.btmCard {
  .spanbox {
    display: inline-block;
    width: 105px;
    height: 92px;
    background-color: rgba(229, 231, 235, .3);
    border-radius: 5px;
    margin: 10px;
    text-align: center;
    padding-top: 20px;
    color: rgb(107, 114, 128);

    h2 {
      font-size: 25px;
      margin-bottom: 5px;
    }

    div {
      font-size: 14px;
    }
  }
}
</style>
