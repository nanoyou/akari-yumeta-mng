<script setup lang="ts">
import { ref, onMounted } from 'vue'
import * as echarts from 'echarts'

const echartsRef = ref(null)
onMounted(() => {
  // dynamic
  var myChart = echarts.init(echartsRef.value)
  function randomData() {
    now = new Date(+now + oneSecond)
    value = value + Math.floor(Math.random() * 11) - 5
    if (value < 0) {
      value = 0
    }
    return {
      name: now.toString(),
      value: [
        [now.getHours(), now.getMinutes() + 1, now.getSeconds()].join(':'),
        value
      ]
    }
  }
  let data: any = []
  let now = new Date(+new Date() - 60 * 1000)
  // let oneDay = 24 * 3600 * 1000
  let oneSecond = 1000
  let value = 20
  for (var i = 0; i < 60; i++) {
    data.push(randomData())
  }
  let option = {
    title: {
      text: '当前应用访问量',
      left: 'center'
    },
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        animation: false
      }
    },
    xAxis: {
      type: 'category',
      data: data.map(function (item: any) {
        var date = new Date(item.name)
        return (
          (date.getHours() < 10 ? '0' + date.getHours() : date.getHours()) +
          ':' +
          (date.getMinutes() < 10
            ? '0' + date.getMinutes()
            : date.getMinutes()) +
          ':' +
          (date.getSeconds() < 10 ? '0' + date.getSeconds() : date.getSeconds())
        )
      }),
      splitLine: {
        show: false
      }
    },
    yAxis: {
      type: 'value',
      boundaryGap: [0, '100%'],
      splitLine: {
        show: false
      }
    },
    series: [
      {
        name: '访问量',
        type: 'line',
        showSymbol: false,
        data: data.map(function (item: any) {
          return item.value[1]
        })
      }
    ]
  }
  setInterval(function () {
    data.shift()
    data.push(randomData())
    myChart.setOption({
      xAxis: {
        data: data.map(function (item: any) {
          var date = new Date(item.name)
          return (
            (date.getHours() < 10 ? '0' + date.getHours() : date.getHours()) +
            ':' +
            (date.getMinutes() < 10
              ? '0' + date.getMinutes()
              : date.getMinutes()) +
            ':' +
            (date.getSeconds() < 10
              ? '0' + date.getSeconds()
              : date.getSeconds())
          )
        })
      },
      series: [
        {
          data: data.map(function (item: any) {
            return item.value[1]
          })
        }
      ]
    })
  }, 1000)
  myChart.setOption(option)
})
</script>

<template>
  <div ref="echartsRef" style="width: 44.6875rem; height: 28.125rem"></div>
</template>

<style scoped></style>
