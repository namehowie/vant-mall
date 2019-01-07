import { userLogin } from "@/api/login";
import { setCookie, getCookie, removeCookie } from "@/utils/cookie";

const userInfo = getCookie("User-Info") ? JSON.parse(getCookie("User-Info")) : "";

const user = {
  state: {
    status: userInfo && Object.keys(userInfo).length > 0 ? true : false,
    token: userInfo.user_token,
    userId: userInfo.user_id,
    userName: userInfo.user_name,
    userSex: userInfo.user_sex,
    userProfession: userInfo.user_profession,
    userPic: userInfo.user_pic,
    userMobile: userInfo.mobile
  },

  mutations: {
    SET_USER_INfO: (state, userInfo) => {
      if (userInfo && Object.keys(userInfo).length > 0) {
        state.token = userInfo.user_token;
        state.userId = userInfo.user_id;
        state.userName = userInfo.user_name;
        state.userSex = userInfo.user_sex;
        state.userProfession = userInfo.user_profession;
        state.userPic = userInfo.user_pic;
        state.userMobile = userInfo.mobile;
        state.status = true;
      } else {
        state.token = "";
        state.userId = "";
        state.userName = "";
        state.userSex = "";
        state.userProfession = "";
        state.userPic = "";
        state.userMobile = "";
        state.status = false;
      }
    }
  },

  actions: {
    // 用户名登录
    userLogin({ commit }, data) {
      //const username = userInfo.user_name.trim();
      return new Promise((resolve, reject) => {
        userLogin(data)
          .then(response => {
            const data = response.data;
            commit("SET_USER_INfO", data);
            setCookie("User-Info", data);
            resolve(response);
          })
          .catch(error => {
            reject(error);
          });
      });
    },
    // 前端 登出
    FedLogOut({ commit }) {
      return new Promise(resolve => {
        commit("SET_USER_INfO", {});
        removeCookie("User-Info");
        resolve();
      });
    }
  }
};

export default user;
