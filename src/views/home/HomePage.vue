<script setup lang="ts"></script>

<template>
  <div class="screen1">
    <div class="top">
      <ul>
        <li>
          <!-- <use-period></use-period> -->
        </li>
        <li>
          <div class="statistics">
            <div class="part">
              <div class="title">捐款总量</div>
              <span class="data">24624<span class="unit"> 元</span></span>
            </div>
            <div class="part">
              <div class="title">留守儿童数量</div>
              <span class="data">732<span class="unit"> 人</span></span>
            </div>
            <div class="part">
              <div class="title">志愿者数量</div>
              <span class="data">273<span class="unit"> 人</span></span>
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
          <li>月均捐款用户趋势</li>
          <li>
            <donated-children></donated-children>
          </li>
        </ul>
      </div>
      <div class="center">
        <user-count></user-count>
        <!-- <use-period></use-period> -->
      </div>
      <div class="right">
        <ul>
          <li>
            <donation-trend></donation-trend>
          </li>
          <li>
            <donation-amount></donation-amount>
          </li>
        </ul>
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
    .left,
    .right {
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
    .center {
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
