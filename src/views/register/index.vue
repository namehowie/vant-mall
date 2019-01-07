<template>
  <div class="login-box" :style="{'height': boxHeight}">
    <img class="login-poster" src="https://img.yzcdn.cn/public_files/2017/10/23/8690bb321356070e0b8c4404d087f8fd.png">
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
            <van-field
                v-model="code"
                type="number"
                max="4"
                label="验证码"
                placeholder="请输入验证码"
                left-icon="certificate"
                :error="error3"
                :error-message="errorMessage3"
                @input="codeMaxlength"
                @blur="validateCode"
            />
        </van-cell-group>
        <van-button
            size="large" 
            type="primary" 
            class="login-btn" 
            :loading="loading"
            @click="register"
        >注册</van-button>
    </div>
  </div>
</template>

<script>
import { userRegister } from "@/api/login";
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
      code: "",
      error1: false,
      error2: false,
      error3: false,
      errorMessage1: "",
      errorMessage2: "",
      errorMessage3: "",
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
    //验证码大4位
    codeMaxlength() {
      if (this.code.length > 4) {
        this.code = this.code.slice(0, 4);
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
      } else if (
        !/^(?:(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9]))[a-zA-Z0-9]{8,20}$/.test(
          this.password
        )
      ) {
        this.error2 = true;
        this.errorMessage2 = "请输入8-20位大、小写字母和数字组合！";
        return false;
      } else {
        this.error2 = false;
        this.errorMessage2 = "";
        return true;
      }
    },
    //验证码
    validateCode() {
      if (this.code === "") {
        this.error3 = true;
        this.errorMessage3 = "验证码不能为空！";
        return false;
      } else if (!/^\d{4}$/.test(this.code)) {
        this.error3 = true;
        this.errorMessage3 = "请输入4位数字验证码！";
        return false;
      } else {
        this.error3 = false;
        this.errorMessage3 = "";
        return true;
      }
    },
    //注册
    register() {
      if (
        this.validatePhone() &&
        this.validatePassword() &&
        this.validateCode()
      ) {
        this.loading = true;
        this.registerSubmit();
      }
    },
    //注册接口
    registerSubmit() {
      let mobile = this.mobile;
      let password = this.password;
      let dverification_code = this.code;
      let param = `mobile=${mobile}&password=${password}&dverification_code=${dverification_code}`;
      userRegister(param).then(
        res => {
          if (res.error_code === 1) {
            this.loading = false;
            window.history.go(-1);
          } else {
            Toast(res.message);
          }
        },
        err => {
          console.log(err);
        }
      );
    },
    //获取设备平台类型
    whichPlatform() {
      let u = navigator.userAgent;
      let isAndroid = u.indexOf("Android") > -1 || u.indexOf("Linux") > -1; //android终端
      let isIOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //ios终端
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
