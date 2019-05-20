const login = r => require.ensure([], () => r(require('../pages/login/login')), 'login')
const register = r => require.ensure([], () => r(require('../pages/login/register')), 'register')
const Home = r => require.ensure([], () => r(require('../pages/home/Home')), 'Home')
const wareDetails = r => require.ensure([], () => r(require('../pages/wareDetails/wareDetails')), 'wareDetails')
const order = r => require.ensure([], () => r(require('../pages/order/order')), 'order')
const selectAddress = r => require.ensure([], () => r(require('../pages/order/selectAddress')), 'selectAddress')
const cart = r => require.ensure([], () => r(require('../pages/cart/cart')), 'cart')
const myCenter = r => require.ensure([], () => r(require('../pages/myCenter/myCenter')), 'myCenter')
const addressList = r => require.ensure([], () => r(require('../pages/myCenter/address/addressList')), 'addressList')
const manageAddress = r => require.ensure([], () => r(require('../pages/myCenter/address/manageAddress')), 'manageAddress')
const editAddress = r => require.ensure([], () => r(require('../pages/myCenter/address/editAddress')), 'editAddress')
const addAddress = r => require.ensure([], () => r(require('../pages/myCenter/address/addAddress')), 'addAddress')
const pay = r => require.ensure([], () => r(require('../pages/pay/pay')), 'pay')
const paySuccess = r => require.ensure([], () => r(require('../pages/pay/paySuccess')), 'paySuccess')
export default [
  // 默认重定向到首页
  {
    path: '',
    redirect: '/home'
  },
  // 登录
  {
    path: '/login',
    component: login
  },
  // 注册
  {
    path: '/register',
    component: register
  },
  // 商品详情页
  {
    path: '/wareDetails',
    component: wareDetails,
    meta: false
  },
  // 首页
  {
    path: '/home',
    name: 'Home',
    component: Home
  },
  // 确认订单页面
  {
    path: '/order',
    component: order,
    children: [{
      path: 'selectAddress',
      component: selectAddress
    }]
  },
  // 购物车
  {
    path: '/cart',
    component: cart
  },
  // 我的个人中心
  {
    path: '/myCenter',
    component: myCenter
  },
  // 地址列表
  {
    path: '/addressList',
    component: addressList
  },
  // 管理地址
  {
    path: '/manageAddress',
    component: manageAddress
  },
  // 编辑地址
  {
    path: '/editAddress',
    component: editAddress
  },
  // 新增地址
  {
    path: '/addAddress',
    component: addAddress
  },
  // 支付页面
  {
    path: '/pay',
    component: pay
  },
  // 支付成功页面
  {
    path: '/paySuccess',
    component: paySuccess
  }
]
