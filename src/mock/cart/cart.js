
import { getStore, setStore } from '../../utils/utils'
const Mock = require('mockjs')
const cartList = [
  {
    storeId: 1,
    storeName: '欧诗漫旗舰店',
    wares: [
      {
        wareId: 1,
        wareImage: [{ name: '1.jpg', uri: require('../../assets/images/1.jpg') }],
        warePrice: 457,
        wareName: '欧诗漫你值得拥有',
        wareSpec: '让你的皮肤从此可以捏出水来',
        wareStorage: 23,
        wareMaxBuyNum: 5,
        buyCount: 1,
        wareAttribute: [
          {
            wareAttributeId: 10001,
            wareAttributeItemId: 100001,
            wareAttributeName: '功能',
            wareAttributeItemName: '美白'
          },
          {
            wareAttributeId: 10002,
            wareAttributeItemId: 100002,
            wareAttributeName: '颜色',
            wareAttributeItemName: '白色'
          }
        ],
        wareNumber: 399806040124 // 商品编号
      },
      {
        wareId: 10,
        wareAttribute: [
          {
            wareAttributeId: 10001,
            wareAttributeItemId: 100004,
            wareAttributeName: '功能',
            wareAttributeItemName: '抗皱'
          },
          {
            wareAttributeId: 10002,
            wareAttributeItemId: 100003,
            wareAttributeName: '颜色',
            wareAttributeItemName: '红色'
          }
        ],
        wareImage: [{ name: '1.jpg', uri: require('../../assets/images/1.jpg') }],
        warePrice: 600,
        wareName: '欧诗漫水乳套装',
        wareSpec: '让你的皮肤水水嫩嫩',
        wareStorage: 23,
        wareMaxBuyNum: 5,
        buyCount: 1,
        wareNumber: 399806040124 // 商品编号
      }
    ]
  },
  {
    storeId: 2,
    storeName: '小狐狸代购',
    wares: [
      {
        wareId: 2,
        wareAttribute: [
          {
            wareAttributeId: 10001,
            wareAttributeItemId: 100001,
            wareAttributeName: '功能',
            wareAttributeItemName: '美白'
          },
          {
            wareAttributeId: 10002,
            wareAttributeItemId: 100003,
            wareAttributeName: '颜色',
            wareAttributeItemName: '红色'
          }
        ],
        wareImage: [{ name: '1.jpg', uri: require('../../assets/images/1.jpg') }],
        warePrice: 153,
        wareName: '高丽雅娜水乳套装',
        wareSpec: '皮肤一整天都水水的',
        wareStorage: 23,
        wareMaxBuyNum: 5,
        buyCount: 1,
        wareNumber: 963852741456// 商品编号
      }
    ]
  },
  {
    storeId: 3,
    storeName: '腹黑美少女',
    wares: [
      {
        wareId: 3,
        wareAttribute: [
          {
            wareAttributeId: 10003,
            wareAttributeItemId: 100005,
            wareAttributeName: '颜色分类',
            wareAttributeItemName: '粉色盘'
          }
        ],
        wareImage: [{ name: '1.jpg', uri: require('../../assets/images/1.jpg') }],
        warePrice: 42,
        wareName: 'imagic16色眼影盘 林小宅推荐',
        wareSpec: '每一个色号用了都会美到犯规，OMG',
        wareStorage: 23,
        wareMaxBuyNum: 5,
        buyCount: 1,
        wareNumber: 741852963863 // 商品编号
      }
    ]
  },
  {
    storeId: 4,
    storeName: '花栗鼠小姐',
    wares: [
      {
        wareId: 4,
        wareAttribute: [
          {
            wareAttributeId: 10005,
            wareAttributeItemId: 1000013,
            wareAttributeName: '尺码',
            wareAttributeItemName: 'S'
          },
          {
            wareAttributeId: 10006,
            wareAttributeItemId: 100009,
            wareAttributeName: '颜色',
            wareAttributeItemName: '豆沙绿'
          }
        ],
        logisticsFee: 0,
        wareImage: [{ name: '1.jpg', uri: require('../../assets/images/1.jpg') }],
        warePrice: 89,
        wareName: '针织短袖2019新款',
        wareSpec: '也太好看了吧，买它',
        wareStorage: 23,
        wareMaxBuyNum: 5,
        buyCount: 1,
        wareNumber: 399806040124 // 商品编号
      },
      {
        wareId: 11,
        wareAttribute: [
          {
            wareAttributeId: 10005,
            wareAttributeItemId: 1000014,
            wareAttributeName: '尺码',
            wareAttributeItemName: 'M'
          },
          {
            wareAttributeId: 10006,
            wareAttributeItemId: 1000012,
            wareAttributeName: '颜色',
            wareAttributeItemName: '小鸡黄'
          }
        ],
        logisticsFee: 0,
        wareImage: [{ name: '1.jpg', uri: require('../../assets/images/1.jpg') }],
        warePrice: 89,
        wareName: '针织短袖2019新款',
        wareSpec: '也太好看了吧，买它',
        wareStorage: 23,
        wareMaxBuyNum: 5,
        buyCount: 1,
        wareNumber: 399806040124 // 商品编号
      },
      {
        wareId: 12,
        wareAttribute: [
          {
            wareAttributeId: 10005,
            wareAttributeItemId: 1000014,
            wareAttributeName: '尺码',
            wareAttributeItemName: 'M'
          },
          {
            wareAttributeId: 10006,
            wareAttributeItemId: 1000011,
            wareAttributeName: '颜色',
            wareAttributeItemName: '豆沙粉'
          }
        ],
        logisticsFee: 0,
        wareImage: [{ name: '1.jpg', uri: require('../../assets/images/1.jpg') }],
        warePrice: 89,
        wareName: '针织短袖2019新款',
        wareSpec: '也太好看了吧，买它',
        wareStorage: 23,
        wareMaxBuyNum: 5,
        buyCount: 1,
        wareNumber: 399806040124 // 商品编号
      }
    ]
  },
  {
    storeId: 5,
    storeName: '南朋友美妆店',
    wares: [
      {
        wareId: 5,
        wareAttribute: [
          {
            wareAttributeId: 10007,
            wareAttributeItemId: 1000018,
            wareAttributeName: '颜色分类',
            wareAttributeItemName: '最白色'
          }
        ],
        wareImage: [{ name: '1.jpg', uri: require('../../assets/images/1.jpg') }],
        warePrice: 89,
        wareName: '波兰paese派斯粉底液',
        wareSpec: '保湿遮瑕，帮你打造奶油肌',
        wareStorage: 23,
        wareMaxBuyNum: 5,
        buyCount: 1,
        wareNumber: 852963741456 // 商品编号
      },
      {
        wareId: 14,
        wareAttribute: [
          {
            wareAttributeId: 10007,
            wareAttributeItemId: 1000019,
            wareAttributeName: '颜色分类',
            wareAttributeItemName: '奶白色'
          }
        ],
        wareImage: [{ name: '1.jpg', uri: require('../../assets/images/1.jpg') }],
        warePrice: 89,
        wareName: '波兰paese派斯粉底液',
        wareSpec: '保湿遮瑕，帮你打造奶油肌',
        wareStorage: 23,
        wareMaxBuyNum: 5,
        buyCount: 1,
        wareNumber: 852963741456 // 商品编号
      },
      {
        wareId: 15,
        wareAttribute: [
          {
            wareAttributeId: 10007,
            wareAttributeItemId: 1000020,
            wareAttributeName: '颜色分类',
            wareAttributeItemName: '象牙白'
          }
        ],
        wareImage: [{ name: '1.jpg', uri: require('../../assets/images/1.jpg') }],
        warePrice: 89,
        wareName: '波兰paese派斯粉底液',
        wareSpec: '保湿遮瑕，帮你打造奶油肌',
        wareStorage: 23,
        wareMaxBuyNum: 5,
        buyCount: 1,
        wareNumber: 852963741456 // 商品编号
      },
      {
        wareId: 6,
        wareAttribute: [
          {
            wareAttributeId: 10009,
            wareAttributeItemId: 1000023,
            wareAttributeName: '颜色分类',
            wareAttributeItemName: '橘调红'
          }
        ],
        wareImage: [{ name: '1.jpg', uri: require('../../assets/images/1.jpg') }],
        warePrice: 457,
        wareName: '戚薇同款mistine泰国小金条口红',
        wareSpec: '让你拥有女神的气色，气场全开',
        wareStorage: 10,
        wareMaxBuyNum: 5,
        buyCount: 1,
        wareNumber: 789258963456 // 商品编号
      }
    ]
  }
]
// 查询购物车列表
Mock.mock(RegExp('/cart/cartList' + '.*'), 'get', function (options) {
  let cartIds = JSON.parse(getStore('cartIds')) || []
  console.log(cartIds)
  let result = []
  if (cartIds.length !== 0) {
    cartList.map(itemList => {
      let wares = []
      itemList.wares.map(item => {
        cartIds.map(obj => {
          if (obj.wareId === item.wareId) {
            item.buyNumber = obj.buyNumber
            wares.push(item)
          }
        })
      })
      if (wares.length !== 0) {
        itemList.wares = wares
        result.push(itemList)
      }
    })
  }
  return {
    code: 0,
    data: result,
    msg: '查询购物车列表成功'
  }
})
// 查询购物车的商品数量
Mock.mock(RegExp('/cart/cartNumber' + '.*'), 'get', function (options) {
  let cartIds = JSON.parse(getStore('cartIds')) || []
  let cartNumber = 0
  if (cartIds.length !== 0) {
    cartIds.map(obj => {
      cartNumber += obj.buyNumber
    })
  }
  return {
    code: 0,
    data: cartNumber
  }
})
// 购物车商品数量的加
Mock.mock(RegExp('/cart/addNum' + '.*'), 'get', function (options) {
  let cartIds = JSON.parse(getStore('cartIds')) || []
  let param = JSON.parse(getStore('params'))
  for (let item of cartIds) {
    if (item.wareId === param.wareId) {
      item.buyNumber++
      setStore('cartIds', JSON.stringify(cartIds))
    }
    return {
      code: 0,
      msg: '商品数量添加成功'
    }
  }
})
// 购物车商品数量的减
Mock.mock(RegExp('/cart/minusNum' + '.*'), 'get', function (options) {
  let cartIds = JSON.parse(getStore('cartIds')) || []
  let param = JSON.parse(getStore('params'))
  for (let item of cartIds) {
    if (item.wareId === param.wareId) {
      item.buyNumber--
      setStore('cartIds', JSON.stringify(cartIds))
    }
    return {
      code: 0,
      msg: '商品数量减成功'
    }
  }
})
// 购物车内删除指定商品
Mock.mock(RegExp('/cart/delCartWares' + '.*'), 'get', function (options) {
  let cartIds = JSON.parse(getStore('cartIds')) || []
  let wareIds = JSON.parse(getStore('params')).wareIds
  wareIds.map(wareId => {
    cartIds.map((obj, index) => {
      if (obj.wareId === wareId) {
        cartIds.splice(index, 1)
      }
    })
  })
  setStore('cartIds', JSON.stringify(cartIds))
  return {
    code: 0,
    msg: '购物车删除商品成功'
  }
})
