<!-- 地图：底部地图基本工具 -->
<template>
  <div :class="['tool', `tool-${expand || currentRoute}`]">
    <div class="tool-bottom">
      <div
        class="tool-item"
        v-for="(item, index) in toolArray"
        :class="{
          'tool-item-chosen':
            activeIndex === index - 1 || (activeIndex === 7 && index === 3),
          disabled: expand === '' && index === 3,
        }"
        @click="operateMap(item, item.type)"
        :title="item.title"
      >
        <div
          class="tool-img"
          :class="item.class"
          :style="`height:${item.height}`"
        ></div>
      </div>
      <div class="slot">
        <!-- 鹰眼地图 -->
        <EagleEye class="EagleEye"></EagleEye>
      </div>
    </div>
  </div>
</template>

<script>
import mapconfig from "@/api/map/mapconfig";
import screenfull from "screenfull";
import { createNamespacedHelpers } from "vuex";
const { mapMutations } = createNamespacedHelpers("commonMap");
import "@/api/map/cesium-measure.js";
import MapConfig from "@/api/map/mapconfig.js";
import { legendConfig } from "@/api/map/legendConfig.js";
import SeaParticle from "@/api/map/seaparticle/SeaParticle.js";
import EagleEye from "./eagleEye.vue";
import EventBus from "@/utils/foundation/event-bus";
export default {
  name: "MapTool",
  components: {
    EagleEye,
  },
  data() {
    // -0.放大 1.缩小 2.复位 3.测距 4.测面 5.地图展开 6.清屏 -1.点击相同的序号
    return {
      activeIndex: -1,
      currentRoute: "",
      showLegend: true,
      toolArray: [
        {
          type: 0,
          class: "add",
          once: true,
          title: "地图放大",
        },
        {
          type: 1,
          class: "sub",
          once: true,
          title: "地图缩小",
          height: "2px",
        },
        {
          type: 2,
          class: "reset",
          once: true,
          title: "地图复位",
        },
        {
          type: 7,
          class: "legend",
          // once: true,
          title: "图例",
        },
        {
          type: 3,
          class: "length",
          title: "距离量算",
        },
        {
          type: 4,
          class: "area",
          title: "面积量算",
        },
        {
          type: 5,
          class: "open",
          once: true,
          title: "地图展开",
        },
        {
          type: 6,
          class: "clear",
          once: true,
          title: "地图清屏",
        },
      ],
      isShowEagleEye: false,
      checkList: ["海洋水体"],
      timeArr: [
        "00:00",
        "00:00",
        "00:00",
        "00:00",
        "00:00",
        "00:00",
        "00:00",
        "00:00",
        "00:00",
        "00:00",
        "00:00",
      ],
      legendList: [],
      // legendList: [//图例列表
      //   { //蓝色三角
      //     style: 'blueTriangle',
      //     inner: 'blueTriangleInner',
      //     label: '工程名称'
      //   },
      //   {
      //     // 蓝色圆
      //     style: 'blueCircle',
      //     label: '工程名称工程名称工程名称工程名称工程名称工程名称工程名称工程名称工程名称'
      //   },
      //   {
      //     // 绿色圆
      //     style: 'greenCircle',
      //     label: '工程名称'
      //   }
      // ],
      expand: "",
      measure: new Cesium.Measure(viewer),
    };
  },
  watch: {
    $route: {
      immediate: true, // 一旦监听到路由的变化立即执行
      handler(to, from) {
        this.currentRoute = to.meta?.classify || "";
      },
    },
    "$store.state.commonMap.expand"(newVal) {
      this.expand = newVal ? "expand" : "";
      this.setLegend(false);
    },
  },
  mounted() {
    this.legendList = Object.values(legendConfig);
  },
  methods: {
    ...mapMutations(["setExpand", "setLegend", "setClearScreen"]),
    // 展示图例
    showLegendMethod() {},
    /**
     * 操作工具
     * @param {Object} data 列表内容
     * @param {Number} type 类型
     * @param {Boolean} once 只触发一次
     */
    operateMap(data, type) {
      const { once = false } = data;
      if (once) {
        this.activeIndex = -1;
        this.setOperate(type);
        return;
      }
      if (type === this.activeIndex) {
        this.activeIndex = -1;
        this.setOperate(this.activeIndex);
        this.setLegend(false);
        // clickTwice ? mapInit.setOperate(type) : mapInit.setOperate(this.activeIndex);
      } else {
        this.activeIndex = type;
        this.setOperate(this.activeIndex);
        // 在两侧展开状态下可点击图例
        if (this.expand === "expand" && type === 7) {
          this.setLegend(true);
        }
        if (this.expand != "expand" && type === 7) {
          this.activeIndex = -1;
        }
      }
    },
    /**
     * 地图基本操作
     * @param {Number} type --0.放大 1.缩小 2.复位 3.测距 4.测面 5.地图展开 6.清屏 7.图例 -1.点击相同的序号
     * @returns {*}
     */
    setOperate(type) {
      var viewer = window.viewer;
      switch (type) {
        case 0:
          this.zoomByBound(1);
          return;
        case 1:
          this.zoomByBound(0);
          return;
        case 2:
          this.flyToHome(viewer);
          return;
        case 3:
          this.measureDistant(viewer);
          return;
        case 4:
          this.measureArea(viewer);
          return;
        case 5:
          // this.fullScrean(viewer)
          this.setExpand(!this.$store.getters["commonMap/getExpand"]);
          return;
        case -1:
          this.measure._drawLayer.entities.removeAll(); // 清除测量
          return;
        case 6:
          this.clearLayers(viewer);
          return;
        case 7:
          this.showLegendMethod();
      }
    },

    flyToHome(viewer) {
      console.log(viewer.scene.camera.heading);
      console.log(viewer.scene.camera.pitch);
      console.log(viewer.scene.camera.roll);
      console.log(viewer.scene.camera.position);
      viewer.camera.flyTo({
        destination: Cesium.Cartesian3.fromDegrees(
          124.10841361613471,
          28.399574509614315,
          1000000
        ),
        orientation: {
          heading: Cesium.Math.toRadians(0),
          pitch: -0.9764350593431694,
          roll: 0.0,
        },
        duration: 2,
      });
    },
    measureDistant(viewer) {
      this.measure.drawLineMeasureGraphics({
        clampToGround: false,
        callback: () => {},
      });
    },
    measureArea(viewer) {
      this.measure.drawAreaMeasureGraphics({
        clampToGround: false,
        callback: () => {},
      });
    },
    zoomByBound(flag) {
      const center = this.pickCenter();
      var height = viewer.camera.positionCartographic.height;
      const camera = viewer.camera;
      var boundingSph = new Cesium.BoundingSphere(
        Cesium.Cartesian3.fromDegrees(center.lon, center.lat, 1000),
        height
      );
      var moveRate = 0;
      if (flag) {
        moveRate = 0.5;
      } else {
        moveRate = 1.5;
      }
      var zoomParams = {
        duration: 0.8,
        offset: new Cesium.HeadingPitchRange(
          camera.heading,
          camera.pitch,
          height * moveRate
        ),
      };
      camera.flyToBoundingSphere(boundingSph, zoomParams);
    },
    pickCenter() {
      var ellipsoid = viewer.camera.pickEllipsoid(
        new Cesium.Cartesian2(
          viewer.canvas.clientWidth / 2,
          viewer.canvas.clientHeight / 2
        )
      );
      var curPosition =
        Cesium.Ellipsoid.WGS84.cartesianToCartographic(ellipsoid);
      var lon = (curPosition.longitude * 180) / Math.PI;
      var lat = (curPosition.latitude * 180) / Math.PI;
      return {
        lon: lon,
        lat: lat,
      };
    },
    fullScrean(viewer) {
      screenfull.toggle();
    },
    clearLayers(viewer) {
      // //移除dataSource
      // for (var i = 0; i < window.viewer.dataSources._dataSources.length; i++) {
      //   window.viewer.dataSources._dataSources[i].entities.removeAll();
      // }
      //  //移除图层*（除了底图）
      // let layerList = [];

      // for (let i = 0; i < viewer.imageryLayers.length; i++) {
      //   let layer = viewer.imageryLayers.get(i);
      //   layerList.push(layer);
      // }
      // layerList.forEach((item, index) => {
      //   if (index !== 0) {
      //     viewer.imageryLayers.remove(item);
      //   }
      // });
      // //移除ENtities 除了地心球
      //   const entitiesToKeep = ["OuterCore"]; // 需要保留的entity ID
      //   const allEntities = viewer.entities.values; // 获取所有的entities

      //   allEntities.forEach((entity) => {
      //     if (!entitiesToKeep.includes(entity.id)) {
      //       // console.log("移除：" + entity.id);
      //       viewer.entities.remove(entity); // 移除不需要的entity
      //     }
      //   });
      setTimeout(() => {
        mapconfig.removeOceanWater(viewer);
        this.setExpand(!this.$store.getters["commonMap/getExpand"]);
      }, 50);

      EventBus.$emit("refreshComponent", 1);

      setTimeout(() => {
        this.setExpand(!this.$store.getters["commonMap/getExpand"]);
      }, 50);

      // viewer.entities.removeAll(); // 移除所有的entity
      // mapconfig.removeOceanWater(viewer);
      // mapconfig.removeClippingPolygons();

      // 正确操作 primitives
      // viewer.scene.primitives.removeAll();
      // window.$initPrimitives.forEach((primitive) => {
      //   console.log("添加primitives："  );
      //   console.log(primitive)
      //   viewer.scene.primitives.add(primitive);
      // });
      // console.log(viewer.scene.primitives)
      // 给出一点时间用于操作，确保操作完成后再恢复图元

      // const primitives = viewer.scene.primitives;
      // for (let i = primitives.length - 1; i >= 0; i--) {
      //   console.log("移除primitives："  );
      //   console.log( primitives.get(i))
      //   // 移除每个primitive
      //   primitives.remove(primitives.get(i));
      // }
      // 移除所有图层
      //  mapconfig.oceanWater(viewer);
      //   mapconfig.loadZoro(viewer)
      this.setClearScreen(true);
      setTimeout(() => {
        this.setClearScreen(false);
      }, 500);
    },
    /**
     * 区域范围按钮
     */
    toRegion() {
      this.$emit("toRegion");
      console.log(this.isShowEagleEye);
      this.isShowEagleEye = !this.isShowEagleEye;
    },
    handleCheckedCitiesChange(item) {},
    waterChange(payload) {
      if (payload) {
        console.log("选中");
        MapConfig.oceanWater(window.viewer);
      } else {
        MapConfig.removeOceanWater(window.viewer);
      }
    },
    unlayChange(payload) {
      if (payload) {
        this.$emit("showUnderTerr", payload);
      } else {
        this.$emit("showUnderTerr", payload);
      }
    },
    particleChange(payload) {
      if (payload) {
        MapConfig.removeOceanWater(window.viewer);
        window.viewer.scene.globe.translucency.enabled = false;
        // this.$emit('showParticle', true)
      } else {
        window.viewer.scene.globe.translucency.enabled = true;
        MapConfig.oceanWater(window.viewer);
      }
    },
  },
};
</script>

