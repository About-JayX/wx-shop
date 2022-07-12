<template>
  <view @click="searchClick" class="my-search" :style="{backgroundColor:bgColor}">
    <view class="search">
      <uni-icons type="search" size="20" color="#c0c0c0"></uni-icons>
      <text>搜索</text>
    </view>
  </view>
</template>

<script>
  export default {
    name: "my-search",
    props: {
      bgColor: {
        type: String,
        default: '#fe2c4b'
      }
    },
    data() {
      return {

      };
    },
    methods: {
      searchClick() {
        this.$emit('click')
      }
    }
  }
</script>

<style lang="scss">
  .my-search {
    padding: 20rpx 16rpx;
    height: 80rpx;

    .search {
      color: #b7b7b7;
      background-color: #fff;
      height: 100%;
      border-radius: 5px;
      display: flex;
      align-items: center;
      justify-content: center;

      text {
        font-size: 14px;
      }
    }
  }
</style>
