<template>
  <div class="component-right-side">
    <div class="sidebar-container">
      <div class="status-block">
        <span v-if="sunshine">修仙模式：off</span>
        <span v-else>修仙模式：on</span>
        <div style="float: right">
          <i-switch v-model="switch1" @on-change="changeStatus"></i-switch>
        </div>
      </div>
      <div class="music-block">
        <VueAplayer ref="music" :music="option" @play="play" @pause="stop"></VueAplayer>
      </div>
    </div>
  </div>
</template>

<script>
  import VueAplayer from 'vue-aplayer'
  export default {
    name: 'component-right-side',
    data() {
      return {
        switch1: false,
        sunshine: true,
        option: {
          title: '光るなら',
          author: 'Goose house',
          url: require('../assets/Akie秋绘 - 天ノ弱.mp3'),
          pic: require('../assets/bg-mus.jpg'),
          lrc: '[00:00.00]lrc here\n[00:01.00]aplayer'
        }
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
      play: function () {
        console.log(this.$refs.music.$el.children[0].style.animationPlayState = 'running')
        console.log(this.$refs.music.$el.children[0].childNodes[1].style.position = 'absolute')
      },
      stop: function () {

      }
    },
    components: {
      VueAplayer
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
        .aplayer-pic {
          border-radius: 50%;
          background: {
            size: 100% 100%;
            repeat: no-repeat;
          }
        }
      }
    }
  }
</style>
