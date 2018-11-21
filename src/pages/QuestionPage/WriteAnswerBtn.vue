<template lang="html">
  <div class="write-answer-btn">
  <a @click="onWriteAnswerBtnClick">
    <i class="fas fa-pencil-alt"></i>
    写回答
  </a>
</div>
</template>

<script>
import { mapState, mapMutations } from 'vuex'

export default {
  name: 'WriteAnswerBtn',
  computed: {
    ...mapState('user', {
      currentUser: 'currentUser'
    })
  },
  methods: {
    ...mapMutations('questionPage', {
      // setIsAnswerBoxDisplayed: 'setIsAnswerBoxDisplayed'
      changeAnswerBoxState: 'changeAnswerBoxState'
    }),
    ...mapMutations('popup', {
      // setCurrentPopup: 'setCurrentPopup',
      // setIsPopupDisplayed: 'setIsPopupDisplayed'
      changePopupState: 'changePopupState'
    }),
    onWriteAnswerBtnClick() {
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
        const position = document.querySelector('.question-panel .question-panel-lower').getBoundingClientRect().bottom
        document.querySelector('.container').scrollTo(0, position)
        this.$nextTick(() => {
          document.querySelector('.answer-box .new-answer-input').focus()
        })
      }
    }
  }
}
</script>

<style lang="scss" scoped>
@import '../../style/variables.scss';
.write-answer-btn {
  box-shadow: 0 1px 3px #ccc;
  margin-top: 10px;
  a {
    display: block;
    height: 50px;
    line-height: 50px;
    color: $blue1;
    text-align: center;
    background: #fff;
    font-size: $px15;
    &:hover {
      background: $lightBlue1;
    }
  }
}
</style>
