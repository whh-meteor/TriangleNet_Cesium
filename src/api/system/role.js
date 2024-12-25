/*
 * @Author: UMR
 * @Date: 2024-06-24 15:59:39
 * @LastEditors: Do not edit
 * @LastEditTime: 2024-06-27 13:34:57
 * @FilePath: \nuclear_power\src\api\system\role.js
 */
/*
 * @Author: UMR
 * @Date: 2024-06-24 15:59:39
 * @LastEditors: Do not edit
 * @LastEditTime: 2024-06-24 18:39:41
 * @FilePath: \nuclear_power\src\api\system\role.js
 */
import request from '../index'

/* 
权限列表
*/
export function roleList(data) {
  return request({
    url: '/admin/acl/role/listRole',
    headers: {
      'Content-Type': 'multipart/form-data'
    },
    method: 'post',
    data
  })
}

/* 
获取角色
*/


/**
 * 
 * @param {*} data 
 * @returns 
 */
export function roleGet(data) {
  return request({
    url: '/admin/acl/role/get',
    headers: {
      'Content-Type': 'multipart/form-data'
    },
    method: 'post',
    data
  })
}

/* 
获取角色分页列表
*/
export function rolePage(data) {
  return request({
    url: '/admin/acl/role/page',
    headers: {
      'Content-Type': 'multipart/form-data'
    },
    method: 'post',
    data
  })
}

/* 
删除角色
*/
export function roleDel(data) {
  return request({
    url: '/admin/acl/role/remove',
    headers: {
      'Content-Type': 'multipart/form-data'
    },
    method: 'post',
    data
  })
}

/* 
新增角色
*/
export function roleAdd(params) {
  return request({
    url: '/admin/acl/role/save',
    headers: {
      'Content-Type': 'multipart/form-data'
    },
    method: 'post',
    params
  })
}

/* 
修改角色
*/
export function roleUpload(params) {
  return request({
    url: '/admin/acl/role/update',
    headers: {
      'Content-Type': 'multipart/form-data'
    },
    method: 'put',
    params
  })
}

/* 
给角色分配权限
*/
export function rolePermission(data) {
  return request({
    url: '/admin/acl/permission/doAssign',
    headers: {
      'Content-Type': 'multipart/form-data'
    },
    method: 'post',
    data
  })
}

/* 
获取权限
*/
export function roleToAssign(data) {
  return request({
    url: '/admin/acl/permission/toAssign',
    headers: {
      'Content-Type': 'multipart/form-data'
    },
    method: 'post',
    data
  })
}

/* 
权限编码字典
*/
export function roleCode() {
  return request({
    url: '/system/dict/data/dict/list?type=角色权限',
    method: 'get'
  })
}
