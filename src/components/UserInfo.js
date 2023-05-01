export default class UserInfo {
  constructor({ userNameSelector, userJobSelector }) {
    this._userNameElement = userNameSelector;
    this._userJobElement = userJobSelector;
  }

  getUserInfo() {
    return {
      userName: this._userNameElement.textContent,
      userJob: this._userJobElement.textContent,
    };
  }

  setUserInfo(userInfo) {
    this._userNameElement.textContent = userInfo.title;
    this._userJobElement.textContent = userInfo.description;
  }
}
