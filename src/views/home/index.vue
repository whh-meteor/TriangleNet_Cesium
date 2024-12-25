<!-- 首页 -->
<template>
  <div class="">
    <div class=''>
        <div class="map">
            <baseMap class="basemap"></baseMap>
        </div>
        <div class="content">
            <div
                :class="['decoration-background', { 'decoration-background-small': !isShow }, { 'decoration-background-fold': isFold }]">
                <div class="decoration">
                    <!-- 头部 -->
                    <HeaderHome></HeaderHome>
                    <div>
                        <Warning></Warning>
                        <Chosen @onClickFlag="onClickFlag" @selectChosen="selectChosen"></Chosen>
                    </div>

                    <!-- 底部 -->
                    <div class="bottom">{{ subTitle }}</div>
                </div>
            </div>

        </div>
    </div>

    <div class="popUp" v-if="popShow">
      <pop
        @closePop="popShow = $event"
        :title="popName"
        :category="popCategory"
      />
    </div>
    <div class="mask" v-if="popShow"></div>
  </div>
</template>

<script>
import { createNamespacedHelpers } from 'vuex'
const { mapMutations } = createNamespacedHelpers('commonMap')
import baseMap from '../../components/map/map.vue'
import * as dayjs from 'dayjs'
import { loginOut as loginOutMethod } from '@/api/login/login'
import HeaderHome from '@/components/home/header.vue'
import EventBus from '@/utils/foundation/event-bus'
import pop from './pop.vue'
export default {
  components: {
    baseMap,
    HeaderHome,
    pop,
    Chosen: () => import('@/components/map/tools/chosen'),
    Warning:()=>import("@/components/foundation/warning.vue")
  },
  data() {
    return {
      componentKey: 0,
      title: window.GLOBAL_CONFIG.TITLE,
      subTitle: window.GLOBAL_CONFIG.SUB_TITLE,
      currentIndex: 0,
      isShow: false,
      isFold: false,
      popShow: false,
      popName: null,
      popCategory: null
    }
  },
  created() {},
  mounted() {
    this.isShow = true
  },
  beforeDestroy() {
    this.setExpand(false)
    this.setFold(false)
    // this.$store.subscribe((mutation)=>{console.log("mutation",mutation)}, { prepend: true })
  },
  computed: {
    // tab
    currentTab() {
      return this.topTab.map((el) => {
        return {
          //title: process.env.NODE_ENV === 'production' ? el.title : el.alias,
          title: el.title,
          path: el.path
        }
      })
    },
   
   
  },
  watch:{
    '$store.state.commonMap.fold'(newVal) {
      this.isFold = newVal
    }
  },
  methods: {
      ...mapMutations(['setTab', 'setExpand', 'setFold']),
      getStaticImg(name) {
        return require(`@/assets/image/home/${name}.png`)
      },
      /**
       * 地图点击
       */
      onClickFlag({ name, category }) {
        console.log('name', name, category)
        this.popShow = true;
        this.popName = name
        this.popCategory = category


      },
      /**
       * 选择一级菜单
       * @param {*} e 是否选中
       * @param {*} item 点击的一级所有
       * @param {*} index 一级菜单下标
       */
      selectChosen({ e, item, index }) {}
    },
}
</script>
<style lang="scss" scoped>
.map {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;

  color: #fff;

  &-layer {
    $layer-width: 85%;
    position: absolute;
    width: $layer-width;
    top: 13.61%;
    left: calc(50% - $layer-width/2 + 1%);
    z-index: 1;
    pointer-events: none;
    //   @include image-home('circle');

    @include respond(large) {
      width: 2934px;
      height: 1168px;
      left: calc(50% - 2934px / 2);
    }
  }
}

