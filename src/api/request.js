import service from ".";

export function post({ url, data, headers,params}) {
  return service({
    url,
    headers: {
      "Content-Type": "multipart/form-data",
      ...headers,
    },
    method: "post",
    params:params,
    data: data,
  });
}
export function get({ url, data,headers }) {
  return service({
    url,
    headers: {
      ...headers,
    },
    method: "get",
    params: data,
  });
}

export function put({ url, data,headers }) {
  return service({
    url,
    headers: {
      ...headers,
    },
    method: "put",
    data: data,
  });
}
export function exportData({url,data={},headers,method,params={}}) {
  return service({
    url,
    // headers: {
    //   isToken: false,
    //   'Content-Type': 'multipart/form-data'
    // },
    headers: {
      ...headers,
    },
    method: method||'post',
    data: data,
    params:params,
    responseType: 'blob'
  })
}
