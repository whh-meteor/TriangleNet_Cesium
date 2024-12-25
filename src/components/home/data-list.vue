<template>

    <div class="data-list-wrapper">

        <!-- 标题 -->
        <!-- <div class="header-wrapper">

            <span>{{ title }}</span>

            <div class="title-icon"></div>

        </div> -->
        <app-title :title="title">


            <div class="content-header-bg"></div>

            <!-- 内容列表 -->
            <div class="content-wrapper">


                <div class="content-info">

                    <!-- 内容头部标题 -->
                    <div class="content-header">

                        <div v-for="(item, index) in headerContent" :key="index" class="content-header-label"
                            :style="'width:' + item.width">

                            <span :class="item.children ? 'line-double' : 'line-single'">{{ item.title }}</span>

                            <div v-if="item.children" class="child-wrapper">

                                <div v-for="(child, i) in item.children" :key="i" class="content-child-label"
                                    :style="'width:' + child.width">

                                    <span>{{ child.title }}</span>

                                </div>

                            </div>

                        </div>

                    </div>

                    <!-- <div class="data-content-wrapper"> -->

                    <!-- 列表数据 -->
                    <ul class="data-list-ul" :style="calculatedLength">

                        <li v-for="(info, index) in dataList" :key="index" @click="handleClick(info)"
                            :class="{ 'data-click': clickMethods }">

                            <div v-for="(item, index) in headerContent" :key="index" class="data-list-row">

                                <div v-if="item.children" class="data-list-child">

                                    <div v-for="(child, i) in item.children" :key="i" class="data-list-content"
                                        :style="'width:' + child.width">

                                        <el-tooltip :content="info[child.prop] + ''" placement="top" effect="light">

                                            <span>{{ info[child.prop] || '-' }}</span>

                                        </el-tooltip>

                                    </div>

                                </div>

                                <div v-else class="data-list-content" :style="'width:' + item.width">

                                    <el-tooltip :content="info[item.prop] + ''" placement="top" effect="light">

                                        <span>{{ info[item.prop] || '-' }}</span>

                                    </el-tooltip>

                                </div>

                            </div>
                        </li>

                    </ul>

                    <!-- </div> -->

                </div>

            </div>

        </app-title>



    </div>

</template>

<script>
import { getDataList } from "@/api/home";
import title from "./home-title.vue";
import { fly } from '@/api/map/fly.js'
export default {
    name: 'data-list',
    components: {
        'app-title': title
    },
    props: {
        title: {
            type: String,
            default: 'title'
        },
        headerContent: {
            type: Array,
            default: () => { }
        },
        url: {
            type: String,
            default: 'title'
        },
        data: {
            type: Object,
            default: () => { }
        },
        clickMethods: {
            type: Boolean,
            default: false
        }

    },
    data() {
        return {
            dataList: []
        }
    },
    computed: {

        calculatedLength: function () {
            let length = 0
            this.headerContent.forEach(item => {
                if (item.children) {
                    item.children.forEach(child => {
                        length += Number(child.width.replace('px', ''))
                    })
                } else {
                    length += Number(item.width.replace('px', ''))
                }
            });
            console.log(this.headerContent.length);
            // return length + 'px'
            return {
                'width': length + this.headerContent.length * 4 + 'px'
            }
        }
    },
    mounted() {
        this.getListData()
    },
    methods: {
        getListData() {
            console.log('this.data',this.data);
            
            getDataList(this.url, this.data).then(res => {
                if (res.success) {
                    this.dataList = res.result
                } else {
                    this.dataList = []
                }
            })
        },
        // 点击联动地图
        handleClick(item) {

            if (this.clickMethods) {
                if (this.data.areaType === '高石123号构造') {
                    fly(item.trapName)
                } else if (this.data.areaType === '高石3号大构造') {
                    fly(item.sugWell)
                }

            }
        }

    }
}
</script>

<style scoped>
.data-list-wrapper {
    /* width: 100%;
    height: 100%;
    background: linear-gradient(180deg, rgba(33, 133, 232, 0.09) 0%, rgba(36, 127, 236, 0.05) 48%, rgba(31, 127, 223, 0.03) 70%, rgba(51, 153, 255, 0.02) 87%, rgba(0, 170, 255, 0.01) 100%);
    border-radius: 5px 5px 5px 5px;
    border: 1px solid;
    border-image: linear-gradient(180deg, rgba(41, 114, 213, 1), rgba(6, 77, 129, 1)) 1 1; */
    position: relative;
    height: 100%;
}

