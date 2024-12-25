import { post, get } from "../request";
import md5 from 'js-md5';
const {transformToFormData} =require('@/utils/foundation/common')
import store from "@/store"

/**
 * 登录接口
 * @param {Object} data 数据
 * @returns 
 */
export function login(data) {
  let param={
    username:data.name,
    // password:data.password
    password:md5(data.password)
  }
  return post({ url:'/admin/acl/login', data:transformToFormData(param) });
}
/**
 * 退出登录
 * @returns 
 */
export function loginOutPost(){
  return post({ url:'/admin/acl/index/logout' });
}

export function getMenuByRoleId(userInfo){
  return post ({url:'/admin/acl/permission/toAssign',params:{roleId:userInfo.id}})
}

// /admin/acl/index/info
export function getUserInfoByToken(){
  return get({url:'/admin/acl/index/info'})
}