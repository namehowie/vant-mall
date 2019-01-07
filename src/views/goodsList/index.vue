<template>
<div>
  <div class="weeho-head">
    <van-nav-bar title="商品列表" left-text="返回" left-arrow fixed @click-left="$router.go(-1)"></van-nav-bar>
  </div>
  <div class="weeho-content hasHead">
    <van-pull-refresh
        v-model="isLoading"
        pulling-text="继续下拉"
        loosing-text="松开刷新"
        loading-text="加载中..."
        @refresh="onRefresh"
    >
        <van-list
            v-model="loading"
            :finished="finished"
            :offset="offset"
            :immediate-check="immediateCheck"
            @load="onLoad"
        >
            <van-card
                v-for="(item, index) in list"
                :key="index"
                :title="item.goods_name"
                :desc="item.goods_details"
                :price="item.goods_price"
                :thumb="item.goods_img | readFile"
                :centered="centered"
                @click.native="toGoods(item)"
            />
        </van-list>
        <p class="list-deadline" v-show="finished">--- 我是有底线的 ---</p>
    </van-pull-refresh>
  </div>
</div>
  
</template>

<script>
import { goodsList } from "@/api/goods";
import { NavBar, Toast, PullRefresh, List, Card } from "vant";

export default {
  components: {
    [NavBar.name]: NavBar,
    [PullRefresh.name]: PullRefresh,
    [List.name]: List,
    [Card.name]: Card,
    [Toast.name]: Toast
  },

  data() {
    return {
      isLoading: false,
      list: [],
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
    this.getGoodsList(this.count);
  },

  methods: {
    //下拉刷新
    onRefresh() {
      this.finished = false;
      this.count = 1;
      this.getGoodsList(this.count);
    },
    //上拉加载
    onLoad() {
      this.count++;
      console.log(this.count);
      this.getGoodsList(this.count);
    },
    //跳转详情
    toGoods(item) {
      let item1 = JSON.stringify(item);
      this.$router.push({
        name: "goods",
        query: {
          item1
          // goods_id: item.goods_id,
          // goods_price: item.goods_price,
          // goods_name: item.goods_name,
          // goods_img: item.goods_img
        }
      });
    },
    //获取列表数据
    getGoodsList(count) {
      let user_id = this.$store.getters.userId;
      let user_token = this.$store.getters.token;
      let page_id = count;
      let page_size = this.page_size;
      let goodsCategory = this.$route.query.goodsCategory;
      goodsList({
        user_id,
        user_token,
        page_id,
        page_size,
        goodsCategory
      }).then(
        res => {
          if (count === 1) {
            //初次加载或刷新
            this.list = res.data.goods_list;
            this.isLoading = false;
          } else {
            //上拉加载
            this.loading = false;
            if (res.data.goods_list.length > 0) {
              this.list = this.list.concat(res.data.goods_list);
              console.log(this.list);
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

<style lang="less">
  .list {
    &-box {
      width: 7.5rem;
      background: #fff;
    }
    &-deadline {
      text-align: center;
      font-size: 12px;
      color: #999;
    }
  }
</style>
