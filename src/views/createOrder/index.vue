<template>
  <div class="weeho-page">
    <div class="weeho-head">
      <van-nav-bar title="确认订单" left-text="返回" left-arrow fixed @click-left="$router.go(-1)"></van-nav-bar>
    </div>
    <div class="weeho-content hasHead">
      <van-checkbox-group class="card-goods" v-model="checkedGoods">
        <van-checkbox
          class="card-goods__item"
          v-for="item in goods"
          :key="item.id"
          :name="item.id"
        >
          <van-card
            :title="item.title"
            :desc="item.desc"
            :num="item.num"
            :price="formatPrice(item.price)"
            :thumb="item.thumb | readFile"
          />
        </van-checkbox>
      </van-checkbox-group>
      <van-submit-bar
        :loading="loading"
        :price="totalPrice"
        :disabled="!checkedGoods.length"
        :button-text="submitBarText"
        @submit="onSubmit"
      />
    </div>
  </div>
</template>

<script>
import { NavBar, Checkbox, CheckboxGroup, Card, SubmitBar, Toast } from "vant";
import { createOrder } from "@/api/goods";

export default {
  components: {
    [NavBar.name]: NavBar,
    [Card.name]: Card,
    [Checkbox.name]: Checkbox,
    [SubmitBar.name]: SubmitBar,
    [CheckboxGroup.name]: CheckboxGroup,
    [Toast.name]: Toast
  },

  data() {
    return {
      checkedGoods: [],
      goods: [
        {
          id: 0,
          title: "",
          desc: "",
          price: 0,
          num: 1,
          thumb:
            "https://img.yzcdn.cn/public_files/2017/10/24/2f9a36046449dafb8608e99990b3c205.jpeg"
        }
      ],
      submitBarText: "提交订单",
      loading: false
    };
  },

  computed: {
    // submitBarText() {
    //   const count = this.checkedGoods.length;
    //   return "结算" + (count ? `(${count})` : "");
    // },

    totalPrice() {
      return this.goods.reduce(
        (total, item) =>
          total +
          (this.checkedGoods.indexOf(item.id) !== -1
            ? item.price * item.num * 100
            : 0),
        0
      );
    }
  },

  created() {
    let { title, price, num, id, img } = JSON.parse(this.$route.query.goods);
    this.goods[0].title = title;
    this.goods[0].price = price / 1;
    this.goods[0].num = num / 1;
    this.goods[0].id = id;
    this.goods[0].thumb = img;
    this.checkedGoods.push(id);
  },

  methods: {
    formatPrice(price) {
      return (price / 1).toFixed(2);
    },

    onSubmit() {
      this.loading = true;
      let user_id = this.$store.getters.userId;
      let user_token = this.$store.getters.token;
      let goods_list = [];
      goods_list.push({
        goods_id: this.goods[0].id / 1,
        goods_num: this.goods[0].num / 1
      });
      goods_list = JSON.stringify(goods_list);
      const data = {
        user_id,
        user_token,
        goods_list
      };
      createOrder(data).then(
        res => {
          this.loading = false;
          this.$router.push({
            name: "payOrder",
            query: {
              order_id: res.data.order_id,
              order_amount: res.data.order_amount
            }
          });
        },
        err => {
          this.loading = false;
          console.log(err);
        }
      );
    }
  }
};
</script>

<style lang="less">
.card-goods {
  padding: 10px 0;
  background-color: #fff;

  &__item {
    position: relative;
    background-color: #fafafa;

    .van-checkbox__label {
      width: 100%;
      padding: 0 10px 0 15px;
      box-sizing: border-box;
    }

    .van-checkbox__icon {
      top: 50%;
      left: 10px;
      z-index: 1;
      position: absolute;
      margin-top: -10px;
    }

    .van-card__price {
      color: #f44;
    }
  }
}
</style>
