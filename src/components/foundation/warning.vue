<template>
  <div v-show="hasWarning" class="warning-container flex items-center justify-center">
    <div>
      <!-- 顶 -->
      <div class="warning-top rounded-sm text-sm py-3 pl-4 pr-2 flex">
        <!-- 图标 -->
        <span class="warning-text flex justify-center items-center"></span>
        <!-- 文字 -->
        <div class="waringtext-container">
          <p id="warningText" class="ww flex justify-center items-center truncate">
            <span class="cursor-pointer warning-span" v-for="(item, index) in detailString" :key="index" :style="{
              color: item.alarmLevel == '红色预警' ? '#FF4A4A' : '#FFCC4A'
            }" @click="showDetailFunction(true, index)">
              <img src="@/assets/image/warning.png" alt="" srcset="" v-if="item.alarmLevel == '红色预警'"
                class="warning-img" />
              <img src="@/assets/image/warningYellow.png" v-else-if="item.alarmLevel == '黄色预警'" alt="" srcset=""
                class="warning-img" />
              {{ item.content }}</span>
          </p>
        </div>
      </div>
      <!-- 点击弹出的提示 -->
      <div v-show="showDetail" :class="detail" class="rounded-lg mt-2 py-3 px-3.5" >
        <div class="warning-detail-title flex justify-between items-center">
          <p class="warning-text flex justify-center items-center text-base">
            {{ currentInfo.alarmLevel }}
          </p>
          <div id="closeWarning" class="warning-text-after" @click="showDetailFunction(false, -1)"></div>
        </div>

        <div class="warning-content mt-2 rounded py-3 pl-2.5 pr-1 text-xs">
          <p>监测时间：{{ currentInfo.dataTime }}</p>
          <p>监测对象：{{ currentInfo.alarmType }}</p>
          <p>阈值范围：{{ currentInfo.min+currentInfo.unit+'~'+currentInfo.max+currentInfo.unit }}</p>
          <p>响应行动：{{ currentInfo.strategy }}</p>
         
        </div>
      </div>
    </div>
  </div>
