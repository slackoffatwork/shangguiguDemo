import Vue from 'vue'
import App from './App.vue'
import router from '@/router'
import store from '@/store'

Vue.config.productionTip = false
// 注册三级联动导航栏全局组件
import TypeNav from '@/components/TypeNav'
Vue.component(TypeNav.name, TypeNav);
// 注册mockjs
import mockjs from './mockjs/mock'
// 使用vant组件库中的轮播图
import Vant from 'vant';
import 'vant/lib/index.css';
Vue.use(Vant);
// 使用vant中的懒加载
import { Lazyload } from 'vant';
import 'vant/lib/index.css';
Vue.use(Lazyload);
// 全部引入netword
import * as API from '@/netword'

// 引入elementUI
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
Vue.use(ElementUI)


// test
// import {reqGetSearchList} from '@/netword'
// console.log(reqGetSearchList({}));
// import {reqGetDetailList} from '@/netword'
//  console.log(reqGetDetailList(2158));



new Vue({
  router,
  store,
  render: function (h) { return h(App) },
  // 挂载全局事件总线
  beforeCreate() {
    Vue.prototype.$bus = this;
    Vue.prototype.$API = API
  },
}).$mount('#app')
