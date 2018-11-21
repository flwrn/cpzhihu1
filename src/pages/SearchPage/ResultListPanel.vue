<template lang="html">
  <div class="result-list-panel">
    <ul class="result-list">
      <li class="result-item item" v-for="(item, index) of resultList" :key="item.id">
        <div class="question-title-wrapper">
          <h2 class="question-title v-html">
            <a v-html="item.question.name" :href="`/question/${item.question.id}`" target="_blank"></a>
          </h2>
        </div>
        <div class="answer-excerpt-wrapper" v-if="!resultStateList[index].isExpanded" @click="onExcerptClick(index)">
          <span class="author-name">{{item.author.name}}</span>:&nbsp;
          <span class="answer-excerpt" v-html="item.excerpt"></span>...
          <a class="expand-btn" @click="onExpandBtnClick(index)">阅读全文&nbsp;<i class="fas fa-angle-down"></i></a>
        </div>
        <div class="answer-item-content-wrapper" v-else>
          <div class="answer-item-content">
            <div class="item-avatar fleft">
              <img :src="item.author.avatar_url" alt="">
            </div>
            <div class="author-info clearfix">
              <span class="author-name">{{item.author.name}}</span>
            </div>
            <!-- <div class="item-likes">
              {{item.voteup_count}} 人赞同了该回答
            </div> -->
            <div class="answer-content v-html" v-html="item.content"></div>
            <div class="edit-time" v-if="item.updated_time !== item.created_time">
              {{timeFormat(item.updated_time, 'edit')}}
            </div>
            <div class="publish-time" v-else>
              {{timeFormat(item.created_time, 'publish')}}
            </div>
          </div>
        </div>
        <div class="btns-wrapper" :class="{'fixed':resultStateList[index].btnBarFixed}">
          <div class="btns-left">
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
              <span v-if="resultStateList[index].showComments">收起评论</span>
              <span v-else-if="item.comment_count > 0">{{numberFormat(item.comment_count, 'comma')}} 条评论</span>
              <span v-else>添加评论</span>
            </a>
            <span v-show="resultStateList[index].isExpanded">
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
            </span>
          </div>
          <div class="btns-right">
            <a class="fold-btn" @click="onFoldBtnClick(index)" v-show="resultStateList[index].isExpanded">收起&nbsp;<i class="fas fa-angle-up"></i></a>
          </div>
        </div>
        <div class="comment-box-wrapper">
          <CommentBox
          v-if="resultStateList[index].showComments"
          :answer="item"
          :answer-index="index"
          :show-comments="resultStateList[index].showComments"
          />
        </div>
        <a
          class="fold-comment"
          :style="foldCommentPosition"
          :class="{'hidden':!(resultStateList[index].showComments && resultStateList[index].inScope)}"
          @click="onShowCommentsClick(index)"
        >
          收起评论&nbsp;<i class="fas fa-angle-up"></i>
        </a>
      </li>
    </ul>
  </div>
</template>

<script>
import { mapState, mapMutations, mapActions } from 'vuex'
import CommentBox from '../QuestionPage/CommentBox.vue'
import utils from '../../store/utils.js'

