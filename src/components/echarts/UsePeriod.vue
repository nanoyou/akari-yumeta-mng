<script setup lang="ts">
import { ref, onMounted } from 'vue'
import * as echarts from 'echarts'

const echartsRef = ref(null)
onMounted(() => {
  var myChart = echarts.init(echartsRef.value)
  const option1 = {
    title: {
      text: '昨日用户使用时段分布',
      left: 'center'
    },
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        type: 'cross'
      }
    },
    toolbox: {
      show: true,
      feature: {
        saveAsImage: {}
      }
    },
    xAxis: {
      type: 'category',
      boundaryGap: false,
      // prettier-ignore
      data: ['00:00', '01:15', '02:30', '03:45', '05:00', '06:15', '07:30', '08:45', '10:00', '11:15', '12:30', '13:45', '15:00', '16:15', '17:30', '18:45', '20:00', '21:15', '22:30', '23:45']
    },
    yAxis: {
      type: 'value',
      axisLabel: {
        formatter: '{value}'
      },
      axisPointer: {
        snap: true
      }
    },
    visualMap: {
      show: false,
      dimension: 0,
      pieces: [
        {
          lte: 6,
          color: 'green'
        },
        {
          gt: 6,
          lte: 8,
          color: 'red'
        },
        {
          gt: 8,
          lte: 14,
          color: 'green'
        },
        {
          gt: 14,
          lte: 17,
          color: 'red'
        },
        {
          gt: 17,
          color: 'green'
        }
      ]
    },
    series: [
      {
        name: '用户数量(单位:人次)',
        type: 'line',
        smooth: true,
        // prettier-ignore
        data: [300, 280, 250, 260, 270, 300, 550, 500, 400, 390, 380, 390, 400, 500, 600, 750, 800, 700, 600, 400]
      }
    ]
  }

  let time: Array<string> = []
  let data = []
  for (let hour = 0; hour < 24; hour++) {
    // for (let minutes = 0; minutes < 60; minutes++) {
    //   time.push(`${hour} : ${minutes}`)
    //   data.push(Math.floor(Math.random() * (50 - 20 + 1)) + 20)
    // }
    if (hour < 8 || hour > 20) {
      data.push(0)
    } else {
      data.push(Math.floor(Math.random() * (50 - 20 + 1)) + 20)
    }
    time.push(`${hour}`)
  }
  const option = {
    tooltip: {
      trigger: 'axis',
      position: function (pt: any) {
        return [pt[0], '10%']
      }
    },
    title: {
      left: 'center',
      text: '昨日用户使用时段分布'
    },
    toolbox: {
      feature: {
        dataZoom: {
          yAxisIndex: 'none'
        },
        restore: {},
        saveAsImage: {}
      }
    },
    xAxis: {
      type: 'category',
      boundaryGap: false,
      data: time
    },
    yAxis: {
      type: 'value',
      boundaryGap: [0, '100%']
    },
    dataZoom: [
      {
        type: 'inside',
        start: 0,
        end: 10
      },
      {
        start: 0,
        end: 10
      }
    ],
    series: [
      {
        name: 'Fake Data',
        type: 'line',
        symbol: 'none',
        sampling: 'lttb',
        itemStyle: {
          color: 'rgb(255, 70, 131)'
        },
        areaStyle: {
          color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
            {
              offset: 0,
              color: 'rgb(255, 158, 68)'
            },
            {
              offset: 1,
              color: 'rgb(255, 70, 131)'
            }
          ])
        },
        data: data
      }
    ]
  }

  myChart.setOption(option)
})
</script>

<template>
  <div ref="echartsRef" style="width: 710px; height: 450px"></div>
</template>

<style scoped></style>
