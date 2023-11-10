<script setup lang="ts">
import { ref, onMounted } from 'vue'
import * as echarts from 'echarts'

const echartsRef = ref(null)
onMounted(() => {
  var myChart = echarts.init(echartsRef.value)

  const option = {
    title: {
      text: '近半年月均捐款用户数量',
      left: 'center'
    },
    tooltip: {
      trigger: 'axis'
    },
    grid: {
      left: '3%',
      right: '4%',
      bottom: '3%',
      containLabel: true
    },
    toolbox: {
      feature: {
        saveAsImage: {}
      }
    },
    xAxis: {
      type: 'category',
      boundaryGap: false,
      data: ['6月', '7月', '8月', '9月', '10月', '11月']
    },
    yAxis: {
      type: 'value'
    },
    series: [
      {
        name: ' 捐款人数(单位:人)',
        type: 'line',
        stack: 'Total',
        data: [182, 178, 134, 156, 223, 213, 279, 209]
      }
    ]
  }
  myChart.setOption(option)
})
</script>

<template>
  <div ref="echartsRef" style="width: 340px; height: 210px"></div>
</template>

<style scoped></style>
