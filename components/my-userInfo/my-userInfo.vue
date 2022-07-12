<template>
  <view class="myuser-info">
    <view class="header">
      <image src="../../static/cart_empty@2x.png" mode=""></image>
      <view class="user-name">
        我是一个伟大的名称
      </view>
      <view class="bottom">
        <view class="my-shopInfo">
          <view class="one-item">
            <view>8</view>
            <view>收藏的店铺</view>
          </view>
          <view class="one-item">
            <view>8</view>
            <view>收藏的店铺</view>
          </view>
          <view class="one-item">
            <view>8</view>
            <view>收藏的店铺</view>
          </view>
          <view class="one-item">
            <view>8</view>
            <view>收藏的店铺</view>
          </view>
        </view>
        <view class="order">
          <view class="title">
            我的订单
          </view>
          <view class="my-order">
            <view class="order-item">
              <image src="../../static/my-icons/icon1.png" mode=""></image>
              <view class="text">
                待付款
              </view>
            </view>
            <view class="order-item">
              <image src="../../static/my-icons/icon2.png" mode=""></image>
              <view class="text">
                待收货
              </view>
            </view>
            <view class="order-item">
              <image src="../../static/my-icons/icon3.png" mode=""></image>
              <view class="text">
                退款/退货
              </view>
            </view>
            <view class="order-item">
              <image src="../../static/my-icons/icon4.png" mode=""></image>
              <view class="text">
                全部订单
              </view>
            </view>
          </view>
        </view>
        <view class="three">
          <view class="three-item">
            <view class="title">
              收货地址
            </view>
            <uni-icons type="right" size="20"></uni-icons>
          </view>
          <view class="three-item">
            <view class="title">
              联系客服
            </view>
            <uni-icons type="right" size="20"></uni-icons>
          </view>
          <view class="three-item" @click="mylogout">
            <view class="title">
              退出登录
            </view>
            <uni-icons type="right" size="20"></uni-icons>
          </view>
        </view>
      </view>
    </view>
  </view>
</template>

<script>
  import {
    mapMutations
  }
  from 'vuex'
  export default {
    name: "my-userInfo",
    data() {
      return {

      };
    },
    methods: {
      ...mapMutations('user', ['logout']),
      async mylogout() {
        let [err, res] = await uni.showModal({
          title: '是否退出登录'
        })
        if(res.confirm){
          this.logout()
          return uni.$showMsg('退出成功！')
        }
      }
    }
  }
</script>

<style lang="scss">
  .myuser-info {
    height: 100vh;
    background-color: #f4f4f4;

    .header {
      position: relative;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      height: 400rpx;
      background-color: #fe2c4b;

      image {
        width: 160rpx;
        height: 160rpx;
        border: 2px solid #fff;
        border-radius: 50%;
      }

      .user-name {

        margin-top: 30rpx;
        color: #fff;
        font-weight: 900;
      }

      .bottom {
        .three {
          border-radius: 10rpx;
          display: flex;
          flex-direction: column;

          .three-item {
            background-color: #Fff;
            padding: 15px 5px;

            display: flex;
            justify-content: space-between;
            align-items: center;

            &:first-child {
              border-radius: 10rpx 10rpx 0 0;
            }

            &:last-child {
              border-radius: 0 0 10rpx 10rpx;
            }

            .title {
              margin-left: 10px;
            }
          }
        }

        width: 96%;
        position: absolute;
        bottom: 0;
        left: 50%;
        transform: translate(-50%, 93%);

        .order {
          display: flex;
          flex-direction: column;
          background-color: #fff;
          margin: 10px 0;
          border-radius: 5px;

          .title {
            font-size: 18px;
            padding: 30rpx 0px 20rpx 30rpx;
            border-bottom: 1px solid #e2e2e2;
          }

          .my-order {
            padding: 10px 0px;
            font-size: 14px;
            display: flex;
            justify-content: space-around;
            align-items: center;

            .order-item {
              display: flex;
              flex-direction: column;
              justify-content: center;
              align-items: center;

              image {
                width: 80rpx;
                height: 80rpx;
              }
            }
          }
        }

        .my-shopInfo {

          border-radius: 5px;
          display: flex;
          align-items: center;
          justify-content: space-around;
          background-color: #fff;
          height: 120rpx;

          .one-item {
            font-size: 14px;
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
          }
        }


      }

    }
  }
</style>
