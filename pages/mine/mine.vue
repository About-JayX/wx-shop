<template>
  <view>
    <my-login v-if="!token"></my-login>
    <my-userInfo v-else></my-userInfo>
  </view>
</template>

<script>
  import myminxins from '@/mixins/myminxins.js'
  import {
    mapState
  } from 'vuex'
  export default {
    mixins: [myminxins],
    data() {
      return {

      };
    },
    computed: {
      ...mapState('user', ['token', 'userInfo'])
    },
    onShow() {

    }
  }
</script>

<style lang="scss">

</style>
