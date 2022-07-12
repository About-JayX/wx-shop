<template>
  <view class="my-total">
    <view class="select-All">
      <radio :checked="isCheckAll" color="#ea4450" @click="mychange"></radio>全选
    </view>
    <view class="total-All">
      合计:<text class="price">￥{{mysum}}</text>
    </view>
    <view class="total-sumbit" @click="pay">
      结算({{total}})
    </view>
  </view>
</template>

<script>
  import {
    mapState,
    mapGetters,
    mapMutations
  } from 'vuex'
  export default {
    name: "my-total",
    data() {
      return {
        second: 1,
        timer: null,
        payflag: true
      };
    },
    methods: {
      ...mapMutations('cart', ['CheckAll']),
      ...mapMutations('user', ['setRedirectInfo']),
      mychange() {
        this.CheckAll(!this.isCheckAll)
      },
      // 倒计时的提示方法
      showTip(n) {
        uni.showToast({
          title: `您还未登录，${n}s后跳转到登录页面`,
          icon: 'none',
          duration: 2000
        })
      },

      pay() {
        if (this.payflag) { // 判断是否勾选了商品

          if (this.total <= 0) {
            console.log(this.total)
            return uni.$showMsg('还未选择商品')
          }
          // 判断是否选择了收货地址
          else if (!this.address.userName) {
            console.log(this.address.userName)
            return uni.$showMsg('请选择收货地址')
          }
          // 判断是否登录
          // if (!this.token) return uni.$showMsg('请先登录')
          else if (!this.token) {
            this.payflag = false
            // 显示倒计时
            this.delayNavigate()
          }
        }
      },
      // 处理倒计时的逻辑
      delayNavigate() {
        // 显示倒计时
        this.showTip(this.second) // 3s
        // 设置一个定时器
        this.timer = setInterval(() => {

          // 将时间--
          this.second--
          // 再次显示倒计时
          if (this.second < 0) {
            this.payflag = true
            clearInterval(this.timer)
            this.second = 1
            return uni.switchTab({
              url: '/pages/mine/mine',
              complete: () => {
                this.setRedirectInfo({
                  switchtype: 'switchTab',
                  url: '/pages/cart/cart'
                })
              }
            })
          } else {
            this.showTip(this.second) // 2s 1s 0s -1s
          }

        }, 1000)
      },
    },
    computed: {
      ...mapGetters('cart', ['total', 'mysum', 'isCheckAll']),
      ...mapState('user', ['address', 'token'])
    },
  }
</script>

<style lang="scss">
  .my-total {
    display: flex;
    position: fixed;
    bottom: 0;
    left: 0;
    width: 100%;
    z-index: 999;
    align-items: center;
    height: 150rpx;
    background-color: #fff;
    padding: 0px 20rpx;

    .select-All {
      radio {
        margin-right: 10px;
        font-size: 20px;
      }


    }

    .total-All {
      text-align: center;
      flex: 1;

      .price {
        color: #ea4450;
      }
    }

    .total-sumbit {
      height: 130rpx;
      width: 200rpx;
      background-color: #ea4450;
      color: #fff;
      margin-right: 40rpx;
      text-align: center;
      line-height: 130rpx;
    }
  }
</style>
