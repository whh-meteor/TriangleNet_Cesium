const IMAGE_BUTTON_TEXT = '图片展示'
/**
 * @description
 * @param stationId 展示的标签
 * @param isChecked 是否选择
 * @param button 按钮--设置展示的名称
 */
/**
 * 包含三级列表的配置此处
 */
export const tagHasThirdArray = [
  '定点',
  '构造',
  '物性指示因子',
  '断层',
  '断裂',
  '洋流',
  '地质浅钻',
  '表面取样',
  '表层取样',
  '柱状取样',
  '钻井',
  '地球化学取样',
  '井',
  '测线热力图',
  '多波束测深',
  '单波束测深',
  '测扫声呐',
  '海洋重力',
  '建议1井',
  '建议2井',
  '海洋磁力',
  '单道地震',
  '多道地震',
  '走航海流',
  'CPM',
  '浅地层剖面',
  '走航',
  '浮标',
  '流体指示因子',
  '压力预测',
  '厚度',
  '重力',
  '磁力',
  '有利区评价',
  '基点',
  '基线',
  '划界界线'
]
/**
 * 地层
 */
export const stratum = [
  {
    stationId: '南黄海Tg反射界面构造图',
    isChecked: false
  },

  {
    stationId: '南黄海T13反射界面构造图',
    isChecked: false
  },
  {
    stationId: '南黄海T12反射界面构造图',
    isChecked: false,
    firstCheckList: ['uplift']
  },
  {
    stationId: '南黄海T11反射界面构造图',
    isChecked: false
  },
  {
    stationId: '南黄海T10反射界面构造图',
    isChecked: false
  },
  {
    stationId: '南黄海T9反射界面构造图',
    isChecked: false
  },
  {
    stationId: '南黄海T8反射界面构造图',
    isChecked: false
  },
  {
    stationId: '南黄海T7反射界面构造图',
    isChecked: false
  },
  {
    stationId: '南黄海T4反射界面构造图',
    isChecked: false
  },
  {
    stationId: '南黄海T2反射界面构造图',
    isChecked: false
  }
]
export const chen = [
  {
    stationId: "南黄海下寒武统沉积相分布预测",
    isChecked: false,
    button:'imageIconDisplay'
  },
  {
    stationId: "南黄海上奥陶统-下志留统沉积相分布",
    isChecked: false,
    button: 'imageIconDisplay'
  },
  {
    stationId: '南黄海上二叠统龙潭-大隆组沉积相分布',
    isChecked: false,
    button: 'imageIconDisplay'
  },
  {
    stationId: '南黄海下三叠统青龙组沉积相分布',
    isChecked: false,
    button: 'imageIconDisplay'
  },
  {
    stationId: '南黄海下志留统沉积相分布预测略图',
    isChecked: false,
    button: 'imageIconDisplay'
  }
]
export const lao = [
  {
    stationId: '崂山隆起有利圈闭图',
    isChecked: false
    //button:IMAGE_BUTTON_TEXT
  }
]
 
export const ji = [
  {
    stationId: '韩国基点',
    isChecked: false
    //button:IMAGE_BUTTON_TEXT
  },
  {
    stationId: '中国基点',
    isChecked: false
    //button:IMAGE_BUTTON_TEXT
  },]

  export const jixian = [
    {
      stationId: '韩国基线',
      isChecked: false
      //button:IMAGE_BUTTON_TEXT
    },
    {
      stationId: '中国基线',
      isChecked: false
      //button:IMAGE_BUTTON_TEXT
    },]
  
export const dai = [
  {
    stationId: '志留统高家边组-上二叠统大隆组油气有利区带',
    isChecked: false
    //button:IMAGE_BUTTON_TEXT
  },
  {
    stationId: '崂山震旦-志留系油气有利区带',
    isChecked: false
    //button:IMAGE_BUTTON_TEXT
  },
  {
    stationId: '南黄海盆地震旦-志留油气有利区带',
    isChecked: false
    //button:IMAGE_BUTTON_TEXT
  },
  {
    stationId: '震旦系-下志留统高家边组油气有利区带',
    isChecked: false
    //button:IMAGE_BUTTON_TEXT
  }
  

]
export const hua = [
  {
    stationId: '李承晚线(124°线)',
    isChecked: false
    //button:IMAGE_BUTTON_TEXT
  },
  {
    stationId: '黄海槽谷轴参考线',
    isChecked: false
    //button:IMAGE_BUTTON_TEXT
  },
  {
    stationId: '全海域基线中间线',
    isChecked: false
    //button:IMAGE_BUTTON_TEXT
  },
  {
    stationId: '岸线等比例线',
    isChecked: false
    //button:IMAGE_BUTTON_TEXT
  },
  {
    stationId: '韩国单方面主张的矿权线',
    isChecked: false
    //button:IMAGE_BUTTON_TEXT
  },




]
export const physicalPropertyIndicators = [
  {
    stationId: '崂山隆起目标区下二叠统(T10-T11)物性指示因子平面图',
    isChecked: false
    //button:'imageIconDisplay'
  },
  {
    stationId: '崂山隆起目标区上震旦统灯影(Tg)物性指示因子平面图',
    isChecked: false
    //button:'imageIconDisplay'
  },
  {
    stationId: '崂山隆起目标区下寒武统(T13)物性指示因子平面图',
    isChecked: false
    //button:'imageIconDisplay'
  },
  {
    stationId: '崂山隆起目标区下志留统(T11-T12)物性指示因子平面图',
    isChecked: false
    //button:'imageIconDisplay'
  }
]
export const gra = [
  {
    stationId: '重力异常图',
    isChecked: false
    //button:'imageIconDisplay'
  },
  {
    stationId: '布格重力异常图',
    isChecked: false
    //button:'imageIconDisplay'
  }
]