.content {
  width: 100vw;
  height: 100vh;
  pointer-events: none;
  @include image-home('mask');
  position: relative;

  .decoration {
    width: 100%;
    height: 100%;
    pointer-events: none;

    background-image: url('~@/assets/image/home/mask-top.png'),
      url('~@/assets/image/home/mask-left.png'),
      url('~@/assets/image/home/mask-right.png'),
      url('~@/assets/image/home/mask-bottom.png');
    background-position: center top, left 8px center, right 8px center,
      center bottom;
    background-size: 99.14% 16px, 29px 68.95%, 29px 68.95%, 99.06% 40px;
    background-repeat: no-repeat;
    margin-bottom: 10px;

    @include respond(large) {
      background-size: 3807px 16px, 29px 1059px, 29px 1059px, 3804px 54px;
    }

    &-background {
      height: 100%;
      background: linear-gradient(90deg, rgba(3, 14, 37, 0) 0%, #030e25 100%),
        linear-gradient(-90deg, rgba(3, 14, 37, 0) 0%, #030e25 100%),
        linear-gradient(0deg, rgba(3, 14, 37, 0) 0%, #030e25 100%),
        linear-gradient(180deg, rgba(3, 14, 37, 0) 0%, #030e25 100%);
      // background-size: calc(100% * 720/1920) 100%, calc(100% * 720/1920) 100%, 100% calc(100% * 620/1080), 100% calc(100% * 620/1080);
      background-size: calc(100% * 620 / 1920) 100%,
        calc(100% * 620 / 1920) 100%, 100% calc(100% * 300 / 1080),
        100% calc(100% * 300 / 1080);
      background-position: right center, left center, center top, center bottom;
      background-repeat: no-repeat;

      @include respond(large) {
        // background-size: calc(100% * 1600/3840) 100%, calc(100% * 1600/3840) 100%, 100% calc(100% * 600/1536), 100% calc(100% * 600/1536);
        background-size: calc(100% * 1150 / 3840) 100%,
          calc(100% * 1150 / 3840) 100%, 100% calc(100% * 400 / 1536),
          100% calc(100% * 400 / 1536);
      }

      &-small {
        background-size: calc(100% * 84 / 1920) 100%,
          calc(100% * 620 / 1920) 100%, 100% calc(100% * 300 / 1080),
          100% calc(100% * 300 / 1080);

        @include respond(large) {
          background-size: calc(100% * 140 / 3840) 100%,
            calc(100% * 1150 / 3840) 100%, 100% calc(100% * 400 / 1536),
            100% calc(100% * 400 / 1536);
        }
      }

      &-fold {
        background-size: calc(100% * 84 / 1920) 100%,
          calc(100% * 84 / 1920) 100%, 100% calc(100% * 300 / 1080),
          100% calc(100% * 300 / 1080);

        @include respond(large) {
          background-size: calc(100% * 140 / 3840) 100%,
            calc(100% * 140 / 3840) 100%, 100% calc(100% * 400 / 1536),
            100% calc(100% * 400 / 1536);
        }
      }
    }

    .bottom {
      position: fixed;
      left: 0;
      right: 0;
      bottom: 0;
      height: 40px;
      font-family: $font-family-title-cn;
      font-size: 18px;
      line-height: 21px;
      letter-spacing: 1px;
      color: rgb(161, 192, 215);
      text-shadow: 0 0 6px rgba(90, 120, 148, 1);
      @include flex-center;

      @include respond(large) {
        height: 54px;
        font-size: 26px;
      }
    }
  }

  .tab {
    $tab-width: 46.88vw;
    width: $tab-width;
    height: 6.03vh;
    position: absolute;
    top: 12.31vh;
    left: calc(50% - $tab-width/2);
    z-index: 10;
    pointer-events: all;
    zoom: 1.1;
    @include image-home('tab-bottom');

    @include respond(large) {
      width: 1200px;
      height: 75px;
      position: absolute;
      top: 150px;
      left: calc(50% - 1200px / 2);
      zoom: 1.4;
    }

    &-decoration {
      width: 80%;
      height: 100%;
      display: flex;
      justify-content: center;
      align-items: flex-start;
      margin: 0 auto;
      background-image: url('~@/assets/image/home/tab-left.png'),
        url('~@/assets/image/home/tab-right.png');
      background-position: left top, right top;
      background-size: 33px 24px;
      background-repeat: no-repeat;
      position: relative;
      top: -6px;

      @include respond(large) {
        top: -16px;
        background-size: 44px 30px;
      }
    }

    &-item {
      width: 200px;
      height: 36px;
      font-family: $font-family-title-cn;
      font-size: 26px;
      line-height: 32px;
      cursor: pointer;
      color: rgba(225, 240, 254, 0.6);
      text-shadow: 0px 2px 2px rgba(0, 0, 0, 0.25);
      margin-right: 4px;
      position: relative;
      top: -10px;

      @include image-home('tab');
      background-size: 100% 38px;
      background-position: center bottom;

      @include respond(large) {
        width: 260px;
        height: 54px;
        font-size: 30px;
        line-height: 35px;
        top: -10px;
        margin-right: 30px;
      }

      &-click,
      &:hover {
        font-size: 26px;
        line-height: 32px;
        color: #ffffff;

        @include respond(large) {
          font-size: 34px;
          line-height: 40px;
        }
      }

      &:nth-last-child(1) {
        margin-right: 0;
      }
    }
  }
}
.popUp {
  width: 70%;
  height: 600px;
  background: linear-gradient(180deg, rgba(0, 0, 0, 0) 0%, #000000 100%),
    rgba(7, 21, 60, 0.6);
  border-radius: 10px 10px 10px 10px;
  border: 2px solid #003f82;
  box-sizing: border-box;
  z-index: 102;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}
.mask {
  position: fixed;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  bottom: 10px;
  z-index: 101;
  background: rgba(8, 15, 38, 0.88);
}
</style>
