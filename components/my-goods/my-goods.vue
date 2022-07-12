<template>
  <view class="shop-item" @click="goodsclick" v-if="item.goods_price !== 0">
    <radio @click="changeStatus" v-if="radioShow" value="r1" :checked="item.goods_status" color="#ea4450" />
    <image :src="item.goods_small_logo||defaultImg" mode="">
    </image>
    <view class="shop-info">
      <text class="title">{{item.goods_name}}</text>
      <view class="price">
        <rich-text :nodes="item.goods_price | tofixed"></rich-text>
        <uni-number-box @change="mychange" v-if="NumBoxShow" v-model="item.goods_count"></uni-number-box>
      </view>
    </view>
  </view>
</template>

<script>
  export default {
    props: {
      item: {},
      radioShow: {
        default: false
      },
      NumBoxShow: {
        default: false
      }
    },
    name: "my-goods",
    data() {
      return {

      };
    },

    filters: {
      tofixed(num) {
        let arr = num.toFixed(2).split('.')
        let str =
          `<span style="font-size:14px">￥</span>${arr[0]}<span style="font-size:14px">.</span><span style="font-size:14px">${arr[1]}</span>`
        return str
      }
    },
    methods: {
      mychange(e) {
        this.$emit('numchange', {
          goods_id: this.item.goods_id,
          goods_count: e
        })
      },
      goodsclick() {
        this.$emit('click')
      },
      changeStatus() {
        this.$emit('radio-change', {
          goods_id: this.item.goods_id,
          goods_status: !this.item.goods_status
        })
      }
    }
  }
</script>

<style lang="scss">
  .shop-item {
    padding: 15px 10px;
    height: 115px;
    display: flex;
    align-items: center;
    flex-wrap: nowrap;
    border-bottom: 1px solid #e0e0e0;

    radio {
      padding: 0px 30rpx 0px 0px;
    }

    image {
      height: 100%;
      width: 110px;
    }

    .shop-info {
      height: 100%;
      margin-left: 20px;
      flex: 1;
      justify-content: space-between;
      display: flex;
      flex-direction: column;

      .title {
        word-break: break-all;
        text-overflow: ellipsis;
        display: -webkit-box;
        -webkit-box-orient: vertical;
        -webkit-line-clamp: 2;
        overflow: hidden;
      }

      .price {
        color: #ff2d4a;
        font-size: 18px;
        display: flex;
        justify-content: space-between;
        align-items: center;
      }
    }
  }
</style>
