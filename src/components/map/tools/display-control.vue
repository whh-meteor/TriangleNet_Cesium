<!-- 底部控制按钮 -->
<template>
  <Transition>
    <div class="control" v-if="isShow">
      <!-- <div class="control-item">
        <div class="label">区域开挖</div>
        <div class="container" :style="{ width: currentWidth }">
          <el-checkbox label="显示" v-model="ExcavationDisplay" :true-label="1" :false-label="2"
            @change="changeExcavationDisplay"></el-checkbox>
          
        </div>
      </div> -->
      <div class="control-item">
        <div class="label">海水显隐</div>
        <div class="container" :style="{ width: currentWidth }">
          <el-checkbox
            label="显示"
            v-model="oceanDisplay"
            :true-label="1"
            :false-label="2"
            @change="changeOceanDisplay"
          ></el-checkbox>
          <!-- <el-checkbox label="隐藏" v-model="oceanDisplay" :true-label="2" :false-label="1"
            @change="changeOceanDisplay"></el-checkbox> -->
        </div>
      </div>
      <div class="control-item">
        <div class="label">地形拉伸</div>
        <div class="container">
          <div class="circle" @click="changePercentage(-step)">
            <i class="el-icon-minus"></i>
          </div>
          <el-slider
            class="progress"
            :max="20"
            :min="1"
            :value="currentPercentage"
            @input.self="dragSlider"
            @change.self="dragEnd"
          ></el-slider>
          <div class="circle" @click="changePercentage(step)">
            <i class="el-icon-plus"></i>
          </div>
        </div>
      </div>
    </div>
  </Transition>
</template>

<script>
import "@/api/map/cesium-measure.js";
import MapConfig from "@/api/map/mapconfig.js";
import UnderSeaLayer from "@/api/map/UnderSeaLayer.js";
import FaultLayers from "@/api/map/fault.js";
import mapbus from "@/api/map/mapbus";

export default {
  components: {},
  data() {
    return {
      ExcavationDisplay: 2, //地形挖空，1.显示 2.隐藏
      terrainDisplay: 2, //地形显隐 1.显示 2.隐藏
      oceanDisplay: 1, //海水显隐 1.显示 2.隐藏
      currentPercentage: 3, //地形拉伸比例
      initPercentage: null,
      step: 1, //加减号步长,
      isShow: false,
      isShowGeoLayers: false,
      isShowFaultLayers: false,
    };
  },
  computed: {
    currentWidth() {
      return screen.width === 3840 ? "120px" : "73px";
    },
  },
  watch: {
    "$store.state.commonMap.expand"(newVal) {
      this.isShow = newVal;
      //  解决触发滑块错误问题
      this.initPercentage = this.currentPercentage;
    },
  },
  mounted() {},
  created() {
    this.initPercentage = JSON.parse(JSON.stringify(this.currentPercentage));
    mapbus.$on("isShowGeoLayers", (data) => {
      this.isShowGeoLayers = data;
    });
    mapbus.$on("isShowFaultLayers", (data) => {
      this.isShowFaultLayers = data;
    });
    mapbus.$on("isCheckOceanShow", (data) => {
      this.oceanDisplay = data;
      if (data === 1) {
        MapConfig.updateMapInfo(window.viewer).oceanWater(window.viewer);
      } else {
        // MapConfig.removeOceanWater(window.viewer) //死循环？
      }
    });
    mapbus.$on("isCheckExcavationShow", (data) => {
      this.ExcavationDisplay = data;
      // if (data === 1) {
      //   MapConfig.oceanWater(window.viewer)
      // } else {
      //   MapConfig.removeOceanWater(window.viewer)
      // }
    });
  },
  methods: {
    // // 地形显隐
    // changeTerrainDisplay(value) {
    //   this.terrainDisplay = value
    //   if (value === 1) { //显示
    //     MapConfig.addGeoJsonToTerrain()
    //     if (MapConfig.getClipStatus()) {
    //       MapConfig.loadClipNhhArea(false) //关闭裁剪
    //     }

    //   } else {
    //     MapConfig.removeGeoJsonFromTerrain()
    //     if (!MapConfig.getClipStatus()) {
    //       MapConfig.loadClipNhhArea(true)
    //     }

    //   }
    // },

    // 南黄海区域挖空显隐
    changeExcavationDisplay(value) {
      this.ExcavationDisplay = value;

      if (value === 2) {
        if (MapConfig.getClipStatus()) {
          MapConfig.loadClipNhhArea(false); //关闭裁剪
        }
      } else {
        if (!MapConfig.getClipStatus()) {
          MapConfig.loadClipNhhArea(true);
        }
      }
    },
    // 海水显隐
    changeOceanDisplay(value) {
      this.oceanDisplay = value;
      // this.oceanDisplay = value
      if (value === 1) {
        MapConfig.oceanWater(window.viewer);
      } else {
        MapConfig.removeOceanWater(window.viewer);
      }
    },
    // 增/减比例
    changePercentage(value) {
      this.currentPercentage += value;
      window.viewer.scene.verticalExaggeration = value; //夸张系数
      this.updateTerrainExtraScale(value);
      mapbus.$emit("percentageChanged", this.currentPercentage);
    },
    // 拖拽滑块
    dragSlider(value) {
      if (value === this.initPercentage) {
        this.initPercentage = null;
        return;
      }
      this.currentPercentage = value;
      window.viewer.scene.verticalExaggeration = value; //夸张系数
      mapbus.$emit("percentageChanged", this.currentPercentage);
    },
    dragEnd(value) {
      this.updateTerrainExtraScale(value);
      if (this.terrainDisplay == 1) {
        MapConfig.removeGeoJsonFromTerrain();
        MapConfig.addGeoJsonToTerrain();
      }
    },
    updateTerrainExtraScale(value) {
      if (this.isShowGeoLayers) {
        //更新地形
        UnderSeaLayer.updateTerrainExtraScale(value); // 地层拉伸
      }
      if (this.isShowFaultLayers) {
        FaultLayers.updateTerrainExtraScale(value); //断层拉伸
      }
    },
  },
};
</script>
<style lang="scss" scoped>
/* 退场动画 */
.left-enter,
.left-leave-to {
  opacity: 0;
  /*透明度*/
}

