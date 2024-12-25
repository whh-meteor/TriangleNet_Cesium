<!-- 通用列表 -->
<template>
    <div class="table">
        <!-- 标题 -->
        <div class="table-title">
            <div class="decoration">
                <span class="table-title-text" :title="title">{{ title }}</span>
                <div v-if="hasSelect" class="select">
                    <select name="well" id="well" class="well">
                        <option v-for="(item, index) in wellList" :key="index" :value="item.title">{{ item.title }}</option>
                    </select>
                </div>
            </div>
        </div>

        <div class="table-content">
            
            <div class="table-con">
                <div class="mask"></div>
                <!-- 只用这个table的header -->
                <table border="1" class="tb tb-absolute" ref="tableHeader">
                    <thead class="thead">
                        <tr>
                            <th :class="['thead-th',{'thead-th-one':!secondTitle.length}]"  v-for="(item, index) in currentTitle" :rowspan="item.rowspan" :colspan="item.colspan"
                                v-html="item.title" :key="index"></th>
                        </tr>
                        <tr>
                            <th :class="['thead-th',{'thead-th-one':!secondTitle.length}]" v-for="(item, index) in secondTitle" v-html="item.title" :key="index"></th>
                        </tr>
                    </thead>
                </table>
                <div class="tb-relative">
                    <!-- 只用这个table的body -->
                    <table border="1" class="tb tb-relative" :style="`top:-${tableHeight - 2}px`">
                        <thead class="thead" style="visibility: hidden;">
                            <tr>
                                <th :class="['thead-th',{'thead-th-one':!secondTitle.length}]" v-for="(item, index) in currentTitle" :rowspan="item.rowspan" :colspan="item.colspan"
                                    v-html="item.title" :key="index" style="height: 0;"></th>
                            </tr>
                            <tr>
                                <th :class="['thead-th',{'thead-th-one':!secondTitle.length}]" v-for="(item, index) in secondTitle" v-html="item.title" :key="index"
                                    style="height: 0;"></th>
                            </tr>
                        </thead>
                        <tbody class="tbody">
                            <tr v-for="idx in 100" :key="idx">
                                <th class="th" v-for="(item, index) in currentTitleFlat" :key="index" @click="clickItem(item)">

                                    <span v-if="item.prop==='index'">{{ idx }}</span>
                                    <span v-else>{{ item.title }}</span>
                                </th>
                            </tr>

                        </tbody>

                    </table>
                </div>
            </div>

        </div>

    </div>
</template>

<script>

