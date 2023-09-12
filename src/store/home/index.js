import {reqCategoryList, reqGetbannerList} from '@/netword'
const state = {
  categoryListdata:[],
  getbannerlist:[],
}
const mutations = {
  CategoryList(state, categoryListdata){
    state.categoryListdata = categoryListdata
  },
  Getbannerlist(state, getbannerlist){
    state.getbannerlist = getbannerlist
  }

}
const actions = {
  // 三级联动数据
  async categoryList({commit}) {
    let res = await reqCategoryList();
    if(res.code==200) {
      commit("CategoryList", res.data)
    }
  },
  // 轮播图数据
  async getbannerlist({commit}){
    let res = await reqGetbannerList();
      if(res.code==200){
        commit("Getbannerlist", res.data)
      }
  }

}
const getters = {}

export default {
  state, mutations, actions, getters
}