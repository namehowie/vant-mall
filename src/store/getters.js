const getters = {
  status: state => state.user.status, //登陆状态，true为登陆，false为未登录
  token: state => state.user.token, //用户token
  userId: state => state.user.userId, //用户唯一标识
  userName: state => state.user.userName, //用户昵称
  userSex: state => state.user.userSex, //性别 1:女 2:男 3: 未知
  userProfession: state => state.user.userProfession, //职业
  userPic: state => state.user.userPic, //头像url
  userMobile: state => state.user.userMobile //手机号
};
export default getters;
