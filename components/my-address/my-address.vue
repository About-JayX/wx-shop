<template>
  <view class="address">
    <view class="add-address" v-if="JSON.stringify(address) ==='{}'">
      <button size="mini" type="primary" @click="getAddress">新增收货地址 +</button>
    </view>
    <view class="my-address" @click="getAddress" v-else>
      <view class="top">
        <view class="name">
          姓名：{{address.userName}}
        </view>
        <view class="telephone">
          电话：{{address.telNumber}}
          <uni-icons type="right" size="20"></uni-icons>
        </view>
      </view>
      <view class="reward-address">
        地址：{{fullAddress}}
      </view>
    </view>
    <image class="myimage" src="../../static/images/cart_border@2x.png" mode=""></image>
  </view>
</template>

<script>
  import {
    mapState,
    mapMutations,
    mapGetters
  } from 'vuex'
  export default {
    name: "my-address",
    data() {
      return {

      };
    },
    methods: {
      ...mapMutations('user', ['setAddress']),

      async getAddress() {
        let [err, res] = await uni.chooseAddress()
        console.log(err, res)
        if (err) return uni.$showMsg('请添加地址！')
        this.setAddress(res)
      }
    },
    computed: {
      ...mapState('user', ['address']),
      ...mapGetters('user',['fullAddress'])
    }
  }
</script>

<style lang="scss">
  .address {

    font-size: 14px;

    .add-address {
      padding: 0px 15px;
      height: 200rpx;
      display: flex;
      justify-content: center;
      align-items: center;
    }

    .my-address {
      padding: 0px 15px;
      height: 200rpx;
      display: flex;
      flex-direction: column;
      justify-content: center;

      .top {
        display: flex;
        justify-content: space-between;

        .telephone {
          display: flex;
          align-items: center;
        }
      }

      .reward-address {
        margin-top: 10px;
      }
    }

    .myimage {
      height: 10rpx;
      width: 100%;
    }
  }
</style>
