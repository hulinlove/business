<template>
  <div class="footer">
    <footer class="fixBottomBox">
      <ul class="box-nav">
        <router-link tag="li" to="/home" class="tabItem">
          <i class="iconfont icon-home" :class="{active: $route.path.indexOf('home') !== -1}"></i>
          <span :class="{active: $route.path.indexOf('home') !== -1}">首页</span>
        </router-link>
        <router-link tag="li" to="/catgory" class="tabItem">
          <i class="iconfont icon-faxian1" :class="{active: $route.path.indexOf('catgory') !== -1}"></i>
          <span :class="{active: $route.path.indexOf('catgory') !== -1}">发现</span>
        </router-link>
        <router-link tag="li" to="/cart" class="tabItem">
          <i class="iconfont icon-cart1" :class="{active: $route.path.indexOf('cart') !== -1}"></i>
          <span :class="{active: $route.path.indexOf('cart') !== -1}">购物车</span>
        </router-link>
        <router-link tag="li" to="/myCenter" class="tabItem">
          <i class="iconfont icon-mine" :class="{active: $route.path.indexOf('myCenter') !== -1}"></i>
          <span :class="{active: $route.path.indexOf('myCenter') !== -1}">我的</span>
        </router-link>
      </ul>
    </footer>
  </div>
</template>
<style scoped  lang="scss">
.fixBottomBox{
    position: fixed;
    bottom: 0;
    left: 0;
    z-index: 999;
    width: 100%;
    height: 100px;
    box-shadow: 1px 0 4px 0 rgba(0,0,0,0.10);
    background-color: #fff;
    .box-nav {
      width: 100%;
      height: 100%;
      display: flex;
      flex-direction: row;
      justify-content: space-around;
      align-items: center;
      li {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        .iconfont {
          font-size: 36px;
          color: #4e4e4e;
          margin-bottom: 5px;
        }
        span {
          font-size: 26px;
          color: #4e4e4e;
        }
      }
    }
    .active {
      color: #f76f4f !important;
    }
}
</style>
