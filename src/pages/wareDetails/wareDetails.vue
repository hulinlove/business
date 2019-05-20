<template>
  <div class="box" v-if="GoodDetails">
    <div class="ware_top">
      <my-header goBack="true" ellipsis="true" share="true">
        <span
          slot="ware"
          class="nav_ware"
          @click="hashChange(0, 'ware')"
          :class="{nav_selected: status==='ware'}"
        >商品</span>
        <span
          slot="detail"
          class="nav_detail"
          @click="hashChange(1, 'detail')"
          :class="{nav_selected: status==='detail'}"
        >详情</span>
      </my-header>
    </div>
    <div class="ware_detail d_jump">
      <div class="ware_basic">
        <swiper :options="swiperOption" ref="mySwiper" class="slides">
          <swiper-slide v-for="(item,index) in GoodDetails.wareImageCarousel" :key="index">
            <div class="image_carousel">
              <img :src="item.uri" alt>
            </div>
          </swiper-slide>
          <div class="swiper-pagination pagination" slot="pagination"></div>
        </swiper>
        <div class="price_detail">
          <span class="ware_price">
            <i>￥</i>
            {{GoodDetails.warePrice}}
          </span>
          <!-- <span class="reduce_price">
            <i class="iconfont icon-jiangjiatongzhi"></i>
            <i>降价通知</i>
          </span>-->
          <span class="concern" @click="concern()">
            <i class="iconfont icon-heart" v-if="isConcern === 0"></i>
            <i v-if="isConcern === 0">收藏</i>
            <i class="iconfont icon-heart-fill concerned" style="color: red" v-if="isConcern === 1"></i>
            <i v-if="isConcern === 1">已收藏</i>
          </span>
        </div>
        <div class="ware_name">
          <span>{{GoodDetails.wareName}}</span>
        </div>
        <div class="info_official">
          <span>
            <i class="iconfont icon-check-circle"></i>官方授权
          </span>
          <span>
            <i class="iconfont icon-check-circle"></i>正品保证
          </span>
          <span>
            <i class="iconfont icon-check-circle"></i>店铺售后
          </span>
        </div>
        <div class="selected" @click="openParams()">
          <span class="parameter_select ellipsis">
            <i>已选</i>
            {{GoodDetails.wareModeDesc}}
          </span>
          <span class="storeage">仅剩{{GoodDetails.wareStorage}}件</span>
          <i class="iconfont icon-right"></i>
        </div>
        <div class="transport">
          <span class="address ellipsis">
            <i>送至</i>
            {{GoodDetails.receiveAddress}}
          </span>
          <span class="now_have" v-if="GoodDetails.isHave === 1">现货</span>
          <span class="now_have" v-if="GoodDetails.isHave === 0">预售</span>
          <span class="fee">
            <i>运费</i>
            <i v-if="GoodDetails.logisticsFee === 0">免运费</i>
            <i v-if="GoodDetails.logisticsFee !== 0">{{GoodDetails.logisticsFee}}</i>
          </span>
        </div>
        <div class="store">
          <div class="store_basic">
            <img class="store_logo" src alt>
            <span class="store_name">
              <i>{{GoodDetails.storeName}}</i>
              <i>综合评分{{GoodDetails.storeGrade}}</i>
            </span>
          </div>
          <div class="store_grade">
            <span>
              <i>{{GoodDetails.concernPeople}}</i>
              <i>关注人数</i>
            </span>
            <span>
              <i>{{GoodDetails.allPeople}}</i>
              <i>全部商品</i>
            </span>
            <span>
              <i>
                物流&nbsp;
                <a>{{GoodDetails.logistics}}高</a>
              </i>
              <i>
                商品&nbsp;
                <a>{{GoodDetails.wareGrade}}高</a>
              </i>
              <i>
                服务&nbsp;
                <a>{{GoodDetails.serviceGrade}}高</a>
              </i>
            </span>
          </div>
          <div class="store_contact">
            <span>联系客服</span>
            <span>进店逛逛</span>
          </div>
        </div>
        <div class="nav_bottom d_jump">
          <ul class="list_nav">
            <li
              class="item_nav"
              v-for="(item,index) in navWare"
              :key="index"
              @click="changeBottom(index)"
              :class="{active: index === navIndex}"
            >{{item}}</li>
          </ul>
        </div>
        <div class="ad_imgs" v-if="this.navIndex === 0">
          <ul>
            <li v-for="(item,index) in GoodDetails.wareImageDetail" :key="index">
              <img :src="item.uri" alt>
            </li>
          </ul>
        </div>
        <div v-if="this.navIndex === 1" class="parameter_shop">
          <div>
            <h3>商品参数</h3>
            <div class="parameter">
              <ul>
                <li v-for="(item, index) in GoodDetails.baseAttribute" :key="index">
                  <span>{{item.wareAttributeName}}</span>
                  <span>{{item.wareAttributeItemName}}</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="footer">
      <ul>
        <li>
          <i class="iconfont icon-store"></i>
          <span>店铺</span>
        </li>
        <li @click="goCart()">
          <i class="iconfont icon-cart"></i>
          <span>购物车</span>
          <i class="cart-num" v-if="cartNum !== 0">{{cartNum}}</i>
        </li>
        <li @click="addCart()">
          <span>加入购物车</span>
        </li>
        <li @click="buy()">
          <span>立即购买</span>
        </li>
      </ul>
    </div>
    <div v-if="showLayer">
      <layer-param
        :details="GoodDetails"
        :show="showLayer"
        :attributes="attributes"
        :sureType="sureType"
        @getData="getShow"
      ></layer-param>
    </div>
    <toast v-model="showTip" type="text" :time="2000" :text="text" position="middle"></toast>
    <toast v-model="showWarn" type="warn" :time="2000" :text="text" position="middle"></toast>
  </div>
