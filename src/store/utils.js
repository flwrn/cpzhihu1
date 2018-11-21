export default {
  numberFormat(number, type) {
    if (type === 'comma') {
      return number.toString()
      .split('').reverse().join('')
      .match(/([0-9]{3}|[0-9]{1,2}$)/g).join(',')
      .split('').reverse().join('');
    }
    if (type === 'k') {
      if (number < 1000) {
        return `${number}`;
      } else {
        return `${Math.floor(number / 100) / 10}k`;
      }
    }
  },
  timeSince(time) {
    let now = Math.floor(Date.now() / 1000);
    let diffSec = now - time;
    let diffMin = Math.floor(diffSec / 60);
    let diffHour = Math.floor(diffSec / 60 / 60);
    let diffDay = Math.floor(diffSec / 60 / 60 / 24);
    let diffMonth = Math.floor(diffSec / 60 / 60 / 24 / 30);
    let diffYear = Math.floor(diffSec / 60 / 60 / 24 / 365);
    if (diffYear > 0) {
      return `${diffYear} 年前`;
    } else if (diffMonth > 0) {
      return `${diffMonth} 个月前`;
    } else if (diffDay > 0) {
      return `${diffDay} 天前`;
    } else if (diffHour > 0) {
      return `${diffHour} 小时前`;
    } else if (diffMin > 0) {
      return `${diffMin} 分钟前`;
    } else {
      return '刚刚';
    }
  },
  timeFormat(time, type) {
    let date = new Date(time * 1000);
    let yyyy = date.getFullYear().toString();
    let mm = (date.getMonth()+1).toString();
    mm = mm.length === 1 ? '0'+mm : mm;
    let dd = date.getDate().toString();
    dd = dd.length === 1 ? '0'+dd : dd;
    // return `发布于 ${time.slice(0, 4)}-${time.slice(4, 6)}-${time.slice(6, 8)}`
    const dateString = `${yyyy}-${mm}-${dd}`;
    if (type === 'publish') {
      return `发布于 ${dateString}`;
    }
    if (type === 'edit') {
      return `编辑于 ${dateString}`;
    }
  },
  parseCookie(cookieString) {
    const cookieList = cookieString.split('; ');
    const cookie = {};
    for (let item of cookieList) {
      let keyValueArray = item.split('=');
      let key = keyValueArray[0];
      let value = keyValueArray[1];
      cookie[key] = value;
    }
    return cookie;
  },

  /*
  1 2
  1 2 3
  1 2 3 4
  1 2 3 4 5
  1 2 3 4 7
  1 3 4 5 7
  1 4 5 6 7
  1 2 3 4 5 6 7
  */
  getPageList({ pageCount, currentPage, pagesToShow }) {
    pagesToShow = pagesToShow % 2 === 1 ? pagesToShow : pagesToShow + 1;
    const halfOfPagesToShow = (pagesToShow - 1) / 2;
    let pageList = [];
    if (pageCount > pagesToShow) {
      if (currentPage <= 1 + halfOfPagesToShow) {
        for (let i = 1; i <= pagesToShow - 1; i++) {
          pageList.push(i);
        }
        pageList.push(pageCount);
      } else if (currentPage >= pageCount - halfOfPagesToShow) {
        pageList.push(1);
        for (let i = pageCount - pagesToShow + 2; i <= pageCount; i++) {
          pageList.push(i);
        }
      } else {
        pageList.push(1);
        for (let i = currentPage - halfOfPagesToShow + 1; i <= currentPage + halfOfPagesToShow - 1; i++) {
          pageList.push(i);
        }
        pageList.push(pageCount);
      }
    } else {
      for (let i = 1; i <= pageCount; i++) {
        pageList.push(i);
      }
    }
    return pageList;
  }
};
