<template>
  <div class="component-left-side">
    <transition name="fade" mode="out-in" appear :duration="{ enter: 500, leave: 500 }">
      <div class="left-container">
        <div class="you-self">
          <img src="../assets/tou.png"/>
          <h3>不止前端</h3>
          <p style="padding: 20px 0">所谓星空,不就是黑夜中的一点光芒汇聚而成的吗</p>
        </div>
        <div class="tag">
          <Tag>
            <a href="https://github.com/xu455255849">
              <Icon type="social-github" :size="16" />Github
            </a>
          </Tag>
        </div>
      </div>
    </transition>
  </div>
</template>

<script>

  export default {
    name: 'component-left-side',
  }
</script>

<style lang="scss">
  .component-left-side {
    z-index: 3;
    position: fixed;
    width: 300px;
    height: 100%;
    color: #fff;
    background: {
      image: url("../assets/bg-left-v_02.png");
      repeat: no-repeat;
      size: 100% 100%;
    };
    .left-container {
      .you-self {
        width: 200px;
        margin: 0 auto;
        text-align: center;
        img {
          height: 100px;
          width: 100px;
          margin: 20px auto;
          display: block;
          opacity: 0.6;
        }
      }
      .tag {
        text-align: center;
        .ivu-icon {
          padding-right: 10px;
        }
      }
    }


  }
</style>
