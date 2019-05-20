
import {getStore, setStore} from '../../utils/utils'
const Mock = require('mockjs')
// 查询地址列表
Mock.mock(RegExp('/address/addressList' + '.*'), 'get', function (options) {
  let addressList = JSON.parse(getStore('addressList')) || []
  return {
    code: 0,
    data: addressList,
    msg: '查询地址列表成功'
  }
})
// 删除地址
Mock.mock(RegExp('/address/delAddress' + '.*'), 'get', function (options) {
  let addressList = JSON.parse(getStore('addressList'))
  let addressId = parseInt(JSON.parse(getStore('params')).addressId)
  addressList.map((item, index) => {
    if (item.addressId === addressId) {
      addressList.splice(index, 1)
      setStore('addressList', JSON.stringify(addressList))
    }
  })
  return {
    code: 0,
    msg: '删除地址成功'
  }
})
// 新增地址
Mock.mock(RegExp('/address/addAddress' + '.*'), 'post', function (options) {
  let address = JSON.parse(getStore('params')).address
  let addressList = JSON.parse(getStore('addressList')) || []
  address.addressId = addressList.length + 1
  addressList.push(address)
  setStore('addressList', JSON.stringify(addressList))
  return {
    code: 0,
    msg: '新增地址成功'
  }
})
// 编辑地址
Mock.mock(RegExp('/address/editAddress' + '.*'), 'post', function (options) {
  let addressList = JSON.parse(getStore('addressList'))
  let addressId = parseInt(JSON.parse(getStore('params')).addressId)
  let address = addressList.filter(item => { return item.addressId === addressId })[0]
  return {
    code: 0,
    data: address,
    msg: '编辑地址初始化成功'
  }
})
// 编辑地址的保存
Mock.mock(RegExp('/address/saveAddress' + '.*'), 'post', function (options) {
  let addressList = JSON.parse(getStore('addressList'))
  let address = JSON.parse(getStore('params')).address
  addressList.map((item, index) => {
    if (item.addressId === address.addressId) {
      addressList[index] = address
    }
  })
  setStore('addressList', JSON.stringify(addressList))
  return {
    code: 0,
    msg: '保存地址成功'
  }
})
