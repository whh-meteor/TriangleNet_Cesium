/*
 * @Author: UMR
 * @Date: 2024-06-25 18:08:32
 * @LastEditors: Do not edit
 * @LastEditTime: 2024-06-25 18:32:22
 * @FilePath: \nuclear_power\src\api\system\log.js
 */
import request from '../index'

/* 
查询所有菜单
*/
export function getLogList(data) {
  return request({
    url: '/admin/acl/log/page',
    headers: {
      'Content-Type': 'multipart/form-data'
    },
    method: 'post',
    data
  })
}

/* 
导出
*/
export function exportLog(params) {
  return request({
    url: '/admin/acl/log/export',
    headers: {
      'Content-Type': 'multipart/form-data'
    },
    method: 'get',
    responseType: 'arraybuffer',
    params
  })
}
