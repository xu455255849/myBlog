<template>
  <div class="page-publish">
    <Row type="flex" justify="center" class="code-row-bg">
      <Col span="24">
      <div class="container">
        <h1 style="text-align: center;padding-bottom: 50px;">发布文章</h1>
        <div class="title">
          <div class="block">
            <span>输入标题：</span>
            <Input v-model="title" placeholder="请输入..." style="width: 80%" />
          </div>
          <div class="block">
            <span>选择分类：</span>
            <Select v-model="cate" style="width:200px" @on-change="changeCate">
              <Option v-for="item in classifyList" :value="item.value" :key="item.value">{{ item.label }}</Option>
            </Select>
          </div>
          <div class="block">
            <span>输入简介：</span>
            <div class="textarea">
              <Input v-model="intro" type="textarea" :autosize="{minRows: 2,maxRows: 5}" placeholder="请输入..." />
            </div>
          </div>
          <div style="clear: both"></div>
        </div>
        <div class="mark">
          <p style="padding-bottom: 20px;text-align: center;font-size: 24px;">文章内容编辑</p>
          <div id="editor">
            <textarea v-model="input"></textarea>
            <div class="markdown" v-html="compiledMarkdown"></div>
          </div>
        </div>
        <p style="padding-bottom: 30px;text-align: center;font-size: 24px;">文章LOGO照片上传</p>
        <Upload
          ref="upload"
          type="drag"
          action="//106.14.205.222:8080/upload"
          :format="['jpg','jpeg','png']"
          :on-success="handleSuccess"
          :max-size="2048"
          :on-format-error="handleFormatError"
          :on-exceeded-size="handleMaxSize"
          :before-upload="handleBeforeUpload"
          :on-preview="handlePreview"
          :on-remove="handleRemove"
        >
          <Button type="ghost" icon="ios-cloud-upload-outline">上传LOGO</Button>
        </Upload>
        <div class="submit-button" @click="submit">
          <Button size="large" type="info">
            提交文章
            <Icon type="chevron-right"></Icon>
          </Button>
        </div>
      </div>
      </Col>
    </Row>
    <Modal v-model="preview"
           width="900"
           title="LOGO预览"
    >
      <div style="text-align:center">
        <img :src="previewUrl" />
      </div>
      <div slot="footer">
        <Button type="error" size="large" long  @click="close">关闭</Button>
      </div>
    </Modal>
  </div>
</template>

<script>
  import Marked from 'marked'

  export default {
    name: 'page-publish',
    data() {
      return {
        preview: false,
        title: '',
        intro: '',
        input: '# hello',
        date: '',
        logo: '',
        check: 0,
        previewUrl: '',
        classifyList: [
          {
            value: 1,
            label: '前端技术'
          },
          {
            value: 2,
            label: '后端技术'
          },
          {
            value: 3,
            label: '其他学习'
          },
          {
            value: 4,
            label: '生活杂文'
          }
        ],
        cate: ''
      }
    },
    computed: {
      compiledMarkdown: function () {
        return Marked(this.input)
      }
    },
    methods: {
      changeCate: function (val) {
        console.log(val)
        console.log(this.cate)
      },
      close: function () {
        this.preview = false
      },
      submit: function () {
        if (this.title == '' && this.intro == '' && this.input == '' && this.logo == '' && this.date == '' && this.cate == '') {
          this.$Notice.warning({
            title: '老铁...不要乱点提交'
          });
          return;
        }
        this.$ajax.post('/article/publish', {
            title: this.title,
            intro: this.intro,
            content: this.input,
            imgPath: this.logo,
            time: this.date,
            cate: this.cate
          })
          .then( res => {
            this.$Message.success('发布成功');
            setTimeout(function () {
              location.reload()
            }, 2000)
          })
          .catch( err => {
            console.log(err)
          });

      },
      handleSuccess (res, file) {
        this.check ++
        this.logo = res.path;
      },
      handleFormatError (file) {
        this.$Notice.warning({
          title: '文件格式不正确',
          desc: '文件 ' + file.name + ' 格式不正确，请上传 jpg 或 png 格式的图片。'
        });
      },
      handleMaxSize (file) {
        this.$Notice.warning({
          title: '超出文件大小限制',
          desc: '文件 ' + file.name + ' 太大，不能超过 2M。'
        });
      },
      handleBeforeUpload () {
        const check = this.check < 1;
        if (!check) {
          this.$Notice.warning({
            title: '最多只能上传 1 张图片。'
          });
        }
        return check;
      },
      handlePreview (file) {
        let path = file.response.path.slice(6);
        this.previewUrl = this.$ajax.defaults.baseURL + path;
        this.preview = true
      },
      handleRemove: function (file) {
        console.log(file.response.filename);
        this.$ajax.post('/image/delete', {
            path: file.response.path
          })
          .then( res => {
            this.check --
          })
          .catch( err => {
            console.log(err)
          });
      }


    },
    mounted: function () {

      var date = new Date();
      var year = date.getFullYear();
      var month = date.getMonth() + 1;
      var day = date.getDate();

      if (month < 10) {
        month = '0' + month
      }
      if (day < 10) {
        day = '0' + day
      }
      this.date = year + '-' + month + '-' + day;

    },
    components: {Marked},
  }
</script>

<style lang="scss">
  .page-publish {
    .container {
      padding: 50px 200px;
      .title {
        .block {
          padding-bottom: 20px;
        }
        span {
          float: left;
          width: 120px;
          display: inline-block;
          height: 32px;
          line-height: 32px;
        }
        .textarea {
          float: left;
          width: 80%;
        }
      }
      .mark {
        padding: 30px 0;
        margin-bottom: 100px;
        #editor {
          height: 500px;
          padding: 20px 0;
        }
        .markdown {
          font-size: 16px;
          h1, h2, h3 {
            padding: 30px 0;
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
        textarea, #editor div {
          display: inline-block;
          width: 49%;
          height: 500px;
          overflow: auto;
          vertical-align: top;
          box-sizing: border-box;
          padding: 20px;
        }
        textarea {
          border: none;
          border-right: 1px solid #ccc;
          resize: none;
          outline: none;
          background-color: #f6f6f6;
          font-size: 14px;
          font-family: 'Monaco', courier, monospace;
          padding: 20px;
        }
      }
      .demo-upload-list{
        display: inline-block;
        width: 60px;
        height: 60px;
        text-align: center;
        line-height: 60px;
        border: 1px solid transparent;
        border-radius: 4px;
        overflow: hidden;
        background: #fff;
        position: relative;
        box-shadow: 0 1px 1px rgba(0,0,0,.2);
        margin-right: 4px;
      }
      .demo-upload-list img{
        width: 100%;
        height: 100%;
      }
      .demo-upload-list-cover{
        display: none;
        position: absolute;
        top: 0;
        bottom: 0;
        left: 0;
        right: 0;
        background: rgba(0,0,0,.6);
      }
      .demo-upload-list:hover .demo-upload-list-cover{
        display: block;
      }
      .demo-upload-list-cover i{
        color: #fff;
        font-size: 20px;
        cursor: pointer;
        margin: 0 2px;
      }
      .submit-button {
        padding: 50px 0;
        margin-bottom: 100px;
        text-align: center;
      }
      .ivu-upload-list-file {
        text-align: center !important;
      }
    }
  }
</style>
