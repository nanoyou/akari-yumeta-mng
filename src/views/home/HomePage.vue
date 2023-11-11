<script setup lang="ts">
import { ref, onMounted } from 'vue'
const hotKeys = ref()
onMounted(() => {
  // TODO:模拟从后端获取到请求结果
  setTimeout(() => {
    hotKeys.value = [
      { key: '习近平谈治国理政', count: 98 },
      { key: '换季骤冷', count: 63 },
      { key: '健康饮食、均衡饮食', count: 62 },
      { key: '应对自然灾害', count: 60 },
      { key: '食品安全', count: 54 },
      { key: '上大学', count: 32 },
      { key: '考试成绩', count: 20 },
      { key: '哲学思想在生活中的体现', count: 12 }
    ]
  }, 500)
})
</script>

<template>
  <div class="screen1">
    <div class="top">
      <ul>
        <li>
          <donated-children></donated-children>
        </li>
        <li>
          <div class="statistics">
            <div class="part">
              <div class="title">捐款总量</div>
              <span class="data">64624<span class="unit"> 元</span></span>
            </div>
            <div class="part">
              <div class="title">留守儿童数量</div>
              <span class="data">732<span class="unit"> 人</span></span>
            </div>
            <div class="part">
              <div class="title">志愿者数量</div>
              <span class="data">291<span class="unit"> 人</span></span>
            </div>
            <div class="part">
              <div class="title">捐助者数量</div>
              <span class="data">934<span class="unit"> 人</span></span>
            </div>
          </div>
        </li>
        <li>
          <goods-category></goods-category>
        </li>
      </ul>
    </div>

    <div class="middle">
      <div class="left">
        <ul>
          <li>
            <donation-trend></donation-trend>
          </li>
          <li>
            <donation-amount></donation-amount>
          </li>
        </ul>
      </div>
      <div class="center">
        <visit-record></visit-record>
      </div>
      <div class="right">
        <div class="hot-search">
          <div class="title">今日热词</div>
          <ul>
            <li v-for="(item, index) in hotKeys" :key="index">
              <span class="num">{{ index + 1 }}</span>
              {{ item.key }}
              <span class="count">{{ item.count }}</span>
            </li>
          </ul>
        </div>
      </div>
    </div>

    <div class="bottom">
      <ul>
        <li>
          <age-ratio></age-ratio>
        </li>
        <li>
          <geo-distribution></geo-distribution>
        </li>
        <li>
          <course-type></course-type>
        </li>
      </ul>
    </div>
  </div>
</template>

<style lang="less" scoped>
* {
  margin: 0px 0px;
  padding: 0px 0px;
  box-sizing: border-box;
}
li {
  list-style: none;
}

.screen1 {
  background-color: #f7f8fa;
  .top {
    height: 200px;
    ul {
      display: flex;
      justify-content: space-between;
      height: 90%;
      li {
        width: 24%;
        background-color: #fff;
      }
      li:nth-child(2) {
        width: 50%;
      }
    }
    .statistics {
      display: flex;
      justify-content: space-around;
      height: 100%;
      div {
        width: 23%;
        background-color: #fff;
      }
      .part {
        margin: 35px 0px;
        padding-left: 18px;
        border: 1px solid gray;
        border-radius: 8px;
        // text-align: center;
        display: flex;
        flex-direction: column;
        justify-content: center;
        .title {
          font-size: 20px;
          width: 100%;
        }
        .data {
          color: #409eff;
          font-size: 34px;
        }
        .unit {
          font-size: 22px;
          color: black;
        }
      }
    }
  }
  .middle {
    display: flex;
    justify-content: space-between;
    height: 450px;
    .left {
      width: 24%;
      ul {
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        height: 100%;
      }
      ul li {
        height: 48%;
        padding-top: 10px;
        background-color: #fff;
      }
    }
    .right {
      width: 24%;
      .hot-search {
        height: 100%;
        padding-top: 20px;
        padding-bottom: 70px;
        background-color: #fff;
        .title {
          padding-left: 30px;
          font-size: 20px;
          font-weight: 700;
        }
        ul {
          height: 100%;
          display: flex;
          margin-top: 20px;
          flex-direction: column;
          justify-content: space-between;
          li {
            margin: 0px 30px;
            padding-bottom: 5px;
            font-size: 20px;
            color: #000000;
            border-bottom: 2px solid #f7f8fa;
            .num {
              color: #ee843d;
            }
            .count {
              font-size: 14px;
              color: #8e8e8e;
            }
          }
          li:nth-child(n + 1):nth-child(-n + 3) {
            .num {
              color: #ff2149;
            }
          }
        }
      }
    }
    .center {
      padding-top: 10px;
      width: 50%;
      background-color: #fff;
    }
  }

  .bottom {
    margin: 20px 10px;
    ul {
      display: flex;
      justify-content: space-between;
      li {
        width: 20%;
        height: 250px;
        margin-bottom: 10px;
        background-color: #fff;
      }
      li:nth-child(2) {
        width: 58%;
      }
    }
  }
}
</style>
