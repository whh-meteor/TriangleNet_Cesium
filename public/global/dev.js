/**
 * @description 全局配置
 * @argument TITLE 系统名称
 * @argument TITLE_EN 系统英文名称
 * @argument VISUALIZATION_ADDRESS 可视化地址
 * @argument MAP_ADDRESS 地图地址
 * @argument SUB_TITLE 底部子系统名称
 */
const dev = {
  TITLE: "智慧一张图",
  TITLE_EN: "NANHUANGHAI",
  VISUALIZATION_ADDRESS: "http://10.77.70.126/SEH5/viewMultiMainOcean.html",
  MAP_ADDRESS:
    "http://192.168.2.201:1996/gisAssistant/wmts/grid_tile/esri/satellite_202211/{z}/{y}/{x}",
  Terrain_Address:
    "http://inner.qdlimap.cn:7001/GisServer/NanHuangHai/globeterrain/",
  SUB_TITLE: "测试系统",
};

export default dev;
