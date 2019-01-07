<template>
  <div class="weeho-page">
    <div class="weeho-head">
      <van-nav-bar title="支付成功" left-text="返回" left-arrow fixed @click-left="$router.go(-1)"></van-nav-bar>
    </div>
    <div class="weeho-content hasHead">
      支付成功
    </div>
  </div>
</template>

<script>
import { NavBar,Toast } from "vant";

export default {
  components: {
    [NavBar.name]: NavBar,
    [Toast.name]: Toast,
  },

  data() {
    return {

    };
  },

  computed: {

  },

  created() {

  },

  methods: {

  }
};
</script>

<style lang="less">

</style>
