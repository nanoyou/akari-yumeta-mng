<script setup lang="ts">
import { ref, onMounted } from 'vue'

onMounted(() => {
  password.value.style.display = 'none'
  basic.value.style.display = 'block'
})
const basic = ref()
const password = ref()

const handleSelect = (key: any) => {
  console.log(key)
  if (key === '0') {
    password.value.style.display = 'none'
    basic.value.style.display = 'block'
  } else {
    basic.value.style.display = 'none'
    password.value.style.display = 'block'
  }
}

// basic
const basicInfo = ref({ introduce: 'a', gender: 'b', nickname: 'c' })
const passwordForm = ref({ oldPassword: '', password: '', rePassword: '' })
</script>

<template>
  <div class="personalInfo">
    <div class="option">
      <el-menu
        default-active="0"
        class="el-menu-demo"
        mode="vertical"
        @select="handleSelect"
      >
        <el-menu-item index="0">基本资料</el-menu-item>
        <el-menu-item index="1">修改密码</el-menu-item>
      </el-menu>
    </div>
    <div class="change-info">
      <div ref="basic" class="basic">
        <el-form
          label-position="left"
          label-width="100px"
          :model="basicInfo"
          style="max-width: 460px"
        >
          <el-form-item label="昵称">
            <el-input v-model="basicInfo.nickname" />
          </el-form-item>
          <el-form-item label="性别">
            <el-input v-model="basicInfo.gender" />
          </el-form-item>
          <el-form-item label="个人介绍">
            <el-input v-model="basicInfo.introduce" />
          </el-form-item>
        </el-form>
      </div>
      <div ref="password" class="password">
        <el-form
          label-position="left"
          label-width="100px"
          :model="passwordForm"
          style="max-width: 460px"
        >
          <el-form-item label="原密码">
            <el-input type="password" v-model="passwordForm.oldPassword" />
          </el-form-item>
          <el-form-item label="新密码">
            <el-input type="password" v-model="passwordForm.password" />
          </el-form-item>
          <el-form-item label="确认密码">
            <el-input type="password" v-model="passwordForm.rePassword" />
          </el-form-item>
        </el-form>
        <div class="button">
          <el-button type="primary">修改密码</el-button>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.personalInfo {
  display: flex;
  justify-content: space-around;
  /* border: 1px solid black; */
  border-radius: 8px;
}
.change-info {
  width: 90%;
  height: 300px;
}
.option {
  font-size: 32px;
  align-content: space-around;
}
</style>
