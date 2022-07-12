<template>
  <view class="detail" v-if="goodsDetail.goods_price"> 
    <swiper class="myswiper" :indicator-dots="true" :autoplay="true" :interval="2000" :duration="200" circular
      indicator-active-color="#fff">
      <swiper-item v-for="(item,index) in goodsDetail.pics" :key="index">
        <image :src="item.pics_big_url" mode="" @click="previewImg(index)"></image>
      </swiper-item>
    </swiper>
    <!-- 商品信息区域 -->
    <view class="info">
      <view class="price">
        ￥{{ goodsDetail.goods_price }}
      </view>
      <view class="title">
        <view class="left">
          {{ goodsDetail.goods_name}}
        </view>
        <view class="right">
          <uni-icons type="star" size="20"></uni-icons>
          <text>收藏</text>
        </view>
      </view>
      <view class="pass">
        快递：免运费
      </view>
    </view>
    <!-- 商品介绍区域 -->
    <rich-text :nodes="goodsDetail.goods_introduce"></rich-text>
    <uni-goods-nav :options="options" :buttonGroup="buttonGroup" class="mynav" :fill="true" @click="goodsclick"
      @buttonClick="goodsButtonclick"></uni-goods-nav>
  </view>
</template>

<script>
  import {
    mapState,
    mapMutations,
    mapGetters
  } from 'vuex'
  export default {
    computed: {
      ...mapState('cart', ['num']),
      ...mapGetters('cart', ['total'])
    },
    watch: {
      total: {
        handler(nVal) {
          this.options[1].info = nVal
        },
        immediate: true
      }
    },
    data() {
      return {
        goods_id: '',
        goodsDetail: {},
        // 左侧商品导航
        options: [{
            icon: 'shop',
            text: '店铺'
          },
          {
            icon: 'cart',
            text: '购物车',
            info: 0
          }
        ],
        // 右侧的按钮结构
        buttonGroup: [{
            text: '加入购物车',
            backgroundColor: '#ff0000',
            color: '#fff'
          },
          {
            text: '立即购买',
            backgroundColor: '#ffa200',
            color: '#fff'
          }
        ]
      };
    },
    methods: {
      ...mapMutations('cart', ['addCart']),
      goodsclick(e) {
        if (e.content.text == '购物车') {
          uni.switchTab({
            url: '/pages/cart/cart'
          })
        }
      },
      goodsButtonclick(e) {
        if (e.index === 0) {
          const goodsObj = {
            goods_id: this.goodsDetail.goods_id,
            goods_name: this.goodsDetail.goods_name,
            goods_price: this.goodsDetail.goods_price,
            goods_small_logo: this.goodsDetail.goods_small_logo,
            goods_count: 1,
            goods_status: true
          }
          this.addCart(goodsObj)
          return uni.showToast({
            title: '加入购物车成功'
          })
        }
      },
      async getGoodsDetail() {
        let {
          data: res
        } = await uni.$http.get(`/api/public/v1/goods/detail?goods_id=${this.goods_id}`)
        if (res.meta.status != 200) return uni.$showMsg()
        this.goodsDetail = res.message
      },
      previewImg(index) {
        let newArr = this.goodsDetail.pics.map(item => {
          return item.pics_big_url
        })
        uni.previewImage({
          current: index,
          urls: newArr
        })
      }
    },
    onLoad(options) {
      this.goods_id = options.goods_id
      this.getGoodsDetail()
    }
  }
</script>

<style lang="scss">
  .detail {
    padding-bottom: 50px;

    .mynav {
      position: fixed;
      bottom: 0;
      left: 0;
      width: 100%;
    }

    .myswiper {
      height: 700rpx;

      image {
        width: 100%;
        height: 700rpx;
      }
    }

    .info {
      padding: 0 20rpx;

      .price {
        color: #c01c2e;
        font-size: 20px;
        line-height: 80rpx;
      }

      .title {
        display: flex;
        font-size: 14px;

        .left {
          display: -webkit-box;
          text-overflow: ellipsis;
          overflow: hidden;
          -webkit-line-clamp: 2; // 设置两行文字溢出
          -webkit-box-orient: vertical;
        }

        .right {
          width: 300rpx;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
        }
      }

      .pass {
        font-size: 12px;
        line-height: 80rpx;
        color: #9a99a9;
      }
    }
  }
</style>
