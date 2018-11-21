<template lang="html">
  <div class="answer-list-panel">
    <div class="top-bar-wrapper">
      <div class="top-bar">
        <span class="answer-number">{{numberFormat(currentQuestion.answer_count, 'comma')}} 个回答</span>
        <a class="sorting">
          默认排序&nbsp;
          <i class="fas fa-sort"></i>
        </a>
      </div>
    </div>
    <ul class="answer-list">
      <li class="answer-item item clearfix" v-for="(item, index) of answerList" :key="item.id">
        <div class="answer-item-content-wrapper">
          <div class="answer-item-content">
            <div class="item-avatar fleft">
              <img :src="item.author.avatar_url" alt="">
            </div>
            <div class="author-info clearfix">
              <span class="author-name">{{item.author.name}}</span>
            </div>
            <div class="item-likes">
              {{numberFormat(item.voteup_count, 'comma')}} 人赞同了该回答
            </div>
            <div class="answer-content v-html" v-html="item.content"></div>
            <div class="edit-time" v-if="item.updated_time !== item.created_time">
              {{timeFormat(item.updated_time, 'edit')}}
            </div>
            <div class="publish-time" v-else>
              {{timeFormat(item.created_time, 'publish')}}
            </div>
          </div>
        </div>
        <div class="btns-wrapper" :class="{'fixed':answerStateList[index].btnBarFixed}">
          <div class="btns">
            <a class="up-btn">
              <i class="fas fa-caret-up"></i>&nbsp;
              <span>赞同</span>
              <span v-if="item.voteup_count > 0">&nbsp;{{numberFormat(item.voteup_count, 'k')}}</span>
            </a>
            <a class="down-btn">
              <i class="fas fa-caret-down"></i>
            </a>
            <a class="comments-btn" @click="onShowCommentsClick(index)">
              <i class="fas fa-comment"></i>&nbsp;
              <span v-if="answerStateList[index].showComments">收起评论</span>
              <span v-else-if="item.comment_count > 0">{{numberFormat(item.comment_count, 'comma')}} 条评论</span>
              <span v-else>添加评论</span>
            </a>
            <a class="share-btn">
              <i class="fas fa-paper-plane"></i>&nbsp;
              分享
            </a>
            <a class="fav-btn">
              <i class="fas fa-star"></i>&nbsp;
              收藏
            </a>
            <a class="thank-btn">
              <i class="fas fa-heart"></i>&nbsp;
              感谢
            </a>
          </div>
        </div>
        <div class="comment-box-wrapper">
          <CommentBox
          v-if="answerStateList[index].showComments"
          :answer="item"
          :answer-index="index"
          :show-comments="answerStateList[index].showComments"
          />
        </div>
        <a
          class="fold-comment"
          :style="foldCommentPosition"
          :class="{'hidden':!(answerStateList[index].showComments && answerStateList[index].inScope)}"
          @click="onShowCommentsClick(index)"
        >
          收起评论&nbsp;<i class="fas fa-angle-up"></i>
        </a>
      </li>
    </ul>
  </div>
</template>

<script>
import CommentBox from './CommentBox.vue'
import utils from '../../store/utils.js'

import { mapState, mapGetters, mapMutations, mapActions } from 'vuex'

export default {
  name: 'AnswerListPanel',
  components: {
    CommentBox
  },
  data() {
    return {
      foldCommentPosition: {
        left: '',
        bottom: '50px'
      },
      answerStateList: []
    }
  },
  computed: {
    ...mapState('questionPage', {
      currentQuestion: 'currentQuestion',
      page: 'currentAnswerListPage',
      answerList: 'answerList',
      isLoadingMoreAnswer: 'isLoadingMoreAnswer'
    }),
    ...mapGetters('questionPage', {
      isLastPage: 'isAnswerListLastPage'
    })
  },
  methods: {
    ...utils,
    /*
      Method 1 of loading answers:

      Get the `aug_answer_count` and `api_answer_count` of the current question and pass them to server. The server will work out how many answers to get from each database and then get exact number of answers.
    */
    ...mapMutations('popup', {
      // setCurrentPopup: 'setCurrentPopup',
      // setIsPopupDisplayed: 'setIsPopupDisplayed'
      changePopupState: 'changePopupState'
    }),
    ...mapActions('questionPage', {
      loadMoreAnswers: 'loadMoreAnswers'
    }),

    onShowCommentsClick(index) {
      if (!this.answerStateList[index].btnBarFixed) {
        this.answerStateList[index].showComments = !this.answerStateList[index].showComments
      } else {
        // this.setCurrentPopup({
        //   type: 'AnswerComment',
        //   data: this.answerList[index]
        // }),
        // this.setIsPopupDisplayed(true)
        this.changePopupState({
          currentPopup: {
            type: 'AnswerComment',
            data: this.answerList[index]
          },
          isPopupDisplayed: true
        })
      }
    },
    checkScope() {
      for (let index = 0; index < this.answerList.length; index++) {
        if (this.answerStateList[index].showComments) {
          const commentRect = document.querySelector(`.answer-item:nth-child(${index+1}) > .comment-box-wrapper`).getBoundingClientRect()
          if (commentRect.top < 0 && commentRect.bottom > window.innerHeight) {
            this.answerStateList[index].inScope = true
          } else {
            this.answerStateList[index].inScope = false
          }
        } else {
          const answerRect = document.querySelector(`.answer-item:nth-child(${index+1})`).getBoundingClientRect()
          if (answerRect.top < window.innerHeight / 2 && answerRect.bottom > window.innerHeight) {
            this.answerStateList[index].btnBarFixed = true
          } else {
            this.answerStateList[index].btnBarFixed = false
          }
        }
      }
    },

    setFoldCommentPosition() {
      this.foldCommentPosition.right = (window.innerWidth - document.querySelector('.answer-list-panel').getBoundingClientRect().right + 20)+'px'
    },
  },
  watch: {
    answerList(newAnswerList, oldAnswerList) {
      if (newAnswerList.length === 0) {
        this.answerStateList = []
      }
      if (newAnswerList.length > oldAnswerList.length) {
        for (let index = oldAnswerList.length; index < newAnswerList.length; index++) {
          this.answerStateList.push({
            showComments: false,
            inScope: false,
            btnBarFixed: false
          })
        }
      }
    }
  },
  mounted() {
    // this.setFoldCommentPosition()
    window.addEventListener('resize', () => {
      this.setFoldCommentPosition()
    })
    document.querySelector('div.container').addEventListener('scroll', this.checkScope)
    document.querySelector('div.container').addEventListener('scroll', () => {
      if (document.querySelector('div.answer-list-panel').getBoundingClientRect().bottom < window.innerHeight + 500 && !this.isLoadingMoreAnswer && !this.isLastPage) {
        this.loadMoreAnswers(this.page + 1)
      }
    })
  },
  updated() {
    this.checkScope()
    this.setFoldCommentPosition()
  }
}
</script>

