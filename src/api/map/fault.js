import * as dat from 'dat.gui'
import CesiumPopupComponent from '@/api/map/popup.js'

let gui
let FalultLayers = []
let viewer = window.viewer
let config = {
  selectedTerrain: '',
  offset: 0,
  scale: 3,
  color: '#00ffff'
}
let terrainOptions = [
  { name: '断层1', file: 'dc1_84_dz.json' },
  { name: '断层3', file: 'dc3_84_dz.json' },
  { name: '断层4', file: 'dc4_84_dz.json' },
  { name: '断层5', file: 'dc5_84_dz.json' },
  { name: '断层6', file: 'dc6_84_dz.json' },
  { name: '断层7', file: 'dc7_84_dz.json' },
  { name: '断层8', file: 'dc8_84_dz.json' },
  { name: '断层9', file: 'dc9_84_dz.json' },
  { name: '断层10', file: 'dc10_84_dz.json' },
  { name: '断层11', file: 'dc11_84_dz.json' },
  { name: '断层12', file: 'dc12_84_dz.json' },
  { name: '断层13', file: 'dc13_84_dz.json' },
  { name: '断层14', file: 'dc14_84_dz.json' },
  { name: '断层15', file: 'dc15_84_dz.json' },
  { name: '断层16', file: 'dc16_84_dz.json' },
  { name: '断层17', file: 'dc17_84_dz.json' },
  { name: '断层18', file: 'dc18_84_dz.json' },
  { name: '断层19', file: 'dc19_84_dz.json' },
  { name: '断层20', file: 'dc20_84_dz.json' },
  { name: '断层21', file: 'dc21_84_dz.json' },
  { name: '断层22', file: 'dc22_84_dz.json' },
  { name: '断层23', file: 'dc23_84_dz.json' },
  { name: '断层24', file: 'dc24_84_dz.json' },
  { name: '断层25', file: 'dc25_84_dz.json' },
  { name: '断层26', file: 'dc26_84_dz.json' },
  { name: '断层27', file: 'dc27_84_dz.json' },
  { name: '断层28', file: 'dc28_84_dz.json' },
  { name: '断层29', file: 'dc29_84_dz.json' },
  { name: '断层30', file: 'dc30_84_dz.json' },
  { name: '断层31', file: 'dc31_84_dz.json' },
  { name: '断层32', file: 'dc32_84_dz.json' },
  { name: '断层33', file: 'dc33_84_dz.json' },
  { name: '断层34', file: 'dc34_84_dz.json' },
  { name: '断层35', file: 'dc35_84_dz.json' },
  { name: '断层36', file: 'dc36_84_dz.json' },
  { name: '断层37', file: 'dc37_84_dz.json' },
  { name: '断层38', file: 'dc38_84_dz.json' }
]
let globalConfig = {
  enableGlobalControl: true,
  globalOffset: 0,
  globalScale: 3,
  globalColor: '#00ffff'
}
// 防抖函数
function debounce(func, delay) {
  let timer
  return function (...args) {
    if (timer) clearTimeout(timer)
    timer = setTimeout(() => func.apply(this, args), delay)
  }
}

// 节流函数
function throttle(func, limit) {
  let inThrottle
  return function (...args) {
    if (!inThrottle) {
      func.apply(this, args)
      inThrottle = true
      setTimeout(() => (inThrottle = false), limit)
    }
  }
}

//初始化控制面板
// 防抖包装函数（500毫秒延迟）
const debouncedUpdateAllTerrains = debounce(updateAllTerrains, 500)
const debouncedUpdateTerrain = debounce(updateTerrain, 500)

