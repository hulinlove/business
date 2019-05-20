<template>
  <div class="box">
    <div class="top-cart">
      <myHeader headTitle="购物车">
        <span slot="finish" class="finish" @click="change()">{{manage}}</span>
      </myHeader>
    </div>
    <div class="cart">
      <div class="content_cart" v-for="(itemList, index) in cartList" :key="index">
        <div class="cart-top">
          <i class="iconfont icon-check-circle icon_img" v-if="itemList.isSelect === 0" @click="selectAll(itemList)"></i>
          <i class="iconfont icon-check-circle-fill icon_img ic-select" v-if="itemList.isSelect === 1" @click="selectAll(itemList)"></i>
          <i class="iconfont icon-store shop_normal" alt></i>
          <span class="name_store">{{itemList.storeName}}</span>
        </div>
        <div>
          <div class="ware" v-for="(item, indexW) in itemList.wares" :key="indexW">
            <i class="iconfont icon-check-circle icon_imgs" v-if="item.isSelect === 0" @click="select(itemList, item)"></i>
            <i class="iconfont icon-check-circle-fill icon_imgs ic-select" v-if="item.isSelect === 1" @click="select(itemList, item)"></i>
            <img :src="item.wareImage[0].uri" class="ware-image" @click="goDetail(item.wareId)">
            <ul>
              <li>{{item.wareName}}</li>
              <li v-if="isManage === 0">
                <span v-for="(attr, attrIndex) in item.wareAttribute" :key="attrIndex">{{attr.wareAttributeName}}:{{attr.wareAttributeItemName}}</span>
              </li>
              <li class="show_color" v-if="isManage === 1">
                <span v-for="(attr, attrIndex) in item.wareAttribute" :key="attrIndex">{{attr.wareAttributeName}}:{{attr.wareAttributeItemName}}</span>
                <i class="iconfont icon-right ic-down"></i>
              </li>
              <li>
                <i>￥</i>
                <span class="price_ware">{{item.warePrice}}</span>
                <span class="num">
                  <i class="iconfont icon-jiajian-1 minus" @click="minus(item)"></i>
                  <i class="num_">{{item.buyNumber}}</i>
                  <i class="iconfont icon-jiajian- add" @click="add(item)"></i>
                </span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
    <div class="account">
      <span class="sum">
        合计:
        <i>￥{{totalPrice}}</i>
      </span>
      <span class="balance" v-if="isManage === 0" @click="count()">结算({{choosedNum}})</span>
      <span class="delete" v-if="isManage === 1" @click="deleteWares()">删除</span>
    </div>
    <myFooter></myFooter>
    <toast v-model="showTip" type="warn" :time="2000" :text="text" position="middle"></toast>
  </div>
