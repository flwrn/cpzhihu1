<template lang="html">
  <div class="comment-box">
    <div class="comment-box-content-wrapper">
      <div class="title-bar">
        <span class="comment-number">
          {{commentList.length}} 条评论
        </span>
        <a class="sorting">
          <i class="fas fa-exchange-alt"></i>
          切换为时间顺序
        </a>
      </div>

      <ul class="comment-list">
        <li class="comment-item clearfix" v-for="(item, index) of commentList" :key="item.id" @mouseenter="onmouseenter(index)" @mouseleave="onmouseleave(index)">
          <div class="author-avatar fleft">
            <img src="" alt="">
          </div>
          <div class="comment-time fright">
            {{timeSince(item.createdTime)}}
          </div>
          <div class="author-name">
            {{item.author.name}}
          </div>
          <div class="comment-content" v-html="item.content"></div>
          <div class="btns">
            <a class="up">
              <i class="fas fa-thumbs-up"></i>&nbsp;
              <span v-if="item.voteCount">{{item.voteCount}}</span>
              <span v-else>赞</span>
            </a>
            <div class="more-btns" :class="{'hidden':!commentStateList[index].moreBtns}">
              <a class="reply">
                <i class="fas fa-reply"></i>&nbsp;
                回复
              </a>
              <a class="down">
                <i class="fas fa-thumbs-down"></i>&nbsp;
                踩
              </a>
              <a class="report">
                <i class="fas fa-flag"></i>&nbsp;
                举报
              </a>
            </div>
          </div>
        </li>
      </ul>
      <div class="pagination">

      </div>
      <div class="leave-comment" :class="{'focused':isInputFocused}">
        <input
        class="leave-comment-input"
        type="text"
        placeholder="写下你的评论..."
        @focus="onfocus"
        @blur="onblur"
        >
        <div class="leave-comment-btn-wrapper">
          <button class="leave-comment-btn" type="button">评论</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
export default {
  name: 'CommentBox',
  props: {
    answerId: String,
    answerIndex: Number,
    showComments: Boolean
  },
  data() {
    return {
      commentList: [],
      commentStateList: [],
      page: 1,
      isInputFocused: false
    }
  },
  methods: {
    getComments(page) {
      axios.get(`http://localhost:4000/api/answer/${this.answerId}/comments?page=${page}`).then((res) => {
        this.commentList = res.data.commentList
      })
    },
    onmouseenter(index) {
      this.commentStateList[index].moreBtns = true
      console.log('mouseenter')
    },
    onmouseleave(index) {
      this.commentStateList[index].moreBtns = false
    },
    onfocus() {
      this.isInputFocused = true
    },
    onblur() {
      this.isInputFocused = false
    },
    timeSince(time) {
      // let now = new Date()
      // let then = new Date(time * 1000)
      let now = Math.floor(Date.now() / 1000)
      let diffSec = now - time
      let diffMin = Math.floor(diffSec / 60)
      let diffHour = Math.floor(diffSec / 60 / 60)
      let diffDay = Math.floor(diffSec / 60 / 60 / 24)
      let diffMonth = Math.floor(diffSec / 60 / 60 / 24 / 30)
      let diffYear = Math.floor(diffSec / 60 / 60 / 24 / 365)
      if (diffYear > 0) {
        return `${diffYear} 年前`
      } else if (diffMonth > 0) {
        return `${diffMonth} 个月前`
      } else if (diffDay > 0) {
        return `${diffDay} 天前`
      } else if (diffHour > 0) {
        return `${diffHour} 小时前`
      } else if (diffMin > 0) {
        return `${diffMin} 分钟前`
      } else {
        return '刚刚'
      }
    }
  },
  watch: {
    showComments(value) {
      if (value) {
        axios.get(`http://localhost:4000/api/answer/${this.answerId}/comments`).then((res) => {
          console.log(res.data)
          console.log(res.data.commentList)
          this.commentList = res.data.commentList
        })
      }
    },
    commentList(value) {
      this.commentStateList = value.map((item) => {
        return {
          moreBtns: false
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
@import '../../../css/variables.scss';
@import '../../../css/layout.scss';
.comment-box {
  margin-top: 10px;
  border-radius: 3px;
  box-shadow: 0 0px 3px #ccc;
  .title-bar {
    display: flex;
    justify-content: space-between;
    padding: 15px;
    border-bottom: 1px solid #eee;
    .comment-number {
      font-weight: 700;
      font-size: 15px;
    }
    .sorting {
      color: $gray1;
      font-size: 14px;
    }
  }
  .comment-list {
    padding: 0 15px;
    border-bottom: 1px solid #eee;
    .comment-item {
      padding: 15px 0;
      border-bottom: 1px solid #eee;
      .author-avatar {
        width: 24px;
        height: 24px;
        background: #ccc;
        border-radius: 3px;
        overflow: hidden;
        img {
          width: 100%;
        }
      }
      .comment-time {
        color: $gray1;
        font-size: 14px;
      }
      .author-name {
        padding-left: 30px;
        font-size: 15px;
      }
      .comment-content {
        font-size: 15px;
        margin-top: 15px;
        a {
          color: #369;
        }
      }
      .btns {
        margin-top: 10px;
        display: flex;
        font-size: 14px;
        a {
          color: $gray1;
          &:hover {
            color: #77839c;
          }
        }
        .more-btns {
          display: flex;
          opacity: 1;
          transition: all .2s;
          a {
            margin-left: 15px;
          }
        }
        .more-btns.hidden {
          opacity: 0;
        }
      }
    }
    .comment-item:last-child {
      border-bottom: 0;
    }
  }
  .leave-comment {
    padding: 10px 15px;
    position: relative;
    .leave-comment-input {
      width: 100%;
      height: 36px;
      line-height: 36px;
      font-size: 15px;
      border: 1px solid #ccc;
      padding: 0 15px;
      border-radius: 3px;
      background: #eee;
      transition: all .3s;
    }
    .leave-comment-btn {
      display: block;
      position: absolute;
      top: 10px;
      right: 15px;
      background: $blue1;
      color: #fff;
      height: 36px;
      border: 0;
      border-radius: 3px;
      line-height: 36px;
      padding: 0px 15px;
      transform: scale3d(0, 0, 0);
      z-index: 5;
      transition: all .3s;
    }
  }
  .leave-comment.focused {
    .leave-comment-input {
      width: calc(100% - 72px);
      border: 1px solid #666;
      background: #fff;
    }
    .leave-comment-btn {
      transform: scale3d(1, 1, 1);
    }
  }
}
</style>
