import request from "@/utils/request";

//用户登陆
export function userLogin(query) {
  return request({
    url: "/login/userLogin",
    method: "get",
    params: query
  });
}

//用户注册
export function userRegister(mobile, password, verification_code) {
  const data = {
    mobile,
    password,
    verification_code
  };
  return request({
    url: "/login/userRegister",
    method: "post",
    params: data
  });
}
