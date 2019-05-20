<template>
<div>
  <layer
    v-model="show"
    :shade="true"
    styles="width:100%;height:100%;background-color:transparent;display: block;"
    :type="1"
  >
    <div class="layer_box">
      <div class="background" @click="close()"></div>
      <div class="layer_content">
        <div class="layer_ware">
          <img :src="details.wareImage[0].uri" alt class="ware_pic">
          <div class="layer_detail">
            <span class="price_layer">
              <i>￥</i>
              {{details.warePrice}}
            </span>
            <span class="stock_layer">仅剩{{details.wareStorage}}件</span>
            <span class="itemno">商品编号: {{details.wareNumber}}</span>
          </div>
          <i class="iconfont icon-101" @click="close()">x</i>
        </div>
        <div class="layer_parameter">
          <div class="parameter" v-for="(itemList, index) in details.properities" :key="index">
            <span class="attribute_value">{{itemList.wareAttributeName}}</span>
            <div class="attribute_item">
              <span
                v-for="(item, indexItem) in itemList.wareAttributeItems"
                :key="indexItem"
                @click="choose(index, item.wareAttributeItemId)"
                :class="{active: item.wareAttributeItemId == attributes[index]}"
              >{{item.wareAttributeItemName}}</span>
            </div>
          </div>
          <div class="buy_number">
            <i class="number">数量</i>
            <i class="iconfont icon-minus-circle minus" @click="minus()"></i>
            <input type="text" v-model="buyNumber">
            <i class="iconfont icon-plus-circle add" @click="add()"></i>
          </div>
        </div>
        <div class="layer_footer">
          <span @click="sure()">确定</span>
        </div>
      </div>
    </div>
  </layer>
