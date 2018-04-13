<template lang="html">
  <div class="comments-wrapper">
    <ul class="comments">
      <li class="comment clearfix" v-for="(comment, index) in comments" v-on:mouseenter="mouseenter(index)" v-on:mouseleave="mouseleave(index)">
        <a href="#" class="avatar f-l"></a>
        <a href="#" class="name">{{comment.name}}</a>
        <p class="content">{{comment.content}}</p>
        <p class="time f-l">{{comment.time}}</p>
        <div class="btns-wrapper f-l">
          <ul class="btns clearfix" v-if="comment.isBtnShown">
            <li class="f-l"><a class="reply-btn">回复</a></li>
            <li class="f-l"><a class="up-btn">赞</a></li>
            <li class="f-l"><a class="down-btn">踩</a></li>
            <li class="f-l"><a class="report-btn">举报</a></li>
          </ul>
        </div>
        <p class="ups f-r">{{comment.ups}}个赞</p>
      </li>
    </ul>
    <div class="new-comment-row">
      <div class="new-comment-wrapper">
        <input class="new-comment" type="text" placeholder="写下你的评论...">
      </div>
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
      isShown: false
    }
  },
  methods: {
    mouseenter(index) {
      this.comments[index].isBtnShown = true
    },
    mouseleave(index) {
      this.comments[index].isBtnShown = false
    }
  }
}
</script>

<style lang="scss" scoped>
  .comments-wrapper {
    border: 1px solid #ccc;
    border-radius: 2px;
    margin: 5px 50px;
    .comments {
      padding: 10px;
      border-bottom: 1px solid #ccc;
      .comment {
        border-bottom: 1px solid #ccc;
        padding: 10px;
        &:last-of-type {
          border-bottom: 0;
        }
        .avatar {
          width: 30px;
          height: 30px;
          background: #ccc;
        }
        .name, .content, .time {
          margin-left: 40px;
        }
        .name {
          color: #06c;
        }
        .time, .ups {
          padding: 5px 0;
        }
        .btns a {
          padding: 5px;
        }
      }
    }
    .new-comment-row {
      background: #eee;
      height: 100%;
      padding: 10px;
      .new-comment-wrapper {
        // margin: 10px;
        border: 1px solid #ccc;
        border-radius: 5px;
        background: #fff;
        box-shadow: 0 1px 1px #ccc inset;
        // width: 100%;
        // height: 100%;
        .new-comment {
          width: 100%;
          border: 0;
          background: none;
          padding: 5px 10px;
        }
      }
    }
  }
</style>
