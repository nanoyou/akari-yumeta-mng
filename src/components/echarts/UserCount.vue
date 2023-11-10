<script setup lang="ts">
import { ref, onMounted } from 'vue'
import * as echarts from 'echarts'

const echartsRef = ref(null)
onMounted(() => {
  var myChart = echarts.init(echartsRef.value)
  const option = {
    title: {
      text: '近一周用户数量变化'
    },
    tooltip: {
      trigger: 'axis'
    },
    legend: {
      data: ['儿童', '志愿者', '捐助者']
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
      // boundaryGap: true,
      data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
    },
    yAxis: {
      type: 'value'
    },
    series: [
      {
        name: '儿童',
        type: 'line',
        // stack: 'Total',
        data: [120, 132, 101, 134, 90, 230, 210],
        smooth: true
      },
      {
        name: '志愿者',
        type: 'line',
        // stack: 'Total',
        data: [220, 182, 191, 234, 290, 330, 310],
        smooth: true
      },
      {
        name: '捐助者',
        type: 'line',
        // stack: 'Total',
        data: [150, 232, 201, 154, 190, 330, 410],
        smooth: true
      }
    ]
  }

  myChart.setOption(option)
})
</script>

<template>
  <div ref="echartsRef" style="width: 715px; height: 450px"></div>
</template>

<style scoped></style>
