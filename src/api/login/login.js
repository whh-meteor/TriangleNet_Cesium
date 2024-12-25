import store from "@/store";
import { MessageBox, Message } from "element-ui";
import { loginOutPost } from ".";
import router from "@/router";
import { getMenuByRoleId, getUserInfoByToken } from "@/api/login";
/**
 * 登录操作
 * @param {Object} data 接口获取的信息
 * @returns
 */
export function loginIn(data) {
  const { token = "", user = {} } = data;
  store.commit("userInfo/setToken", token);
  store.commit("userInfo/setUserInfo", user);
  getUserInfoByToken().then((res) => {
    console.log("res===", );
    if(!res.data.roleList?.[0]?.id) return;
    getMenuByRoleId({id:res.data.roleList?.[0]?.id}).then((res) => {
      console.log("kkkkk", res);
      store.commit("userInfo/setMenu", res.result);
    });
  });
}
/**
 * 登出
 */
export function loginOut() {
  MessageBox.confirm("是否退出?", "退出", {
    confirmButtonText: "确定",
    cancelButtonText: "取消",
    type: "warning",
  })
    .then(() => {
      loginOutMethods();
    })
    .catch(() => {});
}
/**
 * 登出接口
 */
function loginOutMethods() {
  loginOutPost().then((res) => {
    Message({
      type: "success",
      message: "已退出!",
    });
    store.commit("userInfo/setToken", "");
    store.commit("userInfo/setUserInfo", {});
    store.commit("userInfo/setMenu", []);
    router.push("/login");
  });
}
