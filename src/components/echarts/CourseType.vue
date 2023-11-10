<script setup lang="ts">
import { ref, onMounted } from 'vue'
import * as echarts from 'echarts'

const echartsRef = ref(null)
onMounted(() => {
  var myChart = echarts.init(echartsRef.value)
  const option = {
    title: {
      text: '学习偏好分类'
    },
    radar: {
      // shape: 'circle',
      indicator: [
        { name: '农业', max: 1000 },
        { name: '牧业', max: 1000 },
        { name: '语言', max: 1000 },
        { name: '科学', max: 1000 },
        { name: '卫生', max: 1000 },
        { name: '社会', max: 1000 },
        { name: '历史', max: 1000 },
        { name: '政治', max: 1000 }
      ]
    },
    series: [
      {
        name: 'Budget vs spending',
        type: 'radar',
        data: [
          {
            value: [490, 510, 470, 750, 500, 650, 680, 920],
            name: 'Allocated Budget'
          }
        ]
      }
    ]
  }
  myChart.setOption(option)
})
</script>

<template>
  <div ref="echartsRef" style="width: 280px; height: 250px"></div>
</template>

<style scoped></style>
