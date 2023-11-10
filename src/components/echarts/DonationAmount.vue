<script setup lang="ts">
import { ref, onMounted } from 'vue'
import * as echarts from 'echarts'

const echartsRef = ref(null)
onMounted(() => {
  var myChart = echarts.init(echartsRef.value)
  const option = {
    title: {
      text: '近半年月均捐款额统计',
      left: 'center'
    },
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        type: 'shadow'
      }
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
    xAxis: [
      {
        type: 'category',
        data: ['6月', '7月', '8月', '9月', '10月', '11月'],
        axisTick: {
          alignWithLabel: true
        }
      }
    ],
    yAxis: [
      {
        type: 'value'
      }
    ],
    series: [
      {
        name: '捐款额(单位:元)',
        type: 'bar',
        barWidth: '60%',
        data: [4329, 3247, 2753, 4814, 5357, 3279]
      }
    ]
  }
  myChart.setOption(option)
})
</script>

<template>
  <div ref="echartsRef" style="width: 345px; height: 210px"></div>
</template>

<style scoped></style>
