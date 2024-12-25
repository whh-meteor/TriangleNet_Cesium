<template>
  <div class="layer-switcher">
    <div class="layer-list">
      <div
        v-for="(layer, index) in layers"
        :key="index"
        class="layer-item"
        :class="{ active: activeLayerIndex === index }"
        @click="switchLayer(index)"
      >
        <img :src="layer.image" alt="layer.name" class="layer-icon" />
        <span>{{ layer.name }}</span>
      </div>
    </div>
  </div>
</template>

<script>
import { onMounted, ref } from "vue";

export default {
  name: "CesiumLayerSwitcher",
  props: {
    viewer: {
      type: Object,
      required: true,
    },
  },
  setup(props) {
    // 图层数据，包括名称、图标图片和链接
    const layers = ref([
      {
        name: "卫星图",
        image:
          "https://webst01.is.autonavi.com/appmaptile?style=6&x=10&y=6&z=4",
        url: "https://webst01.is.autonavi.com/appmaptile?style=6&x={x}&y={y}&z={z}",
      },
      {
        name: "海图",
        image:
          "http://inner.qdlimap.cn:9999/gisAssistant/wmts/grid_tile/local/seaMap/01_ch/bz_jd/4/8/9",
        url: " http://inner.qdlimap.cn:9999/gisAssistant/wmts/grid_tile/local/seaMap/01_ch/bz_jd/{z}/{y}/{x}",
      },

      {
        name: "矢量图",
        image:
          "https://webrd01.is.autonavi.com/appmaptile?lang=zh_cn&size=1&scale=1&style=8&x=8&y=4&z=4",
        url: "https://webrd01.is.autonavi.com/appmaptile?lang=zh_cn&size=1&scale=1&style=8&x={x}&y={y}&z={z}",
      },
    ]);

    // 当前激活的图层索引
    const activeLayerIndex = ref(0);

    // 切换图层
    const switchLayer = (index) => {
      activeLayerIndex.value = index;
      const selectedLayer = layers.value[index];
      addLayerToViewer(selectedLayer.url);
    };

    // 添加选中的图层到 Cesium viewer
    const addLayerToViewer = (url) => {
      const imageryLayerCollection = props.viewer.imageryLayers;

      // 移除当前所有图层
      imageryLayerCollection.removeAll();

      // 添加新的图层
      const layer = props.viewer.imageryLayers.addImageryProvider(
        new Cesium.UrlTemplateImageryProvider({
          url: url,
        })
      );
    };

    onMounted(() => {
      // 默认加载第一个图层
      addLayerToViewer(layers.value[activeLayerIndex.value].url);
    });

    return {
      layers,
      activeLayerIndex,
      switchLayer,
    };
  },
};
</script>

<style scoped>
.layer-switcher {
  position: absolute;
  bottom: 9.8%;
  right: 3.18%;
  z-index: 10;
  background-color: rgba(6, 63, 140, 1);
  padding: 10px;
  border-radius: 5px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.3);
}

.layer-list {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.layer-item {
  display: flex;
  align-items: center;
  cursor: pointer;
}

.layer-item.active {
  background-color: rgba(0, 0, 0, 0.1);
}

.layer-icon {
  width: 20px;
  height: 20px;
  margin-right: 10px;
}

.layer-item span {
  font-size: 14px;
  font-weight: bold;
}
</style>
