webpackJsonp([0],{"/5jX":function(t,s){},"0T4I":function(t,s){},"5gov":function(t,s){},"6ONK":function(t,s){},"9K3W":function(t,s){},"Ax/5":function(t,s){},LYYy:function(t,s){},"M/vO":function(t,s){},NHnr:function(t,s,e){"use strict";Object.defineProperty(s,"__esModule",{value:!0});var a=e("/5sW"),n={render:function(){var t=this.$createElement,s=this._self._c||t;return s("div",{attrs:{id:"app"}},[s("router-view")],1)},staticRenderFns:[]};var i=e("VU/8")({},n,!1,function(t){e("yXmh")},null,null).exports,l=e("/ocq"),o={render:function(){this.$createElement;this._self._c;return this._m(0)},staticRenderFns:[function(){var t=this,s=t.$createElement,e=t._self._c||s;return e("div",{staticClass:"explore-page-header"},[e("div",{staticClass:"center clearfix"},[e("div",{staticClass:"logo f-l"},[e("h1",[t._v("知乎")])]),t._v(" "),e("div",{staticClass:"search f-l clearfix"},[e("input",{staticClass:"f-l",attrs:{type:"text",placeholder:"搜索你感兴趣的内容..."}}),t._v(" "),e("a",{staticClass:"search-btn f-r"},[t._v("搜索")])]),t._v(" "),e("nav",{staticClass:"nav f-l"},[e("ul",{staticClass:"clearfix"},[e("li",{staticClass:"f-l"},[e("a",{staticClass:"home"},[t._v("首页")])]),t._v(" "),e("li",{staticClass:"f-l"},[e("a",{staticClass:"topic"},[t._v("话题")])]),t._v(" "),e("li",{staticClass:"f-l"},[e("a",{staticClass:"explore"},[t._v("发现")])])])]),t._v(" "),e("div",{staticClass:"btns f-r"},[e("ul",{staticClass:"clearfix"},[e("li",{staticClass:"f-l"},[e("a",{staticClass:"ask"},[t._v("提问")])]),t._v(" "),e("li",{staticClass:"f-l"},[e("a",{staticClass:"signup"},[t._v("注册知乎")])]),t._v(" "),e("li",{staticClass:"f-l"},[e("a",{staticClass:"login"},[t._v("登录")])])])])])])}]};var r=e("VU/8")({},o,!1,function(t){e("cOco")},"data-v-1d263302",null).exports,c={render:function(){this.$createElement;this._self._c;return this._m(0)},staticRenderFns:[function(){var t=this,s=t.$createElement,e=t._self._c||s;return e("div",{staticClass:"sign-up-zhihu"},[e("div",{staticClass:"slogan"},[e("h3",[t._v("加入知乎")]),t._v(" "),e("p",[t._v("与世界分享你的知识、经验和见解")])]),t._v(" "),e("form",{staticClass:"signup-form"},[e("ul",{staticClass:"signup-ul"},[e("li",[e("input",{staticClass:"name",attrs:{type:"text",placeholder:"姓名"}})]),t._v(" "),e("li",[e("input",{staticClass:"phone",attrs:{type:"text",placeholder:"手机号"}})]),t._v(" "),e("li",[e("input",{staticClass:"password",attrs:{type:"password",placeholder:"密码（不少于8位）"}})])]),t._v(" "),e("a",{staticClass:"signup-btn"},[t._v("注册")]),t._v(" "),e("p",[t._v("已有账号？"),e("a",{staticClass:"login"},[t._v("登录")])])])])}]};var u=e("VU/8")({},c,!1,function(t){e("bLo2")},"data-v-00c3f4a0",null).exports,f={render:function(){var t=this,s=t.$createElement,e=t._self._c||s;return e("div",{staticClass:"editor-recommendation"},[t._m(0),t._v(" "),e("hr"),t._v(" "),e("div",{staticClass:"recommendation-list"},[e("div",{staticClass:"top-question clearfix"},[e("a",{staticClass:"question",attrs:{href:"#/question"}},[e("h4",[t._v(t._s(t.topQuestion.question))])]),t._v(" "),e("a",{staticClass:"avatar f-l"}),t._v(" "),e("div",{staticClass:"author"},[e("a",{staticClass:"name"},[e("h4",[t._v(t._s(t.topQuestion.author.name))])]),t._v(" "),e("a",{staticClass:"field"},[t._v(t._s(t.topQuestion.author.field))]),t._v(" "),e("p",{staticClass:"info"},[t._v(t._s(t.topQuestion.author.info))])]),t._v(" "),e("p",{staticClass:"answer"},[t._v(t._s(t.topQuestion.answer))])]),t._v(" "),e("ul",t._l(t.questionList,function(s){return e("li",{staticClass:"clearfix"},[e("a",{staticClass:"question f-l",attrs:{href:"#/question"}},[e("h4",[t._v(t._s(s.question))])]),t._v(" "),e("p",{staticClass:"tag f-r"},[t._v(t._s(s.tag))])])}))])])},staticRenderFns:[function(){var t=this.$createElement,s=this._self._c||t;return s("div",{staticClass:"header clearfix"},[s("p",{staticClass:"f-l"},[this._v("编辑推荐")]),this._v(" "),s("a",{staticClass:"f-r"},[this._v("更多推荐>>")])])}]};var v=e("VU/8")({data:function(){return{topQuestion:{question:"编辑推荐的问题",author:{name:"作者",fields:"某个领域的优秀回答者",info:"信息介绍"},answer:"具体回答的内容，具体回答的内容，具体回答的内容，具体回答的内容，具体回答的内容，具体回答的内容，具体回答的内容。"},questionList:[{question:"其他推荐的问题",tag:"问题的标签"},{question:"其他推荐的问题",tag:"问题的标签"},{question:"其他推荐的问题",tag:"问题的标签"},{question:"其他推荐的问题",tag:"问题的标签"}]}}},f,!1,function(t){e("TmK0")},"data-v-45b4668f",null).exports,m={render:function(){var t=this,s=t.$createElement,e=t._self._c||s;return e("div",{staticClass:"comments-wrapper"},[e("ul",{staticClass:"comments"},t._l(t.comments,function(s,a){return e("li",{staticClass:"comment clearfix",on:{mouseenter:function(s){t.mouseenter(a)},mouseleave:function(s){t.mouseleave(a)}}},[e("a",{staticClass:"avatar f-l"}),t._v(" "),e("a",{staticClass:"name"},[t._v(t._s(s.name))]),t._v(" "),e("p",{staticClass:"content"},[t._v(t._s(s.content))]),t._v(" "),e("p",{staticClass:"time f-l"},[t._v(t._s(s.time))]),t._v(" "),e("div",{staticClass:"btns-wrapper f-l"},[s.isBtnShown?e("ul",{staticClass:"btns clearfix"},[t._m(0,!0),t._v(" "),t._m(1,!0),t._v(" "),t._m(2,!0),t._v(" "),t._m(3,!0)]):t._e()]),t._v(" "),e("p",{staticClass:"ups f-r"},[t._v(t._s(s.ups)+"个赞")])])})),t._v(" "),t._m(4)])},staticRenderFns:[function(){var t=this.$createElement,s=this._self._c||t;return s("li",{staticClass:"f-l"},[s("a",{staticClass:"reply-btn"},[this._v("回复")])])},function(){var t=this.$createElement,s=this._self._c||t;return s("li",{staticClass:"f-l"},[s("a",{staticClass:"up-btn"},[this._v("赞")])])},function(){var t=this.$createElement,s=this._self._c||t;return s("li",{staticClass:"f-l"},[s("a",{staticClass:"down-btn"},[this._v("踩")])])},function(){var t=this.$createElement,s=this._self._c||t;return s("li",{staticClass:"f-l"},[s("a",{staticClass:"report-btn"},[this._v("举报")])])},function(){var t=this.$createElement,s=this._self._c||t;return s("div",{staticClass:"new-comment-row"},[s("div",{staticClass:"new-comment-wrapper"},[s("input",{staticClass:"new-comment",attrs:{type:"text",placeholder:"写下你的评论..."}})])])}]};var _={components:{comments:e("VU/8")({data:function(){return{comments:[{name:"评论者",content:"具体评论内容，具体评论内容，具体评论内容，具体评论内容，具体评论内容，具体评论内容，具体评论内容。",time:"3天前",ups:233,isBtnShown:!1},{name:"评论者",content:"具体评论内容，具体评论内容，具体评论内容，具体评论内容，具体评论内容，具体评论内容，具体评论内容。",time:"3天前",ups:233,isBtnShown:!1},{name:"评论者",content:"具体评论内容，具体评论内容，具体评论内容，具体评论内容，具体评论内容，具体评论内容，具体评论内容。",time:"3天前",ups:233,isBtnShown:!1},{name:"评论者",content:"具体评论内容，具体评论内容，具体评论内容，具体评论内容，具体评论内容，具体评论内容，具体评论内容。",time:"3天前",ups:233,isBtnShown:!1}],isShown:!1}},methods:{mouseenter:function(t){this.comments[t].isBtnShown=!0},mouseleave:function(t){this.comments[t].isBtnShown=!1}}},m,!1,function(t){e("6ONK")},"data-v-5f3e211a",null).exports},data:function(){return{comments:[],questionList:[{question:"一个问题1",likes:6661,author:{name:"作者名字1",field:"，某某问题的优秀回答者1",info:"信息介绍1"},answer:"回答的具体内容...1",comments:2331,hover:!1},{question:"一个问题2",likes:6662,author:{name:"作者名字2",field:"，某某问题的优秀回答者2",info:"信息介绍2"},answer:"回答的具体内容...2",comments:2332,hover:!1},{question:"一个问题3",likes:6663,author:{name:"作者名字3",field:"，某某问题的优秀回答者3",info:"信息介绍3"},answer:"回答的具体内容...3",comments:2333,hover:!1},{question:"一个问题4",likes:6664,author:{name:"作者名字4",field:"，某某问题的优秀回答者4",info:"信息介绍4"},answer:"回答的具体内容...4",comments:2334,hover:!1}]}},methods:{showList:function(){console.log(this.list)},initQuestionList:function(){this.questionList.forEach(function(t){void 0===t.hover&&(t.hover=!1),void 0===t.commentsShown&&(t.commentsShown=!1)}),this.comments=document.querySelectorAll(".comments-wrapper")},mouseenter:function(t){t.hover=!0,console.log(t.hover)},mouseleave:function(t){t.hover=!1},showComments:function(t,s){t.commentsShown?(this.comments[s].style.display="none",t.commentsShown=!1):(this.comments[s].style.display="block",t.commentsShown=!0)},showMoreQuestions:function(){for(var t=0;t<4;t++)this.questionList.push({question:"一个问题",likes:666,author:{name:"作者名字",field:"，某某问题的优秀回答者",info:"信息介绍"},answer:"回答的具体内容...",comments:233,hover:!1});this.initQuestionList()}},mounted:function(){var t=this;this.$nextTick(function(){t.initQuestionList()})},updated:function(){var t=this;this.$nextTick(function(){t.initQuestionList()})},computed:{list:function(){return document.querySelectorAll(".top-question .question-list > ul > li")}}},h={render:function(){var t=this,s=t.$createElement,e=t._self._c||s;return e("div",{staticClass:"top-question"},[t._m(0),t._v(" "),e("div",{staticClass:"question-list"},[e("ul",t._l(t.questionList,function(s,a){return e("li",{staticClass:"clearfix",on:{mouseenter:function(e){t.mouseenter(s)},mouseleave:function(e){t.mouseleave(s)}}},[e("a",{staticClass:"question",attrs:{href:"#/question"}},[e("h4",[t._v(t._s(s.question))])]),t._v(" "),e("a",{staticClass:"likes f-l"},[t._v(t._s(s.likes))]),t._v(" "),e("div",{staticClass:"author"},[e("a",{staticClass:"name"},[e("h4",[t._v(t._s(s.author.name))])]),t._v(" "),e("a",{staticClass:"field"},[t._v(t._s(s.author.field))]),t._v(" "),e("p",{staticClass:"info"},[t._v(t._s(s.author.info))])]),t._v(" "),e("p",{staticClass:"answer"},[t._v(t._s(s.answer))]),t._v(" "),e("div",{staticClass:"btns clearfix"},[e("ul",{staticClass:"clearfix f-l"},[t._m(1,!0),t._v(" "),e("li",{staticClass:"f-l"},[e("a",{staticClass:"comments",on:{click:function(e){t.showComments(s,a)}}},[t._v(t._s(s.comments)+"条评论")])])]),t._v(" "),s.hover||s.showComments?t._e():e("ul",{staticClass:"clearfix f-l"},[t._m(2,!0)]),t._v(" "),s.hover||s.showComments?e("ul",{staticClass:"clearfix f-l"},[t._m(3,!0),t._v(" "),t._m(4,!0),t._v(" "),t._m(5,!0),t._v(" "),t._m(6,!0),t._v(" "),t._m(7,!0),t._v(" "),t._m(8,!0)]):t._e()]),t._v(" "),e("comments",{staticStyle:{display:"none"}})],1)}))]),t._v(" "),e("a",{staticClass:"more",on:{click:t.showMoreQuestions}},[t._v("更多")])])},staticRenderFns:[function(){var t=this.$createElement,s=this._self._c||t;return s("div",{staticClass:"tabs clearfix"},[s("ul",[s("li",[s("a",{staticClass:"top-today f-l"},[this._v("今日最热")])]),this._v(" "),s("li",[s("a",{staticClass:"top-month f-l"},[this._v("本月最热")])])])])},function(){var t=this.$createElement,s=this._self._c||t;return s("li",{staticClass:"f-l"},[s("a",{staticClass:"follow-btn"},[this._v("关注问题")])])},function(){var t=this.$createElement,s=this._self._c||t;return s("li",{staticClass:"f-l"},[s("a",{staticClass:"ask-repost"},[this._v("申请转载")])])},function(){var t=this.$createElement,s=this._self._c||t;return s("li",{staticClass:"f-l"},[s("a",{staticClass:"thank"},[this._v("感谢")])])},function(){var t=this.$createElement,s=this._self._c||t;return s("li",{staticClass:"f-l"},[s("a",{staticClass:"share"},[this._v("分享")])])},function(){var t=this.$createElement,s=this._self._c||t;return s("li",{staticClass:"f-l"},[s("a",{staticClass:"favorite"},[this._v("收藏")])])},function(){var t=this.$createElement,s=this._self._c||t;return s("li",{staticClass:"f-l"},[s("a",{staticClass:"helpless"},[this._v("没有帮助")])])},function(){var t=this.$createElement,s=this._self._c||t;return s("li",{staticClass:"f-l"},[s("a",{},[this._v("举报")])])},function(){var t=this.$createElement,s=this._self._c||t;return s("li",{staticClass:"f-l"},[s("a",{staticClass:"no-repost"},[this._v("禁止转载")])])}]};var C=e("VU/8")(_,h,!1,function(t){e("0T4I")},"data-v-6292f077",null).exports,d={render:function(){this.$createElement;this._self._c;return this._m(0)},staticRenderFns:[function(){var t=this.$createElement,s=this._self._c||t;return s("div",{staticClass:"download-zhihu-btn"},[s("a",[this._v("下载知乎 App")])])}]};var p=e("VU/8")({},d,!1,function(t){e("Pd/x")},"data-v-c23a6838",null).exports,w={render:function(){var t=this,s=t.$createElement,e=t._self._c||s;return e("div",{staticClass:"hot-tables"},[t._m(0),t._v(" "),e("div",{staticClass:"table-list"},[e("ul",t._l(t.hotTables,function(s){return e("li",{staticClass:"clearfix"},[e("a",{staticClass:"avatar f-l"}),t._v(" "),e("p",{staticClass:"remaining-days f-r"},[t._v("还有"+t._s(s.remainingDays)+"天结束")]),t._v(" "),e("a",{staticClass:"name"},[t._v(t._s(s.tableName))]),t._v(" "),e("p",{staticClass:"info"},[t._v(t._s(s.followerNumber)+"个人关注，"+t._s(s.questionNumber)+"个问题")])])}))])])},staticRenderFns:[function(){var t=this.$createElement,s=this._self._c||t;return s("div",{staticClass:"header clearfix"},[s("h4",{staticClass:"f-l"},[this._v("热门圆桌")]),this._v(" "),s("a",{staticClass:"f-r"},[this._v("更多圆桌>>")])])}]};var x=e("VU/8")({data:function(){return{hotTables:[{tableName:"圆桌名字",remainingDays:3,followerNumber:666,questionNumber:233},{tableName:"圆桌名字",remainingDays:3,followerNumber:666,questionNumber:233}]}}},w,!1,function(t){e("5gov")},"data-v-50077f12",null).exports,q={render:function(){var t=this,s=t.$createElement,e=t._self._c||s;return e("div",{staticClass:"hot-topics"},[t._m(0),t._v(" "),e("div",{staticClass:"topic-list"},[e("ul",t._l(t.hotTopics,function(s){return e("li",{staticClass:"clearfix"},[e("a",{staticClass:"avatar f-l"}),t._v(" "),e("a",{staticClass:"name"},[t._v(t._s(s.topicName))]),t._v(" "),e("p",{staticClass:"info"},[t._v(t._s(s.followerNumber)+"个人关注")]),t._v(" "),e("a",{staticClass:"question"},[t._v(t._s(s.question))])])}))])])},staticRenderFns:[function(){var t=this.$createElement,s=this._self._c||t;return s("div",{staticClass:"header clearfix"},[s("h4",{staticClass:"f-l"},[this._v("热门话题")])])}]};var b=e("VU/8")({data:function(){return{hotTopics:[{topicName:"话题名字",followerNumber:666,question:"相关的问题"},{topicName:"话题名字",followerNumber:666,question:"相关的问题"},{topicName:"话题名字",followerNumber:666,question:"相关的问题"}]}}},q,!1,function(t){e("M/vO")},"data-v-10746bfc",null).exports,y={render:function(){var t=this,s=t.$createElement,e=t._self._c||s;return e("div",{staticClass:"hot-favs"},[t._m(0),t._v(" "),e("div",{staticClass:"fav-list"},[e("ul",t._l(t.hotFavs,function(s){return e("li",{staticClass:"clearfix"},[e("a",{staticClass:"name"},[t._v(t._s(s.favName))]),t._v(" "),e("p",{staticClass:"info"},[t._v(t._s(s.followerNumber)+"个人关注，"+t._s(s.content)+"条内容")])])}))])])},staticRenderFns:[function(){var t=this.$createElement,s=this._self._c||t;return s("div",{staticClass:"header clearfix"},[s("h4",{staticClass:"f-l"},[this._v("热门收藏")]),this._v(" "),s("a",{staticClass:"f-r"},[this._v("换一换")])])}]};var E=e("VU/8")({data:function(){return{hotFavs:[{favName:"收藏夹名字",followerNumber:666,content:233},{favName:"收藏夹名字",followerNumber:666,content:233},{favName:"收藏夹名字",followerNumber:666,content:233},{favName:"收藏夹名字",followerNumber:666,content:233},{favName:"收藏夹名字",followerNumber:666,content:233}]}}},y,!1,function(t){e("TmKS")},"data-v-62331192",null).exports,$={render:function(){this.$createElement;this._self._c;return this._m(0)},staticRenderFns:[function(){var t=this,s=t.$createElement,e=t._self._c||s;return e("div",{staticClass:"footer"},[e("div",{staticClass:"clearfix"},[e("a",{staticClass:"f-l"},[t._v("刘看山")]),t._v(" "),e("a",{staticClass:"f-l"},[t._v("移动应用")]),t._v(" "),e("a",{staticClass:"f-l"},[t._v("加入知乎")]),t._v(" "),e("a",{staticClass:"f-l"},[t._v("知乎协议")])]),t._v(" "),e("div",{staticClass:"clearfix"},[e("a",{staticClass:"f-l"},[t._v("举报投诉")]),t._v(" "),e("a",{staticClass:"f-l"},[t._v("联系我们")]),t._v(" "),e("p",{staticClass:"f-l"},[t._v("© 20xx 知乎")])])])}]};var g=e("VU/8")({},$,!1,function(t){e("ZIuS")},"data-v-a9a1a19a",null).exports,N={components:{"explore-page-header":r,"sign-up-zhihu":u,"editor-recommendation":v,"top-question-list":C,"download-zhihu-btn":p,"hot-tables":x,"hot-topics":b,"hot-favs":E,"app-footer":g},data:function(){return{mainColClass:{"col-l":!0,"f-l":!0},sideColClass:{"col-s":!0,"f-r":!0}}},methods:{resizeWidth:function(){window.innerWidth<=940?(this.mainColClass["col-l"]=!1,this.mainColClass["f-l"]=!1,this.sideColClass["col-s"]=!1,this.sideColClass["f-r"]=!1):(this.mainColClass["col-l"]=!0,this.mainColClass["f-l"]=!0,this.sideColClass["col-s"]=!0,this.sideColClass["f-r"]=!0)},showMoreQuestions:function(){console.log(this)}},mounted:function(){var t=this;this.$nextTick(function(){window.onresize=function(){t.resizeWidth()},t.resizeWidth()})}},S={render:function(){var t=this,s=t.$createElement,e=t._self._c||s;return e("div",{staticClass:"explore-page"},[e("explore-page-header"),t._v(" "),e("div",{staticClass:"main"},[e("div",{staticClass:"center clearfix"},[e("div",{staticClass:"main-col",class:t.mainColClass},[e("editor-recommendation"),t._v(" "),e("top-question-list")],1),t._v(" "),e("div",{staticClass:"side-col",class:t.sideColClass},[e("sign-up-zhihu"),t._v(" "),e("download-zhihu-btn"),t._v(" "),e("hot-tables"),t._v(" "),e("hot-topics"),t._v(" "),e("hot-favs"),t._v(" "),e("app-footer")],1)])])],1)},staticRenderFns:[]};var P=e("VU/8")(N,S,!1,function(t){e("LYYy")},"data-v-0ba3acad",null).exports,B={data:function(){return{style:{header1:{transform:""},header2:{transform:""}},searchStyle:{focus:!1},questionPanel:{el:null,seen:!0,lastBottom:0,currentBottom:0}}},methods:{onfocus:function(){this.searchStyle.focus=!0},onblur:function(){this.searchStyle.focus=!1},onscroll:function(){this.questionPanel.currentBottom=this.questionPanel.el.getBoundingClientRect().bottom,this.questionPanel.currentBottom>46!==this.questionPanel.seen&&(this.questionPanel.seen=this.questionPanel.currentBottom>46,this.questionPanel.seen?(this.style.header1.transform="",this.style.header2.transform=""):(this.style.header1.transform="translateY(-100%)",this.style.header2.transform="translateY(-100%)")),this.questionPanel.currentBottom-this.questionPanel.lastBottom<-50&&(this.questionPanel.lastBottom=this.questionPanel.currentBottom+50,this.questionPanel.seen||(this.style.header1.transform="translateY(-100%)",this.style.header2.transform="translateY(-100%)")),this.questionPanel.currentBottom-this.questionPanel.lastBottom>50&&(this.questionPanel.lastBottom=this.questionPanel.currentBottom-50,this.questionPanel.seen||(this.style.header1.transform="",this.style.header2.transform=""))}},mounted:function(){var t=this;this.$nextTick(function(){t.questionPanel.el=document.querySelector(".question-panel"),t.questionPanel.currentBottom=t.questionPanel.el.getBoundingClientRect().bottom,t.questionPanel.lastBottom=t.questionPanel.currentBottom,document.addEventListener("scroll",function(){t.onscroll()})})}},R={render:function(){var t=this,s=t.$createElement,e=t._self._c||s;return e("div",{staticClass:"question-page-header"},[e("div",{staticClass:"header1 center clearfix",style:t.style.header1},[t._m(0),t._v(" "),t._m(1),t._v(" "),e("div",{staticClass:"search f-l clearfix",class:t.searchStyle},[e("input",{staticClass:"f-l",style:t.style.searchInput,attrs:{type:"text",placeholder:"搜索你感兴趣的内容..."},on:{focus:t.onfocus,blur:t.onblur}}),t._v(" "),e("a",{staticClass:"search-btn f-r"},[t._v("搜索")])]),t._v(" "),t._m(2)]),t._v(" "),e("div",{staticClass:"header2 center clearfix",style:t.style.header2},[e("h2",{staticClass:"question-title f-l"},[t._v("问问题")]),t._v(" "),t._m(3)])])},staticRenderFns:[function(){var t=this.$createElement,s=this._self._c||t;return s("div",{staticClass:"logo f-l"},[s("h1",[this._v("知乎")])])},function(){var t=this.$createElement,s=this._self._c||t;return s("nav",{staticClass:"nav f-l"},[s("ul",{staticClass:"clearfix"},[s("li",{staticClass:"f-l"},[s("a",{staticClass:"home",attrs:{href:"#/"}},[this._v("首页")])]),this._v(" "),s("li",{staticClass:"f-l"},[s("a",{staticClass:"topic",attrs:{href:"#/"}},[this._v("话题")])]),this._v(" "),s("li",{staticClass:"f-l"},[s("a",{staticClass:"explore",attrs:{href:"#/"}},[this._v("发现")])])])])},function(){var t=this.$createElement,s=this._self._c||t;return s("div",{staticClass:"btns f-r"},[s("ul",{staticClass:"clearfix"},[s("li",{staticClass:"f-l"},[s("a",{staticClass:"login"},[this._v("登录")])]),this._v(" "),s("li",{staticClass:"f-l"},[s("a",{staticClass:"signup"},[this._v("加入知乎")])])])])},function(){var t=this.$createElement,s=this._self._c||t;return s("div",{staticClass:"btns f-r"},[s("ul",{staticClass:"clearfix"},[s("li",{staticClass:"f-l"},[s("a",{staticClass:"follow"},[this._v("关注问题")])]),this._v(" "),s("li",{staticClass:"f-l"},[s("a",{staticClass:"write-answer"},[this._v("写回答")])])])])}]};var L=e("VU/8")(B,R,!1,function(t){e("tOnn")},"data-v-e789806e",null).exports,k={render:function(){var t=this,s=t.$createElement,e=t._self._c||s;return e("div",{staticClass:"question-panel"},[e("div",{staticClass:"center clearfix"},[e("div",{staticClass:"col-l f-l"},[e("div",{staticClass:"tags"},[e("ul",{staticClass:"clearfix"},t._l(t.tags,function(s){return e("li",{staticClass:"f-l"},[e("a",[t._v(t._s(s.tagName))])])}))]),t._v(" "),t._m(0),t._v(" "),t._m(1)]),t._v(" "),e("div",{staticClass:"col-s f-r clearfix"},[e("div",{staticClass:"info clearfix f-r"},[e("div",{staticClass:"f-l"},[e("p",{staticClass:"info-tag"},[t._v("关注者")]),t._v(" "),e("p",{staticClass:"number"},[t._v(t._s("233"))])]),t._v(" "),e("div",{staticClass:"f-l viewed-info"},[e("p",{staticClass:"info-tag"},[t._v("被浏览")]),t._v(" "),e("p",{staticClass:"number"},[t._v(t._s("666"))])])])])])])},staticRenderFns:[function(){var t=this.$createElement,s=this._self._c||t;return s("div",{staticClass:"question"},[s("h2",{staticClass:"question-title"},[this._v("问问题")]),this._v(" "),s("p",{staticClass:"question-detail"},[this._v("问题的具体内容")])])},function(){var t=this,s=t.$createElement,e=t._self._c||s;return e("div",{staticClass:"btns"},[e("ul",{staticClass:"clearfix"},[e("li",{staticClass:"f-l"},[e("a",{staticClass:"follow"},[t._v("关注问题")])]),t._v(" "),e("li",{staticClass:"f-l"},[e("a",{staticClass:"write-answer"},[t._v("写回答")])]),t._v(" "),e("li",{staticClass:"f-l"},[e("a",{staticClass:"add-comment"},[t._v("添加评论")])]),t._v(" "),e("li",{staticClass:"f-l"},[e("a",{staticClass:"share"},[t._v("分享")])]),t._v(" "),e("li",{staticClass:"f-l"},[e("a",{staticClass:"invite"},[t._v("邀请回答")])])])])}]};var F=e("VU/8")({data:function(){return{tags:[{tagName:"标签",url:""},{tagName:"标签",url:""},{tagName:"标签",url:""},{tagName:"标签",url:""}]}}},k,!1,function(t){e("absA")},"data-v-d868fd92",null).exports,T={render:function(){var t=this,s=t.$createElement,e=t._self._c||s;return e("div",{staticClass:"comments-wrapper"},[t._m(0),t._v(" "),e("ul",{staticClass:"comments"},t._l(t.comments,function(s,a){return e("li",{staticClass:"comment clearfix",on:{mouseenter:function(s){t.mouseenter(a)},mouseleave:function(s){t.mouseleave(a)}}},[e("a",{staticClass:"avatar f-l"}),t._v(" "),e("a",{staticClass:"name f-l"},[t._v(t._s(s.name))]),t._v(" "),e("p",{staticClass:"time f-r"},[t._v(t._s(s.time))]),t._v(" "),e("p",{staticClass:"content"},[t._v(t._s(s.content))]),t._v(" "),e("p",{staticClass:"ups f-r"},[t._v(t._s(s.ups)+"个赞")]),t._v(" "),e("div",{staticClass:"btns-wrapper f-l"},[e("ul",{staticClass:"btns clearfix"},[t._m(1,!0),t._v(" "),s.isBtnShown?e("li",{staticClass:"f-l"},[e("a",{staticClass:"reply-btn"},[t._v("回复")])]):t._e(),t._v(" "),s.isBtnShown?e("li",{staticClass:"f-l"},[e("a",{staticClass:"down-btn"},[t._v("踩")])]):t._e(),t._v(" "),s.isBtnShown?e("li",{staticClass:"f-l"},[e("a",{staticClass:"report-btn"},[t._v("举报")])]):t._e()])])])})),t._v(" "),e("div",{staticClass:"new-comment-row clearfix",class:t.newCommentStyle},[e("div",{staticClass:"new-comment-wrapper f-l"},[e("input",{staticClass:"new-comment",attrs:{type:"text",placeholder:"写下你的评论..."},on:{focus:t.inputOnFocus,blur:t.inputOnBlur}})]),t._v(" "),e("a",{staticClass:"new-comment-send f-r"},[t._v("发送")])])])},staticRenderFns:[function(){var t=this.$createElement,s=this._self._c||t;return s("div",{staticClass:"comments-info clearfix"},[s("p",{staticClass:"comments-number f-l"},[this._v("几条评论")]),this._v(" "),s("a",{staticClass:"sorting-comments f-r"},[this._v("切换时间顺序")])])},function(){var t=this.$createElement,s=this._self._c||t;return s("li",{staticClass:"f-l"},[s("a",{staticClass:"up-btn"},[this._v("赞")])])}]};var Q={components:{comments2:e("VU/8")({data:function(){return{comments:[{name:"评论者",content:"具体评论内容，具体评论内容，具体评论内容，具体评论内容，具体评论内容，具体评论内容，具体评论内容。",time:"3天前",ups:233,isBtnShown:!1},{name:"评论者",content:"具体评论内容，具体评论内容，具体评论内容，具体评论内容，具体评论内容，具体评论内容，具体评论内容。",time:"3天前",ups:233,isBtnShown:!1},{name:"评论者",content:"具体评论内容，具体评论内容，具体评论内容，具体评论内容，具体评论内容，具体评论内容，具体评论内容。",time:"3天前",ups:233,isBtnShown:!1},{name:"评论者",content:"具体评论内容，具体评论内容，具体评论内容，具体评论内容，具体评论内容，具体评论内容，具体评论内容。",time:"3天前",ups:233,isBtnShown:!1}],isShown:!1,newCommentStyle:{focus:!1}}},methods:{mouseenter:function(t){this.comments[t].isBtnShown=!0},mouseleave:function(t){this.comments[t].isBtnShown=!1},inputOnFocus:function(){this.newCommentStyle.focus=!0},inputOnBlur:function(){this.newCommentStyle.focus=!1}}},T,!1,function(t){e("WJE2")},"data-v-f10794cc",null).exports},data:function(){return{comments:[],answerList:[{answererName:"回答者名字",answererInfo:"回答者信息",upvoteNumber:666,answerContent:"回答的具体内容，回答的具体内容，回答的具体内容，回答的具体内容，回答的具体内容，回答的具体内容，回答的具体内容，回答的具体内容，回答的具体内容，回答的具体内容，回答的具体内容，回答的具体内容，回答的具体内容。",isCommentShown:!1},{answererName:"回答者名字",answererInfo:"回答者信息",upvoteNumber:666,answerContent:"回答的具体内容，回答的具体内容，回答的具体内容，回答的具体内容，回答的具体内容，回答的具体内容，回答的具体内容，回答的具体内容，回答的具体内容，回答的具体内容，回答的具体内容，回答的具体内容，回答的具体内容。",isCommentShown:!1},{answererName:"回答者名字",answererInfo:"回答者信息",upvoteNumber:666,answerContent:"回答的具体内容，回答的具体内容，回答的具体内容，回答的具体内容，回答的具体内容，回答的具体内容，回答的具体内容，回答的具体内容，回答的具体内容，回答的具体内容，回答的具体内容，回答的具体内容，回答的具体内容。",isCommentShown:!1},{answererName:"回答者名字",answererInfo:"回答者信息",upvoteNumber:666,answerContent:"回答的具体内容，回答的具体内容，回答的具体内容，回答的具体内容，回答的具体内容，回答的具体内容，回答的具体内容，回答的具体内容，回答的具体内容，回答的具体内容，回答的具体内容，回答的具体内容，回答的具体内容。",isCommentShown:!1},{answererName:"回答者名字",answererInfo:"回答者信息",upvoteNumber:666,answerContent:"回答的具体内容，回答的具体内容，回答的具体内容，回答的具体内容，回答的具体内容，回答的具体内容，回答的具体内容，回答的具体内容，回答的具体内容，回答的具体内容，回答的具体内容，回答的具体内容，回答的具体内容。",isCommentShown:!1}]}},methods:{initAnswerList:function(){this.answerList.forEach(function(t){void 0===t.isCommentShown&&(t.isCommentShown=!1)}),this.comments=document.querySelectorAll(".comments-wrapper")},showComment:function(t,s){t.isCommentShown?(this.comments[s].style.display="none",t.isCommentShown=!1):(this.comments[s].style.display="block",t.isCommentShown=!0)}},mounted:function(){var t=this;this.$nextTick(function(){t.initAnswerList()})}},U={render:function(){var t=this,s=t.$createElement,e=t._self._c||s;return e("div",{staticClass:"answer-panel"},[t._m(0),t._v(" "),e("div",{staticClass:"answer-list"},[e("ul",{staticClass:"answer-list-ul"},t._l(t.answerList,function(s,a){return e("li",{staticClass:"answer-item"},[e("a",{staticClass:"answerer-avatar f-l"}),t._v(" "),e("a",{staticClass:"answerer-name"},[t._v(t._s(s.answererName))]),t._v(" "),e("p",{staticClass:"answerer-info clearfix"},[t._v(t._s(s.answererInfo))]),t._v(" "),e("p",{staticClass:"upvote-info"},[t._v(t._s(s.upvoteNumber)+"人赞同了该回答")]),t._v(" "),e("div",{staticClass:"answer-content"},[t._v("\n          "+t._s(s.answerContent)+"\n        ")]),t._v(" "),e("p",{staticClass:"edit-time"}),t._v(" "),e("div",{staticClass:"btns"},[e("ul",{staticClass:"clearfix"},[t._m(1,!0),t._v(" "),t._m(2,!0),t._v(" "),s.isCommentShown?t._e():e("li",{staticClass:"f-l"},[e("a",{staticClass:"comments",on:{click:function(e){t.showComment(s,a)}}},[t._v("几条评论")])]),t._v(" "),s.isCommentShown?e("li",{staticClass:"f-l"},[e("a",{staticClass:"comments",on:{click:function(e){t.showComment(s,a)}}},[t._v("收起评论")])]):t._e(),t._v(" "),t._m(3,!0),t._v(" "),t._m(4,!0),t._v(" "),t._m(5,!0),t._v(" "),t._m(6,!0)])]),t._v(" "),e("comments2",{staticStyle:{display:"none"}})],1)}))])])},staticRenderFns:[function(){var t=this.$createElement,s=this._self._c||t;return s("div",{staticClass:"answer-list-info clearfix"},[s("p",{staticClass:"answer-number f-l"},[this._v("几个回答")]),this._v(" "),s("a",{staticClass:"sorting-answer f-r"},[this._v("默认排序")])])},function(){var t=this.$createElement,s=this._self._c||t;return s("li",{staticClass:"f-l"},[s("a",{staticClass:"upvote"},[this._v("赞同")])])},function(){var t=this.$createElement,s=this._self._c||t;return s("li",{staticClass:"f-l"},[s("a",{staticClass:"downvote"},[this._v("反对")])])},function(){var t=this.$createElement,s=this._self._c||t;return s("li",{staticClass:"f-l"},[s("a",{staticClass:"share"},[this._v("分享")])])},function(){var t=this.$createElement,s=this._self._c||t;return s("li",{staticClass:"f-l"},[s("a",{staticClass:"fav"},[this._v("收藏")])])},function(){var t=this.$createElement,s=this._self._c||t;return s("li",{staticClass:"f-l"},[s("a",{staticClass:"thank"},[this._v("感谢")])])},function(){var t=this.$createElement,s=this._self._c||t;return s("li",{staticClass:"f-r"},[s("a",{staticClass:"foldup"},[this._v("收起")])])}]};var V={render:function(){var t=this,s=t.$createElement,e=t._self._c||s;return e("div",{staticClass:"related-question-panel"},[e("p",{staticClass:"related-question-panel-info"},[t._v("相关问题")]),t._v(" "),e("div",{staticClass:"related-question-list"},[e("ul",t._l(t.relatedQuestionList,function(s){return e("li",[e("a",{staticClass:"question-url"},[t._v(t._s(s.questionTitle))]),t._v(" "),e("span",{staticClass:"answer-number"},[t._v(t._s(s.answerNumber)+"个回答")])])}))])])},staticRenderFns:[]};var z={data:function(){return{recommendationList:[{title:"标题",author:"作者",info:"信息",hover:!1},{title:"标题",author:"作者",info:"信息",hover:!1}],relatedQuestionPanel:{el:null,left:0,bottom:0},relatedRecommendationPanel:{el:null,top:0}}},methods:{onmouseenter:function(t,s){t.hover=!0},onmouseleave:function(t,s){t.hover=!1},onscroll:function(){this.relatedQuestionPanel.bottom=this.relatedQuestionPanel.el.getBoundingClientRect().bottom,this.relatedQuestionPanel.bottom<46?(this.relatedRecommendationPanel.el.style.position="fixed",this.relatedRecommendationPanel.el.style.left=this.relatedQuestionPanel.el.getBoundingClientRect().left-10+"px",this.relatedRecommendationPanel.el.style.top="46px",this.relatedRecommendationPanel.el.style.width="280px"):(this.relatedRecommendationPanel.el.style.position="",this.relatedRecommendationPanel.el.style.left="",this.relatedRecommendationPanel.el.style.top="")}},mounted:function(){var t=this;this.$nextTick(function(){t.relatedQuestionPanel.el=document.querySelector(".related-question-panel"),t.relatedRecommendationPanel.el=document.querySelector(".related-recommendation-panel"),document.addEventListener("scroll",function(){t.onscroll()})})}},O={render:function(){var t=this,s=t.$createElement,e=t._self._c||s;return e("div",{staticClass:"related-recommendation-panel"},[e("p",{staticClass:"related-recommendation-panel-info"},[t._v("相关推荐")]),t._v(" "),e("div",{staticClass:"related-recommendation-list"},[e("ul",t._l(t.recommendationList,function(s,a){return e("li",[e("a",{staticClass:"recommendation-item clearfix",on:{mouseenter:function(e){t.onmouseenter(s,a)},mouseleave:function(e){t.onmouseleave(s,a)}}},[e("div",{staticClass:"recommendation-pic f-l"}),t._v(" "),e("p",{staticClass:"recommendation-title",class:{hover:s.hover}},[t._v(t._s(s.title))]),t._v(" "),e("p",{staticClass:"recommendation-author"},[t._v(t._s(s.author))]),t._v(" "),e("p",{staticClass:"recommendation-info f-l"},[t._v(t._s(s.info))]),t._v(" "),e("a",{staticClass:"btn f-r"},[t._v("试听")])])])}))])])},staticRenderFns:[]};var W={components:{"question-page-header":L,"question-panel":F,"answer-panel":e("VU/8")(Q,U,!1,function(t){e("/5jX")},"data-v-f23024d6",null).exports,"download-zhihu-btn":p,"related-question-panel":e("VU/8")({data:function(){return{relatedQuestionList:[{questionTitle:"什么什么什么什么什么什么什么问题",answerNumber:233},{questionTitle:"什么什么什么什么什么什么什么问题",answerNumber:233},{questionTitle:"什么什么什么什么什么什么什么问题",answerNumber:233},{questionTitle:"什么什么什么什么什么什么什么问题",answerNumber:233}]}}},V,!1,function(t){e("9K3W")},"data-v-02b26ff8",null).exports,"related-recommendation-panel":e("VU/8")(z,O,!1,function(t){e("Ax/5")},"data-v-4025341a",null).exports,"app-footer":g},data:function(){return{mainColClass:{"col-l":!0,"f-l":!0},sideColClass:{"col-s":!0,"f-r":!0}}},methods:{resizeWidth:function(){window.innerWidth<=1e3?(this.mainColClass["col-l"]=!1,this.mainColClass["f-l"]=!1,this.sideColClass["col-s"]=!1,this.sideColClass["f-r"]=!1):(this.mainColClass["col-l"]=!0,this.mainColClass["f-l"]=!0,this.sideColClass["col-s"]=!0,this.sideColClass["f-r"]=!0)}},mounted:function(){var t=this;this.$nextTick(function(){window.onresize=function(){t.resizeWidth()},t.resizeWidth()})}},I={render:function(){var t=this,s=t.$createElement,e=t._self._c||s;return e("div",{staticClass:"question-page"},[e("question-page-header"),t._v(" "),e("question-panel"),t._v(" "),e("div",{staticClass:"main center"},[e("div",{class:t.mainColClass},[e("answer-panel"),t._v(" "),e("a",{staticClass:"write-answer"},[t._v("写回答")])],1),t._v(" "),e("div",{class:t.sideColClass},[e("download-zhihu-btn"),t._v(" "),e("related-question-panel"),t._v(" "),e("related-recommendation-panel")],1)])],1)},staticRenderFns:[]};var A=e("VU/8")(W,I,!1,function(t){e("PxdR")},"data-v-5cb2f4de",null).exports;a.a.use(l.a);var K=new l.a({routes:[{path:"/",name:"ExplorePage",component:P},{path:"/question",name:"QuestionPage",component:A}]});e("xsZ7");a.a.config.productionTip=!1,new a.a({el:"#app",router:K,render:function(t){return t(i)}})},"Pd/x":function(t,s){},PxdR:function(t,s){},TmK0:function(t,s){},TmKS:function(t,s){},WJE2:function(t,s){},ZIuS:function(t,s){},absA:function(t,s){},bLo2:function(t,s){},cOco:function(t,s){},tOnn:function(t,s){},xsZ7:function(t,s){},yXmh:function(t,s){}},["NHnr"]);
//# sourceMappingURL=app.9339d9249f70e9e98117.js.map