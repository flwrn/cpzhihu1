const puppeteer = require('puppeteer');
const http = require('http');
const path = require('path');
const url = require('url');
const fs = require('fs');

let browser = null;
let page = null;

// Set the keyword to search for
const keyword = '单身';

// How many questions needed
const questionsNeeded = 1;

// How many answers for each question
const answersNeeded = 5;

// How many comments for each answer
const commentsNeeded = 20;

// Wait for (?) seconds between each request
// If the interval is set too short, the page may be not completely loaded
const waitingInterval = 5;

let questionUrlList = [];

// If you want to search related questions, set the maximum iteration number
const relatedIteration = 1;
let currentIteration = 0;
let questionList = []

let database = {
  questionList: [],
  answerList: [],
  commentList: [],
  authorList: []
};

async function main() {
  await initPuppeteer();
  // loadDatabase();
  questionUrlList = await openSearchPage();
  console.log('questionUrlList.length', questionUrlList.length);

  questionList = questionUrlList.map((item) => {
    return {
      url: item
    };
  });

  for (let i=0; i<questionList.length; i++) {
    let questionItem = questionList[i];
    await getQuestionItem(questionItem);
    saveQuestion(questionItem);
    console.log(`${i+1} / ${questionList.length} questions saved`);
  }

  saveDatabase();
  console.log(`Data saved as 'database.json'`);

  console.log('All finished');
  await browser.close();

}
main();

function initPuppeteer() {
  return new Promise(async (resolve, reject) => {
    browser = await puppeteer.launch({
      executablePath: '/usr/bin/chromium'
      // headless: false
      // slowMo: 100
    });
    page = await browser.newPage();
    await page.setViewport({
      width: 800,
      height: 200
    });
    console.log('Puppeteer initialized');
    resolve();
  });
}

function openSearchPage() {
  return new Promise(async (resolve, reject) => {
    console.log('Opening search page');

    const searchUrl = `http://zhihu.sogou.com/zhihu?query=${keyword.replace(/ /, '+')}&ie=utf8&w=&sut=8119&sst0=1527157131165&lkt=1%2C1527157131056%2C1527157131056`;
    let questionUrlList = [];

    // Urls must fit in this template
    let regex = /https?:\/\/www\.zhihu\.com\/question\/[0-9]+/;

    // Search pages until enough urls are collected
    async function onLoad() {
      await waitFor(waitingInterval);

      let moreList = await page.evaluate(() => {
        let nodeList = document.querySelectorAll('h4.about-list-title a');
        return [...nodeList].map((item) => {
          return item.href;
        });
      });

      // Filter out those that don't fit in the template
      // Extract only the template part
      moreList = moreList.filter((item) => {
        return item.match(regex) !== null;
      });
      moreList = moreList.map((item) => {
        return item.match(regex)[0];
      })
      questionUrlList = questionUrlList.concat(moreList);

      // Keep going to next page until enough urls are collected
      // await waitFor(waitingInterval);
      if (questionUrlList.length < questionsNeeded) {
        await page.evaluate(() => {
          document.querySelector('a#zhihu_page_next').click();
        });
      } else {

        // Ignore the cases where search results are not enough
        // Extract exactly how many questions needed, then return
        questionUrlList = questionUrlList.filter((item, index) => {
          return index < questionsNeeded;
        });
        console.log('Search page opened');
        page.removeListener('load', onLoad);
        resolve(questionUrlList);
      }
    }
    page.on('load', onLoad);
    await page.goto(searchUrl);
  });
}

