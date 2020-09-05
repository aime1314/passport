<template>
  <div>
    <a href="javascript:;" class="boc_rulue" @click="showrulue">使用规则</a>
    <div class="ruluedailog" v-if="rulueshow">
      <div class="dailogMsgBox">
        <div class="closeDailog" @click="hiderulue">
          <span></span>
        </div>
        <div class="rulurTitle">住宿使用规则</div>
        <div class="dailogMsgshow">
          <div> 
            <p>1. 客乐芙用户权益一旦激活绑定，将不得转让用户会员资格和优惠权益，也不可随意取消购买或退换货，如有特殊情况可致电客服中心协商处理。</p>
            <p>2. 客乐芙用户需使用权益需提前在客乐芙H5页面进行预订，或致电客乐芙客服热线400 636 8008进行预订，自助餐/下午茶类权益预订需提前至少24小时；用户在预订成功将会收到确认短信，限本人预订及使用。</p>
            <p>3. 对于已经激活使用的权益部分，不予退款；若因可归责于客乐芙一方原因，导致无法提供相应服务的，客乐芙用户可在补足已使用部分的差价后，致电客服中心协商要求就剩余部分权益进行退款。</p>
            <p>4. 前项要求的退款总金额，不得超过客乐芙用户购买客乐芙权益的实际支付金额或客乐芙实际收取的权益费用。</p>
            <p>5. 权益的使用以各具体商户当日可接受的实际承接量为准，如因客满或不可控因素无法提供服务，有发生预订不成功的可能。若预订不成功，用户可选择其它日期或其他商户进行预订。每次权益的使用，必须在上一次权益预订并使用完成后，方可接受下一次新的预订。</p>
            <p>6. “两人同行享五折优惠”权益，用户在用餐前出示预订成功的确认短信即可享受双人自助餐或下午茶净价合计金额五折之优惠，如非特别说明，商户所提供的权益不包括增值税税费、服务费、超出两人自助餐或下午茶净价合计金额的部分以及套餐里未包含的项目及服务。</p>
            <p>7. “双人礼遇”权益，用户在用餐前出示预订成功的确认短信即可享受两份自助餐或下午茶，每次用餐人数须为2位。</p>
            <p>8. 客乐芙用户每天只可使用一次“两人同行享五折优惠”或“双人礼遇”优惠权益。</p>
            <p>9. 使用单杯茶饮权益服务，需在专属验证页面自助获取验证码，点击领取后将会收到含有验证序列号的通知短信，验证码仅限当日（0:00-24:00）有效。每天仅可领取一次验证码并只可兑换一次单杯茶饮，且限本人使用。 兑换茶饮前出示短信内的验证码即可享受指定的单杯茶饮，部分商户指定时间段内仅限外带，具体因酒店情况有所不同，请以各商户详情页面为准。 所提供的权益已包含税费及服务费。</p>
            <p>10. 客乐芙用户权益优惠不可与商户促销、团购及其他优惠同时累积使用。</p>
            <p>11. 自助餐和/或下午茶单价以酒店商户提供的当天实际价格为准。</p>
            <p>12. 客乐芙会员权益优惠不适用于指定的日子，包括但不限于圣诞节、圣诞节前夜、情人节、大除夕、父、母亲节及法定节假日等；详情因酒店商户的规定而有所不同，请以订单确认为准。</p>
            <p>13. 如需取消或更改自助餐/下午茶权益使用日程需提前24小时联系客服中心，24小时内恕不接受更改；若无法如期使用且预订未做取消，该次权益将视作已使用。</p>
            <p>14. 客乐芙会员权益自激活/获得日期起有效期6个月; 若有效期届满尚未使用或尚未完全使用的，该权益视为自动放弃，不再接受退货、退款申请。</p>
            <p>15. 客乐芙保留不定期更换相关酒店商户的权利。</p>
            <p>16. 客乐芙服务热线400 636 8008，热线人工服务时间: 北京时间9:00～18:00；北京时间18：00～9:00仅接受热线语音服务。</p>
            <p>17. 如客乐芙用户在享用各酒店商户提供的餐饮时因食品安全或其他原因遭致人身伤害或财产损失的，由客户自行与酒店商户协商解决，客乐芙不承担相关的赔偿责任及法律责任。</p>
            <p>18. 若客乐芙发现用户以非法营利为目的，大量囤积、转让、售卖客乐芙用户权益的，客乐芙客服有权致电提示该用户限期停止上述行为，如用户拒绝停止或怠于停止违约行为，客乐芙有权直接拒绝提供上述用户权益的服务支持，同时客乐芙将保留追究其法律责任的权利</p>
            <p>19. 本权益规则的签订地为上海市浦东新区，本权益规则适用中华人民共和国法律法规（不包括港澳台地区法律)。因本权益规则引起的或与本权益规则有关的任何争议纠纷，由双方协商解决；协商不成的，任何一方可向上海市浦东新区人民法院提起诉讼。</p>
            <p>20. 该用户权益由上海静元信息技术有限公司（本权益规则中称“客乐芙”）提供服务支持，客乐芙对其所提供的优惠权益礼遇保留解释权。</p>
            <p>21. 一旦您通过客乐芙或客乐芙合作方平台以任何方式购买、兑换、获取、使用客乐芙提供的用户权益，即视为您同意本权益规则。本权益规则具有合同法律效力。客乐芙可能根据法律法规的要求或业务运营的需要，对本权益规则不时进行修改。除非另有规定，否则任何变更或修改将在修订内容于客乐芙平台或客乐芙合作方平台发布之时立即生效，您对客乐芙优惠权益的使用、继续使用将表明您接受此等变更或修改。</p>
            <p>22. 本权益规则为《客乐芙会员用户服务协议》的附件，与《客乐芙会员用户服务协议》具有同等法律效力。本权益规则未约定的，以《客乐芙会员用户服务协议》的约定为准。</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'bocloginword',
  data () {
    return {
      rulueshow:false
    }
  },
  created () {},
  methods: {
    showrulue(){
      this.rulueshow = true
    },
    hiderulue(){
      this.rulueshow = false
    }
  }
}
</script>
<style lang="scss">
  .boc_rulue{position: absolute; width: 1.84rem; height: .7rem; line-height: .7rem; text-align: center; background: url(../../common/images/boc/buttonbg.png) left center no-repeat; top:1rem; right:0; background-size: 100%; color: #fff;}
  .ruluedailog{background: rgba(0,0,0,.6); position: fixed; width: 100%; left: 0; top: 0; height: 100%; z-index: 5;}
  .ruluedailog .dailogMsgBox{width: 80%; position: fixed; left: 10%; top: 50%; transform: translateY(-50%); background: #fff; border-radius: .1rem; position: relative; padding-bottom: .3rem;}
  .ruluedailog .rulurTitle{text-align: center; padding: .5rem 0 .3rem 0; font-weight: bold; color:#333;}
  .ruluedailog .closeDailog{text-align:right; padding: .2rem .2rem; position: absolute; top: .1rem; right:.1rem;}
  .ruluedailog .closeDailog span{display: inline-block; width: .32rem; height: .32rem; background: url(../../common/images/boc/close.png) center no-repeat; background-size: 80%;}
  .ruluedailog .dailogMsgshow{padding: 0rem .2rem .2rem .2rem; max-height: 6.2rem; min-height: 1rem; overflow-y: scroll; color: #999; line-height: .4rem;}
</style>
