<template>
  <div class="page-head">
    <div class="header">
      <img src="../assets/tou.png"/>
      <ul>
        <li>最新文章</li>
        <li>最新文章</li>
        <li>最新文章</li>
        <li>最新文章</li>
        <li>最新文章</li>
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
        searchPara: ''
      }
    },
    methods: {
      search: function () {
        alert('sousuo')
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


    },
  }
</script>

<style lang="scss">
  .page-head {
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
