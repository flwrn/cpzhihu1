<template lang="html">
  <div class="hot-topics">
    <div class="header clearfix">
      <h4 class="f-l">热门话题</h4>
    </div>
    <div class="topic-list">
      <ul>
        <li class="clearfix" v-for="topic in vHotTopicList.hotTopics">
          <a class="avatar f-l"></a>
          <a class="name">{{topic.topicName}}</a>
          <p class="info">{{topic.followerNumber}}个人关注</p>
          <a class="question">{{topic.question}}</a>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  props: ['vHotTopicList'],
  data() {
    return {
      hotTopics: this.vHotTopicList.hotTopics
      // hotTopics: [
      //   {
      //     topicName: '话题名字',
      //     followerNumber: 666,
      //     question: '相关的问题'
      //   },
      //   {
      //     topicName: '话题名字',
      //     followerNumber: 666,
      //     question: '相关的问题'
      //   },
      //   {
      //     topicName: '话题名字',
      //     followerNumber: 666,
      //     question: '相关的问题'
      //   }
      // ]
    }
  }
}
</script>

<style lang="scss" scoped>
  .hot-topics {
    margin: 10px;
    // width: 100%;
    // box-sizing: border-box;
    border-bottom: 1px solid #ccc;
    .header {
      a {
        color: #999;
      }
    }
    .topic-list {
      li {
        border-bottom: 1px solid #ccc;
        margin: 10px 0;
        padding: 10px 0;
        &:last-of-type {
          border-bottom: 0;
        }
        .avatar {
          height: 40px;
          width: 40px;
          border-radius: 2px;
          background: #999;
        }
        .name {
          color: #000;
        }
        .name, .info {
          margin-left: 50px;
        }
        .info {
          color: #999;
        }
        .question {
          color: #06c;
        }
      }
    }
  }
</style>
