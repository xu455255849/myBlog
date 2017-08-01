<template>
  <div class="page-head">
    <div class="header">
      <img src="../assets/tou.png"/>
      <ul>
        <li :class="{ active: isActive === 1}" @click="onchange(1)">
          <span>最</span>
          <span>新</span>
          <span>文</span>
          <span>章</span>
        </li>
        <li :class="{ active: isActive === 2}" @click="onchange(2)">
          <span>前</span>
          <span>端</span>
          <span>技</span>
          <span>术</span>
        </li>
        <li :class="{ active: isActive === 3}" @click="onchange(3)">
          <span>后</span>
          <span>端</span>
          <span>技</span>
          <span>术</span>
        </li>
        <li :class="{ active: isActive === 4}" @click="onchange(4)">
          <span>其</span>
          <span>他</span>
          <span>学</span>
          <span>习</span>
        </li>
        <li :class="{ active: isActive === 5}" @click="onchange(5)">
          <span>生</span>
          <span>活</span>
          <span>杂</span>
          <span>文</span>
        </li>
      </ul>
      <Input v-model="searchPara" @on-enter="search" @on-click="search" icon="ios-search" placeholder="文章搜索" style="width: 200px;float: right;opacity: 0.5" />
    </div>

  </div>
</template>

<script>

  export default {
    name: 'page-head',
    data() {
      return {
        searchPara: '',
        isActive: Number(sessionStorage.getItem('id')) || 1
      }
    },
    methods: {
      onchange: function (id) {
        this.isActive = id;
        sessionStorage.setItem('id',  id);
        this.$ajax.get('/article/list', {
            params: {
              page: 1,
              limit: 10,
              isActive: id
            }
          })
          .then( res => {
            if (res.data.total === 0) {
              this.$Message.info('老铁...抱歉...没有这篇文章');
            } else {
              this.$store.commit('totalChange', res.data.total);
              this.$store.commit('listChange', res.data.list);
              if (this.$route.name !== 'home') {
                this.$router.push({ name: 'home', query: { search: 'search' } });
              }
            }
            console.log(this.$store.state.app.list)
            console.log(this.$store.state.app.total)
          })
          .catch( err => {
            console.log(err)
          });
      },
      search: function () {
        if (this.searchPara == '') {
          this.$Message.info('老铁...你输个字');
        } else {
          this.$ajax.get('/article/list', {
              params: {
                page: 1,
                limit: 10,
                search: this.searchPara,
                isActive: sessionStorage.getItem('id')
              }
            })
            .then( res => {
              if (res.data.total === 0) {
                this.$Message.info('老铁...抱歉...没有这篇文章');
              } else {
                this.$store.commit('totalChange', res.data.total);
                this.$store.commit('listChange', res.data.list);
                if (this.$route.name !== 'home') {
                  this.$router.push({ name: 'home', query: { search: 'search' } });
                }
              }
            })
            .catch( err => {
              console.log(err)
            });
        }
      },
      login: function () {
        this.$ajax.post( '/login', {
          username: this.username,
          password: this.password
        })
          .then( res => {

          })
          .catch( err => {
            console.log(err)
          });
      }
    },
    mounted: function () {
      console.log()
    },
  }
</script>

<style lang="scss">
  .page-head {
    .active {
      span:nth-child(1) {
        color: greenyellow;
      }
      span:nth-child(2) {
        color: powderblue;
      }
      span:nth-child(3) {
        color: deepskyblue;
      }
      span:nth-child(4) {
        color: hotpink;
      }
    }
    box-shadow: 0 6px 9px 0 rgba(0, 0, 0, 0.5);
    z-index: 3;
    position: fixed;
    height: 60px;
    line-height: 60px;
    width: 100%;
    min-width: 1024px;
    background: url("../assets/bg-nav.jpg");
    .header {
      width: 80%;
      margin: 0 auto;
      .ivu-input-icon {
        top: 14px;
        cursor: pointer;
      }
      ul {
        li {
          display: inline-block;
          height: 60px;
          color: #fff;
          margin-right: 20px;
          cursor: pointer;
          float: left;
        }
        li:hover {
          animation: navlink 1s linear
        }
        @keyframes navlink {
          0% {
            transform: translateX(0px) rotate(0deg)
          }
          25% {
            transform:  translateX(-5px) rotate(30deg);
            color: greenyellow;
          }
          50% {
            transform:  translateX(5px) rotate(-30deg);
            color: deepskyblue;
          }
          100% {
            transform:  translateX(0px)  rotate(0deg);
            color: hotpink;
          }
        }
      }
      img {
        border-radius: 50%;
        height: 50px;
        margin: 5px 50px 0 0;
        width: 50px;
        float: left;
      }
    }


  }
</style>
