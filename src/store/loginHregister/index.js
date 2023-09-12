import { reqCode, reqUserRrgister, reqLogin, reqUserInof,reqoutLogin} from '@/netword'
import { setToken, getToken, removeToken } from '@/utils/token'
const state = {
  code: '',
  token: getToken(),
  user: {}
}
const mutations = {
  // 存储验证码
  GETCODE(state, code) {
    state.code = code
  },
  // 存储令牌信息
  USERLOGIN(state, token) {
    state.token = token
  },
  // 获取用户信息
  GETUSERINFO(start, user) {
    start.user = user
  },
  // 清除token
  OUTLOGIN(start) {
    start.token = ''
    start.user = {}
    removeToken()
  }
}
const actions = {
  // 获取验证码
  async getCode({ commit }, phone) {
    let res = await reqCode(phone)
    // 应为没有发送到用户手机中的条件所以 需要自己和对验证码的正确性
    if (res.code == 200) {
      commit('GETCODE', res.data)
      // 为验证信息准备
      return 'ok'
    } else {
      return Promise.reject(new Error('fail'))
    }
  },
  // 注册用户
  async userRegister({ commit }, user) {
    let res = await reqUserRrgister(user)
    if (res.code == 200) {
      return 'ok'
    } else {
      return Promise.reject(new Error('注册失败'))
    }

  },
  // 登录用户 token
  async userLogin({ commit }, data) {
    let res = await reqLogin(data)
    if (res.code == 200) {
      commit('USERLOGIN', res.data.token)
      // 本地存储token
      // localStorage.setItem('TOKEN',res.data.token)
      // 把上面的函数封装到utils->token中 然后调用
      setToken(res.data.token)
      return 'ok'
    } else {
      return Promise.reject(new Error('fali'))
    }
  },
  // 获取用户信息
  async getUserInfo({ commit }) {
    let res = await reqUserInof()
    if (res.code == 200) {
      commit('GETUSERINFO', res.data)
      return 'ok'
    }else{
      return Promise.reject(new Error('fail'))
    }
  },
  // 退出登录
  async outlogin({ commit }) {
    let res = await reqoutLogin()
    if(res.code==200){
      commit('OUTLOGIN')
      return 'ok'
    }else{
      return Promise.reject(new Error('fail'))
    }
  }
}
const getters = {}

export default {
  state, mutations, actions, getters
}