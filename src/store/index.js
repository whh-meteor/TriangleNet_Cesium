import Vue from 'vue';
import Vuex from 'vuex';

import commonMap from './modules/common-map';
import userInfo from "./modules/user"


// 插件保证页面刷新vuex不消失
import createPersistedState from 'vuex-persistedstate';

Vue.use(Vuex);

export default new Vuex.Store({
    modules: {
        commonMap,
        userInfo
    },
    plugins: [createPersistedState({
        paths:['userInfo']
    })],
    // plugins:[createPersistedState()]
    // 可以根据需要添加actions和getters
});