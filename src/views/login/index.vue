<template>
  <div class="login-box" :style="{'height': boxHeight}">
    <img class="login-poster" src="http://p1.ssl.cdn.btime.com/t01f849668a057528bd.jpg?size=640x340">
    <div class="login-wrap">
        <van-cell-group>
            <van-field
                v-model="mobile"
                left-icon="contact"
                type="number"
                label="手机号"
                placeholder="请输入手机号"
                :error="error1"
                :error-message="errorMessage1"
                @input="maxlength"
                @blur="validatePhone"
            />
            <van-field
                v-model="password"
                type="password"
                maxlength="20"
                label="密码"
                placeholder="请输入密码"
                left-icon="edit-data"
                :error="error2"
                :error-message="errorMessage2"
                @blur="validatePassword"
            />
        </van-cell-group>
        <van-button
            size="large" 
            type="primary" 
            class="login-btn" 
            :loading="loading"
            @click="login"
        >登录</van-button>
    </div>
    <van-button size="small" tag="a" href="#/register" class="register">
        还没注册？点这里
    </van-button>
  </div>
</template>

<script>
import { Icon, Cell, CellGroup, Field, Button, Toast } from "vant";

export default {
  components: {
    [Icon.name]: Icon,
    [Cell.name]: Cell,
    [CellGroup.name]: CellGroup,
    [Field.name]: Field,
    [Button.name]: Button,
    [Toast.name]: Toast
  },

  data() {
    return {
      boxHeight: document.documentElement.clientHeight + "px",
      mobile: "",
      password: "",
      error1: false,
      error2: false,
      errorMessage1: "",
      errorMessage2: "",
      loading: false,
      devide_type: 1
    };
  },

  created() {
    //调用获取设备平台方法
    this.whichPlatform();
  },

  methods: {
    //手机号最大11位
    maxlength() {
      if (this.mobile.length > 11) {
        this.mobile = this.mobile.slice(0, 11);
      }
    },
    //手机号验证
    validatePhone() {
      if (this.mobile === "") {
        this.error1 = true;
        this.errorMessage1 = "手机号不能为空！";
        return false;
      } else if (!/^1[34578]\d{9}$/.test(this.mobile)) {
        this.error1 = true;
        this.errorMessage1 = "请填写正确的手机号！";
        return false;
      } else {
        this.error1 = false;
        this.errorMessage1 = "";
        return true;
      }
    },
    //密码验证
    validatePassword() {
      if (this.password === "") {
        this.error2 = true;
        this.errorMessage2 = "密码不能为空！";
        return false;
        // }else if(!/^(?:(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9]))[a-zA-Z0-9]{8,20}$/.test(this.password)){
        //     this.error2 = true;
        //     this.errorMessage2 = "请输入8-20位大、小写字母和数字组合！";
        //     return false;
      } else {
        this.error2 = false;
        this.errorMessage2 = "";
        return true;
      }
    },
    //登录
    login() {
      if (this.validatePhone() && this.validatePassword()) {
        this.loading = true;
        this.loginSubmit();
      }
    },
    //登录接口
    loginSubmit() {
      let mobile = this.mobile;
      let password = this.password;
      let device_token = "18639834068"; //18639834068
      let registration_id = "1";
      let devide_type = this.devide_type;
      //let param = `mobile=${mobile}&password=${password}&device_token=${device_token}&registration_id=${registration_id}&devide_type=${devide_type}`;
      this.$store
        .dispatch("userLogin", {
          mobile,
          password,
          device_token,
          registration_id,
          devide_type
        })
        .then(
          res => {
            console.log(res);
            this.loading = false;
            //window.history.go(-1);
            this.$router.push({ path: "goodsList" });
          },
          err => {
            this.loading = false;
            console.log(err);
          }
        );
    },
    //获取设备平台类型
    whichPlatform() {
      let u = navigator.userAgent;
      let isAndroid = u.indexOf("Android") > -1 || u.indexOf("Linux") > -1; //android终端
      let isIOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //ios终端
      //let isWx = !!ua.match(/MicroMessenger/i); //微信
      if (isIOS) {
        this.devide_type = 1;
      } else if (isAndroid) {
        this.devide_type = 2;
      } else {
        this.devide_type = 1; //默认来源ios
      }
    }
  }
};
</script>

<style lang="less">
.login {
  &-box {
    width: 7.5rem;
    background: #fff;
  }

  &-poster {
    width: 7.5rem;
    height: 4rem;
    display: block;
  }

  &-wrap {
    width: 7.5rem;
    padding: 1rem 0.4rem;
    box-sizing: border-box;
  }

  &-btn {
    margin-top: 1rem;
  }
}

.register {
  left: 2.5rem;
  background: cornflowerblue;
  color: #fff;
}
</style>