/*入场(离场)动画的时间段   */
.left-enter-active,
.left-leave-active {
  transition: all 0.8s ease;
}

.control {
  display: flex;
  position: fixed;
  bottom: 40px;
  right: 15px;
  pointer-events: all;
  z-index: 1000;

  @include respond(large) {
    right: 33px;
    bottom: 53px;
  }

  &-item {
    display: flex;
    margin-right: 4px;

    @include respond(large) {
      margin-right: 24px;
    }
  }

  .label {
    width: 80px;
    height: 40px;
    font-family: $font-family-cn;
    font-weight: 500;
    font-size: 14px;
    color: rgba(255, 255, 255, 0.8);
    line-height: 24px;
    @include flex-center;
    @include image-tool("diplay-title");

    @include respond(large) {
      width: 130px;
      height: 60px;
      font-size: 20px;
    }
  }

  .container {
    display: flex;
    background: linear-gradient(180deg, rgba(0, 102, 255, 0) 0%, #0066ff 100%);
    background-size: 100% 15%;
    background-repeat: no-repeat;
    background-position: bottom center;
    position: relative;
    left: -3px;
    padding-left: calc(7px + 3px);
    box-sizing: border-box;
    @include flex-center;

    @include respond(large) {
      padding-left: calc(20px + 3px);
    }

    .progress {
      width: 190px;
      margin: 0 6px;

      @include respond(large) {
        width: 310px;
        margin: 0 20px;
      }
    }

    .circle {
      width: 12px;
      height: 12px;
      color: #fff;
      background: #053276;
      border-radius: 50%;
      font-size: 8px;
      font-weight: 800;

      cursor: pointer;
      @include flex-center;

      @include respond(large) {
        width: 22px;
        height: 22px;
        font-size: 12px;
      }
    }
  }
}

[class^="el-icon-"] {
  font-weight: 800;
}

::v-deep .el-slider__runway {
  height: 12px;
  margin: 0;
  background-color: none;
  background: rgba(5, 50, 118, 1);
  border-radius: 10px;

  @include respond(large) {
    height: 22px;
  }
}

::v-deep .el-slider__button {
  width: 10px;
  height: 10px;
  border: 5px solid rgba(0, 121, 254, 1);
  background-color: rgba(217, 217, 217, 1);

  // box-sizing: border-box;
  @include respond(large) {
    width: 20px;
    height: 20px;
    border: 8px solid rgba(0, 121, 254, 1);
  }
}

::v-deep .el-slider__button-wrapper {
  top: -12px;

  @include respond(large) {
    top: -7px;
  }
}

::v-deep .el-slider__bar {
  height: 12px;
  background-color: none;
  background: linear-gradient(270deg, #0079fe 0%, #004898 100%);
  border-radius: 10px;

  @include respond(large) {
    height: 22px;
  }
}

@include checkbox-mixin;
</style>
