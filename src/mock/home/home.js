const Mock = require('mockjs')
const homeDetail = {
  active1: [
    {
      wareId: 1,
      wareName: '欧诗漫你值得拥有',
      wareSpec: '让你的皮肤从此可以捏出水来',
      wareImage: [{ name: '1.jpg', uri: require('../../assets/images/1.jpg') }]
    },
    {
      wareId: 10,
      wareName: '欧诗漫水乳套装',
      wareSpec: '让你的皮肤水水嫩嫩',
      wareImage: [{ name: '1.jpg', uri: require('../../assets/images/1.jpg') }]
    },
    {
      wareId: 2,
      wareName: '高丽雅娜水乳套装',
      wareSpec: '皮肤一整天都水水的',
      wareImage: [{ name: '1.jpg', uri: require('../../assets/images/1.jpg') }]
    },
    {
      wareId: 3,
      wareName: 'imagic16色眼影盘 林小宅推荐',
      wareSpec: '每一个色号用了都会美到犯规，OMG',
      wareImage: [{ name: '1.jpg', uri: require('../../assets/images/1.jpg') }]
    }
  ],
  active2: [
    {
      wareId: 4,
      warePrice: 89,
      wareName: '针织短袖2019新款',
      wareSpec: '也太好看了吧，买它',
      wareImage: [{ name: '1.jpg', uri: require('../../assets/images/1.jpg') }]
    },
    {
      wareId: 5,
      warePrice: 89,
      wareName: '波兰paese派斯粉底液',
      wareSpec: '保湿遮瑕，帮你打造奶油肌',
      wareImage: [{ name: '1.jpg', uri: require('../../assets/images/1.jpg') }]
    },
    {
      wareId: 15,
      warePrice: 89,
      wareName: '波兰paese派斯粉底液',
      wareSpec: '保湿遮瑕，帮你打造奶油肌',
      wareImage: [{ name: '1.jpg', uri: require('../../assets/images/1.jpg') }]
    },
    {
      wareId: 6,
      warePrice: 457,
      wareName: '戚薇同款mistine泰国小金条口红',
      wareSpec: '让你拥有女神的气色，气场全开',
      wareImage: [{ name: '1.jpg', uri: require('../../assets/images/1.jpg') }]
    }
  ]
}
// 首页初始化
Mock.mock(RegExp('/home/homeInIt' + '.*'), 'get', function (options) {
  return {
    code: 0,
    data: homeDetail,
    msg: '查询首页商品信息成功'
  }
})