export const mag = [
  {
    stationId: '磁力异常图',
    isChecked: false
    //button:'imageIconDisplay'
  }
]
export const nan = [
  {
    stationId: '南黄海大地构造位置图',
    isChecked: false
  }
]
export const di = [
  {
    stationId: '南黄海地形图',
    isChecked: false
  }
]

export const thickness = [
  {
    stationId: 'T8-T9厚度平面图',
    isChecked: false
    //button:'imageIconDisplay'
  },
  {
    stationId: 'T9-T10厚度平面图',
    isChecked: false
    //button:'imageIconDisplay'
  },
  {
    stationId: 'T10-T11厚度平面图',
    isChecked: false
    //button:'imageIconDisplay'
  },
  {
    stationId: 'T11-T12厚度平面图',
    isChecked: false
    //button:'imageIconDisplay'
  },
  {
    stationId: 'T12-T13厚度平面图',
    isChecked: false
    //button:'imageIconDisplay'
  },
  {
    stationId: 'T13-Tg厚度平面图',
    isChecked: false
    //button:'imageIconDisplay'
  }
]
export const liquidPropertyIndicators = [
  {
    stationId: '崂山隆起目标区上震旦统灯影组(Tg)流体指示因子平面图',
    isChecked: false
    //button:'imageIconDisplay'
  },
  {
    stationId: '崂山隆起目标区上泥盆统(T11-T11)流体指示因子平面图',
    isChecked: false
    //button:'imageIconDisplay'
  },
  {
    stationId: '崂山隆起目标区下二叠统(T10-T11)流体指示因子平面图',
    isChecked: false
    //button:'imageIconDisplay'
  },
  {
    stationId: '崂山隆起目标区下寒武统(T13-T13)流体指示因子平面图',
    isChecked: false
    //button:'imageIconDisplay'
  },
  {
    stationId: '崂山隆起目标区下志留统(T11-T12)流体指示因子平面图',
    isChecked: false
    //button:'imageIconDisplay'
  }
]

/**
 * 洋流
 */
export const kong = [
  //洋流列表
  {
    stationId: '一层(0m)',
    isChecked: true
  },
  {
    stationId: '二层(-20m)',
    isChecked: false
  },
  {
    stationId: '三层(-60m)',
    isChecked: false
  },
  {
    stationId: '四层(-100m)',
    isChecked: false
  },
  {
    stationId: '五层(-140m)',
    isChecked: false
  }
]
export const currents = [
  //洋流列表
  {
    stationId: '一层(0m)',
    isChecked: true
  },
  {
    stationId: '二层(-20m)',
    isChecked: false
  },
  {
    stationId: '三层(-60m)',
    isChecked: false
  },
  {
    stationId: '四层(-100m)',
    isChecked: false
  },
  {
    stationId: '五层(-140m)',
    isChecked: false
  }
]
/**
 *  洋流初始全选默认值
 */
