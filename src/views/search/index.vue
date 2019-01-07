<template>
	<div class="weeho-page">
    <div class="weeho-head">
      <van-nav-bar title="商品分类" fixed></van-nav-bar>
    </div>
		<div class="weeho-content hasBottomNav category">
			<div class="calssify-con">
        <div class="calssify-left" ref="wrapper">
            <ul class="calssify-left-ul" >
                <li v-for="(item,index) in left" :key="index" @click="selectionSort(index,item.id,$event)" :class="{active:index===classifyIndex}">
                    {{item.name}}
                </li>
            </ul>
        </div>
        <div class="calssify-rigth" ref="wrapper2">
            <ul class="calssify-left-ul">
                <li v-for="(item,index) in right" :key="index" @click="goGoodsList(item.id)">
                    <img :src="item.imageUrl | readFile" alt="">
                    <span>{{item.name}}</span>
                </li>
            </ul>
        </div>
      </div>
		</div>
    <div class="weeho-foot">
      <bottom-nav :index="1"></bottom-nav>
    </div>
	</div>
</template>

<script>
import BottomNav from "@/components/BottomNav.vue";
import { NavBar } from 'vant';
import { categoryList } from "@/api/goods";
export default {
  components: {
    [NavBar.name]: NavBar,
    BottomNav
  },
  data() {
    return {
      left:[
        {
          "id":"0",
          "name":"全部分类"
        },
        {
          "id":"1",
          "name": "Xplay系列"
        },
        {
          "id":"2",
          "name": "X系列"
        },
        {
          "id":"3",
          "name": "Y系列"
        },
        {
          "id":"4",
          "name": "充电器"
        },
        {
          "id":"5",
          "name": "保护膜"
        },
        {
          "id":"6",
          "name": "耳机音响"
        },
        {
          "id":"7",
          "name": "智能外设"
        },
        {
          "id":"5",
          "name": "保护膜"
        },
        {
          "id":"6",
          "name": "耳机音响"
        },
        {
          "id":"7",
          "name": "智能外设"
        },
        {
          "id":"5",
          "name": "保护膜"
        },
        {
          "id":"6",
          "name": "耳机音响"
        },
        {
          "id":"7",
          "name": "智能外设"
        }
      ],
      right:{
          "rigth_data":[
            {
              "id": 1,
              "img":"https://shopstatic.vivo.com.cn/vivoshop/commodity/71/4171_1496689409434hd_530x530.png",
              "name": "X9Plus"
            },
            {
              "id": 2,
              "img":"https://shopstatic.vivo.com.cn/vivoshop/commodity/40/4440_1508723830538hd_530x530.png",
              "name": "X20Plus"
            },
            {
              "id": 3,
              "img":"https://shopstatic.vivo.com.cn/vivoshop/commodity/95/4495_1509454710945hd_530x530.png",
              "name": "Y69"
            },
            {
              "id": 4,
              "img": "https://shopstatic.vivo.com.cn/vivoshop/commodity/66/4266_1496689781362hd_530x530.png",
              "name": "Xplay6"
            },
            {
              "id": 5,
              "img": "https://shopstatic.vivo.com.cn/vivoshop/commodity/11/4111_1492998667334hd_530x530.png",
              "name": "Y55"
            },
            {
              "id": 6,
              "img": "https://shopstatic.vivo.com.cn/vivoshop/commodity/80/4180_1496689544465hd_530x530.png",
              "name": "Y66"
            },
            {
              "id":7,
              "img": "https://shopstatic.vivo.com.cn/vivoshop/commodity/27/5027_1526972514378hd_250x250.png",
              "name":"乐心手环"
            },
            {
              "id":8,
              "img":"https://shopstatic.vivo.com.cn/vivoshop/commodity/20/4020_1481558694236_530x530.png",
              "name":"闪充充电器"
            },
            {
              "id":9,
              "img":"https://shopstatic.vivo.com.cn/vivoshop/commodity/82/1882_1481558960471_530x530.png",
              "name":"原装音乐耳机"
            },
            {
              "id":10,
              "img":"https://shopstatic.vivo.com.cn/vivoshop/commodity/73/4273_1491007460873hd_250x250.png",
              "name":"原装数据线"
            },
            {
              "id":11,
              "img":"https://shopstatic.vivo.com.cn/vivoshop/commodity/83/4183_1482921083765_530x530.png",
              "name":"原装钢化膜"
            },
            {
              "id":12,
              "img":"https://shopstatic.vivo.com.cn/vivoshop/commodity/81/4181_1482720908043_250x250.png",
              "name":"3D高清保护膜"
            }
          ]
        },
      classifyIndex: 0,
      parentId:''
    };
  },
  created() {
    this.getCategoryList();
  },
  computed: {},
  methods: {
    getCategoryList(){
      let user_id = this.$store.getters.userId;
      let user_token = this.$store.getters.token;
      categoryList({
        user_id,
        user_token
      }).then(
        res => {
          // console.log(res);
          this.left = res.data.itemCategorylist;
          this.parentId = res.data.itemCategorylist[0].id,
          this.getItemCategoryList(this.parentId);
        },
        err => {
        }
      );
    },
    getItemCategoryList(id){
      let user_id = this.$store.getters.userId;
      let user_token = this.$store.getters.token;
      let parentId = id;
      categoryList({
        user_id,
        user_token,
        parentId
      }).then(
        res => {
          console.log(res);
          this.right = res.data.itemCategorylist;
        },
        err => {
        }
      );
    },
    selectionSort:function(index,id,event) {
      this.classifyIndex = index;
      this.parentId = id;
      this.getItemCategoryList(this.parentId)
      console.log(event);
    },
    goGoodsList(id) {
      this.$router.push({
        path: "/index/goodsList",
        query: {
          goodsCategory:id
        }
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
  height: 180px;
  font-size: 20px;
  line-height: 180px;
  text-align: center;
  background-color: aqua;
}
.category{
  margin-top:46px;
  .calssify-con {
    display: flex;
    overflow: hidden;
    position: absolute;
    width: 100%;
    top: 46px;
    bottom: 0;
    .calssify-left {
      flex: 0 0 2rem;
      width: 3rem;
      height: 100%;
      background: #f6f6f6;
      margin-bottom: 1.51rem;
      font-size: 0.35rem;
      overflow-y:scroll;
      li {
        height: 1.3rem;
        line-height: 1.3rem;
        text-align: center;
        &.active {
          border-left: 2px solid;
          background: #ffffff;
          color: #199cfe;
        }
      }
    }
    .calssify-rigth {
      flex: 1;
      height: 100%;
      background: white;
      margin-bottom: 1.51rem;
      overflow-y:scroll;
      ul {
        display: flex;
        flex-wrap: wrap;
        li {
          display: flex;
          flex-direction: column;
          text-align: center;
          width: 33%;
          margin-top: 0.3rem;
          font-size: 0.34rem;
          float: left;
          img {
            width: 1.4rem;
            display: block;
            margin: auto;
          }
          span {
            color: #999;
            line-height: 0.9rem;
            font-size: 0.3rem;
            white-space:nowrap;
            overflow:hidden;
            text-overflow:ellipsis;
          }
        }
      }
    }
  }
}
</style>
