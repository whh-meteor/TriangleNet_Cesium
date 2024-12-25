<template>
    <div class="header">
        <p class="header-date">{{ currentDate }} {{ currentWeek }} <span>{{ currentTime }}</span></p>
        <div class="header-title">
            <div class="title-d">
                <!-- <div class="title-decoration"></div> -->
                <span class="title-text">{{ title }}</span>
                <!-- <div class="title-decoration"></div> -->
            </div>

        </div>
        <div class="header-login">
            <div class="other-page" @click="goPage" title="可视化"></div>
            <div class="circle"></div>
            <span class="welcome">欢迎您，{{ nameUser }}</span>
            <div class="loginout" @click="loginOut">
                <div class="map-exit"></div>
                <span class="exit-text">退出</span>
            </div>
        </div>
    </div>
</template>
<script>
import * as dayjs from 'dayjs';
import { loginOut as loginOutMethod } from '@/api/login/login';
export default {
    data() {
        return {
            title: window.GLOBAL_CONFIG.TITLE,
            buttonText: '可视化',
            nameUser: '',
            currentTime: dayjs(new Date()).format('HH:mm:ss'),
            timer: null
        }
    },
    computed: {
        // 当前日期
        currentDate() {
            return dayjs(new Date()).format('YYYY-MM-DD')
        },
        // 当前星期几
        currentWeek() {
            const week = ["星期日", "星期一", "星期二", "星期三", "星期四", "星期五", "星期六"];
            return week[new Date().getDay()]
        },

    },
    watch: {
        $route: {
            immediate: true, // 一旦监听到路由的变化立即执行
            handler(to, from) {
                this.buttonText = to.meta?.classify === 'visualization' ? '一张图' : '可视化'
            }
        }
    },
    mounted() {
        this.buttonText = this.$router.currentRoute.meta?.classify === 'visualization' ? '一张图' : '可视化';
        this.nameUser = this.$store.state.userInfo.userInfo.username;
        this.setCurrentTime()
    },
    beforeDestroy() {
        clearInterval(this.timer);
    },
    methods: {
        // 退出
        loginOut() {
            loginOutMethod()
        },
        goPage() {
            if (this.buttonText === '一张图') {
                this.$router.push('/')
            } else {
                this.$router.push('/visualization')
            }

        },
        setCurrentTime() {
            this.timer = setInterval(() => {
                this.currentTime = dayjs(new Date()).format('HH:mm:ss')
            }, 1000);
        }
    }
}
</script>
<style lang="scss" scoped>
.header {
    width: 100%;
    height: $content-height;
    padding: 0 42px;
    position: relative;
    display: flex;
    justify-content: space-between;
    align-items: start;
    box-sizing: border-box;

    @include respond(large) {
        height: 148px;
        padding: 0 84px;
        margin-bottom: 7px;
    }

    @mixin common {
        margin-top: 4vh;
    }

    &-date {
        font-family: $font-family-number;
        font-size: 18px;
        line-height: 21px;
        letter-spacing: 1px;
        color: rgb(161, 192, 215);

        padding-left: calc(55px - 42px);
        text-shadow: 0 0 6px rgba(90, 120, 148, 1);
        @include common;

        @include respond(large) {
            padding-left: calc(141px - 84px);
        }

        span {
            font-family: $font-family-number-subtitle;
            margin-left: 30px;
        }
    }

    &-title {
        width: calc(100% - 42px * 2);
        height: 100%;
        position: absolute;
        @include image-home('title');
        display: flex;
        justify-content: center;
        align-items: flex-start;

        @include respond(large) {
            width: 2652px;
            left: calc(50% - 2652px / 2);
            align-items: flex-start;
        }

        .title-d {
            @include flex-center;

        }

        .title-decoration {
            width: 26px;
            height: 22px;
            @include image-home('title-decoration');

            &:last-child {
                transform: rotateY(180deg)
            }
        }

        .title-text {
            font-family: $font-family-title-cn;
            font-size: 50px;
            color: #FFFFFF;
            line-height: 65px;
            letter-spacing: 15px;
            padding: 0 calc(60px - 15px) 0 60px;
            margin-top: 12px;
            text-shadow: 0px 0px 1px rgba(255, 255, 255, 0.5), 0px 0px 18px rgba(130, 165, 255, 0.25), 0px 4px 1px rgba(19, 80, 143, 0.26);
            background: linear-gradient(180deg, #FFFFFF 21%, #E9F8FF 41%, #007EFF 74%);
            @include text-background;

            @include respond(large) {
                font-size: 60px;
                line-height: 78px;
                letter-spacing: 18px;
                padding: 0 calc(60px - 18px) 0 60px;
            }
        }
    }

    &-login {
        z-index: 100;
        @include common;
        @include flex-center;

        @include respond(large) {
            zoom: 1.3;
            margin-top: 1.5vh;
        }


        .other-page {
            // width: 107px;
            width: 20px;
            height: 20px;
            font-family: $font-family-title-cn;
            font-size: 16px;
            color: #C5E6FF;
            line-height: 19px;
            letter-spacing: 3px;
            text-shadow: 3px 4px 4px rgba(16, 67, 97, 0.33);
            cursor: pointer;
            pointer-events: all;
            margin-right: 20px;
            @include image-home('visiual-icon');
            @include flex-center;

            @include respond(large) {
                width: 26px;
                height: 26px;
                // margin-right: 50px;
                font-size: 20px;
            }
        }

        .circle {
            width: 8px;
            height: 8px;
            border-radius: 50%;
            background: #09DDFB;
            margin-right: 10px;
        }

        .welcome {
            font-family: $font-family-cn;
            font-size: 14px;
            color: rgba(255, 255, 255, 0.8);
            line-height: 14px;

            @include respond(large) {
                font-size: 16px;
            }
        }

        .loginout {
            cursor: pointer;
            @include flex-center;
            pointer-events: all;
            font-family: $font-family-cn;

            font-size: 16px;
            color: rgba(255, 255, 255, 1);
            line-height: 10px;

            .map-exit {
                width: 14px;
                height: 14px;
                margin: 0 8px 0 16px;
                @include image-home('exit');
            }

            .exit-text {
                font-family: $font-family-cn;
                font-size: 14px;
                color: rgba(255, 255, 255, 0.8);
                line-height: 14px;

                @include respond(large) {
                    font-size: 16px;
                }
            }
        }
    }


}
</style>