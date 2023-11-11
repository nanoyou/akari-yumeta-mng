<script setup lang="ts">
import { ref } from 'vue'
import { ElMessage, ElMessageBox } from 'element-plus'
import '@vueup/vue-quill/dist/vue-quill.snow.css'
import '@vueup/vue-quill/dist/vue-quill.bubble.css'

// task data
const defaultData = [
  {
    id: 'UUID',
    taskName: '任务名称',
    taskUploaderID: 'UUID',
    createdTime: '1971-04-29 09:33:30',
    startTime: '2023-10-28',
    endTime: '2023-11-03',
    status: 'FINISHED',
    description:
      '任务描述任务描述任务描述任务描述任务描述任务描述任务描述任务描述任务描述任务描述任务描述',
    category: 'SCIENCE',
    bonus: 50,
    watchedCount: 30,
    videoURL:
      'https://www.bilibili.com/video/BV1cM41197ui/?spm_id_from=333.1007.tianma.1-3-3.click&vd_source=c3a440b243c0a6eacd88f1bfae1e80bb',
    videoDuration: 74
  }
]

const showData = ref(defaultData)

const categories = [
  {
    enum: 'AGRICULTURE',
    name: '农业'
  },
  {
    enum: 'ANIMAL_HUSBANDRY',
    name: '牧业'
  },
  {
    enum: 'LANGUAGE',
    name: '语言'
  },
  {
    enum: 'SCIENCE',
    name: '科学'
  },
  {
    enum: 'HYGIENE',
    name: '卫生'
  },
  {
    enum: 'SOCIETY',
    name: '社会'
  },
  {
    enum: 'HISTORY',
    name: '历史'
  },
  {
    enum: 'POLITICS',
    name: '政治'
  },
  {
    enum: 'OTHER',
    name: '其他'
  }
]

// get category
const getCategory = (categoryEnum: string) => {
  let item = categories.find((c) => categoryEnum === c.enum)
  if (item) {
    return item.name
  }
  return '其他'
}

const getFormatDate = (date: string) => {
  return date.substring(0, 10)
}

// delete task
const deleteNews = (id: number) => {
  ElMessageBox.confirm('删除后无法恢复,是否要删除该任务?', '警告', {
    confirmButtonText: '确认',
    cancelButtonText: '取消',
    type: 'warning'
  })
    .then(() => {
      console.log('删除 ===> ' + id)
      let index = defaultData.findIndex((item) => item.id === id)
      defaultData.splice(index, 1)
      query()
      ElMessage({
        type: 'success',
        message: '删除任务成功'
      })
    })
    .catch(() => {
      ElMessage({
        type: 'info',
        message: '取消删除'
      })
    })
}

// 添加、编辑Drawer
let drawerVisible = false
let drawerData = ref({})
const publish = () => {
  drawerData.value.startTime = dateValue.value[0]
  drawerData.value.endTime = dateValue.value[1]
  if (drawerData.value.id) {
    // update
    let index = defaultData.findIndex((item) => item.id === drawerData.value.id)
    defaultData[index] = { ...drawerData.value }
    ElMessage({
      type: 'success',
      message: '编辑任务成功'
    })
  } else {
    // add
    drawerData.value.watchedCount = 0
    drawerData.value.id =
      Math.round(Math.random() * 1000) +
      '-' +
      Math.round(Math.random() * 1000) +
      '-' +
      Math.round(Math.random() * 1000)
    const now = new Date()
    defaultData.push(drawerData.value)
    ElMessage({
      type: 'success',
      message: '新增任务成功'
    })
  }
  clearDrawer()
  drawerVisible = false
  query()
}

const cancel = () => {
  ElMessageBox.confirm('关闭后已编辑的内容会被重置,是否关闭?', 'Warning', {
    confirmButtonText: '关闭',
    cancelButtonText: '取消',
    type: 'warning'
  }).then(() => {
    clearDrawer()
  })
}

const clearDrawer = () => {
  drawerData.value = {}
  dateValue.value = []
  drawerVisible = false
}

// edit tasks
const dateValue = ref([])
const handleEdit = (row: any) => {
  if (row.id) {
    // update
    drawerData.value = { ...row }
    dateValue.value = [drawerData.value.startTime, drawerData.value.endTime]
  } else {
    // add
    drawerData.value = {
      title: '',
      content: '',
      coverImage: '',
      tag: ''
    }
  }
  drawerVisible = true
}

// news detail
const detailVisible = ref(false)
const taskDescription = ref({})
const viewDescription = (row: any) => {
  detailVisible.value = true
  taskDescription.value = row.description
}

// search box data
const searchCondition = ref({
  taskName: '',
  description: '',
  category: ''
})
const clear = () => {
  searchCondition.value = {
    title: '',
    tag: '',
    state: ''
  }
}
const query = () => {
  showData.value = defaultData.filter((item) => {
    // title
    if (searchCondition.value.taskName) {
      if (!item.taskName.includes(searchCondition.value.taskName)) {
        return false
      }
    }
    // tag
    if (searchCondition.value.description) {
      if (!item.description.includes(searchCondition.value.description)) {
        return false
      }
    }

    // category
    if (searchCondition.value.category) {
      if (!(item.category === searchCondition.value.category)) {
        return false
      }
    }
    return true
  })
}
</script>

