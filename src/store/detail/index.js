import { reqGetDetailList, reqaddUpateShopCart } from "@/netword"
import {getUUID} from '@/utils/uuid_token'
const state = {
  getDetail: {},
  // 游客身份令牌
  uuid_token:getUUID()
}
const mutations = {
  GETDETAIL(state, getDetail) {
    state.getDetail = getDetail
  }
}
const actions = {
  // 获取商品信息
  async getDetailInof({ commit }, skuId) {
    let result = await reqGetDetailList(skuId)
    if (result.code == 200) {
      commit('GETDETAIL', result.data)
    }
  },
  // 更新商品在购物车中的数量
  // 服务器写入数据成功,返回code:200,没有其他数据就不存入仓库 
  async addUpateShopCart({ commit }, { skuId, skuNum }) {
    let result = await reqaddUpateShopCart(skuId, skuNum)
    if (result.code == 200) {
      return 'ok'
    } else {
      return Promise.reject(new Error('fail'))
    }
  }

}
const getters = {
  categoryView(state) {
    return state.getDetail.categoryView || {}
  },
  skuInfo(state) {
    return state.getDetail.skuInfo || {}
  },
  spuSaleAttrList(state) {
    return state.getDetail.spuSaleAttrList || {}
  }

}

export default {
  state, mutations, actions, getters
}