import { reqAddressInfo,reqOrderInfo } from '@/netword'
const state = {
  addressInfo: [],
  orderInfo:{}
}
const mutations = {
  GETUSERADDRESS(state, address) {
    state.addressInfo = address
  },
  GETUSERORDER(state,order){
    state.orderInfo = order
  }
}
const actions = {
  // 获取用户地址信息
  async getUserAddress({ commit }) {
    let res = await reqAddressInfo()
    if (res.code == 200) {
      commit('GETUSERADDRESS', res.data)
      return 'ok'
    } else {
      return Promise.reject(new Error('fail'))
    }
  },
  // 获取用户交易信息
  async getUserOrder({ commit }) {
    let res = await reqOrderInfo()
    if (res.code == 200) {
      commit('GETUSERORDER', res.data)
      return 'ok'
    } else {
      return Promise.reject(new Error('fail'))
    }
  }

}
const getters = {
  addressInfo(){
    return state.addressInfo || []
  },
  orderInfo(){
    return state.orderInfo || {}
  }
}

export default {
  state, mutations, actions, getters
}