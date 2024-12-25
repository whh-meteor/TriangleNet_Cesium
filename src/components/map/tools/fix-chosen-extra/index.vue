<!--  -->
<template>
    <!-- ,{'research-hidden-content':isExpandByParent} -->
    <div :class="['research', { 'research-hidden-content': isExpandByParent }]">
        <div class="global-con">
            <div v-if="!isFold" class="global" @click="changeFold(true)"></div>
            <div v-else class="global-text" @click="changeFold(false)">
                <span class="text">{{ currentTitle }}</span>
            </div>
        </div>
        <div :class="['research-show', { 'research-hidden': isFold }]">
            <div class="header"></div>
            <div class="research-content">
                <!-- 内容 -->
                <div class="container">
                    <div class="con">
                        <template v-if="value">
                            <!-- 一级 -->
                            <div class="con-item" v-for="(item, index) in chosenDisplayList" :key="value + index">
                                <div :class="['con-item-header', { 'con-item-header-first': !index }]">
                                    <el-checkbox :label="item.title" @change="selectChosen($event, item, index, 0)"
                                        v-model="item.isChecked">
                                        <div class="img"></div>
                                        {{ initTitle(item, index) }}
                                    </el-checkbox>
                                    <div class="con-item-right" style="margin-left:8px;margin-bottom:8px"
                                        v-if="item.hasSelectComponent">
                                        <!-- @change="selectThirdChange($event)" -->
                                        <el-select v-model="selectThirdTitle[item.title]" placeholder="全部"
                                            class="select-first" :loading="loadingSelect"
                                            @visible-change="remoteSelectMethod($event, item)">
                                            <el-option v-for="(el, i) in selectionThirdOption[item.title]"
                                                :key="el.areaId + i" :label="el.projectName" :value="el.areaId"
                                                @click.native="selectThirdChange(el?.areaId, item)">
                                            </el-option>
                                        </el-select>
                                    </div>
                                </div>
                                <!-- 二级 -->
                                <template v-if="item.children">
                                    <div class="children-con">
                                        <div v-for="(ite, idx) in item.children" class="con-item-children"
                                            :key="'children' + idx">
                                            <div class="child-header">
                                                <el-checkbox :ref="`checkbox${idx}`" v-model="ite.isChecked" @change="
                                                    selectSecondChosen($event, ite, index, idx)
                                                    ">
                                                    <span :class="[{ 'bolder': (currentSecondTitle[item.title] === ite.title) }]">{{ ite.title }}</span>
                                                </el-checkbox>
                                                <div v-if="ite?.button === 'imageIconDisplay'" class="checkbox-button-icon"
                                                    title="缩略图" @click="handleRightButton(ite)"></div>
                                                <div v-else-if="ite?.button" class="checkbox-button"
                                                    @click="handleRightButton(ite)">{{ ite.button }}</div>

                                            </div>

                                        </div>
                                    </div>
                                </template>
                                <!-- 三级 -->
                                <template v-if="item.showThirdLevel && thirdArray[thirdTitleByChosen[item.title]]">
                                    <div class="children-con children-con-sub">
                                        <div class="con-item-children"
                                            v-for="(it, indx) in thirdArray[thirdTitleByChosen[item.title]]" :key="indx">
                                            <el-checkbox :label="it.stationId" v-model="it.isChecked" :title="it.stationId"
                                                @change="selectThird($event, it, indx, item)">
                                                <span class="span-width" :style="{ maxWidth: currentMaxWidth(it) }">{{
                                                    it.stationId |
                                                    ellipsis(currentLength(it)) }}</span>
                                            </el-checkbox>
                                            <div v-if="it?.button === 'imageIconDisplay'" class="checkbox-button-icon"
                                                title="缩略图" @click="handleRightButton(it)"></div>
                                            <div v-else-if="it.button" class="checkbox-button"
                                                @click="handleRightButton(it)">{{
                                                    it.button }}</div>
                                        </div>
                                    </div>
                                </template>
                                <!-- <div class="con-item-right" style="margin-bottom:8px"
                                    v-if="selectThirdHasClick[item.title] && item.hasSelectComponent">
                                    <el-select v-model="selectThirdTitle[item.title]" placeholder="请选择"
                                        class="select-first">
                                        <el-option v-for="(el, i) in selectionThirdOption[item.title]" :key="el.areaId + i"
                                            :label="el.projectName" :value="el.areaId"
                                            @change="selectThirdChange($event, item?.title)">
                                        </el-option>
                                    </el-select>
                                </div> -->
                            </div>
                        </template>


                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import * as chosenStatic from "./fix-chosen.static";
