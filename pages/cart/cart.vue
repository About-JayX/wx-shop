<template>
  <view class="cart">
    <view class="" v-if="cart.length >0">
      <my-address></my-address>
      <view class="goods-list">
        <view class="top">
          <uni-icons class="myicons" type="shop" size="20"></uni-icons>
          <text>购物车</text>
        </view>
        <uni-swipe-action>
          <uni-swipe-action-item v-for="(item,index)  in cart" :key="index" :right-options=" options"
            @click="del(item.goods_id)">
            <my-goods :item="item" :radioShow="true" @radio-change="radioChange()" :NumBoxShow="true"
              @numchange="numchange"></my-goods>
          </uni-swipe-action-item>
        </uni-swipe-action>
      </view>
      <my-total @changebtn="changebtn($event)"></my-total>
    </view>
    <view class="empty" v-else>
      <image src="../../static/cart_empty@2x.png" mode=""></image>
      空空如也~
    </view>
  </view>
</template>

<script>
  import myminxins from '@/mixins/myminxins.js'
  import {
    mapState,
    mapMutations
  } from 'vuex'
  export default {
    mixins: [myminxins],
    computed: {
      ...mapState('cart', ['cart'])
    },
    data() {
      return {
        options: [{
          text: '删除',
          style: {
            backgroundColor: '#fe2c4b'
          }
        }]
      };
    },
    onShow() {},
    methods: {
      ...mapMutations('cart', ['changeStatus', 'changeNum', 'delShop']),
      del(id) {
        this.delShop(id)
      },
      radioChange(e) {
        this.changeStatus(e)
      },
      numchange(e) {
        this.changeNum(e)
      }
    },

  }
</script>

<style lang="scss">
  .cart {
    padding-bottom: 150rpx;

    .goods-list {
      .top {
        height: 100rpx;
        line-height: 100rpx;
        border-bottom: 1px solid #e0e0e0;

        .myicons {
          margin: 0px 20rpx;
        }
      }
    }

    .empty {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      color: #e0e0e0;
      image{
        margin-top: 300rpx;
        margin-bottom: 40rpx;
        width: 200rpx;
        height: 200rpx;
      }
    }
  }
</style>
