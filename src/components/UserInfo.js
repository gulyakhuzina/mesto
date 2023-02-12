export class UserInfo {
  constructor({nameElementSelector, infoElementSelector, avatarSelector}) {
    this._name = document.querySelector(nameElementSelector);
    this._about = document.querySelector(infoElementSelector);
  }

  getUserInfo() {
    return {
      name: this._name.textContent,
      about: this._about.textContent,
    }
  }

  setUserInfo(data) {
    this._name.textContent = data.name;
    this._about.textContent = data.about;
  }
}