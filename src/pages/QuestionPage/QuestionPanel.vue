<template lang="html">
  <div class="question-panel">
    <div class="question-panel-upper">
      <div class="center">
        <div class="info-bar">
          <div class="tags">
            <a data-value="标签的值" v-for="item of currentQuestion.topics" :key="item.id" :href="`/search?q=${item.name}`" target="_blank">{{item.name}}</a>
          </div>
          <div class="stats">
            <div class="follower-number">
              <span class="label">关注者</span>
              <span class="figure">{{numberFormat(currentQuestion.follower_count, 'comma')}}</span>
            </div>
            <div class="view-number">
              <span class="label">被浏览</span>
              <span class="figure">{{numberFormat(currentQuestion.visit_count, 'comma')}}</span>
            </div>
          </div>
        </div>
        <h1 class="question-title">{{currentQuestion.title}}</h1>
        <div class="question-content">
          <div class="brief-content-wrapper" v-if="isExcerptAvailable" v-show="!isDetailDisplayed">
            <span class="brief-content v-html" v-html="currentQuestion.excerpt"></span>&nbsp;
            <a class="expand" v-if="isDetailAvailable" v-show="!isDetailDisplayed" @click="onDisplayDetailClick">显示全部&nbsp;<i class="fas fa-angle-down"></i></a>
          </div>
          <div class="detail-content-wrapper" v-if="isDetailAvailable" v-show="isDetailDisplayed">
            <div class="detail-content v-html" v-html="currentQuestion.detail"></div>
          </div>
        </div>
      </div>

    </div>
    <div class="question-panel-lower" :class="{'fixed':isLowerPanelFixed}">
      <div class="center">
        <div class="btns">
          <a class="follow-question">关注问题</a>
          <a class="write-answer" @click="onWriteAnswerClick">
            <i class="fas fa-pencil-alt"></i>
            写回答
          </a>
          <a class="comments" @click="onShowCommentsClick">
            <i class="fas fa-comment"></i>
            <span v-if="currentQuestion.comment_count > 0">
              {{currentQuestion.comment_count}} 条评论
            </span>
            <span v-else>添加评论</span>
          </a>
          <a class="share">
            <i class="fas fa-paper-plane"></i>
            分享
          </a>
          <a class="invite">
            <i class="fas fa-star"></i>
            邀请回答
          </a>
          <a class="other">
            <i class="fas fa-ellipsis-h"></i>
          </a>
          <a class="fold" v-show="isDetailDisplayed" @click="onFoldDetailClick">收起&nbsp;<i class="fas fa-angle-up"></i></a>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapMutations } from 'vuex'
import utils from  '../../store/utils.js'

export default {
  name: 'QuestionPanel',
  data: function() {
    return {
      isDetailDisplayed: false,
      isLowerPanelFixed: false
    }
  },
  computed: {
    ...mapState('questionPage', {
      currentQuestion: 'currentQuestion'
    }),
    ...mapState('user', {
      currentUser: 'currentUser'
    }),
    isExcerptAvailable() {
      return this.currentQuestion.excerpt !== ''
    },
    isDetailAvailable() {
      return this.currentQuestion.detail !== '' && this.currentQuestion.detail !== this.currentQuestion.excerpt
    }
  },
  methods: {
    ...utils,
    ...mapMutations('questionPage', {
      // setIsAnswerBoxDisplayed: 'setIsAnswerBoxDisplayed'
      changeAnswerBoxState: 'changeAnswerBoxState'
    }),
    ...mapMutations('popup', {
      // setCurrentPopup: 'setCurrentPopup',
      // setIsPopupDisplayed: 'setIsPopupDisplayed'
      changePopupState: 'changePopupState'
    }),
    onDisplayDetailClick() {
      this.isDetailDisplayed = true
    },
    onFoldDetailClick() {
      this.isDetailDisplayed = false
    },
    onScroll() {
      this.checkLowerPanelFix()
    },
    checkLowerPanelFix() {
      const bottom = document.querySelector('.question-panel-upper').getBoundingClientRect().bottom
      const height = window.innerHeight
      if (this.isDetailDisplayed && height - bottom < 52) {
        if (!this.isLowerPanelFixed) {
          this.isLowerPanelFixed = true
        }
      } else {
        if (this.isLowerPanelFixed) {
          this.isLowerPanelFixed = false
        }
      }
    },

    // Set up new answer
    onWriteAnswerClick() {
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
        // this.setIsAnswerBoxDisplayed(true)
        this.changeAnswerBoxState(true)
      }
      this.$nextTick(() => {
        document.querySelector('.answer-box .new-answer-input').focus()
      })
    },
    onShowCommentsClick() {
      // this.setCurrentPopup({
      //   type: 'QuestionComment',
      //   data: this.currentQuestion
      // })
      // this.setIsPopupDisplayed(true)
      this.changePopupState({
        currentPopup: {
          type: 'QuestionComment',
          data: this.currentQuestion
        },
        isPopupDisplayed: true
      })
    }
  },
  mounted() {
    document.querySelector('div.container').addEventListener('scroll', this.onScroll);
  },
  updated() {
    this.checkLowerPanelFix()
  }
}
</script>

