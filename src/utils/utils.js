
/**
 * 存储sessionStorage
 */
export const setStore = (name, content) => {
  if (!name) return
  if (typeof content !== 'string') {
    content = JSON.stringify(content)
  }
  window.sessionStorage.setItem(name, content)
}

/**
 * 获取sessionStorage
 */
export const getStore = name => {
  if (!name) return
  return window.sessionStorage.getItem(name)
}

/**
 * 删除sessionStorage
 */
export const removeStore = name => {
  if (!name) return
  window.sessionStorage.removeItem(name)
}

/**
 * 获取当前时间
 */
export const getNowTime = () => {
  return (new Date()).getTime()
}
/**
 * 手机号验证
 */
export const verifyMobile = (mobile) => {
  let myreg = /^(((13[0-9]{1})|(14[0-9]{1})|(15[0-9]{1})|(17[0-9]{1})|(18[0-9]{1})|(19[0-9]{1}))+\d{8})$/
  if (!myreg.test(mobile)) {
    return false
  } else {
    return true
  }
}
/**
 * 非空验证
 */
export const verifyEmpty = (expression) => {
  let myreg = /\S/
  if (!myreg.test(expression)) {
    return false
  } else {
    return true
  }
}
