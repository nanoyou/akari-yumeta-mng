import router from '@/router'
import { useUserStore } from '@/stores'
import axios from 'axios'
import { ElMessage } from 'element-plus'

const baseURL = 'http://104.156.230.230:8080'

const instance = axios.create({
  baseURL,
  timeout: 1000
})

instance.interceptors.request.use(
  (config) => {
    const userStore = useUserStore()
    if (userStore.token) {
      config.headers.Authorization = userStore.token
    }
    return config
  },
  (err) => Promise.reject(err)
)

instance.interceptors.response.use(
  (res) => {
    // success
    if (res.data.code === 0) {
      ElMessage.success(res.data.message)
      router.push('/')
      return res
    }
    ElMessage.error(res.data.message)
    return Promise.reject(res.data)
  },
  (err) => {
    // fail
    console.log(err)
  }
)

export default instance
export { baseURL }
