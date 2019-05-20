<template>
  <div class="home">
    <div class="search">
      <i class="iconfont icon-search"></i>
      <input type="text" class="home-search" placeholder="请搜素您想要的商品">
    </div>
    <div class="m-layout">
      <!-- 轮播图-->
      <HomeBannerView></HomeBannerView>
      <img
        class="actimg"
        src="https://m.360buyimg.com/mobilecms/jfs/t1/7996/39/10711/89824/5c171070E9147c27d/8c4b32b2f4deef37.gif"
        alt
      >
      <!--京东快报-->
      <div class="news-box">
        <div class="jd-news">
          <img
            class="news-img"
            src="https://m.360buyimg.com/mobilecms/jfs/t14752/82/2574581467/6535/c8158ace/5aa8935bN94e31ff6.jpg.dpg"
            alt
          >
          <swiper :options="swiperOption" class="news-text">
            <swiper-slide>
              <span>应该做个精致猪猪男孩，Nice的家居睡衣是很有必要的</span>
            </swiper-slide>
            <swiper-slide>
              <span>节省空间又美观的玄关鞋柜，生活的小心机</span>
            </swiper-slide>
            <swiper-slide>
              <span>越来越多人都不铺地砖了，改做全屋水泥，知道为什么吗？</span>
            </swiper-slide>
            <swiper-slide>
              <span>保暖也要遮肉，秋冬如何穿出好身材？</span>
            </swiper-slide>
          </swiper>
        </div>
      </div>
      <!--东家小院-->
      <div class="jd-yard">
        <div class="tit-box">
          <span class="tit-img">
            <img
              class="img"
              src="https://m.360buyimg.com/mobilecms/s750x80_jfs/t25132/272/777079429/42670/e6ced36f/5b7a6fa1N94e7f9d9.jpg!q70.jpg.dpg"
            >
          </span>
        </div>
        <div class="yard-list">
          <div class="real-show" v-for="(item, index) in homeDetail.active1" :key="index">
            <div class="graphic-text">
              <strong class="graphic-tit" style="color: rgb(0, 0, 0);">{{item.wareName}}</strong>
              <p class="graphic-wz" style="color:#648EFF">{{item.wareSpec}}</p>
            </div>
            <div class="graphic-img">
              <img
                class="opa1"
                :src="item.wareImage[0].uri"
                style="opacity: 1;"
                @click="goDetail(item.wareId)"
              >
            </div>
          </div>
        </div>
      </div>
      <!--爱生活-->
      <div class="love-life">
        <div class="life-tit">
          <img
            class="img"
            src="//m.360buyimg.com/mobilecms/s750x80_jfs/t15526/56/2344102455/23273/d8e15d5a/5aa0dbc1Nefd2bd2a.png!q70.jpg.dpg"
          >
        </div>
        <div >
        <div class="box-list">
          <div class="real-show" v-for="(item, index) in homeDetail.active2" :key="index">
            <div class="graphic-text">
              <strong class="graphic-tit" style=" background: -webkit-linear-gradient(left,#FF2A2A,#F139D2);background: linear-gradient(90deg, #FF2A2A,#F139D2);-webkit-background-clip: text;color: transparent;">优惠免息</strong>
              <p class="graphic-wz" style="color:#648EFF">{{item.wareName}}</p>
            </div>
            <div class="graphic-img">
              <img
                class="opa1"
                :src="item.wareImage[0].uri"
                style="opacity: 1;"
                @click="goDetail(item.wareId)"
              >
            </div>
          </div>
        </div>
        </div>
      </div>
    </div>
     <myFooter></myFooter>
  </div>
