<template>
  <div>
    <myHeader head-title="管理收货地址" goBack="true">
      <span class="managebutton" slot="finish" @click="finish()">完成</span>
    </myHeader>
    <div class="warp">
      <div class="address-list">
        <ul v-for="(item, index) in address" :key="index">
          <li class="address">
            <span>
              <i>{{item.receiverName}}</i>
              <i>{{item.mobile}}</i>
            </span>
            <p>收货地址：{{item.province.value}}{{item.city.value}}{{item.area.value}}{{item.addressDetail}}</p>
          </li>
          <li class="choseaddress">
            <span @click="edit(item.addressId)">
              <i class="iconfont icon-edit"></i>
              <i>编辑</i>
            </span>
             <span @click="del(item.addressId)">
              <i class="iconfont icon-del"></i>
              <i>删除</i>
            </span>
          </li>
        </ul>
      </div>
    </div>
    <div class="add-addres" @click="addAddress()">新增地址</div>
    <confirm v-model="showDel" dialog-transition content="确定删除吗" confirm-text="确定" @on-confirm="delSure()"></confirm>
    <toast v-model="showTip" type="text" :time="2000" :text="text" position="middle"></toast>
  </div>
</template>
<script>
import {addressList, delAddress} from '../../../service/getData'
import { Confirm, Toast } from 'vux'
export default {
  data () {
    return {
      address: [],
      showDel: false,
      addressId: '',
      showTip: false,
      text: ''
    }
  },
  components: {
    Confirm,
    Toast
  },
  created () {
    this.init()
  },
  methods: {
    // 编辑地址
    edit (addressId) {
      this.$router.push({path: '/editAddress', query: {addressId: addressId}})
    },
    // 新增地址
    addAddress () {
      this.$router.push('/addAddress')
    },
    // 初始化
    async init () {
      await addressList().then(res => {
        console.log(res)
        if (res.code === 0) {
          this.address = res.data
        }
      })
    },
    // 删除地址
    del (addressId) {
      this.showDel = true
      this.addressId = addressId
    },
    // 删除地址的确定
    async delSure () {
      await delAddress({addressId: this.addressId}).then(res => {
        if (res.code === 0) {
          this.showTip = true
          this.text = '删除地址成功'
          this.init()
        }
      })
    },
    // 完成
    finish () {
      this.$router.back(-1)
    }
  }
}
</script>
<style lang="scss" scoped>
@import '../../../assets/mixin.scss';
.address-list {
  ul {
    margin-bottom: 12px;
    .address {
      height: 170px;
      width: 100%;
      background: #fff;
      padding: 29px 32px 24px;
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
      }
    }
    .choseaddress {
      height: 64px;
      width: 750px;
      line-height: 64px;
      padding: 0 32px;
      background: #fff;
      border-top: 1px solid #eeeeee;
      display: flex;
      flex-direction: row;
      justify-content: flex-end;
      align-items: center;
      span {
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: center;
        i:nth-child(1) {
          font-size: 36px;
          display: inline-block;
          line-height: 36px;
        }
        i:nth-child(2) {
          font-size: 24px;
          color: #333333;
          line-height: 24px;
        }
      }
      span:nth-child(1) {
        margin-right: 20px;
      }
    }
  }
}
.add-addres {
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
.warp {
  padding: 140px 0 100px 0;
}
.managebutton {
  position: absolute;
  top: 72px;
  right: 32px;
  font-size: 28px;
  color: #666666;
  line-height: 36px;
}
</style>
