/*
 * @Author: UMR
 * @Date: 2024-06-24 13:41:46
 * @LastEditors: Do not edit
 * @LastEditTime: 2024-06-27 09:23:40
 * @FilePath: \nuclear_power\src\api\system\user.js
 */
import request from '../index'

/* 
用户列表
*/
export function userList(data) {
  return request({
    url: '/admin/acl/user/page',
    headers: {
      'Content-Type': 'multipart/form-data'
    },
    method: 'post',
    data
  })
}

/* 
新增用户
*/
export function addUser(data) {
  return request({
    url: '/admin/acl/user/save',
    headers: {
      'Content-Type': 'multipart/form-data'
    },
    method: 'post',
    data
  })
}

/* 
修改管理用户
*/
export function updateUser(params) {
  return request({
    url: '/admin/acl/user/update',
    method: 'post',
    params
  })
}

/* 
根据用户分配角色
*/
export function roleUser(params) {
  return request({
    url: '/admin/acl/user/doAssign',
    headers: {
      'Content-Type': 'multipart/form-data'
    },
    method: 'post',
    params
  })
}

/* 
删除管理用户
*/
export function delUser(data) {
  return request({
    url: '/admin/acl/user/remove',
    headers: {
      'Content-Type': 'multipart/form-data'
    },
    method: 'post',
    data
  })
}

/* 
删除管理用户
*/
export function newUser() {
  return request({
    url: '/admin/acl/user/user/information',
    method: 'get'
  })
}
