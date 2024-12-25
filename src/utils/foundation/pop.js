/*
 * @Author: UMR
 * @Date: 2024-12-24 14:03:59
 * @LastEditors: Do not edit
 * @LastEditTime: 2024-12-24 16:41:22
 * @FilePath: \smart-ocean\src\utils\foundation\pop.js
 */
export const buoyLeft = [
  {
    device: '风速风向仪',
    data: [
      {
        name: '瞬时风速',
        value: '2.3',
        unit: 'm/s',
        icon: 'fs'
      },
      {
        name: '平均风速',
        value: '2.6',
        unit: 'm/s',
        icon: 'fs'
      },
      {
        name: '‌风向',
        value: '76',
        unit: '°',
        icon: 'fx'
      }
    ]
  },
  {
    device: '温湿度传感器',
    data: [
      {
        name: '温度测量',
        value: '23',
        unit: '℃',
        icon: 'qw'
      },
      {
        name: '湿度测量',
        value: '36',
        unit: '%RH',
        icon: 'sd'
      }
    ]
  },
  {
    device: '大气压力传感器',
    data: [
      {
        name: '大气压强',
        value: '130',
        unit: 'Pa',
        icon: 'qy'
      }
    ]
  }
]

export const buoyRight = [
  {
    device: '能见度仪',
    data: [
      {
        name: '能见度',
        value: '0.5',
        unit: 'km',
        icon: 'njd'
      }
    ]
  },
  {
    device: '雨量计',
    data: [
      {
        name: '降水量',
        value: '300',
        unit: 'mm',
        icon: 'jy'
      }
    ]
  }
]

export const satelliteLift = [
  {
    device: 'CSAT3B 三维超声风温仪',
    data: [
      {
        name: '水平方向风速',
        value: '2.3',
        unit: 'm/s',
        icon: 'fs'
      },
      {
        name: '垂直方向风速‌',
        value: '2.6',
        unit: 'm/s',
        icon: 'fs'
      },
      {
        name: '超声温度',
        value: '32',
        unit: '℃',
        icon: 'qw'
      },
      {
        name: '声波温度‌',
        value: '28',
        unit: '℃',
        icon: 'qw'
      },
      {
        name: '声速',
        value: '500',
        unit: 'm/s',
        icon: 'ss'
      }
    ]
  },
  {
    device: 'CNR4  四辐射分量',
    data: [
      {
        name: '短波辐射',
        value: '2.3',
        unit: 'W/㎡',
        icon: 'icon'
      },
      {
        name: '长波辐射',
        value: '3.6',
        unit: 'W/㎡',
        icon: 'icon'
      }
    ]
  }
]

export const satelliteRight = [
  {
    device: '涡动相关传感器',
    data: [
      {
        name: '‌三维风速',
        value: '2.8',
        unit: 'm/s',
        icon: 'fs'
      },
      {
        name: '风向‌',
        value: '130',
        unit: '°',
        icon: 'fx'
      },
      {
        name: '‌湿度',
        value: '32',
        unit: '%RH',
        icon: 'sd'
      },
      {
        name: '大气压力‌',
        value: '13',
        unit: 'Pa',
        icon: 'qy'
      },
      {
        name: '‌二氧化碳通量',
        value: '20',
        unit: 'kPa',
        icon: 'co2'
      },
      {
        name: '显热通量和潜热通量',
        value: '20',
        unit: 'W/㎡',
        icon: 'wd'
      },
      {
        name: '氧气浓度‌',
        value: '20',
        unit: '%',
        icon: 'yq'
      }
    ]
  },
  {
    device: '三维风速仪',
    data: [
      {
        name: '风速',
        value: '2.8',
        unit: 'm/s',
        icon: 'fs'
      },
      {
        name: '风向',
        value: '130',
        unit: '°',
        icon: 'fx'
      }
    ]
  }
]

export const submersiblesLift = [
  {
    device: '溶解氧传感器',
    data: [
      {
        name: '溶解氧（DO）浓度‌',
        value: '200',
        unit: 'mg/L',
        icon: 'yq'
      }
    ]
  },
  {
    device: '甲烷传感器',
    data: [
      {
        name: '甲烷（CH4）浓度‌',
        value: '20',
        unit: 'mg/m',
        icon: 'jw'
      }
    ]
  },
  {
    device: '二氧化碳传感器',
    data: [
      {
        name: '二氧化碳（CO2）浓度',
        value: '13',
        unit: 'ppm',
        icon: 'co2'
      }
    ]
  }
]

export const submersiblesRight = [
  {
    device: '硝酸盐传感器',
    data: [
      {
        name: '硝酸盐含量‌',
        value: '20',
        unit: 'mg/L',
        icon: 'xsy'
      }
    ]
  },
  {
    device: 'PH传感器',
    data: [
      {
        name: 'PH值含量',
        value: '32',
        unit: 'PH',
        icon: 'ph'
      }
    ]
  },
  {
    device: '营养盐',
    data: [
      {
        name: '营养盐',
        value: '23.3',
        unit: 'ppm',
        icon: 'yd'
      }
    ]
  }
]

export const sonarLift = [
  {
    device: '海底地震仪',
    data: [
      {
        name: '地震波',
        value: '--',
        unit: 'km/s',
        icon: 'icon'
      }
    ]
  },
  {
    device: '海底磁力仪',
    data: [
      {
        name: '地磁场强度',
        value: '20',
        unit: 'Y',
        icon: 'icon'
      }
    ]
  }
]

export const sonarRight = [
  {
    device: '海底电磁仪',
    data: [
      {
        name: '地磁场强度',
        value: '20',
        unit: 'Y',
        icon: 'icon'
      },
      {
        name: '地磁场方向',
        value: '35',
        unit: 'Y',
        icon: 'icon'
      },
      {
        name: '地磁场垂直梯度',
        value: '15',
        unit: '°',
        icon: 'icon'
      }
    ]
  },
  {
    device: '结构健康监测系统的应力应变传感器',
    data: []
  }
]