function getQuestionItem(questionItem) {
  return new Promise(async (resolve, reject) => {
    async function onLoad() {

      await waitFor(waitingInterval);

      // Get question item meta
      questionItem = await page.evaluate((questionItem) => {
        questionItem.id = questionItem.url.match(/[0-9]+/)[0];
        questionItem.title = document.querySelector('div.QuestionPage > meta[itemprop=name]').content;
        questionItem.keywords = document.querySelector('div.QuestionPage > meta[itemprop=keywords]').content.split(',');
        questionItem.answerCount = parseInt(document.querySelector('div.QuestionPage > meta[itemprop=answerCount]').content);
        questionItem.commentCount = parseInt(document.querySelector('div.QuestionPage > meta[itemprop=commentCount]').content);
        questionItem.dateCreated = document.querySelector('div.QuestionPage > meta[itemprop=dateCreated]').content;
        questionItem.dateModified = document.querySelector('div.QuestionPage > meta[itemprop=dateModified]').content;
        questionItem.followerCount = document.querySelectorAll('strong.NumberBoard-itemValue')[0].textContent;
        questionItem.visitsCount = document.querySelectorAll('strong.NumberBoard-itemValue')[1].textContent;
        questionItem.briefContent = document.querySelector('div.QuestionRichText > div > span').innerHTML;
        questionItem.relatedQuestions = [
          {
            name: document.querySelectorAll('div.SimilarQuestions-item meta[itemprop=name]')[0].content,
            answerCount: document.querySelectorAll('div.SimilarQuestions-item meta[itemprop=answerCount]')[0].content,
            url: document.querySelectorAll('div.SimilarQuestions-item meta[itemprop=url]')[0].content
          },
          {
            name: document.querySelectorAll('div.SimilarQuestions-item meta[itemprop=name]')[1].content,
            answerCount: document.querySelectorAll('div.SimilarQuestions-item meta[itemprop=answerCount]')[1].content,
            url: document.querySelectorAll('div.SimilarQuestions-item meta[itemprop=url]')[1].content
          },
          {
            name: document.querySelectorAll('div.SimilarQuestions-item meta[itemprop=name]')[2].content,
            answerCount: document.querySelectorAll('div.SimilarQuestions-item meta[itemprop=answerCount]')[2].content,
            url: document.querySelectorAll('div.SimilarQuestions-item meta[itemprop=url]')[2].content
          },
          {
            name: document.querySelectorAll('div.SimilarQuestions-item meta[itemprop=name]')[3].content,
            answerCount: document.querySelectorAll('div.SimilarQuestions-item meta[itemprop=answerCount]')[3].content,
            url: document.querySelectorAll('div.SimilarQuestions-item meta[itemprop=url]')[3].content
          },
          {
            name: document.querySelectorAll('div.SimilarQuestions-item meta[itemprop=name]')[4].content,
            answerCount: document.querySelectorAll('div.SimilarQuestions-item meta[itemprop=answerCount]')[4].content,
            url: document.querySelectorAll('div.SimilarQuestions-item meta[itemprop=url]')[4].content
          }
        ];
        return questionItem;
      }, questionItem);

      // Add related questions to quesitonUrlList
      if (currentIteration < relatedIteration) {
        console.log('currentIteration < relatedIteration');
        let relatedQuestions = questionItem.relatedQuestions.map((item) => {
          return {
            url: item.url
          };
        });
        console.log('relatedQuestions', relatedQuestions);
        questionList = questionList.concat(relatedQuestions);
        console.log('questionUrlList', questionUrlList);
        currentIteration += 1;
        console.log('currentIteration', currentIteration);
      }

      // Get the detail content if it is there
      if (await page.$('button.QuestionRichText-more')) {
        await page.evaluate(() => {
          document.querySelector('button.QuestionRichText-more').click();
        });
        questionItem = await page.evaluate((questionItem) => {
          questionItem.detailContent = document.querySelector('div.QuestionRichText > div > span').innerHTML;
          return questionItem;
        }, questionItem);
      }

      // Wait for answer list
      await loadEnoughAnswers(questionItem, answersNeeded);

      let answersAvail = questionItem.answerCount < answersNeeded ? questionItem.answerCount : answersNeeded;

      let answerList = [];
      for (let i=0; i<answersAvail; i++) {
        let answerItem = {};
        let answerIndex = i;
        await getAnswerItem(answerItem, answerIndex);
        saveAnswer(answerItem);
        console.log(`${i+1} / ${answersAvail} answers saved`);
        answerList.push(answerItem);
      }

      // Get answer id list
      questionItem.answerIdList = answerList.map((item) => {
        return item.id;
      });

      // Wait for comment list
      let commentList = [];
      await getQuestionCommentList(commentList);

      // Get comment id list
      questionItem.commentIdList = commentList.map((item) => {
        saveComment(item);
        return item.id;
      });

      page.removeListener('load', onLoad);
      resolve();
    }

    page.on('load', onLoad);
    // await waitFor(waitingInterval);
    await page.goto(questionItem.url);
  })
}

