<template lang="html">
  <div class="answer-box">
    <form class="new-answer-form" @submit="onSubmit">
      <h2 class="new-answer-title">发布新回答</h2>
      <div class="new-answer-input-wrapper">
        <textarea class="new-answer-input" :class="{'isFocused':isNewAnswerInputFocused}" v-model="newAnswerInput"></textarea>
      </div>
      <div class="btn-bar">
        <button class="cancel-btn" type="button" @click="onCancelBtnClick">取消</button>
        <button class="submit-btn" :class="{'disabled':isSubmitBtnDisabled}" type="submit">发布</button>
      </div>
    </form>
  </div>
</template>

<script>
import { mapState, mapMutations, mapActions } from 'vuex'

export default {
  data() {
    return {
      isNewAnswerInputFocused: false,
      newAnswerInput: ''
    }
  },
  computed: {
    ...mapState('user', {
      currentUser: 'currentUser'
    }),
    ...mapState('questionPage', {
      currentQuestion: 'currentQuestion'
    }),
    isSubmitBtnDisabled() {
      return this.newAnswerInput === ''
    }
  },
  methods: {
    ...mapMutations('questionPage', {
      // setIsAnswerBoxDisplayed: 'setIsAnswerBoxDisplayed'
      changeAnswerBoxState: 'changeAnswerBoxState'
    }),
    ...mapActions('questionPage', {
      updateAnswer: 'updateAnswer'
    }),
    onSubmit(event) {
      event.preventDefault()
      const newAnswer = {}
      let newQuestionStats = null
      const createdTime = Math.floor(Date.now() / 1000)
      newAnswer.type = 'answer'
      newAnswer.id = `a${createdTime}`
      newAnswer.question_id = this.currentQuestion.id
      newAnswer.question = {
        type: 'question',
        id: this.currentQuestion.id,
        title: this.currentQuestion.title,
        created: this.currentQuestion.created,
        updated_time: this.currentQuestion.updated_time
      }
      newAnswer.author = this.currentUser.author
      newAnswer.created_time = createdTime
      newAnswer.updated_time = createdTime
      newAnswer.voteup_count = 0
      newAnswer.comment_count = 0
      newAnswer.aug_comment_count = 0
      newAnswer.api_comment_count = 0
      newAnswer.content = this.newAnswerInput
      newAnswer.excerpt = (this.newAnswerInput.length > 140 ? this.newAnswerInput.slice(0, 140) : this.newAnswerInput)

      // Need to consider the case where answer belongs to augmented question

      newQuestionStats = {
        id: this.currentQuestion.id,
        aug_answer_count: this.currentQuestion.aug_answer_count + 1,
        aug_comment_count: this.currentQuestion.aug_comment_count
      }
      this.updateAnswer({ newAnswer, newQuestionStats })
    },
    onCancelBtnClick() {
      // this.setIsAnswerBoxDisplayed(false)
      this.changeAnswerBoxState(false)
    }
  }
}
</script>

<style lang="scss" scoped>
@import '../../style/variables.scss';
@import '../../style/layout.scss';
.answer-box {
  background: #fff;
  box-shadow: 0 1px 3px #ccc;
  padding: 20px;
  margin-bottom: 10px;
  .new-answer-form {
    .new-answer-title {
      font-size: $px15;
      font-weight: 700;
    }
    .new-answer-input-wrapper {
      margin-top: 10px;
      // width: 100%;
      // height: 100px;
      // padding: 10px;
      // border: 1px solid #ccc;
      .new-answer-input {
        width: 100%;
        height: 100px;
        resize: none;
        border: 1px solid #ccc;
        outline: none;
        padding: 10px;
        font-size: $px15;
      }
    }
    .btn-bar {
      margin-top: 10px;
      display: flex;
      justify-content: flex-end;
      .cancel-btn {
        background: #fff;
        color: $blue1;
        border: 1px solid $blue1;
        border-radius: 3px;
        padding: 5px 20px;
        cursor: pointer;
        outline: none;
      }
      .cancel-btn:hover {
        background: $lightBlue1;
      }
      .submit-btn {
        margin-left: 10px;
        background: $blue1;
        color: #fff;
        border: 0;
        border-radius: 3px;
        padding: 5px 20px;
        cursor: pointer;
        outline: none;
        transition: background .2s;
      }
      .submit-btn:hover {
        background: $blue2;
      }
      .submit-btn.disabled {
        background: #9cf;
        cursor: not-allowed;
      }
    }
  }
}
</style>
