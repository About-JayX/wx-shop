<template>
  <view class="search">
    <view class="search-bar">
      <uni-search-bar bgColor="#fff" @input="myinput" :focus="focus" v-model="key" @confirm="confirm"> </uni-search-bar>
    </view>
    <view class="search-list" v-if="searchResult.length>0">
      <view class="suggest" v-for="(item,index) in searchResult" @click="toDetail(item.goods_id)" :key="index">
        <text>{{item.goods_name}}</text>
        <uni-icons type="right" size="18"></uni-icons>
      </view>
    </view>
    <view class="history" v-else>
      <view class="title">
        <text>搜索历史</text>
        <uni-icons type="clear" size="18" color="#cccccc" @click="clearHistory"></uni-icons>
      </view>
      <view class="item">
        <text v-for="(item,index) in historyList" :key="index" @click="toList(item)">{{item}}</text>
      </view>
    </view>
  </view>
</template>

<script>
  export default {
    data() {
      return {
        key: '',
        focus: true,
        timer: null,
        searchResult: [],
        historyList: uni.getStorageSync('history') || []
      };
    },
    methods: {
      // 搜索列表
      toList(key) {
        uni.navigateTo({
          url: `/pages/list/list?key=${key}`
        })
      },
      // 清空搜索历史
      clearHistory() {
        if (this.historyList.length === 0) return uni.showToast({
          title: '搜索历史空空如也~',
          icon: "none",
        })
        else {
          uni.removeStorageSync('history')
          this.historyList = []
        }
      },
      // 搜索框确定
      confirm(e) {
        uni.navigateTo({
          url: `/pages/list/list?key=${e.value}`
        })
        this.historyList.unshift(e.value)
        this.historyList = [...new Set(this.historyList)]
        uni.setStorageSync('history', this.historyList)
      },
      // 输入框改变事件
      myinput() {
        clearInterval(this.timer)
        if (this.key.trim() == '') {
          return
        }
        this.timer = setTimeout(() => {
          this.getSearchResult(this.key)
        }, 300)
      },
      // 获取搜索联想
      async getSearchResult(key) {
        let {
          data: res
        } = await uni.$http.get('/api/public/v1/goods/search', {
          query: key
        })
        if (res.meta.status != 200) return uni.$showMsg()
        this.searchResult = res.message.goods
      },
      // 商品详情页
      toDetail(id) {
        uni.navigateTo({
          url: `/pages/goods_detail/main?goods_id=${id}`
        })
      },
    },
    onLoad() {
      // this.$refs.mysearch.focus = true
    },
    onHide() {
      this.key = ''
      this.searchResult = []
    }
  }
</script>

<style lang="scss">
  .search {
    .search-bar {
      background-color: #eeeeee;
      height: 120rpx;
    }

    .search-list {
      padding: 0rpx 20rpx;

      .suggest {
        padding: 20rpx 0;
        display: flex;
        flex-wrap: nowrap;
        align-items: center;
        border-bottom: 1px solid #e0e0e0;

        &:last-child {
          border: none;
        }

        text {
          flex: 1;
          white-space: nowrap;
          text-overflow: ellipsis;
          overflow: hidden;
        }
      }
    }

    .history {
      padding: 0rpx 20rpx;

      .title {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 30rpx 0rpx;
        font-size: 16px;
        font-weight: 900;
      }

      .item {
        display: flex;
        flex-wrap: wrap;

        text {
          padding: 15rpx 20rpx;
          background-color: #dddddd;
          margin: 0px 20rpx 10rpx 0;
        }
      }
    }
  }
</style>