export default {
  components: {
    CommentBox
  },
  data() {
    return {
      foldCommentPosition: {
        left: '',
        bottom: '50px'
      },
      resultStateList: []
    }
  },
  computed: {
    // ...mapState('searchPage', {
    //   resultList: 'resultList'
    // })

    // Filter out the `article` results, only `answer` results are wanted
    resultList() {
      return this.$store.state.searchPage.resultList.filter((item) => {
        return item.type === 'answer'
      })
    }
  },
  methods: {
    ...utils,
    ...mapMutations('popup', {
      // setCurrentPopup: 'setCurrentPopup',
      // setIsPopupDisplayed: 'setIsPopupDisplayed'
      changePopupState: 'changePopupState'
    }),
    onExcerptClick(index) {
      this.resultStateList[index].isExpanded = true
      // this.checkScope()
    },
    onExpandBtnClick(index) {
      this.resultStateList[index].isExpanded = true
      // this.checkScope()
    },
    onFoldBtnClick(index) {
      this.resultStateList[index].isExpanded = false
      // this.checkScope()
    },
    onShowCommentsClick(index) {
      if (!this.resultStateList[index].btnBarFixed) {
        this.resultStateList[index].showComments = !this.resultStateList[index].showComments
        this.checkScope()
      } else {
        // this.setCurrentPopup({
        //   type: 'AnswerComment',
        //   data: this.resultList[index]
        // }),
        // this.setIsPopupDisplayed(true)
        this.changePopupState({
          currentPopup: {
            type: 'AnswerComment',
            data: this.resultList[index]
          },
          isPopupDisplayed: true
        })
      }
    },
    checkScope() {
      for (let index = 0; index < this.resultList.length; index++) {
        if (this.resultStateList[index].showComments) {
          const commentRect = document.querySelector(`.result-item:nth-child(${index+1}) > .comment-box-wrapper`).getBoundingClientRect()
          if (commentRect.top < 0 && commentRect.bottom > window.innerHeight) {
            this.resultStateList[index].inScope = true
          } else {
            this.resultStateList[index].inScope = false
          }
        } else {
          const answerRect = document.querySelector(`.result-item:nth-child(${index+1})`).getBoundingClientRect()
          if (answerRect.top < window.innerHeight / 2 && answerRect.bottom > window.innerHeight) {
            this.resultStateList[index].btnBarFixed = true
          } else {
            this.resultStateList[index].btnBarFixed = false
          }
        }
      }
    },
    setFoldCommentPosition() {
      this.foldCommentPosition.left = (document.querySelector('.result-list-panel').getBoundingClientRect().right - 76 - 20 - 15)+'px'
    },

    // If `article` results are filtered out, this title getter is not needed
    getTitle(item) {
      if (item.type === 'answer') {
        return item.question.name
      }
      if (item.type === 'article') {
        return item.title
      }
    }
  },
  watch: {
    resultList(newResultList, oldResultList) {
      if (newResultList.length === 0) {
        this.questionStateList = []
      }
      if (newResultList.length > oldResultList.length) {
        for (let index = oldResultList.length; index < newResultList.length; index++) {
          this.resultStateList.push({
            showComments: false,
            inScope: false,
            btnBarFixed: false,
            isExpanded: false
          })
        }
      }
    }
  },
  mounted() {
    this.setFoldCommentPosition()
    window.addEventListener('resize', () => {
      this.setFoldCommentPosition()
    })
    document.querySelector('div.container').addEventListener('scroll', this.checkScope)
  },
  updated() {
    this.checkScope()
  }
}
</script>

<style lang="scss" scoped>
@import '../../style/variables.scss';
@import '../../style/layout.scss';
.result-list-panel {
  background: #fff;
  box-shadow: 0 1px 3px #ccc;
  .result-list {
    padding: 20px 0;
    .result-item:first-child {
      .question-title-wrapper {
        .question-title {
          padding-top: 0;
          border-top: 0;
        }
      }
    }
    .result-item {
      .question-title-wrapper {
        padding: 0 20px;
        .question-title {
          padding-top: 10px;
          border-top: 1px solid #eee;
          font-size: $px16;
          font-weight: 700;
        }
      }
      .answer-excerpt-wrapper {
        padding: 0 20px;
        cursor: pointer;
        .author-name {
          font-size: $px15;
          font-weight: 700;
        }
        .answer-excerpt {
          font-size: $px15;
        }
        .expand-btn {
          font-size: $px15;
          color: #369;
        }
        .expand-btn:hover {
          color: #666;
        }
      }
      .answer-excerpt-wrapper:hover {
        .author-name, .answer-excerpt {
          color: #666;
        }
      }
      .answer-item-content-wrapper {
        padding: 0 20px;
        .answer-item-content {
          // padding-top: 20px;
          margin-top: 10px;
          .item-avatar {
            width: 24px;
            height: 24px;
            border-radius: 3px;
            background: #ccc;
            // margin-top: 3px;
            // padding-top: 3px;
            overflow: hidden;
            img {
              width: 100%;
            }
          }
          .author-info {
            margin-left: 30px;
            // display: flex;
            // align-items: center;
            .author-name {
              font-size: $px15;
              font-weight: 700;
            }
          }
          // .item-likes {
          //   font-size: 14px;
          //   color: $gray1;
          //   margin-top: 10px;
          // }
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
        display: flex;
        justify-content: space-between;
        background: #fff;
        .btns-left {
          display: flex;
          // margin-top: 10px;
          height: 50px;
          align-items: center;
          font-size: $px14;
          // background: #fff;
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
          }
          a:hover {
            color: #77839c;
          }
        }
        .btns-right {
          display: flex;
          justify-content: flex-end;
          height: 50px;
          align-items: center;
          font-size: $px14;
          // background: #fff;
          .fold-btn {
            color: $gray1;
          }
          .fold-btn:hover {
            color: #77839c;
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
  .result-list-panel {
    margin-top: 10px;
    .result-list {
      .result-item {
        .btns-wrapper.fixed {
          max-width: none;
        }
      }
    }
  }
}
@media screen and (max-width: 540px) {
  .result-list-panel {
    .result-list {
      .result-item {
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
