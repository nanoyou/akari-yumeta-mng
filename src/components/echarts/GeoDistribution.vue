<script setup lang="ts">
import { ref, onMounted } from 'vue'
import * as echarts from 'echarts'

const echartsRef = ref(null)
onMounted(() => {
  var myChart = echarts.init(echartsRef.value)
  const option = {
    title: {
      text: '留守儿童地理分布情况',
      left: 'center'
    },
    dataset: [
      {
        dimensions: ['name', 'score'],
        source: [
          ['云南', 70],
          ['西藏', 42],
          ['广西', 32],
          ['河北', 52],
          ['宁夏', 37],
          ['贵州', 63],
          ['甘肃', 29],
          ['四川', 28],
          ['青海', 26],
          ['重庆', 23],
          ['其他', 16]
        ]
      },
      {
        transform: {
          type: 'sort',
          config: { dimension: 'score', order: 'desc' }
        }
      }
    ],
    xAxis: {
      type: 'category',
      axisLabel: { interval: 0, rotate: 30 }
    },
    yAxis: {},
    series: {
      type: 'bar',
      encode: { x: 'name', y: 'score' },
      datasetIndex: 1
    }
  }
  myChart.setOption(option)
})
</script>

<template>
  <div ref="echartsRef" style="width: 830px; height: 250px"></div>
</template>

<style scoped></style>