// 初始化控制面板
function initGUI() {
  if (config.selectedTerrain == '') {
    globalConfig.enableGlobalControl = true
    debouncedUpdateAllTerrains(config, globalConfig, terrainOptions)
  }
  // gui = new dat.GUI()

  // // 全局控制分组
  // const globalFolder = gui.addFolder('全局断层控制')
  // globalFolder
  //   .add(globalConfig, 'enableGlobalControl')
  //   .name('启用全局控制')
  //   .onChange(() =>
  //     debouncedUpdateAllTerrains(config, globalConfig, terrainOptions)
  //   )
  // globalFolder
  //   .add(globalConfig, 'globalOffset', -50000, 50000)
  //   .name('全局偏移系数')
  //   .onChange(() =>
  //     debouncedUpdateAllTerrains(config, globalConfig, terrainOptions)
  //   )
  // globalFolder
  //   .add(globalConfig, 'globalScale', 1, 10)
  //   .name('全局拉伸系数')
  //   .onChange(() =>
  //     debouncedUpdateAllTerrains(config, globalConfig, terrainOptions)
  //   )
  // globalFolder
  //   .addColor(globalConfig, 'globalColor')
  //   .name('全局颜色')
  //   .onChange(() =>
  //     debouncedUpdateAllTerrains(config, globalConfig, terrainOptions)
  //   )
  // globalFolder.close()

  // // 单独断层控制分组
  // const terrainFolder = gui.addFolder('单独断层控制')
  // terrainFolder
  //   .add(
  //     config,
  //     'selectedTerrain',
  //     terrainOptions.map((o) => o.file)
  //   )
  //   .name('选择地形')
  //   .onChange(() => debouncedUpdateTerrain(config, globalConfig))
  // terrainFolder
  //   .add(config, 'offset', -50000, 50000)
  //   .name('偏移系数')
  //   .onChange(() => debouncedUpdateTerrain(config, globalConfig))
  // terrainFolder
  //   .add(config, 'scale', 1, 10)
  //   .name('拉伸系数')
  //   .onChange(() => debouncedUpdateTerrain(config, globalConfig))
  // terrainFolder
  //   .addColor(config, 'color')
  //   .name('颜色')
  //   .onChange(() => debouncedUpdateTerrain(config, globalConfig))
  // terrainFolder.close()
}
//不使用Collection

