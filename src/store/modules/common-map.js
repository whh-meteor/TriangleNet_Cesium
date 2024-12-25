
/**
 * 地图信息存储
 */
export default {
    namespaced: true,
    state: () => ({
        expand: false,//是否展开
        tab:0,  //顶部tab选项
        fold:false,// 是否收起面板
        showLegend:false, // 是否显示图例
        clearScreen:false,//清屏
    }),
    mutations: {
        setExpand(state,value){
            state.expand=value
        },
        setTab(state,value){
            state.tab=value
        },
        setFold(state,value){
            state.fold=value
        },
        setLegend(state,value){
            state.showLegend = value
        },
        setClearScreen(state,value){
            state.clearScreen = value
        }
    },
    getters: {
        getExpand(state){
            return state.expand
        },
        getTab(state){
            return state.tab
        },
        getFold(state){
            return state.fold
        },
        getLegend(state){
            return state.showLegend
        },
        getClearScreen(state){
            return state.clearScreen
        }
    }
}