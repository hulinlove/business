import http from './fetch'
/**
 * 首页的初始化
 */
export const homeInIt = () => {
  return http.fetchGet('/home/homeInIt')
}
/**
 * 商品详情
 */
export const wareDetail = (params) => {
  return http.fetchGet('/ware/wareDetails', params)
}
/**
 * 收藏商品
 */
export const concerned = (params) => {
  return http.fetchGet('/ware/concerned', params)
}
/**
 * 取消收藏商品
 */
export const cancelConcerned = (params) => {
  return http.fetchGet('/ware/cancelConcerned', params)
}
/**
 * 选择属性
 * 根据属性id得到商品id
 */
export const getWareId = (params) => {
  return http.fetchGet('/ware/getWareId', params)
}
/**
 * 加入购物车
 */
export const addCart = (params) => {
  return http.fetchGet('/ware/addCart', params)
}
/**
 * 查询购物车列表
 */
export const cartList = () => {
  return http.fetchGet('/cart/cartList')
}
/**
 * 查询购物车商品的数量
 */
export const cartNumber = () => {
  return http.fetchGet('/cart/cartNumber')
}
/**
 * 购物车商品数量的加
 */
export const addNum = (params) => {
  return http.fetchGet('/cart/addNum', params)
}
/**
 * 购物车商品数量的减
 */
export const minusNum = (params) => {
  return http.fetchGet('/cart/minusNum', params)
}
/**
 * 购物车删除批量删除商品
 */
export const delCartWares = (params) => {
  return http.fetchGet('/cart/delCartWares', params)
}
/**
 * 订单确认页
 */
export const orderDetail = (params) => {
  return http.fetchGet('/order/orderDetails', params)
}
/**
 * 提交订单
 */
export const submitOrder = (params) => {
  return http.fetchGet('/order/submitOrder', params)
}
/**
 * 地址列表
 */
export const addressList = () => {
  return http.fetchGet('/address/addressList')
}
/**
 * 删除地址
 */
export const delAddress = (params) => {
  return http.fetchGet('/address/delAddress', params)
}
/**
 * 新增地址
 */
export const addAddress = (params) => {
  return http.fetchPost('/address/addAddress', params)
}
/**
 * 修改地址
 */
export const editAddress = (params) => {
  return http.fetchPost('/address/editAddress', params)
}
/**
 * 编辑地址的保存
 */
export const saveAddress = (params) => {
  return http.fetchPost('/address/saveAddress', params)
}
