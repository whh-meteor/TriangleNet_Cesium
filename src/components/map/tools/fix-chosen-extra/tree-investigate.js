/**
 * @description 一级
 * @argument title 展示的标签
 * @argument isChecked 是否选择
 * @argument showThirdLevel 是否展示三级列表
 * @argument children 二级菜单
 * @argument hasSelectComponent 是否有下拉框
 * @argument selectUrlType 下拉框接口名称
 * @argument firstCheckList 进入页面首次加载初始化 值['basin','uplift','stone']
 * @argument defaultSecond 默认展示它的三级列表 值['basin','uplift','stone']
 *
 */
/**
 * @description 二级
 * @argument title 展示的标签
 * @argument isChecked 是否选择
 * @argument thirdLevelType 三级展示类型
 * @argument postUrlType 三级接口绑定 getListForResearch
 * @argument static 静态三级名称 /fix-chosen.static.js 配置
 * @argument button 按钮--展示的名称
 *
 */
export const dataInvestigate = [
  {
    title: '浮标站',
    flag:'buoy',
    points:[
      {
        lon: 108.548054, lat:20.611804
      },
      {
        lon:112.190985, lat: 20.645011,
      },
      {
        lon: 107.276686, lat: 19.602292
      },
      {
        lon:112.874993,lat: 19.549282 
      },
      {
        lon: 108.5500, lat: 21.2000 
      },
    ],
    isChecked: false,
    children: [
      {
        title: '风速风向仪',
        isChecked: false,
      },
      {
        title: '温湿度传感器',
        isChecked: false,
      },
      {
        title: '大气压力传感器',
        isChecked: false,
      },
      {
        title: '能见度仪',
        isChecked: false,
      },
      {
        title: '雨量计',
        isChecked: false,
      }
    ]
  },
  {
    title: '卫星',
    flag:'satellite',
    points:[
      {
        lon: 111.542884, lat:20.796470,
      },
      {
        lon:108.925984, lat: 20.144690,
      },
      {
        lon: 111.368444,lat: 18.589854 
      },
      {
        lon: 109.0400, lat: 20.4950
      },
      {
        lon: 110.662884, lat: 20.617003,
      },
    ],
    isChecked: false,
    children: [
      {
        title: 'CSAT3B三维超声风温仪',
        isChecked: false,
      },
      {
        title: 'CNR4四辐射分量',
        isChecked: false,
      },
      {
        title: '涡动相关传感器',
        isChecked: false,
      },
      {
        title: '三维风速仪',
        isChecked: false,
      },
    ]
  },
  {
    title: '无人潜水器',
    flag:'submersibles',
    isChecked: false,
    points:[
      {
        lon: 107.462178, lat:19.153919
      },
      {
        lon:109.596001,lat: 20.712125
      },
      {
        lon: 111.491582, lat: 21.273031
      },
      {
        lon:110.932230, lat: 18.958322
      },
      {
        lon: 112.454910, lat: 21.118509
      },
    ],
    children: [
      {
        title: '溶解氧传感器',
        isChecked: false,
      },
      {
        title: '甲烷传感器',
        isChecked: false,
      },
      {
        title: '二氧化碳传感器',
        isChecked: false,
      },
      {
        title: '硝酸盐传感器',
        isChecked: false,
      },
      {
        title: 'pH 传感器',
        isChecked: false,
      },
      {
        title: '营养盐分析仪',
        isChecked: false,
      },
    ]
  },
  {
    title: '声呐探测',
    flag:'sonar',
    points:[
      {
        lon: 107.866154,lat:21.158946
      },
      {
        lon:109.274892, lat: 20.345303
      },
      {
        lon: 109.482059, lat: 21.207238
      },
      {
        lon: 110.828647, lat: 20.868863
      },
      {
        lon: 108.156188, lat: 21.303776
      },
    ],
    isChecked: false,
    children: [
      {
        title: '海底地震仪',
        isChecked: false,
      },
      {
        title: '海底磁力仪',
        isChecked: false,
      },
      {
        title: '海底电磁仪',
        isChecked: false,
      },
      {
        title: '结构健康监测系统的应力应变传感器',
        isChecked: false,
      },
    ]
  },
]
