<template>
  <div>
    <div id="cesiumContainer">
      <MapTool v-if="awaitViewer"> </MapTool>
      <Mapinfo v-if="awaitViewer"> </Mapinfo>
    </div>
    <Control
      @showGeoLayer="isShowGeoLayers"
      @showParticle="isShowParticles"
    ></Control>
    <LayerSwitcher :viewer="viewer" />
  </div>
</template>

<script>
import MapConfig from "@/api/map/mapconfig.js";
import "@/assets/style/compass.css";
// import FixedChosen from "./tools/fixed-chosen.vue";
import Fault from "@/api/map/fault.js";
import MapTri from "./map";
export default {
  name: "CesiumViewer",
  data() {
    return {
      viewer: null,
      BaseMapUrl: "http://inner.qdlimap.cn:9999/gisAssistant",

      //BaseMapUrl: 'http://localhost:8182/satellite/', // 客户测试环境全球遥感地图服务
      showParticle: false,
      showUnderSea: false,
      awaitViewer: false,
    };
  },
  components: {
    MapTool: () => import("@/components/map/tools/tool.vue"),
    Mapinfo: () => import("@/components/map/info.vue"),
    Control: () => import("@/components/map/tools/display-control.vue"),
    LayerSwitcher: () => import("./tools/layerSwitcher.vue"),
  },
  mounted() {
    this.init();
    window.$supervise = this;
    this.awaitViewer = true;

    // test
    MapTri.Map();
  },
  methods: {
    isShowGeoLayers(bool) {
      this.showUnderSea = bool;
    },
    isShowParticles(bool) {
      this.showParticle = bool;
    },
    //初始化地图
    init() {
      this.viewer = new Cesium.Viewer("cesiumContainer", {
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
        selectionIndicator: false,
        requestRenderMode: true,
        maximumRenderTimeChange: Infinity,
      });
      this.viewer.imageryLayers.remove(this.viewer.imageryLayers.get(0));
      this.viewer._cesiumWidget._creditContainer.style.display = "none";
      this.viewer.scene.globe.depthTestAgainstTerrain = true;
      this.viewer.scene.screenSpaceCameraController.minimumZoomDistance = -1000;
      this.viewer.scene.camera.constrainedAxis = Cesium.Cartesian3.UNIT_Z;
      this.viewer.scene.globe.baseColor = Cesium.Color.TRANSPARENT;
      this.viewer.scene.globe.translucency.enabled = true;
      // this.viewer.scene.globe.undergroundColor = undefined;

      //加载本地切片
      var URL =
        process.env.NODE_ENV == "production"
          ? window.GLOBAL_CONFIG.MAP_ADDRESS
          : "https://webst01.is.autonavi.com/appmaptile?style=6&x={x}&y={y}&z={z}";
      this.viewer.imageryLayers.addImageryProvider(
        new Cesium.UrlTemplateImageryProvider({
          url: URL, //服务地址
          // url: this.BaseMapUrl +
          //   '{z}/{y}/{x}.png' //服务地址
        })
      );

      window.viewer = this.viewer;
      MapConfig.oceanWater(this.viewer);
      MapConfig.loadZoro(this.viewer);
      MapConfig.flytohome();
      MapConfig.LoadCompass(this.viewer);
      this.addTerrain(this.viewer);
      // MapConfig.loadClipNhhArea(true)
    },
    //添加地形切片
    async addTerrain(viewer) {
      viewer.terrainProvider = await Cesium.CesiumTerrainProvider.fromUrl(
        process.env.NODE_ENV == "production"
          ? window.GLOBAL_CONFIG.Terrain_Address
          : "http://inner.qdlimap.cn:7001/GisServer/NanHuangHai/globeterrain/",
        //'http://localhost:8183/goal/', // 客户测试服务器地址
        {
          requestWaterMask: false,
          requestVertexNormals: true,
        }
      );
    },
  },
};
</script>

<style lang="scss">
#cesiumContainer {
  width: 100vw;
  height: 100vh;
  margin: 0;
  padding: 0;
  overflow: hidden;
}
</style>
