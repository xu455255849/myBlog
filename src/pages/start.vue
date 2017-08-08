<template>
  <div class="page-start" :style='`height:${height}`'>
    <div class="space">
      <div class="stars">
        <div class="star"></div>
        <div class="star pink"></div>
        <div class="star blue"></div>
        <div class="star yellow"></div>
      </div>
    </div>
    <div class="login-button" @click="render">
      <Button size="large" type="ghost">
        探索星空
        <Icon type="chevron-right"></Icon>
      </Button>
    </div>
  </div>
</template>

<script>

export default {
  name: 'page-start',
  data() {
    return {
      username: localStorage.getItem('username') || '',
      height: document.documentElement.clientHeight + 'px'
    }
  },
  methods: {
    render () {
      if (localStorage.getItem('username') !== null) {
        this.$Modal.confirm({
          render: (h) => {
            return h('Input', {
              style: {
                marginTop: '20px'
              },
              props: {
                value: this.username,
                autofocus: true,
              },
              on: {
                input: (val) => {
                  this.username = val;
                }
              }
            })
          },
          onOk: ()=> {
            if (this.username !== '' ) {
              if (this.username === '徐绍平') {
                localStorage.setItem('username', this.username);
                sessionStorage.setItem('admin', true)
              } else {
                localStorage.setItem('username', this.username)
              }
              this.$router.push({name: 'list'})
            } else {
              this.$Message.warning('无名是我的！！');
            }
          },
          title: '继续旅程'
        })
      } else {
        this.$Modal.confirm({
          render: (h) => {
            return h('Input', {
              style: {
                marginTop: '20px'
              },
              props: {
                value: this.username,
                autofocus: true,
                placeholder: '勇者，告诉我你的名字'
              },
              on: {
                input: (val) => {
                  this.username = val;
                }
              }
            })
          },
          onOk: ()=> {
            if (this.username !== '' ) {
                if (this.username === '徐绍平') {
                    localStorage.setItem('username', this.username);
                    sessionStorage.setItem('admin', true);
                    localStorage.setItem('xx', 'open')
                } else {
                  localStorage.setItem('username', this.username)
                }
              this.$router.push({name: 'list'})
            } else {
              this.$Message.warning('无名是我的！！');
            }
          },
          title: '开启征程'
        })
      }
    }
  },
  mounted: function () {

  },
}
</script>

<style lang="scss">
.page-start {
  min-height: 1080px;
  .login-button {
    position: absolute;
    z-index: 2;
    top: 700px;
    left: 40%;
    opacity: 0.5;
    animation: btn linear 2s infinite;
  }
  .login-button:hover {
    animation-play-state: paused;
  }
  @keyframes btn {
    from {
      transform: rotate(0);
    }
    to {
      transform: rotate(360deg);
    }
  }
  background: {
    image: url("../assets/start.jpg");
    size: 100% 100%;
  }
  .space {
    width: 100%;
    height: 100%;
  }
  .crater1,
  .crater2,
  .crater3,
  .crater4 {
    position: absolute;
    border-radius: 50%;
    background: rgba(0, 0, 0, .3);
    box-shadow: inset 3px 3px 0 rgba(0, 0, 0, .2);
  }
  .crater1 {
    width: 20px;
    height: 20px;
    left: 25%;
    top: 20%;
  }
  .crater2 {
    width: 10px;
    height: 10px;
    left: 50%;
    top: 60%;
  }
  .crater3 {
    width: 15px;
    height: 15px;
    left: 30%;
    top: 65%;
  }
  .crater4 {
    width: 15px;
    height: 15px;
    left: 60%;
    top: 35%;
  }
  .star {
    display: block;
    width: 5px;
    height: 5px;
    border-radius: 50%;
    background: greenyellow;
    top: 100px;
    left: 400px;
    position: relative;
    transform-origin: 100% 0;
    animation: star-ani 6s infinite ease-out;
    box-shadow: 0 0 5px 5px rgba(255, 255, 255, .3);
    opacity: 0;
    z-index: 2;
  }
  .star:after {
    content: '';
    display: block;
    top: 0px;
    left: 4px;
    border: 0px solid #fff;
    border-width: 0px 90px 2px 90px;
    border-color: transparent transparent transparent rgba(255, 255, 255, .3);
    transform: rotate(-45deg) translate3d(1px, 3px, 0);
    box-shadow: 0 0 1px 0 rgba(255, 255, 255, .1);
    transform-origin: 0% 100%;
    animation: shooting-ani 3s infinite ease-out;
  }
  .pink {
    top: 30px;
    left: 395px;
    background: #ff5a99;
    animation-delay: 5s;
    -webkit-animation-delay: 5s;
    -moz-animation-delay: 5s;
  }
  .pink:after {
    border-color: transparent transparent transparent #ff5a99;
    animation-delay: 5s;
    -webkit-animation-delay: 5s;
    -moz-animation-delay: 5s;
  }
  .yellow {
    top: 50px;
    left: 600px;
    background: #ffcd5c;
    animation-delay: 5.8s;
  }
  .yellow:after {
    border-color: transparent transparent transparent #ffcd5c;
    animation-delay: 5.8s;
  }
  @keyframes star-ani {
    0% {
      opacity: 0;
      transform: scale(0) rotate(0) translate3d(0, 0, 0);
      -webkit-transform: scale(0) rotate(0) translate3d(0, 0, 0);
      -moz-transform: scale(0) rotate(0) translate3d(0, 0, 0);
    }
    50% {
      opacity: 1;
      transform: scale(1) rotate(0) translate3d(-200px, 200px, 0);
      -webkit-transform: scale(1) rotate(0) translate3d(-200px, 200px, 0);
      -moz-transform: scale(1) rotate(0) translate3d(-200px, 200px, 0);
    }
    100% {
      opacity: 0;
      transform: scale(1) rotate(0) translate3d(-300px, 300px, 0);
      -webkit-transform: scale(1) rotate(0) translate3d(-300px, 300px, 0);
      -moz-transform: scale(1) rotate(0) translate3d(-300px, 300px, 0);
    }
  }





  //background: url("../assets/start.jpg") 100%;
  canvas {
    width: 100%;
    height: 500px;
    position: absolute;
    left: 0;
    top: 0;
  }

}
</style>
