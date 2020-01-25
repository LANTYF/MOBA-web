import axios from 'axios'
import Vue from 'vue'
import router from './router'
const http = axios.create({
  baseURL: process.env.VUR_APP_API_URL || '/admin/api/'
  // baseURL:'http://127.0.0.1:3000/admin/api/'
})

http.interceptors.request.use(config => {
  if (localStorage.token) {
    config.headers.Authorization = 'Bearer ' + localStorage.token
  }
  return config
}, err => {
  return Promise.reject(err)
})

http.interceptors.response.use(res => {
  return res
}, err => {
  if (err.response.data.message) {
    Vue.prototype.$message({
      type: 'error',
      message: err.response.data.message
    })
  }
  if (err.response.status === 401) {
    router.push('/login')
  }
  return Promise.reject(err)
})
export default http