var isSetPopup = false
// 加载地质层函数
async function LoadFalultLayer(url, offset, scale, ColorSurface, name) {
  const viewer = window.viewer
  const response = await fetch(url)
  const geojson = await response.json()
  const features = geojson.features
  const geometries = []
  const colors = []
  const outlineGeometries = []
  const outlineColors = []

  features.forEach((feature) => {
    if (feature.geometry.coordinates && feature.properties.ID % 2 == 1) {
      //抽稀，加载偶数的
      const coordinates = feature.geometry.coordinates
      const contourHeight = feature.properties.CONTOUR

      const positions = coordinates.map((coord) =>
        Cesium.Cartesian3.fromDegrees(
          coord[0],
          coord[1],
          contourHeight * scale - offset
        )
      )

      // 外边框线条（白色）
      outlineGeometries.push(
        new Cesium.PolylineGeometry({
          positions: positions,
          width: 1.0 // 较宽的线条作为边框
        })
      )
      outlineColors.push(
        Cesium.ColorGeometryInstanceAttribute.fromColor(Cesium.Color.BLACK)
      )

      // 内层实际显示的线条
      geometries.push(
        new Cesium.PolylineGeometry({
          positions: positions,
          width: 5.0 // 较窄的彩色线条
        })
      )
      colors.push(
        Cesium.ColorGeometryInstanceAttribute.fromColor(
          Cesium.Color.fromCssColorString(ColorSurface) // 实际颜色
        )
      )
    }
  })

  // 添加外边框
  const outlineInstances = outlineGeometries.map((geometry, index) => {
    return new Cesium.GeometryInstance({
      geometry: geometry,
      id: ' ' + name,
      attributes: {
        color: outlineColors[index]
      }
    })
  })

  const outlinePrimitive = new Cesium.Primitive({
    geometryInstances: outlineInstances,
    appearance: new Cesium.PolylineColorAppearance()
  })
  viewer.scene.primitives.add(outlinePrimitive)
  FalultLayers.push(outlinePrimitive) // 存储外边框地层

  // 添加内层线条
  const instances = geometries.map((geometry, index) => {
    return new Cesium.GeometryInstance({
      geometry: geometry,
      id: '' + name,
      attributes: {
        color: colors[index]
      }
    })
  })
  const innerPrimitive = new Cesium.Primitive({
    geometryInstances: instances,
    appearance: new Cesium.PolylineColorAppearance()
  })
  viewer.scene.primitives.add(innerPrimitive)
  FalultLayers.push(innerPrimitive) // 存储内层地层

  // 设置单击事件的处理句柄，如果尚未设置
  if (!handler) {
    handler = new Cesium.ScreenSpaceEventHandler(viewer.scene.canvas)
    handler.setInputAction(function (movement) {
      var cartesian = viewer.scene.pickPosition(movement.position)
      var pick = viewer.scene.drillPick(movement.position) // drillPick 深度测试
      pick = pick.filter((item) => typeof item.id === 'string')
      delete pick[Object.keys(pick).pop()]
      var cartographic, lon, lat

      if (cartesian == undefined) {
        CesiumPopupComponent.clearAllPopups()
        return
      } else if (pick.length <= 1) {
        CesiumPopupComponent.clearAllPopups()
      } else {
        cartographic = Cesium.Cartographic.fromCartesian(cartesian)
        lon = Cesium.Math.toDegrees(cartographic.longitude)
        lat = Cesium.Math.toDegrees(cartographic.latitude)
      }

      // 输出点击位置的数据
     

      if (pick == undefined) {
        CesiumPopupComponent.clearAllPopups()
      }
      if (Cesium.defined(pick) && pick[0].id) {
        //S1-不包括海水面
        if (!isSetPopup) {
          setPopup(pick[0].id, lon, lat)
          isSetPopup = true
        }
        if (pick[0].id && isSetPopup == true) {
          //S2- 存在地层且存在弹窗
          if (isSetPopup) {
            removeUnderLayerPopuop()
            updateSelectLayers(pick[0])
            setPopup(pick[0].id, lon, lat)
          } else {
            setPopup(pick[0].id, lon, lat)
            isSetPopup = true
          }
          // alert('不存在海水面-被选取' + pick[0].id)
        }
      }
      // else {
      //   // S1-存在海水面
      //   if (isSetPopup && pick.length > 1) {
      //     //S2-存在弹窗清除所有已设置的弹出窗口
      //     removeUnderLayerPopuop()
      //     updateSelectLayers(pick[1])
      //     setPopup(pick[1].id, lon, lat)
      //   } else if (pick.length > 1) {
      //     setPopup(pick[1].id, lon, lat)
      //     isSetPopup = true
      //   }
      // }
    }, Cesium.ScreenSpaceEventType.LEFT_CLICK)
  }
}

