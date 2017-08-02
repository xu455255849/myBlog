<template>
  <div class="page-home">
    <NavHeader />
    <div class="body-container">
      <LeftSide v-if="show" />
      <div :class="{ leftActive: changeSize }" class="right-container" :style='`width:${width}`' style="min-width: 1024px;">
        <Row type="flex" justify="center" class="code-row-bg">
          <Col span="18">
          <div class="content-container">
            <div class="comment-container">

            </div>

            <Timeline>
              <Timeline-item v-for="item in items" :key="item">
                <p class="name">2018-12-12
                  <span>10:19:12</span>
                  <span>徐绍平</span></p>
                <p class="content">Apple I 问世</p>
              </Timeline-item>
            </Timeline>
          </div>
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

        items: [{},,,,,,,,,]


      }
    },
    filters: {
      imgSrc: function (path) {
        var src = 'http://localhost:8888' + path.slice(6);
        return src
      }
    },
    methods: {

      changePage: function (current) {
        this.$ajax.get('/article/list', {
            params: {
              page: current,
              limit: 10,
              isActive: sessionStorage.getItem('id')
            }
          })
          .then( res => {
            this.current = current;
            this.articleList = res.data.list;
          })
          .catch( err => {
            console.log(err)
          });
      }
    },
    components: {
      NavHeader,
      LeftSide,
      RightSide
    },
    computed: {
      list () {
        //return this.$store.state.heightInner
        return  this.$store.state.app.list
      },
    },
    watch: {
      list: function () {
        this.current = 1;
        this.total = this.$store.state.app.total;
        this.articleList =this.$store.state.app.list;
      }
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

      this.$ajax.get('/board', {
          params: {
            page: 1,
            limit: 10,
            isActive: sessionStorage.getItem('id')
          }
        })
        .then( res => {
          this.current = 1;
          this.total = res.data.total;
          this.articleList = res.data.list;
        })
        .catch( err => {
          console.log(err)
        });

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
      .right-container {
        .comment-container {
          height: 200px;
          margin-bottom: 20px;
          background: #2baee9;
        }
        .content-container {
          padding: 30px 50px;
          .name {
            font-size: 18px;
            position: relative;
            border-bottom: 1px solid #8391a5;
            top: -5px;
            span {
              font-size: 12px;
            }
            span:last-child {
              margin-left: 20px;
              font-size: 14px;
            }
          }
          .content {
            font-size: 14px;
            padding: 5px;
          }

        }
      }
    }
  }
</style>
