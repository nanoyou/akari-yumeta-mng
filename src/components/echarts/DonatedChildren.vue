<script setup lang="ts">
import { ref, onMounted } from 'vue'
import * as echarts from 'echarts'

const echartsRef = ref(null)
onMounted(() => {
  var myChart = echarts.init(echartsRef.value)
  const option = {
    color: ['#80FFA5'],
    title: {
      text: '近半年月均接收捐赠儿童统计',
      left: 'center'
    },
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        type: 'cross',
        label: {
          backgroundColor: '#6a7985'
        }
      }
    },
    toolbox: {
      feature: {
        saveAsImage: {}
      }
    },
    grid: {
      left: '3%',
      right: '4%',
      bottom: '3%',
      containLabel: true
    },
    xAxis: [
      {
        type: 'category',
        boundaryGap: false,
        data: ['6月', '7月', '8月', '9月', '10月', '11月']
      }
    ],
    yAxis: [
      {
        type: 'value'
      }
    ],
    series: [
      {
        name: '被捐助儿童(单位:人)',
        type: 'line',
        stack: 'Total',
        smooth: true,
        lineStyle: {
          width: 0
        },
        showSymbol: false,
        areaStyle: {
          opacity: 0.8,
          color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
            {
              offset: 0,
              color: 'rgb(0, 221, 255)'
            },
            {
              offset: 1,
              color: 'rgb(77, 119, 255)'
            }
          ])
        },
        emphasis: {
          focus: 'series'
        },
        data: [120, 282, 111, 234, 220, 340, 310, 378]
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
