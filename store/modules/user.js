export default {
  namespaced: true,
  state: {
    address: uni.getStorageSync('address') || {},
    token: uni.getStorageSync('token') || '',
    userInfo: uni.getStorageSync('userInfo') || {},
    redirectInfo: null
  },
  mutations: {
    logout(state) {
      state.token = ''
      uni.removeStorageSync('token')
      state.userInfo = {}
      uni.removeStorageSync('userInfo')
      state.address = {}
      uni.removeStorageSync('address')
    },
    setRedirectInfo(state, obj) {
      state.redirectInfo = obj
      console.log(state.redirectInfo)
    },
    setToken(state, token) {
      state.token = token
      uni.setStorageSync('token', state.token)
    },
    setAddress(state, address) {
      state.address = address
      uni.setStorageSync('address', state.address)
    },
    setUserInfo(state, obj) {
      state.userInfo = obj
      uni.setStorageSync('userInfo', state.userInfo)
    }
  },
  actions: {},
  getters: {
    fullAddress(state) {
      return `${state.address.provinceName}${state.address.cityName}${state.address.countyName}${state.address.detailInfo}`
    }
  }
}
