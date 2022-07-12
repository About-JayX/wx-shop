export default {
  namespaced: true,
  state: {
    cart: uni.getStorageSync('cart') || []
  },
  mutations: {
    CheckAll(state, bool) {
      state.cart.forEach(item => {
        item.goods_status = bool
      })
    },
    addCart(state, shopObj) {
      let obj = state.cart.find(item => {
        return item.goods_id === shopObj.goods_id
      })
      // obj
      if (!obj) {
        state.cart.push(shopObj)
      } else {
        obj.goods_count += 1
      }
      uni.setStorageSync('cart', state.cart)
    },
    changeStatus(state, changeObj) {
      let obj = state.cart.find(item => {
        return item.goods_id === changeObj.goods_id
      })
      if (obj) {
        obj.goods_status = changeObj.goods_status
      } else return false
      uni.setStorageSync('cart', state.cart)
    },
    changeNum(state, changeObj) {
      let obj = state.cart.find(item => {
        return item.goods_id === changeObj.goods_id
      })
      if (obj) {
        obj.goods_count = changeObj.goods_count
      } else return false
      uni.setStorageSync('cart', state.cart)
    },
    delShop(state, id) {
      state.cart = state.cart.filter(item => item.goods_id != id)
      uni.setStorageSync('cart', state.cart)
    },

  },
  actions: {},
  getters: {
    total(state) {
      return state.cart.reduce((sum, item) => {
        return sum += item.goods_status ? item.goods_count : 0
      }, 0)
    },
    mysum(state) {
      return state.cart.reduce((sum, item) => {
        return sum += item.goods_status ? item.goods_price * item.goods_count : 0
      }, 0)
    },
    isCheckAll(state) {
      return state.cart.every(item => {
        return item.goods_status
      })
    },
  }
}