import { createNamespacedHelpers } from 'vuex';
import * as chosen from './tree-investigate';
// import { getListForResearch } from "@/api/home";
import "./filter"
const { mapMutations } = createNamespacedHelpers('commonMap')
const _ = require('lodash')
export default {
    components: {},

    data() {
        return {
            loadingSelect: false,
            isFold: false,//是否折叠
            value: 'dataInvestigate',//展示的大标题
            thirdArray: {},//三级数组
            thirdTitleByChosen: {},//三级菜单选择的标题
            selectSecondTitle: {
                地质取样: null,
                海洋地球物理调查: null
            }, //选择的二级标题
            selectThirdTitle: {
                海洋地质调查: '',
            }, //选择的三级标题
            selectionSecondsOption: {
                地质取样: ['地质浅钻', '表层取样', '柱状取样', '钻井'],
                海洋地球物理调查: [
                    '测线热力图',
                    '多波束测深',
                    '单波束测深',
                    '测扫声呐',
                    '海洋重力',
                    '海洋磁力',
                    '单道地震',
                    '多道地震',
                    '走航海流',
                    'CPM',
                    '浅地层剖面'
                ]
            }, //选择的二级选择项
            selectionThirdOption: {
                地质取样: [],
                海洋地球物理调查: []
            }, //选择的二级选择项
            selectThirdHasClick: {
                地质取样: false,
                海洋地球物理调查: false
            },
            chosenDisplayList: [],

            isClickCustom: false,//是否点击过
            chosenListByTitle: [],
            currentSecondTitle: {},
            isClickAllSelect: false,
            isClickClearScreen: false,
            isExpandByParent: false
        };
    },
    computed: {
        // 当前展示的选项
        // chosenDisplayList() {
        //     return chosen[this.value]
        // },
        //当前展示的名称
        currentTitle() {
            return this.value === 'dataInvestigate' ? '设备查看' : '研究成果'
        },
        currentLength() {
            return (it) => {
                if (it?.button) {
                    return screen.width === 3840 ? 50 : 50
                } else {
                    return screen.width === 3840 ? 50 : 50
                }
            }
        },
        initTitle() {
            return (item, index) => {
                // this.selectChosen(item.isChecked, item, index)
                return item.title
            }
        },
        currentMaxWidth() {
            return (it) => {
                if (it?.button) {
                    return screen.width === 3840 ? '590px' : '300px'
                } else {
                    return screen.width === 3840 ? '650px' : '344px'
                }
            }
        }

    },
    watch: {
        // $route: {
        //     handler(newVal) {
        //         this.isClickCustom = false;
        //         this.chosenListByTitle = [];

        //         this.initFirstTree({ router: newVal, isRouterInit: true })
        //     },
        //     immediate: true
        // },
        '$store.state.commonMap.expand'(newVal) {
            this.isExpandByParent=newVal;
        },
    },
    created() {

    },
    mounted() {
        console.log(";;;;;;clearScreen");
        // this.isClickClearScreen
        this.initFirstTree({ router: '', isRouterInit: true })
    },
    methods: {
        ...mapMutations(['setFold']),
        /**
         * 折叠当前窗口
         */
        changeFold(e) {
            this.isFold = e;
            this.setFold(e)
        },
        /**
         * 选择展示的内容
         * @param {'dataInvestigate'|'researchFindings'} value 
         */
        chosenDisplay(value) {
            // debugger
            this.value = value;
            if (!this.chosenListByTitle.find(el => el === value)) {
                this.chosenListByTitle.push(value);
                // this.isClickClearScreen = true;
                // debugger
                this.initFirstTree({ clickByButton: true })
                setTimeout(() => {
                    if (this.isClickClearScreen) {
                        console.log("isClickClearScreen");
                        this.clearScreenMethods();
                        this.isClickClearScreen = false;
                        this.isClickCustom = true;
                    }
                }, 200)

                return;
            }

            if (!this.isClickCustom) {
                this.initFirstTree({ clickByButton: true })
            } else {
                this.chosenDisplayList = chosen[this.value]
            }
            if (this.isClickClearScreen) {
                console.log("isClickClearScreen");
                this.clearScreenMethods();
                this.isClickClearScreen = false;
                // this.isClickCustom = true;
            }
            // console.log("isClickClearScreen",this.isClickClearScreen);


        },
        /**
         * 选择一级菜单
         * @param {*} e 是否选中
         * @param {*} item 点击的一级所有
         * @param {*} index 一级菜单下标
         */
        selectChosen(e, item, index, isInit = false) {
            this.isClickCustom = true;
            let arr = item
            arr.isChecked = e
            // arr.children = item.children.map((el) => {
            //     return {
            //         ...el,
            //         title: el.title,
            //         isChecked: e
            //     }
            // })
            if (!isInit) {
                this.$forceUpdate(() => {
                    this.$set(this.chosenDisplayList, index, arr)
                })
            }

            this.$emit('selectChosen', { e, item, index })
            this.bindThiredArray(e, item)
        },
        /**
         * 选择二级全选--按钮
         * @param {*} e 是否选中
         * @param {*} item 当前选中的item
         * @param {*} index 父级下标
         * @param {*} idx 当前选中下标
         */
        selectSecondChosen(e, item, index, idx) {
            this.isClickAllSelect = true;
            setTimeout(() => {
                this.isClickAllSelect = false;
            }, 20)
            this.isClickCustom = true;
            let arr = item
            arr.isChecked = e
            // console.log("item-----", item);
            this.afterSelectSecondChosenDisplay(e, item, index, idx, [], item?.unchosen);
            this.$forceUpdate(() => {
                this.$set(this.chosenDisplayList[index], idx, arr)
            })
            this.$emit('selectSecondChosen', { e, item, index, idx })
        },
        /**
         * 点击二级标题--文字
         * @param {*} e dom点击事件
         * @param {*} item 对应一级菜单对象
         * @param {*} index 一级菜单下标
         * @param {*} ite 点击的标签对应内容
         */
        clickSecondTitle(e, item, index, ite) {
            if (this.isClickAllSelect) {
                // this.isClickAllSelect=false;
                return;
            }
            // console.log("clickSecondTitle", e)
            this.isClickCustom = true;
            // console.log("currentSecondTitle", this.currentSecondTitle[item.title], ite?.title);
            // debugger
            if (!ite?.thirdLevelType) return;
            if (this.currentSecondTitle[item.title] === ite?.title && item?.showThirdLevel) {
                this.currentSecondTitle[item.title] = '';
                item.showThirdLevel = false;
                this.$forceUpdate(() => {
                    this.$set(this.chosenDisplayList, index, item)
                })
                return;
            }
            this.$set(this.currentSecondTitle, item.title, ite.title)
            this.$set(this.thirdTitleByChosen, item.title, '')
            // this.currentSecondTitle[item.title]=ite.title;
            // this.thirdTitleByChosen[item.title] = '';
            setTimeout(() => {
                // this.thirdTitleByChosen[item.title] = ite.title;
                this.$set(this.thirdTitleByChosen, item.title, ite.title)
                // console.log("currentSec111111ondTitle", this.thirdTitleByChosen[item.title]);
                this.setThirdLevel(e, item, index, ite)
                this.$emit('clickSecondTitle', { e, item, index, ite })
            }, 60)


        },
        /**
         * 设置三级菜单
         * @param {*} e dom点击事件
         * @param {*} item 对应一级菜单对象
         * @param {*} index 一级菜单下标
         * @param {*} ite 点击的标签对应内容
         */
        setThirdLevel(e, item, index, ite, defaultSecond) {
            // console.log("ite-----",ite);
            if (!ite?.thirdLevelType) return;
            switch (ite.thirdLevelType) {
                case 'url':
                    // getListForResearch(ite.postUrlType).then(res => {
                    //     this.thirdArray[ite.title] = res.result.records.map(el => {
                    //         return {
                    //             isChecked: ite.isChecked || this.thirdArray?.[ite.title]?.isChecked || false,
                    //             stationId: el.stationId
                    //         }
                    //     });
                    //     this.showThirdLevelList(e, item, index, ite)
                    // })
                    break;
                case 'static':
                    // this.$set(this.thirdArray, ite.title, this.staticArrayBindThirdArray(chosenStatic[ite.static], ite.unchosen ? false : ite.isChecked, [], ite.title, defaultSecond && !ite.unchosen))
                    this.thirdArray[ite.title] = this.staticArrayBindThirdArray(chosenStatic[ite.static], ite.unchosen ? false : ite.isChecked, [], ite.title, defaultSecond && !ite.unchosen);
                    this.showThirdLevelList(e, item, index, ite)
                    break;
                default:
                    break;
            }
        },

        /**
         * 点击判断是否包含三级列表
         * @param {*} e dom点击事件
         * @param {*} item 对应一级菜单对象
         * @param {*} index 一级菜单下标
         * @param {*} ite 点击的标签对应内容 
         */
        beforeShowThirdLevelList(e, item, index, ite) {
            let obj = item
            if (!chosenStatic.tagHasThirdArray.includes(ite.title)) {
                obj.showThirdLevel = false
                this.$forceUpdate(() => {
                    this.$set(this.chosenDisplayList[item.title], index, obj)
                })
                return false
            }
            return true
        },
        /**
         * 选择三级展示
         * @param {*} e 选中的value
         * @param {*} title 绑定的一级菜单名称
         */
        selectThirdChange(e, title) {
            this.isClickCustom = true;
            this.$set(this.selectThirdTitle, title, e)
            this.$emit('selectThirdChange', { e, title })
        },
        /**
        * 绑定三级数组
        * @param {*} e  是否选中
        * @param {*} item 选中的一级菜单内容
        * @returns
        */
        bindThiredArray(e, item) {
            let arr = _.cloneDeep(this.thirdArray[this?.thirdTitleByChosen?.[item.title]] || {})
            this.thirdArray[this.thirdTitleByChosen[item.title]] =
                this.bindThirdChange(
                    arr,
                    e
                )
        },

        /**
         * 绑定三级列表
         * @param {*} arr 三级数组
         * @param {*} isChecked 是否选中
         * @param {*} init 初始化数组
         */
        bindThirdChange(arr, isChecked, init = []) {
            let array = _.cloneDeep(arr)
            if (_.isEmpty(array)) return
            if (!init?.length) {
                return array?.map((el) => {
                    return {
                        ...el,
                        isChecked: isChecked
                    }
                })
            }
            return array?.map((el) => {
                return {
                    ...el,
                    isChecked: init?.includes(el.stationId) ? isChecked : false
                }
            })
        },
        /**
         * 静态数组绑定
         * @param {*} arr 原始数组
         * @param {*} isChecked 父级是否选中
         * @param init 选中的数组 类似 ['T1','T2'],里面是 stationId数组
         * @returns
         */
        staticArrayBindThirdArray(arr, isChecked, init1, title, defaultSecond) {
            // console.log("staticArrayBindThirdArray",isChecked);
            let array = [];
            let init = [];
            if (defaultSecond) {
                init = arr.map(el => {
                    if (el?.firstCheckList?.find(ele => ele === this.classfiy)) {
                        return el.stationId;
                    }
                    return null
                })?.filter(el => !!el);
            }
            if (this.thirdArray?.[title]?.length) {
                array = _.cloneDeep(this.thirdArray[title])
            } else {
                array = arr
            }
            if (!init?.length) {
                return array.map((el) => {
                    return {
                        ...el,
                        isChecked: el.isChecked ?? isChecked
                    }
                })
            }
            return array.map((el) => {
                return {
                    ...el,
                    isChecked: init?.includes(el.stationId) ? true : el.isChecked
                }
            })
        },
        /**
         * 动态数据绑定
         * @param {*} origin  单个选项
         * @param {*} isChecked 父级是否选中
         * @param init 选中的数组 类似 ['T1','T2'],里面是 stationId数组
         */
        dynamicArrayBinfThirdArray(origin, isChecked, init) {
            if (!init?.length || !isChecked) {
                return isChecked || false;
            }
            return init?.includes(origin) ? isChecked : false;
        },
        /**
         * 点击标签赋值         
         * @param {*} e dom点击事件
         * @param {*} item 对应一级菜单对象
         * @param {*} index 一级菜单下标
         * @param {*} ite 点击的标签对应内容
         */
        showThirdLevelList(e, item, index, ite) {
            let obj = item;
            if (!ite?.thirdLevelType) {
                obj.showThirdLevel = false;
                return;
            }
            obj.showThirdLevel = true;
            this.$forceUpdate(() => {
                this.$set(this.chosenDisplayList, index, obj)
            })
        },
        /**
         * 复选框选择
         * @param {*} e
         * @param {*} item
         * @param {*} index
         * @param {*} idx
         * @param {Array} init 初始默认选中的数组
         * @returns
         */
        afterSelectSecondChosenDisplay(e, item, index, idx, init = [], isUnLinkage) {
            this.isClickCustom = true;
            // console.log(item.title, this.thirdTitleByChosen);
            if (item.title === this.thirdTitleByChosen[this.chosenDisplayList[index].title]) {
                // console.log("llll1111", this.thirdArray[item.title]);
                if (!this.thirdArray?.[item.title]?.length) return;

                // console.log("llll", this.thirdArray[item.title]);
                this.showThirdListByTargetCheck(
                    this.thirdArray[item.title],
                    init,
                    isUnLinkage ? false : e,
                    this.chosenDisplayList[index]
                )
            };

        },
        /**
         * 远程获取列表
         */
        remoteSelectMethod(e, item) {
            if (!e || !item?.selectUrlType || this.loadingSelect || this.selectionThirdOption?.[item.title]?.length > 1) return;
            this.loadingSelect = true;
            getListForResearch(item.selectUrlType).then(res => {

                this.selectionThirdOption[item.title] = [
                    { projectName: "全部", areaId: '' },
                    ...res?.result,
                ]
            }).catch(() => {
                this.selectionThirdOption[item.title] = [
                    { projectName: "全部", areaId: '' },
                ]
            }).finally(() => {
                this.loadingSelect = false;
            })

        },
        /**
         * 右侧按钮
         * @param ite  当前点击的标签内容
         */
        handleRightButton(ite) {
            this.isClickCustom = true;
            this.$emit('handleRightButton', { ite })
        },
        /**
         * 选择三级
         * @param {*} e 是否选中
         * @param {*} x 对应选中选项
         * @param {*} idx 对应选中项下标
         * @param {*} item 对应一级信息
         */
        selectThird(e, x, idx, item) {
            // console.log("kkkkkk", item);
            this.isClickCustom = true;
            this.$forceUpdate(() => {
                this.$set(this.thirdArray[this.thirdTitleByChosen[item.title]], idx, x)
            })
            this.$emit('selectThird', { e, x, idx, item })
            // if (this.thirdArray[this.thirdTitleByChosen[item.title]].every(el => !el.isChecked)) {
            //     this.handleAllSelectThird(false, item)
            // } 
            if (this.thirdArray[this.thirdTitleByChosen[item.title]].every(el => !!el.isChecked)) {
                this.handleAllSelectThird(true, item)
            }
            if (this.thirdArray[this.thirdTitleByChosen[item.title]].every(el => !el.isChecked)) {
                this.handleAllSelectThird(false, item)
            }
        },
        /**
         * 处理三级全选
         */
        handleAllSelectThird(value, item) {

            let temp = item?.children?.find(el => el.title === this.thirdTitleByChosen[item.title]);
            if (temp?.unchosen) return;
            let tempIndex = item?.children?.findIndex(el => el.title === this.thirdTitleByChosen[item.title]);
            let parentIndex = this.chosenDisplayList.findIndex(el => el.title === item.title)
            temp.isChecked = value;
            this.$forceUpdate(() => {
                this.$set(this.chosenDisplayList[parentIndex], tempIndex, temp)
            })
        },

        /**
         * 展示选中项
         * @param origin thirdArray 原数组
         * @param init 选中的数组 类似 ['T1','T2'],里面是 stationId数组
         */
        showThirdListByTargetCheck(origin, init = [], e, parent) {
            if (!e || !init?.length) {
                this.thirdArray[this.thirdTitleByChosen[parent.title]] = origin.map(
                    (el) => {
                        return {
                            ...el,
                            isChecked: e
                        }
                    }
                )
                return
            }
            this.thirdArray[this.thirdTitleByChosen[parent.title]] = origin.map(
                (el) => {
                    if (init?.includes(el.stationId)) {
                        return {
                            ...el,
                            isChecked: e
                        }
                    }
                    return el
                }
            )
        },
        /**
         * 选择二级展示
         */
        selectSecondChange(e, title) {
            // this.$set(this.selectionThirdOption,title,[]);
            this.$set(this.selectThirdTitle, title, null);
            if (title === "地质取样") {
                getList(JingUrl.areainfo, { dataType: e, type: "测站" }).then((res) => {
                    this.$set(this.selectionThirdOption, title, [
                        { areaId: "全部" },
                        ...res.result,
                    ]);
                });
            } else {
                getList(JingUrl.areainfo, { dataType: e, type: "测线" }).then((res) => {
                    this.$set(this.selectionThirdOption, title, [
                        { areaId: "全部" },
                        ...res.result,
                    ]);
                });
            }
        },
        /**
         * 初始化绑定数据
         */
        initBindSymbol() {
            let arr = []
            this.$emit('initBindSymbol', { arr })
        },
        /**
         * 从地图上获取点击的id更新列表
         * @param {*} id thirdArray对应的stationId
         * @param {*} title 对应二级名称
         * @param {*} arr1 传递的数组
         * @param {*} isChecked 是否选中
         */
        getCheckedFromMap(id, title, arr1, isChecked) {
            this.isClickCustom = true;
            let arr = this.thirdArray[title]
            let idx = arr.findIndex((el) => el.stationId === id)
            let x = {
                stationId: id,
                isChecked: isChecked
            }
            arr[idx] = x
            this.$forceUpdate(() => {
                this.$set(this.thirdArray, title, arr)
            })
            this.$emit('getCheckedFromMap', { id, title, arr, isChecked })
        },
        /**
         * 初始化展示
         * @param {*} router 
         */
        initFirstTree({ router, clickByButton = false, isRouterInit = false }) {
            if (router) {
                this.classfiy = router?.meta?.classify || '';
            }

            // if (!this.classfiy) return;
            // this.clearScreenMethods()
            // if (!clickByButton) {
            //     this.value = chosenStatic.initDisplay[this.classfiy];
            //     this.chosenListByTitle.push(this.value)
            // }
            if (isRouterInit) {
                this.clearScreenMethods()
            }
            this.chosenDisplayList = chosen[this.value]
            // chosen[this.value]=this.chosenDisplayList
            // this.chosenListByTitle[this.value]=this.loopSetData(chosen[this.value], this.classfiy)




        },
        /**
         * 循环绑定数据
         * @param {*} arr 需要循环的数组
         * @param {*} classfiy 路由对应classfiy
         * @param {*} initChecked 初始化选择
         * @param {*} parent 父级
         * @param {*} parentIndex 父级下标
         */
        loopSetData(arr, classfiy, initChecked = false, parent, parentIndex) {
            let array = arr.map((el, index) => {
                if (el?.firstCheckList?.length && el.firstCheckList.find(el => el === classfiy)) {
                    el.isChecked = true;
                } else if (initChecked) {
                    el.isChecked = initChecked;
                }
                if (el?.children?.length) {
                    el.children = this.loopSetData(el.children, classfiy, el.isChecked, el, index)
                }
                // 默认展示第一个三级列表--未测试接口调用
                if (el?.defaultSecond && !parent?.showThirdLevel && el?.defaultSecond?.find(el => el === classfiy)) {
                    console.log("lllclassfiyll", classfiy);
                    this.currentSecondTitle[parent.title] = el.title;
                    this.thirdTitleByChosen[parent.title] = el.title;
                    this.setThirdLevel(true, parent, parentIndex, el, el?.defaultSecond)
                }
                return el;

            })
            return array;
        },
        /**
         * 清屏
         */
        clearScreenMethods() {
            this.chosenDisplayList = this.chosenDisplayList.map((el, idx) => {
                el.showThirdLevel = false;
                this.currentSecondTitle[el.title] = '';
                el.children = el.children.map(ele => {
                    ele.isChecked = false;

                    return ele;
                })
                return el

            });
            for (let key in this.thirdArray) {
                this.thirdArray[key] = this.thirdArray[key].map(el => {
                    el.isChecked = false;
                    return el;
                })
            }
        },
        /**
         * 监听清屏
         */
        listenClearScreen() {
            this.isClickClearScreen = true;
            this.clearScreenMethods();
        },
        listenExpand(newVal) {
            console.log("listenExpand");
            this.isExpandByParent = newVal
        }
    }
}

</script>
<style lang='scss' scoped>
//@import url(); 引入公共css类
@include checkbox-mixin;
@include scroll-bar(6px);

@import './fix-chosen.scss';

.research-hidden-content {
    transform: translateX(-100%);
    opacity: 0;

}
</style>