function getAnswerItem(answerItem, answerIndex) {
  return new Promise(async (resolve, reject) => {
    answerItem = await page.evaluate((answerItem, answerIndex) => {
      answerItem.id = document.querySelectorAll('div.AnswerItem')[answerIndex].getAttribute('name');
      answerItem.url = document.querySelectorAll('div.AnswerItem > meta[itemprop=url]')[answerIndex].content;
      answerItem.upvoteCount = parseInt(document.querySelectorAll('div.AnswerItem > meta[itemprop=upvoteCount]')[answerIndex].content);
      answerItem.commentCount = parseInt(document.querySelectorAll('div.AnswerItem > meta[itemprop=commentCount]')[answerIndex].content);
      answerItem.dateCreated = document.querySelectorAll('div.AnswerItem > meta[itemprop=dateCreated]')[answerIndex].content;
      answerItem.dateModified = document.querySelectorAll('div.AnswerItem > meta[itemprop=dateModified]')[answerIndex].content;
      answerItem.content = document.querySelectorAll('div.RichContent span.RichText')[answerIndex].innerHTML;
      answerItem.content = answerItem.content.replace(/ width="[0-9]+"/g, '');
      return answerItem;
    }, answerItem, answerIndex);

    // Wait for author item
    let answerAuthor = {};
    await getAnswerAuthor(answerAuthor, answerIndex);
    saveAuthor(answerAuthor);

    // Get author info
    answerItem.author = answerAuthor;
    // answerItem.authorId = answerAuthor.id;

    // Wait for comment list
    // let commentsNeeded = answerItem.commentCount > 20 ? answerItem.commentCount : 20;
    let commentList = [];
    let commentCount = answerItem.commentCount;
    await getAnswerCommentList(commentList, answerIndex, commentCount);

    // Get comment id list
    answerItem.commentIdList = commentList.map((item) => {
      saveComment(item);
      return item.id;
    });

    resolve();
  });
}

function getAnswerAuthor(answerAuthor, answerIndex) {
  return new Promise(async (resolve, reject) => {
    answerAuthor = await page.evaluate((answerAuthor, answerIndex) => {
      answerAuthor.id = JSON.parse(document.querySelectorAll('div.AnswerItem')[answerIndex].dataset.zaExtraModule).card.content.author_member_hash_id;
      answerAuthor.name = document.querySelectorAll('div.AuthorInfo > meta[itemprop=name]')[answerIndex].content;
      answerAuthor.avatar = document.querySelectorAll('div.AuthorInfo > meta[itemprop=image]')[answerIndex].content;
      return answerAuthor;
    }, answerAuthor, answerIndex);
    resolve();
  });
}

function getAnswerCommentList(commentList, answerIndex, commentCount) {
  return new Promise(async (resolve, reject) => {

    let need = commentCount < commentsNeeded ? commentCount : commentsNeeded;

    async function onResponse(res) {
      let parsedUrl = url.parse(res.url(), true);
      let regex = /\/api\/v4\/answers\/[0-9]+\/comments/;
      if (regex.test(parsedUrl.pathname)) {
        let json = await res.json();
        for (let i=0; i<json.data.length; i++) {
          let item = json.data[i];
          let commentItem = {};
          commentItem.id = item.id;
          commentItem.voteCount = item.vote_count;
          commentItem.content = item.content;
          commentItem.createdTime = item.created_time;

          // Wait for author id
          let commentAuthor = {};
          await getCommentAuthor(commentAuthor, item);
          saveAuthor(commentAuthor);
          // commentItem.authorId = commentAuthor.id;
          commentItem.author = commentAuthor;
          commentList.push(commentItem);
        }

        if (commentList.length < need) {
          await page.evaluate((answerIndex) => {
            document.querySelector('button.PaginationButton-next').click();
          });
        } else {
          // Close commentbox
          await page.evaluate((answerIndex) => {
            document.querySelectorAll('button.ContentItem-action:nth-child(2)')[answerIndex].click();
          }, answerIndex);

          page.removeListener('response', onResponse);
          resolve();
        }
      }
    }
    page.on('response', onResponse);
    await page.evaluate((answerIndex) => {
      document.querySelectorAll('button.ContentItem-action:nth-child(2)')[answerIndex].click();
    }, answerIndex);
  });
}

