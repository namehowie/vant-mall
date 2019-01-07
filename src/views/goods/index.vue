<template>
  <div class="weeho-page goods">
    <div class="weeho-head">
      <van-nav-bar title="商品详情" left-text="返回" left-arrow fixed @click-left="$router.go(-1)"></van-nav-bar>
    </div>
    <div class="weeho-content hasHead">
      <van-swipe class="goods-swipe" :autoplay="3000">
        <van-swipe-item v-for="(thumb,index) in goods.thumb" :key="index">
          <img :src="thumb.imgName | readFile" >
        </van-swipe-item>
      </van-swipe>

      <van-cell-group>
        <van-cell>
          <div class="goods-title">{{ goods.title }}</div>
          <div class="goods-price">{{ formatPrice(goods.price) }}</div>
          <div class="goods-num">
            <van-stepper v-model="goods.num" />
          </div>
        </van-cell>
        <van-cell class="goods-express">
          <van-col span="10">运费：{{ goods.express }}</van-col>
          <!-- <van-col span="14">剩余：{{ goods.remain }}</van-col> -->
        </van-cell>
      </van-cell-group>

      <van-cell-group class="goods-cell-group">
        <van-cell value="进入店铺" icon="shop" is-link @click="sorry">
          <template slot="title">
            <span class="van-cell-text">weeho商城 </span>
            <van-tag type="danger">官方</van-tag>
          </template>
        </van-cell>
        <van-cell title="线下门店" icon="location" is-link @click="sorry" />
      </van-cell-group>

      <!-- <van-cell-group class="goods-cell-group">
        <van-cell title="查看商品详情" is-link @click="sorry" />
      </van-cell-group> -->
      
      <div v-html="html" class="goods-detail"></div>

      <van-goods-action>
        <van-goods-action-mini-btn icon="chat" @click="sorry">
          客服
        </van-goods-action-mini-btn>
        <van-goods-action-mini-btn icon="cart" @click="onClickCart">
          购物车
        </van-goods-action-mini-btn>
        <van-goods-action-big-btn @click="sorry">
          加入购物车
        </van-goods-action-big-btn>
        <van-goods-action-big-btn primary @click="buyNow">
          立即购买
        </van-goods-action-big-btn>
      </van-goods-action>
    </div>
  </div>
</template>

<script>
import {
  NavBar,
  Tag,
  Col,
  Icon,
  Cell,
  CellGroup,
  Swipe,
  Toast,
  SwipeItem,
  GoodsAction,
  GoodsActionBigBtn,
  GoodsActionMiniBtn,
  Stepper
} from "vant";

export default {
  components: {
    [NavBar.name]: NavBar,
    [Tag.name]: Tag,
    [Col.name]: Col,
    [Icon.name]: Icon,
    [Cell.name]: Cell,
    [CellGroup.name]: CellGroup,
    [Swipe.name]: Swipe,
    [SwipeItem.name]: SwipeItem,
    [GoodsAction.name]: GoodsAction,
    [GoodsActionBigBtn.name]: GoodsActionBigBtn,
    [GoodsActionMiniBtn.name]: GoodsActionMiniBtn,
    [Stepper.name]: Stepper,
  },

  data() {
    return {
      goods: {
        id: 0,
        title: "",
        price: 0,
        num: 1,
        img: "",
        express: "免运费",
        // remain: 19,
        thumb: []
      },
      html: ""
    };
  },

  created() {
    let thumb =  [
          "https://img.yzcdn.cn/public_files/2017/10/24/e5a5a02309a41f9f5def56684808d9ae.jpeg",
          "https://img.yzcdn.cn/public_files/2017/10/24/1791ba14088f9c2be8c610d0a6cc0f93.jpeg"
        ];
    console.log(JSON.parse(this.$route.query.item1));
    let { goods_name, goods_price, goods_id, goods_img, banners, goods_description } = JSON.parse(this.$route.query.item1);
    this.goods.title = goods_name;
    this.goods.price = goods_price;
    this.goods.id = goods_id;
    this.goods.img = goods_img;
    this.goods.thumb = banners || thumb;
    this.html = goods_description;
  },

  methods: {
    formatPrice() {
      return "¥" + (this.goods.price / 1).toFixed(2);
    },

    onClickCart() {
      this.$router.push("cart");
    },

    buyNow() {
      let goods = JSON.stringify(this.goods);
      this.$router.push({
        name: "createOrder",
        query: {
          goods
        }
      })
    },

    sorry() {
      Toast("暂无后续逻辑~");
    }
  }
};
</script>

<style lang="less">
.goods {
  padding-bottom: 50px;

  &-swipe {
    img {
      width: 7.5rem;
      height: 7.5rem;
      display: block;
    }
  }

  &-title {
    font-size: 16px;
  }

  &-price {
    color: #f44;
  }

  &-num {
    float: right;
  }

  &-express {
    color: #999;
    font-size: 12px;
    padding: 5px 15px;
  }

  &-cell-group {
    margin: 15px 0;

    .van-cell__value {
      color: #999;
    }
  }
  
  &-detail{
    width: 100%;
    img{
      width: 100%;
      display: block;
    }
  }
}
</style>
