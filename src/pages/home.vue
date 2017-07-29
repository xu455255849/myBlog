<template>
  <div class="page-home">
    <NavHeader />

    <div class="body-container">
      <div class="left-container">

      </div>
      <div class="right-container">
      <Row type="flex" justify="center" class="code-row-bg">
        <Col span="18">
          <div class="content-container">
            <div v-for="item in articleList" class="article-item">
              <img src="../../server/article/test/logo.png">
              <h3>这是标题这是标题标这是标题这是标题标题这是标题这是标题标题这是标题这是标题标题题</h3>
              <div class="introduction">
                <p>  这是介绍这是介绍这是介绍这是介绍这是介绍这是介绍这是介绍这是介绍
                  这是介绍这是介绍这是介绍这是介绍这是介绍这是介绍这是介绍这是介绍这是介绍这是介绍这是介绍这是介绍这是介绍这是介绍这是介绍这是介绍这是介绍
                  这是介绍这是介绍这是介绍这是介绍这是介绍这是介绍这是介绍
                  这是介绍这是介绍这是介绍这是介绍这是介绍这是介绍这是介绍
                </p>
              </div>
              <p>发布时间：2017-11-12 </p>
              <div class="read-button" @click="getArticleList">
                <Button size="large" type="info">
                  阅读全文
                  <Icon type="chevron-right"></Icon>
                </Button>
              </div>
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
        articleList: [
          {


          }
        ]

      }
    },
    methods: {
      getArticleList: function () {
        this.$ajax.get('/article/list', {
            params: {
            page: 1
          }
        })
          .then( res => {
              console.log(res)

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
        overflow: hidden;
        height: 200px;
        .content-container {
          height: 300px;
          margin: 0 30px;
          .article-item {
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
