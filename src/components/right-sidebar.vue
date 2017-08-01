<template>
  <div class="component-right-side">
    <div class="sidebar-container">
      <div class="status-block">
        <span v-if="sunshine">关灯</span>
        <span v-else>开灯</span>
        <div style="float: right">
          <i-switch v-model="switch1" @on-change="changeStatus"></i-switch>
        </div>
      </div>
      <div class="music-block">

      </div>
    </div>
  </div>
</template>

<script>

  export default {
    name: 'component-right-side',
    data() {
      return {
        switch1: false,
        sunshine: true,
      }
    },
    methods: {
      changeStatus (status) {
        this.$Message.info('修仙模式：' + status);
        if (status === true) {
          this.sunshine = false;
          sessionStorage.setItem('status', status);
          this.$root.$el.style.background = '#122030';
          this.$root.$el.style.color = '#fff'
        } else {
          this.sunshine = true;
          sessionStorage.setItem('status', status);
          this.$root.$el.style.background = '#fff';
          this.$root.$el.style.color = '#2c3e50'
        }

      },
    },
    mounted: function () {
      if (sessionStorage.getItem('status') === 'true') {
        this.switch1 = true;
        this.$root.$el.style.background = '#122030';
        this.$root.$el.style.color = '#fff'
      }
    },
  }
</script>

<style lang="scss">
  .component-right-side {
    .sidebar-container {
      padding: 20px;
      .status-block {
        span {
          height: 25px;
          line-height: 25px;
          display: inline-block;
        }
      }
      .music-block {
        margin: 20px 0;
        height: 150px;
        background: {
          image: url("../assets/bg-music.jpg");
          size: 100% 100%;
        };
      }


    }



  }
</style>
