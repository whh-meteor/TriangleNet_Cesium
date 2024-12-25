<!--  dialog模板 -->
<template>
    <div :class="['dialog-frame',{'dialog-frame-visible':visible}, { 'mask': visible && showMask }]" @click="onClickMask">
        <div :class="['dialog', { 'dialog-visible': visible }]" @click.stop="onClick">
            <div :class="['slot', { 'slot-visible': visible }]">
                <slot style="pointer-events: all;"></slot>
            </div>
        </div>
    </div>
</template>

<script>
/**
 * @argument visible 是否展示
 * @argument showMask 是否展示遮罩
 */
export default {
    name: 'DialogFrame',
    props: {
        visible: Boolean,
        showMask: {
            type: Boolean,
            default: true
        }
    },
    components: {},
    data() {
        return {

        };
    },
    computed: {},
    watch: {},
    methods: {
        onClickMask() {
            this.$emit('clickMask')
        },
        onClick() { }
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
.dialog-frame {
    filter: opacity(0);
    transition: filter 0.4s ease;

    .dialog {
        min-width: 100px;
        min-height: 0;
        height: 0;
        // background-color: #fff;
        position: absolute;
        left: 0;
        // right: 0;
        width: 100%;
        // pointer-events: all;
        pointer-events: none;

        &-visible {
            min-height: 200px;
            height: 100%;
            transition: all 0.3s ease;
        }

        .slot {
            display: none;
            width: fit-content;
            pointer-events: none;
            margin: 0 auto;
            margin-top: 6rem;
            // pointer-events: all;
            &-visible {
                display: block;
            }
        }
    }

    &-visible {
        position: absolute;
        top: 0;
        right: 0;
        left: 0;
        bottom: 0;
        z-index: 2000;
        filter: opacity(1);
        pointer-events: none;
    }


}


.mask {
    // position: absolute;
    // top: 0;
    // right: 0;
    // left: 0;
    // bottom: 0;
    // z-index: 2000;
    pointer-events:all;
    background-color: rgba(8, 15, 38, 0.88);
   
}
</style>