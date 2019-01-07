<template>
	<van-tabbar v-model="active">
		<van-tabbar-item v-for="item in bottomBar" :key="item.id" :to={path:item.link} replace>
			{{item.name}}
			<i slot="icon" slot-scope="props" :class="item.iconCls"></i>
		</van-tabbar-item>	
	</van-tabbar>
</template>
<script>
import { Tabbar, TabbarItem } from "vant";

export default {
  components: {
    [Tabbar.name]: Tabbar,
    [TabbarItem.name]: TabbarItem
  },
  props: ["index"],
  data() {
    return {
      bottomBar: [
        {
          id: 0,
          name: "首页",
          iconCls: "icon-home",
          link: "/index"
        },
        {
          id: 1,
          name: "分类",
          iconCls: "icon-searchlist",
          link: "/search"
        },
        {
          id: 2,
          name: "购物车",
          iconCls: "icon-cart",
          link: "/cart"
        },
        {
          id: 3,
          name: "我的",
          iconCls: "icon-my",
          link: "/user"
        }
      ],
      active: this.index
    };
  },
  methods: {}
};
</script>