<style lang="scss" scoped>
@import '../../style/variables.scss';
a {
  display: block;
}
.question-panel {
  box-shadow: 0 1px 3px #ccc;
  padding-top: 10px;
  background: #fff;
  .question-panel-upper {
    .center {
      max-width: 1000px;
      margin: 0 auto;
      .info-bar {
        display: flex;
        justify-content: space-between;
        .tags {
          display: flex;
          align-items: center;
          a {
            background: $lightBlue2;
            padding: 0 10px;
            margin-left: 5px;
            border-radius: 20px;
            height: 32px;
            line-height: 32px;
            font-size: $px14;
            color: $blue1;
            &:hover {
              background: $lightBlue3;
            }
          }
        }
        .stats {
          display: flex;
          margin-right: 50px;
          .follower-number, .view-number {
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            padding: 0 20px;
            .label {
              font-size: $px14;
              color: $gray1;
            }
            .figure {
              font-size: $px18;
              font-weight: 700;
            }
          }
          .follower-number {
            border-right: 1px solid #eee;
          }
        }
      }
      .question-title {
        font-size: $px22;
        font-weight: 700;
        max-width: 700px;
        margin-top: 10px;
      }
      .question-content {
        max-width: 700px;
        margin-top: 5px;
        font-size: $px15;
        .brief-content-wrapper {
          display: block;
          .brief-content {
            display: inline;
          }
          .expand {
            display: inline;
            color: $gray1;
            &:hover {
              color: $darkBlue1;
            }
          }
        }
      }
    }
  }
  .question-panel-lower {
    padding: 10px 0;
    background: #fff;
    .center {
      max-width: 1000px;
      margin: 0 auto;
      .btns {
        // margin-top: 10px;
        display: flex;
        align-items: center;
        font-size: $px14;
        background: #fff;
        .follow-question {
          color: #fff;
          background: $blue1;
          border: 1px solid $blue1;
          border-radius: 3px;
          height: 32px;
          line-height: 32px;
          padding: 0 15px;
          margin: 0;
          &:hover {
            color: #fff;
            background: $blue2;
          }
        }
        .write-answer {
          color: $blue1;
          background: #fff;
          border: 1px solid $blue1;
          border-radius: 3px;
          height: 32px;
          line-height: 32px;
          padding: 0 15px;
          &:hover {
            color: $blue1;
            background: $lightBlue1;
          }
        }
        a {
          margin-left: 20px;
          color: $gray1;
          &:hover {
            color: #77839c;
          }
        }
      }
    }
  }
  .question-panel-lower.fixed {
    position: sticky;
    bottom: 0;
    left: 0;
    right: 0;
    box-shadow: 0 0 3px #ccc;
  }
}

.question-panel {
  transition: all .2s;
}

@media screen and (max-width: 1024px) {
  .question-panel {
    .question-panel-upper {
      padding-left: 10px;
      padding-right: 10px;
      .center {
        .info-bar {
          .stats {
            margin-right: 0;
          }
        }
      }
    }
    .question-panel-lower {
      padding-left: 10px;
      padding-right: 10px;
    }
  }
}
@media screen and (max-width: 768px) {
  .question-panel {
    .question-panel-upper {
      .center {
        .info-bar {
          .stats {
            display: none;
          }
        }
      }
    }
  }
}
@media screen and (max-width: 600px) {
  .question-panel {
    .question-panel-lower {
      .center {
        .share {
          display: none;
        }
        .invite {
          display: none;
        }
        .other {
          display: none;
        }
      }
    }
  }
}
@media screen and (max-width: 540px) {
  .question-panel {
    .question-panel-upper {
      .center {
        .info-bar {
          .tags {
            display: none;
          }
        }
        .question-title {
          font-size: $px18;
        }
        .question-content {
          font-size: $px14;
        }
      }
    }
  }
}
@media screen and (max-width: 400px) {
  .question-panel {
    .question-panel-lower {
      .center {
        .btns {
          .follow-question {
            display: none;
          }
          .write-answer {
            display: none;
          }
        }
      }
    }
  }
}
</style>
