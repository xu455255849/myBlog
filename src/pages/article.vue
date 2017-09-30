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
      <div v-if="admin" class="delete" @click="del">
        <Button size="large" type="error">
          删除文章
        </Button>
      </div>
      <div class="back" @click="back">
        <Button size="large" type="ghost">
          <Icon type="chevron-left"></Icon>
          返回列表
        </Button>
      </div>
    </div>
    <Modal
      v-model="modal1"
      :closable="false"
      @on-ok="ok"
      @on-cancel="cancel">
      是否确认删除文章?
    </Modal>
    <Modal v-model="preview"
           width="100%"
           :closable="false"
    >
      <span slot="header"></span>
      <div style="text-align:center;cursor: pointer" @click="close">
        <img style="width: 100%" :src="previewUrl" />
      </div>
      <span slot="footer"></span>
    </Modal>
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
        modal1: false,
        preview: false,
        previewUrl: '',
        info: '',
        html: '',
        admin: false  //设置一个简易的加密来给特殊的用户删除文章的权限 //localStorage.getItem('username') === 'xxxx'

      }
    },
    methods: {
      close: function () {
        this.preview = false
      },
      ok () {
          //删除数据库
        this.$ajax.post('/article/del',
          {
              id: this.$route.params.id,
              cate: this.info.cate
        })
        .then( res => {
          this.$Message.info('删除成功');
          //删除服务器图片
          this.$ajax.post('/image/delete', {
            path: this.info.imgPath
          })
          .then( res => {
              console.log(res)
          })
          .catch( err => {
            console.log(err)
          });
          setTimeout( ()=> {
            this.$router.replace({name: 'list'})
          }, 2000)
        })
        .catch( err => {
          this.$Message.info('服务器出错');
        });
      },
      cancel () {
        this.modal1 = false
      },
      del: function () {
          this.modal1 = true
      },
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
    watch: {
        '$route.params.id': function () {
            console.log(this.$route.params.id)
          if (this.$route.params.id !== undefined) {
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
          }
        }
    },
    mounted: function () {
        setTimeout(()=> {
          document.querySelector('.page-article').querySelectorAll('img').forEach((it)=> {
            it.onclick = ()=> {
                this.previewUrl = it.src
              this.preview = true
            }
          });
        }, 2000)
      
      
      this.$ajax.get('/article/info', {
        params: {
          id: this.$route.params.id
        }
      })
        .then( res => {
          this.info = res.data[0];
          
          this.html =  Marked(res.data[0].content)
          
        })
        .catch( err => {
          this.error(false);
          console.log(err)
        });
    },
  }
</script>

<style lang="scss">
  .ivu-modal-body {
    text-align: center !important;
    font-size: 18px !important;
    color: red;
  }
  .page-article {
    height: 100%;
    margin-bottom: 50px;
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
          ul, ol {
            list-style: gurmukhi;
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
            width: 100%;
            cursor: pointer;
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
    .delete {
      position: fixed;
      right: 50px;
      z-index: 999;
      bottom: 100px;
    }
    .back {
      position: fixed;
      right: 50px;
      z-index: 999;
      bottom: 50px;
    }
  }
</style>