</template>
<script>
// import { alarmNowDay } from '@/api/home'
export default {
  name: 'warning',
  props: {},
  data() {
    return {
      showDetail: false, //是否展示细节
      hasWarning: false, //是否显示预警
      alarmText: null, //提示文本
      detailInfo: [
        {
          itemName: "温度",
          min: '20',
          max: '50',
          unit: '°C',
          alarmLevel: '红色预警',
          dataTime: '2024-12-02 14:00:01',
          alerts: '温度异常，当前温度为57℃',
          alarmType:'温湿度传感器',
          strategy: '请检查设备或环境是否出现故障，如果温度异常持续，请联系相关维护人员'
        },
        {
          itemName: "风速",
          min: '2',
          max: '20',
          unit: 'm/s',
          alarmLevel: '黄色预警',
          dataTime: '2024-12-13 12:10:46',
          alerts: '风速超出设定范围，当前风速为22m/s',
          alarmType:'三维风速仪',
          strategy: '请检查风速仪的安装与校准状态，加强设备固定与安全防护措施'
        },
        {
          itemName: "甲烷",
          min: '5',
          max: '20',
          unit: 'mg/m',
          alarmLevel: '黄色预警',
          dataTime: '2024-12-23 00:29:43',
          alerts: '甲烷浓度已达到中级报警阈值，当前浓度为20mg/m',
          alarmType:'甲烷传感器',
          strategy: '请检查检查通风系统，确认传感器状态，撤离人员，排除险情'
        },
        {
          itemName: "地震波",
          min: '0',
          max: '7.9',
          unit: 'km/s',
          alarmLevel: '红色预警',
          dataTime: '2024-11-06 13:12:01',
          alerts: '海底设备监测到的地震波速度达到设定阈值，当前速度为10km/s',
          alarmType:'海底地震仪',
          strategy: '请立即启动全域安全检查程序，并进行多点确认，以排除误报或数据异常，避免可能的重大事故'
        },
        {
          itemName: "降水量",
          min: '0',
          max: '150',
          unit: 'mm',
          alarmLevel: '黄色预警',
          dataTime: '2024-12-16 09:12:31',
          alerts: '系统检测到当前降雨强度为60 mm/h，累计降雨量110 mm，已超过正常阈值',
          alarmType:'雨量计',
          strategy: '请持续观察降雨量，预测未来降水趋势，加强对排水系统的检查和疏通，防止积水'
        },

      ], //滚动条Object
      currentInfo: {}, //当前选择的预警
      detailString: [], //滚动条String,
      alerm: 'warningYellow-top',
      detail: 'warningYellow-detail'
    }
  },
  watch: {},
  mounted() { },
  created() {
    this.alarmNowDay()
    setInterval(()=>{
      this.alarmNowDay()
    },100)
    
    console.log(this.alerm)
  },
  methods: {
    // 点击关闭
    showDetailFunction(e, idx) {
      this.showDetail = e
      this.currentInfo = idx != -1 ? this.detailInfo[idx] : {}
      console.log(this.currentInfo)
      if (this.currentInfo.alarmLevel == '红色预警') {
        this.detail = 'warning-detail'
      } else if (this.currentInfo.alarmLevel == '黄色预警') {
        this.detail = 'warningYellow-detail'
      } else {
        this.detail = 'warningWhite-detail'
      }
      let icon = document.getElementById('warningText')
      let close = document.getElementById('closeWarning')
      icon.addEventListener('click', function () {
        icon.style.animationPlayState = 'paused'
      })
      close.addEventListener('click', function () {
        icon.style.animationPlayState = 'running'
      })
    },
    // 获取预警
    alarmNowDay() {
      this.hasWarning = true;
      this.detailString=[]
      this.detailInfo.forEach((el) => {
        this.detailString.push({
          alarmLevel: el.alarmLevel,
          content: `${el.alarmLevel} 监测时间:${el.dataTime} ${el.alerts} ${el.strategy} 阈值范围:${el.min+el.unit}~${el.max+el.unit}`
        })
      })

    }
  }
}
</script>
<style lang="scss" scoped>
// @import '@/style/index';
$warnig-background: rgba(83, 9, 9, 0.3);
$warning-width: 52rem;

@mixin image-setting-home($name) {
  background-image: url("~@/assets/image/#{$name}.png");
  background-repeat: no-repeat;
  background-size: 100% 100%;

}

