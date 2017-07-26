<template>
  <div>
    这是主页
  </div>
</template>

<script>

  export default {
    name: 'page-login',
    data() {
      return {
        username: '',
        password: ''
      }
    },
    methods: {
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
  .page-login {
    .fillShade {
      $color:#CCCCCC;
      position: fixed;
      top:0;
      left: 0;
      z-index:20;
      width: 100%;
      height: 100%;
      background: rgba(0,0,0,0.5);
      .shadeInner{
        width:360px;
        height:200px;
        background: white;
        position:fixed;
        top:0;
        left:0;
        bottom:0;
        right:0;
        margin:auto;
        padding: 20px;
        font-size: 16px;
        .fillContent {
          padding: 20px 0;
          p {
            margin-bottom: 20px;
            input {
              width: 170px;
              height: 36px;
              line-height: 36px;
              margin-left: 10px;
              outline: none;
              text-align: center;
            }
          }
        }
        .cancel{
          width:50px;
          height: 36px;
          line-height: 36px;
          cursor: pointer;
          border-radius: 5px;
          border:1px solid #CCCCCC;
          display: inline-block;
          text-align: center;
          float: right;
        }
        .confirm{
          height: 36px;
          width: 80px;
          line-height: 36px;
          display: inline-block;
          border:1px solid #CCCCCC;
          color: #fff;
          border-radius: 5px;
          text-align: center;
          background: #68A593;
          cursor: pointer;
          float: right;
          margin-left: 20px;
        }
      }
    }

    display: flex;
    justify-content: center;
    align-items: center;
    background-color: #EFFAF3;
    img {
      display: block;
      margin: 0 auto;
    }
    h1 {
      padding-bottom: 50px;
      font-size: 26px;
      text-align: center;
      color: #4D4D4D;
    }
    .login-type {
      margin: 25px 0;
      input[type="text"] {
        float: left;
        width: 190px;
        border-radius: 4px 0 0 4px;
      }
      button {
        width: 110px;
        height: 34px;
        border-radius: 0 4px 4px 0;
        font-size: 16px;
        &.active {
          border: 1px solid #68A593;
          border-radius: 7px;
          color: #68A593;
          background-color: #fff;
        }
      }
    }
    .login-setting {
      padding: 25px 0;
      text-align: left;
      font-size: 14px;
      color: #1A1A1A;
      label {
        cursor: pointer;
      }
      span {
        float: right;
        color: #666;
        cursor: pointer;
      }
    }
    input[type="text"],
    input[type="password"] {
      display: block;
      outline: none;
      font-size: 14px;
      height: 34px;
      padding: 0 1em;
      border: none;
      &.input-def {
        width: 300px;
        border-radius: 4px;
      }
      &.error {
        border: 1px solid #ff7e7e;
        background-color: #fffafa;
      }
    }
    button {
      display: block;
      border: none;
      outline: none;
      font-size: 16px;
      color: #fff;
      background-color: #68A593;
      cursor: pointer;
      &.submit {
        width: 300px;
        height: 40px;
        border-radius: 4px;
      }
    }
  }
</style>