</div>
</template>
<script>
import { getWareId, addCart, cartNumber } from '../service/getData'
import { setStore, getStore } from '../utils/utils'
import { Toast } from 'vux'
export default {
  data () {
    return {
      buyNumber: 1,
      choosed: true
    }
  },
  props: {
    details: {
      type: Object
    },
    show: {
      type: Boolean
    },
    attributes: {
      type: Array
    },
    sureType: {
      type: Number
    }
  },
  components: {
    Toast
  },
  methods: {
    close () {
      document.body.style.position = ''
      this.$emit('getData', {show: false})
    },
    // 属性选择
    async choose (index, sonId) {
      if (!this.choosed) {
        return
      }
      let that = this
      that.choosed = false
      let attrs = []
      // 保存之前选择的属性，为了当现在选择的属性商品不存在的时候回显之前的属性
      setStore('formerAttrs', this.attributes)
      this.$set(this.attributes, index, sonId)
      this.details.properities.map((itemList, indexList) => {
        let attr = itemList.wareAttributeItems.find((item, index) => {
          return this.attributes[indexList] === item.wareAttributeItemId
        })
        if (attr) {
          attrs.push({
            wareAttributeItemId: attr.wareAttributeItemId,
            wareAttributeItemValue: attr.wareAttributeItemValue
          })
        }
      })
      await getWareId({
        attributeItems: attrs,
        wareId: this.details.wareId
      }).then(res => {
        if (res.code === 0) {
          this.details.wareId = res.data.wareId
          that.choosed = true
          if (this.details.wareId != null) {
            this.$emit('getData', {show: true, wareId: this.details.wareId})
          }
        } else {
          this.attributes = JSON.parse(getStore('formerAttrs'))
          setTimeout(function () {
            that.choosed = true
          }, 500)
        }
      })
    },
    // 商品数量的加
    add () {
      this.buyNumber++
    },
    // 商品数量的减
    minus () {
      if (this.buyNumber !== 1) {
        this.buyNumber--
      }
    },
    // 选择属性的确定
    async sure () {
      document.body.style.position = ''
      if (this.sureType === 1) {
        // 加入购物车
        await addCart({wareId: this.details.wareId, buyNumber: this.buyNumber}).then(res => {
          if (res.code === 0) {
            // 向父组件发送信息，显示提示的弹窗
            cartNumber().then(res => {
              if (res.code === 0) {
                this.$emit('getData', {show: false, showToast: true, text: '添加购物车成功', cartNumber: res.data})
              }
            })
          }
        })
      } else if (this.sureType === 2) {
        if (this.buyNumber > this.details.wareMaxBuyNum) {
          this.$emit('getData', {show: false, showWarn: true, text: '您的最大购买量为' + this.details.wareMaxBuyNum})
          return
        }
        if (this.buyNumber > this.details.wareStorage) {
          this.$emit('getData', {show: false, showWarn: true, text: '此商品库存不足~'})
          return
        }
        // 立即购买
        let result = {
          allPrice: this.details.warePrice * this.buyNumber,
          result: [
            {
              storeId: this.details.storeId,
              storeName: this.details.storeName,
              wares: [
                {
                  wareId: this.details.wareId,
                  wareImage: this.details.wareImage,
                  wareSpec: this.details.wareSpec,
                  wareName: this.details.wareName,
                  warePrice: this.details.warePrice,
                  buyNumber: this.buyNumber
                }
              ]
            }
          ]
        }
        let idNum = [{wareId: this.details.wareId, buyNumber: this.buyNumber}]
        setStore('buyWares', JSON.stringify(result))
        setStore('idNum', JSON.stringify(idNum))
        this.$router.push('/order')
      } else {
        this.$emit('getData', {show: false})
      }
    }
  }
}
</script>
<style lang="scss" scoped>
.layer_box {
  display: flex;
  flex-direction: column;
  height: 100vh; // 视口的高度
  .background {
    width: 100%;
    height: 500px;
  }
  .layer_content {
    background-color: #fff;
    flex: 1;
    padding: 32px 0 0 32px;
    .layer_ware {
      display: flex;
      flex-direction: row;
      position: relative;
      .ware_pic {
        display: inline-block;
        width: 228px;
        height: 228px;
        background-color: #ddd;
      }
      .layer_detail {
        display: flex;
        flex-direction: column;
        justify-content: flex-end;
        padding-left: 30px;
        .price_layer {
          color: red;
          font-size: 46px;
          margin-bottom: 10px;
          line-height: 46px;
          i {
            color: red;
            font-size: 36px;
          }
        }
        .stock_layer {
          color: red;
          font-size: 32px;
          line-height: 32px;
          margin-bottom: 10px;
        }
        .itemno {
          font-size: 32px;
          color: #4e4e4e;
          line-height: 32px;
        }
      }
      .icon-101 {
        position: absolute;
        top: 0;
        right: 20px;
        color: #4e4e4e;
        font-size: 40px;
      }
    }
    .layer_parameter {
      padding-top: 40px;
      padding-bottom: 120px;
      height: 400px;
      overflow-y: scroll;
      .parameter {
        .attribute_value {
          color: #4e4e4e;
          font-size: 32px;
        }
        .attribute_item {
          padding-top: 20px;
          span {
            color: #4e4e4e;
            font-size: 32px;
            display: inline-block;
            padding: 20px 35px;
            border-radius: 45px;
            background-color: #eee;
            text-align: center;
            margin-right: 30px;
            margin-bottom: 30px;
          }
          .active {
            background-color:#f77052;
            color: #fff
          }
        }
        .atttibute_selected {
          color: red !important;
          border: 1px solid red;
        }
      }
      .buy_number {
        display: flex;
        flex-direction: row;
        align-items: center;
        margin-top: 20px;
        .number {
          color: #4e4e4e;
          font-size: 32px;
          margin-right: 380px;
        }
        .minus {
          font-size: 46px;
          color: #4e4e4e;
        }
        input {
          display: inline-block;
          width: 100px;
          height: 60px;
          font-size: 32px;
          color: #4e4e4e;
          line-height: 60px;
          text-align: center;
          margin: 0 10px;
        }
        .add {
          font-size: 46px;
          color: #4e4e4e;
        }
      }
    }
    .layer_footer {
      position: fixed;
      bottom: 0;
      left: 0;
      width: 100%;
      span {
        display: inline-block;
        width: 100%;
        height: 100px;
        background-image: linear-gradient(
          -90deg,
          rgb(247, 112, 82) 4%,
          rgb(255, 89, 24) 96%
        );
        color: #fff;
        font-size: 32px;
        text-align: center;
        line-height: 100px;
      }
    }
  }
}
</style>
