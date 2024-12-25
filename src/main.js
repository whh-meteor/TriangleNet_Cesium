import Vue from 'vue'
import App from './App.vue'

import router from './router'
import store from './store'
import './index.scss'
import '../public/Cesium/Widgets/widgets.css'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import * as axios from "@/api/request"
import Pagination from '@/components/Pagination'
import GLOBAL_CONFIG from "/public/global"
// import VueDraggableResizable from 'vue-draggable-resizable'
window.GLOBAL_CONFIG=GLOBAL_CONFIG

Vue.component('Pagination', Pagination)
// Vue.component('vue-draggable-resizable', VueDraggableResizable)
ElementUI.Dialog.props.closeOnClickModal.default = false
Vue.use(ElementUI)
Vue.prototype.$messagebox = ElementUI.MessageBox 
Vue.prototype.$message = ElementUI.Message 
Vue.prototype.axios=axios;

Vue.config.productionTip = false

new Vue({
  store,
  router,
  render: (h) => h(App)
}).$mount('#app')
