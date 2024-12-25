import Vue from "vue";

/** 字符串超长截取省略号显示 */
Vue.filter('ellipsis', function (value, vlength = 16) {
  if(!value){
    return "";
  }
  if (value.length > vlength) {
    return value.slice(0, vlength) + '...'
  }
  return value
})