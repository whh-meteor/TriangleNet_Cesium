let legendConfig = {
  '水文取样': {
    name: '水文取样',
    type: 'list',
    child: [
      {
        name: '定点',
        type: 'list',
        child: [
          {
            name: '定点点位',
            type: 'point',
            color: '#800080',
            active: true,
            width: '50%' // 配置长度
          },
          {
            name: '定点流向',
            type: 'img',
            src: "arrow.png", // 图片都放到src\assets\image\legend下面，这个地方src放置图片名和类型就可以了
            active: true,
            width: '50%'
          },
          {
            name: '定点流速m/s',
            type: 'ramp',
            colormap: ['#E24545', '#FE5A08', '#F1D100', '#7DB834', '#06C9DF', '#059BFF', '#6868FF'].reverse(),
            interval: [20, 130],
            active: true,
            width: '100%'
          }
          
        ]
      },
      {
        name: '走航',
        type: 'list',
        child: [
          {
            name: '走航点位',
            type: 'point',
            color: '#800080',
            active: true,
            width: '50%'
          },
          {
            name: '走航流向',
            type: 'img',
            src: 'arrow.png',
            active: true,
            width: '50%'
          },
          {
            name: '走航流速',
            type: 'ramp',
            colormap: ['#E24545', '#FE5A08', '#F1D100', '#7DB834', '#06C9DF', '#059BFF', '#6868FF'].reverse(),
            interval: [0.0025, 0.706],
            active: true,
            width: '100%'
          }
        ]
      },
      {
        name: '浮标',
        type: 'list',
        child: [
          {
            name: '浮标点位',
            type: 'point',
            color: "#c71585", active: true,
            width: '50%'
          },
          {
            name: '浮标流向',
            type: 'img', src: 'arrow.png',
            active: true,
            width: '50%'
          },
          {
            name: '浮标流速m/s',
            type: 'ramp',
            colormap: ['#E24545', '#FE5A08', '#F1D100', '#7DB834', '#06C9DF', '#059BFF', '#6868FF'].reverse(),
            interval: [0, 0.7],
            active: true,
            width: '100%'
          }
        ]
      },
      {
        name: '洋流',
        type: 'list',
        child: [
          {
            name: '洋流色温',
            type: 'ramp',
            colormap: null,
            interval: [0, 100],
            active: true,
            width: '100%'
          },
          {
            name: '洋流流速',
            type: 'ramp',
            colormap: null,
            interval: [0, 100],
            active: true,
            width: '100%'
          }
        ]
      }
    ]
  },
  '地质取样': {
    name: '地质取样',
    type: 'list',
    child: [
      {
        name: '地质取样点位',
        type: 'list',
        child: [
          {
            name: '有岩性，测试分析数据',
            type: 'point',
            color: '#ffff00',
            active: true,
            width: '50%'
          },
          {
            name: '无岩性，有测试分析数据',
            type: 'point',
            color: '#808080',
            active: true,
            width: '50%'
          },
          {
            name: '无岩性和测试分析数据',
            type: 'point',
            color: '#ffffff',
            active: true,
            width: '50%'
          }
        ]
      },
      {
        name: '地质取样岩性',
        type: "list",
        child: [
          {
            name: '贝壳层',
            type: 'img',
            src: '贝壳层.png',
            active: true,
            width: '50%'
          },
          {
            name: '粗砂',
            type: 'img',
            src: '粗砂.png',
            active: true,
            width: '50%'
          },
          {
            name: '粉砂',
            type: 'img',
            src: '粉砂.png',
            active: true,
            width: '50%'
          },
          {
            name: '粉砂质黏土',
            type: 'img',
            src: '粉砂质黏土.png',
            active: true,
            width: '50%'
          },
          {
            name: '粉砂质砂',
            type: 'img',
            src: '粉砂质砂.png',
            active: true,
            width: '50%'
          },
          {
            name: '硅质泥',
            type: 'img',
            src: '硅质泥.png',
            active: true,
            width: '50%'
          },
          {
            name: '含砾泥质砂',
            type: 'img',
            src: '含砾泥质砂.png',
            active: true,
            width: '50%'
          },
          {
            name: '含砾砂',
            type: 'img',
            src: '含砾砂.png',
            active: true,
            width: '50%'
          },
          {
            name: '砾',
            type: 'img',
            src: '砾.png',
            active: true,
            width: '50%'
          },
          {
            name: '砾石',
            type: 'img',
            src: '砾石.png',
            active: true,
            width: '50%'
          },
          {
            name: '砾质泥质砂',
            type: 'img',
            src: '砾质泥质砂.png',
            active: true,
            width: '50%'
          },
          {
            name: '泥',
            type: 'img',
            src: '泥.png',
            active: true,
            width: '50%'
          },
          {
            name: '泥炭层',
            type: 'img',
            src: '泥炭层.png',
            active: true,
            width: '50%'
          },
          {
            name: '泥质砂',
            type: 'img',
            src: '泥质砂.png',
            active: true,
            width: '50%'
          },
          {
            name: '泥质砂质砾',
            type: 'img',
            src: '泥质砂质砾.png',
            active: true,
            width: '50%'
          },
          {
            name: '泥质砂质砂',
            type: 'img',
            src: '泥质砂质砂.png',
            active: true,
            width: '50%'
          },
          {
            name: '黏土',
            type: 'img',
            src: '黏土.png',
            active: true,
            width: '50%'
          },
          {
            name: '黏土质粉砂',
            type: 'img',
            src: '黏土质粉砂.png',
            active: true,
            width: '50%'
          },
          {
            name: '黏土质砂',
            type: 'img',
            src: '黏土质砂.png',
            active: true,
            width: '50%'
          },
          {
            name: '砂',
            type: 'img',
            src: '砂.png',
            active: true,
            width: '50%'
          },
          {
            name: '砂质粉砂',
            type: 'img',
            src: '砂质粉砂.png',
            active: true,
            width: '50%'
          },
          {
            name: '砂质砾',
            type: 'img',
            src: '砂质砾.png',
            active: true,
            width: '50%'
          },
          {
            name: '砂质泥',
            type: 'img',
            src: '砂质泥.png',
            active: true,
            width: '50%'
          },
          {
            name: '砂质黏土',
            type: 'img',
            src: '砂质黏土.png',
            active: true,
            width: '50%'
          },
          {
            name: '细砂',
            type: 'img',
            src: '细砂.png',
            active: true,
            width: '50%'
          },
          {
            name: '玄武岩',
            type: 'img',
            src: '玄武岩.png',
            active: true,
            width: '50%'
          },
          {
            name: '岩块',
            type: 'img',
            src: '岩块.png',
            active: true,
            width: '50%'
          },
          {
            name: '中粗砂',
            type: 'img',
            src: '中粗砂.png',
            active: true,
            width: '50%'
          },
          {
            name: '中砂',
            type: 'img',
            src: '中砂.png',
            active: true,
            width: '50%'
          },
          {
            name: '中细砂',
            type: 'img',
            src: '中细砂.png',
            active: true,
            width: '50%'
          }
        ]

      },
    ]
  },


  '海洋地球物理调查': {
    name: '海洋地球物理调查',
    type: 'list',
    child: [
      {
        name: '测线热力图',
        type: 'ramp',
        colormap: ['#00ff00', '#ffff00', '#ffa500', '#ff0000', '#8b0000'],
        interval: [0.0,0.25,0.5,0.75, 1.00],
        active: true,
        width: '100%'
      },
      {
        name: '测线',
        type: 'list',
        child: [
          {
            name: '多波束测深',
            type: 'line',
            color: '#00FFFF',
            border: null,
            active: true,
            width: '50%'
          },
          {
            name: '单波束测深',
            type: 'line',
            color: '#FF00FF',
            border: null,
            active: true,
            width: '50%'
          },
          {
            name: '侧扫声纳',
            type: 'line',
            color: '#DB7093',
            border: null,
            active: true,
            width: '50%'
          },
          {
            name: '海洋重力',
            type: 'line',
            color: '#F5FFFA',
            border: null,
            active: true,
            width: '50%'
          },
          {
            name: '海洋磁力',
            type: 'line',
            color: '#00FA9A',
            border: null,
            active: true,
            width: '50%'
          },
          {
            name: '单道地震',
            type: 'line',
            color: '#800080',
            border: null,
            active: true,
            width: '50%'
          },
          {
            name: '多道地震',
            type: 'line',
            color: '#D4F2E7',
            border: null,
            active: true,
            width: '50%'
          },
          {
            name: '走航海流',
            type: 'line',
            color: '#7CFC00',
            border: null,
            active: true,
            width: '50%'
          },
          {
            name: 'CPM',
            type: 'line',
            color: '#DC143C',
            border: null,
            active: true,
            width: '50%'
          },
          {
            name: '浅地层剖面',
            type: 'line',
            color: '#2E8B57',
            border: null,
            active: true,
            width: '50%'
          }
        ]
      }
    ]
  },
  '地理位置': {
    name: '南黄海大地构造位置',
    type: 'point',
    color: '#0077be',
    active: true,
    width: '50%'
  },
  
  '构造': {
    name: '构造',
    type: 'list',
    child: [
      {
        name: '信息点',
        type: 'point',
        // color: null,
        color: '#e8bb1d',
        active: true,
        width: '50%'
      },
      {
        name: '地层点',
        type: 'point',
        color: '#F5FFFA',
        active: true,
        width: '50%'
      },
      {
        name: '地层分层',
        type: 'ramp',
        colormap: ['#FFFFFF', '#FAFAFA','#F5F5F5','#F0F0F0','#E0E0E0','#D2D2D2','#AAAAAA','#828282','#5A5A5A','#4A4A4A'],
        interval: ['T1', "Tg"],
        active: true,
        width: '100%'
      }
    ]
  },
  '厚度': {
    name: '厚度',
    type: 'ramp',
    colormap: ['#E24545',
'#F15A08',
'#FE8A08',
'#F1D100',
'#D0E36D',
'#A4D04E',
'#7DB834',
'#4CB050',
'#4BC0B3',
'#0099CC',
'#0055A5',
'#4A529A',
'#6A4A93',
'#7A3A99',
'#8B4DA3',
'#9E5AA5',
'#A15AAB',
'#B15BB8'].reverse(),
    interval: [0, 2700],
    active: true,
    width: '100%'
  },

  '断裂': {
    name: '断裂',
    type: 'list',
    child: [
      {
        name: '断裂线',
        type: 'line',
        color: '#FF0000',
        border: null,
        active: true,
        width: '50%'
      },
      {
        name: '断裂层',
        type: 'area',
        color: '#FF0000',
        border: '1px dashed #f85c13',
        active: true,
        width: '50%'

      }
    ]
  },
  


  '沉积': {
    name: '沉积',
    type: 'list',
    child: [
      {
        name: '台地相',
        type: 'area',
        color: '#D2691E',
        border: '1px dashed #f85c13',
        active: true,
        width: '50%'
      },
      // {
      //   name: '滨岸-陆鹏相',
      //   type: 'area',
      //   color: 'rgba(255,255,255,0.1)',
      //   border: '1px dashed #f85c13',
      //   active: true,
      //   width: '50%'

      // },
      {
        name: '斜坡-盆地相',
        type: 'area',
        color: '#E24545',
        border: '1px dashed #f85c13',
        active: true,
        width: '50%'

      },
      {
        name: '深水陆棚-盆地相',
        type: 'area',
        color: '#08E4FC',
        border: '1px dashed #f85c13',
        active: true,
        width: '50%'

      },
      {
        name: '潮间-潮下带',
        type: 'area',
        color: '#059BFF',
        border: '1px dashed #f85c13',
        active: true,
        width: '50%'

      },
      {
        name: '三角洲平原',
        type: 'area',
        color: '#7DB834',
        border: '1px dashed #f85c13',
        active: true,
        width: '50%'

      },
      {
        name: '三角洲前缘',
        type: 'area',
        color: '#E9EC0D',
        border: '1px dashed #f85c13',
        active: true,
        width: '50%'

      },

    ]
  },
  '烃源岩': {
    name: '烃源岩',
    type: 'list',
    child: [
      {
        name: 'Ⅰ类烃源岩',
        type: 'area',
        color: '#FFE040',
        border: '1px dashed #f85c13',
        active: true,
        width: '50%'
      },
      {
        name: 'Ⅱ类烃源岩',
        type: 'area',
        color: '#FFF492',
        border: '1px dashed #f85c13',
        active: true,
        width: '50%'

      },
      {
        name: '非烃源区',
        type: 'area',
        color: '#FAFBBA',
        border: '1px dashed #f85c13',
        active: true,
        width: '50%'

      },

    ]
  },
  '储层': {
    name: '储层',
    type: 'list',
    child: [
      {
        name: 'Ⅰ类储层',
        type: 'area',
        color: '#0000CD',
        border: '1px dashed #f85c13',
        active: true,
        width: '50%'
      },
      {
        name: 'Ⅱ类储层',
        type: 'area',
        color: '#1E90FF',
        border: '1px dashed #f85c13',
        active: true,
        width: '50%'

      },
      {
        name: 'Ⅲ类储层',
        type: 'area',
        color: '#87CEFA',
        border: '1px dashed #f85c13',
        active: true,
        width: '50%'

      },
      {
        name: 'Ⅳ类或非储层区',
        type: 'area',
        color: '#B0E2FF',
        border: '1px dashed #f85c13',
        active: true,
        width: '50%'

      }
    ]
  },
  '储盖': {
    name: '储盖',
    type: 'list',
    child: [
      {
        name: 'Ⅰ类储盖',
        type: 'area',
        color: '#006400',
        border: '1px dashed #f85c13',
        active: true, width: '50%'
      },
      {
        name: 'Ⅱ类储盖',
        type: 'area',
        color: '#008B45',
        border: '1px dashed #f85c13',
        active: true, width: '50%'

      },
      {
        name: 'Ⅲ类储盖',
        type: 'area',
        color: '#66CDAA',
        border: '1px dashed #f85c13',
        active: true, width: '50%'

      }
    ]
  },
  '有利区带': {
    name: '有利区带',
    type: 'list',
    child: [
      {
        name: 'Ⅰ类',
        type: 'area',
        color: '#4B0082',
        border: '1px dashed #f85c13',
        active: true, width: '50%'
      },
      {
        name: 'Ⅱ类',
        type: 'area',
        color: '#7B2CBF',
        border: '1px dashed #f85c13',
        active: true, width: '50%'

      },
      {
        name: 'Ⅲ类',
        type: 'area',
        color: '#C77DFF',
        border: '1px dashed #f85c13',
        active: true, width: '50%'

      }
    ]
  },
  '划界': {
    name: '划界',
    type: 'list',
    child: [
      {
        name: '中国划界点',
        type: 'point',
        color: '#8B0000',
        active: true,
        width: '50%'
      },
      {
        name: '韩国划界点',
        type: 'point',
        color: '#006400',
        active: true,
        width: '50%'
      },
      {
        name: '中国大陆领海基线',
        type: 'line',
        color: '#FF0000',
        border: '1px dashed #f85c13',
        active: true,
        width: '50%'

      },
      {
        name: '韩国领海基线',
        type: 'line',
        color: '#00FF00',
        border: '1px dashed #f85c13',
        active: true,
        width: '50%'

      },
      {
        name: '韩国单方面柱状矿权线',
        type: 'area',
        color: '#F0FFF0',
        border: '1px dashed #f85c13',
        active: true,
        width: '50%'

      },
      {
        name: '黄海谷轴参考线',
        type: 'area',
        color: '#FA8072',
        border: '1px dashed #f85c13',
        active: true,
        width: '50%'

      },
      {
        name: '岸线等比例线',
        type: 'area',
        color: '#FF4500',
        border: '1px dashed #f85c13',
        active: true,
        width: '50%'

      },
      {
        name: '李承晚线',
        type: 'area',
        color: '#6495ED',
        border: '1px dashed #f85c13',
        active: true,
        width: '50%'

      },
      {
        name: '全海域基线中间线',
        type: 'area',
        color: '#ff4500',
        border: '1px dashed #f85c13',
        active: true,
        width: '50%'

      },
      
    ],
  },
  '地化异常评价': {
    name: '地化异常评价',
    type: 'list',
    child: [
      {
        name: '甲烷含量异常',
        type: 'ramp',
        colormap: ['#E24545','#FE5A08','#F1D100','#7DB834','#06C9DF','#059BFF','#6868FF',].reverse(),
        interval: [12.0, 96],
        active: true,
        width: '100%'
      },
      {
        name: '重烃含量异常',
        type: 'ramp',
        colormap: ['#E24545', '#FE5A08', '#F1D100', '#7DB834', '#06C9DF', '#059BFF', '#6868FF'].reverse(),
        interval: [0.6, 1.8],
        active: true,
        width: '100%'
      },
      {
        name: '微生物含量异常',
        type: 'ramp',
        colormap: ['#E24545', '#FE5A08', '#F1D100', '#7DB834', '#06C9DF', '#059BFF', '#6868FF'].reverse(),
        interval: [16, 195],
        active: true,
        width: '100%'
      },

    ],
  },
  '重磁异常评价': {
    name: '重磁异常评价',
    type: 'list',
    child: [
      {
        name: '磁力异常',
        type: 'ramp',
        colormap: ['#E24545', '#FE5A08', '#F1D100', '#7DB834', '#06C9DF', '#059BFF', '#6868FF'].reverse(),
        interval: [-200, 350],
        active: true,
        width: '100%'
      },
      {
        name: '布格重力异常',
        type: 'ramp',
        colormap: ['#E24545', '#FE5A08', '#F1D100', '#7DB834', '#06C9DF', '#059BFF', '#6868FF'].reverse(),
        interval: [-25,40],
        active: true,
        width: '100%'
      },
      {
        name: '重力异常',
        type: 'ramp',
        colormap: ['#E24545', '#FE5A08', '#F1D100', '#7DB834', '#06C9DF', '#059BFF', '#6868FF'].reverse(),
        interval: [-25, 100],
        active: true,
        width: '100%'
      },

    ],
  },
  '参数评价': {
    name: '参数评价',
    type: 'list',
    child: [
     
      {
        name: '压力预测',
        type: 'ramp',
        colormap:['#E24545',
          '#F15A08',
          '#FE8A08',
          '#F1D100',
          '#D0E36D',
          '#A4D04E',
          '#7DB834',
          '#4CB050',
          '#4BC0B3',
          '#0099CC',
          '#0055A5',
          '#4A529A',
          '#6A4A93',
          '#7A3A99',
          '#8B4DA3',
          '#9E5AA5',
          '#A15AAB',
          '#B15BB8'].reverse(),
        interval: [0.7, 1.421],
        active: true,
        width: '100%'
      },
      {
        name: '物性指示因子',
        type: 'ramp',
        colormap: ['#E24545',
          '#F15A08',
          '#FE8A08',
          '#F1D100',
          '#D0E36D',
          '#A4D04E',
          '#7DB834',
          '#4CB050',
          '#4BC0B3',
          '#0099CC',
          '#0055A5',
          '#4A529A',
          '#6A4A93',
          '#7A3A99',
          '#8B4DA3',
          '#9E5AA5',
          '#A15AAB',
          '#B15BB8'].reverse(),
        interval: [525, 1025],
        active: true,
        width: '100%'
      },
      {
        name: '流体指示因子',
        type: 'ramp',
        colormap: ['#E24545',
          '#F15A08',
          '#FE8A08',
          '#F1D100',
          '#D0E36D',
          '#A4D04E',
          '#7DB834',
          '#4CB050',
          '#4BC0B3',
          '#0099CC',
          '#0055A5',
          '#4A529A',
          '#6A4A93',
          '#7A3A99',
          '#8B4DA3',
          '#9E5AA5',
          '#A15AAB',
          '#B15BB8'].reverse(),
        interval: [-320, 10],
        active: true,
        width: '100%'
      },

    ],
  },



}
let always = ['陆域范围']
// {
//   name: '线',
//   type: 'line',
//   color: '#0ff'
// },
// {
//   name: '面-方',
//   type: 'area',
//   color: '#0ff',
//   border: '1px solid #f00'
// },
// {
//   name: '面-圆',
//   type: 'ellipse',
//   color: '#d0d0d0',
//   border: '0px solid #00f'
// },
// {
//   name: '图片',
//   type: 'img',
//   src: '/static/img/map/point/d_xqd.png'
// },
// {
//   name: '列表',
//   type: 'list',
//   child: [
//     {
//       name: 'Ⅰ类水质',
//       type: 'area',
//       color: 'rgb(115, 178, 255)',
//     },
//     {
//       name: 'Ⅱ类水质',
//       type: 'area',
//       color: 'rgb(178, 221, 247)',
//     },
//     {
//       name: 'Ⅲ类水质',
//       type: 'area',
//       color: 'rgb(190, 177, 161)',
//     },
//     {
//       name: 'Ⅳ类水质',
//       type: 'area',
//       color: 'rgb(155, 133, 110)',
//     },
//     {
//       name: 'Ⅴ类水质',
//       type: 'area',
//       color: 'rgb(122, 98, 74)',
//     },
//   ]
// },

export {
  legendConfig,
  always
}