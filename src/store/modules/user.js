
/**
 * 地图信息存储
 */
export default {
    namespaced: true,
    state: () => ({
        token: '', 
        userInfo:{} ,
        menu:[]
    }),
    mutations: {
        setToken(state,value){
            state.token=value
        },
        setUserInfo(state,value){
            state.userInfo=value
        },
        setMenu(state,value){
            state.menu=value
        }
    },
    getters: {
        getToken(state){
            return state.token
        },
        getUserInfo(state){
            return state.userInfo
        },
        getMenu(state){
            return state.menu
        }
    }
}