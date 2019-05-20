
// 商品详情
require('./ware/wareDetail')
// 购物车
require('./cart/cart')
// 首页
require('./home/home')
// 订单详情页
require('./order/order')
// 地址
require('./address/address')
const Mock = require('mockjs')
// 设置所有ajax请求的超时时间，模拟网络传输耗时
Mock.setup({
  timeout: '0-300'
})
