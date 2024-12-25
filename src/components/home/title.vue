<template>

  <div class="title-wrapper">

    <!-- 标题 -->
    <div class="header-wrapper">

      <span>{{ title }}</span>

      <div class="title-icon"></div>

    </div>

    <slot></slot>

  </div>
</template>

<script>
export default {
  props: {
    title: {
      type: String,
      default: 'title'
    },

  },
  data() {
    return {

    }
  }
}
</script>

<style scoped>
.title-wrapper {
  width: 100%;
  height: calc(100% - 10px);
  background: linear-gradient(180deg, rgba(33, 133, 232, 0.09) 0%, rgba(36, 127, 236, 0.05) 48%, rgba(31, 127, 223, 0.03) 70%, rgba(51, 153, 255, 0.02) 87%, rgba(0, 170, 255, 0.01) 100%);
  border-radius: 5px 5px 5px 5px;
  /* border: 1px solid; */
  /* border-image: linear-gradient(180deg, rgba(41, 114, 213, 1), rgba(6, 77, 129, 1)) 1 1; */
  position: relative;
  padding-bottom: 10px;
  border: 1px solid rgba(41, 114, 213, 1);
  border-radius: 5px;
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
  background-size: 100% 100%;

}


@media screen and (min-height: 1530px) {
  .header-wrapper {
    font-size: 24px;
    height: 60px;
    background-image: url('@/assets/image/home/datalist/title_bg_large.png');
    line-height: 60px;
  }
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

@media screen and (min-height: 1530px) {
  .header-wrapper>span {
    padding-left: 19px;
  }
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
    margin-right: 54px;
    background-image: url('@/assets/image/home/datalist/title_icon_max.png');
  }
}
</style>