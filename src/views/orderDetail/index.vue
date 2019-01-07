<template>
<div>
  <div class="weeho-head">
    <van-nav-bar title="订单详情" left-text="返回" left-arrow fixed @click-left="$router.go(-1)"></van-nav-bar>
  </div>
  <div class="weeho-content hasHead">
        <div class="orderdetail-itemwrap">
            <p class="clearfix">
                <span class="fl"><van-icon name="shop"/> weeho商城自营</span>
                <span class="fr">{{orderStatus(lists.order_status)}}</span>
            </p>
            <van-card
                v-for="(item, index) in list"
                :key="index"
                :title="item.goods_name"
                :price="item.goods_price"
                :num="item.goods_num"
                :thumb="item.goods_img | readFile"
                :centered="centered"
                @click.native="toOrder(lists)"
            />
            <p style="text-align:right;">共{{totalNum(list)}}件商品&nbsp;&nbsp;&nbsp;&nbsp;合计：¥{{lists.order_amount}}</p>
        </div>  
        <ul class="orderdetail-create orderdetail-itemwrap">
            <li>订单编号：{{lists.out_trade_no}}</li>
            <li>下单时间：{{lists.order_create_time}}</li>
        </ul>
        <ul v-if="lists.pay_trade_no" class="orderdetail-create orderdetail-itemwrap">
            <li>支付编号：{{lists.pay_trade_no}}</li>
            <li>支付方式：{{payType(lists.pay_type)}}</li>
            <li>支付时间：{{lists.pay_time}}</li>
        </ul>
        <van-submit-bar
            :label="label"
            :price="price"
            :button-text="submitBarText"
            @submit="onSubmit"
        />
  </div>
</div>
  
</template>

<script>
import { queryOrder } from "@/api/goods";
import { NavBar, Toast, Card, Icon, SubmitBar } from "vant";
import {readFile} from "@/utils/sys"

export default {
  components: {
    [NavBar.name]: NavBar,
    [Card.name]: Card,
    [Icon.name]: Icon,
    [Toast.name]: Toast,
    [SubmitBar.name]: SubmitBar,
  },

  data() {
    return {
      lists: {},
      list:[],
      centered: true,
      submitBarText: "去结算",
      label: "实付金额：",
      price: 0
    };
  },

  created() {
    this.getOrderList();
  },
  
  watch: {
    
  },

  methods: {
    //计算订单商品总数
    totalNum(list) {
      let num = 0;
      list.forEach(item => num += item.goods_num);
      return num;
    },
    //支付方式
    payType(type){
        switch(type)
        {
        case 1:
          return "微信"
        case 2:
          return "支付宝"
        default:
          return "银联"
        }
    },
    //订单状态
    orderStatus(status) {
      switch(status)
      {
      case 1:
        return "待付款"
      case 2:
        return "待发货"
      case 3:
        return "待收货"
      case 4:
        return "未评价"
      case 5:
        return "已评价"
      case 6:
        return "已取消"
      case 7:
        return "待退款"
      case 8:
        return "已退款"
      default:
        return "状态异常"
      }
    },
    //获取列表数据
    getOrderList() {
        let user_id = this.$store.getters.userId;
        let user_token = this.$store.getters.token;
        let order_id = this.$route.query.order_id;
        queryOrder({
            user_id,
            user_token,
            order_id
        }).then(
            res => {
                this.lists = res.data;
                this.list = res.data.goods_list;
                this.price = res.data.order_amount*100;
            },
            err => {
                console.log(err);
            }
        );
    },
    onSubmit() {
        let order_id = this.lists.order_id;
        let order_amount = this.lists.order_amount;
        this.$router.push({
            name: "payOrder",
            query: {
                order_id,
                order_amount
            }
        });
    }
  }
};
</script>

<style lang="less" scoped>
  .orderdetail {
    &-itemwrap {
      width: 7.5rem;
      background: #fff;
      font-size: 14px;
      margin-top: 10px;
      p{
        margin: 0;
        padding: 10px;
        color: #999;
      }
      i{
        vertical-align: middle;
      }
    }
    &-create {
        padding: 10px;
        li {
            text-align: left;
            line-height: 2;
        }
    }
  }
  
  .van-card:not(:first-child){
    margin: 0;
  }
</style>
