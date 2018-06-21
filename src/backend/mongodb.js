const mongoose = require('mongoose');
const http = require('http');
const path = require('path');
const url = require('url');

const QuestionSchema = new mongoose.Schema({
  url: String,
  id: String,
  title: String,
  keywords: Array,
  answerCount: Number,
  commentCount: Number,
  dateCreated: String,
  dateModified: String,
  followerCount: String,
  visitsCount: String,
  briefContent: String,
  relatedQuestions: Array,
  answerIdList: Array,
  commentIdList: Array
});
const Question = mongoose.model('Question', QuestionSchema);
const AnswerSchema = new mongoose.Schema({
  id: String,
  url: String,
  upvoteCount: Number,
  commentCount: Number,
  dateCreated: String,
  dateModified: String,
  content: String,
  author: Object,
  commentIdList: Array
});
const Answer = mongoose.model('Answer', AnswerSchema);
const CommentSchema = new mongoose.Schema({
  id: String,
  voteCount: Number,
  content: String,
  createdTime: Number,
  author: Object
});
const Comment = mongoose.model('Comment', CommentSchema);
const AuthorSchema = new mongoose.Schema({
  id: String,
  name: String,
  avatar: String
});
const Author = mongoose.model('Author', AuthorSchema);
const AccountSchema = new mongoose.Schema({
  username: String,
  password: String,
  id: String
});
const Account = mongoose.model('Account', AccountSchema);

module.exports = {
  connect() {
    mongoose.connect('mongodb://localhost/cpzhihu', (err) => {
      if (err) {
        console.log('error');
      } else {
        console.log('mongodb connected');
      }
    });
  },
  Question: Question,
  Answer: Answer,
  Comment: Comment,
  Author: Author,
  getQuestionItem(questionId) {
    return new Promise((resolve, reject) => {
      this.Question.findOne({
        id: questionId
      }, (err, questionItem) => {
        if (err) {
          console.log('error');
          resolve({});
        } else {
          resolve(questionItem);
        }
      });
    });
  },
  getComment(commentId) {
    return new Promise((resolve, reject) => {
      this.Comment.findOne({
        id: commentId
      }, (err, commentItem) => {
        if (err) {
          console.log('error');
          resolve({});
        } else {
          resolve(commentItem);
        }
      });
    });
  },
  getAnswer(answerId) {
    return new Promise((resolve, reject) => {
      this.Answer.findOne({
        id: answerId
      }, (err, answerItem) => {
        if (err) {
          console.log('error');
          resolve({});
        } else {
          resolve(answerItem);
        }
      });
    });
  },
  getAuthor(authorId) {
    return new Promise((resolve, reject) => {
      this.Author.findOne({
        id: authorId
      }, (err, authorItem) => {
        if (err) {
          console.log('error');
          resolve({});
        } else {
          resolve(authorItem);
        }
      });
    });
  },
  insertQuestion(questionItem) {
    return new Promise((resolve, reject) => {
      new this.Question(questionItem).save((err) => {
        if (err) {
          console.log('error');
          resolve(false);
        } else {
          resolve(true);
        }
      });
    });
  },
  insertAnswer(questionId, answerItem) {
    return new Promise((resolve, reject) => {
      this.Question.findOne({
        id: questionId
      }, (err, questionItem) => {
        if (err) {
          console.log('error');
          resolve(false);
        } else {
          questionItem.answerIdList.push(answerItem.id);
          questionItem.save((err) => {
            if (err) {
              console.log('error');
              resolve(false);
            } else {
              new this.Answer(answerItem).save((err) => {
                if (err) {
                  console.log('error');
                  resolve(false);
                } else {
                  console.log('Answer list updated');
                  resolve(true);
                }
              });
            }
          });
        }
      });
    });
  },
  insertQuestionComment(questionId, commentItem) {
    return new Promise((resolve, reject) => {
      this.Question.findOne({
        id: questionId
      }, (err, questionItem) => {
        if (err) {
          console.log('error');
          resolve(false);
        } else {
          questionItem.commentIdList.push(commentItem.id);
          questionItem.save((err) => {
            if (err) {
              console.log('error');
              resolve(false);
            } else {
              new this.Comment(commentItem).save((err) => {
                if (err) {
                  console.log('error');
                  resolve(false);
                } else {
                  console.log('Comment list updated');
                  resolve(true);
                }
              });
            }
          });
        }
      });
    });
  },
  insertAnswerComment(answerId, commentItem) {
    return new Promise((resolve, reject) => {
      this.Answer.findOne({
        id: answerId
      }, (err, answerItem) => {
        if (err) {
          console.log('error');
          resolve(false);
        } else {
          answerItem.commentIdList.push(commentItem.id);
          answerItem.save((err) => {
            if (err) {
              console.log('error');
              resolve(false);
            } else {
              new this.Comment(commentItem).save((err) => {
                if (err) {
                  console.log('error');
                  resolve(false);
                } else {
                  console.log('Comment list updated');
                  resolve(true);
                }
              })
            }
          });
        }
      });
    });
  },
  insertAuthor(authorItem) {
    return new Promise((resolve, reject) => {
      new this.Author(authorItem).save((err) => {
        if (err) {
          console.log('error');
          resolve(false);
        } else {
          console.log('Author saved');
          resolve(true);
        }
      });
    });
  },
  insertAccount(accountItem) {
    return new Promise((resolve, reject) => {
      new this.Account(accountItem).save((err) => {
        if (err) {
          console.log('error');
          resolve(false);
        } else {
          console.log('Account saved');
          resolve(true);
        }
      });
    });
  },
  insertManyQuestions(questionList) {
    this.Question.insertMany(questionList, (err) => {
      if (err) {
        console.log('error');
      }
    });
  },
  insertManyAnswers(answerList) {
    this.Answer.insertMany(answerList, (err) => {
      if (err) {
        console.log('error');
      }
    });
  },
  insertManyComments(commentList) {
    this.Comment.insertMany(commentList, (err) => {
      if (err) {
        console.log('error');
      }
    });
  },
  insertManyAuthors(authorList) {
    this.Author.insertMany(authorList, (err) => {
      if (err) {
        console.log('error');
      }
    });
  },
  auth(username, password) {
    return new Promise((resolve, reject) => {
      this.Account.findOne({
        username: username
      }, (err, account) => {
        if (err) {
          console.log('error');
          resolve({});
        } else if (!account) {
          console.log('user does not exist');
          resolve({});
        } else if (account.password !== password) {
          console.log('wrong password');
          resolve({});
        } else {
          console.log('found user');
          resolve(account);
        }
      });
    });
  }
};
