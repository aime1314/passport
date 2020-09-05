<template>
  <div class="loginBox" :class="channelStyle" v-show="loginShowPage">
    <div class="loginBanner">
      
    </div>
    <bocLogin v-if="channel == 'BOC' ||channel == 'boc'"></bocLogin>
    <div class="loginMsgBox">
      <div>
        <em class="iconbox icon_tel"></em>
        <input
          placeholder="请输入手机号"
          class="tel"
          type="tel"
          name
          pattern="[0-9]*"
          v-model="telVal"
          maxlength="11"
          @keyup="showtel($event)"
        >
      </div>
      <div>
        <em class="iconbox icon_mail"></em>
        <input
                  placeholder="请输入验证码"
          class="yzm"
          type="text"
          name
          v-model="yzmVal"
          maxlength="6"
          @change="yzbtnStatus"
        >
        <span @click="zymshow" :class="{disable:!logintelFlag}" v-if="sendAuthCode">获取验证码</span>
        <span
          @click="zymshow"
          class="disable"
          :class="{disable:!logintelFlag}"
          v-show="!sendAuthCode"
        >重新获取{{auth_time}}秒</span>
      </div>
    </div>
    <button class="loginbtn" :class="{disable:!loginBtnFlag}" @click="loginShow">{{loginTitle}}</button>
    <div class="loginrulue">
      <input type="checkbox" v-model="serverbookFlag" style="vertical-align: middle;"> 未注册用户将自动注册客乐芙账号，勾选表示您已同意<br><em @click="goProtocol">《客乐芙用户服务协议》</em><em @click="goProtocol2">《客乐芙隐私权政策》</em>
      <div class="toast" v-show="toastShow">{{toastText}}</div>
    </div>
  </div>
</template>

<script>
import bocLogin from "@/components/channel/bocshow"