</template>
<script>
import { cartList, addNum, minusNum, delCartWares } from '../../service/getData.js'
import { setStore, getStore } from '../../utils/utils'
import { Toast } from 'vux'
export default {
  data () {
    return {
      isManage: 0,
      manage: '完成',
      cartList: [],
      showTip: false,
      text: '',
      totalPrice: 0,
      choosedNum: 0,
      wareIds: []
    }
  },
  created () {
    this.init()
  },
  components: {
    Toast
  },
  methods: {
    // 完成与管理的切换
    change () {
      if (this.isManage === 0) {
        this.manage = '管理'
        this.isManage = 1
      } else {
        this.manage = '完成'
        this.isManage = 0
      }
    },
    // 进入商品详情页
    goDetail (wareId) {
      this.$router.push({path: '/wareDetails', query: {wareId: wareId}})
    },
    // 初始化，查询购物车列表
    async init () {
      await cartList().then(res => {
        if (res.code === 0) {
          this.cartList = res.data
          this.cartList.map(itemList => {
            this.$set(itemList, 'isSelect', 0)
            itemList.wares.map(item => {
              this.$set(item, 'isSelect', 0)
            })
          })
          console.log(this.cartList)
        }
      })
    },
    // 店铺下的全选
    selectAll (store) {
      if (store.isSelect === 0) {
        this.$set(store, 'isSelect', 1)
        store.wares.map(item => {
          this.$set(item, 'isSelect', store.isSelect)
          this.choosedNum++
          this.countPrice('+', item.warePrice, item.buyNumber)
          this.wareIds.push(item.wareId)
        })
      } else {
        this.$set(store, 'isSelect', 0)
        store.wares.map(item => {
          this.$set(item, 'isSelect', store.isSelect)
          this.choosedNum--
          this.countPrice('-', item.warePrice, item.buyNumber)
          let index = this.wareIds.indexOf(item.wareId)
          this.wareIds.splice(index, 1)
        })
      }
    },
    // 选择单个商品
    select (store, ware) {
      if (ware.isSelect === 0) {
        this.$set(ware, 'isSelect', 1)
        this.choosedNum++
        // 调用计算商品总价格的方法
        this.countPrice('+', ware.warePrice, ware.buyNumber)
        this.wareIds.push(ware.wareId)
      } else {
        this.$set(ware, 'isSelect', 0)
        this.choosedNum--
        this.countPrice('-', ware.warePrice, ware.buyNumber)
        let index = this.wareIds.indexOf(ware.wareId)
        this.wareIds.splice(index, 1)
      }
      let noSelect = store.wares.filter(item => { return item.isSelect === 0 })
      if (noSelect.length === 0) {
        this.$set(store, 'isSelect', 1)
      } else {
        this.$set(store, 'isSelect', 0)
      }
    },
    // 计算商品的总价格
    countPrice (option, price, num) {
      if (option === '+') {
        this.totalPrice = (parseFloat((+this.totalPrice).toFixed(2)) + parseFloat(parseFloat(price).toFixed(2) * num)).toFixed(2)
      } else {
        this.totalPrice = (parseFloat((+this.totalPrice).toFixed(2)) - parseFloat(parseFloat(price).toFixed(2) * num)).toFixed(2)
      }
    },
    // 商品数量的加
    async add (ware) {
      if (ware.buyNumber >= ware.wareMaxBuyNum) {
        this.showTip = true
        this.text = '您的最大购买量为' + ware.wareMaxBuyNum
        return
      }
      if (ware.buyNumber >= ware.wareStorage) {
        this.showTip = true
        this.text = '库存不足'
        return
      }
      await addNum({wareId: ware.wareId}).then(res => {
        if (res.code === 0) {
          ware.buyNumber++
          if (ware.isSelect === 1) {
            this.countPrice('+', ware.warePrice, 1)
          }
        }
      })
    },
    // 商品数量的减
    async minus (ware) {
      if (ware.buyNumber !== 1) {
        await minusNum({wareId: ware.wareId}).then(res => {
          if (res.code === 0) {
            if (ware.buyNumber !== 1) {
              ware.buyNumber--
              if (ware.isSelect === 1) {
                this.countPrice('-', ware.warePrice, 1)
              }
            }
          }
        })
      }
    },
    // 删除商品
    async deleteWares () {
      console.log(this.wareIds)
      if (this.wareIds.length === 0) {
        this.showTip = true
        this.text = '您还没有勾选任何商品哦~'
      } else {
        await delCartWares({wareIds: this.wareIds}).then(res => {
          if (res.code === 0) {
            this.showTip = true
            this.text = '删除成功'
            this.init()
            this.totalPrice = 0
            this.choosedNum = 0
          }
        })
      }
    },
    // 结算
    count () {
      let result = {
        allPrice: this.totalPrice,
        result: []
      }
      let idNum = []
      this.wareIds.map(wareId => {
        this.cartList.map(itemList => {
          let res = {
            storeId: itemList.storeId,
            storeName: itemList.storeName,
            wares: []
          }
          itemList.wares.map(item => {
            if (wareId === item.wareId && item.isSelect === 1) {
              let ware = {
                wareId: item.wareId,
                wareImage: item.wareImage,
                wareSpec: item.wareSpec,
                wareName: item.wareName,
                warePrice: item.warePrice,
                buyNumber: item.buyNumber
              }
              idNum.push({wareId: item.wareId, buyNumber: item.buyNumber})
              res.wares.push(ware)
              let flag = false
              result.result.map(resItem => {
                if (resItem.storeId === itemList.storeId) {
                  flag = true
                  resItem.wares.push(ware)
                }
              })
              if (!flag) {
                result.result.push(res)
              }
            }
          })
        })
      })
      setStore('buyWares', JSON.stringify(result))
      setStore('idNum', JSON.stringify(idNum))
      // 已经结算的商品要从购物车里面踢出
      let cartIds = JSON.parse(getStore('cartIds'))
      let newCartIds = []
      cartIds.map((cartId, index) => {
        let flag = false
        this.wareIds.map(wareId => {
          if (cartId.wareId === wareId) {
            flag = true
          }
        })
        if (!flag) {
          newCartIds.push(cartId)
        }
      })
      setStore('cartIds', JSON.stringify(newCartIds))
      this.$router.push('/order')
    }
  }
}
</script>
<style lang="scss" scoped>
.box {
  position: absolute;
  width: 100%;
  height: 100%;
  background-color: #fff;
  .top-cart {
    position: relative;
    .finish {
      position: absolute;
      top: 72px;
      right: 32px;
      font-family: "MicrosoftYaHei";
      font-size: 28px;
      color: #666666;
      line-height: 36px;
    }
  }
  .cart {
    padding-top: 140px;
    padding-bottom: 240px;
    .content_cart {
      border-top: 12px solid #f4f5f4;
      position: relative;
      .ic-select {
        color: #ff5919 !important;
      }
      .cart-top {
        display: flex;
        flex-direction: row;
        align-items: center;
        height: 70px;
        background: #fcfcfc;
        .icon_img {
          display: block;
          font-size: 40px;
          position: absolute;
          left: 32px;
          color: #eee;
        }
        .shop_normal {
          display: inline-block;
          width: 29.5px;
          height: 28.9px;
          position: absolute;
          left: 92px;
          color: #666666;
        }
        .name_store {
          margin: 0 10px 0 132px;
          font-family: "MicrosoftYaHei";
          font-size: 26px;
          color: #4e4e4e;
        }
      }
      .ware {
        position: relative;
        width: 100%;
        height: 268px;
        background-color: #fff;
        padding-left: 92px;
        display: flex;
        align-items: center;
        flex-direction: row;
        .icon_imgs {
          display: block;
          font-size: 40px;
          color: #eee;
          position: absolute;
          left: 32px;
        }
        .ware-image {
          display: inline-block;
          width: 208px;
          height: 208px;
        }
        ul {
          padding-left: 20px;
          li {
            width: 400px;
            display: flex;
            font-family: "MicrosoftYaHei";
          }
          li:nth-child(1) {
            display: inline-block;
            width: 400px;
            height: 72px;
            font-size: 28px;
            color: #333333;
            line-height: 36px;
            overflow: hidden;
            text-overflow: ellipsis;
            display: -webkit-box;
            -webkit-line-clamp: 2;
            -webkit-box-orient: vertical;
          }
          li:nth-child(2) {
            padding-top: 17px;
            line-height: 32px;
            width: 400px;
            display: inline-block;
            text-overflow: ellipsis;
            white-space: nowrap;
            overflow: hidden;
            color: #999999;
            font-size: 24px;
            padding-right: 10px;
          }
          .show_color {
            padding-top: 0 !important;
            font-size: 24px;
            color: #999999;
            line-height: 32px;
            margin-top: 17px;
            width: 400px;
            height: 37px;
            background-color: #f4f5f5;
            border-radius: 3px;
            position: relative;
            .ic-down {
              position: absolute;
              left: 375px;
              top: 0;
              font-family: "simple-line-icons";
              font-size: 14px;
              color: #999999;
              line-height: 38px;
            }
          }
          li:nth-child(3) {
            padding-top: 39px;
            i {
              font-family: "PingFangSC-Regular";
              font-size: 26px;
              color: #ff7152;
            }
            .price_ware {
              font-family: "Roboto-Regular";
              font-size: 40px;
              color: #ff7152;
              line-height: 37px;
              display: block;
              width: 200px;
            }
            .num {
              display: flex;
              flex-direction: row;
              .minus {
                display: flex;
                align-items: center;
                justify-content: center;
                width: 70px;
                height: 48px;
                border: 1px solid #b0b0b0;
                border-radius: 4px 0 0 4px;
                color: rgba(176, 176, 176, 0.3);
              }
              .num_ {
                display: flex;
                align-items: center;
                justify-content: center;
                width: 80px;
                height: 48px;
                border-top: 1px solid #b0b0b0;
                border-bottom: 1px solid #b0b0b0;
                font-family: "Roboto-Regular";
                font-size: 24px;
                color: #4e4e4e;
                line-height: 32px;
              }
              .add {
                display: flex;
                align-items: center;
                justify-content: center;
                width: 70px;
                height: 48px;
                border: 1px solid #b0b0b0;
                border-radius: 0 4px 4px 0;
                font-size: 35px;
                color: #b0b0b0;
                font-size: 16px;
              }
            }
          }
        }
      }
    }
  }
  .account {
    position: fixed;
    bottom: 120px;
    left: 0;
    width: 100%; //750px
    height: 100px;
    display: flex;
    flex-direction: row;
    justify-content: flex-end;
    align-items: center;
    background-color: #fff;
    .sum {
      font-family: "MicrosoftYaHei";
      font-size: 30px;
      color: #4e4e4e;
      line-height: 38px;
      margin-right: 20px;
      i {
        font-family: "Roboto-Regular";
        font-size: 40px;
        color: #ff7152;
        line-height: 40px;
      }
    }
    .balance,
    .delete {
      display: block;
      width: 220px;
      height: 100px;
      background-image: linear-gradient(-90deg, #f77052 4%, #ff5918 96%);
      font-family: MicrosoftYaHei;
      font-size: 36px;
      color: #ffffff;
      line-height: 100px;
      text-align: center;
    }
    .delete {
      background-image: linear-gradient(-90deg, #fe9179 4%, #f86868 96%);
    }
  }
}
</style>
