<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { ElMessage, ElMessageBox } from 'element-plus'

// login user
let user = {
  username: 'admin',
  nickname: '管理员',
  gender: 'MALE',
  avatarURL: 'http://localhost:5173/src/assets/doge.jpg',
  password: '123456'
}

// genders
const genders = [
  {
    name: '男',
    value: 'MALE'
  },
  {
    name: '女',
    value: 'FEMALE'
  }
]

// cover change
const coverChange = (uploadFile: any) => {
  formUser.value.avatarURL = URL.createObjectURL(uploadFile.raw)
}

onMounted(() => {
  password.value.style.display = 'none'
  basic.value.style.display = 'block'
})
const basic = ref()
const password = ref()

const handleSelect = (key: any) => {
  if (key === '0') {
    password.value.style.display = 'none'
    basic.value.style.display = 'block'
  } else {
    basic.value.style.display = 'none'
    password.value.style.display = 'block'
  }
}

// base info
const formRef = ref()
const formUser = ref({ ...user })
const updateInfo = () => {
  ElMessageBox.confirm('是否确认修改资料?', '确认', {
    confirmButtonText: '确认',
    cancelButtonText: '取消',
    type: 'warning'
  })
    .then(() => {
      user = formUser.value
      ElMessage({
        type: 'success',
        message: '修改资料成功'
      })
    })
    .catch(() => {
      ElMessage({
        type: 'info',
        message: '取消修改资料'
      })
    })
}
const clearChange = () => {
  ElMessageBox.confirm('是否确认清除修改?', '确认', {
    confirmButtonText: '确认',
    cancelButtonText: '取消',
    type: 'warning'
  }).then(() => {
    formUser.value = user
    ElMessage({
      type: 'success',
      message: '已恢复改变内容'
    })
  })
}

// password
const passwordForm = ref({ oldPassword: '', password: '', rePassword: '' })
// validator
const ckLength = (str: string) => {
  return str.length >= 6 && str.length <= 18
}
const ckOldPassword = (rule: any, value: any, callback: any) => {
  if (!ckLength(value)) {
    return callback(new Error('密码长度为6-18位'))
  }
  callback()
}
const ckPassword = (rule: any, value: any, callback: any) => {
  if (!ckLength(value)) {
    return callback(new Error('密码长度为6-18位'))
  }
  callback()
}
const ckRePassword = (rule: any, value: any, callback: any) => {
  if (!ckLength(value)) {
    return callback(new Error('密码长度为6-18位'))
  }
  if (!(value === passwordForm.value.password)) {
    return callback(new Error('两次密码不一致'))
  }
  callback()
}
// rules
const rules = ref({
  oldPassword: [{ validator: ckOldPassword, trigger: 'blur' }],
  password: [{ validator: ckPassword, trigger: 'blur' }],
  rePassword: [{ validator: ckRePassword, trigger: 'blur' }]
})
// update
const updatePassword = async () => {
  await formRef.value.validate()
  // check success
  ElMessageBox.confirm('是否确认修改密码?', '确认', {
    confirmButtonText: '确认',
    cancelButtonText: '取消',
    type: 'warning'
  })
    .then(() => {
      if (passwordForm.value.oldPassword === user.password) {
        // password correct
        user.password = passwordForm.value.password
        ElMessage.success('修改密码成功.')
        passwordForm.value = { oldPassword: '', password: '', rePassword: '' }
      } else {
        ElMessage.error('原密码错误,请重试.')
      }
    })
    .catch(() => {
      ElMessage({
        type: 'info',
        message: '取消修改密码'
      })
    })
}
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
          <el-form-item label="头像">
            <el-upload
              class="cover-uploader"
              :show-file-list="false"
              auto-upload="false"
              :on-change="coverChange"
            >
              <img
                v-if="formUser.avatarURL"
                :src="formUser.avatarURL"
                class="news-cover"
              />
              <el-icon v-else class="avatar-uploader-icon news-cover border">
                <Plus />
              </el-icon> </el-upload
          ></el-form-item>
          <el-form-item label="用户名">
            <el-input v-model="formUser.username" />
          </el-form-item>
          <el-form-item label="昵称">
            <el-input v-model="formUser.nickname" />
          </el-form-item>
          <el-form-item label="性别">
            <el-select v-model="formUser.gender" clearable>
              <el-option
                v-for="item in genders"
                :key="item.value"
                :label="item.name"
                :value="item.value"
              />
            </el-select>
          </el-form-item>
        </el-form>
        <div class="button">
          <el-button type="primary" @click="updateInfo">修改资料</el-button>
          <el-button type="primary" @click="clearChange">清空修改</el-button>
        </div>
      </div>
      <div ref="password" class="password">
        <el-form
          ref="formRef"
          label-position="left"
          label-width="100px"
          :model="passwordForm"
          :rules="rules"
          style="max-width: 460px"
        >
          <el-form-item label="原密码" prop="oldPassword">
            <el-input type="password" v-model.trim="passwordForm.oldPassword" />
          </el-form-item>
          <el-form-item label="新密码" prop="password">
            <el-input type="password" v-model.trim="passwordForm.password" />
          </el-form-item>
          <el-form-item label="确认密码" prop="rePassword">
            <el-input type="password" v-model.trim="passwordForm.rePassword" />
          </el-form-item>
        </el-form>
        <div class="button">
          <el-button type="primary" @click="updatePassword">修改密码</el-button>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.news-cover {
  width: 150px;
  height: 150px;
  border-radius: 8px;
}
.border {
  border: 1px solid #dcdfe6;
}
.personalInfo {
  display: flex;
  justify-content: space-around;
  /* border: 1px solid black; */
  border-radius: 8px;
}
.change-info {
  width: 90%;
  height: 750px;
}
.option {
  font-size: 32px;
  align-content: space-around;
}
.basic .button {
  padding-left: 100px;
}
</style>
