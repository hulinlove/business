<template>
  <div>
    <my-header headTitle="确认订单" ellipsis="true"></my-header>
    <div class="content-wrap">
      <div class="address-detail" v-if="address" @click="selectAddress()">
        <span>
          <i>{{address.receiverName}}&nbsp;&nbsp;</i>
          <i>{{address.mobile}}</i>
        </span>
        <span>
          <i>{{address.province.value}}{{address.city.value}}{{address.area.value}}</i>
          <i class="detail">{{address.addressDetail}}</i>
        </span>
        <img src="../../assets/images/order_01.png" alt>
      </div>
      <div class="address-detail" v-if="!address" @click="selectAddress()">
            <span class="write-address">请输入收货地址</span>
            <img src="../../assets/images/order_01.png" alt>
      </div>
      <div class="order-list" v-for="(itemList, indexList) in orderDetail.result" :key="indexList">
        <span class="item-title">订单{{indexList+1}}：{{itemList.storeName}}</span>
        <div class="order-item" v-for="(item, index) in itemList.wares" :key="index">
          <div class="ware-detail">
            <img :src="item.wareImage[0].uri" alt class="ware-img" @click="goDetail(item.wareId)">
            <div class="ware-intro">
              <span class="ware-name">{{item.wareName}}</span>
              <span class="ware-spec">{{item.wareSpec}}</span>
            </div>
          </div>
          <ul class="after-detail">
            <li>八天无理由包退(仅向淘货源买家提供)</li>
            <li>无货必赔</li>
            <li>15天包换</li>
            <li>交期保障</li>
          </ul>
          <div class="spec-detail">
            <span class="spec">颜色：</span>
            <span class="spec-intro">活力橙I-605MS-CH</span>
            <span class="ware-num">x{{item.buyNumber}}个</span>
          </div>
          <div class="spec-detail">
            <span class="spec">规格：</span>
            <span class="spec-intro">40*13*13mm</span>
          </div>
          <div class="spec-detail">
            <span class="spec">单价：</span>
            <span class="spec-intro">￥{{item.warePrice}}/个</span>
          </div>
        </div>
      </div>
    </div>
    <div class="order-intro">
      <div class="item-intro">
        <span class="item-name">交易方式</span>
        <span class="item-content">担保交易</span>
        <img src="../../assets/images/order_03.png" alt>
      </div>
      <div class="item-intro">
        <span class="item-name">运费</span>
        <span class="item-content">￥0.00</span>
        <img src="../../assets/images/order_03.png" alt>
      </div>
      <div class="item-intro no-border">
        <span class="item-name">留言：</span>
        <input type="text" placeholder="可以告诉卖家你的特殊要求" v-model="say">
      </div>
      <div class="anony">
        <span class="anony-name">匿名购买</span>
        <img src="../../assets/images/order_04.png" alt class="bottom-arrow">
        <div class="toggle-button-wrapper">
          <input type="checkbox" id="toggle-button" name="switch">
          <label for="toggle-button" class="button-label">
            <span class="circle"></span>
          </label>
        </div>
      </div>
    </div>
    <div class="price-detail">
      <div class="price-item">
        <span class="price-name">店铺优惠：</span>
        <span class="price-content">￥0.00</span>
      </div>
      <div class="price-item">
        <span class="price-name">运费总计：</span>
        <span class="price-content">￥0.00</span>
      </div>
      <div class="price-item">
        <span class="price-name">货物总计：</span>
        <span class="price-content">￥{{orderDetail.allPrice}}</span>
      </div>
    </div>
    <div class="footer">
      <span>
        <i>应付总额（含运费）：</i>
        <i>￥{{orderDetail.allPrice}}</i>
      </span>
      <span @click="submit()">提交订单</span>
    </div>
    <toast v-model="showTip" type="warn" :time="2000" :text="text" position="middle"></toast>
    <transition name="router-slid" mode="out-in">
      <router-view></router-view>
    </transition>
  </div>
