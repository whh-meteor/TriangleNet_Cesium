<!-- 地图：底部地图基本信息 -->
<template>
  <Transition>
    <div :class="[
      'ontime-container',
      `ontime-container-${expand || currentRoute}`
    ]" v-if="controlShow || isShow">
      <div class="ontime-container-border">
        <p label="经度">经度:124.328108</p>
        <p label="纬度">纬度:36.561710</p>
        <!-- <p label="航向角">航向角:</p>
      <p label="俯仰角">俯仰角:</p>
      <p label="视角高度">视角高度:</p> -->
        <p label="深度">深度:-81.14</p>
      </div>
    </div>
  </Transition>
</template>
<script>
import MapConfig from '@/api/map/mapconfig.js'
export default {
  name: 'MapOnTime',
  props: {
    controlShow: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      longitude: '',
      latitude: '',
      deepth: '',
      isShow: false,
      currentRoute: '',
      expand: ''
    }
  },
  watch: {
    '$store.state.commonMap.expand'(newVal) {
      this.isShow = newVal
      this.expand = newVal ? 'expand' : ''
        MapConfig.updateMapInfo(window.viewer)
    },
    $route: {
      immediate: true, // 一旦监听到路由的变化立即执行
      handler(to, from) {
        this.currentRoute = to.meta?.classify || ''
        
      }
    }
  },
  created() {
       setTimeout(() => {
    
    }, 300)
    
  },
  mounted() {
    // setTimeout(() => {
    //   MapConfig.updateMapInfo(window.viewer)
    // }, 300)
  },
  methods: {}
}
</script>
<style lang="scss" scoped>
.ontime-container {
  position: absolute;
  z-index: 100;
  bottom: 0;

  left: 0;

  @include respond(large) {
    left: 1090px;
    bottom: 589px;
  }

  &-expand,
  &-stone,
  &-uplift {
    bottom: 2.6%;
    left: 19%;
  }

  &-border {
    width: 299px;
    height: 30px;
    display: flex;
    align-items: center;
    justify-content: space-around;
    font-family: Source Han Sans CN;
    font-size: 12px;
    color: #c3e1ff;
    line-height: 14px;
    @include image-tool('info');
    @include respond(large){
      zoom: 1.8;
    }
  }
}
</style>
