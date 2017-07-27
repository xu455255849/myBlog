<template>
  <div class="page-home">
    <NavHeader />





  </div>
</template>

<script>
  import NavHeader from '../components/header.vue'

  export default {
    name: 'page-home',
    data() {
      return {
        username: '',
        password: '',

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
  }
</style>
