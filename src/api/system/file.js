/*
 * @Author: UMR
 * @Date: 2024-06-25 09:18:38
 * @LastEditors: Do not edit
 * @LastEditTime: 2024-06-28 10:44:19
 * @FilePath: \nuclear_power\src\api\system\file.js
 */
import request from '../index'

/* 
依据文件ID下载文件
*/
export function fileDownload(params) {
  return request({
    url: '/manage/download',
    method: 'get',
    responseType: 'blob',
    headers: {
      'Content-Type': 'multipart/form-data'
    },
    params
  })
}

/* 
上传文件
*/
export function fileUploadFile(data) {
  return request({
    url: '/manage/uploadFile',
    method: 'post',
    headers: {
      'Content-Type': 'multipart/form-data'
    },
    data
  })
}
