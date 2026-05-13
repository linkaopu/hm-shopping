<template>
    <div>
       <van-nav-bar
            title="登录"
            left-arrow
            @click-left="$router.go(-1)"
        />

        <div class="container">
            <div class="title">
              <h3>手机号登录</h3>
              <p>未注册的手机号登录后将自动注册</p>
            </div>

            <div class="form">
                <div class="form-item">
                    <input class="inp" maxlength="11" placeholder="请输入手机号码" type="text" v-model="mobilePohoneNum">
                 </div>
                <div class="form-item">
                    <input class="inp" maxlength="5" placeholder="请输入图形验证码" type="text" v-model="inputPicCode">
                    <img :src="picURL" v-if="picURL" alt="图形验证码" @click="getPicCode">
                </div>
                <div class="form-item">
                  <input class="inp" placeholder="请输入短信验证码" type="text" v-model="inputSmsCode">
                  <button @click="getCode" :class="{'disActive': buttonDisabled}" :disabled="buttonDisabled">{{ curSecond === totalSecond ? '获取验证码' : `${curSecond}s后重新获取` }}</button>
                </div>
      </div>

      <div class="login-btn" @click="login">登录</div>
    </div>
    </div>
</template>

<script>
import { getPic, getSmsCode, loginReq } from '@/api/login'
import { mapMutations } from 'vuex'
export default {
  name: 'LoginIndex',

  data () {
    return {
      // 图形验证码和key
      picURL: '', // 图形验证码的base64字符串转换成的图片地址
      picKey: '', // 图形验证码的key
      // 短信验证码倒计时和定时器
      totalSecond: 5,
      curSecond: 5,
      timer: null,
      // 登录信息表单
      mobilePohoneNum: '15273391234', // 输入的手机号码
      inputPicCode: '1234', // 输入的图形验证码
      inputSmsCode: '246810' // 输入的短信验证码
    }
  },

  methods: {
    // 获取设置用户信息的mutations
    ...mapMutations('user', ['setUserInfo']),

    // 获取图形验证码
    async getPicCode () {
      // 获取图形验证码的base64字符串和key
      const { data: { base64, key } } = await getPic()
      // 将图形验证码的base64字符串转换成图片地址)
      this.picURL = base64
      this.picKey = key
    },

    // 获取短信验证码
    async getCode () {
      // 验证手机号和图形验证码是否合法
      if (!this.vaildFun()) {
        return
      }

      // 发送验证码成功后，开始倒计时
      if (this.curSecond === this.totalSecond && !this.timer) {
        // 获取短信验证码
        await getSmsCode(this.inputPicCode, this.picKey, this.mobilePohoneNum)
        this.$toast('验证码已发送，请注意查收')

        this.timer = setInterval(() => {
          // 先减一，再判断是否为0
          this.curSecond--
          if (this.curSecond === 0) {
            clearTimeout(this.timer)
            this.curSecond = this.totalSecond
            this.timer = null
          }
        }, 1000)
      }

      this.$toast('验证码已发送，请注意查收')
    },

    // 验证手机号和图形验证码是否合法
    vaildFun () {
      if (!/^1[3-9]\d{9}$/.test(this.mobilePohoneNum)) {
        this.$toast('请输入正确的手机号')
        return false
      }
      if (!/^[0-9a-zA-Z]{4}$/.test(this.inputPicCode)) {
        this.$toast('请输入正确的图形验证码')
        return false
      }
      return true
    },

    // 登录
    async login () {
      if (!this.vaildFun()) {
        return
      }
      if (!/^\d{6}$/.test(this.inputSmsCode)) {
        this.$toast('请输入正确的手机验证码')
        return
      }
      const { data } = await loginReq(this.mobilePohoneNum, this.inputSmsCode)
      this.setUserInfo(data)
      // 判断有无回跳地址
      const url = this.$route.query.backUrl || '/'
      this.$router.replace(url)
      this.$toast('登录成功')
    }

  },

  // 组件创建时获取图形验证码
  created () {
    this.getPicCode()
  },

  // 获取短信验证码按钮是否禁用
  computed: {
    buttonDisabled () {
      return this.curSecond !== this.totalSecond
    }
  },

  // 组件销毁时清除定时器
  destroyed () {
    if (this.timer) {
      clearTimeout(this.timer)
    }
  }
}
</script>

<style lang="less" scoped>
.container {
  padding: 49px 29px;

  .title {
    margin-bottom: 20px;
    h3 {
      font-size: 26px;
      font-weight: normal;
    }
    p {
      line-height: 40px;
      font-size: 14px;
      color: #b8b8b8;
    }
  }

  .form-item {
    border-bottom: 1px solid #f3f1f2;
    padding: 8px;
    margin-bottom: 14px;
    display: flex;
    align-items: center;
    .inp {
      display: block;
      border: none;
      outline: none;
      height: 32px;
      font-size: 14px;
      flex: 1;
    }
    img {
      width: 94px;
      height: 31px;
    }
    button {
      height: 31px;
      border: none;
      font-size: 13px;
      color: #cea26a;
      background-color: transparent;
      padding-right: 9px;
    }
    .disActive {
        color: #b8b8b8;
    }
  }

  .login-btn {
    width: 100%;
    height: 42px;
    margin-top: 39px;
    background: linear-gradient(90deg,#ecb53c,#ff9211);
    color: #fff;
    border-radius: 39px;
    box-shadow: 0 10px 20px 0 rgba(0,0,0,.1);
    letter-spacing: 2px;
    display: flex;
    justify-content: center;
    align-items: center;
  }
}
// 设置导航条 返回箭头 颜色
.van-nav-bar {
  .van-icon-arrow-left {
    color: #333;
  }
}
</style>