<template>
  <div>
    <!-- search and add div -->
    <div class="head">
      <div class="search">
        <el-form
          :inline="true"
          :model="searchCondition"
          class="demo-form-inline"
        >
          <el-form-item label="任务名称">
            <el-input v-model="searchCondition.taskName" clearable />
          </el-form-item>
          <el-form-item label="任务描述">
            <el-input v-model="searchCondition.description" clearable />
          </el-form-item>
          <el-form-item label="任务分类">
            <el-select v-model="searchCondition.category" clearable>
              <el-option
                v-for="item in categories"
                :key="item.name"
                :label="item.name"
                :value="item.enum"
              />
            </el-select>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="clear">清空</el-button>
            <el-button type="primary" @click="query">查询</el-button>
          </el-form-item>
        </el-form>
      </div>
      <div class="add-news">
        <el-button type="success" @click="handleEdit">新增</el-button>
      </div>
    </div>

    <!-- data table -->
    <div class="table">
      <el-table :data="showData" style="width: 100%" max-height="655px">
        <el-table-column type="index" label="序号" width="80" />
        <el-table-column prop="taskName" label="任务名称" />
        <el-table-column prop="videoURL" label="视频地址">
          <template #default="{ row }">
            <el-link type="primary" :href="row.videoURL" target="_blank"
              >视频地址</el-link
            >
          </template>
        </el-table-column>
        <el-table-column prop="description" label="任务描述">
          <template #default="{ row }">
            <el-button link type="primary" @click="viewDescription(row)"
              >任务描述</el-button
            >
          </template>
        </el-table-column>
        <el-table-column prop="category" label="任务分类">
          <template #default="{ row }">
            <el-tag>{{ getCategory(row.category) }}</el-tag>
          </template>
        </el-table-column>

        <el-table-column prop="endTime" label="截止时间">
          <template #default="{ row }">
            {{ getFormatDate(row.endTime) }}
          </template>
        </el-table-column>

        <el-table-column prop="bonus" label="任务奖励积分" />
        <el-table-column prop="watchedCount" label="累计观看量" />

        <!-- button -->
        <el-table-column fixed="right" label="操作">
          <template #default="{ row }">
            <el-button link type="primary" size="small" @click="handleEdit(row)"
              >编辑</el-button
            >
            <el-button
              link
              type="danger"
              size="small"
              @click="deleteNews(row.id)"
              >删除</el-button
            >
          </template>
        </el-table-column>
      </el-table>
    </div>

    <!-- edit drawer -->
    <div class="drawer">
      <!--  添加、编辑Drawer -->
      <el-drawer
        v-model="drawerVisible"
        :title="drawerData.id ? '编辑' : '添加'"
        :before-close="cancel"
        direction="rtl"
        size="50%"
      >
        <div class="form-container">
          <el-form
            label-position="right"
            label-width="100px"
            :model="drawerData"
            style="max-width: 80%"
          >
            <el-form-item label="任务名称">
              <el-input v-model="drawerData.taskName" />
            </el-form-item>
            <el-form-item label="任务描述">
              <el-input v-model="drawerData.description" />
            </el-form-item>
            <el-form-item label="任务视频链接">
              <el-input v-model="drawerData.videoURL" />
            </el-form-item>
            <el-form-item label="奖励积分">
              <el-input v-model="drawerData.bonus" />
            </el-form-item>
            <el-form-item label="任务分类">
              <el-select v-model="drawerData.category" clearable>
                <el-option
                  v-for="item in categories"
                  :key="item.name"
                  :label="item.name"
                  :value="item.enum"
                />
              </el-select>
            </el-form-item>

            <el-form-item label="任务时间">
              <el-date-picker
                v-model="dateValue"
                type="daterange"
                range-separator="To"
                start-placeholder="开始时间"
                end-placeholder="截止时间"
                value-format="YYYY-MM-DD"
                :size="size"
              />
            </el-form-item>
          </el-form>
        </div>
        <template #footer="">
          <div class="button">
            <el-button type="primary" class="publish-btn" @click="publish">{{
              drawerData.id ? '修改' : '添加'
            }}</el-button>
            <el-button type="info" @click="cancel">取消</el-button>
          </div>
        </template>
      </el-drawer>
    </div>

    <!-- news detail -->
    <div class="news-detail">
      <el-dialog v-model="detailVisible" title="新闻内容" width="50%">
        <div v-html="taskDescription"></div>
        <template #footer>
          <span class="dialog-footer">
            <el-button type="primary" @click="detailVisible = false">
              关闭
            </el-button>
          </span>
        </template>
      </el-dialog>
    </div>
  </div>
</template>

<style lang="less" scoped>
.table {
  display: flex;
  justify-content: center;
}

.cover {
  width: 50px;
  height: 50px;
  max-width: 100%;
  max-height: 100%;
}
.news-cover {
  width: 200px;
  height: 200px;
}
.form-container {
  width: 100%;
}

.editor {
  width: 100%;
}

.ql-editor {
  min-height: 200px;
}

.button {
  padding-left: 50px;
  display: flex;
}

.publish-btn {
  margin-right: 50px;
}

.head {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  .add-news {
    padding-right: 135px;
    display: flex;
    justify-content: flex-end;
  }
}
</style>
