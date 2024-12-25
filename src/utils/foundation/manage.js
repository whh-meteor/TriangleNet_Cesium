import { MessageBox } from "element-ui";
import { Message } from "element-ui";
import { deleteCurrent, exportCommonExecl } from "@/api/manage";
import { deleteUrl, exportUrl } from "@/api/manage/config";
import router from "@/router";
import { saveAs } from "file-saver";
/**
 * 删除
 * @param {*} {url:请求接口地址，confirm:确认回调，del:取消回调，auto:是否自动删除,id:请求id}
 */
export function deleteItem({ confirm, del, auto = true, id }) {
  if (!router.currentRoute?.meta?.current) {
    throw new TypeError("router未配置current属性");
  }
  MessageBox.confirm("是否删除该项数据", "提示", {
    confirmButtonText: "确定",
    cancelButtonText: "取消",
    type: "warning",
  })
    .then(() => {
      auto
        ? deleteCurrent(deleteUrl[router.currentRoute.meta.current], id).then(
            () => Message.success("删除成功")
          )
        : "";
      confirm ? confirm() : "";
    })
    .catch(() => {
      del ? del() : "";
    });
}
/**
 * 导出excel
 * @param {*} param0 
 */
export function exportExecl({
  fun,
  auto = true,
  data,
  method,
  filename,
}) {
  if (!router.currentRoute?.meta?.current) {
    throw new TypeError("router未配置current属性");
  }
  if (auto) {
    exportCommonExecl({
      url: exportUrl[router.currentRoute.meta.current],
      data: method === "post" ? data : {},
      params: method === "get" ? data : {},
      method:method
    }).then((res) => {
      let blob = res;
      saveAs(
        new Blob([blob], {
          type: "application/vnd.ms-excel",
        }),
        filename //导出文件的文件名可自定义
      );
      // Message.success('导出成功')
    });
  } else {
    fun ? fun() : "";
  }
}
/**
 * 下载模板
 * @param {String} type 
 */
export function downloadTemplate(type){
  // TODO:添加模板链接
  return process.env.VUE_APP_BASE_URL+'/syh'
}
