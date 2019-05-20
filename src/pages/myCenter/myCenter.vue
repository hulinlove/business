<!--子组件-->
<template>
  <div>
    <div class="top">
      <div class="info_person">
        <img class="img_person" alt src="../../assets/images/info.jpg">
        <span class="name">远方</span>
      </div>
    </div>
    <div class="order">
      <div class="order_my">
        <span class="order_mine">我的订单</span>
        <span class="lookAll">
          查看全部
          <i class="iconfont icon-right"></i>
        </span>
      </div>
      <div class="status_order">
        <span>
          <i class="iconfont icon-pay"></i>
          <i class="num">1</i>
          <i class="status">待付款</i>
        </span>
        <span>
          <i class="iconfont icon-send"></i>
          <i class="num">1</i>
          <i class="status">待发货</i>
        </span>
        <span>
          <i class="iconfont icon-receive"></i>
          <i class="num">1</i>
          <i class="status">待收货</i>
        </span>
        <span>
          <i class="iconfont icon-finish"></i>
          <i class="status">已完成</i>
        </span>
      </div>
    </div>
    <div class="address_mine" @click="goAddress()">
      <i class="iconfont icon-dizhi ic-location"></i>我的地址
      <i class="iconfont icon-right ic-right"></i>
    </div>
    <span class="loginout">退出登录</span>
    <myFooter></myFooter>
  </div>
</template>

<script>
export default {
  methods: {
    goAddress () {
      this.$router.push('/addressList')
    }
  }
}
</script>
<style lang="scss" scoped>
.top {
  width: 100%;
  height: 320px;
  background: url("../../assets/images/myCenter.jpg") no-repeat;
  background-size: cover;
  display: flex;
  align-items: center;
  .info_person {
    position: relative;
    display: flex;
    flex-direction: row;
    align-items: center;
    .img_person {
      display: inline-block;
      border-radius: 50%;
      overflow: hidden;
      background: #1696ef;
      width: 104px;
      height: 104px;
      margin-left: 32px;
      margin-right: 16px;
    }
    .name {
      font-size: 30px;
      color: #ffffff;
      line-height: 32px;
    }
  }
}
.order {
  margin-top: 12px;
  background-color: #fff;
  width: 750px;
  height: 220px;
  .order_my {
    padding-top: 20px;
  }
  .order_mine {
    font-size: 30px;
    color: #4e4e4e;
    line-height: 38px;
    margin: 0 447px 0 32px;
  }
  .lookAll {
    font-size: 20px;
    color: #b0b0b0;
    line-height: 28px;
    i {
      font-family: "simple-line-icons";
      font-size: 18px;
      color: #b0b0b0;
      line-height: 30px;
      padding-right: 3px;
    }
  }
  .status_order {
    width: 90%;
    margin: 0 auto;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    padding-top: 30px;
    span {
      display: flex;
      flex-direction: column;
      align-items: center;
      position: relative;
      i:nth-child(1) {
        font-size: 40px;
        color: #888888;
        margin-bottom: 20px;
      }
      .status {
        font-size: 24px;
        color: #888;
      }
      .num {
        display: block;
        position: absolute;
        top: -20px;
        right: -20px;
        width: 40px;
        height: 40px;
        background-color: #ff7152;
        border-radius: 20px;
        text-align: center;
        font-family: Roboto-Regular;
        font-size: 20px;
        line-height: 40px;
        color: #ffffff;
        letter-spacing: 0;
      }
    }
  }
}
.address_mine {
  margin-top: 12px;
  font-size: 32px;
  color: #4e4e4e;
  line-height: 40px;
  background-color: #fff;
  padding: 25px 0;
  .ic-location {
    color: #b0b0b0;
    font-size: 36px;
    padding-right: 21.3px;
    padding-left: 35px;
  }
  .ic-right {
    padding-left: 480px;
    color: #d4d4d4;
    font-size: 36px;
  }
}
.loginout {
  margin-top: 12px;
  display: inline-block;
  padding: 25px 0;
  text-align: center;
  background-color: #fff;
  font-size: 32px;
  color: #4e4e4e;
  line-height: 40px;
  width: 100%;
}
</style>
