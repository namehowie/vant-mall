import Vue from "vue";
import Router from "vue-router";
import store from "@/store";

Vue.use(Router);

const meta = { requiresAuth: true };
const routes = [
  {
    path: "*",
    redirect: "/index"
  },
  {
    path: "/index",
    name: "index",
    component: () => import("@/views/index"),
    meta: {
      title: "主页"
    }
  },
  {
    path: "/index/goodsList",
    name: "goodsList",
    component: () => import("@/views/goodsList"),
    meta: {
      title: "商品列表",
      ...meta
    }
  },
  {
    path: "/index/goods",
    name: "goods",
    component: () => import("@/views/goods"),
    meta: {
      title: "商品页",
      ...meta
    }
  },
  {
    path: "/index/createOrder",
    name: "createOrder",
    component: () => import("@/views/createOrder"),
    meta: {
      title: "确认订单",
      ...meta
    }
  },
  {
    path: "/index/payOrder",
    name: "payOrder",
    component: () => import("@/views/payOrder"),
    meta: {
      title: "收银台",
      ...meta
    }
  },
  {
    path: "/index/paySuccess",
    name: "paySuccess",
    component: () => import("@/views/paySuccess"),
    meta: {
      title: "支付成功",
      ...meta
    }
  },
  {
    path: "/index/qRCodeAddress",
    name: "qRCodeAddress",
    component: () => import("@/views/qRCodeAddress"),
    meta: {
      title: "二维码支付",
      ...meta
    }
  },
  {
    path: "/index/orderList",
    name: "orderList",
    component: () => import("@/views/orderList"),
    meta: {
      title: "订单列表",
      ...meta
    }
  },
  {
    path: "/index/orderDetail",
    name: "orderDetail",
    component: () => import("@/views/orderDetail"),
    meta: {
      title: "订单详情",
      ...meta
    }
  },
  {
    path: "/search",
    name: "search",
    component: () => import("@/views/search"),
    meta: {
      title: "分类",
      ...meta
    }
  },
  {
    path: "/cart",
    name: "cart",
    component: () => import("@/views/cart"),
    meta: {
      title: "购物车",
      ...meta
    }
  },
  {
    path: "/user",
    name: "user",
    component: () => import("@/views/user"),
    meta: {
      title: "我的"
    }
  },
  {
    path: "/login",
    name: "login",
    component: () => import("@/views/login"),
    meta: {
      title: "登陆"
    }
  },
  {
    path: "/register",
    name: "register",
    component: () => import("@/views/register"),
    meta: {
      title: "注册"
    }
  }
];

const router = new Router({
  base: process.env.BASE_URL,
  routes
});

router.beforeEach((to, from, next) => {
  const title = to.meta && to.meta.title;
  if (title) {
    document.title = title;
  }
  if (to.meta.requiresAuth && !store.getters.userId) {
    next({ path: "/login" });
  } else {
    next();
  }
});

export { router };