export default {
  name: 'loginName',
  data () {
    return {
      toastShow: false, // 控制是否显示报错提示框,
      toastText: '', // 报错提示框内容,
      sendAuthCode: true /* 布尔值，通过v-show控制显示‘获取按钮’还是‘倒计时’ */,
      auth_time: 0 /* 倒计时 计数器 */,
      isWxShouQuan: 0, // 1 表示已进行授权，0表示未进行微信授权
      wxUrl: 'https://open.weixin.qq.com/connect/oauth2/authorize',
      loginShowPage: false, // 登录页是否显示
      zyinputFlag: false, // 验证码输入框
      telVal: '', // 手机号
      yzmVal: '', // 验证码
      loginToken: '', //
      openId: '',
      channel: '', // 渠道号
      channelStyle:'base',//渠道定制登录样式
      loginBtnFlag: true, // 登陆按钮是否可点击
      logintelFlag: false, // 手机号是否输入
      loginyzmFlag: false, // 验证码是否可点击
      serverbookFlag:true, //同意服务协议
      loginTitle:'立即登录',
      appid: 'wx3bd94d3a0ee86c01', // 公众号的唯一标识（测试：wxa6718ad0b10bf642    生产：wx3bd94d3a0ee86c01）
      redirect_uri: 'https://cmall.colourfulchina.com/passport/', // 授权后重定向的回调链接地址，请使用 urlEncode 对链接进行处理
      response_type: '', // 返回类型，请填写code
      scope: 'snsapi_base', // 应用授权作用域， （不弹出授权页面，直接跳转，只能获取用户openid），snsapi_userinfo （弹出授权页面，可通过openid拿到昵称、性别、所在地。并且， 即使在未关注的情况下，只要用户授权，也能获取其信息 ）
      state: '', // 重定向后会带上state参数，开发者可以填写a-zA-Z0-9的参数值，最多128字节
      apiurl: 'https://app.' + location.hostname.split(".")[1]+"."+location.hostname.split(".")[2], // Api接口
      domainname: location.host.split(".")[1]+"."+location.host.split(".")[2], //一级域名
    }
  },
  created () {
    localStorage.setItem('backurl', '');
    localStorage.setItem('channel', '');
    this.channel = this.getChannge('channel');
    var backurl = this.getChannge('backurl');
    localStorage.setItem('backurl', backurl);
    localStorage.setItem('channel', this.channel);
    this.$store.commit('getChannel', this.channel)
    this.$store.commit('getBackurl', this.getChannge('backurl'))
    this.isWxShouQuan = localStorage.getItem('isWxShouQuan_' + this.channel.toUpperCase());
     if(this.channel == 'BOC' ||this.channel == 'boc'){
        this.channelStyle = 'boc'
        this.loginTitle = '立即开启尊贵之旅'
    }else if(this.channel == 'CGBCHINA' ||this.channel == 'cgbchina'){
       this.channelStyle = 'cgbchina'
       this.loginTitle = '登录 →'
    } 
    this.loadingPage();
    
  },
  components:{
    bocLogin
  },
  methods: {
    // 报错提示框的方法
    toast (str) {
      let v = this
      v.toastText = str
      v.toastShow = true
      setTimeout(function () {
        v.toastShow = false
      }, 1500)
    },
    // 获取倒计时的方法
    getAuthCode: function () {
      if(this.sendAuthCode){
         this.auth_time = 59
        var auth_timetimer = setInterval(() => {
        this.auth_time--
        if (this.auth_time <= 0) {
          this.sendAuthCode = true;
          clearInterval(auth_timetimer);
        }
      }, 1000)
      this.sendAuthCode = false
      }
    },

    // 跳到用户注册页面
    goProtocol () {
      this.$router.push({ name: 'registration' });
    },
    goProtocol2 () {
      this.$router.push({ name: 'useration' });
    },
    // 获取微信code,静默授权
    wxShouQuan () {
      window.location.href =
        this.wxUrl +
        '?appid=' +
        this.appid +
        '&redirect_uri=' +
        this.redirect_uri +
        '&response_type=code&scope=' +
        this.scope +
        '&state=123#wechat_redirect'
      // console.log(window.location.href);
    },
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

    // 加载页面
    loadingPage () {
      // 1.判断是否登陆，请求心跳接口
      this.axios({
        method: 'post',
        url: this.apiurl + '/yangjian/mem/heartBeat',
        headers: {
          'X-REQUESTED-SO-TOKEN': $cookies.get(localStorage.getItem('channel') + '_loginToken')
        }
      })
        .then(res => {
          // 1.1 100表示已登录，跳回着陆页
          if (res.data.code == '100') {
            // 判断  backurl 是否带有 ？
            window.location.href = localStorage.getItem('backurl') 
            // window.location.href=this.$store.state.backurl
          }
          // 1.2 200表示登陆失效 调用登陆接口
          else if (res.data.code == '200') {
            // 2 判断微信内外方法
            let ua = window.navigator.userAgent.toLowerCase()
            if (ua.match(/MicroMessenger/i) == 'micromessenger') {
              // 2.1 微信内
              if (this.isWxShouQuan != 1) {
                this.wxShouQuan();
              } else {
                // 显示登陆框
                this.loginShowPage = true;
              }
            } else {
              // 2.2微信外
              this.loginShowPage = true;
            }
          }
        })
        .catch(error => {
          console.log(error)
        })
    },

    // 验证手机号的正则匹配方法
    showtel: function () {
      if (this.telVal.match('^1[2|3|4|5|6|7|8|9][0-9]{9}$')) {
        this.logintelFlag = true
        // this.loginstaus()
      } else {
        this.logintelFlag = false
        // this.loginstaus()
      }
    },
    // 获取验证码的方法
    zymshow: function () {
      if (this.logintelFlag) {
        this.getAuthCode()
        this.axios
          .post(
            this.apiurl + '/yangjian/exercise/createSmsCode?phone=' + this.telVal,
            {
              headers: { 'Content-type': 'application/x-www-form-urlencoded' }
            }
          )
          .then(res => {
            if (res.data.code == '100') {
              this.loginyzmFlag = true
              this.loginBtnFlag = true
              // this.loginstaus()
            } else if (res.data.code == '200') {
              this.toast(res.data.msg)
            }
          })
          .catch(error => {
            console.log(error)
            this.loginyzmFlag = false
            // this.loginstaus()
          })
      } else {
        this.loginyzmFlag = false
         this.toast('请正确输入您的手机号')
        // this.loginstaus()
      }
    },
    // 登陆按钮高亮的方法
    yzbtnStatus: function () {
      if (this.yzmVal) {
        this.zyinputFlag = true
        // this.loginstaus()
      } else {
        this.zyinputFlag = false
        // this.loginstaus()
      }
    },
    // 登录高亮显示
    // loginstaus: function () {
    //   if (this.logintelFlag && this.loginyzmFlag && this.zyinputFlag) {
    //     this.loginBtnFlag = true
    //   } else {
    //     this.loginBtnFlag = false
    //   }
    // },
    // 提交登陆信息的方法
    loginShow: function () {
      if (this.loginBtnFlag) {
         if(!this.logintelFlag){
            this.toast('请正确输入您的手机号')
        }else{
          if(!this.yzmVal){
              this.toast('请正确输入验证码')
            }else{
              if(!this.serverbookFlag){
                this.toast('请同意《客乐芙用户服务协议》和《客乐芙隐私权政策》')
              }else{
                this.loginBtnFlag = false
                this.axios.post(this.apiurl + '/yangjian/mem/codelogin', {
                  phone: this.telVal,
                  smsCode: this.yzmVal,
                  channel: this.channel,
                  openId: localStorage.getItem('openId'),
                  // openId: this.$store.state.openId
                })
                .then(res => {
                    if (res.data.code == '100') {
                      // 缓存TOKEN信息
                      $cookies.set(localStorage.getItem('channel') + '_loginToken', res.data.result.loginToken,'','/', this.domainname);
                      // 判断  backurl 是否带有 ？
                      window.location.href = localStorage.getItem('backurl') 
                      // window.location.href=this.$store.state.backurl

                    } else {
                      this.loginBtnFlag = true
                      this.toast(res.data.msg)
                    }
                  
                })
                .catch(error => {
                  this.loginBtnFlag = true
                  console.log(error)
                })
              }
              
            }
        }
        
      }
    }

  }
}

