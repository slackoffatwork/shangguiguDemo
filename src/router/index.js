import Vue from "vue";
import VueRouter from "vue-router";

Vue.use(VueRouter)

import Home from '@/views/Home/Home'
import Login from '@/views/Login'
import Register from '@/views/Register'
import Search from '@/views/Search/Search'
import Detail from '@/views/Detail/Detail'
import AddCartSuccess from '@/views/AddCartSuccess/index'
import ShopCart from '@/views/ShopCart'
import Trade from '@/views/Trade'
import Pay from '@/views/Pay'
import Paysuccess from '@/views/PaySuccess'
import Center from '@/views/Center'
import Demo from '@/views/Demo/demo'
// 二级路由
import Myoder from '@/views/Center/children/myoder'
import Grouporder from '@/views/Center/children/grouporder'

import store from "@/store";

// 重写push || replace 解决不传参数数会产生报错
let rawPush = VueRouter.prototype.push
VueRouter.prototype.push = function (location, resolve, reject) {
  if (resolve && reject) {
    rawPush.call(this, location, resolve, reject)
  } else {
    rawPush.call(this, location, () => { }, () => { })
  }
}
VueRouter.prototype.replace = function (location, resolve, reject) {
  if (resolve && reject) {
    rawPush.call(this, location, resolve, reject)
  } else {
    rawPush.call(this, location, () => { }, () => { })
  }
}

const routes = [
  {
    path: '',
    redirect: '/home',
    // 路由元信息 通过show数值控制是否显示
    meta: { show: true }
  },
  {
    path: '/home',
    component: Home,
    meta: { show: true }
  },
  {
    path: '/demo',
    component: Demo,
    meta: { show: false }
  },
  {
    path: '/search/:keydata?',
    component: Search,
    meta: { show: true },
    name: 'search'
  },
  {
    path: '/detail/:skuId',
    component: Detail,
    meta: { show: true }
  },
  {
    path: '/login',
    component: Login,
    meta: { show: false }
  },
  {
    path: '/register',
    component: Register,
    meta: { show: true }
  },
  {
    path: '/addCartSuccess',
    name: 'addCartSuccess',
    component: AddCartSuccess,
    meta: { show: true }
  },
  {
    path: '/shopCart',
    name: 'shopCart',
    component: ShopCart,
    meta: { show: true }
  },
  {
    path: '/trade',
    name: 'trade',
    component: Trade,
    meta: { show: true }
  },
  {
    path: '/pay',
    name: 'pay',
    component: Pay,
    meta: { show: true }
  },
  {
    path: '/paysuccess',
    name: 'paysuccess',
    component: Paysuccess,
    meta: { show: true }
  },
  {
    path: '/center',
    name: 'center',
    component: Center,
    meta: { show: true },
    children:[
      {
        path:'myoder',
        component: Myoder
      },
      {
        path:'groupoder',
        component: Grouporder
      },

    ]

  },

]

const router = new VueRouter({
  routes,
  // 路由转跳后的滚动行为
  scrollBehavior(to, from, savedPosition) {
    return {
      y: 0
    }
  },
})

// 全局导航守卫
router.beforeEach(async (to, from, next) => {
  // to:获取你将要跳转的路由的信息  即将要进入的目标
  // from:获取你从哪个路由来的信息  当前导航正要离开的路由
  // next:放行  netx() next(path) next(name:{'path'})

  let token = store.state.loginHregister.token
  let name = store.state.loginHregister.user.name
  // 有token 已经登录  判断是否登录 全局守卫: 前缀守卫
  if (token) {
    // 登录后去login 拦截回next('/')根目录  判断是否是去login页面
    if (to.path == '/login' || to.path=='/register') {
      next('/home')
      // 不是去登录页面 放行
    } else {
      // 判断是否有用户名
      if (name) {
        // 有 放行
        next();
        // 没有 去获取
      } else {

          try {
          // 向服务器发请求获取 用户信息
          await store.dispatch('getUserInfo')
          next()
        } catch (error) {
          // 发送请求失败token过期 清除token 重新登录
          await store.dispatch('outlogin')
          next('/login')
        }
      }
    }
    // 没有登录 去登录页面
  } else {
    // 有后续业务
    next()
  }
})

export default router