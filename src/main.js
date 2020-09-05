// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'

import axios from 'axios'
import qs from 'qs'
import VueAxios from 'vue-axios'
import Vuex from 'vuex'
import store from './store/store'

import VueWechatTitle from 'vue-wechat-title';
import VueCookies from 'vue-cookies';
import fastclick from 'fastclick'



Vue.use(VueWechatTitle)

Vue.use(VueCookies)

Vue.use(VueAxios,axios,Vuex)

fastclick.attach(document.body)

// Vue.config.productionTip = false

import './styles/reset.css'
import './common/js/rem.js'



Vue.prototype.$qs = qs
axios.defaults.headers.post['Content-Type'] = 'application/json';
// axios.defaults.headers.common['X-REQUESTED-SO-TOKEN'] = localStorage.getItem("kelefu_loginToken");
axios.defaults.withCredentials = true;

// 添加请求拦截器
// axios.interceptors.request.use(function (config) {
//   // config.headers.common['X-REQUESTED-SO-TOKEN'] = localStorage.getItem("loginToken")
//   return config;
// },function (error) {
//   return Promise.reject(error)
// })

/* eslint-disable no-new */
new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app')
