<template>
  <div class="page-home">
    <NavHeader />

    <div class="body-container">
      <transition name="fade" mode="out-in" appear :duration="{ enter: 500, leave: 500 }">
        <div v-if="show" class="left-container">

        </div>
      </transition>
      <div class="right-container" :style='`width:${width}`' style="min-width: 1024px;">
        <Row type="flex" justify="center" class="code-row-bg">
          <Col span="18">
          <div class="content-container">
            <div v-for="item in articleList" :key="item._id" class="article-item">
              <img :src="item.imgPath | imgSrc">
              <h3>{{item.title}}</h3>
              <div class="introduction">
                <p>{{item.intro}}</p>
              </div>
              <p>发布时间：{{item.time}} </p>
              <div class="read-button" @click="getArticleList">
                <Button size="large" type="info">
                  阅读全文
                  <Icon type="chevron-right"></Icon>
                </Button>
              </div>
            </div>
            <div style="text-align: center">
              <Page :total="total" :current="current" show-elevator @on-change="changePage"></Page>
            </div>
          </div>

          </Col>
          <Col span="6">
          <div class="sidebar-container"></div>



          </Col>
        </Row>
      </div>
    </div>







  </div>
</template>

<script>
  import NavHeader from '../components/header.vue'

  export default {
    name: 'page-home',
    data() {
      return {
        show: true,
        width: document.documentElement.clientWidth + 'px',
        articleList: [],
        total: 1,
        current: 1






      }
    },
    filters: {
      imgSrc: function (path) {
        var src = 'http://localhost:8888' + path.slice(6);
        return src
      }
    },
    methods: {
      getArticleList: function () {

      },
      changePage: function (current) {
        this.$ajax.get('/article/list', {
          params: {
            page: current,
            limit: 10
          }
        })
          .then( res => {
            this.current = current;
            this.articleList = res.data;
          })
          .catch( err => {
            console.log(err)
          });
      }
    },
    components: {
      NavHeader
    },
    mounted: function () {
      const that =this
      if (document.documentElement.clientWidth < 1050) {
        this.show = false
      }
      window.onresize = function () {
        that.width = document.documentElement.clientWidth + 'px';
        if (document.documentElement.clientWidth < 1050) {
          that.show = false
        } else {
          that.show = true
        }
      };
      this.$ajax.get('/article/list', {
        params: {
          page: 1,
          limit: 10
        }
      })
        .then( res => {
            console.log(res)
          this.current = 1;
          this.total = res.data.length;
          this.articleList = res.data;
        })
        .catch( err => {
          console.log(err)
        });

    },
  }
</script>

<style lang="scss">
  .page-home {
    height: 100%;
    .body-container {
      height: 100%;
      padding-top: 60px;
      .left-container {
        float: left;
        height: 100%;
        width: 300px;
        background: #2b85e4;
      }
      .right-container {
        .content-container {
          margin: 0 30px;
          .article-item {
            margin: 20px 0;
            position: relative;
            height: 200px;
            padding: 20px;
            img {
              float: left;
              height: 160px;
              width: 160px;
              margin-right: 20px;
            }
            h3 {
              white-space: nowrap;
              text-overflow: ellipsis;
              overflow: hidden;
            }
            .introduction {
              height: 115px;
              padding: 20px 0;
              p {
                overflow: auto;
                height: 70px;
              }
            }
            .read-button {
              position: absolute;
              right: 50px;
              bottom: 21px;
              .ivu-btn-large {
                width: 120px;
              }

            }

          }
        }
        .sidebar-container {
          height: 300px;
          background: #000000;

        }
      }

    }

  }
</style>