function getCommentAuthor(commentAuthor, item) {
  return new Promise(async (resolve, reject) => {
    commentAuthor.id = item.author.member.id;
    commentAuthor.name = item.author.member.name;
    commentAuthor.avatar = item.author.member.avatar_url;
    resolve();
  });
}

function getQuestionCommentList(commentList) {
  return new Promise(async (resolve, reject) => {
    async function onResponse(res) {
      let parsedUrl = url.parse(res.url(), true);
      let regex = /\/api\/v4\/questions\/[0-9]+\/comments/;
      if (regex.test(parsedUrl.pathname)) {
        let json = await res.json();
        for (let i=0; i<json.data.length; i++) {
          let item = json.data[i];
          let commentItem = {};
          commentItem.id = item.id;
          commentItem.voteCount = item.vote_count;
          commentItem.content = item.content;
          commentItem.createdTime = item.created_time;

          // Wait for author id
          let commentAuthor = {};
          commentAuthor = await getCommentAuthor(commentAuthor, item);
          saveAuthor(commentAuthor);
          // commentItem.authorId = commentAuthor.id;
          commentItem.author = commentAuthor;
          commentList.push(commentItem);
        }

        // Close commentbox
        await page.evaluate(() => {
          document.querySelector('button.Modal-closeButton').click()
        });
        page.removeListener('response', onResponse);
        resolve();
      }
    }
    page.on('response', onResponse);
    await page.evaluate(() => {
      document.querySelector('div.QuestionHeader-Comment > button').click();
    });
  });
}

function loadEnoughAnswers(questionItem, answersNeeded) {
  return new Promise(async (resolve, reject) => {

    let need = answersNeeded;

    // Get as many answers as possible
    if (questionItem.answerCount < need) {
      need = questionItem.answerCount;
    }

    // Keep scrolling until enough answers are loaded
    // await page.evaluate((need) => {
    //   let nodeList = document.querySelectorAll('div.List-item');
    //   while (nodeList.length < need) {
    //     window.scrollBy(0, 100);
    //     console.log('scroll');
    //     nodeList = document.querySelectorAll('div.List-item');
    //   }
    // }, need)

    // Keep scrolling until enough answers are loaded
    let nodeList = await page.$$('div.List-item');
    let previousLength = nodeList.length;
    console.log(`${previousLength} / ${need} answers loaded`);
    while (nodeList.length < need) {
      waitFor(1);
      await page.evaluate(() => {
        window.scrollBy(0, 10000);
      });
      nodeList = await page.$$('div.List-item');
      if (nodeList.length > previousLength) {
        previousLength = nodeList.length;
        console.log(`${previousLength} / ${need} answers loaded`);
      }
    }

    resolve();
  });
}

function saveQuestion(questionItem) {
  if (
    database.questionList.every((item) => {
      return item.id !== questionItem.id;
    })
  ) {
    database.questionList.push(questionItem);
  }
}

function saveAnswer(answerItem) {
  if (
    database.answerList.every((item) => {
      return item.id !== answerItem.id;
    })
  ) {
    database.answerList.push(answerItem);
  }
}

function saveComment(commentItem) {
  if (
    database.commentList.every((item) => {
      return item.id !== commentItem.id;
    })
  ) {
    database.commentList.push(commentItem);
  }
}

function saveAuthor(authorItem) {
  if (
    database.authorList.every((item) => {
      return item.id !== authorItem.id;
    })
  ) {
    database.authorList.push(authorItem);
  }
}

function loadDatabase() {
  if (fs.existsSync(path.join(__dirname, 'database.json'))) {
    database = JSON.parse(fs.readFileSync(path.join(__dirname, 'database.json'), 'utf8'));
  }
}

function saveDatabase() {
  fs.writeFileSync(path.join(__dirname, 'database.json'), JSON.stringify(database), 'utf8');
}

function waitFor(sec) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve();
    }, sec * 1000);
  });
}
