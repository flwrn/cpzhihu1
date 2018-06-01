<template lang="html">
  <div class="answer-list-panel">
    <div class="top-bar">
      <span class="answer-number">{{answerList.length}} 个回答</span>
      <a class="sorting">
        默认排序&nbsp;
        <i class="fas fa-sort"></i>
      </a>
    </div>
    <ul class="answer-list">
      <li class="answer-item clearfix" v-for="(item, index) of answerList" :key="item.id">
        <div class="item-avatar fleft">
          <img src="" alt="">
        </div>
        <div class="author-info clearfix">
          <a class="author-name">{{item.author.name}}</a>
          <!-- <a class="author-badge">{{item.answer.badge}}</a> -->
          <!-- <a class="author-bio">{{item.answer.bio}}</a> -->
        </div>
        <div class="item-likes">
          {{item.upvoteCount}} 人赞同了该回答
        </div>
        <div class="answer-content" v-html="item.content">
          <!-- {{item.answer.content}} -->
        </div>
        <div class="edit-time" v-if="item.dateModified">
          {{timeSince(item.dateModified, 'edit')}}
        </div>
        <div class="publish-time" v-else>
          {{timeSince(item.dateCreated, 'publish')}}
        </div>
        <div class="btns">
          <a class="up-btn">
            <i class="fas fa-caret-up"></i>
            {{item.upvoteCount}}
          </a>
          <a class="down-btn">
            <i class="fas fa-caret-down"></i>
          </a>
          <a class="comments-btn" @click="showComments(index)">
            <i class="fas fa-comment"></i>&nbsp;
            <span v-if="$store.state.answerStateList[index].showComments">收起评论</span>
            <span v-else-if="item.commentCount">{{item.commentCount}} 条评论</span>
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
        <comment-box
          v-show="$store.state.answerStateList[index].showComments"
          :answer-id="item.id"
          :answer-index="index"
          :show-comments="$store.state.answerStateList[index].showComments"
        />
        <a
          class="fold-comment"
          :style="foldCommentPosition"
          :class="{'hidden':!($store.state.answerStateList[index].showComments && $store.state.answerStateList[index].inScope)}"
          @click="showComments(index)"
        >
          收起评论
        </a>
      </li>
    </ul>
  </div>
</template>

