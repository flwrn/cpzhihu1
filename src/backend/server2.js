const http = require('http');
const path = require('path');
const url = require('url');
// const fs = require('fs');
const mongodb = require('./mongodb.js');

// let database = {};

let switcher = {
  conditions: [
    /^\/api\/question\/[0-9]+$/,
    /^\/api\/question\/[0-9]+\/comments$/,
    /^\/api\/question\/[0-9]+\/answers/,
    /^\/api\/answer\/[0-9]+\/comments/
  ],
  operations: [
    function getQuestionItem(parsedUrl, res) {
      let questionId = parsedUrl.pathname.match(/[0-9]+/)[0];
      console.log(`get question ${questionId}`);
      // let questionIndex = database.questionList.findIndex((item) => {
      //   return item.id === questionId;
      // });
      mongodb.getQuestionItem(questionId).then((questionItem) => {
        if (questionItem.id) {
          let data = {};
          data.questionItem = questionItem;
          respondJSON(res, data);
        } else {
          respondNotFound(res);
        }
      });
    },
    function getQuestionComments(parsedUrl, res) {
      let questionId = parsedUrl.pathname.match(/[0-9]+/)[0];
      console.log(`get comments of question ${questionId}`);
      // let questionIndex = database.questionList.findIndex((questionItem) => {
      //   return questionItem.id === questionId;
      // });
      mongodb.getQuestionItem(questionId).then((questionItem) => {
        if (questionItem.id) {
          let data = {};
          let commentPromises = [];
          for (let commentId of questionItem.commentIdList) {
            commentPromises.push(mongodb.getComment(commentId));
          }
          Promise.all(commentPromises).then((commentList) => {
            data.commentList = commentList;
          }).then(() => {
            respondJSON(res, data);
          });
          // data.commentList = database.questionList[questionIndex].commentIdList.map((id) => {
          //   return database.commentList.find((commentItem) => {
          //     return commentItem.id === id;
          //   });
          // });
        } else {
          respondNotFound(res);
        }
      });
    },
    function getAnswers(parsedUrl, res) {
      if (parsedUrl.path.match(/^\/api\/question\/[0-9]+\/answers$/)) {
        parsedUrl = url.parse(`${parsedUrl.pathname}?page=1`, true);
      }
      if (parsedUrl.path.match(/^\/api\/question\/[0-9]+\/answers\?page=[0-9]+$/)) {
        let questionId = parsedUrl.pathname.match(/[0-9]+/)[0];
        let page = parseInt(parsedUrl.query.page);
        // let questionIndex = database.questionList.findIndex((item) => {
        //   return item.id === questionId;
        // });
        mongodb.getQuestionItem(questionId).then((questionItem) => {
          if (questionItem.id) {
            let selectedAnswerIdList = questionItem.answerIdList.filter((item, index) => {
              return index >= (page - 1) * 5 && index < page * 5;
            });
            let data = {};
            let answerPromises = [];
            for (let answerId of selectedAnswerIdList) {
              answerPromises.push(mongodb.getAnswer(answerId));
            }
            Promise.all(answerPromises).then((answerList) => {
              data.answerList = answerList;
            }).then(() => {
              respondJSON(res, data);
            });
            // data.answerList = selectedAnswerIdList.map((id) => {
            //   return database.answerList.find((answerItem) => {
            //     return answerItem.id === id;
            //   });
            // });

          } else {
            respondNotFound(res);
          }
        });
      } else {
        respondNotFound(res);
      }
    },
    function getAnswerComments(parsedUrl, res) {
      if (parsedUrl.path.match(/^\/api\/answer\/[0-9]+\/comments$/)) {
        parsedUrl = url.parse(`${parsedUrl.pathname}?page=1`, true);
      }
      if (parsedUrl.path.match(/^\/api\/answer\/[0-9]+\/comments\?page=[0-9]+$/)) {
        let answerId = parsedUrl.pathname.match(/[0-9]+/)[0];
        let page = parseInt(parsedUrl.query.page);
        console.log(`get comments of answer ${answerId}`);
        // let answerIndex = database.answerList.findIndex((item) => {
        //   return item.id === answerId;
        // });
        mongodb.getAnswer(answerId).then((answerItem) => {
          if (answerItem.id) {
            let data = {};
            let selectedCommentIdList = answerItem.commentIdList.filter((item, index) => {
              return index >= (page - 1) * 20 && index < page * 20;
            });
            let commentPromises = [];
            for (let commentId of selectedCommentIdList) {
              commentPromises.push(mongodb.getComment(commentId));
            }
            Promise.all(commentPromises).then((commentList) => {
              data.commentList = commentList;
            }).then(() => {
              respondJSON(res, data);
            });
            // data.commentList = selectedCommentIdList.map((item) => {
            //   return database.commentList.find((commentItem) => {
            //     return commentItem.id === item;
            //   });
            // });
          } else {
            respondNotFound(res);
          }
        });
      } else {
        respondNotFound(res);
      }
    }
  ],
  doDefault(res) {
    respondNotFound(res);
  },
  to(parsedUrl, res) {
    let path = parsedUrl.path;
    let index = this.conditions.findIndex((item) => {
      return item.test(path);
    });
    if (index !== -1) {
      this.operations[index](parsedUrl, res);
    } else {
      this.doDefault(res);
    }
  }
};

function main() {
  // loadDatabase();
  mongodb.connect();
  http.createServer((req, res) => {
    let parsedUrl = url.parse(req.url, true);
    switcher.to(parsedUrl, res);
  }).listen(4000);
  console.log('Listening on 4000');
}
main();

function loadDatabase() {
  if (fs.existsSync(path.join(__dirname, 'database.json'))) {
    database = JSON.parse(fs.readFileSync(path.join(__dirname, 'database.json'), 'utf8'));
  }
}

function saveDatabase() {
  fs.writeFileSync(path.join(__dirname, 'database.json'), JSON.stringify(database), 'utf8');
}

function respondJSON(res, data) {
  res.setHeader('Content-Type', 'application/json; charset=utf-8');
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.writeHead(200);
  res.write(JSON.stringify(data));
  res.end();
}

function respondNotFound(res) {
  res.writeHead(404);
  res.end();
}

// function login(username, password) {
//   mongodb.auth(username, password).then((result) => {
//     if (result.username) {
//
//     } else {
//
//     }
//   });
// }
