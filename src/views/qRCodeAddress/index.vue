<template>
  <div class="weeho-page">
    <div class="weeho-head">
      <van-nav-bar title="二维码支付" left-text="返回" left-arrow fixed @click-left="$router.go(-1)"></van-nav-bar>
    </div>
    <div class="weeho-content hasHead">
      <img :src="src" alt="" class="mt">
    </div>
  </div>
</template>

<script>
import { NavBar,Toast } from "vant";
import QRCode from 'qrcode';

export default {
  components: {
    [NavBar.name]: NavBar,
    [Toast.name]: Toast,
  },

  data() {
    return {
        src: ''
    };
  },

  computed: {

  },

  mounted() {
    this.qrcode();
  },

  methods: {
    qrcode () {
        let qRCodeAddress = this.$route.query.qRCodeAddress;
        QRCode.toDataURL(qRCodeAddress)
        .then(url => {
            console.log(url)
            this.src = url;
        })
        .catch(err => {
            console.error(err)
        })
    }
  }
};
</script>

<style lang="less">
    .mt{
        margin-top: 2.5rem;
    }
</style>
