<template>
  <view class="my-login">
    <uni-icons type="contact-filled" size="100" color="#afafaf"></uni-icons>
    <button open-type="getUserInfo" @getuserinfo="getuserinfo">一键登录</button>
    <text>登录后享受更多权益</text>
  </view>
</template>

<script>
  import {
    mapMutations,
    mapState
  }
  from 'vuex'
  export default {
    name: "my-login",
    data() {
      return {

      };
    },
    computed: {
      ...mapState('user', ['redirectInfo']),
    },
    methods: {
      ...mapMutations('user', ['setUserInfo', 'setToken', 'setRedirectInfo']),
      async getuserinfo(e) {
        let {
          detail: res
        } = e
        if (res.errMsg !== "getUserInfo:ok") return uni.$showMsg('获取用户信息失败')
        this.setUserInfo(res.userInfo)

        let [err, loginRes] = await uni.login()
        if (err) return uni.$showMsg('登陆失败！')

        let params = {
          encryptedData: res.encryptedData,
          rawData: res.rawData,
          iv: res.iv,
          signature: res.signature,
          code: loginRes.code
        }
        this.getToken(params)
        console.log(this.redirectInfo)
        if (this.redirectInfo && this.redirectInfo.switchtype) {
          uni.switchTab({
            url: this.redirectInfo.url,
          })

        }
      },
      async getToken(parmas) {
        let res = await uni.$http.post('/api/public/v1/users/wxlogin', parmas)
        this.setToken('我是一个帅气的微信小程序开发人员！')
      }

    },
  }
</script>

<style lang="scss">
  .my-login {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    margin-top: 200rpx;

    button {
      margin: 20rpx 0 40rpx;
      background-color: #fe2c4b;
      width: 80%;
      border-radius: 40rpx;
      color: #fff;
    }

    text {
      font-size: 12px;
      color: #afafaf;
    }
  }
</style>
