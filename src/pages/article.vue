<template>
  <div class="page-article">
    <div class="body-container">
      <div class="right-container">
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
      <div class="back" @click="back">
        <Button size="large" type="ghost">
          <Icon type="chevron-left"></Icon>
          返回列表
        </Button>
      </div>
    </div>
  </div>
</template>

<script>
  import NavHeader from '../components/header.vue'
  import RightSide from '../components/right-sidebar.vue'
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
      error (nodesc) {
        this.$Notice.error({
          title: '请求错误!!!',
          desc: nodesc ? '' : '请输入正确的地址！！！'
        });
      },
      back: function () {
          history.back()
      }
    },
    components: {
      NavHeader,
      Marked,
      RightSide
    },
    mounted: function () {
      this.$ajax.get('/article/info', {
        params: {
          id: this.$route.params.id
        }
      })
        .then( res => {
          this.info = res.data[0];
          this.html = Marked(res.data[0].content);
        })
        .catch( err => {
          this.error(false);
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
      padding-top: 20px;
      .right-container {
        padding: 30px 0 30px 50px;
        .content-container {
          padding-bottom: 50px;
          h1,h6 {
            text-align: center;
          }
        }
        .mark {
          font-size: 16px;
          h1, h2, h3 {
            padding: 30px 0;
            text-indent: 28px;
          }
          p {
            text-indent: 28px;
          }
          hr {
            margin: 0 0 19px;
            border: 0;
            border-bottom: 1px solid #ccc;
          }
          blockquote {
            padding: 13px 13px 21px 15px;
            margin-bottom: 18px;
            font-family:georgia,serif;
            font-style: italic;
          }
          img {
            display: block;
          }
          blockquote:before {
            content:"\201C";
            font-size:40px;
            margin-left:-10px;
            font-family:georgia,serif;
            color:#6d7380;
          }
          blockquote p {
            background: #8391a5;
            color: #f9fafc;
            font-size: 24px;
            font-style: italic;
          }
          blockquote:after {
            content:"\201C";
            font-size:40px;
            margin-left:-10px;
            font-family:georgia,serif;
            color:#6d7380;
          }
          code {
            padding: 1px 3px;
            font-size: 12px;
            -webkit-border-radius: 3px;
            -moz-border-radius: 3px;
            border-radius: 3px;
          }
          pre {
            display: block;
            padding: 14px;
            margin: 0 0 18px;
            line-height: 16px;
            font-size: 11px;
            border: 1px solid #d9d9d9;
            white-space: pre-wrap;
            background-color: #1c2438;
            word-wrap: break-word;
          }
          pre code {
            color: #2baee9;
            font-size: 11px;
            padding: 0;

          }
          sup {
            font-size: 0.83em;
            vertical-align: super;
            line-height: 0;
          }
        }
      }
    }
    .back {
      position: fixed;
      right: 50px;
      bottom: 50px;
    }
  }
</style>
