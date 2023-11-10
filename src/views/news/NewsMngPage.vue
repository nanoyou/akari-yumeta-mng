<script setup lang="ts">
import { ref } from 'vue'
import { Check, Close } from '@element-plus/icons-vue'
import { ElMessage, ElMessageBox } from 'element-plus'
import { QuillEditor } from '@vueup/vue-quill'
import '@vueup/vue-quill/dist/vue-quill.snow.css'
import '@vueup/vue-quill/dist/vue-quill.bubble.css'

// 新闻数据
const newsData = ref({})
newsData.value = [
  {
    id: '22',
    title: '新闻标题',
    publishTime: '2023-10-19',
    content: 'content',
    coverImage: 'http://localhost:5173/src/assets/logo.png',
    tag: '实时新闻',
    state: true
  }
]

// 改变发布状态
const stateChange = (row: any) => {
  console.log(row.id + '  ' + row.state)
  ElMessage.success('已' + (row.state ? '开启' : '关闭') + '推送')
}

// 删除新闻
const deleteNews = (id: number) => {
  ElMessageBox.confirm('是否要删除该新闻?', 'Warning', {
    confirmButtonText: '确认',
    cancelButtonText: '取消',
    type: 'warning'
  })
    .then(() => {
      console.log('删除 ===> ' + id)
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
const drawerVisible = ref(false)
const drawerData = ref({})
const imageUrl = ref('')
const editor = ref()
const publish = () => {
  // TODO:send request, add or update
  if (!drawerData.value.id) {
    drawerData.value.id = 100
  }
  drawerData.value.coverImage = imageUrl.value
  newsData.value.push(drawerData.value)
  clearDrawer()
  drawerVisible.value = false
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
  drawerVisible.value = false
}

// edit news
const handleEdit = (row: any) => {
  console.log(row)
  if (row.id) {
    drawerData.value = row
    imageUrl.value = row.coverImage
  }
  drawerVisible.value = true
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
  console.log(row.content)
}
</script>

<template>
  <div>
    <!-- search and add div -->
    <div class="head">
      <div class="search">条件搜索</div>
      <div class="add-news">
        <el-button type="primary" @click="handleEdit">新增</el-button>
      </div>
    </div>

    <!-- data table -->
    <div class="table">
      <el-table :data="newsData" style="width: 100%" max-height="655px">
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
                <el-icon v-else class="avatar-uploader-icon">
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

<style scoped>
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
  padding-right: 100px;
  display: flex;
  justify-content: space-between;
}
</style>