export default {
    props: {
        title: {
            type: String,
            default: 'title'
        },
        hasSelect: {
            type: Boolean,
            default: false
        },
        tableTitle: {
            type: Array,
            default: () => { }
        },
        totalClass: {
            type: Number,
            default: 0

        }
    },
    data() {
        return {
            wellList: [
                {
                    title: '建议1井',
                },
                {
                    title: '建议2井',
                },
                {
                    title: '建议3井',
                },
                {
                    title: '建议4井',
                },
            ],
            tableHeight: 0,
            secondTitle: [],
            tableValue: []
        };
    },
    computed: {
        // 循环获取子数组
        currentTitle() {
            return this.tableTitle.map(el => {
                el?.children ? this.secondTitle.push(...el.children) : ''
                return {
                    rowspan: el.children ? 1 : 2,
                    colspan: el?.children?.length || el?.colspan || 1,
                    title: el.title
                }
            })
        },
        currentTitleFlat(){
            let arr=[]
            this.tableTitle.forEach(el => {
                if(el?.children?.length){
                    arr.push(...el.children)
                }else{
                    arr.push(el)
                }
            })
            return arr;
        }

    },
    created() {

    },
    mounted() {
        this.getHeight()
    },
    methods: {
        // 获取table的高
        getHeight() {
            this.tableHeight = this.$refs.tableHeader.offsetHeight
        },
        // 点击选项
        clickItem(item){
            this.$emit('onClick',item)
        }   
    },
}
</script>
<style lang='scss' scoped>
.table {
    width: 100%;
    height: 100%;
    background: linear-gradient(180deg, rgba(33, 133, 232, 0.09) 0%, rgba(36, 127, 236, 0.05) 48%, rgba(31, 127, 223, 0.03) 70%, rgba(51, 153, 255, 0.02) 87%, rgba(0, 170, 255, 0.01) 100%);
    border-radius: 5px;
    border: 1px solid;
    border-image: linear-gradient(180deg, rgba(41, 114, 213, 1), rgba(6, 77, 129, 1)) 1 1;
    color: #fff;

    &-title {
        height: 50px;

        padding: 0 22px 0 10px;
        @include image-home('list-title');

        @include respond(large) {
            height: 60px;
            padding: 0 22px 0 20px;
        }

        .decoration {
            width: 100%;
            height: 100%;
            display: flex;
            align-items: center;
            justify-content: space-between;
            @include image-home('list-decoration-1080');
            background-size: 83px 15px;
            background-position: right center;


            @include respond(large) {
                @include image-home('list-decoration');
                background-size: 83px 15px;
            }
        }

        &-text {
            font-family: $font-family-cn;
            font-weight: 500;
            font-size: 16px;
            line-height: 20px;
            color: #FFFFFF;
            max-width: 81%;
            @include text-overflow;

            @include respond(large) {
                font-size: 24px;
                line-height: 24px;
            }
        }

        .select {
            position: relative;
            margin-right: calc(83px + 20px);
            cursor: pointer;

            &::after {
                content: '';
                position: absolute;
                top: calc(50% - 9px);
                right: 11px;
                width: 18px;
                height: 18px;
                display: block;
                @include image-home('arrow');
                @include respond(large) {
                    top: calc(50% - 13px);
                    right: 20px;
                    width: 26px;
                height: 26px;
            }
            }

            @include respond(large) {
                margin-right: calc(83px + 20px);
            }
        }

        .well {
            width: 100px;
            height: 32px;
            background: rgba(5, 40, 88, 0.5);
            border-radius: 3px;
            border: 1px solid rgba(255, 255, 255, 0.1);

            font-family: $font-family-cn;
            font-size: 14px;
            line-height: 16px;
            padding-left: 11px;
            color: #FFFFFF;
            -webkit-appearance: none;
            -moz-appearance: none;
            -ms-appearance: none;
            appearance: none;
            cursor: pointer;

            @include respond(large) {
                width: 150px;
                height: 42px;
                font-size: 20px;
                line-height: 23px;
                padding-left: 20px;
            }



            &::-ms-expand {
                display: none;
            }
        }
    }

    &-content {
        height: calc(100% - 50px - 20px);
        margin: 10px 13px 10px 10px;
        box-sizing: border-box;
        position: relative;
        @include respond(large) {
            height: calc(100% - 60px - 20px);
            margin: 10px 7px 17px 10px;
        }

        .tb {
            width: 100%;
            border-color: transparent;
            border-spacing: 0 1px;

            box-sizing: border-box;
            border-top-width: 0;

            &-absolute {
                position: sticky;
                border-spacing: 0;
                top: 0px;
                z-index: 100;
            }

            &-relative {
                position: relative;
                // top: -100px;
                height: calc(100%);
            }
        }

        .thead {
            position: sticky;
            top: 0px;
            border: 1px solid rgba(1, 128, 254, 0.3);
            background-color: RGBA(3, 26, 57, 1);
            font-family: $font-family-cn;
            font-weight: 500;
            font-size: 18px;
            color: #04ABFF;
            line-height: 22px;
            background-image: linear-gradient(90deg, rgba(74, 123, 197, 0) 0%, rgba(74, 123, 197, 0.12) 2%, rgba(74, 123, 197, 0.12) 100%), linear-gradient(90deg, rgba(75, 124, 195, 0) 0%, rgba(78, 122, 196, 0.2) 3%, rgba(75, 124, 195, 0.37) 5%, rgba(75, 124, 195, 0) 88%), linear-gradient(90deg, rgba(69, 154, 255, 0) 0%, rgba(69, 154, 255, 0.13) 4%, rgba(72, 157, 255, 0.08) 18%, rgba(69, 154, 255, 0) 38%);

            @include respond(large) {
                font-size: 24px;
            }
            &-th{
                white-space: nowrap;

                padding:7px 24px;
                &-one{
                    padding:25px 24px;
                }
            }
        }

        .tbody {
            border-left: 1px solid rgba(4, 171, 255, 0.5);
            border-right: 1px solid rgba(4, 171, 255, 0.5);


            .th {
                height: 36px;
                font-family:  $font-family-cn;
                font-size: 16px;
                color: #FFFFFF;
                line-height: 22px;
                background: rgba(1, 128, 254, 0.15);

                @include respond(large) {
                    height: 70px;
                    font-size: 22px;
                }
            }
        }


    }

    &-con {
        width: calc(100% + 6px);
        height: 100%;
        overflow-y: scroll;
        .mask{
            height: 10px; 
            width:100%;
            background-color: RGBA(3, 26, 57, 0.8);
            position: absolute;
            top: -2px;
            z-index:90;
        }
    }
}

@include scroll-bar(6px);
</style>