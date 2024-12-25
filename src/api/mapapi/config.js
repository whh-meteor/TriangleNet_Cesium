/**
 * @argument jing 井

 */

/**
 * 列表调取的url
 */
export const JingUrl = {
    jinginfoList: '/well/getList',//菜单
    getrockbyid: '/well/getByStationId',
    biaomian: '/station/getlistByType',
    stattype: '/station/getDetailsType',
    statinfo: '/station/getDetailsList',
    biaomianrequest: '/well/getSubsamplIdList',
    jing: '/well/list',
    jingload : '/wellRock/list',
    areainfo :'/area/list',
    jing1:'/well/getSugOneWellList',
    jing2:'/well/getSugTwoWellList',
    sublist: '/station/getSubsampleIdList'

}

export const dingdianUrl = {
    timeframe: '/fpoData/getTimeList',
    arrow: '/fpoData/list'
}
export const researchUrl = {
    labeltext: '/researchAchieve/list',
    research: '/researchAchieve/getPicList',
    dadi: 'tectonic/list',
    gaoshi: 'gs123Sbpdf/getGsBarData'
}
export const layerUrl = {
    layerdepth: '/index/getLayerPoint',
    fracture : '/syhbMfst/list',
    gaoinfo: 'index/getTrapEleByName'
}
export const cexianUrl = {
    cexian: '/line/list',
    heat: '/line/getHotPointList'
}
export const zou = {
    zouhang : '/sailingData/list',
    buoy : '/buoyData/list',
    buoypoint :'buoyData/getBuoyPoint'
}
