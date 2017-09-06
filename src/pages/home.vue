<template>
  <div class="page-home">
    <NavHeader />
    <div class="body-container">
      <LeftSide v-if="show" />
      <div :class="{ leftActive: changeSize }" :style='{ width: width, minHeight: height}' style="min-width: 1024px;">
        <Row type="flex" justify="center" class="code-row-bg">
          <Col span="18">
            <transition>
              <keep-alive>
                <router-view></router-view>
              </keep-alive>
            </transition>
          </Col>
          <Col span="6">
            <RightSide />
          </Col>
        </Row>
      </div>
    </div>
  </div>
</template>

<script>
  import NavHeader from '../components/header.vue'
  import LeftSide from '../components/left-sidebar.vue'
  import RightSide from '../components/right-sidebar.vue'
  export default {
    name: 'page-home',
    data() {
      return {
        changeSize: true,
        show: true,
        width: document.documentElement.clientWidth + 'px',
        height: document.documentElement.clientHeight - 60 + 'px'
      }
    },

    methods: {

    },
    components: {
      NavHeader,
      LeftSide,
      RightSide
    },
    mounted: function () {
      const that =this;
      if (document.documentElement.clientWidth < 1200) {
        this.show = false
      }
      window.onresize = function () {
        that.width = document.documentElement.clientWidth + 'px';
        if (document.documentElement.clientWidth < 1200) {
          that.show = false;
          that.changeSize = false
        } else {
          that.show = true;
          that.changeSize = true
        }
      };
    },
  }
</script>

<style lang="scss">
  .page-home {
    .leftActive {
      padding-left: 300px;
    }
    height: 100%;
    .body-container {
      height: 100%;
      padding-top: 60px;
    }
  }
</style>