export const currentsInit = ['一层(0m)']
export const zoudepth = ['25']
export const layer = ['T9', 'T13']
export const thicki = ['T8-T9厚度平面图']
export const pressurei = ['崂山隆起目标区T10压力预测异常分布图']
export const phy = ['崂山隆起目标区下二叠统(T10-T11)物性指示因子平面图']
export const liq = ['崂山隆起目标区上震旦统灯影组(Tg)流体指示因子平面图']
export const qing = [
  {
    stationId: '海底沉积物顶空重烃气体含量异常',
    isChecked: false
    //button:'imageIconDisplay'
  }
]
export const jia = [
  {
    stationId: '海底沉积物顶空甲烷含量异常',
    isChecked: false
    //button:'imageIconDisplay'
  }
]
export const wei = [
  {
    stationId: '海底沉积物微生物(MV)异常',
    isChecked: false
    //button:'imageIconDisplay'
  }
]
export const jing = [
  {
    stationId: '南黄海盆地下寒武统有利烃源岩区',
    isChecked: false,
    button: 'imageIconDisplay'
  },
  {
    stationId: '南黄海盆地上奥陶统-下志留统有利烃源岩区',
    isChecked: false,
    button: 'imageIconDisplay'
  },
  {
    stationId: '南黄海盆地上二叠统龙潭-大隆组有利烃源岩区',
    isChecked: false,
    button: 'imageIconDisplay'
  },

  {
    stationId: '南黄海盆地北坳白垩系有利烃源岩区',
    isChecked: false,
    button: 'imageIconDisplay'
  },
  {
    stationId: '南黄海盆地北坳阜宁组有利烃源岩区',
    isChecked: false,
    button: 'imageIconDisplay'
  }
]

export const chu = [
  {
    stationId: '南黄海盆地中上石炭统-下二叠统储层区',
    isChecked: false,
    button: 'imageIconDisplay'
  },
  {
    stationId: '南黄海盆地中上志留统-下石炭统储层区',
    isChecked: false,
    button: 'imageIconDisplay'
  },
  {
    stationId: '南黄海盆地中上寒武统-奥套系储层区',
    isChecked: false,
    button: 'imageIconDisplay'
  },

  {
    stationId: '南黄海盆地中震旦系-下寒武统储层区',
    isChecked: false,
    button: 'imageIconDisplay'
  },
  {
    stationId: '南黄海盆地北坳白垩系储层区',
    isChecked: false,
    button: 'imageIconDisplay'
  },
  {
    stationId: '南黄海盆地北部坳陷三垛组-戴南组储层区',
    isChecked: false,
  },
];
/**
 *  洋流初始全选默认值
 */
// export const currentsInit=['siglay1'];
// export const zoudepth =['25']
// export const layer =['T9','T13']
// export const thicki = ["T8-T9厚度平面图"]
// export const pressurei =['崂山隆起目标区T10压力预测异常分布图'] 
// export const phy = ["崂山隆起目标区下二叠统(T10-T11)物性指示因子平面图"]
// export const liq =['崂山隆起目标区上震旦统灯影组(Tg)流体指示因子平面图']
// export const qing =[{
//   stationId: "海底沉积物顶空重烃气体含量异常",
//   isChecked: false,
//   //button:'imageIconDisplay'
// },]
// export const jia =[{
//   stationId: "海底沉积物顶空甲烷含量异常",
//   isChecked: false,
//   //button:'imageIconDisplay'
// },]
// export const wei =[{
//   stationId: "海底沉积物微生物(MV)异常",
//   isChecked: false,
//   //button:'imageIconDisplay'
// },]
//  export const jing =[
// // {
// //   stationId: "南黄海盆地下寒武统有利烃源岩区",
// //   isChecked: false,
// //   button:'imageIconDisplay'
// // },
// {
//   stationId: "南黄海盆地上奥陶统-下志留统有利烃源岩区",
//   isChecked: false,
//   button:'imageIconDisplay'
// },
// {
//   stationId: "南黄海盆地上二叠统龙潭-大隆组有利烃源岩区",
//   isChecked: false,
//   button:'imageIconDisplay'
// },

// {
//   stationId: "南黄海盆地北坳白垩系有利烃源岩区",
//   isChecked: false,
//   button:'imageIconDisplay'
// },
// {
//   stationId: "南黄海盆地北坳阜宁组有利烃源岩区",
//   isChecked: false,
//   button:'imageIconDisplay'
// },









// ]

export const gai = [
  {
    stationId: '南黄海震旦系-下志留统高家边组储盖组合',
    isChecked: false,
    button: 'imageIconDisplay'
  },
  {
    stationId: '南黄海志留统高家边组-上二叠统大隆组储盖组合',
    isChecked: false,
    button: 'imageIconDisplay'
  },
  {
    stationId: '南黄海盆地崂山隆起震旦-志留系有利储盖组合',
    isChecked: false,
    button: 'imageIconDisplay'
  },

  {
    stationId: '南黄海盆地北坳白垩系有利储盖组合',
    isChecked: false,
    button: 'imageIconDisplay'
  },
  {
    stationId: '南黄海盆地北坳阜宁组有利储盖组合',
    isChecked: false,
    button: 'imageIconDisplay'
  },
  {
    stationId: '南黄海盆地北部坳陷三垛组-戴南组盖层',
    isChecked: false,
    button: 'imageIconDisplay'
  }
]
export const bindThirdArrayInit = {
  洋流: currentsInit,
  走航: zoudepth,
  构造: layer
}

