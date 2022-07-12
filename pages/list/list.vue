<template>
  <view class="list">
    <view class="my-search-bar">
      <uni-search-bar cancelButton='none' focus="true" v-model="myParams.query" bgColor="#fff" clearButton="none"
        @confirm="myconfirm">
      </uni-search-bar>
      <view class="tabs">
        <view class="item" @click="selectBtn(index)" :class="{active:index===activeIndex}" v-for="(item,index) in tabs "
          :key="index">
          {{item}}
        </view>
      </view>
    </view>
    <my-goods :item="item" v-for="(item,index) in searchList" :key="index" @click="toDetail(item.goods_id)"></my-goods>
  </view>
</template>

<script>
  export default {
    methods: {
      myconfirm() {
        this.searchBar = this.myParams.query
        this.myParams.pagenum = 1
        this.total = 0
        this.searchList = []
        this.isLoading = true
        this.getsearchList()
      },
      toDetail(id) {
        uni.navigateTo({
          url: `/pages/goods_detail/main?goods_id=${id}`
        })
      },
      selectBtn(index) {
        this.activeIndex = index
      },
      // 获取商品数据源
      async getsearchList(bool) {
        if (this.isLoading) {
          this.isLoading = false
          let {
            data: res
          } = await uni.$http.get('/api/public/v1/goods/search', {
            ...this.myParams,
            query: this.searchBar
          })
          if (res.meta.status != 200) return uni.$showMsg()
          this.searchList = [...this.searchList, ...res.message.goods]
          this.total = res.message.total
          this.isLoading = true
          if (bool) {
            uni.stopPullDownRefresh();
          }
        }
      }
    },
    data() {
      return {
        // 搜索结果
        searchBar: '',
        // tbs栏
        tabs: ['综合', '销量', '价格'],
        // 选择样式
        activeIndex: 0,
        // 商品数据源
        searchList: [],
        total: 0,
        myParams: {
          query: '',
          pagenum: 1,
          pagesize: 10
        },
        // 定义一张默认图片
        defaultImg: 'https://img3.doubanio.com/f/movie/8dd0c794499fe925ae2ae89ee30cd225750457b4/pics/movie/celebrity-default-medium.png',
        isLoading: true
      };
    },

    onLoad(options) {
      this.myParams.query = options.key
      this.searchBar = options.key
      this.getsearchList()
    },
    onReachBottom() {
      this.myParams.pagenum += 1
      this.getsearchList()
    },
    onPullDownRefresh() {
      this.myParams.pagenum = 1
      this.total = 0
      this.searchList = []
      this.isLoading = true
      this.getsearchList(true)

    }
  }
</script>

<style lang="scss">
  .list {
    .my-search-bar {
      position: sticky;
      left: 0;
      top: 0;
      background-color: #eeeeee;

      .tabs {
        height: 100rpx;
        background-color: #fff;
        display: flex;
        border-bottom: 1px solid #e0e0e0;

        .item {
          font-size: 15px;
          line-height: 100rpx;
          text-align: center;
          flex: 1;

          &.active {
            color: #ff344f;
          }
        }

      }
    }
  }
</style>
