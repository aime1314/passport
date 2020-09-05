export default {
    //获取渠道
    getChannel(state,data){
        state.channel = data
        console.log(data)
    },
    //获取返回地址
    getBackurl(state,data){
        state.backurl = data
        console.log(data)
    },
    //获取微信openId
    getOpenId(state,data){
        state.openId = data
        console.log(data)
    },
    //获取用户token
    getToken(state,data){
        state.token = data
        console.log(data)
    },
}