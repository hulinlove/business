import { setStore, getStore } from '../../utils/utils'
// 引入mock
const Mock = require('mockjs')
const wareDetailList = [
  {
    wareId: 1,
    isConcern: 0, // 是否关注 0未关注 1已关注
    storeName: '欧诗漫旗舰店',
    storeId: 1,
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
    properities: [
      {
        wareAttributeId: 10002,
        wareAttributeName: '颜色',
        wareAttributeItems: [
          {
            wareAttributeItemId: 100003,
            wareAttributeItemName: '红色'
          },
          {
            wareAttributeItemId: 100002,
            wareAttributeItemName: '白色'
          }
        ]
      },
      {
        wareAttributeId: 10001,
        wareAttributeName: '功能',
        wareAttributeItems: [
          {
            wareAttributeItemId: 100001,
            wareAttributeItemName: '美白'
          },
          {
            wareAttributeItemId: 100004,
            wareAttributeItemName: '抗皱'
          }
        ]
      }
    ],
    baseAttribute: [
      {
        wareAttributeId: 10003,
        wareAttributeItemId: 100005,
        wareAttributeItemName: '是',
        wareAttributeName: '是否支持夜间使用'
      },
      {
        wareAttributeId: 10004,
        wareAttributeItemId: 100006,
        wareAttributeItemName: '因人而异',
        wareAttributeName: '是否会引起过敏反应'
      }
    ],
    logisticsFee: 0,
    wareImage: [{ name: '1.jpg', uri: require('../../assets/images/1.jpg') }],
    wareImageCarousel: [{ name: '1.jpg', uri: require('../../assets/images/1.jpg') }, { name: '2.jpg', uri: require('../../assets/images/2.jpg') }, { name: '3.jpg', uri: require('../../assets/images/3.jpg') }],
    wareImageDetail: [{ name: '1.jpg', uri: require('../../assets/images/1.jpg') }, { name: '2.jpg', uri: require('../../assets/images/2.jpg') }, { name: '3.jpg', uri: require('../../assets/images/3.jpg') }],
    warePrice: 457,
    wareName: '欧诗漫你值得拥有',
    wareSpec: '让你的皮肤从此可以捏出水来',
    wareStorage: 23,
    wareMaxBuyNum: 5,
    buyCount: 1,
    wareModeDesc: '白色 美白',
    storeGrade: 9.6, // 店铺评分
    concernPeople: 70, // 关注人数
    allPeople: 370, // 全部商品
    logistics: 9.5, // 物流评分
    wareGrade: 9.6, // 商品评分
    serviceGrade: 9.5, // 服务评分
    receiveAddress: '河北省石家庄市珠峰大街南口288号石家庄学院南校区',
    isHave: 1, // 是否现货 0 预售 1 现货
    wareNumber: 399806040124 // 商品编号
  },
  {
    wareId: 10,
    isConcern: 0, // 是否关注 0未关注 1已关注
    storeName: '欧诗漫旗舰店',
    storeId: 1,
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
    properities: [
      {
        wareAttributeId: 10002,
        wareAttributeName: '颜色',
        wareAttributeItems: [
          {
            wareAttributeItemId: 100003,
            wareAttributeItemName: '红色'
          },
          {
            wareAttributeItemId: 100002,
            wareAttributeItemName: '白色'
          }
        ]
      },
      {
        wareAttributeId: 10001,
        wareAttributeName: '功能',
        wareAttributeItems: [
          {
            wareAttributeItemId: 100001,
            wareAttributeItemName: '美白'
          },
          {
            wareAttributeItemId: 100004,
            wareAttributeItemName: '抗皱'
          }
        ]
      }
    ],
    baseAttribute: [
      {
        wareAttributeId: 10003,
        wareAttributeItemId: 100005,
        wareAttributeItemName: '是',
        wareAttributeName: '是否支持夜间使用'
      },
      {
        wareAttributeId: 10004,
        wareAttributeItemId: 100006,
        wareAttributeItemName: '因人而异',
        wareAttributeName: '是否会引起过敏反应'
      }
    ],
    logisticsFee: 0,
    wareImage: [{ name: '1.jpg', uri: require('../../assets/images/1.jpg') }],
    wareImageCarousel: [{ name: '1.jpg', uri: require('../../assets/images/1.jpg') }, { name: '2.jpg', uri: require('../../assets/images/2.jpg') }, { name: '3.jpg', uri: require('../../assets/images/3.jpg') }],
    wareImageDetail: [{ name: '1.jpg', uri: require('../../assets/images/1.jpg') }, { name: '2.jpg', uri: require('../../assets/images/2.jpg') }, { name: '3.jpg', uri: require('../../assets/images/3.jpg') }],
    warePrice: 600,
    wareName: '欧诗漫水乳套装',
    wareSpec: '让你的皮肤水水嫩嫩',
    wareStorage: 23,
    wareMaxBuyNum: 5,
    buyCount: 1,
    wareModeDesc: '红色 抗皱',
    storeGrade: 9.6, // 店铺评分
    concernPeople: 70, // 关注人数
    allPeople: 370, // 全部商品
    logistics: 9.5, // 物流评分
    wareGrade: 9.6, // 商品评分
    serviceGrade: 9.5, // 服务评分
    receiveAddress: '河北省石家庄市珠峰大街南口288号石家庄学院南校区',
    isHave: 1, // 是否现货 0 预售 1 现货
    wareNumber: 399806040124 // 商品编号
  },
  {
    wareId: 2,
    isConcern: 1, // 是否关注 0未关注 1已关注
    storeName: '小狐狸代购',
    storeId: 2,
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
    properities: [
      {
        wareAttributeId: 10002,
        wareAttributeName: '颜色',
        wareAttributeItems: [
          {
            wareAttributeItemId: 100003,
            wareAttributeItemName: '红色'
          },
          {
            wareAttributeItemId: 100002,
            wareAttributeItemName: '白色'
          }
        ]
      },
      {
        wareAttributeId: 10001,
        wareAttributeName: '功能',
        wareAttributeItems: [
          {
            wareAttributeItemId: 100001,
            wareAttributeItemName: '美白'
          },
          {
            wareAttributeItemId: 100004,
            wareAttributeItemName: '抗皱'
          }
        ]
      }
    ],
    baseAttribute: [
      {
        wareAttributeId: 10003,
        wareAttributeItemId: 100005,
        wareAttributeItemName: '是',
        wareAttributeName: '是否支持夜间使用'
      },
      {
        wareAttributeId: 10004,
        wareAttributeItemId: 100006,
        wareAttributeItemName: '因人而异',
        wareAttributeName: '是否会引起过敏反应'
      }
    ],
    logisticsFee: 0,
    wareImage: [{ name: '1.jpg', uri: require('../../assets/images/1.jpg') }],
    wareImageCarousel: [{ name: '1.jpg', uri: require('../../assets/images/1.jpg') }, { name: '2.jpg', uri: require('../../assets/images/2.jpg') }, { name: '3.jpg', uri: require('../../assets/images/3.jpg') }],
    wareImageDetail: [{ name: '1.jpg', uri: require('../../assets/images/1.jpg') }, { name: '2.jpg', uri: require('../../assets/images/2.jpg') }, { name: '3.jpg', uri: require('../../assets/images/3.jpg') }],
    warePrice: 153,
    wareName: '高丽雅娜水乳套装',
    wareSpec: '皮肤一整天都水水的',
    wareStorage: 23,
    wareMaxBuyNum: 5,
    buyCount: 1,
    wareModeDesc: '红色 美白',
    storeGrade: 9.6, // 店铺评分
    concernPeople: 70, // 关注人数
    allPeople: 370, // 全部商品
    logistics: 9.5, // 物流评分
    wareGrade: 9.6, // 商品评分
    serviceGrade: 9.5, // 服务评分
    receiveAddress: '河北省石家庄市珠峰大街南口288号石家庄学院南校区',
    isHave: 1, // 是否现货 0 预售 1 现货
    wareNumber: 963852741456// 商品编号
  },
  {
    wareId: 3,
    isConcern: 0, // 是否关注 0未关注 1已关注
    storeName: '腹黑美少女',
    storeId: 3,
    wareAttribute: [
      {
        wareAttributeId: 10003,
        wareAttributeItemId: 100005,
        wareAttributeName: '颜色分类',
        wareAttributeItemName: '粉色盘'
      }
    ],
    properities: [
      {
        wareAttributeId: 10003,
        wareAttributeName: '颜色分类',
        wareAttributeItems: [
          {
            wareAttributeItemId: 100006,
            wareAttributeItemName: '金色盘'
          },
          {
            wareAttributeItemId: 100005,
            wareAttributeItemName: '粉色盘'
          }
        ]
      }
    ],
    baseAttribute: [
      {
        wareAttributeId: 10003,
        wareAttributeItemId: 100005,
        wareAttributeItemName: '是',
        wareAttributeName: '是否支持夜间使用'
      },
      {
        wareAttributeId: 10004,
        wareAttributeItemId: 100006,
        wareAttributeItemName: '因人而异',
        wareAttributeName: '是否会引起过敏反应'
      }
    ],
    logisticsFee: 0,
    wareImage: [{ name: '1.jpg', uri: require('../../assets/images/1.jpg') }],
    wareImageCarousel: [{ name: '1.jpg', uri: require('../../assets/images/1.jpg') }, { name: '2.jpg', uri: require('../../assets/images/2.jpg') }, { name: '3.jpg', uri: require('../../assets/images/3.jpg') }],
    wareImageDetail: [{ name: '1.jpg', uri: require('../../assets/images/1.jpg') }, { name: '2.jpg', uri: require('../../assets/images/2.jpg') }, { name: '3.jpg', uri: require('../../assets/images/3.jpg') }],
    warePrice: 42,
    wareName: 'imagic16色眼影盘 林小宅推荐',
    wareSpec: '每一个色号用了都会美到犯规，OMG',
    wareStorage: 23,
    wareMaxBuyNum: 5,
    buyCount: 1,
    wareModeDesc: '粉色盘',
    storeGrade: 9.6, // 店铺评分
    concernPeople: 70, // 关注人数
    allPeople: 370, // 全部商品
    logistics: 9.5, // 物流评分
    wareGrade: 9.6, // 商品评分
    serviceGrade: 9.5, // 服务评分
    receiveAddress: '河北省石家庄市珠峰大街南口288号石家庄学院南校区',
    isHave: 1, // 是否现货 0 预售 1 现货
    wareNumber: 741852963863 // 商品编号
  },
  {
    wareId: 4,
    isConcern: 0, // 是否关注 0未关注 1已关注
    storeName: '花栗鼠小姐',
    storeId: 5,
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
    properities: [
      {
        wareAttributeId: 10006,
        wareAttributeName: '颜色分类',
        wareAttributeItems: [
          {
            wareAttributeItemId: 100009,
            wareAttributeItemName: '豆沙绿'
          },
          {
            wareAttributeItemId: 1000010,
            wareAttributeItemName: '香芋紫'
          },
          {
            wareAttributeItemId: 1000011,
            wareAttributeItemName: '豆沙粉'
          },
          {
            wareAttributeItemId: 1000012,
            wareAttributeItemName: '小鸡黄'
          }
        ]
      },
      {
        wareAttributeId: 10005,
        wareAttributeName: '尺码',
        wareAttributeItems: [
          {
            wareAttributeItemId: 1000013,
            wareAttributeItemName: 'S'
          },
          {
            wareAttributeItemId: 1000014,
            wareAttributeItemName: 'M'
          },
          {
            wareAttributeItemId: 1000015,
            wareAttributeItemName: 'L'
          }
        ]
      }
    ],
    baseAttribute: [
      {
        wareAttributeId: 10004,
        wareAttributeItemId: 100006,
        wareAttributeItemName: '因人而异',
        wareAttributeName: '是否会引起过敏反应'
      }
    ],
    logisticsFee: 0,
    wareImage: [{ name: '1.jpg', uri: require('../../assets/images/1.jpg') }],
    wareImageCarousel: [{ name: '1.jpg', uri: require('../../assets/images/1.jpg') }, { name: '2.jpg', uri: require('../../assets/images/2.jpg') }, { name: '3.jpg', uri: require('../../assets/images/3.jpg') }],
    wareImageDetail: [{ name: '1.jpg', uri: require('../../assets/images/1.jpg') }, { name: '2.jpg', uri: require('../../assets/images/2.jpg') }, { name: '3.jpg', uri: require('../../assets/images/3.jpg') }],
    warePrice: 89,
    wareName: '针织短袖2019新款',
    wareSpec: '也太好看了吧，买它',
    wareStorage: 23,
    wareMaxBuyNum: 5,
    buyCount: 1,
    wareModeDesc: 'S 豆沙绿',
    storeGrade: 9.6, // 店铺评分
    concernPeople: 70, // 关注人数
    allPeople: 370, // 全部商品
    logistics: 9.5, // 物流评分
    wareGrade: 9.6, // 商品评分
    serviceGrade: 9.5, // 服务评分
    receiveAddress: '河北省石家庄市珠峰大街南口288号石家庄学院南校区',
    isHave: 1, // 是否现货 0 预售 1 现货
    wareNumber: 399806040124 // 商品编号
  },
  {
    wareId: 11,
    isConcern: 0, // 是否关注 0未关注 1已关注
    storeName: '花栗鼠小姐',
    storeId: 5,
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
    properities: [
      {
        wareAttributeId: 10006,
        wareAttributeName: '颜色分类',
        wareAttributeItems: [
          {
            wareAttributeItemId: 100009,
            wareAttributeItemName: '豆沙绿'
          },
          {
            wareAttributeItemId: 1000010,
            wareAttributeItemName: '香芋紫'
          },
          {
            wareAttributeItemId: 1000011,
            wareAttributeItemName: '豆沙粉'
          },
          {
            wareAttributeItemId: 1000012,
            wareAttributeItemName: '小鸡黄'
          }
        ]
      },
      {
        wareAttributeId: 10005,
        wareAttributeName: '尺码',
        wareAttributeItems: [
          {
            wareAttributeItemId: 1000013,
            wareAttributeItemName: 'S'
          },
          {
            wareAttributeItemId: 1000014,
            wareAttributeItemName: 'M'
          },
          {
            wareAttributeItemId: 1000015,
            wareAttributeItemName: 'L'
          }
        ]
      }
    ],
    baseAttribute: [
      {
        wareAttributeId: 10004,
        wareAttributeItemId: 100006,
        wareAttributeItemName: '因人而异',
        wareAttributeName: '是否会引起过敏反应'
      }
    ],
    logisticsFee: 0,
    wareImage: [{ name: '1.jpg', uri: require('../../assets/images/1.jpg') }],
    wareImageCarousel: [{ name: '1.jpg', uri: require('../../assets/images/1.jpg') }, { name: '2.jpg', uri: require('../../assets/images/2.jpg') }, { name: '3.jpg', uri: require('../../assets/images/3.jpg') }],
    wareImageDetail: [{ name: '1.jpg', uri: require('../../assets/images/1.jpg') }, { name: '2.jpg', uri: require('../../assets/images/2.jpg') }, { name: '3.jpg', uri: require('../../assets/images/3.jpg') }],
    warePrice: 89,
    wareName: '针织短袖2019新款',
    wareSpec: '也太好看了吧，买它',
    wareStorage: 23,
    wareMaxBuyNum: 5,
    buyCount: 1,
    wareModeDesc: 'M 小鸡黄',
    storeGrade: 9.6, // 店铺评分
    concernPeople: 70, // 关注人数
    allPeople: 370, // 全部商品
    logistics: 9.5, // 物流评分
    wareGrade: 9.6, // 商品评分
    serviceGrade: 9.5, // 服务评分
    receiveAddress: '河北省石家庄市珠峰大街南口288号石家庄学院南校区',
    isHave: 1, // 是否现货 0 预售 1 现货
    wareNumber: 399806040124 // 商品编号
  },
  {
    wareId: 12,
    isConcern: 0, // 是否关注 0未关注 1已关注
    storeName: '花栗鼠小姐',
    storeId: 5,
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
    properities: [
      {
        wareAttributeId: 10006,
        wareAttributeName: '颜色分类',
        wareAttributeItems: [
          {
            wareAttributeItemId: 100009,
            wareAttributeItemName: '豆沙绿'
          },
          {
            wareAttributeItemId: 1000010,
            wareAttributeItemName: '香芋紫'
          },
          {
            wareAttributeItemId: 1000011,
            wareAttributeItemName: '豆沙粉'
          },
          {
            wareAttributeItemId: 1000012,
            wareAttributeItemName: '小鸡黄'
          }
        ]
      },
      {
        wareAttributeId: 10005,
        wareAttributeName: '尺码',
        wareAttributeItems: [
          {
            wareAttributeItemId: 1000013,
            wareAttributeItemName: 'S'
          },
          {
            wareAttributeItemId: 1000014,
            wareAttributeItemName: 'M'
          },
          {
            wareAttributeItemId: 1000015,
            wareAttributeItemName: 'L'
          }
        ]
      }
    ],
    baseAttribute: [
      {
        wareAttributeId: 10004,
        wareAttributeItemId: 100006,
        wareAttributeItemName: '因人而异',
        wareAttributeName: '是否会引起过敏反应'
      }
    ],
    logisticsFee: 0,
    wareImage: [{ name: '1.jpg', uri: require('../../assets/images/1.jpg') }],
    wareImageCarousel: [{ name: '1.jpg', uri: require('../../assets/images/1.jpg') }, { name: '2.jpg', uri: require('../../assets/images/2.jpg') }, { name: '3.jpg', uri: require('../../assets/images/3.jpg') }],
    wareImageDetail: [{ name: '1.jpg', uri: require('../../assets/images/1.jpg') }, { name: '2.jpg', uri: require('../../assets/images/2.jpg') }, { name: '3.jpg', uri: require('../../assets/images/3.jpg') }],
    warePrice: 89,
    wareName: '针织短袖2019新款',
    wareSpec: '也太好看了吧，买它',
    wareStorage: 23,
    wareMaxBuyNum: 5,
    buyCount: 1,
    wareModeDesc: 'M 豆沙粉',
    storeGrade: 9.6, // 店铺评分
    concernPeople: 70, // 关注人数
    allPeople: 370, // 全部商品
    logistics: 9.5, // 物流评分
    wareGrade: 9.6, // 商品评分
    serviceGrade: 9.5, // 服务评分
    receiveAddress: '河北省石家庄市珠峰大街南口288号石家庄学院南校区',
    isHave: 1, // 是否现货 0 预售 1 现货
    wareNumber: 399806040124 // 商品编号
  },
  {
    wareId: 5,
    isConcern: 0, // 是否关注 0未关注 1已关注
    storeName: '南朋友美妆店',
    storeId: 5,
    wareAttribute: [
      {
        wareAttributeId: 10007,
        wareAttributeItemId: 1000018,
        wareAttributeName: '颜色分类',
        wareAttributeItemName: '最白色'
      }
    ],
    properities: [
      {
        wareAttributeId: 10007,
        wareAttributeName: '颜色分类',
        wareAttributeItems: [
          {
            wareAttributeItemId: 1000018,
            wareAttributeItemName: '最白色'
          },
          {
            wareAttributeItemId: 1000019,
            wareAttributeItemName: '奶白色'
          },
          {
            wareAttributeItemId: 1000020,
            wareAttributeItemName: '象牙白'
          }
        ]
      }
    ],
    baseAttribute: [
      {
        wareAttributeId: 10003,
        wareAttributeItemId: 100005,
        wareAttributeItemName: '是',
        wareAttributeName: '是否支持夜间使用'
      }
    ],
    logisticsFee: 0,
    wareImage: [{ name: '1.jpg', uri: require('../../assets/images/1.jpg') }],
    wareImageCarousel: [{ name: '1.jpg', uri: require('../../assets/images/1.jpg') }, { name: '2.jpg', uri: require('../../assets/images/2.jpg') }, { name: '3.jpg', uri: require('../../assets/images/3.jpg') }],
    wareImageDetail: [{ name: '1.jpg', uri: require('../../assets/images/1.jpg') }, { name: '2.jpg', uri: require('../../assets/images/2.jpg') }, { name: '3.jpg', uri: require('../../assets/images/3.jpg') }],
    warePrice: 89,
    wareName: '波兰paese派斯粉底液',
    wareSpec: '保湿遮瑕，帮你打造奶油肌',
    wareStorage: 23,
    wareMaxBuyNum: 5,
    buyCount: 1,
    wareModeDesc: '最白色',
    storeGrade: 9.6, // 店铺评分
    concernPeople: 70, // 关注人数
    allPeople: 370, // 全部商品
    logistics: 9.5, // 物流评分
    wareGrade: 9.6, // 商品评分
    serviceGrade: 9.5, // 服务评分
    receiveAddress: '河北省石家庄市珠峰大街南口288号石家庄学院南校区',
    isHave: 1, // 是否现货 0 预售 1 现货
    wareNumber: 852963741456 // 商品编号
  },
  {
    wareId: 14,
    isConcern: 0, // 是否关注 0未关注 1已关注
    storeName: '南朋友美妆店',
    storeId: 5,
    wareAttribute: [
      {
        wareAttributeId: 10007,
        wareAttributeItemId: 1000019,
        wareAttributeName: '颜色分类',
        wareAttributeItemName: '奶白色'
      }
    ],
    properities: [
      {
        wareAttributeId: 10007,
        wareAttributeName: '颜色分类',
        wareAttributeItems: [
          {
            wareAttributeItemId: 1000018,
            wareAttributeItemName: '最白色'
          },
          {
            wareAttributeItemId: 1000019,
            wareAttributeItemName: '奶白色'
          },
          {
            wareAttributeItemId: 1000020,
            wareAttributeItemName: '象牙白'
          }
        ]
      }
    ],
    baseAttribute: [
      {
        wareAttributeId: 10003,
        wareAttributeItemId: 100005,
        wareAttributeItemName: '是',
        wareAttributeName: '是否支持夜间使用'
      }
    ],
    logisticsFee: 0,
    wareImage: [{ name: '1.jpg', uri: require('../../assets/images/1.jpg') }],
    wareImageCarousel: [{ name: '1.jpg', uri: require('../../assets/images/1.jpg') }, { name: '2.jpg', uri: require('../../assets/images/2.jpg') }, { name: '3.jpg', uri: require('../../assets/images/3.jpg') }],
    wareImageDetail: [{ name: '1.jpg', uri: require('../../assets/images/1.jpg') }, { name: '2.jpg', uri: require('../../assets/images/2.jpg') }, { name: '3.jpg', uri: require('../../assets/images/3.jpg') }],
    warePrice: 89,
    wareName: '波兰paese派斯粉底液',
    wareSpec: '保湿遮瑕，帮你打造奶油肌',
    wareStorage: 23,
    wareMaxBuyNum: 5,
    buyCount: 1,
    wareModeDesc: '奶白色',
    storeGrade: 9.6, // 店铺评分
    concernPeople: 70, // 关注人数
    allPeople: 370, // 全部商品
    logistics: 9.5, // 物流评分
    wareGrade: 9.6, // 商品评分
    serviceGrade: 9.5, // 服务评分
    receiveAddress: '河北省石家庄市珠峰大街南口288号石家庄学院南校区',
    isHave: 1, // 是否现货 0 预售 1 现货
    wareNumber: 852963741456 // 商品编号
  },
  {
    wareId: 15,
    isConcern: 0, // 是否关注 0未关注 1已关注
    storeName: '南朋友美妆店',
    storeId: 5,
    wareAttribute: [
      {
        wareAttributeId: 10007,
        wareAttributeItemId: 1000020,
        wareAttributeName: '颜色分类',
        wareAttributeItemName: '象牙白'
      }
    ],
    properities: [
      {
        wareAttributeId: 10007,
        wareAttributeName: '颜色分类',
        wareAttributeItems: [
          {
            wareAttributeItemId: 1000018,
            wareAttributeItemName: '最白色'
          },
          {
            wareAttributeItemId: 1000019,
            wareAttributeItemName: '奶白色'
          },
          {
            wareAttributeItemId: 1000020,
            wareAttributeItemName: '象牙白'
          }
        ]
      }
    ],
    baseAttribute: [
      {
        wareAttributeId: 10003,
        wareAttributeItemId: 100005,
        wareAttributeItemName: '是',
        wareAttributeName: '是否支持夜间使用'
      }
    ],
    logisticsFee: 0,
    wareImage: [{ name: '1.jpg', uri: require('../../assets/images/1.jpg') }],
    wareImageCarousel: [{ name: '1.jpg', uri: require('../../assets/images/1.jpg') }, { name: '2.jpg', uri: require('../../assets/images/2.jpg') }, { name: '3.jpg', uri: require('../../assets/images/3.jpg') }],
    wareImageDetail: [{ name: '1.jpg', uri: require('../../assets/images/1.jpg') }, { name: '2.jpg', uri: require('../../assets/images/2.jpg') }, { name: '3.jpg', uri: require('../../assets/images/3.jpg') }],
    warePrice: 89,
    wareName: '波兰paese派斯粉底液',
    wareSpec: '保湿遮瑕，帮你打造奶油肌',
    wareStorage: 23,
    wareMaxBuyNum: 5,
    buyCount: 1,
    wareModeDesc: '象牙白',
    storeGrade: 9.6, // 店铺评分
    concernPeople: 70, // 关注人数
    allPeople: 370, // 全部商品
    logistics: 9.5, // 物流评分
    wareGrade: 9.6, // 商品评分
    serviceGrade: 9.5, // 服务评分
    receiveAddress: '河北省石家庄市珠峰大街南口288号石家庄学院南校区',
    isHave: 1, // 是否现货 0 预售 1 现货
    wareNumber: 852963741456 // 商品编号
  },
  {
    wareId: 6,
    isConcern: 1, // 是否关注 0未关注 1已关注
    storeName: '南朋友美妆店',
    storeId: 5,
    wareAttribute: [
      {
        wareAttributeId: 10009,
        wareAttributeItemId: 1000023,
        wareAttributeName: '颜色分类',
        wareAttributeItemName: '橘调红'
      }
    ],
    properities: [
      {
        wareAttributeId: 10009,
        wareAttributeName: '颜色分类',
        wareAttributeItems: [
          {
            wareAttributeItemId: 1000022,
            wareAttributeItemName: '正红色'
          },
          {
            wareAttributeItemId: 1000023,
            wareAttributeItemName: '橘调红'
          },
          {
            wareAttributeItemId: 1000024,
            wareAttributeItemName: '棕豆沙'
          },
          {
            wareAttributeItemId: 1000025,
            wareAttributeItemName: '西柚色'
          }
        ]
      }
    ],
    baseAttribute: [
      {
        wareAttributeId: 10004,
        wareAttributeItemId: 100006,
        wareAttributeItemName: '因人而异',
        wareAttributeName: '是否会引起过敏反应'
      }
    ],
    logisticsFee: 0,
    wareImage: [{ name: '1.jpg', uri: require('../../assets/images/1.jpg') }],
    wareImageCarousel: [{ name: '1.jpg', uri: require('../../assets/images/1.jpg') }, { name: '2.jpg', uri: require('../../assets/images/2.jpg') }, { name: '3.jpg', uri: require('../../assets/images/3.jpg') }],
    wareImageDetail: [{ name: '1.jpg', uri: require('../../assets/images/1.jpg') }, { name: '2.jpg', uri: require('../../assets/images/2.jpg') }, { name: '3.jpg', uri: require('../../assets/images/3.jpg') }],
    warePrice: 457,
    wareName: '戚薇同款mistine泰国小金条口红',
    wareSpec: '让你拥有女神的气色，气场全开',
    wareStorage: 10,
    wareMaxBuyNum: 5,
    buyCount: 1,
    wareModeDesc: '白色 美白',
    storeGrade: 9.6, // 店铺评分
    concernPeople: 70, // 关注人数
    allPeople: 370, // 全部商品
    logistics: 9.5, // 物流评分
    wareGrade: 9.6, // 商品评分
    serviceGrade: 9.5, // 服务评分
    receiveAddress: '河北省石家庄市珠峰大街南口288号石家庄学院南校区',
    isHave: 1, // 是否现货 0 预售 1 现货
    wareNumber: 789258963456 // 商品编号
  }
]
// 返回商品的详细信息
Mock.mock(RegExp('/ware/wareDetails' + '.*'), 'get', function (options) {
  let item = wareDetailList.filter(item => {
    return item.wareId === parseInt(JSON.parse(getStore('params')).wareId)
  })
  return {
    code: 0,
    data: item[0],
    msg: '查询商品信息成功'
  }
})
// 收藏一个商品
Mock.mock(RegExp('/ware/concerned' + '.*'), 'get', function (options) {
  return {
    code: 0,
    msg: '收藏成功'
  }
})
// 取消收藏一个商品
Mock.mock(RegExp('/ware/cancelConcerned' + '.*'), 'get', function (options) {
  return {
    code: 0,
    msg: '取消收藏成功'
  }
})
// 选择属性，根据商品的属性得到商品id
Mock.mock(RegExp('/ware/getWareId' + '.*'), 'get', function (options) {
  return {
    code: 0,
    data: {
      wareId: 5
    }
  }
})
// 商品加入购物车
Mock.mock(RegExp('/ware/addCart' + '.*'), 'get', function (options) {
  let cartIds = JSON.parse(getStore('cartIds')) || []
  let wareObj = JSON.parse(getStore('params'))
  let indexCart = 0
  // 判断当前
  if (cartIds.length !== 0) {
    cartIds.map((item, index) => {
      if (item.wareId === wareObj.wareId) {
        wareObj.buyNumber += cartIds[index].buyNumber
        cartIds[index] = wareObj
        indexCart++
      }
    })
  }
  if (indexCart === 0) {
    cartIds.push(wareObj)
  }
  setStore('cartIds', JSON.stringify(cartIds))
  return {
    code: 0,
    msg: '加入购物车成功'
  }
})