.header-wrapper {
    height: 51px;
    background-image: url('@/assets/image/home/datalist/title_bg.png');
    line-height: 51px;
    font-family: SourceHanSansCN-Medium;
    font-weight: 500;
    font-size: 16px;
    color: #FFFFFF;
    text-align: left;
    display: flex;
    align-items: center;
    justify-content: space-between;
    background-repeat: no-repeat;
    background-size: 100%;
}



.header-wrapper>span {
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    /* 可选，当内容超出一行时，用省略号表示 */
}

.header-wrapper>img {
    vertical-align: middle;
    margin-right: 10px;
}

.header-wrapper>span {
    padding-left: 10px;
}

.title-icon {
    width: 55px;
    height: 16px;
    margin-right: 10px;
    background-image: url('@/assets/image/home/datalist/title_icon.png');
}

@media screen and (min-height: 1530px) {
    .title-icon {
        width: 83px;
        height: 16px;
        margin-right: 10px;
        background-image: url('@/assets/image/home/datalist/title_icon.png');
    }
}

/* 列表标题 */
.content-wrapper {
    overflow: hidden;
    padding-left: 10px;
    padding-top: 10px;
    /* width: calc(100% - 30px); */
    width: calc(100% - 20px);
    height: calc(100% - 56px);
    position: relative;
    /* padding-right: 10px; */
    /* overflow: auto; */
}

.content-info {
    /* overflow: auto; */
    padding-bottom: 10px;
    overflow-y: hidden;
    width: 102%;
    height: calc(100% - 12px);
}

.content-header {
    font-family: "SourceHanSansCN-Medium";
    font-weight: 500;
    font-size: 16px;
    color: #04ABFF;
    height: 60px;
    white-space: nowrap;
    /* font-weight: 700; */
    text-align: left;
}

@media screen and (min-height: 1530px) {
    .content-header {
        height: 70px;
        font-size: 22px;
    }
}

.content-header-bg {
    width: calc(100% - 20px);
    height: 60px;
    position: absolute;
    top: 49px;
    left: 9px;
    background: linear-gradient(90deg, rgba(74, 123, 197, 0) 0%, rgba(74, 123, 197, 0.12) 2%, rgba(74, 123, 197, 0.12) 100%), linear-gradient(90deg, rgba(75, 124, 195, 0) 0%, rgba(78, 122, 196, 0.2) 3%, rgba(75, 124, 195, 0.37) 5%, rgba(75, 124, 195, 0) 88%), linear-gradient(90deg, rgba(69, 154, 255, 0) 0%, rgba(69, 154, 255, 0.13) 4%, rgba(72, 157, 255, 0.08) 18%, rgba(69, 154, 255, 0) 38%);

}

@media screen and (min-height: 1530px) {
    .content-header-bg {
        height: 70px;
        top: 48px;
        left: 9px;
    }
}


.content-header-label {
    display: inline-block;
    /* padding: 0 24px; */
    height: 60px;
    vertical-align: bottom;
    border: 1px solid rgba(1, 128, 254, 0.3);
    text-overflow: ellipsis;
    overflow: hidden;
    /* display: -webkit-box; */
    -webkit-line-clamp: 1;
    -webkit-box-orient: vertical;
    text-align: center;
}

@media screen and (min-height: 1530px) {
    .content-header-label {
        height: 70px;
    }
}

.child-wrapper {
    border-top: 2px solid rgba(1, 128, 254, 0.3);
}

.child-wrapper :last-child {
    border-right: none;
}

.content-child-label {
    display: inline-block;
    /* padding: 0 24px; */
    height: 30px;
    line-height: 30px;
    border-right: 1px solid rgba(1, 128, 254, 0.3);
    text-overflow: ellipsis;
    overflow: hidden;
    /* display: -webkit-box; */
    -webkit-line-clamp: 1;
    -webkit-box-orient: vertical;

}

@media screen and (min-height: 1530px) {
    .content-child-label {
        height: 35px;
    }
}

.line-double {
    line-height: 30px;
}

.line-single {
    line-height: 60px;
}

@media screen and (min-height: 1530px) {
    .line-double {
        line-height: 35px;
    }

    .line-single {
        line-height: 70px;
    }
}

