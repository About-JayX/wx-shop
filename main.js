import App from './App'
import store from '@/store/index.js'
import {
  $http
} from '@escook/request-miniprogram'
uni.$http = $http
$http.baseUrl = 'https://api-hmugo-web.itheima.net'
// 请求拦截器
$http.beforeRequest = function(options) {

}
// 响应拦截器
$http.afterRequest = function() {

}
// 封装全局的提示方法
uni.$showMsg = function(title = '加载失败', duration = 2000) {
  uni.showToast({
    title,
    duration,
    icon: 'error'
  })
}
// #ifndef VUE3
import Vue from 'vue'
Vue.config.productionTip = false
App.mpType = 'app'
const app = new Vue({
  store,
  ...App
})
app.$mount()
// #endif

// #ifdef VUE3
import {
  createSSRApp
} from 'vue'
export function createApp() {
  const app = createSSRApp(App)
  return {
    app
  }
}
// #endif