</template>
<script>
import {
  wareDetail,
  concerned,
  cancelConcerned,
  cartNumber
} from '../../service/getData'
import layerParam from '../../components/layerParam.vue'
import { Toast } from 'vux'
export default {
  data () {
    return {
      status: 'ware',
      swiperOption: {
        // 带分页的轮播图
        pagination: {
          el: '.swiper-pagination',
          type: 'fraction'
        },
        autoplay: {
          delay: 2000,
          stopOnLastSlide: false
        }
      },
      navWare: ['商品介绍', '规格参数'],
      navIndex: 0,
      showLayer: false,
      GoodDetails: '',
      isConcern: 0,
      buyNumber: 1,
      attributes: [],
      wareId: '',
      showTip: false,
      showWarn: false,
      text: '',
      sureType: '', // 判断属性选择框确定的类型
      cartNum: 0
    }
  },
  components: {
    layerParam,
    Toast
  },
  mounted () {
    window.addEventListener('scroll', this.handleScroll, this.hashChange)
  },
  created () {
    this.wareId = this.$route.query.wareId
    this.getWareDetail(this.wareId)
    // this.init()
  },
  methods: {
    // 初始化商品信息
    async getWareDetail (wareId) {
      await wareDetail({ wareId: wareId }).then(res => {
        if (res.code === 0) {
          console.log(res)
          this.GoodDetails = res.data
          this.wareId = this.GoodDetails.wareId
          this.isConcern = this.GoodDetails.isConcern
          // 购物车商品的数量
          this.init()
          let attrs = []
          this.GoodDetails.wareAttribute.map((itemSelect, indexSelect) => {
            this.attributes.push(itemSelect.wareAttributeItemId)
            this.GoodDetails.properities.map((itemAttr, index) => {
              let isHas = itemAttr.wareAttributeItems.findIndex(
                (item, index) => {
                  return itemSelect.wareAttributeItemId === item.wareAttributeItemId
                })
              if (isHas !== -1) {
                attrs.push(itemAttr)
              }
            })
          })
          this.GoodDetails.properities = attrs
        }
      })
    },
    // 初始化购物车商品数量
    async init () {
      await cartNumber().then(res => {
        if (res.code === 0) {
          this.cartNum = res.data
        }
      })
    },
    Initialization () {
      document.body.scrollTop = 0
    },
    handleScroll () {
      var scrollTop = document.documentElement.scrollTop || document.body.scrollTop
      if (scrollTop <= 710) {
        this.index = 1
      } else if (scrollTop >= 714) {
        this.index = 0
      }
    },
    hashChange (num, status) {
      this.status = status
      // 获取需要滚动的距离
      this.index = num
      let jump = document.querySelectorAll('.d_jump')
      let total = jump[num].offsetTop
      let distance =
        document.documentElement.scrollTop || document.body.scrollTop
      // 平滑滚动，时长500ms，每10ms一跳，共50跳
      let step = total / 50
      if (total > distance) {
        smoothDown()
      } else {
        let newTotal = distance - total
        step = newTotal / 50
        smoothUp()
      }
      function smoothDown () {
        if (distance < total) {
          distance += step
          document.body.scrollTop = distance
          document.documentElement.scrollTop = distance
          setTimeout(smoothDown, 10)
        } else {
          document.body.scrollTop = total
          document.documentElement.scrollTop = total
        }
      }
      function smoothUp () {
        if (distance > total) {
          distance -= step
          document.body.scrollTop = distance
          document.documentElement.scrollTop = distance
          setTimeout(smoothUp, 10)
        } else {
          document.body.scrollTop = total
          document.documentElement.scrollTop = total
        }
      }
    },
    // 切换底部导航
    changeBottom (index) {
      this.navIndex = index
    },
    // 打开选择属性的弹窗
    openParams () {
      document.body.style.position = 'fixed'
      this.showLayer = true
      this.sureType = 3
    },
    // 加入购物车
    addCart () {
      document.body.style.position = 'fixed'
      this.showLayer = true
      this.sureType = 1
    },
    // 立即购买
    buy () {
      document.body.style.position = 'fixed'
      this.showLayer = true
      this.sureType = 2
    },
    // 子组件向父组件传递内容，父组件接收
    getShow (object) {
      this.showLayer = object.show
      if (object.wareId) {
        this.wareId = object.wareId
        this.getWareDetail(this.wareId)
      }
      if (object.showToast) {
        this.showTip = true
        this.text = object.text
      }
      if (object.showWarn) {
        this.showWarn = true
        this.text = object.text
      }
      if (object.cartNumber) {
        this.cartNum = object.cartNumber
      }
    },
    // 收藏和取消收藏商品
    async concern () {
      if (this.isConcern === 0) {
        // 收藏商品
        await concerned({ wareId: this.wareId }).then(res => {
          if (res.code === 0) {
            this.isConcern = 1
            this.showTip = true
            this.text = '收藏成功'
          }
        })
      } else {
        // 取消收藏
        await cancelConcerned({ wareId: this.wareId }).then(res => {
          if (res.code === 0) {
            this.isConcern = 0
            this.showTip = true
            this.text = '取消收藏成功'
          }
        })
      }
    },
    // 去购物车页面
    goCart () {
      this.$router.push({ path: '/cart' })
    }
  }
}
</script>
<style lang="scss" scoped>
@import "../../assets/mixin.scss";
.box {
  padding-bottom: 120px;
}
.ware_top {
  background-color: #fff;
  .nav_ware,
  .nav_detail {
    font-size: 36px;
    color: #888888;
    line-height: 44px;
    position: absolute;
    top: 60px;
    width: 200px;
    text-align: center;
    padding-bottom: 30px;
  }
  .nav_ware {
    left: 150px;
  }
  .nav_detail {
    right: 200px;
  }
  .nav_selected {
    border-bottom: 6px solid red;
  }
}
.ware_detail {
  padding-top: 140px;
  padding-bottom: 100px;
  background-color: #fff;
  .ware_basic {
    position: relative;
    z-index: 0;
    .image_carousel {
      width: 100%;
      height: 750px;
    }
    .pagination {
      width: 82px;
      height: 44px;
      background: rgba(206, 206, 206, 0.6);
      border-radius: 100px;
      position: absolute;
      left: 648px;
      top: 686px;
    }
    .price_detail {
      height: 96px;
      width: 100%;
      display: flex;
      flex-direction: row;
      align-items: center;
      position: relative;
      .ware_price {
        margin-left: 32px;
        font-size: 46px;
        color: red;
        i {
          color: red;
          font-size: 36px;
        }
      }
      .reduce_price {
        position: absolute;
        top: 0;
        right: 150px;
        @include fcl();
        i:nth-child(1) {
          font-size: 46px;
          color: #4e4e4e;
        }
        i:nth-child(2) {
          color: #4e4e4e;
          font-size: 32px;
        }
      }
      .concern {
        position: absolute;
        top: 0;
        right: 32px;
        @include fcl();
        i:nth-child(1) {
          font-size: 46px;
          color: #4e4e4e;
        }
        i:nth-child(2) {
          color: #4e4e4e;
          font-size: 32px;
        }
      }
    }
    .ware_name {
      width: 100%;
      margin-top: 10px;
      border-bottom: 1px solid #d4d4d4;
      padding: 0 32px;
      span {
        display: inline-block;
        width: 686px;
        height: 72px;
        font-size: 32px;
        line-height: 36px;
        margin-bottom: 20px;
        color: #4e4e4e;
        @include ln(2);
      }
    }
    .info_official {
      width: 519px;
      margin: 20px auto;
      display: flex;
      justify-content: space-between;
      padding: 15px 0 15px 0;
      span,
      i {
        font-size: 26px;
        color: #4e4e4e;
        line-height: 28px;
      }
    }
    .selected {
      width: 100%;
      border-top: 20px solid #eee;
      font-size: 32px;
      padding: 20px 0;
      position: relative;
      display: flex;
      flex-direction: column;
      justify-content: center;
      .parameter_select {
        display: inline-block;
        margin-left: 32px;
        width: 680px;
        height: 38px;
        color: #4e4e4e;
        i {
          margin-right: 15px;
          color: #b0b0b0;
        }
      }
      .storeage {
        display: block;
        color: red;
        margin-left: 108px;
      }
      .icon-right {
        position: absolute;
        right: 32px;
        font-size: 36px;
      }
    }
    .transport {
      width: 100%;
      border-top: 20px solid #eee;
      border-bottom: 20px solid #eee;
      font-size: 32px;
      padding: 20px 0;
      .address,
      .fee {
        display: inline-block;
        margin-left: 32px;
        width: 680px;
        height: 38px;
        i:nth-child(1) {
          margin-right: 15px;
          color: #b0b0b0;
        }
        i:nth-child(2) {
          color: #4e4e4e;
        }
      }
      .now_have {
        display: block;
        color: red;
        margin-left: 108px;
        margin-bottom: 20px;
      }
    }
    .store {
      .store_basic {
        padding-top: 20px;
        padding-left: 32px;
        display: flex;
        flex-direction: row;
        .store_logo {
          display: inline-block;
          width: 100px;
          height: 100px;
          background-color: blue;
          border-radius: 10px;
          margin-right: 15px;
        }
        .store_name {
          font-size: 32px;
          display: flex;
          flex-direction: column;
          i:nth-child(1) {
            margin-bottom: 15px;
            color: #4e4e4e;
          }
          i:nth-child(2) {
            color: #b0b0b0;
          }
        }
      }
      .store_grade {
        width: 100%;
        display: flex;
        flex-direction: row;
        margin-top: 20px;
        span:nth-child(1),
        span:nth-child(2) {
          display: inline-block;
          width: 250px;
          display: flex;
          flex-direction: column;
          align-items: center;
          font-size: 32px;
          text-align: center;
          border-right: 1px solid #b0b0b0;
          padding-top: 15px;
          i:nth-child(1) {
            color: #4e4e4e;
          }
          i:nth-child(2) {
            color: #b0b0b0;
          }
        }
        span:nth-child(3) {
          font-size: 28px;
          display: flex;
          flex-direction: column;
          align-items: center;
          width: 250px;
          text-align: center;
          i {
            color: #4e4e4e;
          }
          a {
            color: red;
          }
        }
      }
      .store_contact {
        margin-top: 20px;
        span {
          display: inline-block;
          width: 300px;
          height: 72px;
          font-size: 30px;
          color: #4e4e4e;
          border-radius: 36px;
          border: 1px solid #b0b0b0;
          text-align: center;
          line-height: 72px;
        }
        span:nth-child(1) {
          margin: 0 50px;
        }
      }
    }
    .nav_bottom {
      margin-top: 20px;
      .list_nav {
        display: flex;
        width: 750px;
        height: 80px;
        justify-content: space-around;
        align-items: center;
        .item_nav {
          font-size: 24px;
          color: #666666;
          line-height: 32px;
        }
        .active {
          color: red !important;
        }
      }
    }
    .ad_imgs {
      width: 100%;
      img {
        width: 100%;
        height: 500px;
        display: block;
        background-color: #ddd;
      }
    }
    .parameter_shop {
      background-color: #fff;
      border-bottom: 21px solid #f4f5f4;
      h3 {
        display: inline-block;
        width: 686px;
        margin-left: 36px;
        font-size: 24px;
        color: #888888;
        line-height: 76px;
        border-top: 1px dashed #d4d4d4;
      }
      .parameter {
        ul:nth-child(1) {
          margin: 0 32px;
          border-top: 1px dashed #d4d4d4;
          li {
            height: 76px;
            width: 100%;
            display: flex;
            flex-direction: row;
            align-items: center;
            border-bottom: 1px dashed #d4d4d4;
            span:nth-child(1) {
              display: inline-block;
              width: 290px;
              font-size: 24px;
              color: #999999;
            }
            span:nth-child(2) {
              font-size: 24px;
              color: #666666;
            }
          }
        }
      }
    }
  }
}
.footer {
  position: fixed;
  bottom: 0;
  left: 0;
  width: 750px;
  z-index: 100;
  box-shadow: 0 -5px 10px #f5f5f5;
  ul {
    display: flex;
    flex-direction: row;
    li {
      height: 120px;
      flex: 1;
      display: flex;
      justify-content: center;
      text-align: center;
      align-items: center;
      flex-direction: column;
      flex: 1 1 auto;
      background-color: #fff;
      img {
        width: 44px;
        height: 43.2px;
      }
      span {
        font-size: 20px;
        color: #888888;
        line-height: 28px;
      }
    }
    li:nth-child(1),
    li:nth-child(2) {
      position: relative;
      .cart-num {
        position: absolute;
        top: 0;
        left: 80px;
        width: 40px;
        height: 40px;
        background-color: #ff7152;
        border-radius: 20px;
        text-align: center;
        font-family: Roboto-Regular;
        font-size: 20px;
        line-height: 40px;
        color: #ffffff;
      }
      i {
        color: #4e4e4e;
        font-size: 40px;
        margin-bottom: 10px;
      }
      span {
        color: #4e4e4e;
        font-size: 32px;
      }
    }
    li:nth-child(2) {
      i {
        font-size: 46px;
        margin-bottom: 5px;
      }
    }
    li:nth-child(3),
    li:nth-child(4) {
      flex-basis: 220px;
      span {
        font-family: "MicrosoftYaHei";
        font-size: 32px;
        color: #ffffff;
        line-height: 40px;
      }
    }
    li:nth-child(3) {
      background-image: linear-gradient(
        -90deg,
        rgb(247, 112, 82) 4%,
        rgb(255, 89, 24) 96%
      );
    }
    li:nth-child(4) {
      background-image: linear-gradient(-90deg, rgb(247, 95, 1) 4%, red 96%);
    }
  }
}
</style>
