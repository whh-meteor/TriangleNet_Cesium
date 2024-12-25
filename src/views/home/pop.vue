<!--
 * @Author: UMR
 * @Date: 2024-12-23 17:38:39
 * @LastEditors: Do not edit
 * @LastEditTime: 2024-12-24 16:10:51
 * @FilePath: \smart-ocean\src\views\home\pop.vue
-->
<template>
  <div class="pop">
    <div class="pop-header">
      <div class="pop-header-title">{{ title }}</div>
      <img
        src="@/assets/image/pops/close.png"
        @click="close"
        alt=""
        class="pop-header-close"
      />
    </div>
    <div class="pop-content">
      <div class="pop-content-left">
        <div
          class="pop-content-left-item"
          :style="{ height: left.length == 3 ? '32%' : '50%' }"
          v-for="(item, index) in left"
          :key="index"
        >
          <div class="title">{{ item.device }}</div>
          <div class="content">
            <div
              class="content-item"
              v-for="(val, idx) in item.data"
              :key="idx"
            >
              <div class="content-item-icon">
                <img
                  :src="imgPath(val.icon)"
                  alt=""
                  srcset=""
                  class="element"
                />
                <img src="@/assets/image/pops/bottom.png" alt="" srcset="" />
              </div>
              <div class="content-item-text">
                <div class="content-item-text-value">
                  {{ val.value }} {{ val.unit }}
                </div>
                <div class="content-item-text-title">{{ val.name }}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="pop-content-right">
        <div
          class="pop-content-left-item"
          v-for="(item, index) in right"
          :style="{ height: right.length == 3 ? '32%' : '50%' }"
          :key="index"
        >
          <div class="title">{{ item.device }}</div>
          <div class="content">
            <div
              class="content-item"
              v-for="(val, idx) in item.data"
              :key="idx"
            >
              <div class="content-item-icon">
                <img
                  :src="imgPath(val.icon)"
                  alt=""
                  srcset=""
                  class="element"
                />
                <img src="@/assets/image/pops/bottom.png" alt="" srcset="" />
              </div>
              <div class="content-item-text">
                <div class="content-item-text-value">
                  {{ val.value }} {{ val.unit }}
                </div>
                <div class="content-item-text-title">{{ val.name }}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {
  buoyLeft,
  buoyRight,
  satelliteLift,
  satelliteRight,
  submersiblesLift,
  submersiblesRight,
  sonarLift,
  sonarRight
} from '@/utils/foundation/pop'
export default {
  name: 'Pop',
  data() {
    return {
      left: [],
      right: []
    }
  },
  props: {
    title: {
      type: String,
      default: '浮标1'
    },
    category: {
      type: String,
      default: 'buoy'
    }
  },
  computed: {
    imgPath() {
      return (icon) => {
        return require(`@/assets/image/pops/${icon}.png`)
      }
    }
  },
  created() {
    console.log(buoyLeft)
    switch (this.category) {
      case 'buoy':
        this.left = buoyLeft
        this.right = buoyRight
        break
      case 'satellite':
        this.left = satelliteLift
        this.right = satelliteRight
        break
      case 'submersibles':
        this.left = submersiblesLift
        this.right = submersiblesRight
        break
      case 'sonar':
        this.left = sonarLift
        this.right = sonarRight
        break
      default:
        break
    }
  },
  methods: {
    close() {
      this.$emit('closePop', false)
    }
  }
}
</script>

<style lang="scss" scoped>
.pop {
  width: 100%;
  height: 100%;
  &-header {
    width: 100%;
    height: 60px;
    background: url('~@/assets/image/pops/header.png') no-repeat;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding-left: 20px;
    box-sizing: border-box;
    &-title {
      color: #fff;
      font-family: YouSheBiaoTiHei, YouSheBiaoTiHei;
      font-weight: 400;
      font-size: 24px;
      text-align: left;
      font-style: normal;
      text-transform: none;
      // background: linear-gradient(
      //   92.36117118429195deg,
      //   rgba(180, 209, 249, 0.1) 0%,
      //   rgba(22, 119, 255, 0.6) 86%
      // );
      // -webkit-background-clip: text;
      // -webkit-text-fill-color: transparent;
      display: inline-block;
    }
    &-close {
      width: 24px;
      height: 24px;
      cursor: pointer;
      padding-right: 20px;
    }
  }
  &-content {
    padding: 3px;
    height: calc(100% - 76px);
    display: flex;
    align-items: center;
    justify-content: space-around;
    &-left {
      margin-top: 8px;
      width: 49%;
      display: flex;
      flex-direction: column;
      justify-content: space-around;
      height: 100%;

      &-item {
        width: 100%;
        // height: 180px;
        background: linear-gradient(
          180deg,
          #0450ba 0%,
          rgba(10, 92, 202, 0.47) 8%,
          rgba(4, 90, 169, 0.2) 50%,
          rgba(8, 89, 197, 0.6) 94%,
          #0450ba 100%
        );
        border-radius: 3px 3px 3px 3px;
        border: 2px solid;
        .title {
          color: #fff;
          font-family: YouSheBiaoTiHei, YouSheBiaoTiHei;
          font-weight: 400;
          font-size: 16px;
          text-align: left;
          padding-left: 31px;
          font-style: normal;
          text-transform: none;
          background: url('~@/assets/image/pops/title.png') no-repeat;
        }
        .content {
          width: 100%;
          height: 100%;
          display: flex;
          flex-wrap: wrap;
          align-items: center;
          &-item {
            display: flex;
            align-items: center;
            margin-left: 15px;
            &-icon {
              display: flex;
              flex-direction: column;
              align-items: center;
              position: relative;
              .element {
                position: absolute;
                top: -12px;
                width: 32px;
                height: 32px;
              }
            }
            &-text {
              margin-left: 5px;
              &-value {
                font-family: YouSheBiaoTiHei, YouSheBiaoTiHei;
                font-weight: 500;
                font-size: 18px;
                color: #0bf9fe;
                line-height: 26px;
                text-align: left;
                font-style: normal;
                text-transform: none;
              }
              &-title {
                font-family: YouSheBiaoTiHei, YouSheBiaoTiHei;
                font-weight: 500;
                font-size: 13px;
                color: #ffffff;
                line-height: 21px;
                text-align: left;
                font-style: normal;
                text-transform: none;
              }
            }
          }
        }
      }
    }
    &-right {
      @extend .pop-content-left;
      &-item {
        @extend .pop-content-left-item;
        .title {
          @extend .title;
        }
        .content {
          @extend .content;
        }
      }
    }
  }
}
</style>
