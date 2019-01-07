import request from "@/utils/request";
const qs = require("qs");

//商品列表
export function goodsList(query) {
  return request({
    url: "/goods/goodsList",
    method: "get",
    params: query
  });
}

//创建订单
export function createOrder(data) {
  data = qs.stringify(data, { allowDots: true });
  return request({
    url: "/goods/createOrder",
    method: "post",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8"
    },
    data: data
  });
}

//支付
export function payOrder(data) {
  data = qs.stringify(data, { allowDots: true });
  return request({
    url: "/goods/payOrderForH5",
    method: "post",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8"
    },
    data: data
  });
}

export function payOrderForQrCode(data) {
  data = qs.stringify(data, { allowDots: true });
  return request({
    url: "/goods/payOrderForQrCode",
    method: "post",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8"
    },
    data: data
  });
}

//订单列表
export function orderList(query) {
  return request({
    url: "/goods/orderList",
    method: "get",
    params: query
  });
}

//订单详情
export function queryOrder(query) {
  return request({
    url: "/goods/queryOrder",
    method: "get",
    params: query
  });
}

//商品分类
export function categoryList(query) {
  return request({
    url: "/itemCategoryList",
    method: "get",
    params: query
  });
}