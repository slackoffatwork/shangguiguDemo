import Vue from "vue";
import Vuex from "vuex"
import home from "./home";
import login from "./login"
import search from "./search"
import detail from "./detail"
import shopcart from "./shopcart"
import loginHregister from "./loginHregister";
import trade from "./trade";
Vue.use(Vuex)


export default new Vuex.Store({
  modules: {
    home,
    login,
    search,
    detail,
    shopcart,
    loginHregister,
    trade
  }
})