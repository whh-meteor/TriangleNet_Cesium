
<!-- 盆地通用组件 -->
<template>
    <div class='container' :style="getCommonStyle">
        <div :class="['header', { 'header-long': longHeader }]">
            <div class="decoration">
                <span class="title">{{ title }}</span>
            </div>
            <img class="animate" :src="require(longHeader?'@/assets/image/home/animate-long-2.png':'@/assets/image/home/animate.png')" alt="">
            
        </div>
        <div
            :class="['contents', { 'contents-border-top': borderType === 'top' }, { 'contents-border-bottom': borderType === 'bottom' }, { 'contents-border-none': borderType === 'none' },{'contents-long':longHeader}]" :style="getCommonContents">
            <slot></slot>
        </div>
    </div>
</template>

<script>

export default {
    components: {},
    props: {
        title: {
            type: String,
            default: ''
        },
        borderType: {
            type: String,
            default: 'border'
        },
        longHeader: {
            type: Boolean,
            default: false
        },
        commonStyle:{
            type:Object,
            default:()=>{}  
        },
        commonContents:{
            type:Object,
            default:()=>{}  
        }
    },
    data() {
        return {

        };
    },
    computed: {
        getCommonStyle(){
            return screen.width===3840?{}:this.commonStyle
        },
        getCommonContents(){
            return screen.width===3840?{}:this.commonContents
        }
    },
    watch: {},
    methods: {

    },
    created() {

    },
    mounted() {

    },
    /*生命周期 - 创建之前*/
    beforeCreate() { },
    /*生命周期 - 挂载之前*/
    beforeMount() { },
    /*生命周期 - 更新之前*/
    beforeUpdate() { },
    /*生命周期 - 更新之前*/
    updated() { },
    /*生命周期 - 销毁之前*/
    beforeDestroy() { },
    /*生命周期 - 销毁完成*/
    destroyed() { },
    /*如果页面有keep-alive缓存功能，这个函数会触发*/
    activated() { },
}
</script>
<style lang='scss' scoped>
.container {
    width: 100%;
    pointer-events: all;

    .header {
        width: calc(100% - 18px);
        height: 28px;
        text-align: left;
        position: relative;
        margin-bottom: 10px;
        position: relative;
        left: 17px;
        // @include image-home('slot-header-1080');
        background: linear-gradient(90deg, rgba(74, 123, 197, 0) 0%, rgba(74, 123, 197, 0.12) 2%, rgba(74, 123, 197, 0.12) 100%), linear-gradient(90deg, rgba(75, 124, 195, 0) 0%, rgba(78, 122, 196, 0.2) 3%, rgba(75, 124, 195, 0.37) 5%, rgba(75, 124, 195, 0) 88%), linear-gradient(90deg, rgba(69, 154, 255, 0) 0%, rgba(69, 154, 255, 0.13) 4%, rgba(72, 157, 255, 0.08) 18%, rgba(69, 154, 255, 0) 38%);
        .decoration{
            @include image-home('slot-decoration');
            background-size: 83px 15px;
            background-position: right 12px top 44%;
        }
        .animate{
            width: 100%;
        }

        @include respond(large) {
            // @include image-home('slot-header');
        }

        &-long {
            // @include image-home('slot-header-long-1080');

            @include respond(large) {
                // @include image-home('slot-header-long');
            }

            img {
                position: absolute;
                bottom: 0 !important;
                width: 100%;

                @include respond(large) {
                    // bottom: -42px !important;
                }
            }
        }

        img {
            position: absolute;
            bottom: 0%;
            width: 100%;

            @include respond(large) {
                bottom: -2px;
            }
        }

        .title {
            font-family: $font-family-title-cn;
            font-size: 24px;
            line-height: 31px;
            color: #fff;
            // text-shadow:  0px 0px 8px rgba(39, 175, 255, 0.56),2px 2px 8px rgba(13, 24, 45, 0.26);
            background: linear-gradient(21deg, #FFFFFF 0%, #8BC7FF 100%);
            @include text-background;
            padding: 0 calc( 25px);
            position: relative;
            top: -10px;

            @include respond(large) {
                font-size: 30px;
                line-height: 39px;
                top: -14px;
            }
        }

        &::before {
            content: '';
            width: 36px;
            height: 36px;
            position: absolute;
            top: -5px;
            left: -23px;
            @include image-home('slot-dot')
        }


    }

    .contents {
        border: 4px solid;
        border-image: url("~@/assets/image/home/border-top.png") 30;

        @include respond(large) {

            border-image: url("~@/assets/image/home/border-top.png") 30;
        }



        &-border-top {
            border-bottom: none;
        }

        &-border-bottom {
            border-top: none;
        }

        &-border-none {
            border: none;
        }
        &-long{
            @include respond(large){
                padding-left: 23px;
            }
        }
    }
}</style>