<template>
  <div class="page-board">
    <Row type="flex" justify="center" class="code-row-bg">
      <Col span="24">
      <div class="content-container">
        <div class="comment-container">
          <Input v-model="msg" type="textarea" :autosize="{minRows: 2,maxRows: 5}" placeholder="大佬，有话请讲......" @on-change="timeChange" />

          <div style="text-align: center;margin: 50px 0;" @click="submit">
            <Button size="large" type="success">
              发表评论
              <Icon type="chevron-right"></Icon>
            </Button>
          </div>
        </div>

        <Timeline>
          <Timeline-item v-for="item in items" :key="item.time" >
            <p class="name">{{item.date}}
              <span>{{item.time}}</span>
              <span>{{item.name}}</span></p>
            <p class="content">{{item.content}}</p>
          </Timeline-item>
        </Timeline>
      </div>
      </Col>
    </Row>
  </div>
</template>

<script>
  export default {
    name: 'page-board',
    data() {
      return {
        msg: '',
        items: [],
        date: '',
        time: ''

      }
    },
    filters: {
      imgSrc: function (path) {
        var src = 'http://localhost:8888' + path.slice(6);
        return src
      }
    },
    methods: {
      timeChange: function () {
        var date = new Date();
        var hour = date.getHours();
        var minutes = date.getMinutes();
        var second = date.getSeconds();

       if (hour < 10) {
         hour = '0' + hour
        }
        if (minutes < 10) {
          minutes = '0' + minutes
        }
        if (second < 10) {
          second = '0' + second
        }
        this.time = hour + ':' + minutes + ':' + second;
        console.log(this.time)
      },
      submit: function () {
        if (this.msg !== '') {
          this.$ajax.post('/board/post', {
              date: this.date,
              time: this.time,
              name: localStorage.getItem('username'),
              content: this.msg,
              position: this.date + this.time
            })
            .then( res => {
              location.reload()
            })
            .catch( err => {
              this.error(false);
              console.log(err)
            });
        } else {
          this.$Message.warning('大佬别说话，用手去输......');
        }
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

      this.$ajax.get('/board/get', {
          params: {
          }
        })
        .then( res => {
          this.items = res.data;
          console.log(this.items)
        })
        .catch( err => {
          console.log(err)
        });

    },
  }
</script>

<style lang="scss">
  .page-board {
    .content-container {
      padding: 30px 50px;
      .name {
        font-size: 18px;
        position: relative;
        border-bottom: 1px solid #8391a5;
        top: -5px;
        span {
          font-size: 12px;
        }
        span:last-child {
          margin-left: 20px;
          font-size: 14px;
        }
      }
      .content {
        font-size: 14px;
        padding: 5px;
      }

    }
  }
</style>