/* 列表数据 */
.data-list-ul {
    list-style: none;
    padding: 0px;
    margin: 0px;
    font-family: "SourceHanSansSC-Normal";
    font-weight: 400;
    font-size: 14px;
    color: #FFFFFF;
    overflow-y: auto;
    /* width: 1920px; */
    height: 228px;
    text-align: left;
    white-space: nowrap;
    /* overflow: hidden; */
}

/* 全屏高度 */
@media screen and (min-height: 1080px) {
    .data-list-ul {
        /* height: 280px; */
        height: calc(100% - 60px);
    }
}

/* 一行标签栏 */
@media screen and (max-height: 942px) {
    .data-list-ul {
        height: 210px;
        height: calc(100% - 60px);
    }
}

@media screen and (min-height: 1530px) {
    .data-list-ul {
        height: 900px;
        height: calc(100% - 70px);
    }
}

@media screen and (min-width: 3830px) {
    .data-list-ul {
        font-size: 20px;
    }
}

.data-click {
    cursor: pointer;
}

::-webkit-scrollbar {
    width: 2px;
    height: 1px;
}

::-webkit-scrollbar-thumb {
    border-radius: 0px;
    -webkit-box-shadow: inset 0 0 2px #1688FF;
    background: #1688FF;
}

::-webkit-scrollbar-track {
    -webkit-box-shadow: inset 0 0 2px rgba(217, 217, 217, 0.4);
    background: rgba(217, 217, 217, 0.4);
}

.data-list-ul>li {
    border-left: 1px solid rgba(4, 171, 255, 0.5);
    border-right: 1px solid rgba(4, 171, 255, 0.5);
}

.data-content-wrapper {
    height: 188px;
    overflow: auto;
    /* overflow-y: hidden; */
    /* overflow-y: clip; */
}

.data-list-ul>li {
    height: 30px;
    list-style: none;
    padding: 0px;
    margin: 0px;
    white-space: nowrap;
    margin-bottom: 2px;

}

@media screen and (min-width: 3830px) {
    .data-list-ul>li {
        height: 60px;
    }
}

.data-list-row {
    height: 30px;
    display: inline-block;
    border-right: 1px solid rgba(4, 171, 255, 0.5);
}

@media screen and (min-width: 3830px) {
    .data-list-row {
        height: 60px;
    }
}

/* .data-list-child :last-child{
    border-right: none;
} */

.data-list-content {
    display: inline-block;
    background: rgba(1, 128, 254, 0.15);
    border-right: 1px solid rgba(4, 171, 255, 0.5);
    height: 30px;
    line-height: 30px;
    text-align: center;
    text-overflow: ellipsis;
    overflow: hidden;
    /* display: -webkit-box; */
    -webkit-line-clamp: 1;
    -webkit-box-orient: vertical;

}

@media screen and (min-width: 3830px) {
    .data-list-content {
        height: 60px;
        line-height: 60px;
    }

    .data-list-content>span {
        display: inline-block;
        width: calc(100% - 20px);
        text-overflow: ellipsis;
        overflow: hidden;
        /* display: -webkit-box; */
        -webkit-line-clamp: 1;
        -webkit-box-orient: vertical;
    }
}

/* 滚动条样式更改 */
::-webkit-scrollbar {
    width: 6px;
    height: 6px;
}

::-webkit-scrollbar-thumb {
    border-radius: 5px;
    /* background-color: rgba(226, 117, 16, 0.5); */
    background-color: #074EBB;
}

::-webkit-scrollbar-track {
    box-shadow: inset 0 0 2.5px rgba(20, 20, 20, 0.1);
    /* background-color: rgba(7, 36, 77, 0.5); */
    border-radius: 5px;
    background: rgba(7, 39, 83, 0.4);
}

.data-content-wrapper::-webkit-scrollbar {
    width: 6px;
    height: 1px;
    position: relative;
    right: -20px;
}

.data-content-wrapper::-webkit-scrollbar-thumb {
    border-radius: 5px;
    background-color: #bbb807;
    position: relative;
    right: -20px;
}

.data-content-wrapper::-webkit-scrollbar-track {
    box-shadow: inset 0 0 2.5px rgba(20, 20, 20, 0);
    border-radius: 5px;
    background: rgba(7, 39, 83, 0);
    position: relative;
    right: -20px;
}

/* ul,
ol,
li {
  list-style: none;
  padding: 0px;
  margin: 0px;
} */
</style>