<template lang="html">
  <div class="write-answer-btn">
    <a>
      <i class="fas fa-pencil-alt"></i>
      写回答
    </a>
  </div>
</template>

<script>
export default {
  name: 'WriteAnswerBtn'
}
</script>

<style lang="scss" scoped>
@import '../../../css/variables.scss';
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
    &:hover {
      background: $lightBlue1;
    }
  }
}
</style>
