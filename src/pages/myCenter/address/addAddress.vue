<template>
  <div>
    <myHeader head-title="新增地址" goBack="true"></myHeader>
    <div class="wrap">
      <ul class="addressDetails">
        <li>
          <span>联系人</span>
          <input v-model.trim="receiverName" type="text">
        </li>
        <li>
          <span>手机号码</span>
          <input v-model.trim="mobile" type="text">
        </li>
        <li @click="open()">
          <span>选择地址</span>
          <input v-model.trim="areaName" disabled="disabled" type="text">
          <span>
            请选择
            <em class="iconfont icon-right"></em>
          </span>
        </li>
        <li>
          <span>详细地址</span>
          <input type="text" v-model.trim="addressDetail" placeholder="街道、门牌、楼层等具体信息">
        </li>
      </ul>
      <div v-if="showSelect">
        <v-distpicker type="mobile" @province="onChangeProvince" @city="onChangeCity" @area="onChangeArea"></v-distpicker>
      </div>
      <span class="keep" @click="add()">保存</span>
    </div>
    <toast v-model="showTip" type="warn" :time="2000" :text="text" position="middle"></toast>
    <loading :show="showLoading" text="保存中..."></loading>
  </div>
</template>
<script>
import {addAddress} from '../../../service/getData'
import VDistpicker from 'v-distpicker'
import {verifyMobile, verifyEmpty} from '../../../utils/utils'
import { Toast, Loading } from 'vux'
export default {
  data () {
    return {
      receiverName: '',
      mobile: '',
      addressDetail: '',
      province: null,
      city: null,
      area: null,
      showSelect: false,
      areaName: '',
      showTip: false,
      text: '',
      showLoading: false
    }
  },
  components: {
    VDistpicker,
    Toast,
    Loading
  },
  methods: {
    // 新增地址
    async add () {
      if (!verifyEmpty(this.receiverName) || !verifyEmpty(this.mobile) || !verifyEmpty(this.areaName) || !verifyEmpty(this.addressDetail)) {
        this.showTip = true
        this.text = '所有字段都不能为空'
        return
      }
      if (!verifyMobile(this.mobile)) {
        this.showTip = true
        this.text = '手机号输入有误'
        return
      }
      let address = {
        receiverName: this.receiverName,
        mobile: this.mobile,
        province: this.province,
        city: this.city,
        area: this.area,
        addressDetail: this.addressDetail
      }
      await addAddress({address: address}).then(res => {
        this.showLoading = true
        this.$router.go(-1)
      })
    },
    // 打开选择地址的弹框
    open () {
      this.showSelect = !this.showSelect
      // this
    },
    // 选择省份的改变
    onChangeProvince (province) {
      this.province = province
    },
    // 选择市的改变
    onChangeCity (city) {
      this.city = city
    },
    // 选择区的改变
    onChangeArea (area) {
      this.area = area
      this.areaName = this.province.value + this.city.value + this.area.value
      this.showSelect = false
    }
  }
}
</script>
<style lang="scss" scoped>
// 正文
.wrap {
  padding: 140px 0 100px 0;
  .addressDetails {
    li {
      height: 88px;
      line-height: 88px;
      border-bottom: 1px solid #eeeeee;
      padding: 0 32px;
      font-size: 30px;
      background: #fff;
      color: #333333;
      input:nth-child(2) {
        line-height: 88px;
        font-size: 30px;
        color: #333333;
        display: inline-block;
        margin-left: 45px;
        width: 500px;
        height: 80px;
      }
    }
    li:nth-child(1) {
      input:nth-child(2) {
        display: inline-block;
        margin-left: 80px;
      }
    }
    li:nth-child(3) {
      input:nth-child(2) {
        width: 300px;
        background: #fff;
      }
      span:nth-child(3) {
        float: right;
        font-size: 30px;
        color: #b0b0b0;
        display: flex;
        align-items: center;
        .icon-right {
          display: inline-block;
          font-size: 32px;
          color: #b0b0b0;
        }
      }
    }
  }
  .keep {
    display: inline-block;
    margin: 50px 48px 0;
    height: 96px;
    width: 654px;
    line-height: 96px;
    text-align: center;
    background-image: linear-gradient(-90deg, #f77052 4%, #ff5918 96%);
    box-shadow: 0 8px 10px 0 rgba(86, 203, 210, 0.3);
    border-radius: 60px;
    font-size: 36px;
    color: #ffffff;
  }
}
input::-webkit-input-placeholder {
  /*WebKit browsers*/
  font-size: 30px;
  font-family: "MicrosoftYaHei";
  color: #b0b0b0;
}
input::-moz-input-placeholder {
  /*Mozilla Firefox*/
  font-size: 30px;
  font-family: "MicrosoftYaHei";
  color: #b0b0b0;
}
input::-ms-input-placeholder {
  /*Internet Explorer*/
  font-size: 30px;
  font-family: "MicrosoftYaHei";
  color: #b0b0b0;
}
input[disabled],
input:disabled,
input.disabled {
  color: #333;
  -webkit-text-fill-color: #333;
  -webkit-opacity: 1;
  opacity: 1;
}
</style>