<style lang="scss" scoped>
$tool-main-color: rgba(7, 80, 181, 0.96);
$tool-container-length: 26px;
$tool-img-length: 14px;

.tool {
  display: flex;
  position: absolute;
  bottom: 20.8%;
  right: 3.18%;
  z-index: 50;
  pointer-events: none;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  transition: all 0.5s;

  &-basin {
    bottom: 36%;
    right: 27.35%;

    // transition: all 0.5s;
    @include respond(large) {
      bottom: calc(557px);
      right: 29.6%;
    }
  }

  &-stone,
  &-uplift {
    bottom: 36%;
    right: 27.8%;

    @include respond(large) {
      bottom: calc(557px);
      right: 27.41%;
    }
  }

  &-expand {
    bottom: 16.8%;
    right: 3.18%;

    // transition: all 0.5s;
    @include respond(large) {
      bottom: calc(240px);
      right: 87px;
    }
  }

  .tool-bottom {
    color: #23b9ff;
    pointer-events: none;
    display: flex;
    flex-direction: column;
    align-items: end;

    .tool-item {
      width: $tool-container-length;
      height: $tool-container-length;
      background: $tool-main-color;
      border-radius: 4px;
      margin-bottom: 4px;
      filter: brightness(0.8);
      cursor: pointer;
      pointer-events: all;
      @include flex-center;

      &:hover {
        filter: brightness(1);
      }

      &:nth-last-child(1) {
        margin-bottom: 0;
      }

      @include respond(large) {
        width: 44px;
        height: 44px;
      }

      .tool-img {
        width: $tool-img-length;
        height: $tool-img-length;

        @include respond(large) {
          width: 24px;
          height: 24px;
        }
      }

      .add {
        @include image-tool("add-tool");
      }

      .sub {
        @include image-tool("sub-tool");
      }

      .reset {
        @include image-tool("reset-tool");
      }

      .length {
        @include image-tool("length-tool");
      }

      .area {
        @include image-tool("area-tool");
      }

      .open {
        @include image-tool("open-tool");
      }

      .clear {
        @include image-tool("clear-tool");
      }

      .legend {
        @include image-tool("legend-tool");
      }
    }

    .tool-item-chosen {
      filter: brightness(1);
    }

    .disabled {
      cursor: no-drop;
    }
  }

  .tool-legend {
    position: absolute;
    right: 32px;
    // max-height: 62%;
    max-width: 508px;
    // background: rgba(7, 80, 181, 0.6);
    // border-radius: 5px 5px 5px 5px;
    display: flex;
    justify-content: center;
    padding: 10px 12px;
    flex-direction: column;
    align-items: baseline;
    pointer-events: all;

    @include respond(large) {
      padding: 12px 25px;
      right: calc(44px + 6px);
      max-width: 132px;
    }

    .legend-con {
      height: fit-content;
      @include flex-center;

      .legend-text {
        font-family: $font-family-cn;
        font-size: 12px;
        color: #ffffff;
        line-height: 24px;
        max-width: 72px;
        text-align: left;
        @include text-overflow;

        @include respond(large) {
          font-size: 16px;
          line-height: 24px;
          max-width: 96px;
        }
      }
    }

    .legend-icon {
      width: 10px;
      height: 10px;
      box-sizing: border-box;
      margin-right: 7px;

      &-inner {
        display: none;
      }

      @include respond(large) {
        width: 12px;
        height: 12px;
        margin-right: 14px;
      }
    }
  }

  .slot {
    width: 90px;
    height: 113px;
    margin-bottom: 10px;
    pointer-events: all;
    @include flex-center;
    @include image-tool("tool-img");

    @include respond(large) {
      width: 170px;
      height: 216px;
    }

    .EagleEye {
      width: 86%;
      height: 82%;
      margin-top: 6px;

      @include respond(large) {
        width: 88%;
        height: 82%;
        margin-top: 13px;
      }
    }
  }

  .region {
    width: 90px;
    height: 30px;
    display: flex;
    justify-content: flex-end;
    align-items: center;
    font-family: $font-family-cn;
    font-size: 12px;
    color: #d8f0ff;
    line-height: 14px;
    text-shadow: 0px 3px 7px rgba(0, 253, 255, 0.8);

    // background-size: calc(50px * 322 / 110) 50px;
    // background-position: right center;
    cursor: pointer;
    pointer-events: all;
    @include image-tool("area");
    @include flex-center;

    @include respond(large) {
      width: 170px;
      height: 44px;
      margin-top: 20px;
      font-size: 16px;
      line-height: 24px;

      @include image-tool("area-3840");
    }

    .eye {
      width: 14px;
      height: 14px;
      margin-top: 2px;
      margin-right: 3px;
      @include image-tool("area-eye");

      @include respond(large) {
        width: 24px;
        height: 24px;
        margin-top: 4px;
        margin-right: 20px;
      }
    }

    &-text {
      margin-right: 8px;

      @include respond(large) {
        margin-right: 8px;
        margin-top: 3px;
      }
    }
  }
}

.toolMapController {
  position: fixed;
  z-index: 999;
  right: 20%;
  bottom: 4%;
  pointer-events: all;
}

.toolMapController .el-checkbox {
  color: #fff;
}

.toolMapController .el-checkbox__input.is-checked + .el-checkbox__label {
  color: #fff;
}
</style>
