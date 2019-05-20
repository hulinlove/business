
import { getStore } from '../../utils/utils'
const Mock = require('mockjs')
// 初始化订单确认页信息
Mock.mock(RegExp('/order/orderDetail' + '.*'), 'get', function (options) {
  let result = {}
  let buyWares = JSON.parse(getStore('buyWares'))
  result.buyWares = buyWares
  let addressList = JSON.parse(getStore('addressList')) || []
  let address = null
  if (addressList.length !== 0) {
    address = addressList.filter(item => { return item.addressId === 1 })[0]
  }
  result.address = address
  return {
    code: 0,
    data: result,
    msg: '查询订单信息成功'
  }
})
// 提交订单
Mock.mock(RegExp('/order/submitOrder' + '.*'), 'get', function (options) {
  let orderNumber = Mock.Random.id()
  return {
    code: 0,
    data: orderNumber,
    msg: '提交订单成功'
  }
})
