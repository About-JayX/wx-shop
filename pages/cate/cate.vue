<template>
  <view class="cate">
    <!-- 搜索框 -->
    <my-search></my-search>
    <!-- 分类 -->
    <view class="mycate">
      <scroll-view scroll-y="true" class="left" :style="{ height: `${wh}px` }">
        <view v-for="(item,index) in cateList" :key="index" class="left-item" :class="{active:activeIndex === index}"
          @click="selectBtn(index)">
          {{item.cat_name}}
        </view>
      </scroll-view>

      <scroll-view :scroll-top="scrollTop" scroll-y="true" class="right" :style="{ height: `${wh}px` }">
        <view v-for="(item,index) in twiceList" :key="index">
          <view class="title">
            <view style="height: 110rpx;display: flex;align-items: center; justify-content: center;">
              /<text>{{item.cat_name}}</text>/
            </view>
            <view class="thrice">
              <view class="img" v-for="(img,num) in item.children" @click="toList(img.cat_name)" :key="num">
                <image :src="img.cat_icon" mode="widthFix"></image>
                <view>{{img.cat_name}}</view>
              </view>
            </view>
          </view>
        </view>
      </scroll-view>
    </view>
  </view>
</template>

<script>
  import myminxins from '@/mixins/myminxins.js'
  export default {
    mixins: [myminxins],
    data() {
      return {
        // 分类区域的高度
        wh: 0,
        activeIndex: 0,
        // 获取分类数据源
        cateList: [],
        // 二级
        twiceList: [],
        // 三级
        thriceList: [],
        scrollTop: 0
      };
    },
    methods: {
      toList(name) {
        uni.navigateTo({
          url: `/pages/list/list?key=${name}`
        })
      },
      selectBtn(index) {
        this.activeIndex = index
        this.twiceList = this.cateList[this.activeIndex].children
        this.scrollTop = this.scrollTop === 0 ? 0.1 : 0
      },
      async getCateList() {
        let {
          data: res
        } = await uni.$http.get('/api/public/v1/categories')
        if (res.meta.status != 200) return uni.$showMsg()
        this.cateList = res.message
        this.twiceList = this.cateList[this.activeIndex].children
      }
    },
    onLoad() {
      // 获取可使用区域高度
      uni.getSystemInfo({
          success: res => {
            this.wh = res.windowHeight - 60
          }
        }),
        this.getCateList()
    },
  }
</script>

<style lang="scss">
  .cate {
    .mycate {
      display: flex;

      .left {
        width: 200rpx;

        .left-item {
          font-size: 12px;
          background-color: #f4f4f4;
          text-align: center;
          line-height: 100rpx;
          height: 100rpx;
          box-sizing: border-box;
          border-bottom: 1px solid #eeeeee;

          &.active {
            border: none;
            color: #eb4450;
            background-color: #fff;
            position: relative;

            &::before {
              content: '';
              position: absolute;
              left: 0;
              top: 50%;
              transform: translateY(-50%);
              width: 8rpx;
              height: 60rpx;
              background-color: #eb4450;
            }
          }
        }
      }

      .right {
        .title {
          text-align: center;
          color: #d8d8d8;

          text {
            margin: 0px 30rpx;
            color: #000;
          }
        }

        .thrice {
          display: flex;
          flex-wrap: wrap;

          .img {
            padding: 10px 0;
            justify-content: center;
            align-items: center;
            font-size: 12px;
            color: #000;
            width: 33.33%;
            display: flex;
            flex-direction: column;

            image {
              width: 120rpx;
              height: 120rpx;
            }
          }
        }
      }
    }
  }
</style>