</template>
<script>
import HomeBannerView from './HomeBanner.vue'
import { homeInIt } from '../../service/getData'
export default {
  data () {
    return {
      swiperOption: {
        direction: 'vertical',
        slidesPerView: 1,
        spaceBetween: 30,
        mousewheel: true,
        autoplay: {
          delay: 6000,
          stopOnLastSlide: false,
          disableOnInteraction: true
        }
      },
      homeDetail: {}
    }
  },
  components: {
    HomeBannerView
  },
  created () {
    this.init()
  },
  methods: {
    async init () {
      await homeInIt().then(res => {
        console.log(res)
        if (res.code === 0) {
          this.homeDetail = res.data
        }
      })
    },
    goDetail (wareId) {
      this.$router.push({path: '/wareDetails', query: {wareId: wareId}})
    }
  }
}
</script>
<style scoped  lang="scss">
@import '../../assets/mixin.scss';
.search {
  width: 100%;
  position: relative;
  background-color: #fff;
  display: flex;
  align-items: center;
  padding: 20px 0;
  .home-search {
    display: inline-block;
    width: 590px;
    height: 96px;
    border: 1px solid #eee;
    border-radius: 48px;
    font-size: 32px;
    color: #4e4e4e;
    margin: 0 auto;
    padding-left: 80px;
    line-height: 96px;
  }
  i {
    font-size: 40px;
    color: #4e4e4e;
    position: absolute;
    left: 110px;
  }
}
.m-layout{
    padding-bottom: 180px;
}
.actimg {
  width: 100%;
  height: 245px;
}
.box-btn {
  width: 100%;
  .box-list {
    width: 100%;
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: flex-start;
    .pan-box {
      width: 150px;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      .pan-img {
        width: 120px;
        height: 120px;
        border-radius: 60px;
        margin-top: 10px;
      }
      .pan-word {
        text-align: center;
        width: 150px;
        @include line;
      }
    }
  }
}
.news-box {
  margin: 20px 0;
  .jd-news {
    display: flex;
    .news-img {
      height: 48px;
      width: 168px;
    }
    .news-text {
     margin-left: 6px;
     margin-top: 2px;
      height: 40px;
      span {
        line-height: 40px;
      }
    }
  }
}
.jd-yard {
  .tit-box {
    .tit-img {
      display: flex;
      justify-content: center;
      padding: 0 150px;
      background-color: #f6f6f6;
      margin-bottom: 20px;
      .img {
        width: 450px;
        height: 70px;
      }
    }
  }
  .yard-con {
    display: flex;
    flex-direction: row;
    justify-content: center;
    .yard-first {
      width: 362px;
      .yard-word {
        display: flex;
        flex-direction: column;
        justify-content: center;
        .word-con {
          display: flex;
          text-align: center;
          padding: 0px 86px;
        }
        .word-tit {
          font-size: 24px;
          padding: 0px 70px;
        }
        .word-con::after {
          display: inline-block;
          width: 24px;
          height: 1px;
          content: "";
          position: relative;
          background: #000;
          top: 14px;
          left: 3px;
        }
        .word-con::before {
          display: inline-block;
          width: 24px;
          height: 1px;
          content: "";
          position: relative;
          background: #000;
          top: 14px;
          left: -3px;
        }
      }
      .img-box {
        display: flex;
        flex-direction: row;
        .img1-box {
          display: inline-block;
          margin: 20px;
          .img1 {
            width: 140px;
            height: 140px;
          }
        }
        .img2-box {
          display: inline-block;
          margin-top: 20px;
          .img2 {
            width: 140px;
            height: 140px;
          }
        }
      }
    }
    .yard-second {
      width: 362px;
      .yard-word {
        display: flex;
        flex-direction: column;
        justify-content: center;
        .word-con {
          display: flex;
          text-align: center;
          padding: 0px 86px;
        }
        .word-tit {
          font-size: 24px;
          padding: 0px 70px;
        }
        .word-con::after {
          display: inline-block;
          width: 24px;
          height: 1px;
          content: "";
          position: relative;
          background: #000;
          top: 14px;
          left: 3px;
        }
        .word-con::before {
          display: inline-block;
          width: 24px;
          height: 1px;
          content: "";
          position: relative;
          background: #000;
          top: 14px;
          left: -3px;
        }
      }
      .img-box {
        display: flex;
        flex-direction: row;
        .img1-box {
          display: inline-block;
          margin: 20px;
          .img1 {
            width: 140px;
            height: 140px;
          }
        }
        .img2-box {
          display: inline-block;
          margin-top: 20px;
          .img2 {
            width: 140px;
            height: 140px;
          }
        }
      }
    }
  }
  .yard-list {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    .real-show {
      width: 50%;
      display: flex;
      flex-direction: column;
      align-items: center;
      font-size: 28px;
      margin-top: 30px;
      .graphic-text {
        display: inline-block;
        width: 100%;
        .graphic-tit {
          display: inline-block;
          width: 100%;
          text-align: center;
          @include line();
        }
        .graphic-wz {
          width: 100%;
          height: 56px;
          line-height: 28px;
          text-align: center;
          margin-bottom: 10px;
          @include ln(2)
        }
      }
      .graphic-img {
        .opa1 {
          width: 181px;
        }
      }
    }
  }
}
.love-life {
  .life-tit {
    display: flex;
    align-items: center;
    margin: 20px 0;
    .img {
      width: 100%;
    }
  }
    .box-list {
      width: 100%;
      display: flex;
      flex-direction: row;
      flex-wrap: wrap;
    .real-show {
      width: 50%;
      display: flex;
      flex-direction: column;
      align-items: center;
      font-size: 28px;
      margin-top: 30px;
      .graphic-text {
        display: inline-block;
        width: 100%;
        .graphic-tit {
          display: inline-block;
          width: 100%;
          text-align: center;
        }
        .graphic-wz {
          width: 100%;
          height: 56px;
          line-height: 28px;
          text-align: center;
          margin-bottom: 10px;
          @include ln(2)
        }
      }
      .graphic-img {
        .opa1 {
          width: 181px;
        }
      }
    }
  }
}
</style>
