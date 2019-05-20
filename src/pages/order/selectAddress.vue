<template>
  <div class="address-body">
    <div>
      <myHeader head-title="选择地址" goBack="true">
        <span class="managebutton" slot="finish" @click="manage()">管理</span>
      </myHeader>
      <div class="address-list">
        <ul v-for="(item, index) in address" :key="index" @click="toOrder(item)">
          <li class="address">
            <span>
              <i>{{item.receiverName}}</i>
              <i>{{item.mobile}}</i>
            </span>
            <p>
              <i>收货地址 ：</i>
              {{item.province.value}}{{item.city.value}}{{item.area.value}}{{item.addressDetail}}
            </p>
          </li>
        </ul>
      </div>
      <span class="add-address" @click="addAddress()">新增地址</span>
    </div>
  </div>
</template>
<script>
import { addressList } from '../../service/getData'
import { setStore } from '../../utils/utils'
export default {
  data () {
    return {
      address: []
    }
  },
  created () {
    this.init()
  },
  methods: {
    manage () {
      this.$router.push('/manageAddress')
    },
    addAddress () {
      this.$router.push('/addAddress')
    },
    async init () {
      await addressList().then(res => {
        console.log(res)
        if (res.code === 0) {
          this.address = res.data
        }
      })
    },
    toOrder (address) {
      setStore('selectAddress', JSON.stringify(address))
      this.$router.replace('/order')
    }
  }
}
</script>
<style lang="scss" scoped>
@import "../../assets/mixin.scss";
.address-body {
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  // z-index: ;
  background-color: #fff;
  box-sizing: content-box;
  padding-bottom: 400px;
  .managebutton {
    position: absolute;
    top: 72px;
    right: 32px;
    font-size: 28px;
    color: #666666;
  }
  .address-list {
    padding: 140px 0 100px 0;
    .address {
      height: 170px;
      width: 750px;
      position: relative;
      background: #fff;
      padding: 29px 32px 24px;
      border-bottom: 1px solid #eeeeee;
      span {
        font-size: 30px;
        color: #4e4e4e;
        line-height: 38px;
        i:nth-child(1) {
          margin-right: 60px;
        }
      }
      p {
        width: 100%;
        height: 60px;
        margin-top: 14px;
        font-size: 24px;
        color: #888888;
        line-height: 30px;
        @include ln(2);
        i:nth-child(1) {
          color: #f77052;
        }
      }
      .icon-correct {
        position: absolute;
        top: 77px;
        right: 31px;
        color: #f77052;
      }
    }
  }
  .add-address {
    display: inline-block;
    height: 100px;
    width: 100%;
    text-align: center;
    position: fixed;
    left: 0;
    bottom: 0;
    font-size: 36px;
    color: #ffffff;
    line-height: 100px;
    background-image: linear-gradient(-90deg, #f77052 4%, #ff5918 96%);
  }
}
</style>
