<template>
  <div class="page-list">
    <div class="content-container">
      <div v-for="item in articleList" :key="item._id" class="article-item">
        <img :src="item.imgPath | imgSrc">
        <h3>{{item.title}}</h3>
        <div class="introduction">
          <p>{{item.intro}}</p>
        </div>
        <p>
          <span>发布时间：{{item.time}}</span>
          <span style="padding-left: 20px;">分类于：
                  <Tag v-if="item.cate === 1" color="blue">前端技术</Tag>
                  <Tag v-if="item.cate === 2" color="green">后端技术</Tag>
                  <Tag v-if="item.cate === 3" color="red">其他学习</Tag>
                  <Tag v-if="item.cate === 4" color="yellow">生活杂文</Tag>
          </span>
        </p>
        <router-link :to="{ path: '/home/' + item._id}" class="read-button">
          <Button size="large" type="info">
            阅读全文
            <Icon type="chevron-right"></Icon>
          </Button>
        </router-link>
      </div>
      <div style="text-align: center;padding: 50px 0;">
        <Page :total="total" :current="current" show-elevator @on-change="changePage"></Page>
      </div>
    </div>
  </div>
</template>
<script>
  export default {
    name: 'page-list',
    data() {
      return {
        articleList: [],
        total: 1,
        current: 1,
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

      if (this.$route.query.search == 'search' && this.$store.state.app.list.length !== 0) {
        this.current = 1;
        this.total = this.$store.state.app.total;
        this.articleList = this.$store.state.app.list;
        if (document.documentElement.clientWidth < 1200) {
          this.show = false;
          this.changeSize = false
        }
        history.replaceState(null, null, "/home/list?search=finish");
      } else {
        this.$ajax.get('/article/list', {
            params: {
              page: 1,
              limit: 10,
              isActive: sessionStorage.getItem('id') || 1
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

      }
    },
  }
</script>

<style lang="scss">
  .page-list {
    .content-container {
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
  }
</style>
