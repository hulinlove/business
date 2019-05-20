<template>
  <div class="box">
    <img src="../../assets/images/info.jpg" class="logo">
    <div class="boxlogin">
      <input type="text" placeholder="请设置用户名" class="loginmobile" v-model="mobile">
      <div class="loginpass">
        <input type="password" placeholder="请设置密码(6-20位)" class="loginmobile" v-model="password">
        <img class="eye" src=../../assets/image/eye.png />
      </div>
      <button class="loginbtn" @click="register()">注册</button>
    </div>
    <toast v-model="showTip" type="warn" :time="2000" :text="text" position="middle" is-show-mask></toast>
  </div>
</template>
<script>
import {verifyEmpty} from '../../utils/utils'
import {Toast} from 'vux'
export default {
  data () {
    return {
      mobile: '',
      password: '',
      showTip: false,
      text: ''
    }
  },
  components: {
    Toast
  },
  methods: {
    register () {
      if (!verifyEmpty(this.mobile)) {
        this.showTip = true
        this.text = '请设置用户名'


        return
      }
      if (!verifyEmpty(this.password)) {
        this.showTip = true
        this.text = '请设置密码'
        return
      }
      this.$router.push('/home')
    }
  }
}
</script>
<style scoped lang="scss">
.box {
  width: 100%;
  height: 100%;
  position: absolute;
  background-color: #fff;
  padding: 100px 40px 0 40px;
  display: flex;
  flex-direction: column;
  align-items: center;
  .logo {
    width: 200px;
    height: 200px;
    border-radius: 50px;
  }
  .boxlogin {
    margin-top: 50px;
    .loginmobile {
      width: 670px;
      height: 90px;
      background-color: #fff;
      line-height: 90px;
      padding-left: 30px;
      font-size: 30px;
      border-bottom: 1px solid #b0b0b0;
      color: #4e4e4e;
    }
    .loginpass {
      position: relative;
      display: flex;
      align-items: center;
      .eye {
        width: 55px;
        height: 55px;
        position: absolute;
        right: 60px;
      }
    }
    .loginbtn {
      width: 670px;
      height: 90px;
      border-radius: 50px;
      color: #fff;
      background: linear-gradient(to right, #ff7f50, #ffa07a);
      margin-top: 100px;
      font-size: 34px;
    }
  }
}
</style>