</script>
<style lang="scss">
// @import '../../common/sass/sass.scss';
  .loginBox{background: #fff; min-height: 13.34rem;
  .loginBanner {background: #f8f8f8;  width: 100%; }
   .loginMsgBox { padding: 0.3rem;
      div {position: relative; padding: 0.1rem 0;  width: 100%;
       span {display: inline-block; position: absolute; top: 0.25rem; right: 0.2rem;height: 0.5rem;line-height: 0.5rem;border: solid 0.02rem #ff6b00; border-radius: 0.3rem;padding: 0 0.2rem;color: rgba(255, 107, 0, 1); font-size: 0.24rem;  font-weight: 500;font-family: PingFangSC-Medium;}
       .iconbox{position: absolute;  top: 16px; width: .42rem; height: .42rem; display: inline-block; margin: 0; padding: 0;}
       span.disable {border: solid 0.02rem #999; color: #999; opacity: 0.4;}
     }
     input { display: block; width: 92%; height: 0.85rem; line-height: 0.85rem; border-bottom: solid 0.02rem #ddd; padding:0 0.1rem;padding-left: 0.6rem; touch-action: none;}
     input.tel { font-size: 0.34rem;  color: #333; }
     input.yzm { font-size: 0.34rem; color: #333;      }
   }
   .loginbtn {width: 90%;display: block; margin: 0.1rem 0.33rem 0.5rem 0.33rem; height: 0.8rem; line-height: 0.8rem; background: linear-gradient(90deg, #ff974c, #ff6b00); color: #fff; border-radius: 0.05rem; font-weight: bold; font-size: 0.3rem;}
   .loginbtn.disable {opacity: 0.5;}
   .loginrulue {text-align: center; color: #999;line-height: 0.42rem;font-size: 0.24rem; width: 90%; margin: 0 auto;
     em {list-style: none; color: rgba(255, 107, 0, 1);}
     .toast {white-space: nowrap; position: fixed;z-index: 2000; left: 50%; top: 45%; transition: all 0.5s; -webkit-transform: translateX(-50%) translateY(-50%); -moz-transform: translateX(-50%) translateY(-50%); -ms-transform: translateX(-50%) translateY(-50%); -o-transform: translateX(-50%) translateY(-50%);  transform: translateX(-50%) translateY(-50%); text-align: center; border-radius: 0.05rem; color: #fff; background: rgba(17, 17, 17, 0.7); line-height:0.45rem;  padding: .1rem 0.25rem;}
   }
 }
.wxloadingDiv{width:100%; height:100%; display: flex; justify-content: center; align-items: center;
 .loadingPic{width: 2rem;  background-size: 100%; background: url(../../common/images/base/loading.png) center no-repeat;}
  img{margin-top: -20%;}
}

//通用登录样式
.base{
  .loginBanner{height:5.2rem; background: url(../../common/images/base/basebg.jpg) top left no-repeat; background-size: 100%;}
 .loginMsgBox {
   div{
     .icon_tel{background: url(../../common/images/base/mobile.svg) center  no-repeat; background-size: 100%;}
     .icon_mail{background: url(../../common/images/base/mail.svg) center  no-repeat; background-size: 100%;}
   }
 }
} 

//中国银行登录样式
.boc{
 .loginBanner{height:8.86rem; background: url(../../common/images/boc/img.png) top left no-repeat; background-size: 100%;}
 .loginMsgBox {padding-bottom: 0rem;
   div{border:solid .02rem #ffb2b2; border-radius: 1rem; overflow: hidden; height: .86rem; margin: 0 auto; margin-bottom: .3rem; padding: 0; width: 85%;
    span{top:.18rem; border:none; border-left: solid .02rem #ddd; border-radius: 0;}
    span.disable{border: none; border-left: solid .02rem #ddd;}
     input{display: inline-block; width: 90%; height: 0.72rem; line-height: 0.72rem;  padding: 0.1rem; padding-left: 0.6rem;border-bottom: none; margin-left: .25rem;}
     .icon_tel{background: url(../../common/images/boc/icon-phone.png) top left  no-repeat; background-size: 100%; margin-left: .2rem; height: 0.46rem; width: .48rem; top: 14px; border-right:dashed .02rem #ddd;}
     .icon_mail{background: url(../../common/images/boc/icon-code.png)  top left no-repeat; background-size: 100%; margin-left: .2rem; height: 0.46rem; width: .48rem; top: 14px; border-right:dashed .02rem #ddd;}
   }
 }
 .loginbtn{width: 80%; margin: 0.1rem auto; border-radius: 1rem; background: linear-gradient(90deg, #c11919, #ef4f4f);}
}
//广发银行登录样式
.cgbchina{background: url(../../common/images/cgbchina/blackground@2x.png) left top no-repeat !important; background-size: 100% !important;
  .loginBanner{height:4.1rem; background: url(../../common/images/cgbchina/img@2x.png) top left no-repeat !important; background-size: 100% !important;}
  .loginMsgBox {padding-bottom: 0rem;
   div{ overflow: hidden; height: .86rem; margin: 0 auto; margin-bottom: .3rem; padding: 0; width: 85%; border-bottom: solid .02rem #E6E6E6;
    span{top:.18rem; border:none; border-left: solid .02rem #ddd  !important; border-radius: 0; color: #fff  !important;}
    span.disable{border: none; border-left: solid .02rem #ddd !important; color: #f3f3f3  !important;}
     input{display: inline-block; width: 90%; height: 0.72rem; line-height: 0.72rem;  padding: 0.1rem; padding-left: 0.6rem;border-bottom: none; margin-left: .25rem;  background:none;}
     input.tel,input.yzm{color: #fff;}
     .icon_tel{background: url(../../common/images/cgbchina/mobile@2x.png) top left  no-repeat; background-size: 100%;}
     .icon_mail{background: url(../../common/images/cgbchina/mail@2x.png)  top left no-repeat; background-size: 100%;}
   }
 }
 .loginbtn{width: 50%  !important; margin: 0.5rem auto  !important; background: linear-gradient(90deg, #DFDFDF,#DFDFDF)  !important; color: #333  !important;}
}
</style>