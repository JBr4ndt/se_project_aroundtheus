export default class UserInfo {
  constructor({ userNameSelector, userJobSelector, userAvatarSelector }) {
    this._userNameElement = document.querySelector(userNameSelector);
    this._userJobElement = document.querySelector(userJobSelector);
    this._userAvatarSelector = document.querySelector(userAvatarSelector);
  }

  getUserInfo() {
    return {
      name: this._userNameElement.textContent,
      about: this._userJobElement.textContent,
    };
  }

  setUserInfo(userInfo) {
    this._userNameElement.textContent = userInfo.name;
    this._userJobElement.textContent = userInfo.about;
  }

  setAvatar(avatarUrl) {
    this._userAvatarSelector.src = avatarUrl;
  }
}
