export default [
  {
    index: 0,
    name: "水文数据管理",
    children: [ 
      {
        index: 0,
        name: "定点数据",
        path: "/hydrology/fixed",
      },
      {
        index: 1,
        name: "走航数据",
        path: "/hydrology/sailing",
      },
      {
        index: 2,
        name: "浮标数据",
        path: "/hydrology/buoy",
      },
    ],
  },
  {
    index: 1,
    name: "地质取样数据管理",
    children: [ 
      {
        index: 0,
        name: "地质取样",
        path: "/sampling",
      },
    ],
  },
  {
    index: 2,
    name: "海洋地球物理调查",
    children: [
      {
        index: 0,
        name: "海洋地球物理调查",
        path: "/ocean",
      },
    ],
  },
  {
    index: 3,
    name: "构造特征数据管理",
    children: [
      {
        index: 0,
        name: "大地构造",
        path: "/construct/ground",
      },
       {
        index: 1,
        name: "地层",
        path: "/construct/formation",
      },
       {
        index: 2,
        name: "断层",
        path: "/construct/fault",
      },
    ],
  },
  {
    index: 4,
    name: "有利圈闭数据管理",
    children: [
      {
        index: 0,
        name: "有利圈闭",
        path: "/trap",
      },
    ],
  },
  {
    index: 5,
    name: "目标区数据管理",
    children: [
      {
        index: 0,
        name: "目标区",
        path: "/target",
      },
    ],
  },
  {
    index: 6,
    name: "统计分析配置",
    children: [
      {
        index: 0,
        name: "南黄海盆地统计分析",
        path: "/statistics/basin",
      },
      {
        index: 1,
        name: "有利区带统计分析",
        path: "/statistics/advantageous",
      },
      {
        index: 2,
        name: "目标区统计分析",
        path: "/statistics/target",
      },
    ],
  },
  

  {
    index: 7,
    name: "系统管理",
    children: [
      {
        index: 0,
        name: "用户管理",
        path: "/system/user",
      },
      {
        index: 1,
        name: "角色管理",
        path: "/system/role",
      },
      {
        index: 2,
        name: "菜单管理",
        path: "/system/menu",
      },
      {
        index: 3,
        name: "系统日志",
        path: "/system/log",
      },
    ],
  },
];