<style lang="scss" scoped>
@import '../../style/variables.scss';
@import '../../style/layout.scss';
a {
  display: block;
}
.answer-list-panel {
  background: #fff;
  // padding: 0 20px 0 20px;
  box-shadow: 0 1px 3px #ccc;
  .top-bar-wrapper {
    padding: 0 20px;
    // border-bottom: 1px solid #eee;
    .top-bar {
      font-size: $px15;
      display: flex;
      justify-content: space-between;
      padding: 15px 0;
      .answer-number {
        font-weight: 700;
      }
      .sorting {
        color: $gray1;
      }
    }
  }
  .answer-list {
    .answer-item {
      // padding: 20px 0;
      // padding-top: 20px;
      .answer-item-content-wrapper {
        padding: 0 20px;
        .answer-item-content {
          border-top: 1px solid #eee;
          padding-top: 10px;
          .item-avatar {
            width: 38px;
            height: 38px;
            border-radius: 3px;
            background: #ccc;
            margin-top: 3px;
            overflow: hidden;
            img {
              width: 100%;
            }
          }
          .author-info {
            margin-left: 50px;
            .author-name {
              font-size: $px15;
              font-weight: 700;
            }
            .author-badge {
              display: inline-block;
              font-size: $px14;
            }
            .author-bio {
              display: inline-block;
              margin-left: 3px;
              font-size: $px14;
            }
          }
          .item-likes {
            font-size: $px14;
            color: $gray1;
            margin-top: 10px;
          }
          .answer-content {
            font-size: $px15;
            margin-top: 10px;
            figure {
              display: flex;
              justify-content: center;
              img {
                max-width: 600px;
              }
            }
          }
          .edit-time, .publish-time {
            font-size: $px14;
            color: $gray1;
            margin-top: 10px;
          }
        }
      }
      .btns-wrapper {
        padding: 0 20px;
        background: #fff;
        .btns {
          display: flex;
          // margin-top: 10px;
          height: 50px;
          align-items: center;
          font-size: $px14;
          background: #fff;
          .up-btn, .down-btn {
            background: $lightBlue1;
            padding: 5px 10px;
            color: $blue1;
            border-radius: 3px;
            &:hover {
              color: $blue1;
              background: $lightBlue2;
            }
          }
          .up-btn {
            margin: 0;
          }
          .down-btn {
            margin-left: 5px;
          }
          a {
            color: $gray1;
            margin-left: 20px;
            &:hover {
              color: #77839c;
            }
          }
        }
      }
      .btns-wrapper.fixed {
        position: sticky;
        bottom: 0;
        width: 100%;
        max-width: 700px;
        min-width: 300px;
        box-shadow: 0 0 3px #ccc;
      }
      .comment-box-wrapper {
        // margin-top: 10px;
        padding: 0 20px;
      }
      .fold-comment {
        position: fixed;
        display: inline-block;
        background: #eee;
        padding: 5px 10px;
        border-radius: 5px;
        color: $gray1;
        font-size: $px14;
        opacity: 1;
        transition: opacity .2s, visibility .2s;
      }
      .fold-comment.hidden {
        transition: opacity .2s, visibility .2s .2s;
        opacity: 0;
        visibility: hidden;
      }
    }
  }
}

@media screen and (max-width: 1024px) {
  .answer-list-panel {
    margin-top: 10px;
    .answer-list {
      .answer-item {
        .btns-wrapper.fixed {
          max-width: none;
        }
      }
    }
  }
}
@media screen and (max-width: 540px) {
  .answer-list-panel {
    .answer-list {
      .answer-item {
        .btns-wrapper {
          .share-btn {
            display: none;
          }
          .fav-btn {
            display: none;
          }
          .thank-btn {
            display: none;
          }
        }
      }
    }
  }
}
</style>