// 定义全局变量来存储事件处理程序
var handler
// 新增函数来取消事件监听
function removeClickHandler() {
  if (handler) {
    handler.removeInputAction(Cesium.ScreenSpaceEventType.LEFT_CLICK)
    handler = null
    
  }
}
var selectedLayer = null // 当前选中的图层
var selectedID = null // 当前选中的图层
var originalColor = null // 原始颜色
// // 新增一个函数来更新对象的颜色
function updateSelectLayers(pick_in, orColor, NewColor) {
  try {
    if (pick_in.id && typeof pick_in.id === 'string') {
      // 修改被点击对象的颜色
      if (!selectedLayer) {
        originalColor = Cesium.Color.AQUA
        updateObjectColor(pick_in.primitive, pick_in.id, Cesium.Color.WHITE) // 假设用红色表示选中
      } else {
        // 已有，先恢复，再选中
        originalColor = Cesium.Color.AQUA
        updateObjectColor(selectedLayer, selectedID, originalColor) // 假设用红色表示选中
        updateObjectColor(pick_in.primitive, pick_in.id, Cesium.Color.WHITE) // 假设用红色表示选中
      }
    }
  } catch (error) {
    console.log(error)
  }
}
function updateObjectColor(primitive, instanceId, newColor) {
  selectedLayer = primitive // 存储primitive
  selectedID = instanceId // 存储id
  const attributes = primitive.getGeometryInstanceAttributes(instanceId)
  if (attributes && attributes.color) {
    // 设置新的颜色 (比如黑色 #000000)
    attributes.color = Cesium.ColorGeometryInstanceAttribute.toValue(newColor)

    // 关键步骤：修改primitive.appearance.material.uniforms.color
    // 检查primitive的appearance类型，并更新材质颜色
    if (
      primitive.appearance.material &&
      primitive.appearance.material.uniforms
    ) {
      primitive.appearance.material.uniforms.color = newColor
    } else {
      // 如果appearance没有材质，那么需要替换appearance为支持材质的类型
      primitive.appearance = new Cesium.PolylineMaterialAppearance({
        material: Cesium.Material.fromType('Color', {
          color: newColor
        }),
        translucent: false
      })
    }

    // 强制渲染
    window.viewer.scene.requestRender()
  }
}
var popupComponent
function removeUnderLayerPopuop() {
  // 移除弹出框
  if (popupComponent) {
    popupComponent.removePopup()
  }
}
function setPopup(pidckid, lon, lat) {
  let content = pidckid
  let title = '断层'
  // 创建一个新的 CesiumPopup 组件实例
  popupComponent = new CesiumPopupComponent(window.viewer, {
    longitude: lon,
    latitude: lat,
    height: 0,
    htmlContent:
      `<div class="title">` +
      title +
      `</div><div class="content" style="width:300px">` +
      content +
      `</div>`,
    popupClassName: 'earth-popup-imgbg-blue',
    popPosition: 'leftbottom'
  })

  // 更新位置
  popupComponent.updatePosition(lon, lat, -3000)
}

function removeGUI() {
  if (gui) {
    gui.destroy()
    gui = null // Clear the GUI instance
  }
}
function removeAllFalultLayers() {
  const viewer = window.viewer
  FalultLayers.forEach((layer) => {
    viewer.scene.primitives.remove(layer)
  })
  FalultLayers = [] // 清空数组
  CesiumPopupComponent.clearAllPopups()
  removeClickHandler()
}
//更新地形
function updateTerrain(config, globalConfig) {
  const viewer = window.viewer

  if (!globalConfig.enableGlobalControl) {
    // viewer.scene.primitives.removeAll()
    removeAllFalultLayers()

    LoadFalultLayer(
      `/json/dc/${config.selectedTerrain}`,
      config.offset,
      config.scale,
      config.color
    )
  }
}

