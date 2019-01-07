<template>
<div>
  <div class="weeho-head">
    <van-nav-bar title="订单列表" left-text="返回" left-arrow fixed @click-left="$router.go(-1)"></van-nav-bar>
  </div>
  <div class="weeho-content hasHead">
    <!-- <van-pull-refresh
        v-model="isLoading"
        pulling-text="继续下拉"
        loosing-text="松开刷新"
        loading-text="加载中..."
        @refresh="onRefresh"
    > -->
        <van-list>
          <div v-for="(list, index) in lists" :key="index" class="orderlist-itemwrap">
            <p class="clearfix">
              <span class="fl">{{list.order_create_time}}</span>
              <span class="fr">{{orderStatus(list.order_status)}}</span>
            </p>
            <van-card
                v-for="(item, index) in list.goods_list"
                :key="index"
                :title="item.goods_name"
                :price="item.goods_price"
                :num="item.goods_num"
                :thumb="item.goods_img | readFile"
                :centered="centered"
                @click.native="toOrder(list)"
            />
            <p style="text-align:right;">共{{totalNum(list)}}件商品&nbsp;&nbsp;&nbsp;&nbsp;合计：¥{{list.order_amount}}</p>
          </div>  
        </van-list>
        <p class="orderlist-deadline">--- 我是有底线的 ---</p>
    <!-- </van-pull-refresh> -->
  </div>
</div>
  
</template>

<script>
import { orderList } from "@/api/goods";
import { NavBar, Toast, PullRefresh, List, Card, Icon } from "vant";
import {readFile} from "@/utils/sys"

export default {
  components: {
    [NavBar.name]: NavBar,
    [PullRefresh.name]: PullRefresh,
    [List.name]: List,
    [Card.name]: Card,
    [Icon.name]: Icon,
    [Toast.name]: Toast
  },

  data() {
    return {
      isLoading: false,
      lists: [],
      loading: false,
      finished: false,
      centered: true,
      immediateCheck: false,
      offset: 300,
      count: 1,
      page_size: 10 //默认一次请求10条数据
    };
  },

  created() {
    this.count = 1;
    this.getOrderList(this.count);
  },
  
  computed: {
    
  },

  methods: {
    //下拉刷新
    onRefresh() {
      this.finished = false;
      this.count = 1;
      this.getOrderList(this.count);
    },
    //上拉加载
    onLoad() {
      this.count++;
      console.log(this.count);
      this.getOrderList(this.count);
    },
    //跳转详情
    toOrder(list) {
      let order_id = list.order_id;
      this.$router.push({
        name: "orderDetail",
        query: {
          order_id
        }
      });
    },
    //计算订单商品总数
    totalNum(list) {
      let num = 0;
      list.goods_list.forEach(item => num += item.goods_num);
      return num;
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
    getOrderList(count) {
      let user_id = this.$store.getters.userId;
      let user_token = this.$store.getters.token;
      let page_id = count;
      let page_size = this.page_size;
      orderList({
        user_id: user_id,
        user_token: user_token,
        // page_id: page_id,
        // page_size: page_size
      }).then(
        res => {
          if (count === 1) {
            //初次加载或刷新
            this.lists = res.data.order_list;
            this.isLoading = false;
          } else {
            //上拉加载
            this.loading = false;
            if (res.data.order_list.length > 0) {
              this.lists = this.lists.concat(res.data.order_list);
              console.log(this.lists);
            } else {
              this.finished = true;
            }
          }
        },
        err => {
          this.isLoading = false;
          this.loading = false;
          console.log(err);
        }
      );
    }
  }
};
</script>

<style lang="less" scoped>
  .orderlist {
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
    &-deadline {
      text-align: center;
      font-size: 12px;
      color: #999;
    }
  }
  
  .van-card:not(:first-child){
    margin: 0;
  }
</style>
