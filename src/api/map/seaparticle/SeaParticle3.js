import * as dat from 'dat.gui'
import CesiumPopupComponent from '@/api/map/popup.js'
import Particle3D from '@/api/map/seaparticle/modules/particle3D'
/* eslint-disable */

let particleObj3 = null
let isSetPopup = false
function loadParticle(url, type, particleHeight) {
  var viewer = window.viewer
  var colorChanel = type != 'speed' ? 'height' : 'speed'
  // console.log(colorChanel)
  // 海洋流场变化颜色表
  var oceanCurrentColorTable = [
    // [0.678, 0.847, 0.902], // 浅蓝色，表示流速较小
    [0.427, 0.682, 0.839], // 中浅蓝色
    [0.227, 0.517, 0.759], // 中蓝色
    [0.0, 0.357, 0.686], // 深蓝色
    [0.0, 0.0, 0.627], // 更深蓝色
    [0.0, 0.0, 0.4] // 最深蓝色，表示流速较大
  ]

  if (colorChanel != 'speed') {
    colorChanel = 'height'
    // 粒子颜色色带
    oceanCurrentColorTable = [
      [0.015686, 0.054902, 0.847059], // 深蓝色，
      [0.12549, 0.313725, 1.0], // 蓝色
      [0.0, 0.807843, 0.819608], // 青色
      [0.0, 0.988235, 0.0], // 绿色
      // [1.0, 1.0, 0.0], // 黄色，
      // [1.0, 0.647059, 0.0], // 橙色
      [1.0, 0.0, 0.0] // 红色，
    ]
  }
  // console.log(colorChanel)
  // console.log(oceanCurrentColorTable)
  // 粒子系统配置
  const systemOptions = {
    maxParticles: 25000, // 最大粒子数(会自动取平方数)
    particleHeight: particleHeight, // 粒子高度
    fadeOpacity: 0.996, // 拖尾透明度
    dropRate: 0.003, // 粒子重置率
    dropRateBump: 0.01, // 随速度增加的粒子重置率百分比，速度越快越密集，
    // 最终的粒子重置率particleDropRate = dropRate + dropRateBump * speedNorm;
    speedFactor: 2.0, // 粒子速度
    lineWidth: 1.0, // 线宽
    dynamic: true // 是否动态运行
  }
  // console.log('粒子高度======')
  // console.log(systemOptions.particleHeight)
  fetch(url)
    .then((response) => response.blob())
    .then((blob) => {
      // 将 blob 传递给 Particle3D
      particleObj3 = new Particle3D(viewer, {
        input: blob,
        colorTable: oceanCurrentColorTable,
        colour: colorChanel, // 默认speed，height为第二通道，将温度传到了height通道中实现温度设色
        userInput: systemOptions,
        fields: {
          U: 'water_u',
          V: 'water_v',
          tem: 'tem',
          H: 'tem',
          W: ''
        }
      })

      particleObj3.init().then((res) => {
        particleObj3.show()
        addClickHandler(particleObj3.data)
        // addGUI()
       
      })

      // 更新粒子系统配置的回调函数
      function updateOptions() {
        particleObj3.optionsChange(systemOptions)
      }
      // setTimeout(() => {
      //   updateOptions()
      // }, 100)

      // function addGUI() {
      //   // 初始化dat.GUI
      //   const gui = new dat.GUI()

      //   // 添加控制面板选项
      //   gui
      //     .add(systemOptions, 'maxParticles', 1000, 1000000)
      //     .onChange(updateOptions)
      //   gui
      //     .add(systemOptions, 'particleHeight', 0.0, 500000)
      //     .onChange(updateOptions)
      //   gui.add(systemOptions, 'fadeOpacity', 0.0, 1.0).onChange(updateOptions)
      //   gui.add(systemOptions, 'dropRate', 0.0, 10).onChange(updateOptions)
      //   gui.add(systemOptions, 'dropRateBump', 0.0, 10).onChange(updateOptions)
      //   gui.add(systemOptions, 'speedFactor', 0.0, 10).onChange(updateOptions)
      //   gui.add(systemOptions, 'lineWidth', 0.0, 10).onChange(updateOptions)
      //   gui.add(systemOptions, 'dynamic').onChange(updateOptions)
      //   gui.close()
      // }

      return particleObj3
    })

  // systemOptions.fadeOpacity = 0.9
  // particleObj3.optionsChange(systemOptions) // 更新粒子系统配置

  // particleObj3.hide() // 停止粒子系统
  // particleObj3.remove() // 移除粒子系统
}
//点击获取粒子值
var ClickHandler
function addClickHandler(data) {
  var viewer = window.viewer
  // 初始化事件处理器
  ClickHandler = new Cesium.ScreenSpaceEventHandler(viewer.scene.canvas)
  // 监听鼠标点击事件

  ClickHandler.setInputAction(function (click) {
    // console.log(click.position)
    var cartesian = viewer.scene.pickPosition(click.position)
    // console.log(cartesian)
    if (Cesium.defined(cartesian)) {
      var cartographic = Cesium.Cartographic.fromCartesian(cartesian)
      var lon = Cesium.Math.toDegrees(cartographic.longitude)
      var lat = Cesium.Math.toDegrees(cartographic.latitude)

      // 判断点击位置是否在数据范围内
      if (
        lon >= data.lon.min &&
        lon <= data.lon.max &&
        lat >= data.lat.min &&
        lat <= data.lat.max
      ) {
        // 根据经纬度计算索引
        var lonIndex = Math.floor(
          ((lon - data.lon.min) / (data.lon.max - data.lon.min)) *
            (data.dimensions.lon - 1)
        )
        var latIndex = Math.floor(
          ((lat - data.lat.min) / (data.lat.max - data.lat.min)) *
            (data.dimensions.lat - 1)
        )
        var index = latIndex * data.dimensions.lon + lonIndex

        // 获取对应的数据
        var H = data.H.array[index].toFixed(6)
        var U = data.U.array[index].toFixed(6)
        var V = data.V.array[index].toFixed(6)
        var W = data.W.array[index].toFixed(6)
        var tem = data.tem.array[index].toFixed(6)
        var dem = data.dem.array[index].toFixed(6)
        var hs = data.hs.array[index].toFixed(6)
        var dirm = data.dirm.array[index].toFixed(6)
        // 输出点击位置的数据
        
        if (isSetPopup) {
          // 已有窗口
          CesiumPopupComponent.clearAllPopups()
          setPopup(H, U, V, W, tem, dem, dirm, hs, lon, lat)
        } else {
          //无窗口
          setPopup(H, U, V, W, tem, dem, dirm, hs, lon, lat)
          isSetPopup = true
        }
      } else {
        
        CesiumPopupComponent.clearAllPopups()
      }
    }
  }, Cesium.ScreenSpaceEventType.LEFT_CLICK)
}
//设置弹窗
// 新增函数来取消事件监听
function removeClickHandler() {
  if (ClickHandler) {
    ClickHandler.removeInputAction(Cesium.ScreenSpaceEventType.LEFT_CLICK)
    ClickHandler = null
   
  }
}
let popupComponent
function setPopup(H, U, V, W, tem, dem, dirm, hs, lon, lat) {
  let title = '海流3层'
  // 创建一个新的 CesiumPopup 组件实例
  popupComponent = new CesiumPopupComponent(window.viewer, {
    longitude: lon,
    latitude: lat,
    height: 0,
    htmlContent:
      `<div class="title">` +
      title +
      `</div><div class="content">
    <div class="info-only"><span class="content-key">U分量:</span><span class="content-value">${U} </span> <span class="content-unit">(m/s)</span> </div>
    <div class="info-only"><span class="content-key">V分量:</span><span  class="content-value">${V} </span><span class="content-unit">(m/s)</span> </div>
    <div class="info-only"><span class="content-key">温度 : </span><span  class="content-value">${tem} </span><span class="content-unit">°C</span> </div>
    <div class="info-only"><span class="content-key">波高: </span><span  class="content-value">${hs}</span><span  class="content-unit">m </span> </div>
      <div class="info-only"><span class="content-key">波向: </span><span  class="content-value">${dirm}</span><span class="content-unit">°</span> </div>
      <div class="info-only"><span class="content-key">地形高程: </span><span  class="content-value">${dem}</span><span class="content-unit">m  </span></div>
  </div>
  `,
    popupClassName: 'earth-popup-imgbg-blue',
    popPosition: 'leftbottom'
  })

  // 更新位置
  popupComponent.updatePosition(lon, lat, 1000)

  // 移除弹出框
  // popupComponent.removePopup()
}
function removeParticlePopuop() {
  // 移除弹出框
  if (popupComponent) {
    popupComponent.removePopup()
  }
}
function removeParticle() {
  if (particleObj3) {
    particleObj3.remove()
    particleObj3 = null
  } else {
    // console.log('粒子系统未加载或已被移除')
  }
  CesiumPopupComponent.clearAllPopups()
  removeClickHandler()
}
export default {
  loadParticle,
  addClickHandler,
  removeParticle,
  removeParticlePopuop,
  removeClickHandler
}
