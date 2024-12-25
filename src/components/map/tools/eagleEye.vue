<template>
  <div id="eye"></div>
</template>

<script>
export default {
  data() {
    return {}
  },
  mounted() {
    this.initEyes()

  },
  methods: {
    initEyes() {
      console.log(window.viewer)
      var viewer = window.viewer

      // 1.创建双球
      var viewerEyes = new Cesium.Viewer('eye', {
        animation: false,
        homeButton: false,
        geocoder: false,
        baseLayerPicker: false,
        timeline: false,
        fullscreenButton: false,
        scene3DOnly: false,
        infoBox: false,
        sceneModePicker: false,
        navigationInstructionsInitiallyVisible: true,
        navigationHelpButton: false,
        selectionIndicator: false
      })

      viewerEyes.imageryLayers.addImageryProvider(
        new Cesium.UrlTemplateImageryProvider({
          url: (process.env.NODE_ENV == 'production' ? 'http://localhost:8182/satellite/{z}/{y}/{x}.png' : "https://webst01.is.autonavi.com/appmaptile?style=6&x={x}&y={y}&z={z}")

        })
      )

      // 2.设置鹰眼图中球属性
      let control = viewerEyes.scene.screenSpaceCameraController
      control.enableRotate = false
      control.enableTranslate = false
      control.enableZoom = false
      control.enableTilt = false
      control.enableLook = false

      // 创建一个红色实线的矩形
      var rectangleEntity = viewerEyes.entities.add({
        rectangle: {
          coordinates: Cesium.Rectangle.fromDegrees(119, 32, 126, 39), // 黄海区域的经纬度范围
          material: Cesium.Color.RED.withAlpha(0.3), // 无填充色，仅边框
          outline: true,
          outlineColor: Cesium.Color.RED,
          outlineWidth: 2.0 // 设置边框的宽度
        }
      })

      const zoomFactor = 0.7 // 缩放比例
      function throttle(func, delay) {
        let lastTime = 0
        return function (...args) {
          const now = Date.now()
          if (now - lastTime >= delay) {
            lastTime = now
            func.apply(this, args)
          }
        }
      }

      let syncViewer = function () {
        // 同步鹰眼图的相机位置
        const newDestination = new Cesium.Cartesian3(
          viewer.camera.position.x / zoomFactor,
          viewer.camera.position.y / zoomFactor,
          viewer.camera.position.z / zoomFactor
        )

        viewerEyes.camera.flyTo({
          destination: newDestination,
          orientation: {
            heading: viewer.camera.heading,
            pitch: viewer.camera.pitch,
            roll: viewer.camera.roll
          },
          duration: 0.0
        })
        //获取主视图的边界矩形

        let rectangle = window.viewer.camera.computeViewRectangle(
          window.viewer.scene.globe.ellipsoid
        )

        if (rectangle) {
          // 同步红色矩形框的范围到鹰眼视图
          rectangleEntity.rectangle.coordinates = rectangle
        }
      }

      viewerEyes._cesiumWidget._creditContainer.style.display = 'none'
      viewerEyes.scene.mode = Cesium.SceneMode.SCENE2D
      // 3.同步
      viewer.camera.changed.addEventListener(syncViewer)
      // viewer.scene.preRender.addEventListener(syncViewer)
      // **立即同步主视角的范围** 
      syncViewer()
    }
  }
}
</script>

<style>
/* #eye {
  position: absolute;
  width: 20%;
  height: 20%;
  bottom: 4%;
  left: 2%;
  z-index: 999;
  background: red;
} */
</style>
