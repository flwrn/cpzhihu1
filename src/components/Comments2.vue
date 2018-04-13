<template lang="html">
  <div class="comments-wrapper">
    <div class="comments-info clearfix">
      <p class="comments-number f-l">几条评论</p>
      <a href="#" class="sorting-comments f-r">切换时间顺序</a>
    </div>
    <ul class="comments">
      <li class="comment clearfix" v-for="(comment, index) in comments" v-on:mouseenter="mouseenter(index)" v-on:mouseleave="mouseleave(index)">
        <a href="#" class="avatar f-l"></a>
        <a href="#" class="name f-l">{{comment.name}}</a>
        <p class="time f-r">{{comment.time}}</p>
        <p class="content">{{comment.content}}</p>
        <p class="ups f-r">{{comment.ups}}个赞</p>
        <div class="btns-wrapper f-l">
          <ul class="btns clearfix">
            <li class="f-l"><a class="up-btn">赞</a></li>
            <li class="f-l" v-if="comment.isBtnShown"><a class="reply-btn">回复</a></li>
            <li class="f-l" v-if="comment.isBtnShown"><a class="down-btn">踩</a></li>
            <li class="f-l" v-if="comment.isBtnShown"><a class="report-btn">举报</a></li>
          </ul>
        </div>
      </li>
    </ul>
    <div class="new-comment-row clearfix">
      <div class="new-comment-wrapper f-l" v-bind:style="newCommentStyle.input">
        <input class="new-comment" v-on:focus="inputOnFocus" v-on:blur="inputOnBlur" type="text" placeholder="写下你的评论...">
      </div>
      <a href="#" class="new-comment-send f-r" v-bind:style="newCommentStyle.send">发送</a>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      comments: [
        {
          name: '评论者',
          content: '具体评论内容，具体评论内容，具体评论内容，具体评论内容，具体评论内容，具体评论内容，具体评论内容。',
          time: '3天前',
          ups: 233,
          isBtnShown: false
        },
        {
          name: '评论者',
          content: '具体评论内容，具体评论内容，具体评论内容，具体评论内容，具体评论内容，具体评论内容，具体评论内容。',
          time: '3天前',
          ups: 233,
          isBtnShown: false
        },
        {
          name: '评论者',
          content: '具体评论内容，具体评论内容，具体评论内容，具体评论内容，具体评论内容，具体评论内容，具体评论内容。',
          time: '3天前',
          ups: 233,
          isBtnShown: false
        },
        {
          name: '评论者',
          content: '具体评论内容，具体评论内容，具体评论内容，具体评论内容，具体评论内容，具体评论内容，具体评论内容。',
          time: '3天前',
          ups: 233,
          isBtnShown: false
        }
      ],
      isShown: false,
      newCommentStyle: {
        input: {
          background: '#eee',
          width: '86%'
        },
        send: {
          // display: 'none',
          // visibility: 'hidden',
          // background: 'red'
        }
      }
    }
  },
  methods: {
    mouseenter(index) {
      this.comments[index].isBtnShown = true
    },
    mouseleave(index) {
      this.comments[index].isBtnShown = false
    },
    inputOnFocus() {
      // this.newCommentStyle.input.width = '86%'
      this.newCommentStyle.input.background = '#fff'
      // this.newCommentStyle.send.display = 'block'
      // this.newCommentStyle.send.visibility = 'visible'
      // this.newCommentStyle.send.background = 'green'
    },
    inputOnBlur() {
      // this.newCommentStyle.input.width = '100%'
      this.newCommentStyle.input.background = '#eee'
      // this.newCommentStyle.send.display = 'none'
      // this.newCommentStyle.send.visibility = 'hidden'
      // this.newCommentStyle.send.background = 'red'
    }
  }
}
</script>

<style lang="scss" scoped>
  .comments-wrapper {
    border: 1px solid #eee;
    border-radius: 3px;
    margin: 20px 0;
    box-shadow: 0 0 5px #eee;
    .comments-info {
      padding: 10px 20px;
      border-bottom: 1px solid #eee;
      .comments-number {
        color: #000;
        font-weight: 700;
      }
      .sorting-comments {
        color: #999;
      }
    }
    .comments {
      padding: 10px 20px;
      border-bottom: 1px solid #eee;
      .comment {
        border-bottom: 1px solid #eee;
        padding: 10px 0px;
        &:last-of-type {
          border-bottom: 0;
        }
        .avatar {
          width: 30px;
          height: 30px;
          background: #ccc;
          margin: 0 5px 5px 0;
        }
        // .name, .content, .time {
        //   margin-left: 40px;
        // }
        .name {
          color: #000;
          margin-top: 4px;
        }
        .content {
          margin-top: 40px;
          // border-top: 1px solid #000;
        }
        .time {
          margin-top: 4px;
          color: #999;
        }
        // .time, .ups {
        //   padding: 5px 0;
        // }
        .ups {
          color: #999;
          padding: 0 0;
        }
        .btns a {
          padding: 5px 5px;
          color: #999;
          &:hover {
            color: #666;
          }
        }
        .btns li:first-child a {
          padding: 5px 5px 5px 0;
        }
      }
    }
    .new-comment-row {
      background: #fff;
      height: 100%;
      padding: 10px;
      overflow: hidden;
      .new-comment-wrapper {
        // margin: 10px;
        border: 1px solid #999;
        border-radius: 3px;
        background: #eee;
        // box-shadow: 0 1px 1px #ccc inset;
        width: 100%;
        // height: 100%;
        transition: all .2s;
        .new-comment {
          width: 100%;
          border: 0;
          background: none;
          padding: 5px 15px;
          height: 35px;
        }
      }
      .new-comment-send {
        height: 35px;
        line-height: 25px;
        text-align: center;
        padding: 5px 15px;
        background: #69f;
        color: #fff;
        border-radius: 3px;
        margin: 0 5px;
        // display: none;
        // visibility: hidden;
        transition: all .2s;
      }
    }
  }
</style>
