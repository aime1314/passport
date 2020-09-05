<template>
  <div>
       <div class="wxloadingDiv">
          <div class="loadingPic"></div>
       </div>
  </div>
</template>

<script>
import { debug } from 'util'
export default {
  name: 'WXShouQuan',
  data () {
    return {
      apiurl: 'https://app.' + location.hostname.split(".")[1]+"."+location.hostname.split(".")[2], // Api接口
      domainname: location.host.split(".")[1]+"."+location.host.split(".")[2], //一级域名
    }
  },
  created () {
    var code = this.getChannge('code');
    this.wxLogin(code, localStorage.getItem('channel'))
  },
  methods: {
    // 截取URL参数
    getChannge: function (name) {
      // backurl特殊处理
      if(name=="backurl"){
        var str = location.search.substr(1);
        if(str.indexOf(name)>-1){
          var index = str.indexOf(name);
          str = str.substr(index + 8,str.length);
          return decodeURIComponent(str);
        }
      } else {
        return (
          decodeURIComponent(
            (new RegExp('[?|&]' + name + '=' + '([^&;]+?)(&|#|;|$)').exec(
              location.href
            ) || [, ''])[1].replace(/\+/g, '%20')
          ) || null
        )
      }
    },
    // 调用客乐芙微信登陆接口
    wxLogin (code, channel) {
      // alert("wx_channel="+channel)
      this.axios({
        method: 'post',
        url: this.apiurl + '/yangjian/mem/wxlogin',
        data: {'wxcode': code, 'channel': channel}
      })
        .then(res => {
          // 当code=101时，前端需要存储openId，并跳回登陆页
          if (res.data.code == '101') {
            // 存储OPNID
            localStorage.setItem('openId', res.data.result.openId);
            this.$store.commit('getOpenId',res.data.result.openId)
            // 记录已授权
            localStorage.setItem('isWxShouQuan_' + channel.toUpperCase(), 1);
            // 跳回登录页
            window.location.href = '/login?channel=' + channel.toUpperCase() +"&backurl=" + localStorage.getItem('backurl')
          } else if (res.data.code == '100') {
            // 缓存登陆TOKEN
            // localStorage.setItem(channel + '_loginToken', res.data.result.loginToken); // token
            $cookies.set(channel.toUpperCase()+'_loginToken', res.data.result.loginToken,'','/', this.domainname);
            // 判断  backurl 是否带有 ？
            window.location.href = localStorage.getItem('backurl') 
            // window.location.href = this.$store.state.backurl
          } else {
            alert(res.data.msg);
          }
        }).catch(error => {
          console.log(error);
        })
    }

  }
}
</script>