.warning-container {
  width: $warning-width;
  display: flex;
  align-items: center;
  // justify-content: center;
  margin: 0 auto;

  .warning-top {
    background: rgba(1, 27, 41, 0.45);
    max-width: $warning-width;
    width: fit-content;
    overflow: hidden;

    .warning-text {
      font-family: Source Han Sans CN;
      font-weight: bold;
      // color: #ff4a4a;
      // line-height: 2.375rem;
      // animation: marquee 5s linear infinite;
      // overflow: hidden;
      white-space: nowrap;

      // &:nth-child(1)::before {
      //   content: '';
      //   display: inline-block;
      //   width: 1.5rem;
      //   height: 1.25rem;
      //   @include image-setting-home('warning');
      //   margin-right: 0.5rem;
      // }

      .warning-span {
        // overflow: hidden;
        white-space: nowrap;
        width: 100%;
        display: inline;
        padding: 5px;
      }
    }
  }

  .warningWhite-detail {
    width: fit-content;
    min-width: 15rem;
    background-color: rgba(1, 27, 41, 0.45);

    .warning-detail-title {
      border-bottom: 2px solid #fff;
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 0 0.6rem;
    }

    .warning-text {
      color: #fff;
      font-family: ABeeZee, ABeeZee;
      font-weight: 400;
      font-size: 1.25rem;
      color: #fff;
      line-height: 3.09rem;
      text-align: left;
      font-style: normal;
      text-transform: none;
    }

    // .warning-text::before {
    //   content: '';
    //   display: inline-block;
    //   width: 1.5rem;
    //   height: 1.25rem;
    //   @include image-setting-home('warning');
    //   margin-right: 0.5rem;
    // }
    .warning-text-after {
      width: 1rem;
      height: 1rem;
      cursor: pointer;
      // @include image-setting-home('close');
    }

    .warning-content {
      font-family: Source Han Sans CN, Source Han Sans CN;
      color: #fff;
      line-height: 1.4375rem;
      border: 1px solid #fff;
    }
  }

  .warning-detail {
    width: fit-content;
    min-width: 15rem;
    background-color: rgba(1, 27, 41, 0.45);
    margin-top: 6px;

    .warning-detail-title {
      border-bottom: 2px solid #ab0909;
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding:0 0.6rem;
    }

    .warning-text {
      color: #ab0909;
      font-family: ABeeZee, ABeeZee;
      font-weight: 400;
      font-size: 1.25rem;
      color: #ff4a4a;
      line-height: 3.09rem;
      text-align: left;
      font-style: normal;
      text-transform: none;
    }

    .warning-text::before {
      content: '';
      display: inline-block;
      width: 1.5rem;
      height: 1.25rem;
      @include image-setting-home('warning');
      margin-right: 0.5rem;
    }

    .warning-text-after {
      width: 1rem;
      height: 1rem;
      cursor: pointer;
      @include image-setting-home('close');
    }

    .warning-content {
      font-family: Source Han Sans CN, Source Han Sans CN;
      color: #ff4a4a;
      line-height: 1.4375rem;
      border: 1px solid rgba(171, 9, 9, 0.5);
      text-align: left;
      padding:0 0.4rem;
    }
  }

  .warningYellow-detail {
    width: fit-content;
    min-width: 15rem;
    background-color: rgba(1, 27, 41, 0.45);
    margin-top: 6px;
    .warning-detail-title {
      border-bottom: 2px solid #ffcc4a;
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding:0 0.6rem;
    }

    .warning-text {
      color: #ffcc4a;
      font-family: ABeeZee, ABeeZee;
      font-weight: 400;
      font-size: 1.25rem;
      color: #ffcc4a;
      line-height: 3.09rem;
      text-align: left;
      font-style: normal;
      text-transform: none;
    }

    .warning-text::before {
      content: '';
      display: inline-block;
      width: 1.5rem;
      height: 1.25rem;
      @include image-setting-home('warningYellow');
      margin-right: 0.5rem;
    }

    .warning-text-after {
      width: 1rem;
      height: 1rem;
      cursor: pointer;
      @include image-setting-home('close');
    }

    .warning-content {
      font-family: Source Han Sans CN, Source Han Sans CN;
      color: #ffcc4a;
      line-height: 1.4375rem;
      border: 1px solid rgba(186, 136, 9, 0.3);
    }
  }
}

.warning-img {
  display: inline-block;
  width: 1.5rem;
  height: 1.25rem;
  margin-right: 0.5rem;
  margin-left: 0.5rem;
  vertical-align: middle;
  padding-bottom: 3px;
}

.waringtext-container {
  width: 100%;
  overflow: hidden;

  .ww {
    pointer-events: all;
    width: fit-content;
    animation: marquee 90s linear infinite;
    font-family: Source Han Sans CN;
    font-weight: bold;
    line-height: 2.375rem;
    // animation: marquee 5s linear infinite;
    // overflow: hidden;
    white-space: nowrap;

    &:nth-child(1)::before {
      content: '';
      display: inline-block;
      width: 0;
      height: 0;
      @include image-setting-home('warning');
      margin-right: 0;
    }
  }

  .warning-span {
    // overflow: hidden;
    white-space: nowrap;
    width: 100%;
    display: inline;
    padding: 30px;
    padding-bottom: 0;
    padding-top: 0;
  }
}
.rounded-lg{
  border-radius: 6px;
  pointer-events: all;
}

@keyframes marquee {
  0% {
    transform: translateX(0%);
  }

  // 80%{
  //     transform: translateX(-100%);
  // }

  100% {
    transform: translateX(-100%);
  }

  // 95% {
  //     transform: translateX(200%);
  // }

  // 100% {
  //     transform: translateX(0);
  // }
}
</style>
