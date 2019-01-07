<template>
	<div class="weeho-page">
		<!-- <div class="weeho-head">
			<van-nav-bar title="主页" fixed></van-nav-bar>
		</div> -->
		<div class="weeho-content hasBottomNav">
			<van-swipe :autoplay="3000">
				<van-swipe-item v-for="(item, index) in bannerList" :key="index">
          <img  class="banner" :src="item.img" :alt="item.title">
				</van-swipe-item>
			</van-swipe>
      <van-row type="flex" justify="space-between" class="vrow">
        <van-col span="6" class="vcol">
          <div @click="goSearch"><i class="icon-mobilefill"></i></div>
        </van-col>
        <van-col span="6" class="vcol">
          <div @click="goSearch"><i class="icon-clothesfill"></i></div>
        </van-col>
        <van-col span="6" class="vcol">
          <div @click="goSearch"><i class="icon-goodsfill"></i></div>
        </van-col>
        <van-col span="6" class="vcol">
          <div @click="goSearch"><i class="icon-qiang"></i></div>
        </van-col>
      </van-row>
			<!-- <div @click="goGoodsList">商品列表</div> -->
		</div>
    <div class="weeho-foot">
      <bottom-nav :index="0"></bottom-nav>
    </div>
	</div>
</template>

<script>
import { NavBar, Swipe, SwipeItem, Row, Col } from "vant";
import BottomNav from "@/components/BottomNav.vue";
export default {
  components: {
    [NavBar.name]: NavBar,
    [Swipe.name]: Swipe,
    [SwipeItem.name]: SwipeItem,
    [Row.name]: Row,
    [Col.name]: Col,
    BottomNav
  },
  data() {
    return {
      bannerList: [
        {
          title: "广告1",
          img:"//m.360buyimg.com/mobilecms/s1125x690_jfs/t1/2100/2/2347/412518/5b964188E3900f602/48439219c678bf0e.jpg!cr_1125x549_0_72!q70.jpg.dpg"
        },
        {
          title: "广告2",
          img:"//i8.mifile.cn/v1/a1/980d76be-2b81-ae6e-1ca9-811129d26aba!720x360.webp"
        }  
      ]
    };
  },
  created() {},
  computed: {},
  methods: {
    goGoodsList() {
      this.$router.push({
        path: "/index/goodsList"
      });
    },
    goSearch() {
      this.$router.push({
        path: "/search"
      });
    }
  }
};
</script>

<style lang="less">
.life-index-head {
  display: flex;
  align-items: center;
  justify-content: center;
  box-sizing: border-box;
  height: 44px;
  line-height: 1;
  padding: 5px 10px;
  background: #fff;
  border-bottom: 1px solid #f8f8f8;
  z-index: 502;
  .title {
    font-size: 16px;
  }
}
.banner {
  display: block;
  width: 100%;
  height: 180px;
  font-size: 20px;
  line-height: 180px;
  text-align: center;
  background-color: aqua;
}

.vrow {
  width: 7.5rem;
  height: 1.875rem;
  font-size: 12px;
}

.vcol {
  padding: 20px;
  div {
    width: 100%;
    height: 100%;
    background: fuchsia;
    color: #fff;
    line-height: 2;
    font-size: 28px;
    border-radius: 20px;
  }
}
</style>
