<script setup lang="ts">
import { ref } from 'vue'
import { Check, Close } from '@element-plus/icons-vue'
import { ElMessage } from 'element-plus'

const volunteerData = [
  {
    id: '22',
    username: '胡芳',
    role: 'CHILD',
    nickname: '邵娟',
    gender: 'SECRET',
    usageDuration: 87,
    introduction: 'ipsum sunt nulla officia amet',
    avatarURL: 'http://localhost:5173/src/assets/logo.png',
    score: 100,
    state: true
  },
  {
    id: '7',
    username: '孙杰',
    nickname: '秦桂英',
    role: 'CHILD',
    gender: 'FEMALE',
    usageDuration: 21,
    avatarURL: 'http://localhost:5173/src/assets/logo.png',
    score: 78,
    introduction: 'in Ut Lorem id',
    state: true
  },
  {
    id: '64',
    username: '朱静',
    nickname: '钱芳',
    role: 'CHILD',
    gender: 'SECRET',
    usageDuration: 74,
    avatarURL: 'http://localhost:5173/src/assets/logo.png',
    introduction: 'laborum',
    score: 29,
    state: true
  },
  {
    id: '80',
    username: '汪磊',
    nickname: '吕秀英',
    role: 'CHILD',
    gender: 'MALE',
    usageDuration: 95,
    introduction: 'consequat aliquip velit in',
    score: 51,
    avatarURL: 'http://localhost:5173/src/assets/logo.png',
    state: true
  }
]

// format the gender display mode
const getGender = (genderStr: string) => {
  let gender: string
  switch (genderStr) {
    case 'MALE':
      gender = '男'
      break
    case 'FEMALE':
      gender = '女'
      break
    default:
      gender = '保密'
      break
  }
  return gender
}

const formatDuration = (sec: number) => {
  const formattedHours = String(Math.floor(sec / 3600)).padStart(2, '0')
  const formattedMinutes = String(Math.floor((sec % 3600) / 60)).padStart(
    2,
    '0'
  )
  const formattedSeconds = String(sec % 60).padStart(2, '0')
  return `${formattedHours}:${formattedMinutes}:${formattedSeconds}`
}

// disabled account
const stateChange = (row: any) => {
  ElMessage.success('已设置该账户状态为' + (row.state ? '可用' : '禁用'))
}

// view detail
const detailBoxVisible = ref(false)
const userDetail = ref({})
const viewDetail = (row: any) => {
  userDetail.value = row
  detailBoxVisible.value = true
}
</script>

<template>
  <div>
    <div class="search">条件搜索</div>
    <div class="table">
      <el-table :data="volunteerData" style="width: 100%" max-height="655px">
        <el-table-column type="index" label="序号" width="80" />
        <el-table-column prop="nickname" label="昵称" />
        <el-table-column prop="username" label="用户名" />
        <el-table-column prop="avatarURL" label="头像">
          <template #default="{ row }">
            <img class="avatar" :src="row.avatarURL" alt="avatar" />
          </template>
        </el-table-column>
        <el-table-column prop="gender" label="性别">
          <template #default="{ row }">
            <el-tag>{{ getGender(row.gender) }}</el-tag>
          </template>
        </el-table-column>
        <el-table-column prop="usageDuration" label="使用时长">
          <template #default="{ row }">
            {{ formatDuration(row.usageDuration) }}
          </template>
        </el-table-column>
        <el-table-column prop="state" label="账户是否可用">
          <template #default="{ row }">
            <el-switch
              v-model="row.state"
              :active-icon="Check"
              :inactive-icon="Close"
              @change="stateChange(row)"
            />
          </template>
        </el-table-column>
        <el-table-column fixed="right" label="操作">
          <template #default="{ row }">
            <el-button link type="primary" size="small" @click="viewDetail(row)"
              >志愿者详情</el-button
            >
          </template>
        </el-table-column>
      </el-table>
    </div>

    <div class="detail-dialog">
      <el-dialog v-model="detailBoxVisible" title="用户详情">
        <div class="detail">
          <el-form
            label-position="right"
            label-width="100px"
            :model="userDetail"
            style="max-width: 80%"
            disabled="true"
          >
            <el-form-item label="头像"
              ><el-avatar :size="100" :src="userDetail.avatarURL" />
            </el-form-item>
            <el-form-item label="姓名">
              <el-input v-model="userDetail.username" />
            </el-form-item>
            <el-form-item label="昵称">
              <el-input v-model="userDetail.nickname" />
            </el-form-item>
            <el-form-item label="性别">
              <el-input v-model="userDetail.gender" />
            </el-form-item>
            <el-form-item label="个人介绍">
              <el-input
                autosize="true"
                type="textarea"
                v-model="userDetail.introduction"
              />
            </el-form-item>
          </el-form>
        </div>
        <template #footer>
          <span class="dialog-footer">
            <el-button @click="detailBoxVisible = false">关闭</el-button>
          </span>
        </template>
      </el-dialog>
    </div>
  </div>
</template>

<style scoped>
.table {
  display: flex;
  justify-content: center;
}
.avatar {
  width: 50px;
  height: 50px;
  max-width: 100%;
  max-height: 100%;
}
.pagination {
  display: flex;
  margin-top: 25px;
  justify-content: center;
}
</style>
