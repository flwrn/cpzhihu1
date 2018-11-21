import AV from 'leanengine';

export default {
  init() {
    const APP_ID = 'OAlt6WuvuqQgOHHipC9jB7UD-gzGzoHsz';
    const APP_KEY = 'dCzxQgy2OqcpRrsKTXdGoADA';
    AV.init({
      appId: APP_ID,
      appKey: APP_KEY
    });
  },
  async signup(userInput) {
    const user = new AV.User();
    const username = userInput.email.replace('@', '').replace('.', '');
    const email = userInput.email;
    const password = userInput.password;
    user.setUsername(username);
    user.setEmail(email);
    user.setPassword(password);
    const name = userInput.email.match(/^[^@]+/)[0];
    const date = Date.now();
    user.set('author', {
      type: 'people',
      id: `${name}${date}`,
      name: name,
      avatar_url: 'https://pic1.zhimg.com/aadd7b895_is.jpg',
      avatar_url_template: 'https://pic1.zhimg.com/aadd7b895_{size}.jpg',
      gender: 0
    });
    try {
      const loggedInUser = await user.signUp();
      const parsedUser = JSON.parse(JSON.stringify(loggedInUser));
      parsedUser.sessionToken = loggedInUser.getSessionToken();
      return parsedUser;
    } catch (error) {
      console.log('leancloud-module: when signing up');
      return null;
    }
  },
  async login(userInput) {
    const username = userInput.email.replace('@', '').replace('.', '');
    const password = userInput.password;
    try {
      const loggedInUser = await AV.User.logIn(username, password);
      const parsedUser = JSON.parse(JSON.stringify(loggedInUser));
      parsedUser.sessionToken = loggedInUser.getSessionToken();
      return parsedUser;
    } catch (error) {
      console.log('leancloud-module: when logging in');
      return null;
    }
  },
  async loginWithSessionToken(sessionToken) {
    try {
      const user = await AV.User.become(sessionToken);
      const parsedUser = JSON.parse(JSON.stringify(user));
      parsedUser.sessionToken = sessionToken;
      return parsedUser;
    } catch (error) {
      console.log('leancloud-module: when logging in with session token');
      return null;
    }
  },
  async logout() {
    try {
      AV.User.logOut();
    } catch (error) {
      console.log('leancloud-module: when logging out');
    }
  },
  async getCurrentUser() {
    try {
      const currentUser = await AV.User.current();
      return JSON.parse(JSON.stringify(currentUser));
    } catch (error) {
      console.log('leancloud-module: when getting current user');
    }
  },
  async getSessionToken() {
    try {
      const currentUser = await AV.User.current();
      const sessionToken = currentUser.getSessionToken();
    } catch (error) {
      console.log('leancloud-module: when getting session token');
    }
  },
  async saveUser(user) {
    try {
      await user.save();
    } catch (error) {
      console.log('leancloud-module: when saving user');
    }
  }
};
