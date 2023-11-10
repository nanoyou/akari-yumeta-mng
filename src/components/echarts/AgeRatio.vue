<script setup lang="ts">
import { ref, onMounted } from 'vue'
import * as echarts from 'echarts'

const echartsRef = ref(null)
onMounted(() => {
  var myChart = echarts.init(echartsRef.value)
  const option = {
    title: {
      text: '留守儿童年龄段分布',
      left: 'center'
    },
    tooltip: {
      trigger: 'item'
    },
    // legend: {
    //   top: '5%',
    //   left: 'center'
    // },
    series: [
      {
        name: '占比',
        type: 'pie',
        radius: ['40%', '70%'],
        avoidLabelOverlap: false,
        label: {
          show: false,
          position: 'center'
        },
        emphasis: {
          label: {
            show: false,
            fontSize: 40,
            fontWeight: 'bold'
          }
        },
        // labelLine: {
        //   show: false
        // },
        data: [
          {
            value: 142,
            name: '6-8岁',
            itemStyle: {
              color: '#D7E4FE'
            }
          },
          {
            value: 179,
            name: '9-10岁',
            itemStyle: {
              color: '#A0B9F8'
            }
          },
          {
            value: 223,
            name: '10-12岁',
            itemStyle: {
              color: '#6B91F4'
            }
          },
          {
            value: 323,
            name: '12-14岁',
            itemStyle: {
              color: '#5F74EF'
            }
          },
          {
            value: 236,
            name: '14-16岁',
            itemStyle: {
              color: '#D7E4FE'
            }
          },
          {
            value: 136,
            name: '16+',
            itemStyle: {
              color: '#A0B9F8'
            }
          }
        ]
      }
    ]
  }

  myChart.setOption(option)
})
</script>

<template>
  <div ref="echartsRef" style="width: 17.5rem; height: 15.625rem"></div>
</template>

<style scoped></style>
