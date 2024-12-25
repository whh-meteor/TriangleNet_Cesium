<!--  -->
<template>
    <div class='chosen'>
        <FixChosen @selectSecondChosen="selectSecondChosen" @selectChosen="selectChosen"></FixChosen>
    </div>
</template>

<script>
// import bouy from "@/assets/image/bouy.png";
export default {
    components: {
        FixChosen: () => import("@/components/map/tools/fix-chosen-extra/index.vue")
    },
    data() {
        return {

        };
    },
    computed: {},
    watch: {},
    created() {
        this.onClickMap()
    },
    mounted() {

    },
    methods: {
        /**
         * 选择二级--按钮
         * @param {*} e 是否选中
         * @param {*} item 当前选中的item
         * @param {*} index 父级下标
         * @param {*} idx 当前选中下标
         */
        selectSecondChosen({ e, item, index, idx }) {

        },
        /**
         * 选择一级菜单
         * @param {*} e 是否选中
         * @param {*} item 点击的一级所有
         * @param {*} index 一级菜单下标
         */
        selectChosen({ e, item, index }) {
            this.$emit('selectChosen', { e, item, index })
            if (e && this.isEntityHidden(item.flag + 0)) {
                this.setStatusEntitiesByCategory(item.flag, true);
                this.flyToCenter(item?.points)
            } else if (e) {
                this.addEntities(item);
                this.flyToCenter(item?.points);
            } else {
                this.setStatusEntitiesByCategory(item.flag, false)
            }
        },
        /**
         * 设置标记点是否隐藏
         * @param {*} category 
         * @param {*} status 
         */
        setStatusEntitiesByCategory(category, status) {
            window.viewer.entities.values.forEach(entity => {
                if (!category && !status) {
                    entity.show = false;
                } else if (entity.category === category) {
                    entity.show = status;  // 隐藏属于该类别的标记点
                }
            });
        },
        /**
         * 判断标记点是否隐藏
         * @param {*} entityId 
         */
        isEntityHidden(entityId) {
            const entity = window.viewer.entities.getById(entityId); // 根据 id 查找实体
            if (entity) {
                return !entity.show;  // 如果 show 为 false，则实体被隐藏
            }
            return false; // 如果找不到实体，默认返回 false
        },
        /**
         * 首次添加标记点
         * @param {*} item 
         */
        addEntities(item) {
            const points = item.points.map((el, index) => {
                return {
                    category: item.flag,
                    name: item.title + '0' + (index + 1),
                    lon: el.lon,
                    lat: el.lat
                }
            })
            points.forEach((point, index) => {
                window.viewer.entities.add({
                    id: item.flag + index,
                    position: Cesium.Cartesian3.fromDegrees(point.lon, point.lat, 50), // 海平面以上50米
                    billboard: {
                        image: require(`/src/assets/image/${item.flag}.png`),  // 图标图片URL
                        width: 25,  // 图标宽度
                        height: 25,  // 图标高度
                        verticalOrigin: Cesium.VerticalOrigin.BOTTOM,  // 图标的垂直对齐方式
                        horizontalOrigin: Cesium.HorizontalOrigin.CENTER  // 图标的水平对齐方式
                    },

                    label: {
                        text: point.name,
                        font: '8pt sans-serif',
                        fillColor: Cesium.Color.BLACK,
                        style: Cesium.LabelStyle.FILL_AND_OUTLINE,
                        outlineWidth: 0,
                        outlineColor: Cesium.Color.BLACK,
                        verticalOrigin: Cesium.VerticalOrigin.BOTTOM,
                        pixelOffset: new Cesium.Cartesian2(0, 15)
                    },
                    category: point.category,
                    current: point.name,
                });
            })
        },
        /**
         * 点击地图
         */
        onClickMap() {
            // 创建事件处理器
            const handler = new Cesium.ScreenSpaceEventHandler(window.viewer.canvas);
            let that = this;
            // 监听鼠标点击事件
            handler.setInputAction(function (movement) {
                const pickedObject = window.viewer.scene.pick(movement.position);  // 获取点击位置的对象

                if (Cesium.defined(pickedObject)) {  // 确保 pickedObject 是有效的
                    // 检查是否点击了标记点
                    if (pickedObject.id) {
                        that.$emit('onClickFlag', { name: pickedObject.id.current,category:pickedObject.id.category })
                    } else {
                        console.log('点击了其他对象');
                    }
                } else {
                    console.log('没有点击到任何实体');
                }
            }, Cesium.ScreenSpaceEventType.LEFT_CLICK);
        },
        /**
         * 将视图缩放到所有标记点的区域
         */
        flyToCenter(points) {
            // 计算所有标记点的最小和最大经纬度
            const west = Math.min(...points.map(p => p.lon))-1;
            const south = Math.min(...points.map(p => p.lat))-1;
            const east = Math.max(...points.map(p => p.lon))+1;
            const north = Math.max(...points.map(p => p.lat))+1;

            // 计算包围所有点的矩形区域
            const rectangle = Cesium.Rectangle.fromDegrees(west, south, east, north);

            // 使用flyTo方法调整视图，飞行到包围区域
            window.viewer.camera.flyTo({
                destination: rectangle,
                duration: 1 // 设置飞行时间
            });
        }
    }
}

</script>
<style lang='scss' scoped>
.chosen {
    width: fit-content;
    height: 1000px;
}
</style>