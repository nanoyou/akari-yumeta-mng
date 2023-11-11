<script setup lang="ts"></script>

<template>
  <div>
    <el-container>
      <el-header class="header">
        <div class="flex">
          <div class="flex">
            <img class="logo" src="../../assets/logo.svg" alt="logo" />
            <div class="project-name">明光筑梦</div>
          </div>
          <h1 class="title">后台管理系统</h1>
        </div>
      </el-header>

      <el-container>
        <el-aside width="200px">
          <menu-bar></menu-bar>
        </el-aside>

        <el-container>
          <el-main>
            <router-view></router-view>
          </el-main>
          <el-footer class="footer"
            >Copyright &copy;
            <a href="https://github.com/nanoyou">nanoyou实训项目组</a>
          </el-footer>
        </el-container>
      </el-container>
    </el-container>
  </div>
</template>

<style scoped>
.footer {
  margin-top: 10px;
  text-align: center;
}
.project-name {
  margin-left: 12px;
  font-weight: 700;
}
.flex {
  display: flex;
  align-items: center;
}
.header {
  border-bottom: 1px solid #f4f4f4;
  /* background-color: skyblue; */
  /* mar */
  /* height: 120px; */
}
.logo {
  width: 50px;
  height: 50px;
}
.title {
  /* text-align: center; */
  margin-left: 80px;
  font-size: 22px;
}
</style>
