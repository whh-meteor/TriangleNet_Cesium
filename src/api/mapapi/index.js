import { post, get, put, exportData } from "../request";
const { transformToFormData } = require("@/utils/foundation/common");

/**
 * 获取列表数据
 * @param {String} url 调取的接口url
 * @param {Object} data 列表查询数据
 * @returns
 */
export function getList(url, data) {

  return post({
    url,
    data: transformToFormData(data),
    headers: { isToken: true },
  });
}

