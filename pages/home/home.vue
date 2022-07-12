<template>
  <view class="home">
    <!-- 搜索  -->
    <view style="position: sticky; z-index: 999;top: 0;left: 0;">
      <my-search @click="mysearch"></my-search>
    </view>
    <!-- 轮播图 -->
    <swiper class="mySwiper" indicator-dots indicator-active-color="#fff" circular autoplay interval="2000"
      duration="200">
      <swiper-item v-for="(item,index) in swiperList" :key="index">
        <navigator :url="item.navigator_url">
          <image :src='item.image_src' mode=""></image>
        </navigator>
      </swiper-item>
    </swiper>
    <!-- 分类导航 -->
    <view class="cate">
      <view class="item" v-for="(item,index) in cateList" :key="index">
        <image :src="item.image_src" @click="goCate(item.name)"></image>
      </view>
    </view>
    <!-- 楼层导航 -->
    <view class="floor">
      <view class="item" v-for="(item,index) in floorList" :key="index">
        <image :src="item.floor_title.image_src" mode=""></image>
        <view class="floor-nav">
          <view class="left">
            <image :src="item.product_list[0].image_src" mode="" @click="toList(item.product_list[0].name)"></image>
          </view>
          <view class="right">
            <block v-for="(cate,num) in item.product_list">
              <image v-if="num!=0" :src="cate.image_src" mode="" :key="num" @click="toList(cate.name)"></image>
            </block>

          </view>
        </view>
      </view>
    </view>
  </view>
  </view>
</template>

<script>
  import myminxins from '@/mixins/myminxins.js'
  export default {
    mixins: [myminxins],
    data() {
      return {
        swiperList: [],
        cateList: [],
        floorList: []
      };
    },
    methods: {
      // 点击搜索框
      mysearch() {
        uni.navigateTo({
          url: '/pages/search/search'
        })
      },
      // 获取轮播图
      async getSwiperList() {
        let {
          data: res
        } = await uni.$http.get('/api/public/v1/home/swiperdata')
        if (res.meta.status != 200) {
          return uni.$showMsg()
        } else {
          this.swiperList = res.message
        }
      },
      // 获取分类
      async getCateList() {
        let {
          data: res
        } = await uni.$http.get('/api/public/v1/home/catitems')
        if (res.meta.status != 200) return uni.$showMsg()
        this.cateList = res.message
      },
      // 进入分类栏
      goCate(name) {
        if (name == '分类') {
          uni.switchTab({
            url: "/pages/cate/cate"
          })
        } else {
          return false
        }
      },
      // 获取楼层数据
      async getFloorList() {
        let {
          data: res
        } = await uni.$http.get('/api/public/v1/home/floordata')
        if (res.meta.status != 200) return uni.$showMsg()
        this.floorList = res.message
      },
      toList(name) {
        uni.navigateTo({
          url: `/pages/list/list?key=${name}`
        })
      }
    },
    onLoad() {
      this.getSwiperList(),
        this.getCateList(),
        this.getFloorList()
    }
  }
</script>

<style lang="scss">
  .home {
    .mySwiper {
      height: 340rpx;

      image {
        width: 100%;
        height: 340rpx;
      }
    }

    .cate {
      background-color: #fff;
      height: 194rpx;
      display: flex;
      align-items: center;
      justify-content: space-around;

      .item {
        width: 128rpx;
        height: 140rpx;

        image {
          width: 100%;
          height: 100%;
        }
      }
    }

    .floor {
      display: flex;
      flex-direction: column;

      .item {
        image {
          height: 88rpx;
          width: 100%;
        }

        .floor-nav {
          display: flex;
          padding: 20rpx 17rpx;
          box-sizing: border-box;

          .left {
            width: 232rpx;
            margin-right: 10rpx;

            image {
              height: 100%;
              border-radius: 10rpx;
            }
          }

          .right {
            flex: 1;
            height: 100%;
            display: flex;
            flex-wrap: wrap;
            justify-content: space-between;
            align-items: center;

            image {
              border-radius: 10rpx;
              width: 232rpx;
              height: 94px;

              &:nth-child(1),
              &:nth-child(2) {
                margin-bottom: 10rpx;
              }
            }
          }
        }
      }
    }
  }
</style>
