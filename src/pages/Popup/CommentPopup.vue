<template lang="html">
  <div class="comment-popup">
    <div class="title-bar">
      <div class="comment-number">
        {{numberFormat(currentPopup.data.comment_count, 'comma')}} 条评论
      </div>
      <a class="sorting">
        <i class="fas fa-exchange-alt"></i>
        切换为时间顺序
      </a>
    </div>
    <ul class="comment-list" @scroll="onScroll">
      <li class="comment-item" v-for="(item, index) of commentList" :key="item.id" @mouseenter="onMouseEnter(index)" @mouseleave="onMouseLeave(index)">
        <div class="author-avatar fleft">
          <img :src="item.author.member.avatar_url" alt="">
        </div>
        <div class="comment-time fright">
          {{timeSince(item.created_time)}}
        </div>
        <div class="author-name">
          {{item.author.member.name}}
        </div>
        <div class="comment-content v-html" v-html="item.content"></div>
        <div class="btns">
          <a class="up">
            <i class="fas fa-thumbs-up"></i>&nbsp;
            <span v-if="item.vote_count > 0">{{numberFormat(item.vote_count, 'k')}}</span>
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
    <form class="leave-comment" :class="{'focused':isLeaveCommentInputFocused}" @submit="onSubmit">
      <input
      @focus="onLeaveCommentInputFocus"
      class="leave-comment-input"
      type="text"
      placeholder="写下你的评论..."
      v-model="leaveCommentInput"
      >
      <div class="leave-comment-btn-wrapper">
        <button class="leave-comment-btn" :class="{'disabled':isLeaveCommentBtnDisabled}" type="submit">评论</button>
      </div>
    </form>
  </div>
</template>

<script>
import axios from 'axios'
import utils from '../../store/utils.js'
import { mapState, mapMutations, mapActions } from 'vuex'

export default {
  name: 'CommentPopup',
  data() {
    return {
      isLeaveCommentInputFocused: false,
      leaveCommentInput: '',
      commentList: [],
      commentStateList: [],
      page: 0,
      LIMIT: 10,
      isLoadingMoreComments: false
    }
  },
  computed: {
    ...mapState({
      hostname: 'hostname'
    }),
    ...mapState('user', {
      currentUser: 'currentUser'
    }),
    ...mapState('popup', {
      currentPopup: 'currentPopup'
    }),
    isLeaveCommentBtnDisabled() {
      return this.leaveCommentInput === ''
    },
    isLastPage() {
      return this.page === Math.ceil(this.currentPopup.data.comment_count / 10)
    }
  },
  methods: {
    ...utils,
    ...mapMutations('popup', {
      changePopupState: 'changePopupState'
    }),
    ...mapActions('questionPage', {
      updateComment: 'updateComment'
    }),
    onLeaveCommentInputFocus() {
      this.isLeaveCommentInputFocused = true
    },
    onLeaveCommentInputBlur() {
      this.isLeaveCommentInputFocused = false
    },
    onSubmit(event) {
      event.preventDefault()
      if (!this.currentUser) {
        // this.setCurrentPopup({
        //   type: 'Login',
        //   data: null
        // })
        this.changePopupState({
          currentPopup: {
            type: 'Login',
            data: null
          }
        })
      } else {
        const newComment = {}
        let newQuestionStats = null
        let newAnswerStats = null
        let newAnswer = null
        const createdTime = Math.floor(Date.now() / 1000)
        newComment.type = 'comment'
        newComment.id = `a${createdTime}`
        newComment.content = this.leaveCommentInput
        newComment.created_time = createdTime
        if (this.currentPopup.type === 'QuestionComment') {
          newComment.resource_type = 'question'
          newComment.question_id = this.currentPopup.data.id
          newQuestionStats = {
            id: this.currentPopup.data.id,
            aug_answer_count: this.currentPopup.data.aug_answer_count,
            aug_comment_count: this.currentPopup.data.aug_comment_count + 1
          }
        }
        if (this.currentPopup.type === 'AnswerComment') {
          newComment.resource_type = 'answer'
          newComment.answer_id = this.currentPopup.data.id
          if (this.currentPopup.data.id.startsWith('a')) {
            newAnswer = {
              id: this.currentPopup.data.id,
              aug_comment_count: this.currentPopup.data.aug_comment_count + 1,
              comment_count: this.currentPopup.data.comment_count + 1
            }
          } else {
            newAnswerStats = {
              id: this.currentPopup.data.id,
              aug_comment_count: this.currentPopup.data.aug_comment_count + 1
            }
          }
        }
        newComment.author = {
          member: this.currentUser.author
        }
        newComment.vote_count = 0
        this.updateComment({ newComment, newQuestionStats, newAnswerStats, newAnswer })
      }
    },
    onScroll() {
      const commentList = document.querySelector('.comment-popup .comment-list')
      const distance = commentList.scrollHeight - commentList.scrollTop - commentList.clientHeight
      if (distance < 100 && !this.isLastPage && !this.isLoadingMoreComments) {
        this.loadMoreComments(this.page + 1)
      }
    },
    onMouseEnter(index) {
      this.commentStateList[index].moreBtns = true
    },
    onMouseLeave(index) {
      this.commentStateList[index].moreBtns = false
    },
    loadMoreComments(page) {
      if (!this.isLoadingMoreComments) {
        this.isLoadingMoreComments = true
        if (this.currentPopup.type === 'QuestionComment') {
          const questionId = this.currentPopup.data.id
          const aug_comment_count = this.currentPopup.data.aug_comment_count || 0
          const api_comment_count = this.currentPopup.data.api_comment_count || 0
          axios.get(`${this.hostname}/api/question/${questionId}/comments?page=${page}&limit=${this.LIMIT}&aug_comment_count=${aug_comment_count}&api_comment_count=${api_comment_count}`).then((response) => {
            if (response.data.commentList) {
              const commentList = response.data.commentList.map((item) => {
                const regex1 = /https:\/\/(pic[0-9])\.zhimg\.com\/([^.]*)\.(jpg|png|gif)/g
                const sub1 = `${this.hostname}/api/image/$1/$2.$3`
                item.author.member.avatar_url = item.author.member.avatar_url.replace(regex1, sub1)
                return item
              })
              for (let item of commentList) {
                this.commentList.push(item)
              }
              for (let index=this.commentStateList.length; index<this.commentList.length; index++) {
                this.commentStateList.push({
                  moreBtns: false
                })
              }
              return true
            } else {
              return false
            }
          }).then((result) => {
            if (result) {
              this.page += 1
              this.isLoadingMoreComments = false
            } else {
              console.log('Error when getting question comments')
            }
          }).catch((error) => {
            console.log(error)
          })
        }
        if (this.currentPopup.type === 'AnswerComment') {
          const answerId = this.currentPopup.data.id
          const aug_comment_count = this.currentPopup.data.aug_comment_count || 0
          const api_comment_count = this.currentPopup.data.api_comment_count || 0
          axios.get(`${this.hostname}/api/answer/${answerId}/comments?page=${page}&limit=${this.LIMIT}&aug_comment_count=${aug_comment_count}&api_comment_count=${api_comment_count}`).then((response) => {
            if (response.data.commentList) {
              const commentList = response.data.commentList.map((item) => {
                const regex1 = /https:\/\/(pic[0-9])\.zhimg\.com\/([^.]*)\.(jpg|png|gif)/g
                const sub1 = `${this.hostname}/api/image/$1/$2.$3`
                item.author.member.avatar_url = item.author.member.avatar_url.replace(regex1, sub1)
                return item
              })
              for (let item of commentList) {
                this.commentList.push(item)
              }
              for (let index=this.commentStateList.length; index<this.commentList.length; index++) {
                this.commentStateList.push({
                  moreBtns: false
                })
              }
              return true
            } else {
              return false
            }
          }).then((result) => {
            if (result) {
              this.page += 1
              this.isLoadingMoreComments = false
            } else {
              console.log('Error when getting answer comments')
            }
          }).catch((error) => {
            console.log(error)
          })
        }
      }
    }
  },
  watch: {
    currentPopup() {
      this.commentList = []
      this.commentStateList = []
      this.page = 0
      if (this.currentPopup.data.comment_count > 0) {
        this.loadMoreComments(this.page + 1)
      }
    }
  },
  mounted() {
    this.$nextTick(() => {
      if (this.currentPopup.data.comment_count > 0) {
        this.loadMoreComments(this.page + 1)
      }
      document.addEventListener('click', (event) => {
        if (event.target.tagName !== 'INPUT' && event.target.tagName !== 'BUTTON') {
          this.onLeaveCommentInputBlur()
        }
      })
    })
    // this.$nextTick(() => {
    //   document.querySelector('.comment-popup .leave-comment-input').focus()
    // })
  }
}
</script>

