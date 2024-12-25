import { MessageBox } from "element-ui";
export function loginOut() {
  MessageBox("是否退出?", "退出", {
    confirmButtonText: "确定",
    cancelButtonText: "取消",
    type: "warning",
    center: true,
  })
    .then(() => {
      Message({
        type: "success",
        message: "已退出!",
      });
      this.setToken("");
      this.setUserInfo({});
      this.$router.push("/login");
    })
    .catch(() => {});
}
