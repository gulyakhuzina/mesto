class Api {
  constructor(options) {
    this._options = options;
    this._baseUrl = this._options.baseUrl;
    this._headers = this._options.headers;
  }

  _getResponseData(res) {
    if (!res.ok) {
      return Promise.reject(`Ошибка: ${res.status}`); 
    }
    return res.json();
  }

  getUserInfo() {
    return fetch(this._baseUrl + '/users/me', {
      headers: this._headers
    })
      .then(res => {
        return this._getResponseData(res);
      });
  }

  editUserInfo(data) {
    return fetch(this._baseUrl + '/users/me', {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify({
        name: data.name,
        about: data.about
      })
    })
      .then(res => {
        return this._getResponseData(res);
      });
  }

  editAvatar(data) {
    return fetch(this._baseUrl + '/users/me/avatar', {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify({
        avatar: data.avatar
      })
    })
      .then(res => {
        return this._getResponseData(res);
      });
  }

  getInitialCards() {
    return fetch(this._baseUrl + '/cards', {
      headers: this._headers
    })
      .then(res => {
        return this._getResponseData(res);
      });
  }

  deleteCard(id) {
    return fetch(this._baseUrl + '/cards/' + id, {
      method: 'DELETE',
      headers: this._headers,
    })
      .then(res => {
        return this._getResponseData(res);
      });
  }

  addCard(formData) {
    return fetch(this._baseUrl + '/cards/', {
      method: 'POST',
      headers: this._headers,
      body: JSON.stringify({
        name: formData.name,
        link: formData.link
      })
    })
      .then(res => {
        return this._getResponseData(res);
      });
  }

  likeCard(id) {
    return fetch(this._baseUrl + '/cards/' + id + '/likes', {
      method: 'PUT',
      headers: this._headers
    })
      .then(res => {
        return this._getResponseData(res);
      });
  }

  deleteLikeCard(id) {
    return fetch(this._baseUrl + '/cards/' + id + '/likes', {
      method: 'DELETE',
      headers: this._headers
    })
      .then(res => {
        return this._getResponseData(res);
      });
  }

}

export const api = new Api({
  baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-59',
  headers: {
    authorization: 'd9253a3c-58e9-486e-9bcb-05c5075be719',
    'Content-Type': 'application/json'
  }
});