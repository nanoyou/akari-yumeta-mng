<script setup lang="ts">
import { ref, onMounted } from 'vue'
import * as echarts from 'echarts'

const echartsRef = ref(null)
onMounted(() => {
  var myChart = echarts.init(echartsRef.value)
  const option = {
    title: {
      text: '捐物统计',
      left: 'center'
    },
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        type: 'shadow'
      }
    },
    legend: {},
    grid: {
      left: '3%',
      right: '4%',
      bottom: '3%',
      containLabel: true
    },
    xAxis: {
      type: 'value',
      boundaryGap: [0, 0.01]
    },
    yAxis: {
      type: 'category',
      data: ['书籍', '文具', '衣物', '食品']
    },
    series: [
      {
        type: 'bar',
        data: [382, 139, 234, 97]
      }
    ]
  }
  myChart.setOption(option)
})
</script>

<template>
  <div ref="echartsRef" style="width: 340px; height: 180px"></div>
</template>

<style scoped></style>
