import {
  mapGetters
} from 'vuex'

export default {
  computed: {
    ...mapGetters('cart', ['total'])
  },
  onShow() {
    uni.setTabBarBadge({
      index: 2,
      text: this.total + ''
    })
  },
  watch: {
    total: {
      handler(newV) {
        uni.setTabBarBadge({
          index: 2,
          text: newV + ''
        })
      }
    }
  }
}
