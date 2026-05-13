import { getUserInfo, setUserInfo } from '@/utils/storage'

export default {
  namespaced: true,
  state () {
    return {
      userInfo: getUserInfo()
    }
  },
  mutations: {
    setUserInfo (state, obj) {
      state.userInfo = { ...obj }
      setUserInfo(state.userInfo)
    }
  },
  getters: {
    getUserInfo (state) {
      return state.userInfo || { token: '', userId: '' }
    }
  },
  actions: {
    logout (context) {
      context.commit('setUserInfo', {})
      context.commit('cart/setCartList', [], { root: true })
    }
  }
}
