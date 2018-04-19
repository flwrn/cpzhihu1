const axios = require('axios')
const http = require('http')
const url = require('url')

const cheerio = require('cheerio')

var requestURL = 'https://www.zhihu.com/explore'


http.createServer((req, res) => {
  axios.get('https://www.zhihu.com/explore')
  .then((response) => {
    // console.log(response.data)
    // console.log(response.status)
    // console.log(response.statusText)
    // console.log(response.headers)
    // console.log(response.config)

    const $ = cheerio.load(response.data)

    // 编辑推荐列表
    var topQuestionDOM = $('#zh-recommend-list .top-recommend-feed')
    var topQuestion = {
      question: topQuestionDOM.find('h2 a').text(),
      author: {
        name: topQuestionDOM.find('.feed-main .author-info .author-link-line .name.author-link').text(),
        fields: topQuestionDOM.find('.feed-main .author-info .badge-summary a').text(),
        info: topQuestionDOM.find('.feed-main .author-info .bio').text()
      },
      answer: topQuestionDOM.find('.feed-main .post-content .zh-summary.summary').text()
    }

    var questionListDOM = $('#zh-recommend-list .recommend-feed')
    var questionList = []
    for (let i=0; i<questionListDOM.length; i++) {
      questionList.push({
        question: $(questionListDOM[i]).find('h2 a').text(),
        tag: $(questionListDOM[i]).find('span').text()
      })
    }



    // 编辑推荐
    var editorRecommendation = {
      topQuestion: topQuestion,
      questionList: questionList
    }

    // console.log(editorRecommendation)


    //今日热门列表
    var topQuestionList = {
      questionList: []
    }
    for ( let i=0, dom=$('.explore-tab .tab-panel div[data-type=daily] .explore-feed');
          i<dom.length;
          i++
        ) {
          topQuestionList.questionList.push({
            question: $(dom[i]).find('h2 a').text(),
            likes: $(dom[i]).find('span.count').text(),
            author: {
              name: $(dom[i]).find('a.author-link').text(),
              field: $(dom[i]).find('span.bio').text(),
              info: $(dom[i]).find('a.more.text').text()
            },
            answer: $(dom[i]).find('.zm-item-rich-text > div:first-child').text(),
            comments: $(dom[i]).find('a.toggle-comment').text(),
            hover: false
          })
        }


    // topQuestionList.questionList = $('.explore-tab .tab-panel div[data-type=daily] .explore-feed')
    // .map((index, item) => {
    //   return {
    //     question: $(item).find('h2 a').text(),
    //     likes: $(item).find('span.count').text(),
    //     author: {
    //       name: $(item).find('a.author-link').text(),
    //       field: $(item).find('span.bio').text(),
    //       info: $(item).find('a.more.text').text()
    //     },
    //     answer: $(item).find('.zm-item-rich-text > div:first-child').text(),
    //     comments: $(item).find('a.toggle-comment').text(),
    //     hover: false
    //   }
    // })



    // 热门圆桌列表
    var hotTableList = {
      hotTables: []
    }
    for ( let i=0, dom=$('ul.hot-roundables li');
          i<dom.length;
          i++
        ) {
          hotTables.push({
            tableName: $(dom[i]).find('.content a').text(),
            remainingDays: $(dom[i]).find('.content span.status').text(),
            followerNumber: $(dom[i]).find('.content .meta span:nth-child(1)').text(),
            questionNumber: $(dom[i]).find('.content .meta span:nth-child(3)').text()
          })
        }


    // var hotTables = $('ul.hot-roundtables li').map((index, item) => {
    //   return {
    //     tableName: $(item).find('.content a').text(),
    //     remainingDays: $(item).find('.content span.status').text(),
    //     followerNumber: $(item).find('.content .meta span:nth-child(1)').text(),
    //     questionNumber: $(item).find('.content .meta span:nth-child(3)').text()
    //   }
    // })

    // 热门话题列表
    var hotTopicList = {
      hotTopics: []
    }
    for ( let i=0, dom=$('ul.hot-topics li');
          i<dom.length;
          i++
        ) {
          hotTopicList.hotTopics.push({
            topicName: $(dom[i]).find('.content a').text(),
            followerNumber: $(dom[i]).find('.content .meta span').text(),
            question: $(dom[i]).find('.bottom a').text()
          })
        }

    // hotTopicList.hotTopics = $('ul.hot-topics li').map((index, item) => {
    //   return {
    //     topicName: $(item).find('.content a').text(),
    //     followerNumber: $(item).find('.content .meta span').text(),
    //     question: $(item).find('.bottom a').text()
    //   }
    // })

    // 热门收藏列表
    var hotFavList = {
      hotFavs: []
    }
    for ( let i=0, dom=$('ul.hot-favlists li');
          i<dom.length;
          i++
        ) {
          hotFavList.hotFavs.push({
            favName: $(dom[i]).find('.content a').text(),
            followerNumber: $(dom[i]).find('.meta span:nth-child(1)').text(),
            content: $(dom[i]).find('.meta span:nth-child(3)').text()
          })
        }

    // hotFavList.hotFavs = $('ul.hot-favlists li').map((index, item) => {
    //   return {
    //     favName: $(item).find('.content a').text(),
    //     followerNumber: $(item).find('.meta span:nth-child(1)').text(),
    //     content: $(item).find('.meta span:nth-child(3)').text()
    //   }
    // })
    //
    var pageData = {
      editorRecommendation: editorRecommendation,
      topQuestionList: topQuestionList,
      hotTableList: hotTableList,
      hotTopicList: hotTopicList,
      hotFavList: hotFavList
    }

    // var pageData = {}
    // pageData.editorRecommendation = editorRecommendation
    // pageData.topQuestionList = topQuestionList
    // pageData.hotTableList = hotTableList
    // pageData.hotTopicList = hotTopicList
    // pageData.hotFavList = hotFavList

    console.log(JSON.stringify(pageData))
    // console.log(hotTopicList.hotTopics[0].topicName)
    // console.log(pageData)
    // console.log(hotTableList)
    // console.log(hotTopicList)
    // console.log(hotFavList)

    res.writeHeader(200, {
      'Access-Control-Allow-Origin': 'http://localhost:8080'
    })
    res.end(JSON.stringify(pageData))

  })
  .catch((error) => {
    console.log(error)
  })

}).listen(3000)
console.log('Listening on 3000')
