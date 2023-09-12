import { reqDeleteCartById, reqShopCartDate, requpdateIsCheckedByid } from "@/netword"
const state = {
  cartList:[]
}
const mutations = {
  GETCARTLIST(state,cartList){
    state.cartList = cartList
  }
}
const actions = {
  // 获取购物车参数
  async getCartList({commit}){
      let res = await reqShopCartDate()
      if(res.code==200){
        commit('GETCARTLIST',res.data)
      }
  },
  // 删除购物车商品
  async deleteCartBySkuId({commit}, skuId){
    let res = await reqDeleteCartById(skuId)
    if(res.code==200){
      return 'ok'
    }else{
      Promise.reject(new Error('fail'))
    }
  },
  // 修改商品勾选状态
  async updateCheckedById({commit}, {skuId,isChecked}){
    let res = await requpdateIsCheckedByid(skuId,isChecked)
    if(res.code==200){
      return 'ok'
    }else{
      return Promise.reject(new Error('fail'))
    }
  },
  // 删除勾选商品
  deleteCheckedCart({dispatch,getters}){
    // 把返回结果都存放到PromiseAll中用all判断是否都成功
    let PromiseAll = []
    //通过上下文的方式拿到购物车中全部商品 遍历商品当isChecked为1就调用deleteCartBySkuId 并传入id
    getters.cartList.cartInfoList.forEach(item => {
      let promise = item.isChecked==1?dispatch('deleteCartBySkuId', item.skuId):''
      PromiseAll.push(promise)
    });
    // 全成功才为成功 有失败返回失败
      return Promise.all(PromiseAll)

  },
  // 全选 || 全不选
  updateAllCheckedCart({dispatch,getters},isChecked){
    // 获取操作是否成功
    let PromiseAll = []
    // 获取全部商品的数据
    getters.cartList.cartInfoList.forEach(item=>{
      let promise = dispatch('updateCheckedById',{skuId:item.skuId,isChecked})
      PromiseAll.push(promise)
    })
    return Promise.all(PromiseAll)
  }
}
const getters = {
  cartList(state){
    return state.cartList[0] || {};
  },
}

export default {
  state, mutations, actions, getters
}