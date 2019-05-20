<template>
  <div class="box">
    <span class="header">支付成功</span>
    <div class="center">
      <span class="iconfont icon-paySuccess"></span>
      <ul>
        <li>恭喜您，订单支付成功！</li>
        <li>订单编号：{{orderNumber}}</li>
        <li>订单金额：￥{{allPrice}}</li>
      </ul>
      <div>
        <span @click="toIndex()" class="to-home">去首页</span>
      </div>
    </div>
  </div>
</template>
<script>
import { getStore } from '../../utils/utils'
export default {
  data () {
    return {
      orderNumber: '',
      allPrice: ''
    }
  },
  created () {
    this.orderNumber = getStore('orderNumber')
    this.allPrice = getStore('allPrice')
  },
  methods: {
    toIndex () {
      this.$router.push('/home')
    }
  }
}
</script>
<style lang="scss" scoped>
.box {
  width: 100%;
  height: 100%;
  position: absolute;
  background-color: #fff;
  .header {
    background-color: #fff;
    width: 750px;
    height: 140px;
    position: fixed;
    z-index: 99999;
    left: 0;
    top: 0;
    text-align: center;
    line-height: 140px;
    font-size: 36px;
    color: #4E4E4E;
    border-bottom: 1px solid #f5f5f5;
  }
}
.center {
  padding-top: 140px;
  height: 482px;
  background: #fff;
  display: flex;
  flex-direction: column;
  align-items: center;
  .icon-paySuccess {
    padding: 50px 0 30px 0;
    font-size: 250px;
    color: #f77052;
  }
  ul {
    text-align: center;
    li {
      margin-bottom: 10px;
      height: 44px;
      font-size: 36px;
      color: #4e4e4e;
      line-height: 44px;
    }
  }
  .to-home {
    display: inline-block;
    font-size: 36px;
    color: #4e4e4e;
    text-align: center;
    width: 160px;
    height: 64px;
    line-height: 62px;
    border: 1px solid #b8b8b8;
    border-radius: 4px;
    background-color: #fff;
    margin-top: 20px;
  }
}
</style>