</template>
<script>
import { orderDetail, submitOrder } from '../../service/getData'
import { getStore, setStore } from '../../utils/utils'
import { Toast } from 'vux'
export default {
  data () {
    return {
      address: null,
      orderDetail: {},
      showTip: false,
      text: '',
      say: ''
    }
  },
  components: {
    Toast
  },
  created () {
    this.init()
  },
  watch: {
    // 监听路由的变化
    '$route' (to, from) {
      if (JSON.parse(getStore('selectAddress'))) {
        this.address = JSON.parse(getStore('selectAddress'))
      }
    }
  },
  methods: {
    async init () {
      await orderDetail(JSON.parse(getStore('idNum'))).then(res => {
        console.log(res)
        if (res.code === 0) {
          this.orderDetail = res.data.buyWares
          this.address = res.data.address
        }
      })
    },
    goDetail (wareId) {
      this.$router.push({path: '/wareDetails', query: {wareId: wareId}})
    },
    // 选择收货地址
    selectAddress () {
      this.$router.push('/order/selectAddress')
    },
    // 提交订单
    async submit () {
      if (!this.address) {
        this.showTip = true
        this.text = '请输入收货地址'
        return
      }
      let param = {
        customerDesc: this.say,
        wareIdNum: JSON.parse(getStore('idNum')),
        addressId: this.address.addressId
      }
      await submitOrder({param: param}).then(res => {
        console.log(res)
        if (res.code === 0) {
          setStore('allPrice', this.orderDetail.allPrice)
          setStore('orderNumber', res.data)
          this.$router.push('/pay')
        }
      })
    }
  }
}
</script>
<style lang="scss" scoped>
@import '../../assets/mixin.scss';
router-slid-enter-active,
.router-slid-leave-active {
  transition: all 0.8s;
  position: absolute;
  top: 0;
  left: 0;
}
.router-slid-enter,
.router-slid-leave-active {
  transform: translate3d(2rem, 0, 0);
  opacity: 0;
}
.content-wrap {
  background-color: #fff;
  padding-top: 140px;
}
.address-detail i {
  font-size: 28px;
  color: #000000;
}
.address-detail span {
  display: block;
  padding-top: 36px;
  display: flex;
  flex-direction: row;
  align-items: center;
}
.address-detail .write-address {
  font-size: 30px;
  color: #000000;
  position: absolute;
  top: 34px;
}
.address-detail {
  display: flex;
  flex-direction: column;
  /* align-items: center; */
  font-size: 0;
  padding-left: 25px;
  /* padding-bottom: .48rem; */
  background: url("../../assets/images/order_06.png");
  background-size: cover;
  position: relative;
  height: 176px;
}
.address-detail img {
  display: block;
  width: 13px;
  height: 27px;
  position: absolute;
  top: 80px;
  right: 50px;
}
.address-detail .detail {
  display: inline-block;
  width: 300px;
  line-height: 28px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.order-list {
  margin-top: 28px;
  padding-left: 25px;
  padding-right: 25px;
  padding-bottom: 10px;
  border-bottom: 10px solid #f2f3f5;
}
.order-list .order-item {
  font-size: 0;
}
.order-list .item-title {
  display: inline-block;
  padding-bottom: 24px;
  font-size: 24px;
  color: #000000;
  border-bottom: 1px solid #ebedf0;
  width: 100%;
}
.ware-detail {
  display: flex;
  flex-direction: row;
  padding: 35px 0 30px 0;
}
.ware-detail .ware-img {
  display: block;
  width: 121px;
  height: 121px;
  background-color: #333333;
  margin-right: 25px;
}
.ware-detail .ware-intro {
  display: flex;
  flex-direction: column;
  justify-content: center;
}
.ware-intro .ware-name {
  display: block;
  width: 440px;
  height: 64px;
  font-size: 28px;
  line-height: 32px;
  color: #2d2d2d;
  @include ln(2);
}
.ware-intro .ware-spec {
  display: block;
  width: 440px;
  height: 32px;
  font-size: 28px;
  line-height: 32px;
  color: #2d2d2d;
  @include line();
  margin-top: 20px;
}
.ware-intro img {
  display: block;
  width: 96px;
  height: 35px;
  margin-top: 13px;
}
.after-detail {
  width: 590px;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
}
.after-detail li {
  font-size: 24px;
  color: #ff5719;
  background-color: #ffeee8;
  border: 1px solid #ff806d;
  padding: 10px 12px;
  border-radius: 10px;
  margin-bottom: 20px;
  margin-right: 20px;
}
.spec-detail {
  display: flex;
  flex-direction: row;
  margin-bottom: 20px;
  position: relative;
}
.spec-detail .spec {
  font-size: 26px;
  color: #8d8d8d;
}
.spec-detail .spec-intro,
.spec-detail .spec-price,
.spec-detail .ware-num {
  font-size: 26px;
  color: #2d2d2d;
}
.spec-detail .spec-price,
.spec-detail .ware-num {
  position: absolute;
  right: 0;
}
.order-intro {
    background-color: #fff;
}
.order-intro .item-intro {
  display: flex;
  flex-direction: row;
  font-size: 28px;
  height: 98px;
  align-items: center;
  border-bottom: 1px solid #ebedf0;
  position: relative;
  margin-left: 25px;
}
.order-intro .no-border {
  border-bottom: none;
}
.item-intro span {
  color: #2d2d2d;
}
.item-intro .item-content {
  position: absolute;
  right: 73px;
}
.item-intro input {
  width: 455px;
  color: #2d2d2d;
  font-size: 28px;
}
.item-intro img {
  position: absolute;
  right: 28px;
  width: 14px;
  height: 24px;
}
.item-intro input::placeholder {
  /*WebKit browsers*/
  font-size: 28px;
  color: #848484;
  padding-left: 118px;
  /* padding-left: 20px; */
}
.anony {
  display: flex;
  flex-direction: row;
  align-items: center;
  height: 150px;
  padding-left: 25px;
  border-top: 20px solid #f2f3f5;
  border-bottom: 20px solid #f2f3f5;
  position: relative;
}
.anony .anony-name {
  font-size: 26px;
  color: #2d2d2d;
}
.anony .bottom-arrow {
  display: block;
  width: 27px;
  height: 18px;
  margin-left: 18px;
}
.anony .open-close {
  position: absolute;
  right: 28px;
  width: 100px;
  height: 50px;
}
.price-detail {
  padding: 10px 0 75px 25px;
  background-color: #fff;
}
.price-detail .price-item {
  display: flex;
  flex-direction: row;
  font-size: 28px;
  margin-top: 20px;
  position: relative;
}
.price-item .price-name {
  color: #848484;
}
.price-item .price-content {
  color: #eb2331;
}
.price-item .price-intro{
  position: absolute;
  right: 25px;
  color: #2d2d2d;
}
.footer {
  display: flex;
  flex-direction: row;
  height: 100px;
  align-items: center;
  box-shadow: 0 -3px 5.5px #f0f0f0;
  background-color: #fff;
  padding-left: 25px;
}
.footer span:nth-child(1) {
  flex: 1;
  font-size: 28px;
}
.footer span:nth-child(1) i:nth-child(1) {
  color: #2d2d2d;
}
.footer span:nth-child(1) i:nth-child(2) {
  font-weight: bold;
}
.footer span:nth-child(2) {
  flex-basis: 180px;
  width: 180px;
  height: 100px;
  background-color: #eb2331;
  color: #fff;
  text-align: center;
  line-height: 100px;
  font-size: 26px;
}
#layer_box {
  display: none;
}
.layer-box {
  display: flex;
  justify-content: center;
  align-items: center;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 999;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.3);
}
.layer-box .layer {
  width: 90%;
  height: 420px;
  background-color: #fefefe;
  border-radius: 20px;
  display: flex;
  flex-direction: column;
}
.layer .layer-title {
  font-size: 34px;
  color: #2d2d2d;
  padding: 59px 0 42px 52px;
}
.layer .layer-content {
  font-size: 28px;
  color: #848484;
  padding: 0 0 88px 52px;
  line-height: 50px;
}
.layer .layer-option {
  display: flex;
  flex-direction: row;
  height: 99px;
}
.layer .layer-option span:nth-child(1) {
  display: block;
  flex: 1;
  font-size: 32px;
  color: #2d2d2d;
  border-top: 1px solid #eeeff2;
  text-align: center;
  line-height: 99px;
}
.layer .layer-option span:nth-child(2) {
  display: block;
  flex: 1;
  font-size: 32px;
  color: #ffffff;
  background-color: #f96324;
  border-radius: 0 0 20px 0;
  text-align: center;
  line-height: 99px;
}
#toggle-button {
  display: none;
}
.toggle-button-wrapper {
  position: absolute;
  right: 28px;
  display: flex;
  align-items: center;
}
.button-label {
  position: relative;
  display: inline-block;
  width: 100px;
  height: 50px;
  background-color: #fff;
  border: 1px solid #e5e5e5;
  border-radius: 25px;
  overflow: hidden;
  display: flex;
  align-items: center;
}
.circle {
  position: absolute;
//   top: 4px;
  left: 15px;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background-color: #f2f3f5;
  border: 1px solid #e5e5e5;
}
.button-label .circle {
  left: 10px;
  transition: all 0.3s;
}
#toggle-button:checked + label.button-label .circle {
  left: 50px;
}
#toggle-button:checked + label.button-label .on {
  display: inline-block;
}
#toggle-button:checked + label.button-label .off {
  display: none;
}
#toggle-button:checked + label.button-label {
  background-color: #eb2331;
  border: none;
}
</style>
