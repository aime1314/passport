import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

const login = (resolve) => {
  import('@/page/Login/login').then((module) => {
    resolve(module)
  })
}
/*微信授权*/
const passport = (resolve) => {
  import('@/page/WXShouQuan').then((module) => {
    resolve(module)
  })
}

/*微信授权*/
const thirdlogin = (resolve) => {
  import('@/page/Thirdlogin/thirdlogin').then((module) => {
    resolve(module)
  })
}


/*注册协议介绍*/
const registration = (resolve) => {
  import('@/page/Login/registrationProtocol').then((module) => {
    resolve(module)
  })
}

/*隐私协议介绍*/
const useration = (resolve) => {
  import('@/page/Login/userProtocol').then((module) => {
    resolve(module)
  })
}

/*超级会员服务介绍*/
const vipation = (resolve) => {
  import('@/page/Login/vipProtocol').then((module) => {
    resolve(module)
  })
}
vipation
export default new Router({
  mode: 'history',//地址栏去 #
  // hashbang: false,
  routes: [
    {
      path: '/',
      name: 'login',
      component: login
    },
    {
      path: '/login',
      name: 'login',
      meta:{
        title: '登陆页面',
      },
      component: login
    },
    {
      path: '/thirdlogin',
      name: 'thirdlogin',
      meta:{
        title: '登陆页面',
      },
      component: thirdlogin
    },
    {
      path: '/passport',
      name: 'passport',
      component: passport
    },
    {
      path: '/registration',
      name: 'registration',
      meta:{
        title: '客乐芙用户服务协议',
      },
      component: registration
    },
    {
      path: '/useration',
      name: 'useration',
      meta:{
        title: '客乐芙用户隐私协议',
      },
      component: useration
    },
    {
      path: '/vipation',
      name: 'vipation',
      meta:{
        title: '客乐芙超级会员服务协议',
      },
      component: vipation
    }
  
  ]
})