<script>
import axios from 'axios'
import CommentBox from './CommentBox'
export default {
  name: 'AnswerListPanel',
  components: {
    CommentBox
  },
  props: {
    // answerList: Array
    // questionId: String
  },
  data: function() {
    return {
      // answerList: [
      //   {showComments: false, inScope: false},
      //   {showComments: false, inScope: false},
      //   {showComments: false, inScope: false},
      //   {showComments: false, inScope: false},
      //   {showComments: false, inScope: false}
      // ],
      // answerList: this.answerListData,
      foldCommentPosition: {
        left: '',
        bottom: '10px'
      },
      page: 1
    }
  },
  computed: {
    questionId() {
      return this.$route.params.id
    },
    answerList() {
      let list = this.$store.state.answerList
      list = list.map((item) => {
        // item.showComments = false
        // item.inScope = false
        item.content.replace(/<img [^<>]*>/g, '<img>')
        return item
      })
      return list
    }
  },
  methods: {
    showComments(index) {
      // item.showComments = !item.showComments
      this.$store.commit('toggleShowComments', {index})
      this.checkScope()
    },
    checkScope() {
      this.answerList.map((item, index) => {
        if (this.$store.state.answerStateList[index].showComments) {
          const rect = document.querySelector(`.answer-item:nth-child(${index+1}) > .comment-box`).getBoundingClientRect()
          if (rect.top < 0 && rect.bottom > window.innerHeight) {
            // this.$store.state.answerStateList[index].inScope = true
            this.$store.commit('toggleInScope', {index, value: true})
          } else {
            // this.$store.state.answerStateList[index].inScope = false
            this.$store.commit('toggleInScope', {index, value: false})
          }
          // console.log('checkScope')
        }
      })
    },
    // loadMoreAnswers(nextPage) {
    //   if (this.$store.state.answerList.length < this.$store.state.questionItem.answerIdList.length) {
    //     console.log('still more answers')
    //     axios.get(`http://localhost:4000/api/question/${this.questionId}/answers?page=${nextPage}`).then((res) => {
    //       // console.log(`res.data`, res.data)
    //       this.$store.commit('updateAnswer', res.data)
    //       this.page = nextPage
    //     })
    //   }
    // },
    timeSince(time, type) {
      let date = new Date(time)
      let yyyy = date.getFullYear().toString()
      let mm = (date.getMonth()+1).toString()
      mm = mm.length === 1 ? '0'+mm : mm
      let dd = date.getDate().toString()
      dd = dd.length === 1 ? '0'+dd : dd
      // return `发布于 ${time.slice(0, 4)}-${time.slice(4, 6)}-${time.slice(6, 8)}`
      if (type === 'publish') {
        return `发布于 ${yyyy}-${mm}-${dd}`
      }
      if (type === 'edit') {
        return `编辑于 ${yyyy}-${mm}-${dd}`
      }
    },
    checkImgWidth() {
      let figureNodeList = document.querySelectorAll('div.answer-list-panel div.answer-content figure')
      let figureList = [...figureNodeList]
      figureList.map((item) => {
        item.style.display = 'flex'
        item.style.justifyContent = 'center'
      })
      let imgNodeList = document.querySelectorAll('div.answer-list-panel div.answer-content img')
      let imgList = [...imgNodeList]
      imgList.map((item) => {
        let originWidth = item.getBoundingClientRect().width
        let originHeight = item.getBoundingClientRect().height
        let ratio = originWidth / originHeight
        item.style.maxWidth = '600px'
        item.style.height = `${item.getBoundingClientRect().width / ratio}px`
      })
    },
    checkLinkColor() {
      let anchorNodeList = document.querySelectorAll('div.answer-list-panel div.answer-content a')
      let anchorList = [...anchorNodeList]
      anchorList.map((item) => {
        item.style.color = '#369'
      })
    }
  },
  mounted() {
    // console.log('before  loadAnswers')
    // this.loadAnswers()
    this.foldCommentPosition.left = (document.querySelector('.answer-list-panel').getBoundingClientRect().right - 76 - 20 - 15)+'px'
    document.querySelector('div.container').addEventListener('scroll', this.checkScope)
    document.querySelector('div.container').addEventListener('scroll', () => {
      if (document.querySelector('div.answer-list-panel').getBoundingClientRect().bottom < window.innerHeight + 500) {
        // this.loadMoreAnswers(this.page + 1)
      }
    })
  },
  updated() {
    // console.log('update')
    this.checkImgWidth()
    this.checkLinkColor()
  }
}
</script>

<style lang="scss" scoped>
@import '../../../css/variables.scss';
@import '../../../css/layout.scss';
a {
  display: block;
}
.answer-list-panel {
  background: #fff;
  padding: 0 20px 0 20px;
  box-shadow: 0 1px 3px #ccc;
  .top-bar {
    font-size: 15px;
    display: flex;
    justify-content: space-between;
    padding: 15px 0;
    border-bottom: 1px solid #eee;
    .answer-number {
      font-weight: 700;
    }
    .sorting {
      color: $gray1;
    }
  }
  .answer-list {
    // position: relative;
    .answer-item {
      padding: 20px 0;
      border-bottom: 1px solid #eee;
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
          font-size: 15px;
          font-weight: 700;
        }
        .author-badge {
          display: inline-block;
          font-size: 14px;
        }
        .author-bio {
          display: inline-block;
          margin-left: 3px;
          font-size: 14px;
        }
      }
      .item-likes {
        font-size: 14px;
        color: $gray1;
        margin-top: 10px;
        // margin-left: 50px;
      }
      .answer-content {
        font-size: 15px;
        margin-top: 10px;
      }
      .edit-time {
        font-size: 14px;
        color: $gray1;
        margin-top: 10px;
      }
      .btns {
        display: flex;
        margin-top: 10px;
        align-items: center;
        font-size: 14px;
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
    .answer-item:last-child {
      border-bottom: 0;
    }
    .fold-comment {
      position: fixed;
      display: inline-block;
      background: #eee;
      padding: 5px 10px;
      border-radius: 5px;
      color: $gray1;
      font-size: 14px;
      opacity: 1;
      transition: all .2s;
    }
    .fold-comment.hidden {
      opacity: 0;
      visibility: hidden;
    }
  }
}
</style>
