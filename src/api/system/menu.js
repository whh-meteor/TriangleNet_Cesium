import request from '../index'

/* 
查询所有菜单
*/
export function getPermissionList(data) {
  return request({
    url: '/admin/acl/permission/list',
    headers: {
      'Content-Type': 'multipart/form-data'
    },
    method: 'post',
    data
  })
}

/* 
根据角色获取菜单
*/
export function getMenuByRole(data) {
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
新增菜单
*/
export function addMenu(data) {
  return request({
    url: '/admin/acl/permission/save',
    headers: {
      'Content-Type': 'multipart/form-data'
    },
    method: 'post',
    data
  })
}

/* 
修改菜单
*/
export function updateMenu(data) {
  return request({
    url: '/admin/acl/permission/update',
    headers: {
      'Content-Type': 'multipart/form-data'
    },
    method: 'post',
    data
  })
}

/* 
递归删除菜单
*/
export function removeMenu(params) {
  return request({
    url: '/admin/acl/permission/remove',
    headers: {
      'Content-Type': 'multipart/form-data'
    },
    method: 'post',
    params
  })
}
