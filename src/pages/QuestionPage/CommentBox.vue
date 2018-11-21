<template lang="html">
  <div class="comment-box">
    <div class="comment-box-content-wrapper">
      <div class="title-bar">
        <span class="comment-number">
          {{numberFormat(answer.comment_count, 'comma')}} 条评论
        </span>
        <a class="sorting">
          <i class="fas fa-exchange-alt"></i>
          切换为时间顺序
        </a>
      </div>

      <ul class="comment-list">
        <li class="comment-item clearfix" v-for="(item, index) of commentList" :key="item.id" @mouseenter="onMouseEnter(index)" @mouseleave="onMouseLeave(index)">
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
      <div class="pagination" v-if="isPaginationDisplayed">
        <ul>
          <li>
            <a class="page prev-page" v-show="!isFirstPage" @click="loadCommentsPrevPage">上一页</a>
          </li>
          <li>
            <a class="page first-page" :class="{'current-page':1 === currentPage}" @click="onPageClick(1)">1</a>
          </li>
          <li>
            <a class="ellipsis ellipsis-left" v-show="isLeftEllipsisDisplayed">...</a>
          </li>
          <li v-for="(page, index) of pageListExceptBothEnds" :key="index">
            <a class="page middle-page" :class="{'current-page':page === currentPage}" @click="onPageClick(page)">{{page}}</a>
          </li>
          <li>
            <a class="ellipsis ellipsis-right" v-show="isRightEllipsisDisplayed">...</a>
          </li>
          <li>
            <a class="page last-page" :class="{'current-page':pageList[pageList.length - 1] === currentPage}" @click="onPageClick(pageList[pageList.length - 1])">{{pageList[pageList.length - 1]}}</a>
          </li>
          <li>
            <a class="page next-page" v-show="!isLastPage" @click="loadCommentsNextPage">下一页</a>
          </li>
        </ul>
      </div>
      <form class="leave-comment" :class="{'focused':isLeaveCommentInputFocused}" @submit="onSubmit">
        <input
        class="leave-comment-input"
        type="text"
        placeholder="写下你的评论..."
        @focus="onLeaveCommentInputFocus"
        v-model="leaveCommentInput"
        >
        <div class="leave-comment-btn-wrapper">
          <button class="leave-comment-btn" :class="{'disabled':isLeaveCommentBtnDisabled}" type="submit">评论</button>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import utils from '../../store/utils.js'

import { mapState, mapMutations, mapActions } from 'vuex'

