<template>
  <div>
    <my-header headTitle="订单支付" ellipsis="true"></my-header>
    <div class="body">
      <div class="centerpay">
        <ul class="details_order">
          <li>订单提交成功!</li>
          <li>订单编号：{{orderNumber}}</li>
        </ul>
        <div class="orderprice">
          <span>
            订单金额：
            <i>￥{{allPrice}}</i>
          </span>
        </div>
        <div class="paybox">
          <dd class="paychose" @click="payType(1)">
            <img class="ways_logo" src="../../assets/images/weixin.jpg" alt>
            <a class="ways">微信支付</a>
            <i class="iconfont icon-check-circle" v-if="pay === 0 || pay === 2"></i>
            <i class="iconfont icon-check-circle-fill icon-select" v-if="pay === 1"></i>
          </dd>
          <dd class="paychose" @click="payType(2)">
            <img class="ways_logo" src="../../assets/images/zhifubao.png" alt>
            <a class="ways">支付宝支付</a>
            <i class="iconfont icon-check-circle" v-if="pay === 0 || pay === 1"></i>
            <i class="iconfont icon-check-circle-fill icon-select" v-if="pay === 2"></i>
          </dd>
        </div>
      </div>
    </div>
    <div class="keep" @click="nowPay()">立即支付</div>
    <toast v-model="showTip" type="warn" :time="2000" :text="text" position="middle"></toast>
  </div>
</template>
<script type="text/javascript">
import { getStore } from '../../utils/utils'
import { Toast } from 'vux'
export default {
  data () {
    return {
      allPrice: '',
      orderNumber: '',
      pay: 0, // pay为1 表示微信支付 pay为2 表示支付宝支付
      showTip: false,
      text: ''
    }
  },
  created () {
    this.allPrice = getStore('allPrice')
    this.orderNumber = getStore('orderNumber')
  },
  components: {
    Toast
  },
  methods: {
    payType (type) {
      this.pay = type
    },
    nowPay () {
      if (this.pay === 0) {
        this.showTip = true
        this.text = '请您选择一种支付方式'
        return
      }
      this.$router.push('/paySuccess')
    }
  }
}
</script>
<style lang="scss" scoped>
.body {
  padding-top: 140px;
  height: 100px;
  .centerpay {
    height: 524px;
    .details_order {
      background: #fff;
      padding: 22px 32px 22px;
      margin-bottom: 12px;
      li {
        margin-bottom: 10px;
        height: 44px;
        font-size: 36px;
        color: #4e4e4e;
        line-height: 44px;
      }
    }
    .orderprice {
      height: 100px;
      line-height: 100px;
      background-color: #fff;
      padding: 0 32px;
      margin-bottom: 12px;
      i {
        color: #ff7152;
      }
    }
    .paybox {
      .paychose {
        position: relative;
        padding: 0 32px;
        height: 100px;
        background-color: #fff;
        line-height: 100px;
        border-bottom: 5px solid #f5f5f5;
        position: relative;
        .ways {
          padding-left: 100px;
        }
        .ways_logo {
          display: inline;
          position: absolute;
          top: 10px;
          left: 32px;
          width: 80px;
          height: 80px;
        }
        .iconfont {
          font-size: 40px;
          color: #ddd;
          position: absolute;
          right: 50px;
        }
        .icon-select {
          color: #f77052;
        }
      }
    }
  }
}
.keep {
  position: fixed;
  bottom: 0;
  left: 0;
  height: 96px;
  width: 750px;
  line-height: 96px;
  text-align: center;
  background-image: linear-gradient(-90deg, #f77052 4%, #ff5918 96%);
  font-size: 36px;
  color: #ffffff;
}
</style>
