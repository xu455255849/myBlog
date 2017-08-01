<template>
  <div class="page-article">
    <NavHeader />

    <div class="body-container">
      <div class="left-container">

      </div>

      <div class="right-container"  style="min-width: 1024px;">
        <Row type="flex" justify="center" class="code-row-bg">
          <Col span="24">
            <div class="content-container">
              <h1>{{info.title}}</h1>
              <h6>发布日期：{{info.time}}</h6>
            </div>
            <div class="mark" v-html="html"></div>
          </Col>

        </Row>
      </div>
    </div>







  </div>
</template>

<script>
  import NavHeader from '../components/header.vue'
  import Marked from 'marked'
  export default {
    name: 'page-article',
    data() {
      return {
        info: '',
        html: '',








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

    },
    components: {
      NavHeader,
      Marked
    },
    mounted: function () {
      this.$ajax.get('/article/info', {
        params: {
          id: this.$route.params.id
        }
      })
        .then( res => {
          this.info = res.data[0];
          this.html = Marked( res.data[0].content, { sanitize: true });

          console.log(this.info)
        })
        .catch( err => {
          console.log(err)
        });

    },
  }
</script>

<style lang="scss">
  .page-article {
    height: 100%;
    .body-container {
      height: 100%;
      padding-top: 60px;
      .left-container {
        z-index: 2;
        position: fixed;
        height: 100%;
        width: 300px;
        background: #2b85e4;
      }
      .right-container {
        margin-left: 300px;
        padding: 80px;
        .content-container {
          padding-bottom: 50px;
          h1,h6 {
            text-align: center;
          }
        }
        .mark {

        }

      }

    }

  }
</style>
