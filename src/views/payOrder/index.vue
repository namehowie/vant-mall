<template>
  <div class="weeho-page">
    <div class="weeho-head">
      <van-nav-bar title="收银台" left-text="返回" left-arrow fixed @click-left="$router.go(-1)"></van-nav-bar>
    </div>
    <div class="weeho-content hasHead">
      <van-picker :columns="columns" :item-height="38" :visible-item-count="7" @change="onChange" class="pay-picker"/> 
      <van-submit-bar
        :loading="loading"
        :price="order_amount"
        :button-text="submitBarText"
        @submit="onSubmit"
      />
    </div>
    <div v-html="html"></div>
  </div>
</template>

<script>
import { NavBar, SubmitBar, Picker, Toast } from "vant";
import { payOrder } from "@/api/goods";
import { payOrderForQrCode } from "@/api/goods"

export default {
  components: {
    [NavBar.name]: NavBar,
    [SubmitBar.name]: SubmitBar,
    [Toast.name]: Toast,
    [Picker.name]: Picker,
  },

  data() {
    return {
      columns: ['支付宝', '微信','支付宝扫码','微信扫码'],
      order_id: this.$route.query.order_id,
      order_amount: this.$route.query.order_amount*100,
      submitBarText: "支付",
      loading: false,
      pay_type: 1,
      html: ""
    };
  },

  computed: {

  },

  created() {
    
  },

  updated: function () {
    this.$nextTick(function () {
      if(document.forms[0])
      document.forms[0].submit();
    })
  },

  methods: {
    onChange(picker, value, index) {
      this.pay_type = index + 1;
    },
    onSubmit() {   
        this.loading = true;
        let user_id = this.$store.getters.userId;
        let user_token = this.$store.getters.token;  
        let pay_type = this.pay_type;
        let order_id = this.order_id;
        let redirect_url = `${window.location.origin}/#/index/paySuccess`;
        if(pay_type===1 || pay_type===2){
          let data = {
            user_id,
            user_token,
            pay_type,
            order_id,
            redirect_url
          };
          payOrder(data).then(
            res => {
              this.loading = false;
              if(pay_type === 1){ //支付宝
                this.html = res.data.form;
              }else { //微信
                window.location.href = res.data.mweb_url;
              }              
            },
            err => {
              this.loading = false;
              console.log(err);
            }
          );
        }else {
          pay_type = pay_type-2;
          let data = {
            user_id,
            user_token,
            pay_type,
            order_id,
            redirect_url
          };
          payOrderForQrCode(data).then(
            res => {
              this.loading = false;
              let qRCodeAddress = res.data.qRCodeAddress;
              this.$router.push({
                name: "qRCodeAddress",
                query: {
                  qRCodeAddress
                }
              })            
            },
            err => {
              this.loading = false;
              console.log(err);
            }
          );
        }
    }
  }
};
</script>

<style lang="less">
.pay-picker {
    margin-top: 1.8rem;
}
</style>