export default {
  name: 'CommentBox',
  props: {
    answer: Object,
    showComments: Boolean,
    answerIndex: Number
  },
  data() {
    return {
      commentList: [],
      commentStateList: [],
      currentPage: 0,
      isLeaveCommentInputFocused: false,
      leaveCommentInput: '',
      isPaginationDisplayed: false,
      // isScrollingToCommentBoxNeeded: false,
      pageList: [],
      PAGES_TO_SHOW: 9,
      COMMENTS_PER_PAGE: 20
    }
  },
  computed: {
    ...mapState({
      hostname: 'hostname'
    }),
    ...mapState('user', {
      currentUser: 'currentUser'
    }),
    isFirstPage() {
      return this.currentPage === 1
    },
    isLastPage() {
      return this.currentPage === Math.ceil(this.answer.comment_count / this.COMMENTS_PER_PAGE)
    },
    pageCount() {
      return Math.ceil(this.answer.comment_count / this.COMMENTS_PER_PAGE)
    },
    isLeftEllipsisDisplayed() {
      const halfOfPagesToShow = (this.PAGES_TO_SHOW - 1) / 2
      return (this.pageCount > this.PAGES_TO_SHOW) && (this.currentPage > 1 + halfOfPagesToShow)
    },
    isRightEllipsisDisplayed() {
      const halfOfPagesToShow = (this.PAGES_TO_SHOW - 1) / 2
      return (this.pageCount > this.PAGES_TO_SHOW) && (this.currentPage < this.pageCount - halfOfPagesToShow)
    },
    isLeaveCommentBtnDisabled() {
      return this.leaveCommentInput === ''
    },
    pageListExceptBothEnds() {
      return this.pageList.filter((item, index, pageList) => {
        return index !== 0 && index !== pageList.length - 1
      })
    },

  },
  methods: {
    ...utils,
    ...mapMutations('popup', {
      // setCurrentPopup: 'setCurrentPopup',
      // setIsPopupDisplayed: 'setIsPopupDisplayed'
      changePopupState: 'changePopupState'
    }),
    ...mapActions('questionPage', {
      updateComment: 'updateComment'
    }),
    onMouseEnter(index) {
      this.commentStateList[index].moreBtns = true
    },
    onMouseLeave(index) {
      this.commentStateList[index].moreBtns = false
    },
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
        // this.setIsPopupDisplayed(true)
        this.changePopupState({
          currentPopup: {
            type: 'Login',
            data: null
          },
          isPopupDisplayed: true
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
        newComment.resource_type = 'answer'
        newComment.answer_id = this.answer.id
        if (this.answer.id.startsWith('a')) {
          newAnswer = {
            id: this.answer.id,
            aug_comment_count: this.answer.aug_comment_count + 1,
            comment_count: this.answer.comment_count + 1
          }
        } else {
          newAnswerStats = {
            id: this.answer.id,
            aug_comment_count: this.answer.aug_comment_count + 1
          }
        }
        newComment.author = {
          member: this.currentUser.author
        }
        newComment.vote_count = 0
        this.updateComment({ newComment, newQuestionStats, newAnswerStats, newAnswer })
      }
    },
    async onPageClick(page) {
      if (page !== this.currentPage) {
        await this.loadComments(page)

        // To do: scroll to top of the comment box when the new page of comments is loaded
        // this.isScrollingToCommentBoxNeeded = true

        // Scroll to comment box
        document.querySelector(`.item:nth-child(${this.answerIndex + 1}) .comment-box-wrapper`).scrollIntoView()
      }
    },

    // Load comments of a certain page
    async loadComments(page) {
      const answerId = this.answer.id
      const aug_comment_count = this.answer.aug_comment_count || 0
      const api_comment_count = this.answer.api_comment_count || 0

      try {
        const response = await axios.get(`${this.hostname}/api/answer/${answerId}/comments?page=${page}&limit=${this.COMMENTS_PER_PAGE}&aug_comment_count=${aug_comment_count}&api_comment_count=${api_comment_count}`)
        this.commentList = response.data.commentList.map((item) => {
          const regex1 = /https:\/\/(pic[0-9])\.zhimg\.com\/([^.]*)\.(jpg|png|gif)/g
          const sub1 = `${this.hostname}/api/image/$1/$2.$3`
          item.author.member.avatar_url = item.author.member.avatar_url.replace(regex1, sub1)
          return item
        })
        this.commentStateList = this.commentList.map(() => {
          return {
            moreBtns: false
          }
        })
        this.currentPage = page
        this.pageList = this.getPageList({ pageCount: this.pageCount, currentPage: page, pagesToShow: this.PAGES_TO_SHOW })
        this.isPaginationDisplayed = this.answer.comment_count > this.COMMENTS_PER_PAGE
      } catch (error) {
        console.log(error)
      }
    },
    async loadCommentsNextPage() {
      await this.loadComments(this.currentPage + 1)
      document.querySelector(`.item:nth-child(${this.answerIndex + 1}) .comment-box-wrapper`).scrollIntoView()
    },
    async loadCommentsPrevPage() {
      await this.loadComments(this.currentPage - 1)
      document.querySelector(`.item:nth-child(${this.answerIndex + 1}) .comment-box-wrapper`).scrollIntoView()
    }
  },
  async created() {
    if (this.answer.comment_count > 0) {
      await this.loadComments(1)
    }
  },
  mounted() {
    document.addEventListener('click', (event) => {
      if (event.target.tagName !== 'INPUT' && event.target.tagName !== 'BUTTON') {
        this.onLeaveCommentInputBlur()
      }
    })
  },
  updated() {
    // Scroll to comment box

    // if (this.isScrollingToCommentBoxNeeded) {
    //   this.isScrollingToCommentBoxNeeded = false
    //
    // }
  }
}
</script>

<style lang="scss" scoped>
@import '../../style/variables.scss';
@import '../../style/layout.scss';
.comment-box {
  margin: 10px 0;
  border-radius: 3px;
  box-shadow: 0 0px 3px #ccc;
  .title-bar {
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
        .more-btns.hidden {
          opacity: 0;
        }
      }
    }
    .comment-item:last-child {
      border-bottom: 0;
    }
  }
  .pagination {
    padding: 0 15px;
    border-bottom: 1px solid #eee;
    ul {
      padding: 10px 0;
      display: flex;
      justify-content: center;
      align-items: center;
      li {
        .page {
          margin: 0 10px;
          cursor: pointer;
          font-size: $px14;
        }
        .page:hover {
          color: #369;
        }
        .page.current-page {
          color: $gray1;
          cursor: default;
        }
        .ellipsis {
          margin: 0 10px;
          color: $gray1;
          cursor: default;
        }
      }
    }
  }
  .leave-comment {
    padding: 10px 15px;
    position: relative;
    .leave-comment-input {
      width: 100%;
      height: 36px;
      line-height: 36px;
      font-size: $px15;
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
      padding: 0px 15px;
      transform: scale3d(0, 0, 0);
      outline: none;
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
      cursor: pointer;
      background: $blue1;
    }
    .leave-comment-btn.disabled {
      cursor: not-allowed;
      background: #9cf;
    }
  }
}

@media screen and (max-width: 540px) {
  .ellipsis {
    display: none;
  }
  .middle-page {
    display: none;
  }
}
</style>
