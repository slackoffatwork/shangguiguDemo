// 网络请求统一管理
import requsets from "./request";
import mockrequsets from "./mockrequset";

// /api/product/getBaseCategoryList get  -- 三级联动模块
export const reqCategoryList = () => {
  return requsets({ url: '/product/getBaseCategoryList', method: 'get' })
}

// 获取首页轮播图数据
export const reqGetbannerList = () => {
  return mockrequsets({ url: '/banner', method: 'get' })
}
// 获取搜索栏数据 /api/list post --search
export const reqGetSearchList = (params) => {
  return requsets({ url: '/list', method: 'post', data: params })
}

// 获取商品详情数据  /api/item/{ skuId }  get --Detail 
export const reqGetDetailList = (skuId) => {
  return requsets({ url: `/item/${skuId}`, method: 'get' })
}

// 更新商品参数 /api/cart/addToCart/{ skuId }/{ skuNum } POST
export const reqaddUpateShopCart = (skuId, skuNum) => requsets({ url: `/cart/addToCart/${skuId}/${skuNum}`, method: 'post' })

// 获取购物车参数 /api/cart/cartList GET
export const reqShopCartDate = () => requsets({ url: '/cart/cartList', method: 'get' })
// 删除购物车数据 /api/cart/deleteCart/{skuId}  DELETE
export const reqDeleteCartById = (skuId) => requsets({ url: `/cart/deleteCart/${skuId}`, method: 'delete' })

// 修改购物车勾选状态 /api/cart/checkCart/{skuID}/{isChecked}  get
export const requpdateIsCheckedByid = (skuId, isChecked) => requsets({ url: `/cart/checkCart/${skuId}/${isChecked}`, method: 'get' })

// 获取验证码 /api/user/passport/sendCode/{phone} get
export const reqCode = (phone) => requsets({ url: `/user/passport/sendCode/${phone}`, method: 'get' })

// 注册用户 /api/user/passport/register   post   data:{phone,pwd,code}
export const reqUserRrgister = (data) => requsets({ url: '/user/passport/register', data, method: 'post' })

// 登录账号 /api/user/passport/login post phone password
export const reqLogin = (data) => requsets({ url: '/user/passport/login', data, method: 'post' })

// 获取用户信息 /api/user/passport/auth/getUserInfo get
export const reqUserInof = () => requsets({ url: '/user/passport/auth/getUserInfo', method: 'get' })

// 退出登录 /api/user/passport/logout get
export const reqoutLogin = () => requsets({ url: '/user/passport/logout', method: 'get' })

// 获取用户地址信息 /api/user/userAddress/auth/findUserAddressList get
export const reqAddressInfo = () => requsets({ url: '/user/userAddress/auth/findUserAddressList', method: 'get' })

// 获取用户交易信息 /api/order/auth/trade get
export const reqOrderInfo = () => requsets({ url: '/order/auth/trade', method: 'get' })

// 提交订单 /api/order/auth/submitOrder?tradeNo={tradeNo} post
export const reqSubmitOrder = (tradeNo,data) => requsets({ url: `/order/auth/submitOrder?tradeNo=${tradeNo}`, data, method: 'post' })