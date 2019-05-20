<template>
  <div class="box">
    <img src="../../assets/images/info.jpg" class="logo">
    <form class="login_txt">
      <input type="text" placeholder="用户名" class="mobile" v-model="mobile">
      <div class="headcoun">
        <input type="password" placeholder="请输入密码" class="mobile" v-model="password">
        <div class="passright">
          <img src="../../assets/image/eye.png" class="eye">
          <span class="forgetword">忘记密码</span>
        </div>
      </div>
      <button class="receiveBtn" @click="login()">登录</button>
    </form>
    <span class="new-user" @click="register()">新用户注册</span>
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
    login () {
      if (!verifyEmpty(this.mobile)) {
        this.showTip = true
        this.text = '请填写用户名'
        return
      }
      if (!verifyEmpty(this.password)) {
        this.showTip = true
        this.text = '请填写密码'
        return
      }
      this.$router.push('/home')
    },
    register () {
      this.$router.push('/register')
    }
  }
}
</script>
<style scoped lang="scss">
.box {
  width: 100%;
  height: 100%;
  background-color: #fff;
  position: absolute;
  padding: 100px 40px 0 40px;
  display: flex;
  flex-direction: column;
  align-items: center;
  .logo {
    width: 200px;
    height: 200px;
    border-radius: 50px;
  }
  .login_txt {
    display: flex;
    align-items: center;
    flex-direction: column;
    position: relative;
    margin-top: 50px;
    .mobile {
      border-bottom: 1px solid #b0b0b0;
      width: 654px;
      line-height: 100px;
      font-size: 27px;
      color: #4e4e4e;
    }
    .headcoun {
      display: flex;
      flex-direction: row;
      align-items: center;
      position: relative;
    }
    .passright {
      position: absolute;
      right: 0;
      height: 100%;
      display: flex;
      align-items: center;
      .eye {
        width: 50px;
        height: 50px;
        margin-right: 10px;
        vertical-align: middle;
      }
      .forgetword {
        font-size: 24px;
        color: #4e4e4e;
        border-left: 1px solid #4e4e4e;
        padding-left: 20px;
      }
    }
  }
  .receiveBtn {
    height: 100px;
    width: 600px;
    color: white;
    border-radius: 50px;
    background: linear-gradient(to right, #ff7f50, #ffa07a);
    margin-top: 100px;
    font-size: 34px;
  }
  .new-user {
    display: inline-block;
    width: 600px;
    font-size: 27px;
    color: #4e4e4e;
    text-align: right;
    margin-top: 20px;
  }
}
</style>