export const duanlie = Array.from({ length: 36 }, (_, index) => ({
  stationId: `F${index + 1}`,
  isChecked: false
}))
export const pressure = [
  {
    stationId: '崂山隆起目标区T10压力预测异常分布图',
    isChecked: false
    //button:'imageIconDisplay'
  },

  {
    stationId: '崂山隆起目标区T12压力预测异常分布图',
    isChecked: false
    // button:'imageIconDisplay'
  },
  {
    stationId: '崂山隆起目标区T13压力预测异常分布图',
    isChecked: false
    //button:'imageIconDisplay'
  }
]

export const recommend = [
  {
    stationId: '1井',
    isChecked: false
  },
  {
    stationId: 'Trace1700',
    isChecked: false
  },
  {
    stationId: 'Inline780',
    isChecked: false
  },
  {
    stationId: 'HB15_L07',
    isChecked: false
  },
  {
    stationId: 'HB15_44',
    isChecked: false
  }
]

export const recommend2 = [
  {
    stationId: '2井',
    isChecked: false
  },
  {
    stationId: 'HB15_42',
    isChecked: false
  },
  {
    stationId: 'HB15_L09',
    isChecked: false
  },
  {
    stationId: 'Trace1280',
    isChecked: false
  },
  {
    stationId: 'Inline510',
    isChecked: false
  }
]

export const zou = [
  {
    stationId: '25',
    isChecked: false
    //firstCheckList:['basin']
  },

  {
    stationId: '50',
    isChecked: false
  },
  {
    stationId: '75',
    isChecked: false
  },
  {
    stationId: '100',
    isChecked: false
  },
  {
    stationId: '125',
    isChecked: false
  },
  {
    stationId: '150',
    isChecked: false
  },
  {
    stationId: '175',
    isChecked: false
  },
  {
    stationId: '200',
    isChecked: false
  },
  {
    stationId: '225',
    isChecked: false
  },
  {
    stationId: '250',
    isChecked: false
  },
  {
    stationId: '275',
    isChecked: false
  },
  {
    stationId: '300',
    isChecked: false
  },
  {
    stationId: '325',
    isChecked: false
  },
  {
    stationId: '350',
    isChecked: false
  },
  {
    stationId: '375',
    isChecked: false
  },
  {
    stationId: '400',
    isChecked: false
  },
  {
    stationId: '425',
    isChecked: false
  },
  {
    stationId: '450',
    isChecked: false
  },
  {
    stationId: '475',
    isChecked: false
  },
  {
    stationId: '500',
    isChecked: false
  }
]
export const buoy = [
  {
    stationId: 'tt9904',
    isChecked: false
  },

  {
    stationId: 'tv1246',
    isChecked: false
  },
  // {
  //   stationId: "tv1247",
  //   isChecked: false,
  // },
  {
    stationId: 'tv1248',
    isChecked: false
  },
  // {
  //   stationId: "tv1249",
  //   isChecked: false,
  // },
  {
    stationId: 'tv1250',
    isChecked: false
  },
  {
    stationId: 'tv1251',
    isChecked: false
  },
  {
    stationId: 'tv1252',
    isChecked: false
  },
  // {
  //   stationId: 'tv1253',
  //   isChecked: false,
  // },
  {
    stationId: 'tv1254',
    isChecked: false
  },
  {
    stationId: 'tv5159',
    isChecked: false
  }
]

/**
 * 地质取样
 */
export const geologicalSampling = [
  {
    stationId: '表层取样',
    isChecked: false
  },
  {
    stationId: '地质浅钻',
    isChecked: false
  },

  {
    stationId: '柱状取样',
    isChecked: false
  },
  // {
  //   stationId: "地球化学取样",
  //   isChecked: false,
  // },
  {
    stationId: '钻井',
    isChecked: false,
    firstCheckList: ['basin']
  }
]
/**
 * 海洋地球物理调查
 */
export const physicalSurveys = [
  {
    stationId: '多波束测深',
    isChecked: false
  },
  {
    stationId: '单波束测深',
    isChecked: false
  },
  {
    stationId: '侧扫声纳',
    isChecked: false
  },
  {
    stationId: '海洋重力',
    isChecked: false
  },

  {
    stationId: '海洋磁力',
    isChecked: false
  },
  {
    stationId: '单道地震',
    isChecked: false
  },
  {
    stationId: '多道地震',
    isChecked: false
  },
  {
    stationId: '走航海流',
    isChecked: false
  },
  {
    stationId: 'CPM',
    isChecked: false
  },
  {
    stationId: '浅地层剖面',
    isChecked: false
  }
]
/**
 * 初始化展示的内容
 * dataInvestigate 数据调查
 * researchFindings 研究调查
 */
export const initDisplay = {
  basin: 'dataInvestigate',
  uplift: 'researchFindings',
  stone: 'researchFindings'
}
