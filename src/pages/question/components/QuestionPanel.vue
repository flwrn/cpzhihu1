<template lang="html">
  <div class="question-panel">
    <div class="question-panel-upper">
      <div class="center">
        <div class="info-bar">
          <div class="tags">
            <a data-value="标签的值" v-for="(item, index) of questionItem.keywords" :key="index">{{item}}</a>
          </div>
          <div class="stats">
            <div class="follower-number">
              <span class="label">关注者</span>
              <span class="figure">{{questionItem.followerCount}}</span>
            </div>
            <div class="view-number">
              <span class="label">被浏览</span>
              <span class="figure">{{questionItem.visitsCount}}</span>
            </div>
          </div>
        </div>
        <h1 class="question-title">{{questionItem.title}}</h1>
        <div class="question-content">
          <div class="brief-content" v-show="!isExpanded">
            <p v-html="questionItem.briefContent"></p>
            <!-- {{questionItem.briefContent}} -->
            <a class="expand" v-if="isOverflowed" v-show="!isExpanded" @click="expand">显示全部</a>
          </div>
          <div class="detail-content" v-show="isExpanded" v-html="questionItem.detailContent">
            <!-- {{question.content}} -->
          </div>
        </div>
      </div>

    </div>
    <div class="question-panel-lower" :class="{'fixed':isFixed}">
      <div class="center">
        <div class="btns">
          <a class="follow-question">关注问题</a>
          <a class="write-answer">
            <i class="fas fa-pencil-alt"></i>
            写回答
          </a>
          <a class="comments" @click="showComments">
            <i class="fas fa-comment"></i>
            <span v-if="questionItem.commentCount">
              {{questionItem.commentCount}} 条评论
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
          <a class="fold" v-show="isExpanded" @click="fold">收起</a>
        </div>
      </div>
    </div>
    <!-- <modal v-show="commentBox"/> -->
  </div>
</template>

<script>
import axios from 'axios'
import Modal from './Modal'
export default {
  name: 'QuestionPanel',
  // props: {
  //   question: Object
  // },
  components: {
    Modal
  },
  data: function() {
    return {
      // tagList: [
      //   {},
      //   {},
      //   {},
      //   {}
      // ],
      // question: {
      //   id: this.questionData.id,
      //   title: this.questionData.title,
      //   content: this.questionData.content,
      //   tagList: this.questionData.tagList,
      //   followers: this.questionData.followers,
      //   views: this.questionData.views,
      //   comments: this.questionData.comments,
      //   answers: this.questionData.answers
      // },
      isExpanded: false,
      isFixed: false
      // isOverflowed: false
    }
  },
  computed: {
    questionItem() {
      return this.$store.state.questionItem
    },
    isOverflowed() {
      if (this.questionItem.detailContent) {
        return true
      } else {
        return false
      }
    },
    commentBox() {
      return this.$store.state.commentBox
    },
    questionId() {
      return this.$route.params.id
    }
    // briefContent() {
    //   if (this.question.content.length > 100) {
    //     return this.question.content.slice(0, 100)+'...'
    //   } else {
    //     return this.question.content
    //   }
    // }
  },
  methods: {
    expand() {
      this.isExpanded = true
    },
    fold() {
      this.isExpanded = false
    },
    setFix() {
      const bottom = document.querySelector('.question-panel-upper').getBoundingClientRect().bottom
      const refBottom = window.innerHeight - document.querySelector('.question-panel-lower').getBoundingClientRect().height
      if (bottom > refBottom && this.isExpanded) {
        this.isFixed = true
      } else {
        this.isFixed = false
      }
    },
    showComments() {
      this.$store.commit('toggleComments', true)
    },
    checkLinkColor() {
      let anchorNodeList = document.querySelectorAll('div.question-panel div.question-content a')
      let anchorList = [...anchorNodeList]
      anchorList.map((item) => {
        item.style.color = '#369'
      })
    }
  },
  mounted() {
    document.querySelector('div.container').addEventListener('scroll', () => {
      this.setFix()
    })
    // this.loadQuestion()
  },
  updated() {
    this.setFix()
    this.checkLinkColor()
    // console.log('updated')
  }
}
</script>

<style lang="scss" scoped>
@import '../../../css/variables.scss';
a {
  display: block;
}
.question-panel {
  box-shadow: 0 1px 3px #ccc;
  padding-top: 10px;
  // padding-bottom: 20px;
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
            font-size: 14px;
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
              font-size: 14px;
              color: $gray1;
            }
            .figure {
              font-size: 18px;
              font-weight: 700;
            }
          }
          .follower-number {
            border-right: 1px solid #eee;
          }
        }
      }
      .question-title {
        font-size: 22px;
        font-weight: 700;
        max-width: 700px;
        margin-top: 10px;
      }
      .question-content {
        max-width: 700px;
        margin-top: 5px;
        font-size: 15px;
        .brief-content {
          display: block;
          .expand {
            display: inline;
            color: $gray1;
            &:hover {
              color: $darkBlue1;
            }
          }
        }
        .detail-content {

        }
      }
    }
  }
  .question-panel-lower {
    padding-bottom: 10px;
    background: #fff;
    .center {
      max-width: 1000px;
      margin: 0 auto;
      .btns {
        margin-top: 10px;
        display: flex;
        align-items: center;
        font-size: 15px;
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
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    box-shadow: 0 0 3px #ccc;
  }
}
</style>
