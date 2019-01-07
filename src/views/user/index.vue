<template>
  <div class="weeho-page">
    <div class="weeho-content hasBottomNav">
      <img class="user-poster" src="http://p1.ssl.cdn.btime.com/t01f849668a057528bd.jpg?size=640x340">
      <van-row class="user-links">
        <van-col span="6">
          <van-icon name="pending-payment" />
          待付款
        </van-col>
        <van-col span="6">
          <van-icon name="pending-orders" />
          待接单
        </van-col>
        <van-col span="6">
          <van-icon name="pending-deliver" />
          待发货
        </van-col>
        <van-col span="6">
          <van-icon name="logistics" />
          待发货
        </van-col>
      </van-row>

      <van-cell-group class="user-group">
        <van-cell 
          icon="records" 
          title="全部订单" 
          is-link
          @click="goOrderList"
        />
      </van-cell-group>

      <van-cell-group>
        <van-cell icon="exchange" title="我的积分" is-link />
        <van-cell icon="gold-coin" title="我的优惠券" is-link />
        <van-cell icon="gift" title="我收到的礼物" is-link />
      </van-cell-group>
    </div>
    <div class="weeho-foot">
      <bottom-nav :index="3"></bottom-nav>
    </div>
  </div>
</template>

<script>
import { Row, Col, Icon, Cell, CellGroup } from "vant";
import BottomNav from "@/components/BottomNav.vue";

export default {
  components: {
    [Row.name]: Row,
    [Col.name]: Col,
    [Icon.name]: Icon,
    [Cell.name]: Cell,
    [CellGroup.name]: CellGroup,
    BottomNav
  },

  methods: {
    goOrderList() {
      this.$router.push({
        name: "orderList"
      })
    }
  }
};
</script>

<style lang="less">
.user {
  &-poster {
    width: 7.5rem;
    height: 4rem;
    display: block;
  }

  &-group {
    margin-bottom: 0.3rem;
  }

  &-links {
    padding: 15px 0;
    font-size: 12px;
    text-align: center;
    background-color: #fff;

    .van-icon {
      display: block;
      font-size: 24px;
    }
  }
}
</style>
