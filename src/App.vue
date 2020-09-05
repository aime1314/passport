<template>
  <div id="app">
    <router-view v-wechat-title="$route.meta.title"   />
  </div>
</template>

<script>
export default {
  name: 'App',
  created(){
    //在页面加载时读取sessionStorage里的状态信息
    if (sessionStorage.getItem("LOGINSTORE") ) {
    this.$store.replaceState(Object.assign({}, this.$store.state,JSON.parse(sessionStorage.getItem("LOGINSTORE"))))
    }
    //在页面刷新时将vuex里的信息保存到sessionStorage里
    window.addEventListener("beforeunload",()=>{
    sessionStorage.setItem("LOGINSTORE",JSON.stringify(this.$store.state))
    })
  }
}
</script>
