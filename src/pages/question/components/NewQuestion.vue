<template lang="html">
  <div class="modal newQuestion" :class="{shown:newQuestion}">
    <div class="modal-background">
      <div class="modal-box">
        <form class="new-question-form" action="http://localhost:4000/new-question" method="post">
          <h2>写下你的问题</h2>
          <span class="subtitle">描述精确的问题更容易得到解答</span>
          <div class="question-title-wrapper">
            <textarea class="question-title" name="question-title" placeholder="问题标题"></textarea>
          </div>
          <div class="question-keywords-wrapper">
            <textarea class="question-keywords" name="question-keywords" placeholder="添加话题"></textarea>
          </div>
          <span class="detail-label">问题描述（可选）：</span>
          <div class="question-detail-wrapper">
            <textarea class="question-detail" name="question-detail" placeholder="问题背景、条件等详细信息"></textarea>
          </div>
          <input class="anonymous-checkbox" type="checkbox" name="isAnonymous">
          <span class="anonymous-label">匿名提问</span>
          <div class="submit-btn-wrapper">
            <input class="sumbit-btn" type="submit" value="提交问题">
          </div>
        </form>
      </div>
      <a class="close-new-question" @click="closeNewQuestion">
        <i class="fas fa-times"></i>
      </a>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {

    }
  },
  computed: {
    newQuestion() {
      return this.$store.state.newQuestion
    }
  },
  methods: {
    closeNewQuestion() {
      this.$store.commit('toggleNewQuestion', false)
    }
  }
}
</script>

<style lang="scss" scoped>
@import '../../../css/variables.scss';
@import '../../../css/layout.scss';
// Transition style
.modal {
  visibility: hidden;
  transition: visibility .3s .3s;
  .modal-background {
    opacity: 0;
    transition: opacity .3s;
    .modal-box, .close-new-question {
      transform: translateY(50px);
      transition: transform .3s;
    }
  }
}
.modal.shown {
  visibility: visible;
  transition: visibility .3s;
  .modal-background {
    opacity: 1;
    .modal-box, .close-new-question {
      transform: translateY(0);
    }
  }
}


.modal {
  .modal-background {
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    overflow: hidden;
    background: rgba(0, 0, 0, .6);
    display: flex;
    justify-content: center;
    align-items: center;
    .modal-box {
      background: #fff;
      width: 700px;
      max-height: calc(100% - 40px);
      margin: 20px 0;
      border-radius: 3px;
      overflow: auto;

      form.new-question-form {
        padding: 30px;
        h2 {
          font-size: 30px;
          text-align: center;
        }
        span.subtitle {
          color: $gray1;
          text-align: center;
          display: block;
        }
        .question-title-wrapper, .question-keywords-wrapper, .question-detail-wrapper {
          margin: 10px 0;
          border: 1px solid #ddd;
          border-radius: 3px;
          textarea {
            border: 0;
            background: none;
            width: 100%;
            height: 100%;
            display: block;
            resize: none;
            outline: none;
            padding: 10px;
            font-size: 16px;
          }
          textarea::-webkit-input-placeholder {
            color: $gray1;
          }
        }
        // textarea.question-title, textarea.keywords, textarea.question-detail {
        //   margin-top: 30px;
        //   border: 1px solid #ddd;
        //   border-radius: 3px;
        // }
        .anonymous-label {
          color: $gray1;
        }
        input.sumbit-btn {
          margin: 0 auto;
          display: block;
          width: 300px;
          height: 36px;
          background: $blue1;
          color: #fff;
          cursor: pointer;
          border: 0;
          border-radius: 3px;
          &:hover {
            background: $blue2;
          }
        }
      }
    }
    .close-new-question {
      position: absolute;
      color: #fff;
      font-size: 20px;
      // margin-left: 700px;
      top: calc((100% - 500px) / 2 + 10px);
      // right: 1000px;
      right: calc((100% - 700px) / 2 - 30px);
      // right: calc((100% - 700px) / 2);
      // margin-left: 370px;
    }
  }
}
</style>