<style lang="scss" scoped>
@import '../../style/variables.scss';
@import '../../style/layout.scss';
.comment-popup {
  width: 800px;
  display: flex;
  flex-direction: column;
  .title-bar {
    // height: 50px;

    display: flex;
    justify-content: space-between;
    padding: 15px;
    border-bottom: 1px solid #eee;
    .comment-number {
      font-weight: 700;
      font-size: $px15;
    }
    .sorting {
      color: $gray1;
      font-size: $px14;
    }
  }
  .comment-list {
    // min-height: 400px;
    flex: 1;
    padding: 0 15px;
    border-bottom: 1px solid #eee;
    overflow-y: auto;
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
        font-size: $px14;
      }
      .author-name {
        padding-left: 30px;
        font-size: $px15;
      }
      .comment-content {
        font-size: $px15;
        margin-top: 15px;
      }
      .btns {
        margin-top: 10px;
        display: flex;
        font-size: $px14;
        a {
          color: $gray1;
        }
        a:hover {
          color: #77839c;
        }
        .more-btns {
          display: flex;
          opacity: 1;
          transition: all .2s;
          a {
            margin-left: 15px;
          }
        }
      }
      .more-btns.hidden {
        opacity: 0;
      }
    }
    .comment-item:last-child {
      border-bottom: 0;
    }
  }
  .leave-comment {
    // height: 50px;
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
      background: #f6f6f6;
      transition: all .3s;
    }
    .leave-comment-btn {
      display: block;
      position: absolute;
      top: 10px;
      right: 15px;
      color: #fff;
      height: 36px;
      border: 0;
      border-radius: 3px;
      line-height: 36px;
      padding: 0 15px;
      transform: scale3d(0, 0, 0);
      outline: none;
      z-index: 20;
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
      cursor: pointer;
      background: $blue1;
    }
    .leave-comment-btn.disabled {
      cursor: not-allowed;
      background: #9cf;
    }
  }
}
@media screen and (max-width: 900px) {
  .comment-popup {
    width: 600px;
  }
}
@media screen and (max-width: 800px) {
  .comment-popup {
    max-width: 100%;
    width: 800px;
  }
}
</style>