//更新全部地形
function updateAllTerrains(config, globalConfig, terrainOptions) {
  var viewer = window.viewer
  if (globalConfig.enableGlobalControl) {
    // viewer.scene.primitives.removeAll()
    removeAllFalultLayers()
    terrainOptions.forEach((option) => {
      LoadFalultLayer(
        `/json/dc/${option.file}`,
        globalConfig.globalOffset,
        globalConfig.globalScale,
        globalConfig.globalColor,
        option.name
      )
    })
  } else {
    updateTerrain(config, globalConfig)
  }
}
function updateTerrainExtraScale(val) {
  globalConfig.globalScale = val
  updateAllTerrains(config, globalConfig, terrainOptions)
}
// 加载地质层函数 -测试多线
async function LoadFalultLayerTest(url, offset, scale, ColorSurface) {
  
  const viewer = window.viewer
  const response = await fetch(url)
  const geojson = await response.json()
  const features = geojson.features
  const geometries = []
  const colors = []
  const outlineGeometries = []
  const outlineColors = []

  features.forEach((feature) => {
    if (
      feature.geometry &&
      feature.geometry.coordinates &&
      feature.properties.ID % 2 == 1
    ) {
      // Process both LineString and MultiLineString
      const geometryType = feature.geometry.type
      const contourHeight = feature.properties.CONTOUR

      if (geometryType === 'LineString') {
        processCoordinates(feature.geometry.coordinates, contourHeight)
      } else if (geometryType === 'MultiLineString') {
        feature.geometry.coordinates.forEach((lineStringCoords) => {
          processCoordinates(lineStringCoords, contourHeight)
        })
      }
    }
  })

  function processCoordinates(coordinates, contourHeight) {
    const positions = coordinates.map((coord) =>
      Cesium.Cartesian3.fromDegrees(
        coord[0],
        coord[1],
        contourHeight * scale - offset
      )
    )

    // Add outline geometries
    outlineGeometries.push(
      new Cesium.PolylineGeometry({
        positions: positions,
        width: 1.0
      })
    )
    outlineColors.push(
      Cesium.ColorGeometryInstanceAttribute.fromColor(Cesium.Color.BLACK)
    )

    // Add inner geometries
    geometries.push(
      new Cesium.PolylineGeometry({
        positions: positions,
        width: 5.0
      })
    )
    colors.push(
      Cesium.ColorGeometryInstanceAttribute.fromColor(
        Cesium.Color.fromCssColorString(ColorSurface)
      )
    )
  }

  // Add outer boundaries
  const outlineInstances = outlineGeometries.map((geometry, index) => {
    return new Cesium.GeometryInstance({
      geometry: geometry,
      id: 'outer:' + url,
      attributes: {
        color: outlineColors[index]
      }
    })
  })

  const outlinePrimitive = new Cesium.Primitive({
    geometryInstances: outlineInstances,
    appearance: new Cesium.PolylineColorAppearance()
  })
  viewer.scene.primitives.add(outlinePrimitive)
  FalultLayers.push(outlinePrimitive)

  // Add inner lines
  const instances = geometries.map((geometry, index) => {
    return new Cesium.GeometryInstance({
      geometry: geometry,
      id: 'inner' + url,
      attributes: {
        color: colors[index]
      }
    })
  })

  const innerPrimitive = new Cesium.Primitive({
    geometryInstances: instances,
    appearance: new Cesium.PolylineColorAppearance()
  })
  viewer.scene.primitives.add(innerPrimitive)

  // Set click event handler if not already set
  if (!handler) {
    handler = new Cesium.ScreenSpaceEventHandler(viewer.scene.canvas)
    handler.setInputAction(function (movement) {
      var cartesian = viewer.scene.pickPosition(movement.position)
      var pick = viewer.scene.drillPick(movement.position)
      var cartographic, lon, lat
     
      
      if (cartesian == undefined) {
        CesiumPopupComponent.clearAllPopups()
        return
      } else if (pick.length <= 1) {
        CesiumPopupComponent.clearAllPopups()
      } else {
        cartographic = Cesium.Cartographic.fromCartesian(cartesian)
        lon = Cesium.Math.toDegrees(cartographic.longitude)
        lat = Cesium.Math.toDegrees(cartographic.latitude)
      }

      // Output click position data
      

      if (pick == undefined) {
        CesiumPopupComponent.clearAllPopups()
      }
      if (Cesium.defined(pick) && pick[0].id) {
        if (pick[1].id && isSetPopup == true) {
          if (isSetPopup) {
            removeUnderLayerPopuop()
            setPopup(pick[0].id, lon, lat)
          } else {
            setPopup(pick[0].id, lon, lat)
            isSetPopup = true
          }
        }
      } else {
        if (isSetPopup && pick.length > 1) {
          removeUnderLayerPopuop()
          setPopup(pick[1].id, lon, lat)
        } else if (pick.length > 1) {
          setPopup(pick[1].id, lon, lat)
          isSetPopup = true
        }
      }
    }, Cesium.ScreenSpaceEventType.LEFT_CLICK)
  }
}

export default {
  LoadFalultLayer,
  updateAllTerrains,
  updateTerrain,
  initGUI,
  removeAllFalultLayers,
  removeGUI,
  updateTerrainExtraScale,
  LoadFalultLayerTest,
  removeClickHandler
}
