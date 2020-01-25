import Vue from 'vue'
import App from './App.vue'
import router from './router'
import './assets/css/main.scss'
import 'normalize.css'
import VueAwesomeSwiper from 'vue-awesome-swiper'
import 'swiper/dist/css/swiper.css'
import http from './network/http'
import iconfont from './assets/css/iconfont/iconfont.css'
import Vue2Editor from "vue2-editor";

Vue.use(Vue2Editor);
Vue.use(VueAwesomeSwiper)
Vue.config.productionTip = false

Vue.prototype.$http = http

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
