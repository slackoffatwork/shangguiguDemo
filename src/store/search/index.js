import { reqGetSearchList } from "@/netword"

const state = {
  searchList: {}
}

const mutations = {
  GETSEARCHLIST(state, searchList) {
    state.searchList = searchList
  }
}
const actions = {
  async getSearchList({commit},params={}){
    let res = await reqGetSearchList(params)
    if (res.code==200) {
      commit('GETSEARCHLIST', res.data)
    }
  }

}
const getters = {
  // 简化数据获取路径
  attrsList(state){
    return state.searchList.attrsList || []
  },
  goodsList(state){
    return state.searchList.goodsList || []
  },
  trademarkList(state){
    return state.searchList.trademarkList || []
  },
}
export default {
  state, mutations, actions, getters
}