<script setup lang="ts">
import { ref } from 'vue'
import { Check, Close } from '@element-plus/icons-vue'
import { ElMessage, ElMessageBox } from 'element-plus'
import { QuillEditor } from '@vueup/vue-quill'
import '@vueup/vue-quill/dist/vue-quill.snow.css'
import '@vueup/vue-quill/dist/vue-quill.bubble.css'

// 新闻数据
const defaultData = [
  {
    id: '22',
    title: '国内-新闻标题',
    publishTime: '2023-10-19',
    content:
      '<h1>一级标题</h1><h2>二级标题</h2><h3>三级标题</h3><p>正文</p><p><strong>粗体</strong></p><p><em>斜体</em></p><p><u>下划线</u></p><p><a href="http://localhost:5173/" rel="noopener noreferrer" target="_blank"><u>http://localhost:5173/</u></a></p>',
    coverImage: 'http://localhost:5173/src/assets/logo.png',
    tag: '国内新闻',
    state: true
  },
  {
    id: '23',
    title: '国外-新闻标题',
    publishTime: '2023-11-08',
    content:
      '<h1>一级标题</h1><h2>二级标题</h2><h3>三级标题</h3><p><em>有序列表：</em></p><ol><li>有序列表</li><li>有序列表</li></ol><p><em>无序列表：</em></p><ul><li>无序列表</li><li>无序列表</li></ul>',
    coverImage: 'http://localhost:5173/src/assets/logo.png',
    tag: '国际新闻',
    state: false
  }
]

const showData = ref(defaultData)

// 改变发布状态
const stateChange = (row: any) => {
  ElMessage.success('已' + (row.state ? '开启' : '关闭') + '推送')
}

// 删除新闻
const deleteNews = (id: number) => {
  ElMessageBox.confirm('删除后无法恢复,是否要删除该新闻?', '警告', {
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
        message: '删除新闻成功'
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
const imageUrl = ref('')
const editor = ref()
const publish = () => {
  drawerData.value.coverImage = imageUrl.value
  if (drawerData.value.id) {
    // update
    let index = defaultData.findIndex((item) => item.id === drawerData.value.id)
    defaultData[index] = { ...drawerData.value }
    ElMessage({
      type: 'success',
      message: '编辑新闻成功'
    })
  } else {
    // add
    drawerData.value.id =
      Math.round(Math.random() * 1000) +
      '-' +
      Math.round(Math.random() * 1000) +
      '-' +
      Math.round(Math.random() * 1000)
    drawerData.value.state = true
    const now = new Date()
    drawerData.value.publishTime =
      now.getFullYear() +
      '-' +
      (now.getMonth() + 1 < 10
        ? '0' + (now.getMonth() + 1)
        : now.getMonth() + 1) +
      '-' +
      now.getDate()
    defaultData.push(drawerData.value)
    ElMessage({
      type: 'success',
      message: '新增新闻成功'
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
  imageUrl.value = ''
  editor.value.setHTML('')
  drawerVisible = false
}

// edit news
const handleEdit = (row: any) => {
  if (row.id) {
    // update
    drawerData.value = { ...row }
    imageUrl.value = row.coverImage
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

// cover change
const coverChange = (uploadFile: any) => {
  imageUrl.value = URL.createObjectURL(uploadFile.raw)
}

// news detail
const detailVisible = ref(false)
const newsDetail = ref({})
const viewDetails = (row: any) => {
  detailVisible.value = true
  newsDetail.value = row.content
}

// search box data
const searchCondition = ref({
  title: '',
  tag: '',
  state: ''
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
    if (searchCondition.value.title) {
      if (!item.title.includes(searchCondition.value.title)) {
        return false
      }
    }
    // tag
    if (searchCondition.value.tag) {
      if (!item.tag.includes(searchCondition.value.tag)) {
        return false
      }
    }

    // state
    if (searchCondition.value.state) {
      if (searchCondition.value.state === 'true' && !item.state) {
        return false
      }
      if (searchCondition.value.state === 'false' && item.state) {
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
          <el-form-item label="新闻标题">
            <el-input v-model="searchCondition.title" clearable />
          </el-form-item>
          <el-form-item label="标签">
            <el-input v-model="searchCondition.tag" clearable />
          </el-form-item>
          <el-form-item label="是否推送">
            <el-select v-model="searchCondition.state" clearable>
              <el-option label="推送" value="true" />
              <el-option label="不推送" value="false" />
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
        <el-table-column prop="title" label="标题" />
        <el-table-column prop="coverImage" label="封面">
          <template #default="{ row }">
            <img class="cover" :src="row.coverImage" alt="coverImage" />
          </template>
        </el-table-column>
        <el-table-column prop="tag" label="标签">
          <template #default="{ row }">
            <el-tag>{{ row.tag }}</el-tag>
          </template>
        </el-table-column>
        <el-table-column prop="content" label="内容详情">
          <template #default="{ row }">
            <el-button link type="primary" @click="viewDetails(row)"
              >查看新闻内容</el-button
            >
          </template>
        </el-table-column>
        <el-table-column prop="state" label="是否推送">
          <template #default="{ row }">
            <el-switch
              v-model="row.state"
              :active-icon="Check"
              :inactive-icon="Close"
              @change="stateChange(row)"
            />
          </template>
        </el-table-column>

        <el-table-column prop="publishTime" label="发布时间" />
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
            <el-form-item label="标题">
              <el-input v-model="drawerData.title" />
            </el-form-item>
            <el-form-item label="标签">
              <el-input v-model="drawerData.tag" />
            </el-form-item>
            <el-form-item label="新闻封面">
              <el-upload
                class="cover-uploader"
                :show-file-list="false"
                auto-upload="false"
                :on-change="coverChange"
              >
                <img v-if="imageUrl" :src="imageUrl" class="news-cover" />
                <el-icon v-else class="avatar-uploader-icon news-cover border">
                  <Plus />
                </el-icon> </el-upload
            ></el-form-item>
            <el-form-item label="新闻内容">
              <div class="editor">
                <quill-editor
                  ref="editor"
                  theme="snow"
                  v-model:content="drawerData.content"
                  contentType="html"
                >
                </quill-editor>
              </div>
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
        <div v-html="newsDetail"></div>
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
  border-radius: 8px;
}
.border {
  border: 1px solid #dcdfe6;
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
