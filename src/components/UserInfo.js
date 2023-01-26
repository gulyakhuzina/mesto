export class UserInfo {
  constructor({nameElementSelector, infoElementSelector}) {
    this._name = document.querySelector(nameElementSelector);
    this._info = document.querySelector(infoElementSelector);
  }

  getUserInfo() {
    return {
      name: this._name.textContent,
      info: this._info.textContent
    }
  }

  setUserInfo(data) {
    this._name.textContent = data.name;
    this._info.textContent = data.info;
  }
}